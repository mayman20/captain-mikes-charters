import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Anchor, ArrowRight, BadgeDollarSign, Fish, Phone, Star, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const heroImages = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
];

const catchImages = [
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
];

const highlights = [
  {
    title: "Half-Day Charters",
    text: "Morning and afternoon trips with a tighter, action-first format and flexible departure times.",
  },
  {
    title: "Full-Day Runs",
    text: "Eight hours on the water with room to cover more ground and adjust to the bite.",
  },
  {
    title: "Phone-Only Specialty Trips",
    text: "Nearshore tuna, offshore tuna, overnight runs, giant tuna, and shark trips are handled directly by phone.",
  },
];

const mockTrips = [
  {
    title: "Morning Half-Day",
    price: "$650",
    text: "A 4-hour trip with final timing set by the captain based on conditions.",
    image: heroImages[0],
  },
  {
    title: "Afternoon Half-Day",
    price: "$650",
    text: "A second 4-hour trip can be booked on the same day if the date is open.",
    image: heroImages[1],
  },
  {
    title: "Full-Day",
    price: "$1200",
    text: "An 8-hour charter that blocks the date and gives more room to chase the bite.",
    image: heroImages[2],
  },
];

export default function MockHome() {
  return (
    <Layout>
      <div className="bg-slate-950 text-white">
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
            {heroImages.map((src, index) => (
              <div key={src} className="relative min-h-[260px] md:min-h-[680px]">
                <img
                  src={src}
                  alt={index === 0 ? "Open water at sunrise" : index === 1 ? "Sport fishing action" : "Offshore ocean scene"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/45" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/35" />

          <div className="container relative py-20 md:py-32">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-slate-100">
                <Anchor className="h-4 w-4" />
                PushingLimits SportFishing
              </div>
              <h1 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
                Big Water.
                <br />
                Hard Runs.
                <br />
                Real Fish.
              </h1>
              <p className="max-w-xl text-base text-slate-200 md:text-lg">
                This is a mock image-led homepage direction inspired by the photo-first charter sites you like. It keeps your current booking system, but shifts the public side toward a stronger visual sales page.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/mock-book">
                  <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
                    View Mock Booking Page
                  </Button>
                </Link>
                <a href="tel:+14013638189">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-slate-950 sm:w-auto"
                  >
                    Call (401) 363-8189
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900">
          <div className="container grid gap-6 py-8 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Fish className="h-5 w-5 text-cyan-300" />
              <div>
                <div className="font-semibold">4-Hour Half Days</div>
                <div className="text-sm text-slate-300">Morning or afternoon</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BadgeDollarSign className="h-5 w-5 text-cyan-300" />
              <div>
                <div className="font-semibold">$650 Half Day / $1200 Full Day</div>
                <div className="text-sm text-slate-300">20% tip is standard</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Waves className="h-5 w-5 text-cyan-300" />
              <div>
                <div className="font-semibold">Jerusalem, Rhode Island</div>
                <div className="text-sm text-slate-300">Final meeting details by phone</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)] py-16 md:py-24">
          <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Mock Direction
              </p>
              <h2 className="text-3xl font-bold uppercase md:text-5xl">
                The homepage can sell the experience before it asks for the booking.
              </h2>
              <p className="max-w-2xl text-slate-300">
                The main difference from your current site is emphasis. Instead of leading with mostly text, this version leads with strong fish, boat, water, and captain imagery, then supports it with tighter copy blocks and direct calls to action.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      {item.title}
                    </div>
                    <p className="text-sm text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {catchImages.map((src, index) => (
                <div
                  key={src}
                  className={`overflow-hidden rounded-3xl border border-white/10 ${index === 0 ? "sm:col-span-2" : ""}`}
                >
                  <img
                    src={src}
                    alt={`Fishing gallery image ${index + 1}`}
                    className={`w-full object-cover ${index === 0 ? "h-72" : "h-56"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-16 text-slate-950 md:py-24">
          <div className="container">
            <div className="mb-10 max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                Trip Types
              </p>
              <h2 className="text-3xl font-bold uppercase md:text-5xl">
                Simple structure, stronger visuals
              </h2>
              <p className="text-slate-600">
                These cards mirror the kind of straightforward, image-supported sections used on the reference site.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {mockTrips.map((item) => (
                <div key={item.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{item.price}</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 md:py-24">
          <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="mb-4 flex items-center gap-2 text-cyan-300">
                <Star className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.25em]">Why This Direction Works</span>
              </div>
              <div className="space-y-4 text-sm text-slate-300">
                <p>It feels more like a fishing charter brand and less like a utility booking form.</p>
                <p>It gives you room to feature client catches, the boat, Captain Mike, and species-specific visuals.</p>
                <p>It still supports your current booking workflow instead of forcing a full rebuild.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <h2 className="text-3xl font-bold uppercase md:text-5xl">
                If this is the right direction, the next step is real photo assets.
              </h2>
              <p className="max-w-2xl text-slate-300">
                This mock uses stock photography as stand-ins. To make it believable, we would swap in real catch photos, boat photos, captain photos, and dock shots from your client.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/mock-book">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Open Mock Booking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="tel:+14013638189" className="inline-flex">
                  <Button size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-slate-950">
                    <Phone className="mr-2 h-4 w-4" />
                    Call the Captain
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
