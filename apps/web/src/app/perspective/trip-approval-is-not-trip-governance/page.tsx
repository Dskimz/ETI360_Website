import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trip approval is not trip governance — ETI360",
  description:
    "The signature satisfies the formal requirement. It does not, on its own, structure the evidence the decision is supposed to rest on.",
  openGraph: {
    title: "Trip approval is not trip governance",
    description:
      "The signature satisfies the formal requirement. It does not, on its own, structure the evidence the decision is supposed to rest on.",
    type: "article",
  },
};

const cycleStages = [
  {
    num: "Stage 01",
    name: "Trip Options",
    desc: "Before approval is on the table. Activities, locations and providers put into comparable evidence form.",
    artifact: "Trip Options Brief",
  },
  {
    num: "Stage 02",
    name: "Operations Playbook",
    desc: "Activity-level risk assessment, compliance alignment, scenario testing, calibrated emergency documentation.",
    artifact: "Operations Playbook",
  },
  {
    num: "Stage 03",
    name: "Pre-Departure",
    desc: "Transfer of operational understanding to the people who will execute the trip. Briefings and rehearsal.",
    artifact: "Briefing Pack",
  },
  {
    num: "Stage 04",
    name: "LiveOps",
    desc: "The duty-manager position established. Visibility into where students are. Incident procedures at hand.",
    artifact: "Live Operational Log",
  },
  {
    num: "Stage 05",
    name: "Post-Trip Review",
    desc: "After-action analysis against the playbook. Feedback synthesis. Lessons captured for the next iteration.",
    artifact: "Post-Trip Review",
  },
];

export default function TripApprovalPage() {
  return (
    <>
      <section
        className="article-header"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/trip-approval.jpg')" } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">Governance</p>
          <h1>Trip approval is not trip governance.</h1>
          <p className="subtitle">
            The signature satisfies the formal requirement. It does not, on its own,
            produce the evidence the decision is supposed to rest on.
          </p>
          <p className="byline ui">Published April 2026 &middot; 4 min read</p>
        </div>
      </section>

      <article className="article-body">
        <div className="container measure">
          <p className="lead">
            International schools have organized trip oversight around a single moment:
            the approval meeting. A stack of proposals. A committee. A signature.
          </p>

          <p>
            The signature satisfies the formal requirement. It does not, on its own, produce
            the evidence the decision is supposed to rest on &mdash; whether activities have
            been risk-assessed against the right dimensions, whether providers have been vetted
            against the standards the school holds them to, whether destination intelligence
            is current, whether emergency protocols match the specific trip rather than the
            generic policy. Those are settled by the work that surrounds the signature, not by
            the signature itself.
          </p>

          <blockquote className="pull-quote">
            The approval moment is the formal act of trip oversight. It is not the substance
            of trip governance.
          </blockquote>

          <h2>What has shifted</h2>
          <p>
            Two changes in the landscape have moved beyond what the approval-as-governance
            model can carry.
          </p>

          <div className="forces-grid">
            <div className="force-tile">
              <span className="force-num ui">Force 01</span>
              <h3>ISO 31031 defines the bar.</h3>
              <p>
                The standard codifies adequate risk management for school-organized activities
                as an ongoing structured process &mdash; planning, provider selection, communication,
                monitoring, and review. Insurers, accreditation bodies, and governing boards now
                read a school&apos;s trip governance against it.
              </p>
            </div>
            <div className="force-tile">
              <span className="force-num ui">Force 02</span>
              <h3>Incident reviews expose the gap.</h3>
              <p>
                Post-incident reviews return repeatedly to the same finding: the documentation
                produced under the approval-as-governance model is not the documentation a school
                needs when something goes wrong. The gap becomes the question the school is asked
                to answer.
              </p>
            </div>
          </div>

          <p>
            A published standard that defines adequate practice, and an incident record that
            shows where current practice falls short &mdash; together they close off the ground
            the approval moment used to occupy.
          </p>

          <h2>What governance actually requires</h2>
          <p>
            If the approval moment is not the substance, the substance has to be located somewhere.
            Worked through against what each phase of a trip involves, it takes the shape of a
            continuous cycle.
          </p>

          <figure
            className="cycle-infographic"
            role="group"
            aria-label="The five macro-stages of the trip governance cycle"
          >
            <div className="cycle-infographic-header ui">The trip governance cycle</div>

            <div className="cycle-flow">
              {cycleStages.map((s) => (
                <div key={s.num} className="cycle-card">
                  <span className="cycle-card-num">{s.num}</span>
                  <div className="cycle-card-name">{s.name}</div>
                  <p className="cycle-card-desc">{s.desc}</p>
                  <span className="cycle-card-artifact">{s.artifact}</span>
                </div>
              ))}
            </div>

            <div className="cycle-loop ui">
              <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden="true">
                <path d="M 2 7 Q 14 -2 26 7" fill="none" stroke="#C9A24D" strokeWidth="1.6" />
                <path d="M 26 7 L 22 4 L 22 10 Z" fill="#C9A24D" />
              </svg>
              <span>
                <em>The cycle loops.</em> Stage 05 updates the institutional record that the
                next Stage 01 draws from.
              </span>
            </div>

            <p className="cycle-caption">
              Each macro-stage breaks down further into the operational stages shown on the{" "}
              <Link href="/#cycle">home page cycle grid</Link>. The approval moment still happens
              &mdash; it now sits inside a cycle that has already produced the evidence it is
              supposed to certify.
            </p>
          </figure>

          <h2>Operational consequences</h2>
          <p>
            Running trip governance as a cycle requires work the approval moment alone does not
            &mdash; intelligence gathering, structured risk assessment, scenario testing, documentation
            production, post-trip analysis. Adequate execution typically calls for dedicated staff
            time, external support, or some combination calibrated to the school&apos;s trip
            portfolio.
          </p>
          <p>
            The cycle also compounds. Intelligence developed for one trip to a destination is reusable
            for the next. Provider assessments accumulate. Post-trip reviews update the institutional
            record that the next Trip Options brief draws from. The first iteration is heavier than
            the approval-only model; later iterations cost less per trip as the institutional record
            matures.
          </p>

          <h2>How ETI360 fits</h2>
          <p>
            ETI360 was built to support the cycle. The firm structures the evidence each stage
            requires, surfaces the gaps the school may not have noticed, and produces the documentation
            the cycle is meant to generate. The firm&apos;s role is to structure, not to certify
            &mdash; schools and providers run their own governance; ETI360 supplies the infrastructure
            that makes adequate governance feasible at contemporary volume and complexity.
          </p>
        </div>
      </article>

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
