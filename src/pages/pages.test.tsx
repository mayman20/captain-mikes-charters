import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import Booking from "./Booking";

function renderPage(page: React.ReactElement) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

describe("Home", () => {
  it("renders the hero and booking CTA", () => {
    renderPage(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book a charter/i })).toHaveAttribute(
      "href",
      "/book"
    );
  });
});

describe("Info", () => {
  it("renders trip info with the captain's phone number", () => {
    renderPage(<Info />);
    expect(screen.getAllByRole("link", { name: /\(401\) 363-8189/ }).length).toBeGreaterThan(0);
  });
});

describe("Booking", () => {
  it("embeds the FishingBooker booking widget with an external fallback link", () => {
    renderPage(<Booking />);
    const iframe = screen.getByTitle(/fishingbooker/i);
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("fishingbooker.com/embeds/book/2169274")
    );
    const fallback = screen.getByRole("link", { name: /open booking/i });
    expect(fallback).toHaveAttribute(
      "href",
      expect.stringContaining("fishingbooker.com/embeds/book/2169274")
    );
  });
});
