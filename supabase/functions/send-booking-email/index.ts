import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type BookingPayload = {
  id: string;
  date: string;
  slot_type: "AM" | "PM" | "FULL";
  name: string;
  phone: string;
  email: string;
  party_size: number;
  notes?: string | null;
};

const SLOT_DETAILS: Record<BookingPayload["slot_type"], { label: string; time: string; duration: string }> = {
  AM: { label: "Half-Day Morning", time: "Departure time confirmed by captain", duration: "4 hours" },
  PM: { label: "Half-Day Afternoon", time: "Departure time confirmed by captain", duration: "4 hours" },
  FULL: { label: "Full Day", time: "Departure time confirmed by captain", duration: "8 hours" },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function formatDate(dateStr: string) {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const resendFromEmail = Deno.env.get("RESEND_FROM_EMAIL");

  if (!resendApiKey || !resendFromEmail) {
    throw new Error("Missing Resend configuration.");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Pushing Limits Sportfishing <${resendFromEmail}>`,
      to: [to],
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend send failed: ${res.status} ${errorText}`);
  }
}

serve(async (req) => {
  console.log("send-booking-email invoked", { method: req.method });
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const ownerEmail = Deno.env.get("OWNER_EMAIL") || "owner@example.com";

  let payload: { booking: BookingPayload } | null = null;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON payload", { status: 400, headers: corsHeaders });
  }

  if (!payload?.booking) {
    return new Response("Missing booking payload", { status: 400, headers: corsHeaders });
  }

  const booking = payload.booking;
  const slot = SLOT_DETAILS[booking.slot_type];
  const formattedDate = formatDate(booking.date);

  const subjectCustomer = "Pushing Limits Sportfishing - Booking Confirmed";
  const subjectOwner = "New Booking – Pushing Limits Sportfishing";

  const detailLines = [
    `Date: ${formattedDate}`,
    `Time: ${slot.time}`,
    `Trip Type: ${slot.label} (${slot.duration})`,
    `Party Size: ${booking.party_size}`,
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    booking.notes ? `Notes: ${booking.notes}` : "",
  ].filter(Boolean);

  const textBody = [
    "Thanks for booking with Pushing Limits Sportfishing!",
    "",
    ...detailLines,
    "",
    "If you have any questions, reply to this email.",
  ].join("\n");

  const htmlBody = `
    <h2>Pushing Limits Sportfishing – Booking Confirmed</h2>
    <p>Thanks for booking with Pushing Limits Sportfishing!</p>
    <ul>
      ${detailLines.map((line) => `<li>${line}</li>`).join("")}
    </ul>
    <p>If you have any questions, reply to this email.</p>
  `;

  const ownerText = ["New booking received.", "", ...detailLines].join("\n");
  const ownerHtml = `
    <h2>New booking received</h2>
    <ul>
      ${detailLines.map((line) => `<li>${line}</li>`).join("")}
    </ul>
  `;

  console.log("Sending customer email", { to: booking.email, date: booking.date, slot: booking.slot_type });
  await sendEmail({
    to: booking.email,
    subject: subjectCustomer,
    text: textBody,
    html: htmlBody,
  });

  console.log("Sending owner email", { to: ownerEmail, date: booking.date, slot: booking.slot_type });
  await sendEmail({
    to: ownerEmail,
    subject: subjectOwner,
    text: ownerText,
    html: ownerHtml,
  });

  console.log("send-booking-email completed");
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
});
