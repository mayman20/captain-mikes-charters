import { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { BookingForm } from "@/components/booking/BookingForm";
import { SlotSelector } from "@/components/booking/SlotSelector";
import { SlotType } from "@/hooks/useBookings";
import { Button } from "@/components/ui/button";
import { Fish, Phone } from "lucide-react";

const bookingImages = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
];

export default function MockBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<SlotType | undefined>();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    date: Date;
    slot: SlotType;
    name: string;
    partySize: number;
  } | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(undefined);
  };

  const handleSuccess = () => {
    if (selectedDate && selectedSlot) {
      setBookingDetails({
        date: selectedDate,
        slot: selectedSlot,
        name: "Guest",
        partySize: 2,
      });
      setIsConfirmed(true);
    }
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    setSelectedSlot(undefined);
    setIsConfirmed(false);
    setBookingDetails(null);
  };

  if (isConfirmed && bookingDetails) {
    return (
      <Layout>
        <div className="bg-slate-950 py-12">
          <div className="container">
            <BookingConfirmation
              date={bookingDetails.date}
              slot={bookingDetails.slot}
              name={bookingDetails.name}
              partySize={bookingDetails.partySize}
              onReset={handleReset}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-stone-50 text-slate-950">
        <section className="border-b border-stone-200 bg-[linear-gradient(180deg,#fffaf4_0%,#eef6fb_100%)]">
          <div className="container grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm uppercase tracking-[0.25em] text-sky-700 shadow-sm">
                <Fish className="h-4 w-4" />
                Mock Booking Version
              </div>
              <h1 className="text-4xl font-black uppercase leading-none md:text-6xl">
                Book the trip.
                <br />
                Let the photos carry the page.
              </h1>
              <p className="max-w-2xl text-slate-700">
                This keeps the calendar and booking flow you already like, but wraps it in a more photo-forward layout closer to the reference site.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>$650 Half Day</span>
                <span className="text-slate-300">/</span>
                <span>$1200 Full Day</span>
                <span className="text-slate-300">/</span>
                <span>Phone-only tuna and shark trips</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="tel:+14013638189">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Phone className="mr-2 h-4 w-4" />
                    Call (401) 363-8189
                  </Button>
                </a>
                <Link to="/mock-home">
                  <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-950 hover:bg-slate-950 hover:text-white">
                    Back to Mock Home
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {bookingImages.map((src, index) => (
                <div key={src} className={`overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm ${index === 0 ? "sm:mt-10" : ""}`}>
                  <img src={src} alt={`Charter photo ${index + 1}`} className="h-72 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-8">
          {(selectedDate || selectedSlot) && (
            <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-slate-800 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  {selectedDate && <span>{format(selectedDate, "EEEE, MMM d")}</span>}
                  {selectedDate && selectedSlot && <span className="mx-2">•</span>}
                  {selectedSlot && (
                    <span>
                      {selectedSlot === "FULL" ? "Full Day" : selectedSlot === "AM" ? "Morning Half-Day" : "Afternoon Half-Day"}
                    </span>
                  )}
                </div>
                {selectedSlot && (
                  <span className="font-semibold">{selectedSlot === "FULL" ? "$1200" : "$650"}</span>
                )}
              </div>
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[0.9fr_0.9fr_1.2fr]">
            <div className="rounded-[2rem] border border-sky-100 bg-white p-3 shadow-sm">
              <div className="[&_button]:h-11 [&_button]:w-11 [&_.rdp-caption_label]:text-base [&_.rdp-day]:text-base [&_.rdp-head_cell]:text-sm">
                <BookingCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
              </div>
            </div>
            <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-sm">
              <SlotSelector
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />
            </div>
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1400&q=80"
                  alt="Sportfishing action"
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-sm">
                <BookingForm
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
