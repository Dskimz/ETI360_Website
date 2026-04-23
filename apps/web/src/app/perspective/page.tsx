import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perspective — ETI360",
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
            Position pieces and operational frameworks on the governance of educational travel.
          </p>
        </div>
      </section>

      <section className="perspective-light">
        <div className="container">
          <div className="perspective-index-grid">
            <Link
              href="/perspective/what-each-artifact-decides"
              className="article-card"
            >
              <span className="card-label ui">Decision support</span>
              <h3>What each artifact decides.</h3>
              <p>
                Six documents. Six decisions. A walk through the key artifacts of the
                governance cycle and the specific decision each one exists to support.
              </p>
              <span className="read-arrow ui">Read &rarr;</span>
            </Link>
            <Link
              href="/perspective/trip-approval-is-not-trip-governance"
              className="article-card"
            >
              <span className="card-label ui">Governance</span>
              <h3>Trip approval is not trip governance.</h3>
              <p>
                The signature satisfies the formal requirement. It does not, on its own,
                structure the evidence the decision is supposed to rest on.
              </p>
              <span className="read-arrow ui">Read &rarr;</span>
            </Link>
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

      <section className="cta-section">
        <div className="container measure">
          <h2>Arrange a briefing.</h2>
          <p>Briefings are conversations, not sales calls. We respond within two business days.</p>
          <Link href="/contact" className="cta-button ui">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
