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
  Mail,
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Trip Information</h1>
          <p className="text-muted-foreground">
            Everything you need to know before your fishing adventure
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
              <div className="text-2xl font-bold text-primary mb-1">$350</div>
              <div className="font-semibold">Half-Day Trip</div>
              <div className="text-sm text-muted-foreground">6 hours • AM or PM</div>
            </div>
            <div className="bg-card rounded-lg border p-5">
              <div className="text-2xl font-bold text-primary mb-1">$600</div>
              <div className="font-semibold">Full-Day Trip</div>
              <div className="text-sm text-muted-foreground">10 hours</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            💵 <strong>Cash preferred</strong> – Deposit optional on request
          </p>
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
              "Cooler with ice for your catch",
              "Fish cleaning service included",
              "Bottled water on board",
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
              "Hat or cap",
              "Non-marking shoes (no black soles)",
              "Snacks and drinks (no glass)",
              "Camera for photos",
              "Rain jacket (just in case)",
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
                  <div className="text-sm text-muted-foreground">6 or 10 hours</div>
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
            <p className="font-semibold">Gulf Marina</p>
            <p className="text-muted-foreground">123 Harbor Drive, Slip #42</p>
            <p className="text-muted-foreground">Coastal City, FL 33XXX</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Arrive 15 minutes before departure. We'll text you exact directions after booking.
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
              <li><strong>48+ hours notice:</strong> Full refund or reschedule</li>
              <li><strong>24–48 hours notice:</strong> 50% refund or reschedule</li>
              <li><strong>Less than 24 hours:</strong> No refund (weather exceptions apply)</li>
              <li><strong>Weather cancellations:</strong> Full reschedule or refund</li>
            </ul>
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
              <span className="font-semibold">(temp)</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-semibold">(temp)</span>
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
