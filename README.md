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

## Local-first workflow (Codex + manual ship)

Use this workflow to keep development fast and local, then deploy only on command:

1. Work locally with `npm run dev`.
2. Save progress locally only:
   - `npm run checkpoint -- "feat: your message"`
3. Push/deploy only when you choose:
   - `npm run ship`

What these commands do:

- `checkpoint`: stages + commits locally; never pushes.
- `ship`: requires a clean working tree, runs `@eti360/web` lint + build, then pushes the current branch to `origin`.

If `ship` says the tree is not clean, run `checkpoint` first.

## Mini runbook

- Install: `npm install`
- Dev: `npm run dev` (web), `npm run dev:studio` (Sanity Studio)
- Test: no test suite configured yet
- Lint/typecheck: `npm run lint`, plus `npm run build -w @eti360/web` as integration safety check
- Common gotchas:
  - `ship` will fail until all local edits are committed.
  - Render deploy only starts after the `git push` done by `ship`.
- Env expectations:
  - Web: `apps/web/.env.local` from `apps/web/.env.local.example`
  - Studio: `apps/studio/.env.local` from `apps/studio/.env.local.example`

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
