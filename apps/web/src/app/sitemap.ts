import type { MetadataRoute } from "next";
import { versionsOf } from "@/content/versions";
import { assertRedirectsLand } from "@/lib/redirect-check";
import { SITE_URL } from "@/lib/site";
import { INCIDENT_CASE_HREF, incidentCaseLive } from "@/lib/incident-case-hold";
import { CASE_STUDY_HREF, caseStudyLive } from "@/content/case-study";
import { STAGES } from "@/content/case-study-stages";

// Every indexable route (four-product site spec §10), with the priority a
// search engine should read as our own ranking of them: the home page, each
// live product page, the Case Study (its overview, then its four steps, one
// per product, while the provider-name hold allows; the two folded old steps
// redirect and are never listed), each Individual Trip Reports version's page, then
// contact and privacy. Built from the product registry, so a product without
// a version (spec S18) and a single-document version (an anchor on its
// product page) never appear. /open, /review, /guides and /routes are never listed.
type Route = { path: string; priority: number; changeFrequency: "weekly" | "monthly" };

export default function sitemap(): MetadataRoute.Sitemap {
  // Fails the build if a redirect points at a page this build does not
  // serve (spec S18; src/lib/redirect-check.ts).
  assertRedirectsLand();
  const lastModified = new Date();
  const routes: Route[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/examples", priority: 0.9, changeFrequency: "monthly" },
    ...(caseStudyLive()
      ? [
          { path: CASE_STUDY_HREF, priority: 0.8, changeFrequency: "monthly" as const },
          // The point pages, once each (the step pages redirect, Dan, 2026-10-08).
          ...[...new Set(STAGES.flatMap((s) => s.links.map((l) => l.href)))].map((path) => ({
            path,
            priority: 0.7,
            changeFrequency: "monthly" as const,
          })),
        ]
      : []),
    ...(incidentCaseLive() ? [{ path: INCIDENT_CASE_HREF, priority: 0.7, changeFrequency: "monthly" as const }] : []),
    ...versionsOf("trip-package").map((v) => ({
      path: `/trips/${v.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
  ];
  // The private route pages (/routes/{token}) are never listed: their address
  // is the first of their two locks. The filter keeps it that way if a path
  // under /routes is ever added above by mistake.
  return routes
    .filter(({ path }) => path !== "/routes" && !path.startsWith("/routes/"))
    .map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }));
}
