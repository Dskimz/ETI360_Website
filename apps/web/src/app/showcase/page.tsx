import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETI360 — Showcase",
  description: "ETI360 — silent loop showcasing the document set behind every trip decision.",
  robots: { index: false, follow: false },
};

export default function ShowcasePage() {
  return (
    <iframe
      src="/OFFSEAS2026/booth-loop.html"
      title="ETI360 showcase"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: 0,
        margin: 0,
        padding: 0,
      }}
      allow="fullscreen"
    />
  );
}
