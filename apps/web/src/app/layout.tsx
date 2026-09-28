import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PublicOnly } from "@/components/PublicOnly";
import { SITE_URL } from "@/lib/site";
import { siteDescription } from "@/content/products";
import { BRAND_EYEBROW } from "@/content/voice";

// The fallback for any page that sets no metadata of its own: the home
// page's title and description (the two brand lines and the four products).
// The company statement is never used here (spec S5: it names providers,
// and the site is for schools only; review fix, 2026-09-27).
const TITLE = `ETI360 — ${BRAND_EYEBROW}`;
const DESCRIPTION = siteDescription();
const OG_IMAGE = { url: "/marketing/og-default.png", width: 1200, height: 630, alt: "ETI360. Risk intelligence for school trips. Decision-ready evidence for every trip." };

export const metadata: Metadata = {
  // metadataBase resolves every relative OG and canonical URL in the app.
  // Without it Next emits relative image paths, which no social platform can fetch.
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — ETI360" },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "ETI360",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "en",
    images: [OG_IMAGE],
  },
  // The card type only. X reads og:title, og:description and og:image when
  // the twitter: tags are absent, so every page's own openGraph (a trip
  // page's hero included) is what a shared link shows.
  twitter: { card: "summary_large_image" },
};

// GA4 loads only when the measurement ID is set, so local and preview builds
// stay uninstrumented, and then only after the visitor accepts (Dan,
// 2026-09-09). AnalyticsConsent owns both the gate and the notice.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&display=swap"
        />
      </head>
      <body className="dark-bg">
        <a className="skip-link" href="#main">Skip to main content</a>
        {/* PublicOnly keeps the ETI360 header, footer and both analytics off
            the private route pages (/routes/{token}), which carry a school's
            identity and load no measurement. */}
        <PublicOnly>
          <SiteHeader />
        </PublicOnly>
        <main id="main">{children}</main>
        <PublicOnly>
          <SiteFooter />
          {/* Vercel Analytics is cookieless and edge-measured, so it survives the
              ad blockers and school networks that eat a large share of GA events.
              It is the pageview ground truth GA4 gets checked against. */}
          <Analytics />
          {GA_ID ? <AnalyticsConsent gaId={GA_ID} /> : null}
        </PublicOnly>
      </body>
    </html>
  );
}
