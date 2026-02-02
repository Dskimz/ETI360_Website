# ETI360 Website Build — Step-by-Step Execution Plan (for Engineering Hire)  
**Scope:** Marketing website implementation (Next.js + Sanity + Vercel)  
**Constraint:** No Docker  
**Outcome:** Stable, governed, responsive marketing site with CMS workflow

---

## Step 0 — Read + Align (Required)
**Goal:** Zero ambiguity before touching code.

- Read:
  - ETI360 Design Decision Brief
  - ETI360 Marketing Tech Overview
  - Sanity schema definitions
  - Token mapping / Tailwind rules
- Confirm:
  - Marketing site is unauthenticated
  - Pages are section-driven
  - No page builders / no ad-hoc layouts
- Agree on “done” for MVP:
  - Core pages live
  - Core sections working
  - CMS usable by marketing

---

## Step 1 — Repo Initialization (Scaffold)
**Goal:** Start from working wiring, not blank slate.

- Create repos (if not already):
  - `eti360-web` (Next.js)
  - `eti360-content` (Sanity)
- Initialize from approved starter templates
- Remove all demo content and demo schemas after first successful run
- Add minimal README with:
  - Purpose
  - Local dev commands
  - Deployment target

Acceptance:
- Both repos run locally with one command each.

---

## Step 2 — Environment & Secrets
**Goal:** Clean, repeatable setup.

- Standardize env files:
  - `.env.local.example` (checked in)
  - `.env.local` (ignored)
- Confirm required env variables:
  - Sanity project ID / dataset
  - Sanity read token (if needed)
  - Revalidation secret (when used)
- Add lint + formatting commands

Acceptance:
- New developer can run both repos using only README + env example.

---

## Step 3 — Implement Sanity Schemas (Source of Truth)
**Goal:** CMS structure matches the intended section system.

- Add document schemas:
  - `page`
  - `capability`
  - `product`
  - `insight`
- Add section schemas:
  - `hero`
  - `framingBlock`
  - `capabilityGrid`
  - `proofBlock`
  - `insightFeed`
  - `ctaBlock`
- Add validation rules (max sections, required fields, max slides, etc.)
- Create sample content entries:
  - Home page
  - About page
  - One capability
  - One insight

Acceptance:
- Marketing can create a page and assemble it from approved sections only.

---

## Step 4 — Define the “Section Renderer” (Critical)
**Goal:** A single rendering pipeline for all CMS-driven pages.

- Create:
  - Type-safe section union types
  - Mapping from Sanity `_type` → React component
  - Hard failure for unknown section types (no silent rendering)
- Add:
  - `app/(site)/[slug]/page.tsx` for CMS pages
  - `app/page.tsx` home can be CMS-driven too (recommended)

Acceptance:
- Any page assembled in Sanity renders correctly via one template.

---

## Step 5 — Build Core Section Components
**Goal:** The site is composed entirely from durable sections.

Implement each section with:
- Mobile-first layout
- Token-only styling (no hardcoded colors/spacing)
- Strong typography hierarchy

Components:
- `Hero`
- `FramingBlock`
- `CapabilityGrid`
- `ProofBlock`
- `InsightFeed`
- `CtaBlock`

Acceptance:
- Home page renders with all sections and looks correct across breakpoints.

---

## Step 6 — Responsiveness “Solved Once”
**Goal:** No future drift, no per-page hacks.

- Lock breakpoints usage:
  - Base = mobile
  - `md` = tablet
  - `lg` = desktop
- Define component-level rules:
  - Grids collapse predictably
  - Headline line-length constraints
  - Spacing rhythm
- Add a quick internal QA checklist (in repo)

Acceptance:
- Mobile/tablet/desktop sign-off for each section without exceptions.

---

## Step 7 — SEO + Routing + Metadata
**Goal:** Marketing site behaves like a professional publishing surface.

- Implement:
  - Per-page SEO from Sanity (title, description)
  - OpenGraph defaults
  - Sitemap + robots
- Ensure canonical URLs
- Ensure 404 handling for missing slugs

Acceptance:
- Pages show correct metadata and generate clean URLs.

---

## Step 8 — Performance & Image Handling
**Goal:** Fast by default.

- Use Next Image optimization
- Ensure hero images do not cause layout shift
- Avoid heavy client JS
- Minimize client components; only for interactive needs

Acceptance:
- Strong Lighthouse baseline and no avoidable performance regressions.

---

## Step 9 — Publishing → Site Update Workflow
**Goal:** Marketing can publish without developer involvement.

- Implement ISR strategy:
  - Revalidate on publish via webhook OR time-based revalidation
- Add `/api/revalidate` route if using webhooks
- Document the workflow for marketing (short)

Acceptance:
- Content changes publish reliably and appear on the site.

---

## Step 10 — Deployments (Vercel + Sanity Studio)
**Goal:** Production-ready, not just local.

- Connect `eti360-web` to Vercel
- Deploy Sanity Studio (Sanity hosted or Vercel)
- Set up preview URLs (optional but recommended)
- Verify:
  - Production domain
  - SSL
  - Redirects (if needed)

Acceptance:
- Production URL works, CMS works, publish pipeline works.

---

## Step 11 — Handoff Package (Non-Negotiable)
**Goal:** Founder can run and operate without you.

Deliver:
- Repo READMEs (setup + commands + workflows)
- CMS usage notes:
  - How to add pages
  - How to add sections
  - What not to do
- A short “maintenance” checklist:
  - Updating dependencies
  - Adding new section types

Acceptance:
- Founder/marketing can operate the site and CMS independently.

---

## Optional Step 12 — Future-Proof Hooks (Only If Needed)
- Add internal app link patterns (no auth)
- Add “Products” section model
- Add Insights taxonomy if useful

Do not add:
- Auth
- DB
- Complex search
- Overbuilt component library

---

## Definition of Done (MVP)
- Home + 3–5 core pages live
- Sanity-managed content
- Consistent responsive behavior
- Publish workflow verified
- Clear documentation and handoff
