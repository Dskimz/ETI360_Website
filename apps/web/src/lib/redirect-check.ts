import { versions } from "@/content/versions";
import { CASE_STUDY_REDIRECTS, REDIRECTS } from "./redirects";
import { caseStudyLive } from "./case-study-hold";
import { STAGES } from "@/content/case-study-stages";

/* Build-time check (review fix, 2026-09-27; spec S18): every redirect lands
   on a page this build serves. A product page is built only while it has a
   live version, so when a product drops out, its incoming rows in
   ./redirects.ts must point at "/" with a 307 (permanent: false) until it
   returns; this throws, and `next build` fails, if one still points at it.
   Called from src/app/sitemap.ts, which is generated at build time. */

const STATIC_PAGES = new Set(["/", "/examples", "/contact", "/privacy", "/unsubscribe"]);

function pathOf(destination: string): string {
  return destination.split("#")[0].split("?")[0];
}

function lands(path: string): boolean {
  if (STATIC_PAGES.has(path)) return true;
  // A worked trip's page, a document open, or the password-gated drafts.
  const trip = path.match(/^\/trips\/([^/]+)$/);
  if (trip) return versions.some((v) => v.product === "trip-package" && v.slug === trip[1]);
  // The Case Study's overview and steps, while it is live.
  const cs = path.match(/^\/case-study(?:\/([^/]+))?$/);
  // The overview and the point pages (the step pages redirect, 2026-10-08).
  if (cs) return caseStudyLive() && (!cs[1] || STAGES.some((s) => s.links.some((l) => l.href === `/case-study/${cs[1]}`)));
  const open = path.match(/^\/open\/([^/]+)\/[^/]+$/);
  if (open) return open[1].startsWith(":") || versions.some((v) => v.slug === open[1]);
  return path.startsWith("/review/");
}

export function assertRedirectsLand(): void {
  const rows = [...REDIRECTS, ...(caseStudyLive() ? CASE_STUDY_REDIRECTS : [])];
  const broken = rows.filter((r) => !/^https?:\/\//.test(r.destination) && !lands(pathOf(r.destination)));
  if (broken.length > 0) {
    throw new Error(
      `Redirects to pages this build does not serve (point them at "/" with permanent: false until the page is live, spec S18):\n` +
        broken.map((r) => `  ${r.source} -> ${r.destination}`).join("\n"),
    );
  }
}
