import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETI360 — OFFSEAS 2026",
  description: "ETI360 booth loop for OFFSEAS 2026, Kuala Lumpur.",
  robots: { index: false, follow: false },
};

export default function OFFSEAS2026Page() {
  return (
    <iframe
      src="/OFFSEAS2026/booth-loop.html"
      title="ETI360 OFFSEAS 2026 booth loop"
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
