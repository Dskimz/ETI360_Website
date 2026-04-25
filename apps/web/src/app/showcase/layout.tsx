import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "ETI360 — Document Showcase",
  description: "The document set behind every ETI360 trip decision. Tap to open.",
  manifest: "/showcase/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "ETI360 Showcase",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/showcase/icon-192.png",
    apple: "/showcase/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2a45",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
