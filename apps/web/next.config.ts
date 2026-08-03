import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
