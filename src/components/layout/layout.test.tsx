import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from "@/data/charter";

const renderAt = (ui: React.ReactElement, path = "/") =>
  render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

describe("Header", () => {
  it("links to all three pages", () => {
    renderAt(<Header />);
    const nav = screen.getAllByRole("navigation")[0];
    for (const [label, href] of [
      ["Home", "/"],
      ["Trip Info", "/info"],
      // "Book Now" is deliberately both a nav link and a CTA button, so assert
      // that every control with that name agrees on the destination.
      ["Book Now", "/book"],
    ] as const) {
      const links = within(nav).getAllByRole("link", { name: label });
      expect(links.length, `${label} link`).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", href);
      }
    }
  });

  it("routes the logo back to the homepage", () => {
    renderAt(<Header />);
    expect(screen.getByAltText(/logo/i).closest("a")).toHaveAttribute("href", "/");
  });

  it("marks the current page as active", () => {
    renderAt(<Header />, "/info");
    const nav = screen.getAllByRole("navigation")[0];
    expect(within(nav).getByRole("link", { name: "Trip Info" }).className).toContain(
      "nav-link-active"
    );
  });

  it("gives the mobile menu toggle an accessible name", () => {
    // It is an icon-only button, so without aria-label a screen reader announces nothing.
    renderAt(<Header />);
    expect(screen.getByRole("button", { name: /toggle menu/i })).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("dials the same number the rest of the site advertises", () => {
    // The footer used to hard-code the captain's number instead of importing it,
    // so changing charter.ts silently left a stale number on every page.
    renderAt(<Footer />);
    const link = screen.getByRole("link", {
      name: new RegExp(PHONE_DISPLAY.replace(/[()]/g, "\\$&")),
    });
    expect(link).toHaveAttribute("href", PHONE_HREF);
  });

  it("opens Instagram in a new tab without leaking the referrer", () => {
    renderAt(<Footer />);
    const ig = screen.getByRole("link", { name: /instagram/i });
    expect(ig).toHaveAttribute("href", INSTAGRAM_URL);
    expect(ig).toHaveAttribute("target", "_blank");
    expect(ig).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("links to booking and info", () => {
    renderAt(<Footer />);
    expect(screen.getByRole("link", { name: /^book$/i })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: /^info$/i })).toHaveAttribute("href", "/info");
  });

  it("shows the current year in the copyright", () => {
    renderAt(<Footer />);
    expect(document.body.textContent).toContain(String(new Date().getFullYear()));
  });
});
