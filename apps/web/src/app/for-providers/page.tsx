import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Providers — ETI360",
  description:
    "Documentation and intelligence for trip providers — proposal reviews, operational alignment, ongoing advisory support.",
};

export default function ForProvidersPage() {
  return (
    <>
      <section
        className="hero hero-inner-page"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/for-providers.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">For Providers</p>
          <h1>Documentation and intelligence for trip providers.</h1>
          <p className="subhead">
            Trip providers operate in a market where their school clients are increasingly
            evaluating providers on documentation quality, not just safety record. ETI360
            works with providers to structure the documentation their school clients now
            expect.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            ETI360 aligns operational records to the standards schools hold providers to,
            and surfaces the intelligence that distinguishes well-prepared providers from
            those that have not caught up to the shift.
          </p>

          <h2>Engagement types</h2>
          <p>ETI360 engages providers in three principal forms.</p>

          <h2>Proposal documentation review</h2>
          <p>
            A structured review of how the provider currently presents trips to school
            clients &mdash; what information is included, what information is missing, how
            the documentation aligns to what serious school clients are now asking for. The
            review produces a written report with findings and structured recommendations on
            what to add, what to restructure, and what to drop.
          </p>

          <h2>Operational alignment review</h2>
          <p>
            A review of the provider&apos;s operational documentation &mdash; risk assessments,
            emergency procedures, staff qualifications, provider compliance records &mdash;
            against the standards their school clients reference. ISO 31031 features in most
            reviews; adjacent standards depending on the activities and destinations the
            provider operates. The review produces a structured comparison document showing
            alignment and gaps.
          </p>

          <h2>Ongoing advisory support</h2>
          <p>
            For providers operating across multiple destinations or activity types, ETI360
            provides ongoing support on documentation architecture, intelligence work for
            new destinations, and structured updates to operational records as standards
            and expectations shift. Delivered as consulting engagement supported by the firm&apos;s
            documentation and intelligence infrastructure.
          </p>

          <h2>Why this matters now</h2>
          <p>
            The schools that constitute the market for substantial trip providers have changed
            how they evaluate provider quality. A decade ago a provider&apos;s safety record
            and a willingness to provide a generic risk assessment was, for most schools,
            sufficient evidence. The current bar is substantially higher &mdash; structured
            risk documentation, ISO 31031 alignment, calibrated emergency procedures, current
            intelligence on destinations and activities, and the ability to respond to school
            due diligence with the kind of documentation a school&apos;s risk committee can
            present to its governing body. Providers that have not adapted to this shift find
            their proposals being passed over for providers that have, often without explicit
            feedback on why.
          </p>

          <div className="boundary-callout">
            <h3>What ETI360 does not do</h3>
            <p>
              ETI360 advises providers on documentation, intelligence, and compliance alignment.
              The firm does not operate trips, certify providers, or substitute its judgment
              for the provider&apos;s own operational decisions. The work is consultative &mdash;
              what the provider does with the recommendations, and how the provider runs its
              operations, remains the provider&apos;s responsibility.
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
