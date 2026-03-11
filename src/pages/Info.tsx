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

export default function Info() {
  return (
    <Layout>
      <div className="container py-8 md:py-12 max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">PushingLimits SportFishing</h1>
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
              <div className="text-2xl font-bold text-primary mb-1">$650</div>
              <div className="font-semibold">Half-Day Trip</div>
              <div className="text-sm text-muted-foreground">4 hours • Morning or Afternoon</div>
            </div>
            <div className="bg-card rounded-lg border p-5">
              <div className="text-2xl font-bold text-primary mb-1">$1200</div>
              <div className="font-semibold">Full-Day Trip</div>
              <div className="text-sm text-muted-foreground">8 hours</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            20% tip is standard for all charters. Tuna and shark trips are available by phone only at (401) 363-8189.
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
              <div className="text-sm text-muted-foreground mt-1">4 hours</div>
              <p className="text-sm text-muted-foreground mt-3">Departure time changes daily and is confirmed by the captain.</p>
            </div>
            <div className="bg-card rounded-lg border p-5">
              <div className="font-semibold">Afternoon Half-Day</div>
              <div className="text-sm text-muted-foreground mt-1">4 hours</div>
              <p className="text-sm text-muted-foreground mt-3">Morning and afternoon half-days can both be booked on the same date.</p>
            </div>
            <div className="bg-card rounded-lg border p-5">
              <div className="font-semibold">Full-Day</div>
              <div className="text-sm text-muted-foreground mt-1">8 hours</div>
              <p className="text-sm text-muted-foreground mt-3">A full-day booking blocks the full date on the calendar.</p>
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
            {[
              "All fishing tackle and gear provided",
              "Live and artificial bait",
              "Fishing license coverage",
              "Water supplied on board",
              "Captain follow-up with your final departure details",
            ].map((item) => (
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
            The Boat
          </h2>
          <div className="bg-card rounded-lg border p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-semibold">Capacity</div>
                  <div className="text-sm text-muted-foreground">Up to 6 passengers</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-semibold">Trip Length</div>
                  <div className="text-sm text-muted-foreground">4-hour half day or 8-hour full day</div>
                </div>
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
            <p className="font-semibold">Jerusalem, Rhode Island</p>
            <p className="mt-3 text-sm text-muted-foreground">
              The captain will contact you by phone with your meeting time, departure time, and exact location after booking.
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
              <li><strong>Deposit required:</strong> Your date remains open to others until a deposit is received.</li>
              <li><strong>Within 3 days:</strong> Deposit is forfeit if your group cancels within 3 days of departure.</li>
              <li><strong>Within 72 hours:</strong> Full charter amount is owed if the trip is canceled within 72 hours of departure time on your charter date.</li>
              <li><strong>Weather:</strong> Weather decisions are at the captain's discretion and may be made at the dock the morning of the trip.</li>
              <li><strong>Bad weather reschedule:</strong> Deposit can transfer to a future date or be returned if no future date can be agreed on.</li>
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
              Deposits will be collected through Venmo. Deposit instructions will be sent directly by the captain.
            </p>
            <p>
              Verbally discussed dates are not held on the calendar until the deposit is received.
            </p>
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
              <a href="tel:+14013638189" className="font-semibold hover:underline">
                (401) 363-8189
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
