import type { Metadata } from "next";
import { CaseStudyLink } from "@/components/CaseStudyLink";
import { ProductHeader } from "@/components/ProductHeader";
import { VersionBlock } from "@/components/VersionBlock";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import { getProduct } from "@/content/products";
import { notices, versionsOf } from "@/content/versions";
import { WHO_DECIDES } from "@/content/voice";
import styles from "@/components/productpage.module.css";

/* The Conference Travel Package, Tier 2 (four-product site spec §4.6; Dan,
   2026-09-25, Q2: the name and this address). One Athletics and Activities
   Trips Guide for the year (the document keeps the name its PDF carries),
   shown whole for its version: Wexcombe International School in the
   Meridian Schools Conference, A4 first, both papers through /open. No
   price: the product has never been sold. The redirects for
   /for-schools/conference-visits and /for-schools/tournament-travel land
   here.

   The claims are trimmed from the old /for-schools/conference-visits page
   and checked against the 2026-09-25 edition of the guide (2026-09-27): the
   emergency departments are now listed by drive time from the host school
   and the school confirms which one the group uses (V3 ADR-025); "what to
   bring" moved to the guide's Before every trip page; ETI360 is named on
   every medical page, so "ETI360 appears once" came off.

   Copy marked [draft] passed the tone review on 2026-09-27 (Stage D) and
   awaits Dan's preview. */

const PRODUCT = getProduct("conference-travel-package");

// [draft] (spec §4.6, trimmed from the old page's heroLine)
const LEDE =
  "One guide for the year for the coaches, advisors, and administrators who travel with the school’s teams: the conference calendar, then a chapter for every host city, issued in the school’s own name and colors.";

const CLAIMS: { lead: string; body: string }[] = [
  {
    lead: "Measured from the host’s own point",
    // [draft] edited: the walk is to the host school; the Cochin figure is by
    // road. Review fix 2026-09-27: the directions vendor came off.
    body: "Three hotels within a walk of each host school, each with its walk to the host, its drive to the emergency department, and its drive from the airport and from the station: in Paris, the Hôtel Trianon Rive Gauche is 0.7 km on foot from the host school and 2.3 km by road from Hôpital Cochin.",
  },
  {
    // Tone review 2026-09-27: the heading no longer personifies the page.
    lead: "A medical page for each country",
    // [draft] rewritten for the 2026-09-25 edition
    body: "The emergency departments are listed by drive time from the host school, shortest first, and the school confirms which one the group uses. Where a city runs a separate children’s emergency department (Paris, Berlin, Madrid, Rome, Geneva), the chapter lists it, with the line each country uses to reach a doctor or route a patient: the SAMU on 15 in France, 116 117 in Germany and Italy, the huisartsenpost in the Netherlands. Three lines say how triage runs, what is paid at the desk, and who speaks English.",
  },
  {
    lead: "Arrival by air and by rail",
    // [draft] trimmed; the unverifiable "half the legs are trains" came off
    body: "Each chapter’s arrival page carries the airport and the main station, with the road figure from each to the host school and the rail link the party uses: RER B from Charles de Gaulle stops at the Luxembourg gate.",
  },
  {
    lead: "One document for the year",
    // From the old page; checked against the 2026-09-25 contents page. Tone
    // review 2026-09-27: the per-trip fixture guide (not one of the four
    // products) came off; the trip details stay with the school, as in How
    // it works below.
    // Review fix 2026-09-27: "the schedule, the squad, and the rooming list
    // stay with the school" is said once, in How it works.
    body: "A contents page with every start page, then six chapters in one fixed order — the medical page is always the fourth page of a chapter — so a coach who has used the Paris chapter reads the Madrid chapter without learning it. A city does not change between visits, so its chapter is written once.",
  },
  {
    // Trimmed from the old page: ETI360 is now named on every medical page.
    // Tone review 2026-09-27: "not ours" off the heading.
    lead: "The school’s document",
    body: "The guide carries the school’s own name, colors, and mark on every page, and each host city’s chapter takes the host school’s colors and mark; the cover carries all six.",
  },
];

// [draft] Then the notice verbatim (ADR-023).
const DESCRIPTION = `The Conference Travel Package (Tier 2 Trip Readiness): one Athletics and Activities Trips Guide for the year, for the coaches and staff who travel with a school’s teams and delegations, with a chapter for every host city, in A4 and US Letter. ${notices(versionsOf("conference-travel-package"))}`;

export const metadata: Metadata = {
  title: "The Conference Travel Package",
  description: DESCRIPTION,
  alternates: { canonical: "/conference-travel-package" },
  openGraph: {
    title: "The Conference Travel Package — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

export default function ConferenceTravelPackagePage() {
  const versions = versionsOf("conference-travel-package");
  return (
    <>
      <ProductHeader product={PRODUCT} lede={LEDE} />

      <section className={`article-body ${styles.top}`}>
        <div className={`container ${styles.prose}`}>
          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="receives">
              What the school receives
            </h2>
            {/* [draft] */}
            <p>One document, the Athletics and Activities Trips Guide, prepared once for the year:</p>
            <dl className={styles.rows}>
              {CLAIMS.map((c) => (
                <div key={c.lead}>
                  <dt>{c.lead}</dt>
                  <dd>{c.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.block}>
            {/* [draft] heading and paragraph */}
            <h2 className="section-heading rule-gold" id="versions">
              One school&rsquo;s guide
            </h2>
          </div>
        </div>
      </section>

      <div className={styles.versions}>
        <div className="container">
          {versions.map((v) => (
            <VersionBlock key={v.slug} version={v} />
          ))}
          <CaseStudyLink product={PRODUCT} />
        </div>
      </div>

      <section className={`article-body ${styles.rest}`}>
        <div className={`container ${styles.prose}`}>
          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="how">
              How it works
            </h2>
            {/* [draft] (spec §4.6) */}
            <p>
              Once a year the school emails its conference calendar and the host schools. ETI360
              measures every distance from each host school&rsquo;s own point and returns the guide
              before the season. The schedule, the squad, and the rooming list stay with the school.
            </p>
          </div>

          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES}</p>
            {/* [draft] The old page's boundary; review fix 2026-09-27: the
                guide also carries ETI360's own measured distances, so it
                does more than organize (positioning, 2026-09-22). */}
            <p className={styles.next}>
              The guide sets out public information and ETI360&rsquo;s measured distances; the school
              chooses the hotel, holds the medical summaries and the insurance, and completes every
              field marked for confirmation.
            </p>
          </div>

          <div className={styles.block}>
            <WhoDoesTheWork />
          </div>
        </div>
      </section>

    </>
  );
}
