import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api is machinery; /review and /guides are behind the review
        // password (noindex meta as well); /open is the logged document
        // route (keeps crawlers out of the open log and the fictional-school
        // PDFs out of search); /routes holds the private route-map pages.
        disallow: ["/api/", "/review/", "/guides/", "/open/", "/routes/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
