import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Board briefing on the problem-led marketing direction (Dan,
        // 2026-08-31), a self-contained static file at
        // public/Claude/MarketingCampaign/index.html. Next does not serve
        // directory indexes from public/, so the clean route is rewritten
        // onto the file (same pattern as the retired /CMA page). Remove
        // this rewrite and the folder together.
        source: "/Claude/MarketingCampaign",
        destination: "/Claude/MarketingCampaign/index.html",
      },

    ];
  },
  async redirects() {
    return [
      {
        // Clean entry link for the questions-page drafts. A REDIRECT (not a
        // rewrite) on purpose: the drafts use relative links and assets, so
        // the browser must land on the real file path for them to resolve.
        source: "/Claude/Questions",
        destination: "/Claude/Questions/hub-draft.html",
        permanent: false,
      },
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
