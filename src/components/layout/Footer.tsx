import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt=""
              className="h-9 w-9 rounded-full border border-primary-foreground/30 object-cover"
            />
            <span className="font-bold">Pushing Limits Sportfishing</span>
          </div>

          <div className="flex flex-col gap-2 text-sm text-primary-foreground/90">
            <a href="tel:+14013638189" className="flex items-center gap-2 hover:text-primary-foreground">
              <Phone className="h-4 w-4" />
              (401) 363-8189
            </a>
          </div>

          <div className="flex gap-4 text-sm">
            <Link to="/book" className="hover:underline">Book</Link>
            <Link to="/info" className="hover:underline">Info</Link>
            <a
              href="https://www.instagram.com/pushinglimitssportfishin/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-center text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} Pushing Limits Sportfishing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
