# sambilsamuel.com

Personal portfolio for Samuel Sambil. Next.js App Router, Tailwind CSS v4, Sanity CMS,
deployed on Vercel.

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill it in. Projects and blog posts come
from Sanity, so a dataset with content is what makes the Work and Blog pages
show anything. To fill a fresh dataset with the starting content:

```bash
npm run seed
```

That writes the five original projects, the site settings and one example post.
It uses `createIfNotExists`, so running it again never overwrites your edits.

## Structure

```
src/app/(site)         Public pages: home, work, blog, about, contact
src/app/(studio)       Sanity Studio, mounted at /studio
src/app/api/contact    Contact form handler (Resend)
src/app/api/revalidate Sanity webhook target, refreshes pages on publish
src/components         Layout, sections and UI primitives
src/lib/content.ts     Static page copy: services, bio, FAQs, nav
src/lib/sanity         Client, queries, types and a fetch wrapper that never throws
src/sanity/schemas     Document schemas and the "Create new" templates
scripts/seed-sanity.mjs One-off script that seeds a fresh dataset
```

## Editing content

Everything on the Work and Blog pages lives in Sanity. Open `/studio`, press
**Create new**, and pick a template:

| Template | Gives you |
| --- | --- |
| Project — starter | A blank project, dated today |
| Project — full case study | The same, plus a write-up outline |
| Blog post — starter | A blank post, dated now |
| Blog post — build log | A post with four headings ready to fill |

Both document types are grouped into tabs. A project has **Content**, **Story**
(challenge, approach, learnings, write-up) and **Meta**. A post has **Content**
and **Meta**. Only the Content fields are required, so a draft can be saved with
very little in it.

A few behaviours worth knowing:

- A post dated in the future stays hidden until that date passes, so
  `publishedAt` doubles as a scheduling field. The Studio lists these under
  **Blog → Scheduled**.
- **Featured** pins a project to the home page and a post to the top of the blog
  index.
- A project or post with no cover image gets a gold monogram card instead.

The rest of the site — services, FAQs, skills, nav labels — is still static copy
in `src/lib/content.ts`, and the hero, bio and social links come from **Site
Settings** in the Studio.

## Publishing updates

Pages cache Sanity reads for 60 seconds, so an edit shows up within a minute on
its own. To make it instant, set `SANITY_REVALIDATE_SECRET` and add a webhook in
sanity.io/manage:

| Field | Value |
| --- | --- |
| URL | `https://sambilsamuel.com/api/revalidate?secret=<the secret>` |
| Trigger | Create, Update, Delete |
| Filter | `_type in ["project", "post", "siteSettings"]` |
| Projection | `{ "_type": _type }` |

One constraint on document ids: they must not contain a dot. Sanity reserves
dotted ids for drafts and system documents, and the public read grant skips
them, so a dotted id is invisible to the live site.

## Design

The palette and type live in the `@theme` block at the top of
`src/app/globals.css`. Gold accents on warm ivory, Cinzel for display and Jost
for body text. Change the tokens there and the whole site follows.

## Environment variables

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Reading content from Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Reading content from Sanity |
| `SANITY_API_TOKEN` | `npm run seed` only, never used at runtime |
| `SANITY_REVALIDATE_SECRET` | Authenticating the Sanity publish webhook |
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
