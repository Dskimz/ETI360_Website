# ETI360 Marketing Website (Monorepo)

This repo contains:

- `apps/web`: Next.js marketing website (App Router)
- `apps/studio`: Sanity Studio (content management)

## Prerequisites

- Node.js 20+

## Getting started

1. Create `.env.local` files from the examples:
   - `apps/web/.env.local.example` → `apps/web/.env.local`
   - `apps/studio/.env.local.example` → `apps/studio/.env.local`
2. Install dependencies: `npm install`
3. Run the site: `npm run dev`
4. Run the CMS: `npm run dev:studio`

## Draft preview

Draft preview works via Next.js Draft Mode:

- Set `NEXT_PREVIEW_SECRET` + `SANITY_READ_TOKEN` in `apps/web/.env.local`
- Set `SANITY_STUDIO_PREVIEW_URL` + `SANITY_STUDIO_PREVIEW_SECRET` in `apps/studio/.env.local`
- The Studio includes a Preview pane for `page` and `insight` documents
- The Next.js app exposes `/api/revalidate`, which your Sanity webhook can call after publishes to revalidate the marketing site.

## Sanity webhook (optional but recommended)

- Set `SANITY_WEBHOOK_SECRET` in both Vercel (web project) and your local `.env.local`.
- Create a webhook in the Sanity project (`projectId=2qx6srf6`, dataset `production`) targeting `https://<your-web-Vercel-domain>/api/revalidate?secret=<your webhook secret>`, firing on publish/update/create for the `page` and `insight` documents.
- The webhook payload is parsed by `apps/web/src/app/api/revalidate/route.ts`, which validates the secret and revalidates any affected paths (`/`, `/insights`, `/insights/[slug]`, or `/[slug]`), keeping the deployed site in sync with the CMS.
