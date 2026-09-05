import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perspective",
  description:
    "ETI360 perspective on the governance of educational travel — position pieces and operational frameworks.",
};

export default function PerspectiveIndexPage() {
  return (
    <>
      <section
        className="hero hero-inner-page"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/perspective.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">Perspective</p>
          <h1>How ETI360 thinks about trip governance.</h1>
          <p className="subhead">
            Essays on the governance of educational travel.
          </p>
        </div>
      </section>

      <section className="perspective-light">
        <div className="container">
          <div className="perspective-index-grid">
            <Link
              href="/perspective/emergency-documentation-for-educational-travel"
              className="article-card"
            >
              <span className="card-label ui">Emergency Documentation</span>
              <h3>Emergency documentation for educational travel.</h3>
              <p>
                The documents prepared before a trip are not the documents a trip leader
                can use during one.
              </p>
              <span className="read-arrow ui">Read &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaCard title={'Arrange a briefing.'} copy={'Briefings are conversations, not sales calls.'} />
    </>
  );
}
