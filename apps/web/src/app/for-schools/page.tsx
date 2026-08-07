import type { Metadata } from "next";
import Link from "next/link";
import { DocMarquee, DocRow, TierBand } from "../../components/DocShowcase";
import { schoolDocs, schoolTier1, schoolTier2, schoolTier3 } from "../../components/docLibrary";

export const metadata: Metadata = {
  title: "For Schools",
  description:
    "The three tiers of the ETI360 framework as a school lives them — the annual Organizational Baseline, the Tier 2 Trip Risk Review pack, and Tier 3 Dynamic Risk Operations — every document openable as a real PDF.",
  openGraph: {
    title: "For Schools — ETI360",
    description:
      "The three tiers of the ETI360 framework as a school lives them — the annual Organizational Baseline, the Tier 2 Trip Risk Review pack, and Tier 3 Dynamic Risk Operations — every document openable as a real PDF.",
    type: "website",
  },
};

const tier1 = schoolTier1;
const tier2 = schoolTier2;
const tier3 = schoolTier3;
const allDocs = schoolDocs;

export default function ForSchoolsPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/for-schools.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">For Schools</p>
          <h1>How a trip comes together.</h1>
          <p className="subtitle">
            From the annual baseline to the day the group returns, each stage of
            a school trip has its own document. This page walks the three tiers
            in order &mdash; open any thumbnail to read the document itself.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            A school trip is a sequence of decisions: whether the program fits,
            how the days will run, what families should know, what has been
            assessed and what stands ready, who watches while the group travels,
            and what next year&rsquo;s planning learns from this one. ETI360
            prepares a document for each of those decisions, built from your
            trip&rsquo;s own data, so that each one can be discussed with the
            evidence in front of it.
          </p>
          <p className="artifact-reader ui">
            The documents shown are from a fully worked example for Harborview
            International School. It is fictitious by design, so every page can
            be shown in full &mdash; no real school&rsquo;s or provider&rsquo;s
            documents are ever shown.
          </p>
        </div>

        <TierBand
          n={1}
          id="tier1"
          eyebrow="Tier One · Annual"
          name="Organizational Baseline"
          desc="A documented review of organizational readiness, applied to schools and to trip providers: policies, roles, evidence, and standing arrangements across ten areas, mapped against ISO 31031."
        />
        <div className="doc-rows">
          {tier1.map((e) => (
            <DocRow key={e.anchor} e={e} eager />
          ))}
        </div>

        <TierBand
          n={2}
          id="tier2"
          eyebrow="Tier Two · Every trip"
          name="Trip Risk Review"
          desc="A consistent set of documents for the school's review and decision, from the trip overview to the information parents receive."
        />
        <div className="doc-rows">
          {tier2.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>

        <TierBand
          n={3}
          id="tier3"
          eyebrow="Tier Three · During and after"
          name="Dynamic Risk Operations"
          desc="The working views for the days the group is away, and the record the trip carries home into next year's planning."
        />
        <div className="doc-rows">
          {tier3.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>

        <div className="container measure">
          <div className="boundary-callout">
            <h3>What ETI360 does not do</h3>
            <p>
              ETI360 covers trip governance specifically &mdash; not
              safeguarding, on-campus health and safety, or liability
              management, which are distinct disciplines with their own
              specialist firms. Within trip governance, ETI360 prepares,
              structures, and documents the evidence. It does not approve trips,
              certify schools or providers, or substitute its judgment for that
              of your governing bodies. The documents inform leadership
              discussion; the decision stays with the school.
            </p>
          </div>
        </div>

        <div className="container measure">
          <h2>The documents, end to end</h2>
          <p>
            Every document above, in one passing view &mdash; the strip pauses
            when your cursor is over it, and any page opens in full.
          </p>
        </div>
        <DocMarquee items={allDocs} label="The ETI360 documents for schools" />
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Start with one trip.</h2>
          <p>
            The clearest way to see how the documents would read for your school
            is a conversation about one upcoming trip. Briefings are
            conversations, not sales calls. We respond within two business days.
          </p>
          <p>
            <Link href="/contact" className="cta-button ui">
              Get in touch
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
