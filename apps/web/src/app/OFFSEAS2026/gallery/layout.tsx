import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "ETI360 — OFFSEAS 2026 Booth Library",
  description: "Tap any document to open. Works offline once loaded.",
  robots: { index: false, follow: false },
  manifest: "/OFFSEAS2026/gallery/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "ETI360 Booth",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/OFFSEAS2026/gallery/icon-192.png",
    apple: "/OFFSEAS2026/gallery/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2a45",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
