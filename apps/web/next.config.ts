import type { NextConfig } from "next";
import { REDIRECTS } from "./src/lib/redirects";

const nextConfig: NextConfig = {
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
    // check that every destination is a live page (src/app/sitemap.ts).
    return REDIRECTS;
  },
};

export default nextConfig;
