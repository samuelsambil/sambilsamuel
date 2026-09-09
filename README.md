# sambilsamuel.com

Personal portfolio for Samuel Sambil. Next.js App Router, Tailwind CSS v4, Sanity CMS,
deployed on Vercel.

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill it in. The site runs without any of
these set, falling back to the content in `src/lib/content.ts`.

## Structure

```
src/app/(site)      Public pages: home, work, work/[slug], about, contact
src/app/(studio)    Sanity Studio, mounted at /studio
src/app/api/contact Contact form handler (Resend)
src/components      Layout, sections and UI primitives
src/lib/content.ts  All fallback copy, links and project data
src/lib/sanity      Client, queries, types and a fetch wrapper that never throws
src/sanity          Studio config and schemas
```

## Editing content

Two options, and they compose:

1. **Sanity Studio** at `/studio`. Whatever exists there wins.
2. **`src/lib/content.ts`**. Used whenever Sanity has nothing for that field.

The Sanity dataset starts empty, so the site ships showing the fallback content.
Adding a project in the Studio replaces the whole fallback project list.

## Design

The palette and type live in the `@theme` block at the top of
`src/app/globals.css`. Gold accents, a near-black ground, Cinzel for display and
Jost for body text. Change the tokens there and the whole site follows.

## Environment variables

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Reading content from Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Reading content from Sanity |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph |
| `RESEND_API_KEY` | Sending contact form email |
| `CONTACT_TO_EMAIL` | Where contact form email lands |
| `CONTACT_FROM_EMAIL` | Verified Resend sender |

Without `RESEND_API_KEY` the contact form accepts submissions and logs a warning
instead of sending.

## Notes

Turbopack reuses `.next` between builds and can leave a stale CSS chunk
reference behind. If local `npm run start` loads unstyled, `rm -rf .next` and
rebuild. Vercel always builds clean, so it does not happen there.
