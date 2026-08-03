# Handoff — Website Rewrite: Documents Become the Focus

**For:** a fresh Claude Code session opened in this repo
(`/Users/danskimin/ETI360/documents/04 - ETI360 - Knowledge Base/04 - Website`)
**From:** the schools-email build session, 2026-08-04
**Mission:** rebuild `/documents` as the site's centerpiece using the approved email
catalogue as its wireframe, add the eleven anchors the campaign email depends on, and
raise the documents' prominence across the site. The campaign doctrine this serves:
*the email opens the door; the page makes the sale.* The reports are the product.

---

## 1. The wireframe you are translating

`/Users/danskimin/00 - eti360-rebuild/dev/schools-email/arm-c-catalogue.html` is the
approved structure — **the file is canonical and still evolving under Dan's passes
(v9.1 at handoff time); read its head comment first.** Since the v7 order below: T1 is a
single baseline entry (Brightside image cut, copy covers schools and trip providers);
T2 reordered to Trip Overview → itineraries → Discovery Map → Route Intelligence → RAMS →
Field Trip Report (one-day trips) → Trip Risk Register (portal screen); the gallery sits
between T2 and T3 and includes the Teacher Operational Guide; T3 is Duty Manager
Dashboard + Post-Trip Feedback Loop (Simulation cut from the email). v7's fuller order,
for orientation:

1. Intro: 30+ combined years, 10,000+ students, the 3-Tier Risk Management Framework
2. **Tier 1 — Organizational Baseline**: school baseline (Harborview, 71%) PAIRED with
   the Partner Baseline Evaluation (Brightside, 91%) — "the same ten-area review, run on
   both sides of every trip"
3. **Tier 2 — Trip Risk Review**: Trip Risk Assessment & RAMS (system assembles the
   information risk mitigation runs on) · Route Intelligence as a two-page spread
   (Big Itoshima) · Trip Discovery Map as a two-page spread (Cherry Blossom Tokyo) ·
   Parent Itinerary + Itinerary Report as a captioned pair
4. **Tier 3 — Dynamic Risk Operations**: Teacher Operational Guide + Post-Trip Feedback
   Loop report page as a pair · Duty Manager Dashboard (landscape screen) · Duty Manager
   Simulation (landscape screen)
5. "Built for your school" — every document is customizable; gallery of further types
   (Weather & Conditions, Trip Overview, Leadership Deck, Activity Risk Profile)
6. Fictitious-school disclosure · the certify/insurance pull quote · "Start with one trip" CTA

Rendered reference: https://www.eti360.com/email/arm-c-test.html
Translate the *structure and story* into the site's own React components and design
system (see the tier walk the `/framework` and `/documents` pages already use) — do not
port email-table markup.

## 2. This repo, operationally

- Next.js app at `apps/web`; pages `src/app/*/page.tsx`; footer `src/components/SiteFooter.tsx`.
- **Push to `main` = production deploy** (Vercel). Production host is `www.eti360.com`;
  the apex 307s to www. Before pushing, check `git log origin/main..HEAD` — do not ship
  strangers' unpushed work unknowingly. Two Itoshima PNGs under `public/images/` are
  modified-uncommitted by another workstream: leave them alone, pathspec your commits.
- A second Vercel project (`eti-360-website-studio`, root `apps/studio`) is a zombie that
  fails on every push. Ignore its red builds; Dan may delete it.
- `/login` redirects to the platform (interim); "Client Login" is in the footer. When
  `app.eti360.com` exists (Dan's Render+DNS task), flip both.

## 3. Assets — all hosted, all reusable

Everything the email shows is already served from this repo at `apps/web/public/email/`
(≈30 files): `logo-white.png`, full pages `page-*.png`, spreads `spread-itoshima-1/2.png`,
`spread-map-1/2.jpg`, `spread-school-baseline.png`, `spread-partner-baseline.png`, cards
`card-*.png`, screens `screen-*.png`. Treat these filenames as immutable (Gmail proxy
caches them); for the page, prefer fresh higher-res exports into `public/images/…`.
Sources for re-export, all in `/Users/danskimin/00 - eti360-rebuild`:

- HIS-T01 rebuilt pack (00–08 PDFs + HTML): `dev/customer-docs/HIS-T01/`
- Route Intelligence PDFs (Itoshima + EBC, Harborview brand): `content/vault/Marketing/03 - Route Intelligence/`
- Trip Discovery Map PDF: `data/output/HIS-T01_trip_discovery_map_20260803_083357.pdf`
- Post-Trip specimen: `content/vault/Marketing/01 - Sample Data/ETI360-Post-Trip-Intelligence-Report-Specimen.pdf`
- Showcase baselines (school + partner): `content/vault/Marketing/*Baseline-Evaluation-2026 (Showcase).pdf`
  (regenerable via `dev/schools-email/brightside-partner-baseline.html` + the
  `iso31031_scorecard_render` skill in that repo)

## 4. The anchors the campaign email requires (non-negotiable)

`#baseline #risk-assessment #route-intelligence #parent-itinerary #itinerary-report
#weather #teacher-guide #trip-overview #leadership-deck #activity-risk-profile
#duty-manager-dashboard` — the sent email deep-links all eleven with
`?utm_source=email&utm_campaign=intro&utm_content={note|marquee|catalogue}`. Today only
`#baseline` exists. Keep anchor ids exactly as listed.

## 5. Laws and rules (violations get reverted)

- **Naming law:** tiers are *Organizational Baseline · Trip Risk Review · Dynamic Risk
  Operations*. The live surface is the **Duty Manager Dashboard** — never "Command
  Center", never "Live Ops". The rehearsal product is the **Duty Manager Simulation**.
  Say "trips", never "fleet"; "incident type", never "event family".
  **Harborview International School** — never "Academy".
- **American English everywhere, always** (Dan, standing order) — including
  "Organizational". The site footer currently says "Educational Travel **Insights** 360"
  while the email masthead says "Educational Travel **Intelligence**" — UNRESOLVED
  conflict awaiting Dan's word. Do not propagate either further; flag where relevant.
- **Fictitious-by-design:** Harborview and Brightside are showcase fictions and must carry
  the disclosure wherever their pages appear ("…fictitious by design, so no real school's
  or provider's documents are ever shown"). The real assessments (DSCT/SAS/OIS in the
  rebuild repo's Governance folder) are barred from marketing surfaces, absolutely.
- **Tone:** assume the reader already runs good trips; describe contents, never
  deficiencies; hedge the offer, not the substance; no fear-selling; the hard claim
  ("We do not certify trips and we do not sell insurance…") stays verbatim. The compiled
  rules: `/Users/danskimin/00 - eti360-rebuild/dev/schools-email/REVIEWER-BRIEF-arm-c.md`.
  **Mandatory gate:** run `eti360-tone-review` on new customer-facing copy before deploy.
- Dan's approved claims: combined 30+ years, 10,000+ students, 3-Tier Risk Management
  Framework. Use as given; do not inflate or reword the numbers.

## 6. Known warts to handle or avoid

- The Trip Discovery Map sheet says **22–29 Jul 2026**; the HIS-T01 document pack says
  **13–20 Mar 2027**. Re-render the map from the skill (`skill:trip_discovery_map`, rebuild
  repo) with consistent dates, or crop/caption so dates don't collide on one page.
- `screen-baseline.png` (platform screen) has British "Organisational" baked into pixels —
  prefer the document-pair imagery for T1; the screen is optional.
- A parallel session is fixing the Duty Manager Dashboard so its **location map card**
  renders (task: trip clicks wrongly open the incident board). It will produce
  `screen-dmd-v3.png` (with map). If it exists by your build, use it over `screen-dmd-v2.png`.

## 7. Scope

**In:** `/documents` rebuilt on the v7 story; the eleven anchors; document prominence in
nav/homepage touchpoints (propose before bulldozing — the homepage scopes work shipped
days ago and is Dan-approved); image pipeline for crisp page renders.
**Out (phase 2, separate sessions):** the `/perspective` blog series (five planned posts,
one per document — skeleton lives in the email program plan); `/sample-trip-pack`;
anything in the email files themselves (`dev/schools-email/` is the email sprint's lane).

## 8. Process

- Website-build governance: read `content/vault/Marketing/ETI360-Website-Build-Tracker.html`
  (statuses in its `<script id="plan-data">` JSON) and `ETI360-Website-Build-Log.html` in
  the rebuild repo's vault; log this work there per the W-code convention (add an entry if
  none fits).
- Verify locally (`npm run dev` in `apps/web`) and visually before pushing; after deploy,
  curl the live anchors and click through from the email's links.
- Commits end with: `Co-Authored-By: Claude <model> <noreply@anthropic.com>`.
- Coordinate lightly: the email sprint (separate session) freezes copy Thursday morning
  and sends Thursday afternoon; the page should be live-or-better by then, and must never
  be broken during that window.
