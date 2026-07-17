import { Layout } from "@/components/layout/Layout";
import {
  Anchor,
  Fish,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Phone,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ADDRESS,
  AMENITIES,
  OVERNIGHT_NOTE,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGULATOR_RATES,
  SAILFISH_RATES,
  TRIP_INCLUDES,
} from "@/data/charter";

const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;

export default function Info() {
  return (
    <Layout>
      <div className="container py-8 md:py-12 max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Pushing Limits Sportfishing</h1>
          <p className="text-muted-foreground">
            Charter details, booking policies, and what to expect before you step on board.
          </p>
        </div>

        {/* Pricing */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            Pricing
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-card rounded-lg border p-5">
              <div className="font-semibold mb-3">Boat: 25 Regulator <span className="ml-1 text-xs font-medium uppercase tracking-wider text-primary">book online</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {REGULATOR_RATES.map((rate) => (
                  <li key={rate.name} className="flex justify-between gap-4">
                    <span>{rate.name}{rate.note && <span className="text-xs"> ({rate.note})</span>}</span>
                    <span className="font-bold text-primary">{formatPrice(rate.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-lg border p-5">
              <div className="font-semibold mb-3">Boat: 206 Sailfish <span className="ml-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">by phone</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {SAILFISH_RATES.map((rate) => (
                  <li key={rate.name} className="flex justify-between gap-4">
                    <span>{rate.name}</span>
                    <span className="font-bold text-primary">{formatPrice(rate.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Live availability and checkout for online-bookable trips are on the booking page.
            20% tip is standard for all charters.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {OVERNIGHT_NOTE} <a href={PHONE_HREF} className="font-medium text-primary hover:underline">{PHONE_DISPLAY}</a>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Clock className="h-5 w-5 text-primary" />
            Trip Schedule
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-card rounded-lg border p-5">
              <div className="font-semibold">Morning Half-Day</div>
              <div className="text-sm text-muted-foreground mt-1">4–5 hours • ~6:00 AM start</div>
              <p className="text-sm text-muted-foreground mt-3">Exact departure time is confirmed by the captain.</p>
            </div>
            <div className="bg-card rounded-lg border p-5">
              <div className="font-semibold">Afternoon Half-Day</div>
              <div className="text-sm text-muted-foreground mt-1">4–5 hours • ~12:30 PM start</div>
              <p className="text-sm text-muted-foreground mt-3">Morning and afternoon half-days can both be booked on the same date.</p>
            </div>
            <div className="bg-card rounded-lg border p-5">
              <div className="font-semibold">Full-Day</div>
              <div className="text-sm text-muted-foreground mt-1">8–11 hours</div>
              <p className="text-sm text-muted-foreground mt-3">A full-day trip reserves the boat for the entire date. Offshore tuna runs 11 hours with a 5:00 AM start.</p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <CheckCircle className="h-5 w-5 text-success" />
            What's Included
          </h2>
          <ul className="space-y-3">
            {[...TRIP_INCLUDES, "Captain follow-up with your final departure details"].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What to Bring */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Fish className="h-5 w-5 text-primary" />
            What to Bring
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Sunscreen and sunglasses",
              "Hat",
              "Food if you want it",
              "Extra water if you want it",
              "Any EpiPens or medications",
              "Let the captain know about allergies or concerns ahead of time",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Boat & Capacity */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Anchor className="h-5 w-5 text-primary" />
            Boats & Capacity
          </h2>
          <div className="bg-card rounded-lg border p-5 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-semibold">Big boat</div>
                  <div className="text-sm text-muted-foreground">Up to 4 passengers</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-semibold">Small boat</div>
                  <div className="text-sm text-muted-foreground">Up to 3 passengers</div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-semibold">Trip Length</div>
                <div className="text-sm text-muted-foreground">4-hour half day, 8-hour full day, or call for overnight trip details</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Final boat assignment depends on trip type, group size, and conditions.
            </p>
            <div className="border-t pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">On-board equipment</p>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((amenity) => (
                  <span key={amenity} className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meeting Location */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            Meeting Location
          </h2>
          <div className="bg-card rounded-lg border p-5">
            <p className="font-semibold">{ADDRESS}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm text-primary hover:underline"
            >
              Show on map
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              The captain will contact you by phone with your meeting time, departure time, and exact spot after booking.
            </p>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            Cancellation Policy
          </h2>
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-5 text-sm">
            <ul className="space-y-2">
              <li><strong>Online bookings:</strong> Free cancellation up to 3 days before the trip. Cancellations after that, or no-shows, forfeit 100% of what you've paid. Full terms are shown at FishingBooker checkout.</li>
              <li><strong>Phone bookings:</strong> A 20% deposit or card hold secures the trip date. Cancellation terms are confirmed with the captain when you book.</li>
              <li><strong>Weather:</strong> Weather decisions are at the captain's discretion and may be made at the dock the morning of the trip.</li>
              <li><strong>Bad weather reschedule:</strong> Weather-cancelled trips can be rescheduled, or deposits returned if no future date can be agreed on.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            Payment
          </h2>
          <div className="bg-card rounded-lg border p-5 text-sm text-muted-foreground space-y-3">
            <p>
              A 20% deposit or card hold is required before a date is considered locked in on the calendar.
            </p>
            <p>
              Verbally discussed dates are not held on the calendar until the deposit is received.
            </p>
            <p>
              Online bookings are secured through FishingBooker's checkout. For phone
              bookings, the captain will send deposit instructions directly.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            Broken Equipment Policy
          </h2>
          <div className="bg-card rounded-lg border p-5 text-sm text-muted-foreground">
            If rods, reels, gear, or boat parts are broken due to client fault, the customer is responsible for 50% of the value of the damaged equipment.
          </div>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Phone className="h-5 w-5 text-primary" />
            Contact Us
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
              <Phone className="h-5 w-5 text-primary" />
              <a href={PHONE_HREF} className="font-semibold hover:underline">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link to="/book">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Book Your Trip Now
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
