import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SourceCapture } from "@/components/SourceCapture";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";

const TITLE = "ETI360 — Risk intelligence for school trips";
const DESCRIPTION =
  "ETI360 structures the evidence behind school-trip decisions — the 3-Tier Risk Framework and the documents it produces, for international schools and trip providers.";

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
    images: [{ url: "/marketing/og-default.png", width: 1200, height: 630, alt: "ETI360 — Educational Travel Insights" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/marketing/og-default.png"] },
};

// GA4 loads only when the measurement ID is set, so local and preview builds
// stay uninstrumented until the property exists.
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
        <SourceCapture />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {/* Vercel Analytics is cookieless and edge-measured, so it survives the
            ad blockers and school networks that eat a large share of GA events.
            It is the pageview ground truth GA4 gets checked against. */}
        <Analytics />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
