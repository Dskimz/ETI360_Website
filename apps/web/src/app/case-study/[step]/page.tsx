import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ABOUT,
  CASE_STUDY_ON_HOLD,
  caseStudyLive,
  CHAPTERS,
  getChapter,
  stepHref,
  stepNotices,
  stepOfTotal,
} from "@/content/case-study";
import { DecisionTable, Moves, Notices, StepExhibits, StepLinks, TierChips } from "../_parts/blocks";
import { CaseStudyShell } from "../_parts/Shell";
import styles from "../page.module.css";

/* One step of the Case Study (/case-study/{step}): one moment in
   Harborview's illustrative year and the product that meets it. Top to
   bottom: the step's name and title, its tiers, the case study's own
   disclosure (ABOUT: the school, its providers and its decisions are
   invented, and the samples' dates are their production dates; a product
   page links straight here, past the overview), what Harborview needs; the
   four moves (sends, ETI360 does, receives, decides, with the document's
   own Who decides lines); the Trip Package's decision table where it has
   one; the two or three pages that show the product best; the documents in
   A4 and US Letter and the pages on this site; the notice of every
   fictional name the step carries. The footer's contact row closes it.

   On hold like the rest of the case study: a production build lists no
   step and every step address is a 404 (src/content/case-study.ts). */

export const dynamicParams = false;

export function generateStaticParams() {
  if (!caseStudyLive()) return [];
  return CHAPTERS.map((ch) => ({ step: ch.id }));
}

type Props = { params: Promise<{ step: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { step } = await params;
  const ch = getChapter(step);
  if (!ch || !caseStudyLive()) return {};
  // [draft] The title names the step; the description is the step's own
  // words, then its notices (ADR-023: the disclosure in the metadata).
  const title = `Case Study, step ${ch.number}: ${ch.name}`;
  const description = `An illustrative case study. ${ch.title}. ${ch.need} ${stepNotices(ch).join(" ")}`;
  return {
    title,
    description,
    alternates: { canonical: stepHref(ch) },
    robots: CASE_STUDY_ON_HOLD ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} — ETI360`,
      description,
      type: "website",
      images: ["/marketing/og-default.png"],
    },
  };
}

export default async function CaseStudyStepPage({ params }: Props) {
  if (!caseStudyLive()) notFound();
  const { step } = await params;
  const ch = getChapter(step);
  if (!ch) notFound();

  return (
    <CaseStudyShell current={ch}>
      <article className={styles.step} aria-labelledby="step-title">
        <header className={styles.stepHead}>
          <p className={`${styles.stepEyebrow} ui`}>
            <span className="sr-only">{stepOfTotal(ch)}: </span>
            {ch.name}
          </p>
          <h1 id="step-title" className={styles.stepTitle} tabIndex={-1}>
            {ch.title}
          </h1>
          <p className={`${styles.stepMeta} ui`}>
            {ch.product ? <TierChips chapter={ch} /> : <span className={styles.stepLabel}>{ch.label}</span>}
            <span className={styles.stepMetaText}>
              Illustrative case study &middot; Harborview International School &middot; Singapore
            </span>
          </p>
          <p className={`${styles.stepAbout} ui`}>{ABOUT}</p>
          <div className={styles.need}>
            <p className={`${styles.needLabel} ui`}>What Harborview needs</p>
            <p className={styles.needText}>{ch.need}</p>
          </div>
        </header>

        <Moves ch={ch} />
        <DecisionTable ch={ch} />
        <StepExhibits chapter={ch} />
        <StepLinks ch={ch} />
        <Notices notices={stepNotices(ch)} className={styles.stepNotices} />
      </article>
    </CaseStudyShell>
  );
}
