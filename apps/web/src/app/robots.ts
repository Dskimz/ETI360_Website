import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // OFFSEAS2026 is an event booth asset and already carries a noindex
        // meta tag; /api is machinery; /review holds unlisted internal review
        // pages (noindex meta as well); /CMA is a temporary personal page
        // (noindex meta as well). None belong in search results.
        disallow: ["/api/", "/OFFSEAS2026", "/review/", "/CMA"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
