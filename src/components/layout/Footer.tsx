import { Anchor, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-2">
            <Anchor className="h-6 w-6" />
            <span className="font-bold">Captain Mike's Charters</span>
          </div>

          <div className="flex flex-col gap-2 text-sm text-primary-foreground/90">
            <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary-foreground">
              <Phone className="h-4 w-4" />
              (555) 123-4567
            </a>
            <a href="mailto:book@gulfrunner.com" className="flex items-center gap-2 hover:text-primary-foreground">
              <Mail className="h-4 w-4" />
              book@gulfrunner.com
            </a>
          </div>

          <div className="flex gap-4 text-sm">
            <Link to="/book" className="hover:underline">Book</Link>
            <Link to="/" className="hover:underline">Info</Link>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-center text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} Captain Mike's Charters. All rights reserved.
        </div>
        <div className="mt-2 text-center">
          <Link
            to="/admin"
            className="text-[11px] text-primary-foreground/60 hover:text-primary-foreground underline underline-offset-2"
          >
            Admin Calendar
          </Link>
        </div>
      </div>
    </footer>
  );
}
