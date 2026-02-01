# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Future plans

- [x] Add secure admin login with Supabase Auth (no hardcoded passwords).
- [x] Add owner-only calendar page to view active bookings and manage availability.
- [x] Add automated booking confirmation notifications (email).
- [ ] Add notification controls (email/SMS toggles).
- [ ] Add SMS notifications via a provider (e.g., Twilio) with message like:
  "Captain Mike's Charters - Booking Confirmed" + date/time/duration.
- [ ] Add a customer booking page where users can view, reschedule, and cancel their booking.

## Things to confirm with the owner
- Cancellation policy window (e.g., allowed up to 24 hours before trip? refunds?).
- Are current prices correct?
- Are current trip times correct?
- Should AM and PM both be offered every day?
- If someone books AM or PM, do you still take another charter the same day?
- What else should be included in Trip Info (meeting time, exact location, what to bring)?
- Should card payments be added?
- Should there be options to target different fish species?
