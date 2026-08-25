import type { Metadata } from "next";
import Link from "next/link";
import { DocMarquee, DocRow, TierBand } from "../../components/DocShowcase";
import { DocRowsExpander } from "../../components/DocRowsExpander";
import { QABlock, type QAEntry } from "../../components/QASection";
import {
  schoolDocs,
  schoolTier1,
  schoolTier2Featured,
  schoolTier2More,
  schoolTier3,
} from "../../components/docLibrary";

export const metadata: Metadata = {
  title: "For Schools",
  description:
    "The three tiers of the ETI360 framework as a school lives them — the annual Organizational Baseline, the Tier 2 Trip Risk Review pack, and Tier 3 Dynamic Risk Operations — every document openable as a real PDF.",
  alternates: { canonical: "/for-schools" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "For Schools — ETI360",
    description:
      "The three tiers of the ETI360 framework as a school lives them — the annual Organizational Baseline, the Tier 2 Trip Risk Review pack, and Tier 3 Dynamic Risk Operations — every document openable as a real PDF.",
    type: "website",
  },
};

const tier1 = schoolTier1;
const tier2 = schoolTier2Featured;
const tier2More = schoolTier2More;
const tier3 = schoolTier3;
const allDocs = schoolDocs;

const qaAsked: QAEntry[] = [
  {
    q: "It is 21:40 on day four and a parent calls the school office: where is the group at this moment?",
    needs:
      "A complete answer needs the day's record with the current block, the accommodation, and the duty contact in one view.",
    how: "Because the trip's ledger covers each day in sequenced blocks, the current block and the next movement read directly from the record, and the school's own duty manager holds that view while the group travels.",
    bridge: { label: "Duty Manager Dashboard", href: "#duty-manager-dashboard" },
  },
  {
    q: "The board asks before Tuesday's approval vote: which of this trip's activities have been fully assessed?",
    needs:
      "A complete answer needs the activity list, the level of assessment each activity received, and the signed assessment itself.",
    how: "ETI360 profiles every activity, identifies which require full documentation, and supplies the structured evidence, grouped the way the trip runs. The school reviews the assessment and holds the decision.",
    bridge: { label: "Trip Risk Assessment & RAMS", href: "#risk-assessment" },
  },
  {
    q: "A parent asks at the information evening: what exactly will my child be doing on Wednesday?",
    needs:
      "A complete answer needs the journey written for families, consistent with the operational record behind it.",
    how: "The parent version is produced from the same trip ledger as the staff documents, in the school's own voice. The full risk assessment stays school-side, deliberately.",
    bridge: { label: "Parent Itinerary", href: "#parent-itinerary" },
  },
  {
    q: "The insurer asks: what is the plan between the last activity and lights-out?",
    needs:
      "A complete answer needs a record where unscheduled time appears as its own labeled block, with a place and a duration, rather than as a gap.",
    how: "Every block of the program is accounted for in the ledger: free time is entered as free time, with where it happens and when it ends, and the plan is validated against unexplained gaps.",
    bridge: { label: "Itinerary Report", href: "#itinerary-report" },
  },
  {
    q: "A new provider is proposed for next year's trips and the head asks: what do we know about how they operate?",
    needs:
      "A complete answer needs the same documented readiness review for the provider that the school holds for itself.",
    how: "The ten-area review, mapped against ISO 31031 and refreshed annually, is applied to both sides of the trip: the school and each provider who serves it.",
    bridge: { label: "Organizational Baseline Evaluation", href: "#baseline" },
  },
];

const qaProcess: QAEntry[] = [
  {
    q: "Coordinators ask at the first conversation: how much work is this for us?",
    needs:
      "A complete start needs only the trip information the school already holds: the provider's itinerary, the dates, the group.",
    how: "Send it in whatever form it exists. ETI360 structures it into the trip's ledger, and every document is produced from that one record.",
    bridge: { label: "Trip Overview, the first document back", href: "#trip-overview" },
  },
  {
    q: "Governance policy requires named authorship: who writes the risk assessment, and who signs it?",
    needs:
      "A complete answer needs a clear line between structured evidence and signed judgment.",
    how: "ETI360 identifies which activities require additional risk documentation and supplies the structured evidence. The school or provider authors the final position and signs it. The decision stays with the school.",
    bridge: { label: "Trip Risk Assessment & RAMS", href: "#risk-assessment" },
  },
  {
    q: "The departure meeting is Friday and the coach times moved: is every document current?",
    needs:
      "A complete answer needs one source record per trip, from which every document is produced.",
    how: "A change enters the ledger once and the affected documents are reissued from it. The register shows every scheduled trip and its current status in one view.",
    bridge: { label: "Trip Risk Register", href: "#trip-risk-register" },
  },
];

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
            From the annual baseline to the day the group returns, a school trip
            is a sequence of decisions &mdash; and each one arrives with its
            evidence prepared. Open any thumbnail to read the document itself.
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
            documents are ever shown. For your school, every document is
            produced the same way: in your branding and your voice, from your
            trip&rsquo;s own data.
          </p>
        </div>

        <TierBand
          n={1}
          id="tier1"
          eyebrow="Tier One · Annual"
          name="Organizational Baseline"
          desc="Where the school and its providers stand before the year's trips begin: one documented review of readiness — policies, roles, evidence, and standing arrangements across ten areas, mapped against ISO 31031."
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
          desc="What leadership sees before a trip is approved: a consistent set of documents for review and decision, from the trip overview to the information parents receive."
        />
        <div className="doc-rows">
          {tier2.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>
        <DocRowsExpander
          items={tier2More}
          label="See six more Tier 2 documents"
        />

        <TierBand
          n={3}
          id="tier3"
          eyebrow="Tier Three · During and after"
          name="Dynamic Risk Operations"
          desc="How the school stays connected while a group travels: the working views for the days away, and the record the trip carries home into next year's planning."
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

        <div className="container measure qa-section">
          <h2 className="section-heading rule-gold">
            The questions a trip must answer.
          </h2>
          <p>
            Every school trip generates questions: from boards, insurers, and
            parents before departure, and from the school&rsquo;s own
            leadership while the group travels. Each answer below names the
            document that carries it.
          </p>
          <QABlock
            label="Questions your school is asked"
            entries={qaAsked}
            expandFirst={2}
          />
          <QABlock label="Working with ETI360" entries={qaProcess} />
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>See it on your own trip.</h2>
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
