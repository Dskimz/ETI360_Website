import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaCard } from "@/components/CtaCard";
import { TIER_NAMES } from "@/content/services";
import { BRAND_EYEBROW, CLOSING_SENTENCE, DAN_TRACK_RECORD, FOUNDERS_LINE } from "@/content/voice";
import styles from "./page.module.css";

/* The Travel Program Review, Tier 1 (Dan, 2026-09-25: two products, one
   approach; the review evaluates providers). The school's own policies,
   program path by program path, plus the documents of every provider it
   uses, against the ETI360 Operational Capability Framework: one report for
   leadership, once every four years. No prices (Dan's pricing decision is
   open), no framework codes, no standard named. Monday's campaign email
   links here, so the route must not move. The sample is the canonical
   Harborview PDF (published by publish_baseline_report.py in the rebuild
   repo, never hand-copied); no provider sample exists, so none is shown. */

/* Hidden until the Travel Program Review edition of the sample exists (2026-09-25
   review: the current PDF is the older Organizational Baseline Evaluation, marked
   Confidential, with retired HIA codes, no fictional-school notice and no provider
   section). Re-render through publish_baseline_report.py, then set this to true. */
const SHOW_SAMPLE = false;
const SAMPLE_PDF = "/docs/organizational-baseline-evaluation-v4.pdf";
const SAMPLE_PAGE = {
  src: "/email/spread-school-baseline-v4.png",
  width: 1200,
  height: 1696,
  alt: "The first page of the sample review for Harborview International School: a summary of the ten areas, each with its state across the school’s program paths, and the school documents the review read.",
};
const FICTIONAL_NOTICE =
  "Harborview International School is a fictional school; its location is shown for illustrative purposes.";

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
  return (
    <>
      <section className="article-header">
        <div className="hero-inner">
          <p className="label label-light ui">{BRAND_EYEBROW}</p>
          <h1>The Travel Program Review</h1>
          <p className="subtitle ui">{TIER_NAMES[1]}</p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">{LEDE}</p>
        </div>

        <div className={`container measure ${styles.block}`}>
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

        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="receives">
            What the school receives
          </h2>
          <p>
            One report for the school&rsquo;s leadership. It opens with where the program stands
            across the ten areas of the ETI360 Operational Capability Framework, then sets out each
            area, each program path, and each provider.
          </p>
          <p>
            Each area is shown with its finding and the evidence behind it. Every evidence line names
            the document, section, and page it comes from, so each finding can be traced to its
            source. Like every ETI360 document, the report is built in two paper sizes, US Letter and
            A4.
          </p>
          <p>The review runs once every four years.</p>
        </div>

        <div className={`container measure ${styles.block}`}>
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

        <div className="container measure">
          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES_REVIEW}</p>
          </div>
        </div>

        {SHOW_SAMPLE && (
        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="sample">
            The sample review
          </h2>
          <article className={styles.sample}>
            <a
              className={styles.sampleThumb}
              href={SAMPLE_PDF}
              target="_blank"
              rel="noopener"
              aria-label="Open the sample Travel Program Review, A4 edition (PDF, opens in a new tab)"
            >
              <Image
                src={SAMPLE_PAGE.src}
                width={SAMPLE_PAGE.width}
                height={SAMPLE_PAGE.height}
                alt={SAMPLE_PAGE.alt}
                sizes="(max-width: 640px) 160px, 220px"
              />
            </a>
            <div className={styles.sampleBody}>
              <p className={`${styles.sampleLabel} ui`}>Harborview International School</p>
              <h3>Travel Program Review</h3>
              <p>
                The review for Harborview International School reads each of the school&rsquo;s
                program paths from its own policies, handbooks, and procedures. The first page gives
                two views of the ten areas: international trips on their own, and every program path
                together. Each area then has its own pages, with its finding for each path and the
                evidence behind it.
              </p>
              <p className={`${styles.editions} ui`}>
                <span className={styles.pending}>US Letter edition in preparation</span>
                <a
                  href={SAMPLE_PDF}
                  target="_blank"
                  rel="noopener"
                  aria-label="Open the sample Travel Program Review, A4 edition (PDF, opens in a new tab)"
                >
                  A4
                </a>
              </p>
            </div>
          </article>
          <p className={`${styles.disclosure} ui`}>{FICTIONAL_NOTICE}</p>
          <p>
            The sample shows the school&rsquo;s side of the review. There is no published sample of
            the provider section yet. In a school&rsquo;s report, that section takes each provider the
            school uses in turn and shows what its documents cover in each area of the framework, with
            the evidence behind each finding.
          </p>
        </div>
        )}

        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="trip-by-trip">
            Trip by trip
          </h2>
          <p>
            The Travel Program Review looks at the whole program. ETI360 also works trip by trip,
            preparing the documents for one trip, before, during, and after it. Each worked trip shows
            them in full.
          </p>
          <p className="ui">
            <Link href="/trips" className="cta-link">
              See the worked trips &rarr;
            </Link>
          </p>
        </div>

        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="who-does-the-work">
            Who does the work
          </h2>
          <p>
            {FOUNDERS_LINE} {DAN_TRACK_RECORD}
          </p>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} />
    </>
  );
}
