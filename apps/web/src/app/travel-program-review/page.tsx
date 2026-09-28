import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import { ProductHeader } from "@/components/ProductHeader";
import { VersionBlock } from "@/components/VersionBlock";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import { getProduct } from "@/content/products";
import { versionsOf } from "@/content/versions";
import { CLOSING_SENTENCE } from "@/content/voice";
import styles from "@/components/productpage.module.css";

/* The Travel Program Review, Tier 1 (four-product site spec §4.2). The
   school's own policies, program path by program path, plus the documents of
   every provider it uses, against the ETI360 Operational Capability
   Framework: one report for leadership, once every four years. No prices, no
   framework codes, no standard named. Monday's REVIEW email links here, so
   the address does not move.

   The sample is the version (src/content/versions/harborview-review.ts): the
   canonical Harborview PDFs that publish_baseline_report.py writes, both
   papers through /open. It shows the school's side only; the page says so
   until the provider-section sample joins the same version (week of Sep 28).

   Copy marked [draft] passed the tone review on 2026-09-27 (Stage D) and
   awaits Dan's preview. */

const PRODUCT = getProduct("travel-program-review");

const LEDE =
  "The Travel Program Review looks at a school’s travel program as a whole: its own policies and procedures, program path by program path, and the documents of every provider it currently uses. ETI360 evaluates both against the ETI360 Operational Capability Framework and writes one report for the school’s leadership, once every four years.";

const PATHS = [
  "Overnight trips abroad",
  "Domestic trips",
  "Elementary day trips",
  "Athletics and activities",
  "Service programs",
  "Exchanges",
];

const STEPS = [
  "The school emails ETI360 its travel policies and procedures, and the documents each of its providers has shared with it.",
  "ETI360 reads each document, evaluates it against the framework, and writes the report.",
  "The school’s leadership reads the report and decides what, if anything, to change.",
];

const WHO_DECIDES_REVIEW =
  "The school, and any provider it works with, retain responsibility for decisions and approvals. ETI360 evaluates documents and shows what they cover; it never certifies, approves, ranks or recommends a provider.";

const DESCRIPTION =
  "The Travel Program Review (Tier 1 Organizational Readiness): a school’s travel policies and procedures, program path by program path, and the documents of every provider it uses, evaluated against the ETI360 Operational Capability Framework. One report for the school’s leadership, once every four years.";

export const metadata: Metadata = {
  title: "The Travel Program Review",
  description: DESCRIPTION,
  alternates: { canonical: "/travel-program-review" },
  openGraph: {
    title: "The Travel Program Review — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

export default function TravelProgramReviewPage() {
  const versions = versionsOf("travel-program-review");
  return (
    <>
      <ProductHeader product={PRODUCT} lede={LEDE} />

      <section className={`article-body ${styles.top}`}>
        <div className={`container ${styles.prose}`}>
          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="receives">
              What the school receives
            </h2>
            {/* [draft] condensed from the three paragraphs this section had */}
            <p>
              One report for the school&rsquo;s leadership, once every four years. It opens with where
              the program stands across the ten areas of the ETI360 Operational Capability Framework,
              then sets out each area, each program path, and each provider. Every evidence line names
              the document, section, and page it comes from, and the report comes in US Letter and A4.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.versions}>
        <div className="container">
          {versions.map((v) => (
            <VersionBlock key={v.slug} version={v} />
          ))}
          <p className={styles.after}>
            The sample shows the school&rsquo;s side of the review. There is no published sample of
            the provider section yet. In a school&rsquo;s report, that section takes each provider the
            school uses in turn and shows what its documents cover in each area of the framework, with
            the evidence behind each finding.
          </p>
        </div>
      </div>

      <section className={`article-body ${styles.rest}`}>
        <div className={`container ${styles.prose}`}>
          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="covers">
              What the review covers
            </h2>
            <h3 className={styles.sub}>The school&rsquo;s program paths</h3>
            <p>
              The review reads the school&rsquo;s own travel policies and procedures one program path
              at a time, wherever the school runs them:
            </p>
            <ul className={styles.paths}>
              {PATHS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>
              Each path is read from its own documents, because each kind of trip usually has its own
              policy, handbook, or procedure. A path the school runs without a written procedure still
              appears in the report, so leadership sees the whole program.
            </p>

            <h3 className={styles.sub}>The providers&rsquo; documents</h3>
            <p>
              The review also evaluates the documents of every provider the school currently uses,
              against the same framework: the policies, procedures, and supporting documents each
              provider shares with the school. For each provider, the report shows what its documents
              cover, area by area, in the same terms as the school&rsquo;s own.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="how">
              How it works
            </h2>
            <ol className={styles.steps}>
              {STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p>There are no due dates and no tracking. The school sends what it has, by email.</p>
          </div>

          <div className={styles.block}>
            {/* Moved verbatim from For Schools ("Which standard is this against?"). */}
            <h2 className="section-heading rule-gold" id="standard">
              Which standard is this against?
            </h2>
            <p>
              There is no single standard for school trips. Schools work to their own policies, their
              accreditor&rsquo;s standards, their insurer&rsquo;s requirements, the rules of the country
              they operate in, and, for travel abroad, government travel advisories. The ETI360
              Operational Capability Framework organizes the school&rsquo;s documents against those
              references without replacing them.
            </p>
          </div>

          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES_REVIEW}</p>
          </div>

          <div className={styles.block}>
            <WhoDoesTheWork />
          </div>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} product="travel-program-review" />
    </>
  );
}
