/* DRAFT: pending eti360-tone-review gate before ship */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Documents",
  description:
    "What your school receives: the document library across Tier 1 Organisational Baseline, Tier 2 Trip Risk Review, and Tier 3 Dynamic Risk Operations — real rendered pages from a complete sample pack.",
  openGraph: {
    title: "The Documents — ETI360",
    description:
      "What your school receives: the document library across Tier 1 Organisational Baseline, Tier 2 Trip Risk Review, and Tier 3 Dynamic Risk Operations — real rendered pages from a complete sample pack.",
    type: "website",
  },
};

type Doc = {
  name: string;
  readBy: string;
  desc: string;
  why: string;
  image?: { src: string; alt: string };
};

const tier2Docs: Doc[] = [
  {
    name: "Itinerary Report",
    readBy: "Coordinator · Trip staff",
    desc: "The provider’s itinerary rebuilt as a gap-free, hour-by-hour ledger — every activity, location, transfer, and supervision context accounted for, with what couldn’t be verified marked honestly.",
    why: "Every other document stands on this one. Schools have never seen their trip written down this completely.",
    image: {
      src: "/marketing/library/itinerary-report.png",
      alt: "Itinerary Report — a rendered calendar-view page: four trip days as hour-by-hour blocks covering activities, meals, transport, free time, and accommodation",
    },
  },
  {
    name: "One-Page Program Summary",
    readBy: "Head · Approving committee",
    desc: "The whole trip on a single page: dates, destination, group, program shape, headline risk context.",
    why: "The document that circulates. Committees forward one-pagers; they file binders.",
  },
  {
    name: "Activity Risk Profile Summary",
    readBy: "Risk lead · Coordinator",
    desc: "Every activity scored across seven dimensions — physical intensity, supervision, location exposure, emergency access, skill required, environment, equipment — with the policy gate showing which activities warrant a RAMS and which sit within routine school procedure.",
    why: "The sorting logic in the open. A museum visit and a mountain transfer are treated differently, and the school can see why.",
    image: {
      src: "/marketing/library/arp-summary.png",
      alt: "Activity Risk Profile Summary — a rendered page with the seven-dimension radar chart and per-dimension score table across 105 scored activities",
    },
  },
  {
    name: "RAMS Report — one per activity group",
    readBy: "Risk lead · Trip staff · Provider",
    desc: "For the activities that warrant it: risk scenarios with the local specifics, inherent and residual scores, controls, and emergency actions — grouped the way the trip runs. A five-day trek is one assessment, not five forms.",
    why: "The page a risk lead turns to first, and the clearest evidence of produced work versus filled-in templates.",
    image: {
      src: "/marketing/library/rams-report.png",
      alt: "RAMS Report — a rendered risk register page: named risks with consequence, inherent and residual scores, controls and mitigations, and numbered emergency actions",
    },
  },
  {
    name: "Medical Access Brief",
    readBy: "Duty manager · Trip staff · School nurse",
    desc: "Emergency facilities mapped for where the group will actually be — travel times per activity location, entry procedures, capability context, with provider-named hospitals verified.",
    why: "“How far is help” answered per location, per day — the question every parent evening surfaces and most trip files can’t answer.",
  },
  {
    name: "Weather & Climate Briefing",
    readBy: "Coordinator · Trip staff",
    desc: "Month-specific conditions for the destination and dates — temperatures, rain, wind, seasonal patterns — feeding the risk work rather than sitting beside it.",
    why: "It shows the risk work is seasonal, not generic. A March assessment that knows it’s March builds trust in everything else.",
    image: {
      src: "/marketing/library/weather-briefing.png",
      alt: "Weather & Climate Briefing — a rendered page with the travel-window temperature ranges, precipitation table, sunrise and sunset times, and weather distribution for the trip dates",
    },
  },
  {
    name: "Route Intelligence Summary",
    readBy: "Coordinator · Duty manager",
    desc: "The trip’s movements examined: transfers, corridors, timing, the day-by-day geography of the group.",
    why: "Trips go wrong between venues more often than at them. Schools recognize that truth the moment they see movement treated as seriously as activities.",
  },
  {
    name: "Location Audit Pack / Site Briefs",
    readBy: "Coordinator · Trip staff",
    desc: "Venue-by-venue verification: what each location is, where it sits, what the provider declared, what could and couldn’t be confirmed.",
    why: "“Verified” with receipts. The honest “could not be confirmed — raised with provider” entries do more for credibility than the confirmed ones.",
    image: {
      src: "/marketing/library/location-audit.png",
      alt: "Location Audit Pack — a rendered verification page: the trip’s named hospitals with full local-language addresses and phone numbers",
    },
  },
  {
    name: "Provider Intelligence Brief",
    readBy: "Head · Business manager",
    desc: "What documentation the provider supplied and what it declares — insurance, accreditations, safety systems — presented as declared practice, reviewed but not certified.",
    why: "A structured view of who the school is contracting with, worded with the discipline that protects everyone.",
  },
  {
    name: "Parent Information Pack",
    readBy: "Parents",
    desc: "The trip explained for families: program, logistics, supervision approach, and how the trip is looked after — controls summarized in plain language. The full risk assessment stays school-side, deliberately.",
    why: "Parent communication is where trip anxiety actually lives. A calm, complete pack lowers the temperature of every parent evening.",
    image: {
      src: "/marketing/library/parent-pack.png",
      alt: "Parent Information Pack — a rendered plain-language page covering communication during the trip and emergency procedures for families",
    },
  },
];

const tier3Docs: Doc[] = [
  {
    name: "Daily Briefing",
    readBy: "Duty manager · Trip staff",
    desc: "Each day’s operational card: the day’s movements, weather, contacts, and attention points.",
    why: "It converts the pack from shelf document to working document — the day held on one card.",
  },
  {
    name: "RESPOND Card",
    readBy: "Everyone on the trip",
    desc: "The emergency action card: triggers, first moves, contacts — written to be read under pressure.",
    why: "The document schools hope never to use is the one they most want to have seen in advance.",
  },
  {
    name: "Incident Report",
    readBy: "Head · Risk committee · Insurers where relevant",
    desc: "A formal record per incident: what happened, severity, response, communications — compiled from the live record, not reconstructed from memory.",
    why: "Written at the time, not after. Anyone who has assembled an incident narrative three weeks late understands instantly.",
  },
  {
    name: "Post-Trip Report",
    readBy: "Head · Board · Next year’s coordinator",
    desc: "The trip’s operational record compiled: outcomes, check-ins, incidents and their handling, flags, the day-by-day account.",
    why: "It closes the loop — the record the post-trip review reads, and the institutional memory the next trip starts from.",
  },
];

export default function DocumentsPage() {
  return (
    <>
      {/* DRAFT: pending eti360-tone-review gate before ship */}
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/emergency-docs.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">The Documents</p>
          <h1>What your school receives.</h1>
          <p className="subtitle">
            Every engagement produces documents &mdash; built from your trip&rsquo;s
            own data, not templates. These are real pages from a complete sample pack,
            produced for a fictitious school and a fictitious trip so we can show you
            everything.
          </p>
        </div>
      </section>

      <section className="tight">
        <div className="container measure">
          <p className="artifact-reader ui">
            The documents shown are from a fully worked example for Harborview
            International School &mdash; a fictitious school built on real venues and
            real method, so every page can be shown in full.
          </p>
        </div>
      </section>

      <section id="baseline" className="about-strip tight">
        <div className="container">
          <h2 className="section-heading rule-gold">
            Tier 1 &middot; Organisational Baseline
          </h2>
          <div className="force-tile">
            <span className="force-num">Read by: Head · Board · Risk Committee</span>
            <h3>Organisational Baseline Report</h3>
            <p>
              The school&rsquo;s travel governance reviewed against the ISO 31031
              framework: per-area maturity scores, evidence found, gaps identified.
            </p>
            <p>
              <em>Why it earns its place:</em> it answers the board&rsquo;s question
              before it&rsquo;s asked, and turns &ldquo;we should look at our trip
              governance&rdquo; into a scored, specific starting point.
            </p>
            <p>
              <em>Sample render in preparation.</em>
            </p>
          </div>
        </div>
      </section>

      <section id="tier2" className="documents-section">
        <div className="container">
          <p className="label ui">Every trip, on its merits, before departure</p>
          <h2 className="section-heading rule-gold">
            Tier 2 &middot; Trip Risk Review &mdash; the trip document pack
          </h2>
          <p className="section-lead">
            The per-trip evidence base, produced from the trip&rsquo;s own data. The
            approval conversation starts with evidence already organized.
          </p>

          <div className="doc-cards">
            {tier2Docs.map((d) => (
              <article key={d.name} className="doc-card doc-card-static">
                {d.image && (
                  <div className="doc-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.image.src} alt={d.image.alt} loading="lazy" />
                  </div>
                )}
                <div className="doc-body">
                  <div className="doc-meta ui">Read by: {d.readBy}</div>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                  <p>
                    <em>Why it earns its place:</em> {d.why}
                  </p>
                  {!d.image && (
                    <p>
                      <em>Sample render in preparation.</em>
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          <article className="doc-card doc-card-static perspective-see-all">
            <div className="artifact-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/marketing/library/leadership-deck.png"
                alt="Leadership Briefing Deck — a rendered slide: the trip in 30 seconds, with days, students, activities, destination, dates, and risk groups identified"
                loading="lazy"
              />
            </div>
            <div className="doc-body">
              <div className="doc-meta ui">
                Read by: Head presenting to board or parents
              </div>
              <h3>Leadership Briefing Deck</h3>
              <p>
                The trip&rsquo;s evidence base as a short presentation &mdash; for the
                internal meeting where the trip is actually approved.
              </p>
              <p>
                <em>Why it earns its place:</em> we do the school&rsquo;s internal
                selling for them. The coordinator who doesn&rsquo;t have to build a
                deck is the coordinator who champions the renewal.
              </p>
            </div>
          </article>

          <p className="bridge-line ui">
            <Link href="/showcase" className="cta-link ui">
              See the full sample pack &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section id="tier3" className="about-strip tight">
        <div className="container">
          <h2 className="section-heading rule-gold">
            Tier 3 &middot; Dynamic Risk Operations
          </h2>
          <p className="cycle-provenance">
            Live operational evidence, on a surface the school&rsquo;s own duty manager
            operates. When the trip ends, the record already exists.
          </p>

          <div className="forces-grid">
            {tier3Docs.map((d) => (
              <div key={d.name} className="force-tile">
                <span className="force-num">Read by: {d.readBy}</span>
                <h3>{d.name}</h3>
                <p>{d.desc}</p>
                <p>
                  <em>Why it earns its place:</em> {d.why}
                </p>
                <p>
                  <em>Sample render in preparation.</em>
                </p>
              </div>
            ))}
          </div>

          <div className="boundary-callout">
            <h3>The Duty Manager Dashboard</h3>
            <p>
              The Tier 3 surface, not a document &mdash; operated by your duty manager,
              never by us. The day&rsquo;s timeline, the map, weather and medical
              access for where the group is, check-ins, messages, incidents.
            </p>
          </div>

          <p className="bridge-line ui">
            <Link href="/showcase" className="cta-link ui">
              See the full sample pack &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Every page, shown in full.</h2>
          <p>
            A complete worked example &mdash; every document above, walkable end to
            end, produced the way yours would be.
          </p>
          <p>
            <Link href="/showcase" className="cta-button ui">
              See the full sample pack
            </Link>
          </p>
          <p>
            <Link href="/contact" className="cta-link ui">
              Talk to us &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
