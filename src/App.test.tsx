import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

/**
 * App mounts a BrowserRouter, so these drive it through jsdom's history rather
 * than a MemoryRouter -- that way the route table itself is under test, not a
 * reimplementation of it.
 */
function renderAt(path: string) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

describe("routing", () => {
  it("serves the homepage at /", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  it("serves trip info at /info", () => {
    renderAt("/info");
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
    expect(document.body.textContent).toMatch(/rate|trip/i);
  });

  it("serves the booking page at /book", () => {
    renderAt("/book");
    expect(screen.getByTitle(/fishingbooker/i)).toBeInTheDocument();
  });

  it("shows a 404 page for an unknown route", () => {
    renderAt("/this-route-does-not-exist");
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it("offers a way home from the 404 page", () => {
    // A dead end on a business site is a lost customer.
    renderAt("/nope");
    expect(screen.getByRole("link", { name: /return to home/i })).toHaveAttribute("href", "/");
  });

  it("does not treat a trailing-slash path as missing", () => {
    renderAt("/info/");
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });
});
