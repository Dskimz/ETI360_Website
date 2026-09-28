import type { Metadata } from "next";
import { CaseStudyLink } from "@/components/CaseStudyLink";
import { CtaCard } from "@/components/CtaCard";
import { ProductHeader } from "@/components/ProductHeader";
import { VersionBlock } from "@/components/VersionBlock";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import { getProduct } from "@/content/products";
import { notices, versionsOf } from "@/content/versions";
import { CLOSING_SENTENCE, WHO_DECIDES } from "@/content/voice";
import styles from "@/components/productpage.module.css";

/* The Field Trip Package, Tier 2 (four-product site spec §4.5; Dan,
   2026-09-25: Q1 no, so no single day trips). One pack for the school year,
   the Annual Elementary Field Trip Risk Assessment Pack, shown whole for each
   version: Firholm School (Seattle, US Letter first) and Harborview
   International School (Singapore, A4 first), both papers through /open.
   The page lists only live versions (spec S18); the redirects for
   /for-schools/field-trips and /trips/elementary land here.

   The decisions below are written for the product, not for one school, so
   they hold for both packs (checked against both PDFs, 2026-09-27); they
   live here only (the version files carry no decisions of their own). What
   differs between the packs, such as the documents Harborview issues beside
   its pack, is in each version's summary.

   Copy marked [draft] passed the tone review on 2026-09-27 (Stage D) and
   awaits Dan's preview. */

const PRODUCT = getProduct("field-trip-package");

// [draft] (spec §4.5, Q1 no)
const LEDE =
  "The lower school’s one-day field trips for the year, prepared before the year begins: one page per trip and a calendar for each month.";

const DECISIONS: { title: string; note: string }[] = [
  {
    title: "Planning the year",
    // From the Harborview content file, verbatim; it holds for Firholm too.
    note: "The year at a glance by grade, and a calendar for each month with the school’s breaks and holidays marked and every trip dated to a school day.",
  },
  {
    title: "Approving each day trip",
    // [draft] adapted from the Harborview note to hold for both packs. Review
    // fix 2026-09-27: the approval boundary is said once, under Who decides.
    note: "Each trip’s page and the risk-assessment working documents prepared for it, for the school to review, complete, and approve.",
  },
  {
    title: "Briefing teachers and chaperones",
    // [draft] adapted from the Harborview note to hold for both packs
    note: "The learning purpose, the schedule from departure to return, the supervision ratio, the venues with their addresses, and the trip coordinator.",
  },
  {
    title: "Telling families",
    // [draft]
    note: "Notes for families on every trip page: what to wear, what to bring, and what to expect.",
  },
  {
    title: "Getting a child to care",
    // [draft]
    note: "For every trip, the emergency departments with their addresses, telephone numbers, and measured drive times. ETI360 lists them; the school confirms which one the group uses.",
  },
];

// [draft] Then each school's notice verbatim (ADR-023).
const DESCRIPTION = `The Field Trip Package (Tier 2 Trip Readiness): the Annual Elementary Field Trip Risk Assessment Pack, a school year of one-day field trips prepared before the year begins, one page per trip and a calendar for each month, in US Letter and A4. ${notices(versionsOf("field-trip-package"))}`;

export const metadata: Metadata = {
  title: "The Field Trip Package",
  description: DESCRIPTION,
  alternates: { canonical: "/field-trip-package" },
  openGraph: {
    title: "The Field Trip Package — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

export default function FieldTripPackagePage() {
  const versions = versionsOf("field-trip-package");
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
            <p>
              One pack for the school year, the Annual Elementary Field Trip Risk Assessment Pack,
              set out by the decisions it supports:
            </p>
            <dl className={styles.rows}>
              {DECISIONS.map((d) => (
                <div key={d.title}>
                  <dt>{d.title}</dt>
                  <dd>{d.note}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.block}>
            {/* [draft] heading and paragraph */}
            <h2 className="section-heading rule-gold" id="versions">
              The pack for two schools
            </h2>
            <p>
              The pack, prepared for two fictional schools: a US lower school in Seattle and an
              international school in Singapore. Each is built to US Letter and A4, and its pages open
              in the school&rsquo;s own paper.
            </p>
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
            {/* [draft] (spec §4.5, trimmed from the old field-trips page's claims) */}
            <p>
              Before the year begins, the school emails its field-trip calendar, the venues, and its
              trip policy. ETI360 checks each venue once, maps the route from school, lists the
              emergency departments by drive time, and returns the pack before the first trip. A trip
              that moves keeps its page and is updated.
            </p>
          </div>

          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES}</p>
            {/* [draft] Review fix 2026-09-27: the approval boundary once. */}
            <p className={styles.next}>
              The pack lists what was prepared for each trip; the school approves each trip on its own
              terms.
            </p>
          </div>

          <div className={styles.block}>
            <WhoDoesTheWork />
          </div>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} product="field-trip-package" />
    </>
  );
}
