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
    desc: "Operational intelligence supports leaders during the trip itself \u2014 location, route and weather.",
    docLines: ["Location Audit", "Route Audit", "Weather Brief"],
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
    slug: "route-audit",
    meta: "Stage 07 \u00B7 Run",
    title: "Route Audit",
    desc: "What terrain, hospitals and hazards does the stated route actually involve?",
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
        <div className="hero-inner">
          <span className="label ui">Decision support for school trips</span>
          <h1>
            Trip decisions need
            <br />
            <em>structured evidence.</em>
          </h1>
          <p className="subhead">
            Most trip risk isn&rsquo;t hidden &mdash; it&rsquo;s just never
            structured enough to act on.
          </p>
          <div className="hero-actions">
            <a className="cta-button ui" href="#cycle">See the cycle</a>
            <a className="cta-link ui" href="#documents">See the documents &rarr;</a>
          </div>
        </div>
      </section>

      <section id="cycle" className="cycle-section">
        <div className="container">
          <h2 className="section-heading section-heading-lg rule-gold">The cycle.</h2>
          <p className="section-lead">Eight stages. One sequence. Every trip.</p>

          <p className="cycle-provenance">
            Beneath the cycle sits ETI360&rsquo;s three-tier risk framework &mdash; built
            from field experience and aligned to recognised international standards,
            ISO 31031 among them. Standing organisational evidence, per-trip evidence,
            and live field evidence compound in that order. The eight stages below are
            the framework in operation.
          </p>
          <figure className="framework-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/diagrams/method-00-three-tier-framework.svg"
              alt="The three-tier risk framework: Tier 1 Organisational Baseline (annual), Tier 2 Trip Risk Review (before departure), Tier 3 Dynamic Risk Operations (during travel) — evidence compounds tier by tier"
            />
          </figure>

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
            One programme carries the cycle. Here is how you engage it.
          </p>
        </div>
      </section>

      <section id="engage" className="engage-section">
        <div className="container">
          <p className="label ui">How you engage</p>
          <h2 className="section-heading section-heading-lg rule-gold">One programme. Three scopes.</h2>
          <p className="section-lead">
            Educational travel risk rarely comes from one bad decision &mdash; it comes
            from the gap between what a school approved and what actually happens on the
            ground. ETI360 structures evidence across the full lifecycle of a trip, not
            at a single checkpoint.
          </p>
          <p className="binding-line">
            Prove the organisation once, prove each trip, equip the field.
          </p>

          <div className="scope-cards">
            <article className="scope-card">
              <h3>Tier 1 &mdash; Organisational Baseline</h3>
              <p className="scope-cadence">
                Annual &mdash; established once, carried across every trip that follows.
              </p>
              <p>
                The Organisational Baseline structures the evidence that a school&rsquo;s or
                provider&rsquo;s governing framework &mdash; policy, competence, escalation,
                prior incident learning &mdash; is documented and ready for scrutiny before
                any individual trip is considered. The outcome is a standing evidence base
                a board, insurer, or regulator can review without re-litigating it trip by
                trip. It is set once a year and referenced continually, not repeated.
              </p>
              <p className="scope-stages ui">Carries the Selection and Audit stages of the cycle.</p>
            </article>

            <article className="scope-card">
              <h3>Tier 2 &mdash; Trip Risk Review</h3>
              <p className="scope-cadence">
                Per trip &mdash; the primary point of engagement.
              </p>
              <p>
                The Trip Risk Review is where governance meets a specific itinerary: a named
                destination, a named group, named dates. It structures the risk evidence,
                the sign-off record, and the control measures a school needs to approve
                that trip on its own merits. This is the scope most schools and providers
                engage ETI360 for, trip by trip, throughout the season.
              </p>
              <p className="scope-stages ui">Carries the Lock, Agree, Assess, and Control stages of the cycle.</p>
            </article>

            <article className="scope-card">
              <h3>Tier 3 &mdash; Dynamic Risk Operations</h3>
              <p className="scope-cadence">
                Per trip &mdash; for operators equipping leaders on the ground.
              </p>
              <p>
                Dynamic Risk Operations extends the approved trip record into the hands of the
                people running it: duty-of-care documentation, briefing materials, and
                live-trip reference built from the same evidence base, not a separate one.
                It gives field staff the documentation to operate in line with what was
                assessed and agreed.
              </p>
              <p className="scope-stages ui">Carries the Run and Review stages of the cycle.</p>
            </article>
          </div>

          <p className="bridge-line">
            One programme, three compounding scopes. Each produces structured documents
            &mdash; the six below are representative.
          </p>
        </div>
      </section>

      <section id="documents" className="documents-section">
        <div className="container">
          <p className="label ui">Documents</p>
          <h2 className="section-heading section-heading-lg rule-gold">The artifacts.</h2>
          <p className="section-lead">
            Real rendered pages, shown at the standard we produce them.
          </p>

          <div className="doc-cards">
            {documents.map((d) => (
              <article key={d.slug} className="doc-card doc-card-static">
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
                </div>
              </article>
            ))}
          </div>

          <div className="docs-contact-cta">
            <a className="cta-button ui" href="mailto:danskimin@eti360.com?subject=ETI360%20%E2%80%94%20Learn%20more">
              Contact us to learn more
            </a>
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
                Trip approval shouldn&rsquo;t rest on one person&rsquo;s judgement or a
                folder of inconsistent paperwork. ETI360 structures the evidence a
                governing board, safeguarding lead, or insurer actually asks for &mdash;
                organisational standing, trip-specific risk assessment, and a clear
                sign-off record. It replaces ad hoc trip files with a governance record
                built the same way, every time.
              </p>
              <Link href="/for-schools" className="cta-link ui">
                How we engage with schools &rarr;
              </Link>
            </article>

            <article className="audience-card">
              <p className="label ui">For Providers</p>
              <h3>Proposal and operations.</h3>
              <p>
                Schools increasingly ask providers to demonstrate governance before
                they&rsquo;ll book &mdash; and assembling that evidence trip by trip, by
                hand, is slow and inconsistent. ETI360 gives providers a structured way to
                produce the same organisational and trip evidence schools are asking for,
                to a consistent standard every time. The evidence pack you already assemble
                by hand &mdash; structured, produced, and rendered for you.
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
