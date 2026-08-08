import type { Metadata } from "next";
import Link from "next/link";
import { DocMarquee, DocRow, TierBand } from "../components/DocShowcase";
import { schoolDocs } from "../components/docLibrary";

export const metadata: Metadata = {
  title: "ETI360 — Decision support for school trips",
  description:
    "ETI360’s 3-Tier Risk Framework and the documents it produces: real rendered pages from the Organizational Baseline to the Post-Trip Feedback Loop, each opening as a complete PDF.",
  alternates: { canonical: "/" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "ETI360 — Decision support for school trips",
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
          <span className="label ui">Decision support for school trips</span>
          <h1>
            Trip decisions need
            <br />
            <em>structured evidence.</em>
          </h1>
          <p className="subhead">
            Most trip risk is already visible. Structure turns it into evidence
            a leadership team can review and act on.
          </p>
          <div className="hero-actions">
            <a className="cta-button ui" href="#framework">See the framework</a>
            <a className="cta-link ui" href="#work">See the documents &rarr;</a>
          </div>
        </div>
      </section>

      <section id="framework" className="about-strip">
        <div className="container">
          <p className="label ui">The framework</p>
          <h2 className="section-heading section-heading-lg rule-gold">
            ETI360&rsquo;s 3-Tier Risk Framework.
          </h2>
          <p className="section-lead">
            Built from field experience and aligned to international standards,
            ISO 31031 among them. Standing organizational evidence, per-trip
            evidence, and live field evidence compound in that order: document
            the organization annually, document each trip, equip the field.
          </p>
        </div>
      </section>
      <TierBand
        n={1}
        eyebrow="Tier One · Annual"
        name="Organizational Baseline"
        desc="A documented review of organizational readiness, applied to schools and to trip providers: policies, roles, evidence, and standing arrangements across ten areas, mapped against ISO 31031."
      />
      <TierBand
        n={2}
        eyebrow="Tier Two · Every trip"
        name="Trip Risk Review"
        desc="A consistent set of documents for the school's review and decision, from the trip overview to the information parents receive."
      />
      <TierBand
        n={3}
        eyebrow="Tier Three · During and after"
        name="Dynamic Risk Operations"
        desc="The working views for the days the group is away, and the record the trip carries home into next year's planning."
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
            The documents.
          </h2>
          <p className="section-lead">
            Real rendered pages from our reference school, Harborview
            International School &mdash; fictitious by design, so every page can
            be shown in full. The documents open as complete PDFs; the live
            operations screens are shown as working views.
          </p>
        </div>
        <div className="doc-rows">
          {featured.map((e, i) => (
            <DocRow key={e.anchor} e={e} eager={i === 0} />
          ))}
        </div>
        <DocMarquee items={schoolDocs} label="The ETI360 document library" />
        <div className="container">
          <p className="bridge-line ui">
            <Link href="/for-schools#tier1" className="cta-link ui">
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
                When a governing board, safeguarding lead, or insurer reviews a
                trip, they ask for specific evidence: organizational standing, a
                trip-specific risk assessment, and a clear sign-off record.
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

      <section className="about-strip">
        <div className="container measure">
          <p className="label ui">About</p>
          <h2 className="section-heading rule-gold">
            An advisory firm in the governance of educational travel.
          </h2>
          <p>
            ETI360 is an advisory firm working in the governance of educational travel.
            The firm advises international schools and trip providers on structuring the
            evidence, intelligence, and documentation that trip governance rests on.
          </p>
          <p>
            ETI360 works in trip governance &mdash; risk assessment, provider review,
            emergency documentation, and post-trip review. We do not cover safeguarding,
            on-campus health and safety, or liability management; those are distinct
            disciplines served by other specialist firms.
          </p>
          <p>
            The work is delivered through structured engagements, but the output is not
            advice alone. It is documented, defensible evidence that supports decisions
            across the trip&rsquo;s full life.
          </p>
          <p>
            <Link href="/about" className="cta-link ui">More about ETI360 &rarr;</Link>
          </p>
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
