# PushingLimits SportFishing Website

Booking website for PushingLimits SportFishing with a public booking flow and an owner-only admin dashboard.

## Stack

### Frontend
- Vite 6
- React 18 + TypeScript
- React Router
- Tailwind CSS + shadcn/ui
- TanStack Query

### Backend
- Supabase Postgres (bookings, blocked availability)
- Supabase Auth (admin login)
- Supabase Row Level Security policies
- Supabase Edge Function (`send-booking-email`) for confirmation emails

## Core Features

- Public booking page with date and slot selection (`AM`, `PM`, `FULL`)
- Availability enforcement to prevent double-booking
- Admin dashboard to:
  - view all bookings
  - cancel/restore/delete bookings
  - block calendar slots
  - export bookings to CSV
- Automatic email notifications to customer and owner after booking

## Architecture

1. Customer submits booking from frontend.
2. Frontend inserts booking into `public.bookings` via Supabase client.
3. DB constraints, trigger, and RLS validate availability and permissions.
4. Frontend invokes Supabase Edge Function `send-booking-email`.
5. Edge Function sends emails through Gmail API OAuth credentials.

## Project Structure

```txt
src/
  pages/                # Route pages (Index, Book, Info, Admin)
  components/           # UI and feature components
  hooks/                # Booking/auth data hooks
  integrations/supabase # Generated types + Supabase client
supabase/
  migrations/           # Schema, RLS, policies, triggers
  functions/
    send-booking-email/ # Edge Function for email notifications
```

## Environment Variables

### Frontend (`.env`)

Required for local app runtime:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

### Edge Function Secrets (Supabase project secrets)

Required by `supabase/functions/send-booking-email/index.ts`:

- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `GMAIL_REFRESH_TOKEN`
- `GMAIL_USER`
- `OWNER_EMAIL`

Set these with Supabase CLI or Dashboard secrets management.

## Local Development

### Prerequisites

- Node.js 20+
- npm
- Supabase project access
- Optional: Supabase CLI

### Start app

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build
npm run preview
npm run lint
npm test
```

## Supabase Operations

Apply latest database changes:

```bash
supabase db push
```

Deploy email Edge Function:

```bash
supabase functions deploy send-booking-email
```

Set Edge Function secrets:

```bash
supabase secrets set GMAIL_CLIENT_ID=... GMAIL_CLIENT_SECRET=... GMAIL_REFRESH_TOKEN=... GMAIL_USER=... OWNER_EMAIL=...
```

## Deployment Notes

- Frontend can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, etc).
- Supabase remains the backend service (database/auth/functions).
- Ensure frontend env vars point to the same Supabase project as deployed migrations/functions.

## Troubleshooting

- `Supabase appears down after inactivity`: on Free plan, inactive projects can auto-pause. Resume from Supabase dashboard and wait for warm-up.
- `Bookings insert fails`: check RLS/policies and trigger constraints in `supabase/migrations`.
- `No emails sent`: verify function deployed, secrets set, and Gmail OAuth refresh token still valid.

## Email Reliability Note

- Current setup uses Gmail API OAuth from Supabase Edge Function `send-booking-email`.
- If customer/owner confirmations stop, first check function logs for `401` gateway errors or Gmail `invalid_grant`.
- Keep `[functions.send-booking-email] verify_jwt = false` in `supabase/config.toml` and redeploy after function/config changes.
- Run periodic booking tests to verify confirmations are still sending.
- If email reliability degrades again, pivot to a transactional provider (Resend/SendGrid/Postmark) as the long-term fallback.

## Documentation Workflow

- Owner requirement tracking lives in `OWNER_FEEDBACK.md`.
- Keep `Phase 1` items aligned with launch-critical booking behavior.
- Move non-critical enhancements to `Phase 2` until launch baseline is stable.

## Owner Account Questions (Access + Login)

- Ask owner for the final notification email address to store as Supabase secret `OWNER_EMAIL` (used for booking alert emails).
- Confirm owner wants booking alerts sent to that same email long-term, or to a different business email.
- Ask owner what admin login credentials they want for website admin access.
- If using SQL-based admin records, add/update owner credentials in Supabase `admin_users` table.
- If continuing with Supabase Auth login flow, create/update owner user in Supabase Auth and share final login details with owner.
