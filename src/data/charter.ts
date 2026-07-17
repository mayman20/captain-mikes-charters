// Single source of truth for charter facts shown across the site.
// Prices, trips, techniques, and species mirror the live FishingBooker
// listing (checked 2026-07-17) — update here and every page follows.

export const BOOKING_URL =
  "https://fishingbooker.com/embeds/book/2169274?_slaid=10729308";

export const PHONE_DISPLAY = "(401) 363-8189";
export const PHONE_HREF = "tel:+14013638189";
export const ADDRESS = "1161 Succotash Road, Narragansett, RI";
export const INSTAGRAM_URL = "https://www.instagram.com/pushinglimitssportfishin/";

export interface Species {
  name: string;
  image: string;
}

export const SPECIES = {
  blackSeabass: { name: "Black Seabass", image: "/fish/seabass-black.png" },
  fluke: { name: "Fluke (Flounder)", image: "/fish/flounder.png" },
  scup: { name: "Scup (Porgy)", image: "/fish/scup-porgy.png" },
  tautog: { name: "Tautog", image: "/fish/tautog.png" },
  stripedBass: { name: "Striped Bass", image: "/fish/bass-striped.png" },
  bluefish: { name: "Bluefish", image: "/fish/bluefish-tailor.png" },
  bonito: { name: "Bonito", image: "/fish/bonito.png" },
  falseAlbacore: { name: "False Albacore", image: "/fish/little-tunny-false-albacore.png" },
  squid: { name: "Squid", image: "/fish/squid.png" },
  mahiMahi: { name: "Mahi Mahi", image: "/fish/dolphin-mahi-mahi.png" },
  bluefinTuna: { name: "Bluefin Tuna", image: "/fish/tuna-bluefin.png" },
  yellowfinTuna: { name: "Yellowfin Tuna", image: "/fish/tuna-yellowfin.png" },
} satisfies Record<string, Species>;

export interface RateLine {
  name: string;
  price: number;
  note?: string;
}

/** 25 Regulator — every trip bookable online through FishingBooker. */
export const REGULATOR_RATES: RateLine[] = [
  { name: "Half-Day Inshore (4 hours)", price: 600 },
  { name: "Half-Day Nearshore / Block Island (5 hours)", price: 800 },
  { name: "Evening Squid (5 hours)", price: 800, note: "Seasonal, Apr–Jun" },
  { name: "Full-Day Nearshore / Block Island (8 hours)", price: 1100 },
  { name: "Full-Day Offshore Tuna (11 hours)", price: 1600 },
];

/** 206 Sailfish — booked by phone with the captain. */
export const SAILFISH_RATES: RateLine[] = [
  { name: "Half-Day Inshore (4 hours)", price: 450 },
  { name: "3/4-Day Inshore (6 hours)", price: 650 },
  { name: "Full-Day Inshore (8 hours)", price: 850 },
];

export const OVERNIGHT_NOTE =
  "Overnight tuna and shark trips (12–30 hours) are booked by phone only — call for pricing and timing.";

/** Homepage trip-style cards, mirroring the FishingBooker trip details. */
export const TRIP_STYLES = [
  {
    title: "Inshore",
    image: "/homepage/inshore.jpg",
    imagePosition: "center 34%",
    description:
      "Half-day trips targeted at ground fishing for fluke, seabass, and scup, with tautog (blackfish) in the spring, fall, and winter.",
    techniques: ["Bottom Fishing", "Light Tackle", "Fly Fishing", "Jigging", "Spearfishing"],
    species: [SPECIES.blackSeabass, SPECIES.fluke, SPECIES.scup, SPECIES.tautog],
  },
  {
    title: "Nearshore",
    image: "/homepage/nearshore.jpg",
    imagePosition: "center 35%",
    description:
      "Block Island bass, bluefish, and a mix of bonito and albies — troll or throw light tackle with jigs and live bait. Full days pull a true mixed bag and can be personalized to exactly what you want.",
    techniques: ["Trolling", "Light Tackle", "Jigging", "Popping", "Spinning", "Fly Fishing"],
    species: [
      SPECIES.stripedBass,
      SPECIES.bluefish,
      SPECIES.bonito,
      SPECIES.falseAlbacore,
      SPECIES.blackSeabass,
      SPECIES.fluke,
      SPECIES.scup,
    ],
  },
  {
    title: "Offshore",
    image: "/homepage/offshore.jpg",
    imagePosition: "center 44%",
    description:
      "For pelagic anglers targeting tuna for meat or for game — recreational-size fish or giant bluefin catch and release. Full 11-hour days online, overnights by phone.",
    techniques: ["Trolling", "Jigging", "Popping"],
    species: [SPECIES.bluefinTuna, SPECIES.yellowfinTuna, SPECIES.mahiMahi],
  },
];

export const SQUID_TRIP = {
  title: "Evening Squid Trips",
  season: "Seasonal — April through June",
  detail: "5-hour evening trips departing around 7:00 PM.",
  price: 800,
  species: SPECIES.squid,
};

/** Straight from the FishingBooker listing. */
export const AMENITIES = [
  "GPS",
  "Fishfinder",
  "Radar",
  "Live Bait Well",
  "Ice Box",
  "Spearfishing Equipment",
];

export const TRIP_INCLUDES = [
  "Rods, reels & tackle",
  "Live bait and lures",
  "Fishing license coverage",
  "Catch cleaning & filleting",
  "Drinks on board",
  "First mate",
];
