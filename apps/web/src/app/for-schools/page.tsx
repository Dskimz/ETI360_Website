import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Schools — ETI360",
  description:
    "Trip governance for international schools — governance audits, compliance alignment reviews against ISO 31031, ongoing advisory support.",
};

export default function ForSchoolsPage() {
  return (
    <>
      <section
        className="hero hero-inner-page"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/for-schools.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">For Schools</p>
          <h1>Trip governance for international schools.</h1>
          <p className="subhead">
            International schools operate trip portfolios that have grown substantially
            in volume, geographic range, and operational complexity. The governance work
            the portfolios require has not grown at the same rate. ETI360 advises schools
            on closing that gap.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            ETI360 structures the evidence trip oversight requires, aligns documentation
            to current standards, and supports the governance cycle as a continuous practice
            rather than a series of approval moments.
          </p>

          <h2>Engagement types</h2>
          <p>ETI360 engages schools in three principal forms.</p>

          <h2>Governance audit</h2>
          <p>
            A structured review of the school&apos;s current trip governance &mdash; what
            evidence is produced, what evidence is missing, how the documentation aligns
            to ISO 31031, where the gaps surface in the school&apos;s existing trip portfolio.
            The audit produces a written report with findings and structured recommendations,
            designed to be read by school leadership and presented to governing bodies.
          </p>

          <h2>Compliance alignment review</h2>
          <p>
            A focused review of the school&apos;s documentation against a specific standard
            &mdash; ISO 31031 in most cases, with adjacent standards where relevant. The
            review produces a structured comparison document showing where the school&apos;s
            current practice meets the standard, where it falls short, and what work would
            close the gap. Useful for schools preparing for accreditation, responding to
            insurance carrier requests, or establishing a baseline before broader governance
            work.
          </p>

          <h2>Ongoing advisory support</h2>
          <p>
            For schools running substantial trip portfolios, ETI360 provides ongoing support
            across the governance cycle &mdash; intelligence work for new destinations,
            structured risk assessment for higher-complexity trips, emergency documentation
            calibrated to specific trips, post-trip review against operations playbooks.
            The work is delivered through a combination of consulting engagement and structured
            infrastructure that supports the school&apos;s internal governance staff.
          </p>

          <h2>How the work is delivered</h2>
          <p>
            ETI360 has built infrastructure to support the consulting work &mdash; a structured
            intake process that normalizes school documentation into comparable form, an
            intelligence layer that maintains current information on destinations and providers,
            a documentation pipeline that produces the structured artifacts each stage of the
            governance cycle requires. The infrastructure is the leverage that makes adequate
            governance feasible at the volume contemporary school trip programs involve. Schools
            engage ETI360 for the consulting work; the infrastructure is what allows the consulting
            work to scale across a portfolio rather than being limited to one trip at a time.
          </p>

          <div className="boundary-callout">
            <h3>What ETI360 does not do</h3>
            <p>
              ETI360 covers trip governance specifically. The firm does not advise on
              safeguarding, on-campus health and safety, or liability management &mdash;
              these are distinct disciplines with their own specialist firms. Within trip
              governance, ETI360 structures and supports the evidence and documentation
              work; it does not approve trips, guarantee outcomes, or substitute its judgment
              for the school&apos;s governance bodies.
            </p>
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
