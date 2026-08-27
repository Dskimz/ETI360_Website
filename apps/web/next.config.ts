import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Temporary personal page (Dan, 2026-08-27), a self-contained
        // static file at public/CMA/index.html. Next does not serve
        // directory indexes from public/, so /CMA is rewritten onto the
        // file. Remove this rewrite and the folder together.
        source: "/CMA",
        destination: "/CMA/index.html",
      },
    ];
  },
  async redirects() {
    return [
      {
        // The document library folded into the audience pages (Dan,
        // 2026-08-04). Fragments survive the redirect, so old deep links
        // like /documents#weather land on the matching row of For Schools.
        // /documents/trip-risk-register is a separate route and stays live.
        source: "/documents",
        destination: "/for-schools",
        permanent: true,
      },
      {
        // Two early essays built on the retired stage taxonomy (Dan,
        // 2026-08-04: "Retire"). Redirect to the framework story.
        source: "/perspective/what-each-artifact-decides",
        destination: "/framework",
        permanent: true,
      },
      {
        source: "/perspective/trip-approval-is-not-trip-governance",
        destination: "/framework",
        permanent: true,
      },
      {
        // Interim client door. Flips to https://app.eti360.com once the
        // Render custom domain + CNAME exist. Non-permanent on purpose so
        // the flip is not cached forever by browsers.
        source: "/login",
        destination: "https://eti360-review.onrender.com/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
