# Pushing Limits Sportfishing

Website for [Pushing Limits Sportfishing](https://www.instagram.com/pushinglimitssportfishin/),
a charter fishing business run by Capt. Mike Aiello out of Point Judith, RI.
Trip styles, rates, policies, and what-to-bring details, with booking handled
through FishingBooker's embedded checkout (live availability, deposits, and
payment all run through FishingBooker — the site has no backend to maintain).

This is a real client engagement, not a template project — the
`OWNER_FEEDBACK.md` file in this repo is the actual working doc used to track
the owner's rate, package, and policy decisions during development.

## History: the v1 booking platform

The first version of this site was a full self-hosted booking platform:
slot-based bookings, double-booking prevention enforced at the data layer
(unique constraint + `BEFORE INSERT` trigger), an admin dashboard behind
Supabase Auth, RLS policies scoped so anonymous users could create bookings but
never read customer PII, and confirmation emails via a Supabase Edge Function
and Resend.

The business later consolidated its calendar and payments on FishingBooker, so
the self-hosted booking system was retired in favor of the embed and the site
became fully static. The complete v1 platform — schema, RLS policies, triggers,
edge function, admin dashboard — is preserved at the
[`booking-platform-v1`](../../tree/booking-platform-v1) tag.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix primitives)
- Vitest + Testing Library
- FishingBooker embed for booking and payment

## Structure

```
src/
  pages/                  Home, Info, Booking (FishingBooker embed)
  components/layout/      Header, Footer, Layout
  components/ui/          shadcn/ui primitives
public/homepage/          Site photography and pricing image
```

## Run locally

Need Node 20+.

```bash
npm install
npm run dev
```

Static build with `npm run build` — deployable to any static host
(`public/_redirects` covers SPA routing on Netlify/Cloudflare Pages).

## License

MIT — see [LICENSE](LICENSE).
