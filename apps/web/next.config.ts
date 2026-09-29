import type { NextConfig } from "next";
import { caseStudyLive } from "./src/lib/case-study-hold";
import { CASE_STUDY_REDIRECTS, REDIRECTS } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  // Private route pages (/routes/{token}) read their files from the private
  // store (src/lib/routes/store.ts): the private bucket when deployed, the
  // gitignored apps/web/private/routes/ locally. The tracer would otherwise
  // follow the local read and pack that folder into a deployment made from a
  // laptop; it never goes into a bundle (.vercelignore keeps it out of an
  // upload as well).
  outputFileTracingExcludes: {
    "*": ["./private/**/*"],
  },
  async headers() {
    return [
      {
        // Belt and braces with the page's noindex meta: the private route
        // pages, their data and their PDFs never enter a search index or a
        // shared cache, and the private address never travels in a Referer.
        source: "/routes/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Board briefing on the problem-led marketing direction (Dan,
        // 2026-08-31), a self-contained static file at
        // public/review/problem-led-direction/index.html. Next does not serve
        // directory indexes from public/, so the clean route is rewritten
        // onto the file (same pattern as the retired /CMA page). Remove
        // this rewrite and the folder together.
        source: "/review/problem-led-direction",
        destination: "/review/problem-led-direction/index.html",
      },

    ];
  },
  async redirects() {
    // The table lives in src/lib/redirects.ts (pure data), so the build can
    // check that every destination is a live page (src/app/sitemap.ts). The
    // Case Study's two old step addresses redirect only while it is live.
    return [...REDIRECTS, ...(caseStudyLive() ? CASE_STUDY_REDIRECTS : [])];
  },
};

export default nextConfig;
