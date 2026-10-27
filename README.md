# AirFixPro

Lead-generation website for **AirFixPro** — AC repair, cleaning, installation, and maintenance in Karachi.

Stack: **Next.js 16** (App Router, Cache Components), **React 19**, **TypeScript**, **Tailwind CSS v4**.

## Structure

```
src/
  app/           # Routes, metadata, API (`/api/inquiries`)
  components/    # layout, sections, forms, ui, services, pricing
  config/        # Business details (`site.ts`) — single source of truth
  data/          # Services, prices, office plans, FAQs, service areas
  lib/           # Shared helpers (validation, forms, email, WhatsApp)
tests/           # Node native tests (`node --test`)
```

Prices, contact details, and form field definitions live once and are reused across pages, email, and WhatsApp messages.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm test` | Validation / form helper tests |

Requires **Node.js 20+**.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical URL for sitemap, Open Graph, JSON-LD |
| `RESEND_API_KEY` | For email delivery | Resend API key |
| `INQUIRY_FROM_EMAIL` | For email delivery | Verified sender, e.g. `AirFixPro <bookings@yourdomain.com>` |
| `INQUIRY_TO_EMAIL` | Optional | Inbox for form submissions (defaults to the business email in `src/config/site.ts`) |

Without Resend configured, booking / contact / office forms return an honest “not connected” response and offer a **prefilled WhatsApp** fallback. Nothing is pretended as sent.

## Deploy on Vercel

1. Push the repo to GitHub (or another Git host).
2. Import the project in [Vercel](https://vercel.com/new) — Next.js is detected automatically.
3. Set the environment variables above (at least `NEXT_PUBLIC_SITE_URL` for production).
4. Deploy.

No special adapter or config file is required for a standard App Router deploy on Vercel.

## Notes

- Do not invent business details (hours, reviews, extra phones, social URLs). Update [`src/config/site.ts`](src/config/site.ts) and [`src/data/`](src/data/) only with verified info.
- Office plan 50/50 payment splits are calculated in code from [`src/data/office-plans.ts`](src/data/office-plans.ts).
- The inquiry API rate limit is in-memory per instance (fine for light traffic; use a shared store if abuse appears).
