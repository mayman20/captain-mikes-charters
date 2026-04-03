# Captain Mike's Charters

Booking platform for a charter fishing business, built to handle customer reservations, owner-side operations, and email confirmations.

## What This Project Shows

- Full-stack product work for a real business
- React and TypeScript frontend development
- Supabase-backed data modeling, auth, and access control
- Operational workflows such as blocking slots, managing bookings, and exporting data

## Core Features

- Public booking flow with date and trip selection
- Availability protection to prevent double-booking
- Admin dashboard for reviewing, canceling, restoring, and deleting bookings
- Calendar slot blocking for owner-side schedule control
- CSV export for business operations
- Booking confirmation email flow through a Supabase Edge Function

## Tech Stack

- Frontend: React 18, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui
- Data and auth: Supabase Postgres, Supabase Auth, Row Level Security
- Async workflows: Supabase Edge Functions
- Testing and linting: Vitest, ESLint

## Architecture

1. A customer submits a booking from the frontend.
2. The app writes booking data to Supabase.
3. Database constraints, RLS policies, and triggers enforce booking rules.
4. The frontend invokes the `send-booking-email` Edge Function.
5. The function sends confirmation emails to the customer and owner.

## Project Structure

```txt
src/
  pages/                  Route pages such as booking, admin, and info
  components/             Reusable UI plus booking and admin components
  hooks/                  Booking and auth hooks
  integrations/supabase/  Supabase client and generated types
supabase/
  migrations/             Schema, policies, triggers, and constraints
  functions/
    send-booking-email/   Booking confirmation email function
```

## Local Development

### Prerequisites

- Node.js 20+
- npm
- Supabase project access
- Optional: Supabase CLI

### Frontend env vars

Create `.env` with:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

### Run locally

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run lint
npm test
```

## Edge Function Secrets

The `send-booking-email` function should be configured with Resend:

```bash
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
OWNER_EMAIL=...
```

## Supabase Commands

Apply DB changes:

```bash
supabase db push
```

Deploy the email function:

```bash
supabase functions deploy send-booking-email
```

Set secrets:

```bash
supabase secrets set RESEND_API_KEY=... RESEND_FROM_EMAIL=... OWNER_EMAIL=...
```

## Notes

- Free-tier Supabase projects can auto-pause after inactivity.
- Resend's official pricing currently lists a free tier with 3,000 emails per month and a 100 emails/day transactional limit, which is usually enough for early launch traffic before upgrading.
- Resend requires a verified sending domain and API key before the booking email function can be deployed successfully.
- Owner feedback and launch tracking live in `OWNER_FEEDBACK.md`.
