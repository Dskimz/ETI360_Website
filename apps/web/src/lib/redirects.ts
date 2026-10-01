/* Every redirect on the site, in first-match order (four-product site spec
   §8). Pure data with no imports, so next.config.ts can load it and the
   build can check it: src/app/sitemap.ts runs assertRedirectsLand() (in
   ./redirect-check.ts) at build time, which fails the build when a
   destination is not a live page (spec S18: a product page without a live
   version is not built, so its incoming rows must point at / with a 307
   until it lands).

   Every retired address, in the four-product site's order (spec §8,
   2026-09-27). First match wins: the specific /trips/* rules come before
   any other, and each specific /for-schools and /perspective rule comes
   before its prefix catch-all. Every rule goes straight to its final
   page: no chains. 308 (permanent: true) unless the page may return:
   /framework, /about and /for-providers are 307.
   Nothing here may match /routes/* (the route-map session's pages), and
   there is no /docs wildcard: the kept PDFs in public/docs stay reachable
   for the local /open fallback. */

export type SiteRedirect = { source: string; destination: string; permanent: boolean };

const toTripPackage = (source: string, anchor = ""): SiteRedirect => ({
  source,
  destination: `/trip-package${anchor ? `#${anchor}` : ""}`,
  permanent: true,
});

export const REDIRECTS: SiteRedirect[] = [
  // ── Trips (rows 1–4) ──
  {
    // The Harborview elementary pack became a Field Trip Reports version
    // (2026-09-25); its version slug changed with it. Before row 2.
    source: "/trips/elementary/open/:doc",
    destination: "/open/harborview-elementary/:doc",
    permanent: true,
  },
  {
    // One logged open route for every version of every product (spec
    // S6). The query (size, page) passes through.
    source: "/trips/:slug/open/:doc",
    destination: "/open/:slug/:doc",
    permanent: true,
  },
  {
    source: "/trips/elementary",
    destination: "/field-trip-package#harborview-elementary",
    permanent: true,
  },
  {
    // The library became the Individual Trip Reports page's worked trips; the
    // six /trips/{slug} pages keep their addresses (Monday's emails).
    source: "/trips",
    destination: "/trip-package",
    permanent: true,
  },

  // ── The retired solution pages land on their line of a product page (rows 5–19) ──
  toTripPackage("/for-schools/trip-risk-documentation", "trip-risk-working-file"),
  toTripPackage("/for-schools/risk-assessment", "trip-risk-working-file"),
  toTripPackage("/for-schools/student-journey", "student-journey-guide"),
  toTripPackage("/for-schools/route-intelligence", "made-for-the-school"),
  toTripPackage("/for-schools/weather-brief", "made-for-the-school"),
  toTripPackage("/for-schools/medical-access", "receives"),
  toTripPackage("/for-schools/location-timeline", "school-trip-record"),
  toTripPackage("/for-schools/standard-documentation"),
  // The Duty Manager Dashboard, the Simulation and Incident Reporting
  // stay off customer surfaces (pages parked in apps/web/_parked/).
  toTripPackage("/for-schools/duty-manager"),
  toTripPackage("/for-schools/duty-manager-simulation"),
  toTripPackage("/for-schools/incident-reporting"),
  { source: "/for-schools/field-trips", destination: "/field-trip-package", permanent: true },
  // Q2 answered (Dan, 2026-09-25: Conference Travel Reports), so 308.
  { source: "/for-schools/conference-visits", destination: "/conference-travel-package", permanent: true },
  { source: "/for-schools/tournament-travel", destination: "/conference-travel-package", permanent: true },
  { source: "/for-schools/travel-program-review", destination: "/travel-program-review", permanent: true },
  {
    // Row 20, after rows 5–19. Also matches /for-schools itself (Dan:
    // "Everything is for the school").
    source: "/for-schools/:path*",
    destination: "/",
    permanent: true,
  },

  // ── Retired pages (rows 21–30) ──
  { source: "/framework", destination: "/", permanent: false },
  { source: "/about", destination: "/", permanent: false },
  { source: "/solutions", destination: "/", permanent: true },
  toTripPackage("/perspective/emergency-documentation-for-educational-travel"),
  // After the rule above; also matches /perspective and the two retired essays.
  { source: "/perspective/:path*", destination: "/", permanent: true },
  // Also matches /documents and /documents/trip-risk-register.
  { source: "/documents/:path*", destination: "/", permanent: true },
  // Exact path only: nothing under public/us/ is linked.
  { source: "/us", destination: "/", permanent: true },
  { source: "/questions", destination: "/", permanent: true },
  {
    // Providers page parked (Dan, 2026-09-25: "Focus on schools."); its
    // source stays unrouted in src/app/_for-providers-parked/. 307 so it
    // can return.
    source: "/for-providers",
    destination: "/",
    permanent: false,
  },
  // The old sample pack; its files are deleted. Also matches /showcase.
  toTripPackage("/showcase/:path*"),

  // ── Retired PDFs, each by exact path (rows 31–33) ──
  {
    source: "/docs/organizational-baseline-evaluation-v2.pdf",
    destination: "/travel-program-review#harborview-review",
    permanent: true,
  },
  {
    source: "/docs/organizational-baseline-evaluation-v4.pdf",
    destination: "/travel-program-review#harborview-review",
    permanent: true,
  },
  { source: "/docs/conference-visits-guide-wexcombe.pdf", destination: "/conference-travel-package", permanent: true },
  { source: "/docs/tournament-travel-guide.pdf", destination: "/conference-travel-package", permanent: true },
  // Superseded single-paper editions (2026-09-25 rebuilds; spec S16):
  // the Sep 14 Wexcombe guide without the notice, and the Harborview
  // pack before its fixes.
  { source: "/docs/athletics-activities-trips-guide-wexcombe.pdf", destination: "/conference-travel-package", permanent: true },
  {
    source: "/docs/field-trip-risk-assessment-pack-harborview-2026-27.pdf",
    destination: "/field-trip-package#harborview-elementary",
    permanent: true,
  },
  // Four more PDFs production served before trip-pages removed them in
  // 9c0973f without a redirect (review fix, 2026-09-27): the old field-trip
  // register editions and two earlier baseline samples.
  {
    source: "/docs/field-trip-register-harborview-2026-27.pdf",
    destination: "/field-trip-package#harborview-elementary",
    permanent: true,
  },
  {
    source: "/docs/field-trip-register-harborview-2026-27-v2.pdf",
    destination: "/field-trip-package#harborview-elementary",
    permanent: true,
  },
  {
    source: "/docs/organizational-baseline-evaluation-v3.pdf",
    destination: "/travel-program-review#harborview-review",
    permanent: true,
  },
  {
    source: "/docs/organizational-baseline-evaluation.pdf",
    destination: "/travel-program-review#harborview-review",
    permanent: true,
  },
  // Legacy Tokyo and Kathmandu material.
  toTripPackage("/docs/leadership-deck.pdf"),
  toTripPackage("/docs/parent-itinerary.pdf"),
  toTripPackage("/docs/post-trip-feedback-loop.pdf"),
  toTripPackage("/docs/route-intelligence.pdf"),
  toTripPackage("/docs/teacher-operational-guide.pdf"),
  toTripPackage("/docs/trip-discovery-map.pdf"),
  toTripPackage("/docs/trip-overview.pdf"),
  toTripPackage("/docs/trip-risk-working-file.pdf"),

  // ── Kept ──
  {
    // Clean entry link for the questions-page drafts (behind the review
    // password). A REDIRECT (not a rewrite) on purpose: the drafts link
    // each other relatively, so the browser must land on the real file
    // path for them to resolve.
    source: "/review/questions",
    destination: "/review/questions/hub-draft.html",
    permanent: false,
  },
  {
    // Staff door (Dan, 2026-09-29). Sends Dan and Seb to the school
    // research in the review app, where their own logins and the
    // campaign grant protect it. Nothing internal lives on this site:
    // this repo is public. Temporary so the destination can change.
    source: "/internal",
    destination: "https://eti360-review.onrender.com/campaign/research",
    permanent: false,
  },
  {
    // Interim client door. Flips to https://app.eti360.com once the
    // Render custom domain + CNAME exist. Non-permanent on purpose so
    // the flip is not cached forever by browsers.
    source: "/login",
    destination: "https://eti360-review.onrender.com/login",
    permanent: false,
  },
];

/* The Case Study's two folded steps (2026-09-28: five pages, not seven):
   the first conversation now opens the ETI360 cell of the Travel Program
   Review's How it works, and the rest of the year is the overview's line
   for it (2026-09-29, when the Individual Trip Reports became step 2). Permanent,
   each straight to the part it folded into. Only while the case study is
   live: next.config.ts adds these rows unless the publishing hold is on in
   a production build (src/lib/case-study-hold.ts), where every /case-study
   address is a 404.
   The old hash anchors (/case-study#…) are handled on the page
   (src/app/case-study/_parts/HashRedirect.tsx). */
export const CASE_STUDY_REDIRECTS: SiteRedirect[] = [
  {
    source: "/case-study/first-conversation",
    destination: "/case-study/travel-program-review#how",
    permanent: true,
  },
  {
    source: "/case-study/through-the-year",
    destination: "/case-study#rest-of-year",
    permanent: true,
  },
];
