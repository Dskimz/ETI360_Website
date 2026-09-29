import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CASE_STUDY_ON_HOLD,
  caseStudyLive,
  getStep,
  INTRO,
  STEP_UI,
  stepHref,
  stepNotices,
  stepOfTotal,
  STEPS,
} from "@/content/case-study";
import {
  Conversation,
  Excerpts,
  HowItWorks,
  Notices,
  Receives,
  RestOfYear,
  StepFoot,
  TierChips,
  WhoDecidesBox,
} from "../_parts/blocks";
import { CaseStudyShell } from "../_parts/Shell";
import styles from "../page.module.css";

/* One step of the Case Study (/case-study/{product}): one product in
   Harborview's illustrative year. Outputs first, one sequence on every step
   (the reviewer's point, 2026-09-28): the head (the product, the step's
   title, its tiers, the illustrative label and the samples line, since a
   product page links straight here); what Harborview needs; (the Travel
   Program Review only) the first conversation; what Harborview receives;
   how it works (sends, ETI360 does, decides); the one Who decides box; the excerpts; (the Trip
   Package only) the rest of the year; the documents, the pages on this site
   and the next step; the notices. The footer's contact row closes it.

   On hold like the rest of the case study: a production build lists no
   step and every step address is a 404 (src/lib/case-study-hold.ts). */

export const dynamicParams = false;

export function generateStaticParams() {
  if (!caseStudyLive()) return [];
  return STEPS.map((s) => ({ step: s.id }));
}

type Props = { params: Promise<{ step: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { step } = await params;
  const s = getStep(step);
  if (!s || !caseStudyLive()) return {};
  const title = `Case Study, step ${s.number}: ${s.name}`;
  return {
    title,
    description: s.description,
    alternates: { canonical: stepHref(s) },
    robots: CASE_STUDY_ON_HOLD ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} — ETI360`,
      description: s.description,
      type: "website",
      images: ["/marketing/og-default.png"],
    },
  };
}

export default async function CaseStudyStepPage({ params }: Props) {
  if (!caseStudyLive()) notFound();
  const { step } = await params;
  const s = getStep(step);
  if (!s) notFound();

  return (
    <CaseStudyShell current={s}>
      <article className={styles.step} aria-labelledby="step-title">
        <header className={styles.stepHead}>
          <p className={`${styles.stepEyebrow} ui`}>
            <span className="sr-only">{`${stepOfTotal(s)}: `}</span>
            {s.name}
          </p>
          <h1 id="step-title" className={styles.stepTitle} tabIndex={-1}>
            {s.title}
          </h1>
          <p className={`${styles.stepMeta} ui`}>
            <TierChips step={s} />{" "}
            <span className={styles.stepMetaText}>
              {`${STEP_UI.illustrative} · Harborview International School · Singapore`}
            </span>
          </p>
          <p className={`${styles.stepAbout} ui`}>{INTRO.samples}</p>
          <div className={styles.need}>
            <h2 className={`${styles.needLabel} ui`}>{STEP_UI.need}</h2>
            <p className={styles.needText}>{s.need}</p>
          </div>
        </header>

        <Conversation step={s} />
        <Receives step={s} />
        <HowItWorks step={s} />
        <WhoDecidesBox />
        <Excerpts step={s} />
        <RestOfYear step={s} />
        <StepFoot step={s} />
        <Notices notices={stepNotices(s)} className={styles.stepNotices} />
      </article>
    </CaseStudyShell>
  );
}
