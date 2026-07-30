import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Every indexable route, with the priority a search engine should read as our
// own ranking of them. /OFFSEAS2026 is deliberately absent — it is noindexed.
const ROUTES: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/for-schools", priority: 0.9, changeFrequency: "monthly" },
  { path: "/for-providers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/showcase", priority: 0.8, changeFrequency: "monthly" },
  { path: "/perspective", priority: 0.7, changeFrequency: "weekly" },
  { path: "/perspective/what-each-artifact-decides", priority: 0.6, changeFrequency: "monthly" },
  { path: "/perspective/trip-approval-is-not-trip-governance", priority: 0.6, changeFrequency: "monthly" },
  { path: "/perspective/emergency-documentation-for-educational-travel", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
