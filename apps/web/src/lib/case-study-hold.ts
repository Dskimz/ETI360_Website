/* The Case Study's publishing hold, enforced in code. LIFTED 2026-10-01:
   the orienteering provider is now Northmark Orienteering (Dan: "lets take
   out SWOT"). The mechanism stays for any later hold. No imports, so
   next.config.ts can read it too (the Case Study's two old step addresses
   redirect only while the case study is live; see src/lib/redirects.ts).

   ON HOLD FOR PUBLISHING until the second fictional provider is renamed
   (the case study's internal item 1). The cycling provider became Line &
   Landmark Cycle Travel on 2026-09-29; the orienteering provider still
   carries the name of one of ETI360's founders, and a school would read the
   step as ETI360 evaluating a founder's own company. That name lives once,
   in src/content/case-study.ts.

   While the hold is on, a production deploy (VERCEL_ENV "production") serves
   every /case-study address as a 404, drops every link to it (the menu, the
   footer, the product pages' lines and the sitemap) and leaves out the two
   old-step redirects. Local builds and Vercel preview deployments still show
   the case study so it can be reviewed. Set CASE_STUDY_ON_HOLD to false in
   the same edit as the provider rename.

   What the hold does not cover, stated plainly: this repository is public,
   and src/content/case-study.ts names the orienteering provider in its
   constant, so pushing the branch that carries it publishes the name,
   whatever the hold. (The case study's own excerpt images are gone; its
   pages show the site's document images, which name no founder.) */
export const CASE_STUDY_ON_HOLD = false;

/** False on a production deploy while the hold is on; true everywhere else. */
export function caseStudyLive(): boolean {
  return !(CASE_STUDY_ON_HOLD && process.env.VERCEL_ENV === "production");
}
