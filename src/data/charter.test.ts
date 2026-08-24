import { describe, expect, it } from "vitest";
import {
  ADDRESS,
  AMENITIES,
  BOOKING_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGULATOR_RATES,
  SAILFISH_RATES,
  SPECIES,
  SQUID_TRIP,
  TRIP_INCLUDES,
  TRIP_STYLES,
  type RateLine,
} from "./charter";

/**
 * charter.ts is the single source of truth for everything a customer is quoted:
 * prices, the phone number, and the booking URL. Nothing here tests React — these
 * are invariants about the business data itself, because a wrong value in this file
 * is a real-money bug on a live charter site, not a cosmetic one.
 */

const allRates: Array<[string, RateLine[]]> = [
  ["REGULATOR_RATES", REGULATOR_RATES],
  ["SAILFISH_RATES", SAILFISH_RATES],
];

describe("contact details", () => {
  it("PHONE_HREF dials exactly the number PHONE_DISPLAY shows", () => {
    // A typo here means the tap-to-call button rings the wrong number and the
    // captain never knows he lost the booking.
    const displayed = PHONE_DISPLAY.replace(/\D/g, "");
    const dialed = PHONE_HREF.replace(/\D/g, "");
    expect(PHONE_HREF).toMatch(/^tel:\+1/);
    expect(dialed).toBe(`1${displayed}`);
  });

  it("shows a complete 10-digit US number", () => {
    expect(PHONE_DISPLAY.replace(/\D/g, "")).toHaveLength(10);
  });

  it("has a Rhode Island address and an Instagram profile URL", () => {
    expect(ADDRESS).toMatch(/,\s*RI$/);
    expect(INSTAGRAM_URL).toMatch(/^https:\/\/www\.instagram\.com\/[\w.]+\/$/);
  });
});

describe("BOOKING_URL", () => {
  it("points at the captain's own FishingBooker listing over https", () => {
    // If this drifts, every booking on the site goes to the wrong boat -- or nowhere.
    const url = new URL(BOOKING_URL);
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("fishingbooker.com");
    expect(url.pathname).toBe("/embeds/book/2169274");
  });
});

describe.each(allRates)("%s", (_name, rates) => {
  it("is not empty", () => {
    expect(rates.length).toBeGreaterThan(0);
  });

  it("prices every trip as a positive whole number of dollars", () => {
    for (const rate of rates) {
      expect(Number.isInteger(rate.price), `${rate.name} price must be a whole number`).toBe(true);
      expect(rate.price, `${rate.name} must cost something`).toBeGreaterThan(0);
    }
  });

  it("has no duplicate trip names", () => {
    // Duplicates would collide as React keys and read as a mistake to a customer.
    const names = rates.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("names every trip with its duration", () => {
    for (const rate of rates) {
      expect(rate.name, `${rate.name} should state its length`).toMatch(/\(\d+\s*hours?\)/);
    }
  });
});

describe("rate sanity", () => {
  const priceOf = (rates: RateLine[], fragment: string) =>
    rates.find((r) => r.name.includes(fragment))?.price;

  it("charges more for a longer day on the same water", () => {
    const halfNearshore = priceOf(REGULATOR_RATES, "Half-Day Nearshore");
    const fullNearshore = priceOf(REGULATOR_RATES, "Full-Day Nearshore");
    expect(halfNearshore).toBeDefined();
    expect(fullNearshore).toBeDefined();
    expect(fullNearshore!).toBeGreaterThan(halfNearshore!);
  });

  it("charges more to run offshore than nearshore for a full day", () => {
    const fullNearshore = priceOf(REGULATOR_RATES, "Full-Day Nearshore");
    const offshore = priceOf(REGULATOR_RATES, "Offshore Tuna");
    expect(offshore!).toBeGreaterThan(fullNearshore!);
  });

  it("prices the smaller Sailfish below the Regulator for the same half-day inshore trip", () => {
    const regulator = priceOf(REGULATOR_RATES, "Half-Day Inshore");
    const sailfish = priceOf(SAILFISH_RATES, "Half-Day Inshore");
    expect(regulator).toBeDefined();
    expect(sailfish).toBeDefined();
    expect(sailfish!).toBeLessThan(regulator!);
  });
});

describe("SQUID_TRIP", () => {
  it("quotes the same price as the Evening Squid line in REGULATOR_RATES", () => {
    // The squid price is stored twice -- once as a rate line, once on the trip
    // card. This is the test that catches them drifting apart.
    const rateLine = REGULATOR_RATES.find((r) => r.name.includes("Evening Squid"));
    expect(rateLine, "Evening Squid must exist in REGULATOR_RATES").toBeDefined();
    expect(SQUID_TRIP.price).toBe(rateLine!.price);
  });

  it("is labelled seasonal in both places", () => {
    const rateLine = REGULATOR_RATES.find((r) => r.name.includes("Evening Squid"));
    expect(rateLine!.note).toMatch(/seasonal/i);
    expect(SQUID_TRIP.season).toMatch(/seasonal/i);
  });
});

describe("SPECIES", () => {
  it("gives every species a name and an image under /fish/", () => {
    for (const [key, species] of Object.entries(SPECIES)) {
      expect(species.name.trim(), `${key} needs a name`).not.toBe("");
      expect(species.image, `${key} image path`).toMatch(/^\/fish\/[\w.-]+\.(png|jpg|jpeg|webp)$/);
    }
  });

  it("does not reuse one image for two different species", () => {
    const images = Object.values(SPECIES).map((s) => s.image);
    expect(new Set(images).size).toBe(images.length);
  });
});

describe("TRIP_STYLES", () => {
  it("covers inshore, nearshore and offshore", () => {
    expect(TRIP_STYLES.map((t) => t.title)).toEqual(["Inshore", "Nearshore", "Offshore"]);
  });

  it("gives every trip style a photo, a description, techniques and target species", () => {
    for (const style of TRIP_STYLES) {
      expect(style.image, `${style.title} image`).toMatch(/^\/homepage\/[\w.-]+\.(jpg|jpeg|png|webp)$/);
      expect(style.where.trim(), `${style.title} where`).not.toBe("");
      expect(style.description.length, `${style.title} description`).toBeGreaterThan(40);
      expect(style.techniques.length, `${style.title} techniques`).toBeGreaterThan(0);
      expect(style.species.length, `${style.title} species`).toBeGreaterThan(0);
    }
  });

  it("only lists species that exist in the SPECIES catalogue", () => {
    const known = new Set(Object.values(SPECIES).map((s) => s.name));
    for (const style of TRIP_STYLES) {
      for (const species of style.species) {
        expect(known.has(species.name), `${species.name} on ${style.title}`).toBe(true);
      }
    }
  });

  it("does not repeat a technique within one trip style", () => {
    for (const style of TRIP_STYLES) {
      expect(new Set(style.techniques).size, `${style.title} techniques`).toBe(
        style.techniques.length
      );
    }
  });
});

describe("listing copy", () => {
  it("lists amenities and inclusions without blanks or duplicates", () => {
    for (const [label, list] of [
      ["AMENITIES", AMENITIES],
      ["TRIP_INCLUDES", TRIP_INCLUDES],
    ] as const) {
      expect(list.length, label).toBeGreaterThan(0);
      expect(new Set(list).size, `${label} duplicates`).toBe(list.length);
      for (const item of list) {
        expect(item.trim(), `${label} blank entry`).not.toBe("");
      }
    }
  });
});
