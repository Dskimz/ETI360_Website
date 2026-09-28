import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api is machinery; /review holds unlisted internal review pages
        // (noindex meta as well). /routes holds the password-protected route
        // pages (noindex header and meta as well). None belongs in search results.
        disallow: ["/api/", "/review/", "/routes/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
