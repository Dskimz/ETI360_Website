import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
