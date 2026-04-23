import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ETI360 — Decision support for school trips",
  description:
    "The governance cycle produces eight structured artifacts. This page shows what each stage delivers.",
  openGraph: {
    title: "ETI360 — Decision support for school trips",
    description:
      "The governance cycle produces eight structured artifacts. This page shows what each stage delivers.",
    type: "website",
  },
};

const stages = [
  {
    num: "Stage 01",
    name: "Selection",
    desc: "Shortlist of trips and providers against the school's own selection criteria.",
    doc: "Trip Options Brief",
  },
  {
    num: "Stage 02",
    name: "Audit",
    desc: "Provider assessed against ISO 31031 or another framework the school holds to.",
    doc: "ISO 31031 Audit",
  },
  {
    num: "Stage 03",
    name: "Lock",
    desc: "Itinerary confirmed as the single source of truth the trip is built against.",
    doc: "Itinerary Confirmation",
  },
  {
    num: "Stage 04",
    name: "Agree",
    desc: "Provider agreement structured around the operational reality of this specific trip.",
    doc: "Provider Agreement",
  },
  {
    num: "Stage 05",
    name: "Assess",
    desc: "Activity Risk Profile surfaces the activities that will need closer control.",
    doc: "Activity Risk Profile",
  },
  {
    num: "Stage 06",
    name: "Control",
    desc: "RAMS built with school and provider together around the identified risks.",
    doc: "RAMS",
  },
  {
    num: "Stage 07",
    name: "Run",
    desc: "Operational intelligence supports leaders during the trip itself \u2014 location, place and weather.",
    docLines: ["Location Audit", "Place Audit", "Weather Brief"],
  },
  {
    num: "Stage 08",
    name: "Review",
    desc: "Post-trip data returns to the system and informs the next cycle.",
    doc: "Post-Trip Review",
  },
];

const documents = [
  {
    slug: "trip-options-brief",
    meta: "Stage 01 \u00B7 Selection",
    title: "Trip Options Brief",
    desc: "Should this trip go ahead? A structured shortlist against the school's selection criteria.",
  },
  {
    slug: "iso-31031-audit",
    meta: "Stage 02 \u00B7 Audit",
    title: "ISO 31031 Audit",
    desc: "Does the provider meet the standards the school holds to itself?",
  },
  {
    slug: "itinerary-confirmation",
    meta: "Stage 03 \u00B7 Lock",
    title: "Itinerary Confirmation",
    desc: "Is this the itinerary every party is working from, without drift?",
  },
  {
    slug: "location-audit",
    meta: "Stage 07 \u00B7 Run",
    title: "Location Audit",
    desc: "Where are students at every point during the trip?",
  },
  {
    slug: "place-audit",
    meta: "Stage 07 \u00B7 Run",
    title: "Place Audit",
    desc: "What medical and operational capability exists at each location?",
  },
  {
    slug: "weather-brief",
    meta: "Stage 07 \u00B7 Run",
    title: "Weather Brief",
    desc: "What conditions should trip leaders prepare for, day by day?",
  },
];

export default function HomePage() {
  return (
    <>
      <section
        className="hero"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/home.jpg')" } as React.CSSProperties}
      >
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="label ui">Decision support for school trips</span>
            <h1>
              Trip decisions need
              <br />
              <em>structured evidence.</em>
            </h1>
            <p className="subhead">
              Every school trip runs a governance cycle &mdash; from selection to
              post-trip review. ETI360 produces the structured intelligence each
              stage of that cycle requires. This page shows the cycle, the documents
              it produces, and how schools and providers engage.
            </p>
            <div className="hero-actions">
              <a className="cta-button ui" href="#cycle">See the cycle</a>
              <a className="cta-link ui" href="#documents">See the documents &rarr;</a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Cycle preview">
            <div className="panel-label ui">Governance cycle preview</div>
            <div className="mini-loop">
              <span>Selection</span>
              <span>Audit</span>
              <span>Lock</span>
              <span>Agree</span>
              <span>Assess</span>
              <span>Control</span>
              <span>Run</span>
              <span>Review</span>
            </div>
          </aside>
        </div>
      </section>

      <section id="cycle" className="cycle-section">
        <div className="container">
          <h2 className="section-heading section-heading-lg rule-gold">The cycle.</h2>
          <p className="section-lead">Eight stages. One sequence. Every trip.</p>

          <div className="cycle-grid">
            {stages.map((s) => (
              <article key={s.num} className="stage">
                <div className="stage-num ui">{s.num}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <span className={"stage-doc ui" + (s.docLines ? " multi" : "")}>
                  {s.docLines
                    ? s.docLines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < (s.docLines as string[]).length - 1 && <br />}
                        </span>
                      ))
                    : s.doc}
                </span>
              </article>
            ))}
          </div>

          <p className="bridge-line">
            Each stage produces a structured document. The six below are representative.
          </p>
        </div>
      </section>

      <section id="documents" className="documents-section">
        <div className="container">
          <p className="label ui">Documents</p>
          <h2 className="section-heading section-heading-lg rule-gold">The artifacts.</h2>
          <p className="section-lead">
            Real pages from real engagements. Click any card to view the full document.
          </p>

          <div className="doc-cards">
            {documents.map((d) => (
              <a key={d.slug} className="doc-card" href="#">
                <div className="doc-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/marketing/previews/${d.slug}.png`}
                    alt={`${d.title} \u2014 sample first page`}
                    loading="lazy"
                  />
                </div>
                <div className="doc-body">
                  <div className="doc-meta ui">{d.meta}</div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                  <span className="doc-link-inline ui">Open document &rarr;</span>
                </div>
              </a>
            ))}
          </div>

          <p className="bridge-line">
            The work is structured around two audiences. See how the cycle fits each.
          </p>
        </div>
      </section>

      <section id="audiences" className="about-strip">
        <div className="container">
          <p className="label ui">Who we work with</p>
          <h2 className="section-heading rule-gold">
            The same cycle. Different operational realities.
          </h2>

          <div className="audience-cards">
            <article className="audience-card">
              <p className="label ui">For Schools</p>
              <h3>Governance and oversight.</h3>
              <p>
                International schools engage ETI360 for governance audits, compliance
                alignment reviews against ISO 31031, and ongoing advisory support for
                trip portfolios. The work covers the full cycle &mdash; from intelligence
                gathering before approval through post-trip review &mdash; and produces
                the structured documentation governance bodies need to do their work well.
              </p>
              <Link href="/for-schools" className="cta-link ui">
                How we engage with schools &rarr;
              </Link>
            </article>

            <article className="audience-card">
              <p className="label ui">For Providers</p>
              <h3>Proposal and operations.</h3>
              <p>
                Trip providers engage ETI360 to structure their proposal documentation
                once, align their operational records to the standards their school clients
                hold them to, and surface the intelligence that distinguishes well-documented
                providers from those performing compliance theater.
              </p>
              <Link href="/for-providers" className="cta-link ui">
                How we engage with providers &rarr;
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="perspective">
        <div className="container">
          <p className="label label-light ui">Perspective</p>
          <h2 className="section-heading rule-gold">
            How we think about trip governance.
          </h2>
          <div className="perspective-grid">
            <Link href="/perspective/trip-approval-is-not-trip-governance" className="article-card">
              <span className="card-label ui">Governance</span>
              <h3>Trip approval is not trip governance.</h3>
              <p>
                The signature satisfies the formal requirement. It does not, on its own,
                structure the evidence the decision is supposed to rest on.
              </p>
              <span className="read-arrow ui">Read &rarr;</span>
            </Link>
            <Link href="/perspective/emergency-documentation-for-educational-travel" className="article-card">
              <span className="card-label ui">Emergency Documentation</span>
              <h3>Emergency documentation for educational travel.</h3>
              <p>
                The documents prepared before a trip are not the documents a trip leader
                can use during one.
              </p>
              <span className="read-arrow ui">Read &rarr;</span>
            </Link>
          </div>
          <p className="perspective-see-all">
            <Link href="/perspective" className="cta-link ui">See all perspective &rarr;</Link>
          </p>
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
            evidence, intelligence, and documentation that adequate trip governance now
            requires.
          </p>
          <p>
            The firm&apos;s positioning is specific. ETI360 covers trip governance &mdash;
            risk assessment, provider vetting, compliance alignment, emergency documentation,
            post-trip review. The firm does not cover safeguarding, on-campus health and
            safety, or liability management; these are distinct disciplines served by other
            specialist firms.
          </p>
          <p>
            The work is delivered through structured engagements, but the output is not
            advice alone. It is documented, defensible evidence that supports decisions
            across the full governance cycle.
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
            A structured conversation about your current trip governance and where the
            cycle can support it. We respond within two business days.
          </p>
          <Link href="/contact" className="cta-button ui">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
