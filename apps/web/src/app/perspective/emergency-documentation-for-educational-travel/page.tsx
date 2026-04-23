import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency documentation for educational travel — ETI360",
  description:
    "The documents prepared before a trip are not the documents a trip leader can use during one. A three-tier architecture for emergency documentation.",
  openGraph: {
    title: "Emergency documentation for educational travel",
    description:
      "The documents prepared before a trip are not the documents a trip leader can use during one.",
    type: "article",
  },
};

export default function EmergencyDocsPage() {
  return (
    <>
      <section
        className="article-header"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/emergency-docs.jpg')" } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">Emergency Documentation</p>
          <h1>Emergency documentation for educational travel.</h1>
          <p className="subtitle">
            The documents prepared before a trip are not the documents a trip leader can use
            during one.
          </p>
          <p className="byline ui">Published April 2026</p>
        </div>
      </section>

      <article className="article-body">
        <div className="container measure">
          <p>
            This gap is widely observed in the literature on emergency response, well documented
            in the practice of university study-abroad programs, and structurally consistent across
            schools regardless of size, region, or trip portfolio. It is also the gap most often
            identified, in retrospect, when an incident becomes a case study.
          </p>

          <p>
            This brief sets out the gap, the research that explains why it exists, and the
            documentation architecture that responds to it. It is written for international schools
            and trip providers thinking through how their emergency documentation is structured
            &mdash; whether they engage ETI360 or not.
          </p>

          <h2>The gap</h2>
          <p>
            Pre-trip risk documentation &mdash; risk assessments, RAMS files, compliance checklists,
            insurance summaries &mdash; is structured for planning. Its readers are risk committees,
            heads of school, insurance underwriters, accreditation bodies. Its purpose is to demonstrate
            that the trip has been thought through. Its register is institutional, its detail is
            comprehensive, and its length reflects the seriousness of the planning process.
          </p>
          <p>
            In-field emergency documentation has a different reader, a different purpose, and a
            different register. The reader is a trip leader, often standing over an injured student,
            possibly in a foreign-language environment, with seconds or minutes available before a
            decision must be made. The purpose is to support that decision. The register has to fit
            a cognitive state in which complex prose cannot be processed.
          </p>
          <p>
            These are not two presentations of the same content. They are different documents serving
            different functions. Schools that prepare only the first set find, when an incident occurs,
            that the documents they have are not the documents the moment requires.
          </p>

          <h2>What the research shows</h2>
          <p>Three bodies of research converge on the same conclusion.</p>

          <p>
            Gary Klein&apos;s work on Recognition-Primed Decision Making, developed initially through
            study of fireground commanders, established that experienced emergency responders do not
            compare options analytically under pressure. They pattern-match against experience and act
            on the first workable option their training has prepared them for. Trip leaders, who are
            typically not experienced emergency responders, lack the mental library this kind of
            pattern-matching draws on. Documentation prepared for them must do the situation-assessment
            work in advance and present the response as a decision tree rather than a reference manual.
          </p>
          <p>
            Atul Gawande&apos;s work on surgical and aviation checklists demonstrated that complexity
            produces errors even among experts working in their primary field. The checklist principles
            that emerged &mdash; fitted to one page, written in the language of the practitioner,
            distinguishing read-do procedures from do-confirm procedures &mdash; apply directly to the
            school trip context, in which trip leaders are expected to internalize dense planning
            documents that they may have read once, weeks before departure.
          </p>
          <p>
            Research on emergency response failures identifies a pattern especially relevant to the
            school trip context: the most common failure is not the wrong decision, but no decision
            at all. The phenomenon &mdash; described in the literature as decision inertia &mdash; is
            a cognitively active state in which the responder reassesses the situation continuously
            without acting. Emergency documentation prepared for trip leaders must actively break this
            cycle by presenting a concrete first action before any context, assessment, or explanation.
          </p>
          <p>
            These three findings &mdash; the absence of pattern recognition, the cognitive load of
            complex documentation, and the risk of decision inertia &mdash; converge on a single
            architectural requirement. Emergency documentation for trip leaders must be scenario-specific,
            action-first, and cognitively minimal.
          </p>

          <h2>What university study-abroad programs do &mdash; and what is missing</h2>
          <p>
            University study-abroad programs offer a useful comparison because they have managed
            international student travel at scale for decades. The pattern is consistent across
            institutions: a comprehensive guide, a program-specific guide, and a wallet card.
          </p>
          <p>
            The wallet card handles &ldquo;who do I call&rdquo; &mdash; pure data retrieval, fitted to
            a moment of panic. The comprehensive guide handles &ldquo;what is the policy&rdquo; &mdash;
            institutional reference, fitted to a moment of administrative review. Both are useful within
            their respective registers.
          </p>
          <p>
            What the standard three-layer model does not provide is the document a trip leader reaches
            for when the wallet card does not cover the situation but the comprehensive guide is too
            dense to consult. The middle tier &mdash; scenario-specific decision support, calibrated to
            the trip&apos;s specific itinerary, designed for use under high stress &mdash; is missing
            from current practice in both the university sector and, more consistently, in international
            school trip governance.
          </p>

          <h2>A three-tier architecture</h2>
          <p>
            The research and the practice point to a documentation architecture organized by cognitive
            state and time horizon.
          </p>

          <p>
            <strong>Tier one: the card.</strong> Cognitive state: panic. Seconds available. Purpose:
            pure data retrieval. Contents: per-participant medical and identity information, insurance
            details, local emergency numbers, embassy contacts, the school&apos;s 24/7 line, the trip
            leader&apos;s local number. Form: wallet-sized, laminated where physical, accessible without
            reading. The card is the document the trip leader looks up, finds the number, and acts.
          </p>

          <p>
            <strong>Tier two: the action card.</strong> Cognitive state: high stress. Minutes available.
            Purpose: scenario-specific decision support. The card substitutes for the pattern recognition
            an experienced emergency responder would have. It breaks decision inertia by presenting a
            concrete first action within seconds of reading. Design principles: scenario-driven rather
            than procedure-driven, location-aware rather than generic, binary decision points only, fitted
            to one card per scenario, attached to the trip leader rather than left in the trip binder.
            A small set of scenarios per trip, selected against the trip&apos;s specific risk profile and
            the destination&apos;s specific emergency infrastructure.
          </p>

          <p>
            <strong>Tier three: the reference.</strong> Cognitive state: managed stress. Hours available.
            Purpose: full reference for the period after the initial response. Contents: full RAMS
            documentation, insurance procedures, embassy protocols, escalation chains, parent notification
            templates, media response procedures, incident documentation forms. This tier already exists
            in most schools&apos; documentation. What changes under the three-tier model is the recognition
            that this tier is not for crisis response &mdash; it is for crisis management, the sustained
            coordination work that follows initial stabilization.
          </p>

          <p>
            The three tiers are not redundant. Each fits a different cognitive state and a different time
            horizon. A school with only the third tier has documentation that cannot be used in the first
            minutes of an incident. A school with only the first tier has documentation that cannot support
            the decisions a trip leader will need to make once the first phone call has been placed. The
            three tiers together support the full arc of an incident response.
          </p>

          <h2>What this means for trip governance</h2>
          <p>
            The three-tier model is not exotic. The cards exist in practice. The references exist in
            practice. What is generally missing is the middle tier &mdash; the action card, calibrated to
            the specific trip, that supports decision-making in the moment when generic procedures fail
            and full references cannot be consulted.
          </p>
          <p>
            Producing the middle tier requires three inputs the planning process already generates: the
            activity-level risk profile that identifies the most probable scenarios, the destination
            intelligence that supplies the location-specific information, and the validated emergency
            response protocols that supply the medical and operational steps. Schools and providers that
            already produce structured risk assessment and structured destination intelligence have most
            of what the middle tier requires; what is missing is the discipline of assembling the inputs
            into scenario-specific, action-first cards calibrated to the specific trip.
          </p>
          <p>
            This is the architecture ETI360 implements as part of the Operations Playbook stage of the
            trip governance cycle. Schools and providers that develop the same architecture independently
            arrive at the same form, because the form is what the research, the practice, and the cognitive
            constraints of in-field emergency response converge on. The architecture is not proprietary;
            it is the shape adequate emergency documentation takes when worked through to its operational
            conclusion.
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
