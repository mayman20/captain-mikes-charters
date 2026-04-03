import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Anchor, ArrowRight, Compass, Fish, Phone, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const tripStyles = [
  {
    title: "Inshore",
    image: "/homepage/inshore.jpg",
    description: "Half to full day sessions targeting seabass, fluke, striped bass.",
  },
  {
    title: "Nearshore",
    image: "/homepage/nearshore.jpg",
    description:
      "Half to full day bookings 5-8 hours. Targeting striped bass, seabass, fluke, porgy, sharks, bonita, false albacore.",
  },
  {
    title: "Offshore",
    image: "/homepage/offshore.jpg",
    description:
      "Contact for more info. Full day or overnight charters available. Targeting tuna, sharks.",
  },
];

const stats = [
  {
    icon: Anchor,
    label: "Rhode Island departures",
    text: "Private sportfishing charters built around local conditions and the bite.",
  },
  {
    icon: Fish,
    label: "Trip styles",
    text: "Inshore, nearshore, and offshore trips with options for half days, full days, and overnights.",
  },
  {
    icon: Waves,
    label: "Call for specialty trips",
    text: "Reach out directly for offshore and overnight planning, seasonal timing, and trip details.",
  },
];

export default function MockHome() {
  const [scrollY, setScrollY] = useState(0);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setAllowMotion(!media.matches && window.innerWidth >= 768);
    };

    const handleScroll = () => {
      if (!allowMotion) {
        return;
      }

      setScrollY(window.scrollY);
    };

    updateMotionPreference();
    window.addEventListener("resize", updateMotionPreference);
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateMotionPreference);
    }

    return () => {
      window.removeEventListener("resize", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);

      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", updateMotionPreference);
      }
    };
  }, [allowMotion]);

  const heroOffset = allowMotion ? Math.min(scrollY * 0.18, 120) : 0;

  return (
    <Layout>
      <div className="bg-[#f7f1e8] text-slate-950">
        <section className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(5, 23, 38, 0.2), rgba(5, 23, 38, 0.68)), url('/homepage/front_image.jpg')",
              backgroundPosition: `center calc(50% + ${heroOffset}px)`,
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_32%),linear-gradient(90deg,rgba(6,24,38,0.9),rgba(6,24,38,0.38),rgba(6,24,38,0.22))]" />

          <div className="container relative flex min-h-[76svh] items-end py-16 md:min-h-[88svh] md:py-24">
            <div className="max-w-3xl space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm md:text-sm">
                <Compass className="h-4 w-4" />
                Pushing Limits Sportfishing
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-7xl">
                  Rhode Island
                  <br />
                  sport fishing
                  <br />
                  with more pull.
                </h1>
                <p className="max-w-xl text-sm leading-6 text-white/80 md:text-lg md:leading-8">
                  Chase striped bass, seabass, fluke, tuna, sharks, and more with Pushing Limits Sportfishing out of Rhode Island.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/book">
                  <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
                    Book a Charter
                  </Button>
                </Link>
                <a href="tel:+14013638189" className="sm:inline-flex">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-slate-950 sm:w-auto"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    (401) 363-8189
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="container grid gap-5 py-8 md:grid-cols-3 md:py-10">
            {stats.map(({ icon: Icon, label, text }) => (
              <div key={label} className="rounded-[1.75rem] border border-slate-200 bg-[#fcfaf7] p-5 shadow-sm">
                <Icon className="mb-4 h-5 w-5 text-primary" />
                <h2 className="mb-2 text-base font-bold uppercase tracking-[0.08em] text-slate-900">
                  {label}
                </h2>
                <p className="text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#f7f1e8_0%,#ffffff_100%)] py-14 md:py-20">
          <div className="container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Rates Snapshot
              </p>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[-0.03em] text-slate-950 md:text-5xl">
                Straightforward pricing.
              </h2>
              <p className="text-sm leading-6 text-slate-600 md:text-base">
                Rates are easy to scan on mobile and desktop. For offshore and overnight trips, call directly for details and availability.
              </p>
              <Link to="/info" className="inline-flex">
                <Button variant="outline" className="border-slate-300 bg-white hover:bg-slate-950 hover:text-white">
                  View Full Trip Info
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#d7d0c5] bg-white p-3 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.55)] md:p-5">
              <img
                src="/homepage/pricing.png"
                alt="Pushing Limits Sportfishing pricing"
                className="h-auto w-full rounded-[1.25rem] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#ecf4f7] py-14 md:py-20">
          <div className="container">
            <div className="mb-8 max-w-2xl space-y-4 md:mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Types of Fishing
              </p>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-5xl">
                Inshore, nearshore, and offshore at a glance.
              </h2>
              <p className="text-sm leading-6 text-slate-600 md:text-base">
                Pick the trip style that fits the day, the season, and what you want to target.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {tripStyles.map((trip) => (
                <article
                  key={trip.title}
                  className="overflow-hidden rounded-[2rem] border border-[#cfe0e5] bg-white shadow-[0_20px_50px_-38px_rgba(15,23,42,0.7)]"
                >
                  <div className="aspect-[5/4] overflow-hidden">
                    <img
                      src={trip.image}
                      alt={`${trip.title} charter fishing`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-3 p-5 md:p-6">
                    <h3 className="text-3xl font-black tracking-[-0.04em] text-slate-950">
                      {trip.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-600">{trip.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
