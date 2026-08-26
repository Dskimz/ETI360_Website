import type { Metadata } from "next";
import Link from "next/link";
import { DocMarquee, DocRow } from "../components/DocShowcase";
import { FrameworkTimeline } from "../components/FrameworkTimeline";
import { SectionNav } from "../components/SectionNav";
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
          <span className="label ui">Risk intelligence for school trips</span>
          <h1>
            Every trip,
            <br />
            <em>decision-ready.</em>
          </h1>
          <p className="subhead">
            A clear, consistent evidence file for each trip.
          </p>
          <div className="hero-actions">
            <Link className="cta-button ui" href="/contact">Arrange a briefing</Link>
            <a className="cta-link ui" href="#work">See what a school receives &rarr;</a>
          </div>
        </div>
      </section>

      <SectionNav
        items={[
          { href: "#framework", label: "The framework" },
          { href: "#work", label: "What a school receives" },
          { href: "#audiences", label: "Who we work with" },
          { href: "#about", label: "About" },
          { href: "#briefing", label: "Arrange a briefing" },
        ]}
      />

      <FrameworkTimeline />

      <section id="work" className="about-strip band">
        <div className="container" data-reveal="">
          <p className="label ui">The work</p>
          <h2 className="section-heading section-heading-lg rule-gold">
            What a school receives.
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
        <div className="container" data-reveal="">
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

      <section id="about" className="about-strip band">
        <div className="container measure">
          <p className="label ui">About</p>
          <h2 className="section-heading rule-gold">
            The independent trip-governance service.
          </h2>
          <p>
            ETI360 is the independent trip-governance service for international
            schools and the providers. ETI360 provides independent
            trip-governance services that structure the evidence behind every
            trip decision, because the same documented framework is applied to
            the organization once a year, to each trip before departure, and to
            the trip while it runs, producing complete documents the school can
            read and hold.
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

      <section id="briefing" className="cta-section">
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
