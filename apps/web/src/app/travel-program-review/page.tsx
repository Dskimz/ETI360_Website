import type { Metadata } from "next";
import { CaseStudyLink } from "@/components/CaseStudyLink";
import { ProductHeader } from "@/components/ProductHeader";
import { VersionBlock } from "@/components/VersionBlock";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import { getProduct } from "@/content/products";
import { notices, versionsOf } from "@/content/versions";
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

// The program paths (CLAUDE.md, Tier 1 is path-aware), named as the
// Harborview sample names them.
const PATHS = [
  "International multi-day trips",
  "Elementary day trips",
  "Athletics and activities travel",
  "Week Without Walls",
  "Service learning and CAS",
  "Exchanges and homestays",
];

const STEPS = [
  "The school emails ETI360 its travel policies and procedures, and the documents each of its providers has shared with it.",
  "ETI360 reads each document, evaluates it against the framework, and writes the report.",
  "The school’s leadership reads the report and decides what, if anything, to change.",
];

const WHO_DECIDES_REVIEW =
  "The school and any provider it works with retain responsibility for decisions and approvals. ETI360 evaluates documents and shows what they cover; it never certifies, approves, ranks, or recommends a provider.";

// The version's notice rides in the description verbatim (ADR-023: the
// fictional-school disclosure on the page and in its metadata).
const DESCRIPTION = `The Travel Program Review (Tier 1 Organizational Readiness): a school’s travel policies and procedures, program path by program path, and the documents of every provider it uses, evaluated against the ETI360 Operational Capability Framework. One report for the school’s leadership, once every four years. ${notices(versionsOf("travel-program-review"))}`;

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
            {/* [draft] condensed from the three paragraphs this section had;
                review fix 2026-09-27: it no longer repeats the lede's opening. */}
            <p>
              The report opens with where the program stands across the ten areas of the ETI360
              Operational Capability Framework, then sets out each area, each program path, and each
              provider. Every evidence line names the document, section, and page it comes from, and
              the report comes in US Letter and A4.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.versions}>
        <div className="container">
          {versions.map((v) => (
            <VersionBlock key={v.slug} version={v} />
          ))}
          {/* [draft] review fix 2026-09-27: what the school receives, not
              what the sample lacks. The provider-section pages join this
              version when the renamed fictional provider's sample lands. */}
          <p className={styles.after}>
            In a school&rsquo;s report, a provider section follows: each provider the school uses, in
            turn, with what its documents cover in each area and the evidence behind each finding.
          </p>
          <CaseStudyLink product={PRODUCT} />
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
            <p>The school sends what it has, by email.</p>
          </div>

          <div className={styles.block}>
            {/* Dan's spoken answer (Sales rulings, 2026-09-13): the framework
                "was aligned on a number of international standards". No
                standard is named (CLAUDE.md). Review fix, 2026-09-27. */}
            <h2 className="section-heading rule-gold" id="standard">
              Which standard is this against?
            </h2>
            <p>
              The ETI360 Operational Capability Framework was aligned on a number of international
              standards. It sits beside the school&rsquo;s own policies, its accreditor&rsquo;s
              standards, its insurer&rsquo;s requirements, the rules of the country it operates in,
              and, for travel abroad, government travel advisories, without replacing them.
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

    </>
  );
}
