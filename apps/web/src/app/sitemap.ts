import type { MetadataRoute } from "next";
import { liveProducts } from "@/content/products";
import { versionsOf } from "@/content/versions";
import { assertRedirectsLand } from "@/lib/redirect-check";
import { SITE_URL } from "@/lib/site";

// Every indexable route (four-product site spec §10), with the priority a
// search engine should read as our own ranking of them: the home page, each
// live product page, each Trip Package version's page, then contact and
// privacy. Built from the product registry, so a product without a version
// (spec S18) and a single-document version (an anchor on its product page)
// never appear. /open, /review, /guides and /routes are never listed.
type Route = { path: string; priority: number; changeFrequency: "weekly" | "monthly" };

export default function sitemap(): MetadataRoute.Sitemap {
  // Fails the build if a redirect points at a page this build does not
  // serve (spec S18; src/lib/redirect-check.ts).
  assertRedirectsLand();
  const lastModified = new Date();
  const routes: Route[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    ...liveProducts().map((p) => ({ path: p.href, priority: 0.9, changeFrequency: "monthly" as const })),
    ...versionsOf("trip-package").map((v) => ({
      path: `/trips/${v.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
  ];
  // Backstop: /routes/* (the route-map pages) is never listed.
  return routes
    .filter(({ path }) => path !== "/routes" && !path.startsWith("/routes/"))
    .map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }));
}
