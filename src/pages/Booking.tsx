import { useState } from "react";
import { format } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { SlotSelector } from "@/components/booking/SlotSelector";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { SlotType } from "@/hooks/useBookings";
import { Fish } from "lucide-react";

export default function Booking() {
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
    setSelectedSlot(undefined); // Reset slot when date changes
  };

  const handleSuccess = () => {
    if (selectedDate && selectedSlot) {
      setBookingDetails({
        date: selectedDate,
        slot: selectedSlot,
        name: "Guest", // This gets overwritten by form
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
        <BookingConfirmation
          date={bookingDetails.date}
          slot={bookingDetails.slot}
          name={bookingDetails.name}
          partySize={bookingDetails.partySize}
          onReset={handleReset}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6 md:py-10">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-primary mb-2">
            <Fish className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">Saltwater Fishing</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Book Your Trip</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Affordable inshore and nearshore charters. Pick a date, choose your trip, and let's go fishing!
          </p>
        </div>

        {/* Booking Summary Bar (Mobile) */}
        {(selectedDate || selectedSlot) && (
          <div className="md:hidden bg-primary text-primary-foreground rounded-lg p-3 mb-6 flex items-center justify-between text-sm">
            <div>
              {selectedDate && <span>{format(selectedDate, "MMM d")}</span>}
              {selectedDate && selectedSlot && <span className="mx-2">•</span>}
              {selectedSlot && <span>{selectedSlot === "FULL" ? "Full Day" : `Half-Day ${selectedSlot}`}</span>}
            </div>
            {selectedDate && selectedSlot && (
              <span className="font-semibold">
                {selectedSlot === "FULL" ? "$600" : "$350"}
              </span>
            )}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
          </div>
          <div className="lg:col-span-1">
            <SlotSelector
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </div>
          <div className="lg:col-span-1">
            <BookingForm
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
