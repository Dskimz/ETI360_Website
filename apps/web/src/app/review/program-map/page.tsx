import type { Metadata } from "next";
import { ProgramMap, YouAreHere } from "@/components/ProgramMap";

/* Unlisted review page for the Program Map components (Dan, 2026-10-08).
   It sits behind the /review password and shows the full map and the
   strip in three positions. */

export const metadata: Metadata = {
  title: "Program Map review",
  robots: { index: false, follow: false },
};

const STRIPS: { note: string; branch: string; doc: string }[] = [
  { note: "The Travel Program Review page shows this strip.", branch: "school-program", doc: "Travel Program Review" },
  { note: "The Student and Parent Trip Report page shows this strip.", branch: "parent-documents", doc: "Student and Parent Trip Report" },
  { note: "The Post Trip Report page shows this strip.", branch: "feedback", doc: "Post Trip Report" },
];

export default function ProgramMapReview() {
  return (
    <main style={{ background: "var(--parchment)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "48px 16px 96px" }}>
      <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "var(--navy)", marginBottom: 32 }}>
        The Program Map
      </h1>
      <ProgramMap />
      <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "var(--navy)", margin: "64px 0 24px" }}>
        The You-are-here strip
      </h2>
      <div style={{ display: "grid", gap: 40 }}>
        {STRIPS.map((s) => (
          <div key={s.branch}>
            <p style={{ fontSize: "var(--font-sm)", color: "var(--ink-mid)", marginBottom: 12 }}>{s.note}</p>
            <YouAreHere branch={s.branch} doc={s.doc} />
          </div>
        ))}
      </div>
      <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "var(--navy)", margin: "64px 0 24px" }}>
        The boxed strip for the social carousels
      </h2>
      <p style={{ fontSize: "var(--font-sm)", color: "var(--ink-mid)", marginBottom: 16 }}>
        The frame below is a 1080 by 1080 carousel page shown at half size.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {STRIPS.map((s) => (
          <div
            key={s.branch}
            style={{ width: 540, maxWidth: "100%", aspectRatio: "1 / 1", background: "#fff", border: "1px solid var(--hairline)", padding: 28, display: "flex", alignItems: "flex-end" }}
          >
            <div style={{ width: "100%", fontSize: 15 }}>
              <YouAreHere branch={s.branch} doc={s.doc} variant="boxes" />
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "var(--navy)", margin: "64px 0 24px" }}>
        The full map as the you-are-here view
      </h2>
      <ProgramMap current="feedback" />
      </div>
    </main>
  );
}
