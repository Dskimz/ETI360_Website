import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import {
  CASE_STUDY_ON_HOLD,
  caseStudyLive,
  HERO_NOTE,
  INTRO,
  LIFECYCLE,
  NOTICES,
  OVERVIEW_DESCRIPTION,
  OVERVIEW_FACTS,
  STEP_UI,
  stepHref,
  STEPS,
  WORK,
} from "@/content/case-study";
import { GlanceCards, glanceNotices, HeroBar, Notices, WhoDecidesBox } from "./_parts/blocks";
import { HashRedirect } from "./_parts/HashRedirect";
import { CaseStudyShell } from "./_parts/Shell";
import styles from "./page.module.css";

/* Case Study, the overview (/case-study; Dan, 2026-09-28: "How we work I do
   not like. I prefer Case Study."; then "a step by step guide for each of
   the products"). One illustrative school year with Harborview
   International School across the four products, told in four steps, one
   per product, each on its own page (/case-study/{product}). Not a product
   page: it sits after the four products in the nav, and each step links to
   its product page.

   ON HOLD FOR PUBLISHING until the second fictional provider is renamed:
   src/lib/case-study-hold.ts.

   Top to bottom (2026-09-29, documents first): the hero bar (the
   reviewer's opening as the h1, the school, the four products, the paper,
   and the one-line illustrative note); then, inside the guide's
   frame (_parts/Shell.tsx): the year at a glance, one card per step with
   its document's cover, the link to step 1, and one line for the rest of
   the year; how the work divides (the school sends, ETI360 does the
   reading, the data entry, the research and the writing, in three lines
   like the steps' cells, the school receives and decides); the Who decides
   line and who does the work, side by side on wide screens; the samples
   and dates lines and the notices. The footer's
   contact row, with Dan's closing sentence, is the only call to action.
   Copy: src/content/case-study.ts. */

const TITLE = "Case Study";

/* Under the hold on production the page is a 404 and sets no metadata of
   its own, so the 404's payload carries the site default, not this page's
   title, description and canonical address (review fix, 2026-09-29; the
   steps do the same). */
export function generateMetadata(): Metadata {
  if (!caseStudyLive()) return {};
  return {
    title: TITLE,
    description: OVERVIEW_DESCRIPTION,
    alternates: { canonical: "/case-study" },
    // Kept out of search engines while the provider-name hold is on.
    robots: CASE_STUDY_ON_HOLD ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${TITLE} — ETI360`,
      description: OVERVIEW_DESCRIPTION,
      type: "website",
      images: ["/marketing/og-default.png"],
    },
  };
}

export default function CaseStudyPage() {
  if (!caseStudyLive()) notFound();
  const first = STEPS[0];
  return (
    <>
      <HashRedirect />
      <CaseStudyShell
        current={null}
        lead={
          <HeroBar title={INTRO.heading} facts={OVERVIEW_FACTS} note={HERO_NOTE} overview />
        }
      >
        <div className={styles.overview}>
          <div className={styles.glanceBlock}>
            <h2 className={`${styles.blockLabel} ui`} id="the-year">
              The year at a glance
            </h2>
            <GlanceCards />
            <p className={`${styles.glanceStart} ui`}>
              <Link href={stepHref(first)}>{`${STEP_UI.start}: ${first.name} →`}</Link>
            </p>
            <p className={styles.lifecycle} id="rest-of-year">
              {LIFECYCLE}
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={`${styles.blockLabel} ui`} id="the-work">
              How the work divides
            </h2>
            <div className={styles.parts}>
              <div className={styles.part}>
                <h3 className={`${styles.partLabel} ui`}>Harborview sends</h3>
                <p className={styles.partText}>{WORK.sends}</p>
              </div>
              <div className={`${styles.part} ${styles.partEti}`}>
                <h3 className={`${styles.partLabel} ui`}>ETI360 does</h3>
                <ul className={`${styles.list} ${styles.partList}`}>
                  {WORK.does.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.part}>
                <h3 className={`${styles.partLabel} ui`}>Harborview receives, and decides</h3>
                <p className={styles.partText}>{WORK.receives}</p>
              </div>
            </div>
          </div>

          <div className={styles.closing}>
            <WhoDecidesBox />
            <div className={styles.prose}>
              <WhoDoesTheWork />
            </div>
          </div>

          <div className={styles.disclosure}>
            <p>{`${INTRO.samples} ${INTRO.dates}`}</p>
            <Notices notices={[NOTICES.harborview, ...glanceNotices()]} />
          </div>
        </div>
      </CaseStudyShell>
    </>
  );
}
