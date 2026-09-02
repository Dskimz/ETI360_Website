import type { Metadata } from "next";
import Link from "next/link";
import { DocRow, TierBand } from "../components/DocShowcase";
import { schoolDocs } from "../components/docLibrary";

export const metadata: Metadata = {
  title: "ETI360 — Risk intelligence for school trips",
  description:
    "ETI360’s 3-Tier Risk Framework and the documents it produces: real rendered pages from the Organizational Baseline to the Post-Trip Feedback Loop, each opening as a complete PDF.",
  alternates: { canonical: "/" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "ETI360 — Risk intelligence for school trips",
    description:
      "ETI360’s 3-Tier Risk Framework and the documents it produces: real rendered pages from the Organizational Baseline to the Post-Trip Feedback Loop, each opening as a complete PDF.",
    type: "website",
  },
};

const featured = ["route-intelligence", "risk-assessment", "duty-manager-dashboard"]
  .map((anchor) => schoolDocs.find((d) => d.anchor === anchor)!)
  .map((d) => ({ ...d, anchor: `featured-${d.anchor}` }));

export default function HomePage() {
  return (
    <>
      <section
        className="hero"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/home.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <h1>
            Risk intelligence
            <br />
            <em>for school trips.</em>
          </h1>
          <p className="subhead">
            Custom evidence documentation for each trip.
          </p>
          <div className="hero-actions">
            <a className="cta-button ui" href="#what-we-do">What we do</a>
            <a className="cta-link ui" href="#work">See what a school receives &rarr;</a>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="about-strip">
        <div className="container measure">
          <p className="label ui">What we do</p>
          <h2 className="section-heading section-heading-lg rule-gold">
            Decision-ready evidence for every trip.
          </h2>
          <p className="section-lead">
            ETI360 is a risk governance and intelligence consulting firm for educational
            travel, working with international schools and the providers who serve them.
            We turn the information a school and its providers already hold &mdash;
            itineraries, provider documents, dates, routes &mdash; into the decision-ready
            evidence schools need.
          </p>
          <p className="section-lead">
            To help with this, we developed the 3-Tier Risk Framework.
          </p>
        </div>
      </section>

      <section id="framework" className="about-strip tight">
        <div className="container">
          <p className="label ui">How we do it</p>
          <h2 className="section-heading section-heading-lg rule-gold">
            ETI360&rsquo;s 3-Tier Risk Framework.
          </h2>
        </div>
      </section>
      <TierBand
        n={1}
        eyebrow="Tier One · Annual"
        name="Organizational Baseline"
        desc="Where the school and its providers stand before the year's trips begin: one documented review of readiness — policies, roles, evidence, and standing arrangements across the ten operational capability areas, OC01 through OC10."
      />
      <TierBand
        n={2}
        eyebrow="Tier Two · Every trip"
        name="Trip Risk Review"
        desc="What leadership sees before a trip is approved: a consistent set of documents for review and decision, from the trip overview to the information parents receive."
      />
      <TierBand
        n={3}
        eyebrow="Tier Three · During and after"
        name="Dynamic Risk Operations"
        desc="How the school stays connected while a group travels: the working views for the days away, and the record the trip carries home into next year's planning."
      />
      <section className="about-strip tight">
        <div className="container">
          <p className="bridge-line ui">
            <Link href="/framework" className="cta-link ui">
              How the framework works &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section id="work" className="about-strip">
        <div className="container">
          <p className="label ui">The work</p>
          <h2 className="section-heading section-heading-lg rule-gold">
            What a school receives.
          </h2>
          <p className="section-lead">
            Real rendered pages from our reference school, Harborview
            International School &mdash; fictitious by design, so every page can
            be shown in full &mdash; no real school&rsquo;s documents are ever shown. The documents open as complete PDFs; the live
            operations screens are shown as working views.
          </p>
        </div>
        <div className="doc-rows">
          {featured.map((e, i) => (
            <DocRow key={e.anchor} e={e} eager={i === 0} />
          ))}
        </div>
        <div className="container">
          <p className="bridge-line ui">
            <Link href="/framework#tier1" className="cta-link ui">
              The full library, tier by tier &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section id="audiences" className="about-strip">
        <div className="container">
          <p className="label ui">Who we work with</p>
          <h2 className="section-heading rule-gold">
            The same framework. Two operational realities.
          </h2>

          <div className="audience-cards">
            <article className="audience-card">
              <p className="label ui">For schools</p>
              <h3>Governance and oversight.</h3>
              <p>
                The sign-off meeting, the family questions, and the days the group
                is away all draw on the same evidence: organizational standing,
                a trip-specific risk assessment, and a clear record of decisions.
                ETI360 structures that evidence into a governance record built
                the same way, every time &mdash; prepared for the school&rsquo;s
                review and decision.
              </p>
              <Link href="/for-schools" className="cta-link ui">
                How we engage with schools &rarr;
              </Link>
            </article>

            <article className="audience-card">
              <p className="label ui">For providers</p>
              <h3>Proposal and operations.</h3>
              <p>
                Schools ask providers to demonstrate governance before they book.
                ETI360 gives providers a structured way to produce the same
                organizational and trip evidence schools review, to a consistent
                standard for every departure &mdash; the evidence pack a school
                expects, produced through a documented process and ready for
                their review.
              </p>
              <Link href="/for-providers" className="cta-link ui">
                How we engage with providers &rarr;
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Arrange a briefing.</h2>
          <p>
            A structured conversation about your current trip governance and where
            the documents can support it. We respond within two business days.
          </p>
          <Link href="/contact" className="cta-button ui">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
