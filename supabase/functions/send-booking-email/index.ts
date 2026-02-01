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
  AM: { label: "Half-Day Morning", time: "6:00 AM – 12:00 PM", duration: "6 hours" },
  PM: { label: "Half-Day Afternoon", time: "1:00 PM – 7:00 PM", duration: "6 hours" },
  FULL: { label: "Full Day", time: "6:00 AM – 4:00 PM", duration: "10 hours" },
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

function base64UrlEncode(input: string) {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function getAccessToken() {
  const clientId = Deno.env.get("GMAIL_CLIENT_ID");
  const clientSecret = Deno.env.get("GMAIL_CLIENT_SECRET");
  const refreshToken = Deno.env.get("GMAIL_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Gmail OAuth credentials.");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to get access token: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.access_token as string;
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
  const gmailUser = Deno.env.get("GMAIL_USER");
  if (!gmailUser) {
    throw new Error("Missing Gmail sender address.");
  }

  const accessToken = await getAccessToken();

  const boundary = `boundary_${crypto.randomUUID()}`;
  const rawMessage = [
    `From: Captain Mike's Charters <${gmailUser}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  const raw = base64UrlEncode(rawMessage);

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gmail send failed: ${res.status} ${errorText}`);
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

  const subjectCustomer = "Captain Mike's Charters - Booking Confirmed";
  const subjectOwner = "New Booking – Captain Mike's Charters";

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
    "Thanks for booking with Captain Mike's Charters!",
    "",
    ...detailLines,
    "",
    "If you have any questions, reply to this email.",
  ].join("\n");

  const htmlBody = `
    <h2>Captain Mike's Charters – Booking Confirmed</h2>
    <p>Thanks for booking with Captain Mike's Charters!</p>
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
