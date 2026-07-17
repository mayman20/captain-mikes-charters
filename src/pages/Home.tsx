import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Anchor, ArrowRight, Compass, CreditCard, Fish, MapPin, Phone, Waves, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  REGULATOR_RATES,
  SQUID_TRIP,
  TRIP_STYLES,
} from "@/data/charter";

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

const policyHighlights = [
  {
    icon: CreditCard,
    title: "Simple, secure booking",
    text: "Online trips are paid through FishingBooker's secure checkout. Phone bookings are secured with a 20% deposit or card hold.",
  },
  {
    icon: Anchor,
    title: "Boat capacity",
    text: "Big boat up to 4 people. Small boat up to 3 people. Final boat assignment depends on the trip.",
  },
  {
    icon: Wrench,
    title: "Broken equipment policy",
    text: "If rods, reels, gear, or boat parts are broken at client fault, the customer is responsible for 50% of the value.",
  },
];

const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;

export default function Home() {
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
      <div className="bg-[#f9efdb] text-slate-950">
        <section className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(5, 23, 38, 0.2), rgba(5, 23, 38, 0.68)), url('/homepage/front_image.jpg')",
              backgroundPosition: `center calc(34% + ${heroOffset}px)`,
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
                <a href={PHONE_HREF} className="sm:inline-flex">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-slate-950 sm:w-auto"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {PHONE_DISPLAY}
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

        <section className="bg-[linear-gradient(180deg,#f9efdb_0%,#ffffff_100%)] py-14 md:py-20">
          <div className="container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                Rates Snapshot
              </p>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[-0.03em] text-slate-950 md:text-5xl">
                Straightforward pricing.
              </h2>
              <p className="text-sm leading-6 text-slate-600 md:text-base">
                No surprises — the rate you see is the rate you pay, and live
                availability for every online trip is on the booking page.
                Offshore overnights are planned by phone.
              </p>
              <div className="flex flex-wrap gap-2">
                {REGULATOR_RATES.filter((rate) => !rate.note).map((rate) => (
                  <span
                    key={rate.name}
                    className="rounded-full border border-[#e3d9c4] bg-[#fdf6e3] px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {rate.name.replace(/ \(.*\)/, "")} · {formatPrice(rate.price)}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/book">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
                    Book Now
                  </Button>
                </Link>
                <Link to="/info" className="inline-flex">
                  <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-950 hover:text-white sm:w-auto">
                    View Full Trip Info
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#ddd3bd] shadow-[0_20px_45px_-36px_rgba(15,23,42,0.55)]">
              <img
                src="/homepage/rates_bg.jpg"
                alt="The 25 Regulator idling on calm grey water off Point Judith"
                className="h-full max-h-[640px] w-full object-cover object-[center_60%]"
              />
              <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-slate-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                The 25 Regulator
              </span>
            </div>
          </div>
        </section>

        <section className="bg-[#ecf4f7] py-14 md:py-20">
          <div className="container">
            <div className="mb-8 max-w-2xl space-y-4 md:mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                Types of Fishing
              </p>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-5xl">
                Inshore, nearshore, and offshore at a glance.
              </h2>
              <p className="text-sm leading-6 text-slate-600 md:text-base">
                The same trips, techniques, and target species you'll find on the
                booking calendar.
              </p>
            </div>

            <div className="grid items-start gap-6 md:grid-cols-3">
              {TRIP_STYLES.map((trip) => (
                <article
                  key={trip.title}
                  className="overflow-hidden rounded-[2rem] border border-[#cfe0e5] bg-white shadow-[0_20px_50px_-38px_rgba(15,23,42,0.7)]"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={trip.image}
                      alt={`${trip.title} charter fishing`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      style={{ objectPosition: trip.imagePosition }}
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-4 p-5 md:p-6">
                    <h3 className="text-3xl font-black tracking-[-0.04em] text-slate-950">
                      {trip.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {trip.where}
                    </p>
                    <p className="text-sm leading-6 text-slate-600">{trip.description}</p>
                    <div className="space-y-3 border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Techniques
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trip.techniques.map((technique) => (
                          <span
                            key={technique}
                            className="rounded-full border border-[#e3d9c4] bg-[#fdf6e3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Targeted Species
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {trip.species.map((species) => (
                          <div
                            key={species.name}
                            className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-2"
                          >
                            <img
                              src={species.image}
                              alt={species.name}
                              className="h-10 w-full object-contain"
                              loading="lazy"
                            />
                            <span className="text-center text-[11px] font-semibold leading-tight text-slate-700">
                              {species.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center gap-5 rounded-[2rem] border border-[#cfe0e5] bg-white p-5 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.7)] sm:flex-row md:p-6">
              <img
                src={SQUID_TRIP.species.image}
                alt={SQUID_TRIP.species.name}
                className="h-16 w-28 shrink-0 object-contain"
                loading="lazy"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-black tracking-[-0.02em] text-slate-950">
                  {SQUID_TRIP.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {SQUID_TRIP.season}. {SQUID_TRIP.detail}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 sm:items-end">
                <span className="text-2xl font-black text-accent">{formatPrice(SQUID_TRIP.price)}</span>
                <Link to="/book">
                  <Button size="sm" variant="outline" className="border-slate-300 bg-white hover:bg-slate-950 hover:text-white">
                    Check dates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f9efdb_100%)] py-14 md:py-20">
          <div className="container">
            <div className="mb-8 max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                Booking Details
              </p>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-5xl">
                Important details up front.
              </h2>
              <p className="text-sm leading-6 text-slate-600 md:text-base">
                Deposit, boat capacity, and cancellation basics — know them before you book.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {policyHighlights.map(({ icon: Icon, title, text }) => (
                <div key={title} className="border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="mb-4 h-5 w-5 text-primary" />
                  <h3 className="mb-2 text-base font-bold uppercase tracking-[0.08em] text-slate-900">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-base font-bold uppercase tracking-[0.08em] text-slate-900">
                  Cancellation policy
                </h3>
                <div className="space-y-2 text-sm leading-6 text-slate-600">
                  <p>Online bookings cancel free up to 3 days before the trip; after that, or for no-shows, the full amount paid is forfeited.</p>
                  <p>Phone-booked trips confirm cancellation terms with the captain directly.</p>
                  <p>Weather decisions are at the captain’s discretion, and weather-related trips can be rescheduled.</p>
                </div>
              </div>

              <div className="border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-base font-bold uppercase tracking-[0.08em] text-slate-900">
                  Packages at a glance
                </h3>
                <div className="space-y-2 text-sm leading-6 text-slate-600">
                  <p>Inshore, nearshore, squid, and full-day offshore tuna trips can all be booked online.</p>
                  <p>Overnight tuna and shark trips are handled by phone.</p>
                  <p>For overnight trips, call directly for information before booking.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
