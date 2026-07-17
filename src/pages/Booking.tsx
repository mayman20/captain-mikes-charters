import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone } from "lucide-react";
import { BOOKING_URL, PHONE_DISPLAY, PHONE_HREF, REGULATOR_RATES } from "@/data/charter";

const bookingImages = [
  { src: "/homepage/catch_stripers.jpg", alt: "Two anglers holding striped bass on a Pushing Limits charter", position: "center 30%" },
  { src: "/homepage/catch_tuna.jpg", alt: "Two anglers holding tuna on a Pushing Limits offshore charter", position: "center 35%" },
];

const rateFor = (fragment: string) =>
  REGULATOR_RATES.find((rate) => rate.name.includes(fragment))?.price ?? 0;

export default function Booking() {
  return (
    <Layout>
      <div className="bg-[#f9efdb] text-slate-950">
        <section className="border-b border-stone-200 bg-[linear-gradient(180deg,#fdf6e3_0%,#eef6fb_100%)]">
          <div className="container grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm uppercase tracking-[0.25em] text-primary shadow-sm">
                <img src="/logo.png" alt="" className="h-6 w-6 rounded-full object-cover" />
                Pushing Limits Sportfishing
              </div>
              <h1 className="text-4xl font-black uppercase leading-none md:text-6xl">
                Book your trip.
              </h1>
              <p className="max-w-2xl text-slate-700">
                Live availability and secure checkout through FishingBooker. Pick a
                date and trip below — the captain confirms departure details by phone.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>Inshore from ${rateFor("Half-Day Inshore")}</span>
                <span className="text-slate-300">/</span>
                <span>Nearshore from ${rateFor("Half-Day Nearshore")}</span>
                <span className="text-slate-300">/</span>
                <span>Offshore tuna ${rateFor("Offshore Tuna").toLocaleString("en-US")}</span>
                <span className="text-slate-300">/</span>
                <span>Overnight trips by phone</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={PHONE_HREF}>
                  <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
                    <Phone className="mr-2 h-4 w-4" />
                    Call {PHONE_DISPLAY}
                  </Button>
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-slate-300 bg-white text-slate-950 hover:bg-slate-950 hover:text-white sm:w-auto"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open booking in a new tab
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid items-stretch gap-4 sm:grid-cols-2">
              {bookingImages.map((image) => (
                <div
                  key={image.src}
                  className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-80 w-full object-cover"
                    style={{ objectPosition: image.position }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container max-w-5xl">
            <div className="overflow-hidden rounded-[1.5rem] border border-[#ddd3bd] bg-white shadow-[0_20px_45px_-36px_rgba(15,23,42,0.55)]">
              <iframe
                src={BOOKING_URL}
                title="Book a trip with Pushing Limits Sportfishing on FishingBooker"
                className="block h-[80vh] min-h-[640px] w-full"
              />
            </div>
            <p className="mt-4 text-center text-sm text-slate-600">
              Trouble with the calendar? Use the new-tab link above or call {PHONE_DISPLAY}. Overnight tuna and shark trips are booked by phone only.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
