import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Marketing and Positioning Direction",
  description:
    "Board direction paper for ETI360's buyer-question-led positioning and school solutions campaign.",
  robots: { index: false, follow: false },
};

const positioning = [
  {
    label: "Category",
    value: "The documentation and operational intelligence layer for educational travel.",
  },
  {
    label: "School promise",
    value: "Your trips already contain the information. ETI360 makes it complete, consistent and usable.",
  },
  {
    label: "Provider promise",
    value: "Document a program once. The system carries the updates.",
  },
  {
    label: "Proof line",
    value: "Twelve questions. Twelve documents that answer them.",
  },
];

const principles = [
  {
    number: "01",
    title: "Lead with the buyer's question.",
    body: "Start with a recognizable task a school or provider already owns. The reader should understand the relevance before ETI360 describes itself.",
  },
  {
    number: "02",
    title: "Show the answer.",
    body: "Place one real artifact beside the question. Specific work builds more trust than a catalog of claims.",
  },
  {
    number: "03",
    title: "Sell capability, not fear.",
    body: "Name the standard a strong team can gain. Do not open with incidents, consequences or an accusation that current practice is deficient.",
  },
  {
    number: "04",
    title: "Offer one practical next step.",
    body: "Invite the prospect to send one itinerary. A Trip Risk Brief makes the first conversation concrete and allows ETI360 to qualify genuine interest.",
  },
];

const phases = [
  {
    stage: "01",
    name: "Approve",
    timing: "Board decision",
    body: "Approve the positioning, claim boundaries, school pilot and capacity for the no-cost Trip Risk Brief.",
  },
  {
    stage: "02",
    name: "Prepare",
    timing: "Weeks 1 to 2",
    body: "Refocus the For Schools page, host the campaign artifact, complete email-client testing and confirm the first recipient cohort.",
  },
  {
    stage: "03",
    name: "Pilot",
    timing: "Weeks 3 to 4",
    body: "Run the school campaign, capture replies and requests, and record the language prospects use when they respond.",
  },
  {
    stage: "04",
    name: "Extend",
    timing: "After first evidence",
    body: "Apply the same architecture to providers using provider-specific questions about approval readiness and repeatable program documentation.",
  },
];

const measures = [
  ["Primary", "Qualified replies and Trip Risk Brief requests"],
  ["Secondary", "Visits to the For Schools page and contact completion"],
  ["Learning", "Which question, artifact and phrase prompts a substantive reply"],
  ["Guardrails", "Delivery, unsubscribes, spam complaints and fulfilment capacity"],
];

export default function MarketingCampaignReport() {
  return (
    <article className={styles.report}>
      <header className={styles.cover}>
        <div className={styles.coverInner}>
          <p className={styles.kicker}>Board direction paper · August 2026 · Confidential</p>
          <h1>From service catalog to buyer questions.</h1>
          <p className={styles.coverLead}>
            A focused positioning and marketing campaign that introduces ETI360 through the problems
            schools recognize, the outputs that solve them and one practical invitation to begin.
          </p>
          <div className={styles.coverMeta}>
            <span>Prepared for the Board of Directors</span>
            <span>Decision requested: approve a school-first pilot</span>
          </div>
        </div>
      </header>

      <nav className={styles.reportNav} aria-label="Report sections">
        <div className={styles.navInner}>
          <a href="#recommendation">Recommendation</a>
          <a href="#positioning">Positioning</a>
          <a href="#campaign">Campaign</a>
          <a href="#emails">A/B/C emails</a>
          <a href="#delivery">Delivery</a>
          <a href="#decision">Board decision</a>
        </div>
      </nav>

      <section className={styles.section} id="recommendation">
        <div className={styles.sectionLabel}>01 · Executive recommendation</div>
        <div className={styles.recommendationGrid}>
          <div>
            <h2>Make Problem/Solution the organizing idea of ETI360 marketing.</h2>
            <p className={styles.lede}>
              ETI360 has strong products, a credible framework and unusually visual evidence. The marketing
              opportunity is to stop asking prospects to understand the architecture first. We should begin
              with one question they can answer immediately, then show the ETI360 output that answers it.
            </p>
          </div>
          <aside className={styles.decisionCard}>
            <p className={styles.cardLabel}>The proposed direction</p>
            <p className={styles.decisionStatement}>
              One recognizable question. One visible answer. One path into the broader ETI360 system.
            </p>
          </aside>
        </div>
        <div className={styles.rationaleGrid}>
          <div><strong>Clearer</strong><span>The buyer understands the value before learning the product structure.</span></div>
          <div><strong>More credible</strong><span>Real outputs carry the claim, rather than adjectives or promises.</span></div>
          <div><strong>More scalable</strong><span>Each question becomes an email, page section, sales conversation or follow-up.</span></div>
          <div><strong>More measurable</strong><span>Replies and itinerary submissions reveal which buyer problems create action.</span></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.positioningSection}`} id="positioning">
        <div className={styles.sectionLabel}>02 · Positioning</div>
        <div className={styles.sectionIntro}>
          <h2>A simpler proposition, supported by the framework.</h2>
          <p>
            The 3-Tier Risk Framework remains central to delivery and proof. It should no longer carry the
            full burden of the first introduction. The prospect enters through a familiar question; the
            framework explains why ETI360 can answer it consistently.
          </p>
        </div>
        <div className={styles.positioningGrid}>
          {positioning.map((item) => (
            <div className={styles.positioningItem} key={item.label}>
              <span>{item.label}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <div className={styles.boundary}>
          <div>
            <span>Standing boundary</span>
            <h3>Decision-support, not decision authority.</h3>
          </div>
          <p>
            ETI360 does not certify trips and does not sell insurance. ETI360 structures the information
            and documentation; professional judgement and the trip decision stay with the school.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}>03 · Message discipline</div>
        <div className={styles.sectionIntro}>
          <h2>Four rules for every page, email and conversation.</h2>
          <p>
            This is not simply a copy change. It is a repeatable system for deciding what marketing leads
            with, what it proves and what it asks the reader to do.
          </p>
        </div>
        <div className={styles.principlesGrid}>
          {principles.map((principle) => (
            <article className={styles.principle} key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.campaignSection}`} id="campaign">
        <div className={styles.sectionLabel}>04 · School campaign</div>
        <div className={styles.sectionIntro}>
          <h2>The email and the schools page become one connected journey.</h2>
          <p>
            The email should not attempt to explain ETI360 in full. Its role is to make one capability
            immediately relevant and earn the next click or reply.
          </p>
        </div>
        <div className={styles.journey} aria-label="Campaign journey">
          <div><span>1</span><strong>Question</strong><p>A school task the reader recognizes.</p></div>
          <i aria-hidden="true">›</i>
          <div><span>2</span><strong>Artifact</strong><p>One real ETI360 output shown large.</p></div>
          <i aria-hidden="true">›</i>
          <div><span>3</span><strong>Solutions page</strong><p>Twelve related capabilities establish breadth.</p></div>
          <i aria-hidden="true">›</i>
          <div><span>4</span><strong>Conversation</strong><p>One itinerary becomes the practical starting point.</p></div>
        </div>

        <div className={styles.artifactFeature}>
          <div className={styles.artifactCopy}>
            <p className={styles.cardLabel}>The recommended lead question</p>
            <h3>Do you know the scheduled location of every student on every trip?</h3>
            <p>
              The question is understood in one breath. The Location Timeline answers it before the reader
              needs to interpret a product description. This is the campaign method in its clearest form.
            </p>
          </div>
          <figure>
            <Image
              src="/codex/MarketingCampaign/location-timeline.png"
              width={2291}
              height={1459}
              alt="ETI360 Location Timeline showing accommodation, activities, transit and breaks across five days"
              sizes="(max-width: 760px) 100vw, 58vw"
            />
            <figcaption>Harborview demonstration trip. No real school or student data is shown.</figcaption>
          </figure>
        </div>

        <div className={styles.streams}>
          <article>
            <p className={styles.cardLabel}>Stream one · Schools</p>
            <h3>Can our team see, review and operate the trip consistently?</h3>
            <p>Lead with locations, routes, timings, facilities, family information and the operating view.</p>
            <strong>Destination: /for-schools</strong>
            <a className={styles.exampleLink} href="/for-schools">Open the For Schools page example</a>
            <a className={styles.exampleLink} href="/for-schools/route-intelligence">Route Intelligence report</a>
            <a className={styles.exampleLink} href="/for-schools/location-timeline">Location Timeline report</a>
            <a className={styles.exampleLink} href="/for-schools/weather-brief">Weather Brief report</a>
            <a className={styles.exampleLink} href="/for-schools/duty-manager">Duty Manager Dashboard report</a>
            <a className={styles.exampleLink} href="/for-schools/incident-reporting">Incident Reporting report</a>
            <a className={styles.exampleLink} href="/for-schools/medical-access">Medical Access report</a>
            <a className={styles.exampleLink} href="/for-schools/standard-documentation">Standard Trip Documentation report</a>
          </article>
          <article>
            <p className={styles.cardLabel}>Stream two · Providers</p>
            <h3>Can we document a program once and adjust it without rebuilding?</h3>
            <p>Lead with approval readiness, repeatable program files and school-facing evidence.</p>
            <strong>Destination: /for-providers</strong>
            <a className={styles.exampleLink} href="/for-providers">Open the For Trip Providers page example</a>
          </article>
        </div>
      </section>

      <section className={styles.section} id="emails">
        <div className={styles.sectionLabel}>05 · A/B/C email creative</div>
        <div className={styles.sectionIntro}>
          <h2>One proposition, three controlled openings.</h2>
          <p>
            The audience, artifact, broader-solutions link and offer remain fixed. Only the opening approach
            changes. Email A is the recommended first send.
          </p>
        </div>

        <div className={styles.emailGrid}>
          <article className={`${styles.emailCard} ${styles.recommended}`}>
            <header><span>A</span><div><strong>Question-led</strong><small>Recommended</small></div></header>
            <dl><dt>Subject</dt><dd>Can you see where every trip group is scheduled to be?</dd><dt>Preheader</dt><dd>ETI360 turns an itinerary into a clear location timeline and a reviewed trip file.</dd></dl>
            <div className={styles.emailBody}>
              <p>[First name],</p>
              <h3>Do you know the scheduled location of every student on every trip?</h3>
              <p>ETI360 builds the answer from the itinerary, transfer notes and activity schedule. It brings that information into one Location Timeline, with transit included, so the planned movement of each group can be followed across every day.</p>
              <p>I am Dan Skimin, co-founder of ETI360. We produce the documentation around educational travel: reviewed trip files, route and climate intelligence, parent information, operating guides and a Duty Manager Dashboard.</p>
              <p><strong>Other questions ETI360 helps schools answer:</strong><br />Are every hour, route, accommodation and facility recorded?<br />Do all trips follow the same documentary structure?<br />Can the duty manager practice the trip before it runs?</p>
              <p className={styles.textLink}>See the twelve questions and the documents that answer them.</p>
              <p>If you would like to see how this works against a trip your school is already planning, send me an itinerary. I will prepare a Trip Risk Brief at no cost.</p>
              <p className={styles.emailButton}>Talk to us about one trip</p>
              <p>If this is not for you, reply no thanks and I will leave it there.</p>
              <p>Cheers.<br />Dan<br />Co-Founder, ETI360</p>
            </div>
          </article>

          <article className={styles.emailCard}>
            <header><span>B</span><div><strong>Artifact-led</strong><small>Show the work first</small></div></header>
            <dl><dt>Subject</dt><dd>One page from a school trip file</dd><dt>Preheader</dt><dd>Rather than describe ETI360, here is one page of the work.</dd></dl>
            <div className={styles.emailBody}>
              <p>[First name],</p>
              <p>Rather than describe ETI360 first, here is one page of the work.</p>
              <h3>One timeline for the planned location of every trip group</h3>
              <p>This timeline is built from the itinerary, transfers and activity schedule, with every part placed in sequence. It gives the trip coordinator and duty manager one view of where each group is scheduled to be throughout the trip.</p>
              <p>I am Dan Skimin, co-founder of ETI360. A Location Timeline is one part of the reviewed trip file we produce for schools.</p>
              <p><strong>The full set also helps a school record:</strong><br />Routes, elevation, transport, accommodation and verified facilities.<br />Climate history, parent information and operating contacts.<br />Duty manager context, check-ins, incidents and escalation paths.</p>
              <p className={styles.textLink}>See the twelve questions and the documents that answer them.</p>
              <p>If you want to see the format against a trip your school is already planning, send me an itinerary. I will prepare a Trip Risk Brief at no cost.</p>
              <p className={styles.emailButton}>Talk to us about one trip</p>
              <p>If this is not for you, reply no thanks and I will leave it there.</p>
              <p>Cheers.<br />Dan<br />Co-Founder, ETI360</p>
            </div>
          </article>

          <article className={styles.emailCard}>
            <header><span>C</span><div><strong>Workflow-led</strong><small>Connect to existing work</small></div></header>
            <dl><dt>Subject</dt><dd>From itinerary to working trip file</dd><dt>Preheader</dt><dd>Routes, timings, locations and operating information, brought into one consistent file.</dd></dl>
            <div className={styles.emailBody}>
              <p>[First name],</p>
              <p>A school trip begins with information from several places: the provider itinerary, transfer schedule, accommodation details, activity plan and school procedures.</p>
              <h3>ETI360 turns that source material into one reviewed trip file.</h3>
              <p>The Location Timeline places each group&apos;s scheduled location in sequence across every day, including transit. The trip coordinator and duty manager share the same working view.</p>
              <p>I am Dan Skimin, co-founder of ETI360. We work with schools on the documentation that supports planning, review and trip operations.</p>
              <p><strong>The same file can include:</strong><br />Route, transport, accommodation, facility and climate information.<br />A consistent parent pack and operational guide.<br />The context used by the school&apos;s own duty manager while groups travel.</p>
              <p className={styles.textLink}>See the twelve questions and the documents that answer them.</p>
              <p>If a trip is already in planning, send me the itinerary and I will prepare a Trip Risk Brief at no cost. You can review it against your own process and decide whether a further conversation would be useful.</p>
              <p className={styles.emailButton}>Talk to us about one trip</p>
              <p>If this is not for you, reply no thanks and I will leave it there.</p>
              <p>Cheers.<br />Dan<br />Co-Founder, ETI360</p>
            </div>
          </article>
        </div>
        <p className={styles.testNote}>
          Testing note: with a small initial list, the three variants should be treated as qualitative
          message learning. A difference in open rate is not enough to declare a winner. Replies and Trip
          Risk Brief requests are the meaningful signal.
        </p>
      </section>

      <section className={`${styles.section} ${styles.deliverySection}`} id="delivery">
        <div className={styles.sectionLabel}>06 · Delivery and measurement</div>
        <div className={styles.sectionIntro}>
          <h2>A short pilot, designed to produce evidence.</h2>
          <p>
            The first campaign should be managed as a learning cycle. It creates sales opportunities while
            also testing the language and artifacts that deserve broader investment.
          </p>
        </div>
        <div className={styles.phaseGrid}>
          {phases.map((phase) => (
            <article key={phase.stage}>
              <span>{phase.stage}</span>
              <small>{phase.timing}</small>
              <h3>{phase.name}</h3>
              <p>{phase.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.measureGrid}>
          <div>
            <p className={styles.cardLabel}>Measurement hierarchy</p>
            <h3>Optimise for conversation, not attention alone.</h3>
          </div>
          <dl>
            {measures.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
        <div className={styles.riskGrid}>
          <div><strong>Claim discipline</strong><p>Climate history is not a forecast. Facilities are verified, not recommended. ETI360 does not approve trips.</p></div>
          <div><strong>Offer capacity</strong><p>Set a fulfilment limit for no-cost Trip Risk Briefs before the campaign scales.</p></div>
          <div><strong>Compliance</strong><p>Confirm the outreach basis, sender identity, postal address, unsubscribe process and plain-text alternative.</p></div>
        </div>
      </section>

      <section className={styles.decisionSection} id="decision">
        <div className={styles.decisionInner}>
          <p className={styles.kicker}>Decision requested</p>
          <h2>Approve the new positioning and authorize the school-first pilot.</h2>
          <p>
            This direction does not discard the ETI360 framework. It gives the framework a stronger entrance.
            The buyer begins with a question they already own, sees the quality of the answer and then discovers
            the system behind it.
          </p>
          <ol>
            <li>Approve the positioning and four message principles.</li>
            <li>Approve Email A as the lead creative, with B and C retained as controlled alternatives.</li>
            <li>Approve the refocused For Schools page and one-trip offer.</li>
            <li>Authorize the separate provider stream after the school pilot produces evidence.</li>
          </ol>
          <p className={styles.close}>The proposed change is simple: market ETI360 through the answers it makes possible.</p>
        </div>
      </section>
    </article>
  );
}
