import type { Metadata } from "next";

const DESCRIPTION = "Confirmation that your address has been removed from ETI360's email list.";

// Its own description and openGraph, so the page never inherits the site's
// defaults (review fix, 2026-09-27).
export const metadata: Metadata = {
  title: "Email preferences",
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: "Email preferences — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
