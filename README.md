# Captain Mike's Charters

Booking platform for a working charter fishing business. Customers book trips, the owner manages the calendar and bookings, and confirmation emails fire on submit.

## Stack

React 18, TypeScript, Vite, Tailwind, shadcn/ui. Supabase Postgres + Row Level Security + Edge Functions for the backend. Vitest for tests.

## How it works

1. Customer submits a booking from the public page.
2. Supabase writes the booking. RLS policies and DB constraints prevent double-booking.
3. The `send-booking-email` Edge Function fires confirmation emails to the customer and the owner.
4. The owner uses the admin dashboard to review, cancel, restore, or delete bookings, block calendar slots, and export CSV.

## Structure

```
src/
  pages/                  Route pages (booking, admin, info)
  components/             UI plus booking and admin components
  hooks/                  Booking and auth hooks
  integrations/supabase/  Supabase client and generated types
supabase/
  migrations/             Schema, policies, triggers
  functions/send-booking-email/
```

## Run locally

Need Node 20+ and a Supabase project.

```bash
# root .env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...

npm install
npm run dev
```

## Edge Function secrets

```bash
supabase secrets set \
  RESEND_API_KEY=... \
  RESEND_FROM_EMAIL=... \
  OWNER_EMAIL=...
```

## Notes

- Free-tier Supabase projects auto-pause after inactivity.
- Resend requires a verified sending domain before the email function works.
- Owner feedback tracked in `OWNER_FEEDBACK.md`.
