# ETI360 Public Website – Tech Stack (Current)

This document describes the current technical stack used to build and operate the public-facing ETI360 marketing website.

## Source Control
- Git repository (GitHub): `https://github.com/Dskimz/ETI360_Website`
- Default branch: `main`
- Monorepo layout: multiple apps in one repo (see below)

## Apps (Monorepo)
- `apps/web` — Public marketing site (Next.js)
- `apps/studio` — Content authoring (Sanity Studio)

## Frontend (Public Site)
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS (via `apps/web/src/app/globals.css`)
- Content rendering pattern: “sections” driven by Sanity documents (a section renderer maps `_type` → React component)
- Preview/drafts: Next.js draft mode + Sanity preview pane (iframe) for pages/insights

## CMS / Content
- CMS: Sanity (hosted content backend)
- Dataset: `production`
- Content types:
  - `page` documents (slugged pages like `home`, `approach`, etc.)
  - `insight` documents (slugged insight articles)
- Content model approach:
  - Pages are built from ordered “sections” (hero, framing blocks, capability grids, proof blocks, diagram blocks, etc.)

## Hosting / Deployments
- Hosting provider: Vercel
- Two deployments/projects (typical):
  - Web (Next.js): public site
  - Studio (Sanity Studio): authoring UI
- Deploy trigger: pushes to `main` on GitHub

## Webhooks / Cache Revalidation
- Sanity webhook calls the web app’s revalidation endpoint to keep published content fresh.
- Endpoint (in the Next.js app): `/api/revalidate` (secret-protected)

## Tooling / Scripts
- Seed content generation:
  - `scripts/generate-sanity-seed.mjs` generates `apps/studio/seed-content.ndjson`
  - Import to Sanity via CLI (overwrite option used for repeatable setup)
- Screenshot automation:
  - `npm run screenshots` captures page screenshots into `screenshots/<timestamp>/`

## Environment Variables (High Level)
- Web app requires Sanity project/dataset configuration and (optionally) a read token for draft preview.
- Studio requires Sanity project/dataset configuration and the shared preview secret (for preview iframe URLs).
- Note: do not commit secrets; store them in Vercel env vars and local `.env.local`.

## What This Stack Is Optimized For
- A content-driven marketing site where most changes happen in Sanity and deploy to the website via revalidation.
- A clean separation:
  - Sanity = content authoring + content storage
  - Next.js = presentation + routing + API endpoints (preview/revalidate)

