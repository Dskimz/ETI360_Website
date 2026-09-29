import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CASE_STUDY_ON_HOLD,
  caseStudyLive,
  getStep,
  HERO_NOTE,
  stepHref,
  stepNotices,
  STEPS,
} from "@/content/case-study";
import { HeroBar, HeroChips, HowItWorks, Need, Notices, StepDocs, StepFoot, WhoDecidesBox } from "../_parts/blocks";
import { CaseStudyShell } from "../_parts/Shell";
import styles from "../page.module.css";

/* One step of the Case Study (/case-study/{product}): one product in
   Harborview's illustrative year. Documents first (Dan, 2026-09-29: "I want
   people to see the solution. Less words and more about the solution."):
   the hero bar (the product, its tiers, its key facts, the one-line
   illustrative note); what Harborview needs, in one sentence; what
   Harborview receives, the documents as the trip page's cards; how it
   works, one compact row; the one Who decides line; the pages on this
   site; the notices. The pinned bar's Next is the way on; the footer's
   contact row closes the page.

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
    <CaseStudyShell
      current={s}
      lead={
        <HeroBar
          title={s.name}
          titleId="step-title"
          sub={s.title}
          chips={<HeroChips step={s} />}
          facts={s.facts}
          note={HERO_NOTE}
        />
      }
    >
      <div className={styles.step}>
        <Need step={s} />
        <StepDocs step={s} />
        <HowItWorks step={s} />
        <WhoDecidesBox />
        <StepFoot step={s} />
        <Notices notices={stepNotices(s)} className={styles.stepNotices} phoneLead={HERO_NOTE} />
      </div>
    </CaseStudyShell>
  );
}
