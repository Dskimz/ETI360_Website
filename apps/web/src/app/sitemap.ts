import type { MetadataRoute } from "next";
import { trips } from "@/content/trips";
import { SITE_URL } from "@/lib/site";

// Every indexable route, with the priority a search engine should read as our
// own ranking of them. /OFFSEAS2026 is deliberately absent — it is noindexed.
const ROUTES: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/framework", priority: 0.9, changeFrequency: "monthly" },
  { path: "/for-schools", priority: 0.9, changeFrequency: "monthly" },
  { path: "/travel-program-review", priority: 0.9, changeFrequency: "monthly" },
  { path: "/for-schools/location-timeline", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/route-intelligence", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/trip-risk-documentation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/weather-brief", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/medical-access", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/conference-visits", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/field-trips", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/student-journey", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/standard-documentation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/duty-manager", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/duty-manager-simulation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for-schools/incident-reporting", priority: 0.7, changeFrequency: "monthly" },
  { path: "/trips", priority: 0.8, changeFrequency: "monthly" },
  // Each live trip page (src/content/trips/) is appended below.
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const tripRoutes = trips.map((t) => ({
    path: `/trips/${t.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));
  // The private route pages (/routes/{token}) are never listed: their address
  // is the first of their two locks. The filter keeps it that way if a path
  // under /routes is ever added above by mistake.
  return [...ROUTES, ...tripRoutes]
    .filter(({ path }) => path !== "/routes" && !path.startsWith("/routes/"))
    .map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }));
}
