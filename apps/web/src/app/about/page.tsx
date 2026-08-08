import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "ETI360 is an advisory firm working in the governance of educational travel.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section
        className="hero hero-inner-page"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/about.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">About</p>
          <h1>About ETI360.</h1>
          <p className="subhead">
            An advisory firm working in the governance of educational travel.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            ETI360 advises international schools and trip providers on structuring the
            evidence, intelligence, and documentation that trip governance rests on.
          </p>

          <h2>What we cover</h2>
          <p>
            ETI360 works in trip governance &mdash; risk assessment, provider review,
            emergency documentation, and post-trip review. We do not cover safeguarding,
            on-campus health and safety, or liability management; those are distinct
            disciplines served by other specialist firms.
          </p>
          <p>
            Within trip governance, the firm structures and supports work the school or provider
            remains accountable for; it does not approve trips, certify providers, guarantee
            outcomes, or substitute its judgment for the governance bodies of the organizations
            it advises.
          </p>

          <h2>Infrastructure</h2>
          <p>
            The firm has built infrastructure to support its consulting work &mdash; structured
            documentation pipelines, intelligence layers maintaining current information on
            destinations and providers, scenario testing capabilities, and document production
            at a scale and quality that contemporary trip governance requires. The infrastructure
            is leverage for the consulting work, not a product sold separately. Engagements are
            advisory; the infrastructure is what allows the advisory work to scale across school
            trip portfolios and provider operations.
          </p>

          <h2>Origin</h2>
          <p>
            As trip portfolios have grown more complex and the standards governing
            them have become more rigorous, trip governance has become a specialist
            discipline in its own right. ETI360 exists to do that work alongside
            schools and providers.
          </p>
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
