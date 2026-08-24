import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "./Booking";
import Info from "./Info";
import {
  BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGULATOR_RATES,
  SAILFISH_RATES,
} from "@/data/charter";

function renderPage(page: React.ReactElement) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

const money = (n: number) => n.toLocaleString("en-US");

describe("Booking page — the money path", () => {
  it("loads the FishingBooker checkout from BOOKING_URL, not a copied literal", () => {
    renderPage(<Booking />);
    expect(screen.getByTitle(/fishingbooker/i)).toHaveAttribute("src", BOOKING_URL);
  });

  it("offers a new-tab fallback to the same URL when the iframe is blocked", () => {
    // Some mobile browsers and privacy extensions refuse third-party iframes. If the
    // fallback link ever drifts from the iframe src, those customers book nothing.
    renderPage(<Booking />);
    const fallback = screen.getByRole("link", { name: /open booking in a new tab/i });
    expect(fallback).toHaveAttribute("href", BOOKING_URL);
    expect(fallback).toHaveAttribute("target", "_blank");
    expect(fallback).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("never advertises a $0 trip", () => {
    // Booking.tsx resolves its headline prices with
    //   REGULATOR_RATES.find(r => r.name.includes(fragment))?.price ?? 0
    // so renaming a rate in charter.ts does not break the build -- it silently
    // renders "Inshore from $0" on a live charter site. This is that guard.
    renderPage(<Booking />);
    expect(document.body.textContent).not.toMatch(/\$0\b/);
  });

  it("quotes inshore, nearshore and offshore at the real REGULATOR_RATES prices", () => {
    renderPage(<Booking />);
    const body = document.body.textContent ?? "";
    const priceFor = (fragment: string) =>
      REGULATOR_RATES.find((r) => r.name.includes(fragment))!.price;

    expect(body).toContain(`Inshore from $${money(priceFor("Half-Day Inshore"))}`);
    expect(body).toContain(`Nearshore from $${money(priceFor("Half-Day Nearshore"))}`);
    expect(body).toContain(`Offshore tuna $${money(priceFor("Offshore Tuna"))}`);
  });

  it("lets a customer call the captain instead of booking online", () => {
    renderPage(<Booking />);
    const callLinks = screen.getAllByRole("link", { name: new RegExp(`call.*${PHONE_DISPLAY.replace(/[()]/g, "\\$&")}`, "i") });
    expect(callLinks.length).toBeGreaterThan(0);
    expect(callLinks[0]).toHaveAttribute("href", PHONE_HREF);
  });

  it("tells customers overnight trips are phone-only", () => {
    // Overnight trips are not on FishingBooker at all. If this line disappears,
    // customers assume the calendar is the whole offering.
    renderPage(<Booking />);
    expect(document.body.textContent).toMatch(/overnight[\s\S]{0,80}phone/i);
  });
});

describe("Info page — rate card", () => {
  it("renders every Regulator rate at its charter.ts price", () => {
    renderPage(<Info />);
    const body = document.body.textContent ?? "";
    for (const rate of REGULATOR_RATES) {
      expect(body, `missing ${rate.name}`).toContain(rate.name);
      expect(body, `missing price for ${rate.name}`).toContain(`$${money(rate.price)}`);
    }
  });

  it("renders every Sailfish rate at its charter.ts price", () => {
    renderPage(<Info />);
    const body = document.body.textContent ?? "";
    for (const rate of SAILFISH_RATES) {
      expect(body, `missing ${rate.name}`).toContain(rate.name);
      expect(body, `missing price for ${rate.name}`).toContain(`$${money(rate.price)}`);
    }
  });

  it("formats four-figure prices with a thousands separator", () => {
    // "$1100" on a rate card reads as a typo; "$1,100" reads as a price.
    renderPage(<Info />);
    const body = document.body.textContent ?? "";
    const fourFigure = REGULATOR_RATES.filter((r) => r.price >= 1000);
    expect(fourFigure.length).toBeGreaterThan(0);
    for (const rate of fourFigure) {
      expect(body).toContain(`$${money(rate.price)}`);
      expect(body).not.toContain(`$${rate.price}`);
    }
  });

  it("shows the captain's phone number as a tel: link", () => {
    renderPage(<Info />);
    const links = screen.getAllByRole("link", { name: new RegExp(PHONE_DISPLAY.replace(/[()]/g, "\\$&")) });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", PHONE_HREF);
    }
  });
});
