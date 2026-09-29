/* The Case Study's publishing hold, enforced in code. No imports, so
   next.config.ts can read it too (the Case Study's two old step addresses
   redirect only while the case study is live; see src/lib/redirects.ts).

   ON HOLD FOR PUBLISHING until both fictional providers are renamed (the
   case study's internal item 1): they carry the names of ETI360's two
   founders, and a school would read the steps as ETI360 evaluating its
   founders' own companies. Each name lives once, in src/content/case-study.ts.

   While the hold is on, a production deploy (VERCEL_ENV "production") serves
   every /case-study address as a 404, drops every link to it (the menu, the
   footer, the product pages' lines and the sitemap) and leaves out the two
   old-step redirects. Local builds and Vercel preview deployments still show
   the case study so it can be reviewed. Set CASE_STUDY_ON_HOLD to false in
   the same edit as the provider rename.

   What the hold does not cover, stated plainly: the excerpt images in
   public/case-study/ are static files, so a production deploy still serves
   each one at its own address, unlinked. None of the current excerpts shows
   a provider's name, but src/content/case-study.ts names both providers in
   its two constants, and this repository is public: pushing the branch that
   carries them publishes both, whatever the hold. */
export const CASE_STUDY_ON_HOLD = true;

/** False on a production deploy while the hold is on; true everywhere else. */
export function caseStudyLive(): boolean {
  return !(CASE_STUDY_ON_HOLD && process.env.VERCEL_ENV === "production");
}
