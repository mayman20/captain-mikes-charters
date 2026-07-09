# Captain Mike's Charters (Pushing Limits Sportfishing)

Online booking platform built for Pushing Limits Sportfishing, a working charter
fishing business in Point Judith, RI. Customers pick a date and a trip slot
(half-day AM, half-day PM, or full day) and submit a booking directly from the
site. The owner runs the calendar from an admin dashboard: reviewing bookings,
canceling or restoring them, blocking dates off, and exporting a CSV.

This was a real client engagement, not a template project — the `OWNER_FEEDBACK.md`
file in this repo is the actual working doc used to track the owner's rate,
package, and policy decisions during development.

## Screenshots

Homepage and trip-package imagery used in the live site is in
[`public/homepage/`](public/homepage) and an early design reference is in
[`docs/`](docs). (Space reserved here for a hosted screenshot/GIF of the
booking flow and admin dashboard.)

## Live demo

The production Supabase backend for this project has since been decommissioned
(free-tier project, taken down after the engagement wrapped), so the previously
hosted link no longer resolves. The code here is otherwise exactly what ran in
production — see [Run locally](#run-locally) below to stand up a working copy
against your own Supabase project.

## Key features

- **Slot-based booking** — customers book an AM, PM, or full-day slot per date;
  a full-day booking blocks both half-day slots and vice versa.
- **Double-booking prevention at the data layer, not just the UI** — a unique
  constraint on `(date, slot_type)` plus a `BEFORE INSERT` trigger
  (`check_booking_availability`) reject a conflicting booking even under
  concurrent submissions, so the guarantee doesn't depend on the frontend
  checking availability first.
- **Admin dashboard** — real Supabase Auth (email/password) gates booking
  management: confirm/cancel/restore, delete, block or unblock calendar slots,
  and export bookings to CSV.
- **Booking confirmation email** — a Supabase Edge Function (`send-booking-email`)
  sends a confirmation to the customer and a notification to the owner via
  Resend on every successful booking.
- **Row Level Security scoped by role, not by trust** — the public can create a
  booking (`INSERT`) but cannot read booking rows, which hold customer name,
  phone, and email. Public availability checks go through a `SECURITY DEFINER`
  Postgres function that returns only `date` / `slot_type` / `status` — see
  [Security](#security) below.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix primitives)
- TanStack Query for server state
- React Hook Form + Zod for form validation
- Supabase: Postgres, Row Level Security, Auth, Edge Functions (Deno)
- Resend for transactional email
- Vitest + Testing Library (test harness is wired up; the suite is currently thin)

## Architecture

```
Browser (React SPA)
  │
  ├─ Public booking form ──► Supabase Postgres: INSERT into bookings
  │                          (anon role, RLS: INSERT-only, no SELECT)
  │
  ├─ Availability calendar ─► Supabase RPC: get_booking_availability()
  │                          (SECURITY DEFINER fn, returns date/slot_type/status only)
  │
  ├─ Admin dashboard ───────► Supabase Auth (authenticated role) + Postgres
  │                          (RLS: SELECT/UPDATE/DELETE on bookings & blocked_slots)
  │
  └─ On booking created ────► Edge Function: send-booking-email ──► Resend API
```

All schema, RLS policies, and triggers live in `supabase/migrations/` and are
applied in order by the Supabase CLI — there's no admin-panel-configured state
that isn't captured in version control.

## Security

The original migration allowed anonymous `SELECT` on `bookings`
(`USING (true)`), which — combined with the table storing customer name,
phone, and email — meant anyone with the anon API key could read every
customer's contact info. That policy has been fixed:

- `bookings` SELECT is now `TO authenticated` only (the admin dashboard, which
  authenticates via Supabase Auth).
- The public availability calendar reads through
  `public.get_booking_availability(start_date, end_date)`, a `SECURITY
  DEFINER` function whose return type is hard-limited to
  `(date, slot_type, status)` — there's no code path for anon to pull PII off
  this table.
- Booking creation stays `INSERT`-only for anon; the client no longer asks
  PostgREST to return the inserted row (which RLS would block for anon
  post-fix), it just reuses the form data it already has to fire the
  confirmation email.

See `supabase/migrations/20260131160735_c40d2c3c-27b6-4949-a6c5-53e9ec4ac02c.sql`
for the policy and function definitions.

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
cp .env.example .env
# fill in VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_PROJECT_ID
# from your Supabase project settings

npm install

# apply schema/policies to your Supabase project
supabase link --project-ref <your-project-ref>
supabase db push

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

## License

MIT — see [LICENSE](LICENSE).
