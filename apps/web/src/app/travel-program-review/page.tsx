import type { Metadata } from "next";
import { Fragment } from "react";
import { CaseStudyLink } from "@/components/CaseStudyLink";
import { ProductHeader } from "@/components/ProductHeader";
import { VersionBlock } from "@/components/VersionBlock";
import { getProduct } from "@/content/products";
import { versionsOf } from "@/content/versions";
import styles from "@/components/productpage.module.css";

/* 2026-09-30 (Dan): the same cleanup as the Trip Package page: the header
   line, the two samples with titles only, the program paths, how it works in
   three steps. Cut: "What the school receives", the long provider
   paragraph, "Which standard is this against?", Who decides. The provider
   evaluation keeps one sentence of its boundary (never certifies, approves,
   ranks or recommends a provider).

   The Travel Program Review, Tier 1 (four-product site spec §4.2). The
   school's own policies, program path by program path, plus the documents of
   every provider it uses, against the ETI360 Operational Capability
   Framework: one report for leadership, once every four years. No prices, no
   framework codes, no standard named. Monday's REVIEW email links here, so
   the address does not move.

   Two versions, both papers through /open: the Harborview sample
   (src/content/versions/harborview-review.ts, the canonical PDFs that
   publish_baseline_report.py writes), the school's side; then the Line &
   Landmark provider evaluation (line-and-landmark-evaluation.ts), the
   provider section on its own, listed 2026-09-29 on Dan's approval and
   introduced by the provider line between the two blocks. Its notice, the
   brand brief's, verbatim, sits under its block and in the metadata.

   Copy marked [draft] passed the tone review on 2026-09-27 (Stage D) and
   awaits Dan's preview; the provider line's new sentences were
   tone-reviewed on 2026-09-29. */

const PRODUCT = getProduct("travel-program-review");

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
  "The school emails ETI360 its travel policies and the documents its providers have shared with it.",
  "ETI360 reads each document against the ETI360 Operational Capability Framework and writes the report.",
  "The school’s leadership decides what, if anything, to change.",
];

// The provider evaluation follows the Harborview sample.
const PROVIDER_SAMPLE = "line-and-landmark-evaluation";

const DESCRIPTION = PRODUCT.door;

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
      <ProductHeader product={PRODUCT} lede={PRODUCT.door} />

      <div className={styles.versions}>
        <div className="container">
          {versions.map((v) => (
            <Fragment key={v.slug}>
              {v.slug === PROVIDER_SAMPLE ? (
                <p className={styles.after}>
                  The school&rsquo;s report carries a section like this for each of its providers. ETI360
                  does not certify, approve, rank or recommend a provider.
                </p>
              ) : null}
              <VersionBlock version={v} />
            </Fragment>
          ))}
          <CaseStudyLink product={PRODUCT} />
        </div>
      </div>

      <section className={`article-body ${styles.rest}`}>
        <div className={`container ${styles.prose}`}>
          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="covers">
              Program paths
            </h2>
            <ul className={styles.paths}>
              {PATHS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>A path the school runs without a written procedure still appears in the report.</p>
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
          </div>
        </div>
      </section>
    </>
  );
}
