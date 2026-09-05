import type { Metadata } from "next";
import { CtaCard, MiniCta } from "@/components/CtaCard";
import Link from "next/link";
import { reportList } from "@/content/solutions";

export const metadata: Metadata = {
  title: "ETI360 — Risk intelligence for school trips",
  description:
    "The problems schools bring us and the documents that answer them: real rendered pages from a fully worked example, each opening as a complete PDF.",
  alternates: { canonical: "/" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "ETI360 — Risk intelligence for school trips",
    description:
      "The problems schools bring us and the documents that answer them: real rendered pages from a fully worked example, each opening as a complete PDF.",
    type: "website",
  },
};

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
        <MiniCta />
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
        </div>
      </section>

      <section id="problems" className="about-strip">
        <div className="container">
          <p className="label ui">The problems we solve</p>
          <h2 className="section-heading section-heading-lg rule-gold">
            The questions schools bring us.
          </h2>
          <p className="section-lead">
            Each opens as a worked answer: the problem, a real example from a fully
            worked demonstration school, and the boundaries of what it does.
          </p>
          <div className="problem-grid">
            {reportList.map((r) => (
              <Link key={r.href} href={r.href} className="problem-card">
                <p className="problem-question">{r.question}</p>
                <p className="problem-name">{r.name} &rarr;</p>
              </Link>
            ))}
          </div>
          <p className="bridge-line ui">
            <Link href="/solutions" className="cta-link ui">
              All solutions, tier by tier &rarr;
            </Link>
            {"  "}
            <Link href="/framework" className="cta-link ui">
              How the 3-Tier Risk Framework organizes them &rarr;
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

      <CtaCard title={'Arrange a briefing.'} copy={'A structured conversation about your current trip governance and where the documents can support it.'} />
    </>
  );
}
