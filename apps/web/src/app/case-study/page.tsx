import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import {
  CASE_STUDY_ON_HOLD,
  caseStudyLive,
  INTRO,
  LIFECYCLE,
  NOTICES,
  OVERVIEW_DESCRIPTION,
  STEP_RECEIVES,
  STEP_UI,
  stepHref,
  STEPS,
  WORK,
} from "@/content/case-study";
import headerStyles from "@/components/productheader.module.css";
import { Notices, Rows, TierChips, WhoDecidesBox } from "./_parts/blocks";
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

   ON HOLD FOR PUBLISHING until both fictional providers are renamed:
   src/lib/case-study-hold.ts.

   Top to bottom: the header ("Case Study" as its label, the reviewer's
   opening as the h1 and lede, the illustrative label, and the button to
   step 1, so it shows on the first screen); then, inside the guide's frame
   (_parts/Shell.tsx): the samples line and Harborview's notice; how the
   work divides (the school sends, ETI360 does the reading, the data entry,
   the research and the writing, the school receives and decides); the year
   at a glance, one row per step, and one line for the rest of the year;
   the Who decides box and who does the work, side by side on wide screens.
   The footer's contact row, with Dan's closing sentence, is the only call
   to action. Copy: src/content/case-study.ts. */

const TITLE = "Case Study";

export const metadata: Metadata = {
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

const HERO = "/case-study/hero-marina-bay.jpg";

export default function CaseStudyPage() {
  if (!caseStudyLive()) notFound();
  const first = STEPS[0];
  const last = STEPS[STEPS.length - 1];
  return (
    <>
      <HashRedirect />
      <CaseStudyShell
        current={null}
        lead={
          <section
            className={`article-header ${styles.hero}`}
            style={{ ["--hero-bg" as string]: `url('${HERO}')` } as React.CSSProperties}
          >
            <div className="hero-inner">
              <p className="label label-light ui">{TITLE}</p>
              <h1 className={styles.heroTitle}>{INTRO.heading}</h1>
              <p className={`${headerStyles.tiers} ${styles.heroTag} ui`}>
                {`${STEP_UI.illustrative} · Harborview International School · Singapore`}
              </p>
              <p className={`${headerStyles.lede} ${styles.heroLede}`}>{INTRO.lede}</p>
              <p className={`${headerStyles.lede} ${styles.heroLede}`}>{INTRO.work}</p>
              <p className={styles.heroStart}>
                <Link className="cta-button ui" href={stepHref(first)}>
                  {`${STEP_UI.start}: ${first.name} →`}
                </Link>
              </p>
            </div>
          </section>
        }
      >
        <div className={styles.overview}>
          <div className={styles.disclosure}>
            <p>{`${INTRO.samples} ${INTRO.dates}`}</p>
            <Notices notices={[NOTICES.harborview]} />
          </div>

          <div className={styles.block}>
            <h2 className={`${styles.overviewHeading} rule-gold`} id="the-work">
              How the work divides
            </h2>
            <div className={styles.parts}>
              <div className={styles.part}>
                <h3 className={`${styles.partLabel} ui`}>Harborview sends</h3>
                <p className={styles.partText}>{WORK.sends}</p>
              </div>
              <div className={`${styles.part} ${styles.partEti}`}>
                <h3 className={`${styles.partLabel} ui`}>ETI360 does</h3>
                <p className={styles.partText}>{WORK.does}</p>
              </div>
              <div className={styles.part}>
                <h3 className={`${styles.partLabel} ui`}>Harborview receives, and decides</h3>
                <p className={styles.partText}>{WORK.receives}</p>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={`${styles.overviewHeading} rule-gold`} id="the-year">
              The year at a glance
            </h2>
            <Rows
              variant="glance"
              labels={["Step", "What Harborview receives"]}
              rows={STEPS.map((s) => ({
                key: s.id,
                cells: [
                  <span key="s" className={styles.meets}>
                    <Link href={stepHref(s)}>{`${s.number}. ${s.name}`}</Link>{" "}
                    <TierChips step={s} short />
                  </span>,
                  <span key="r">{STEP_RECEIVES[s.id]}</span>,
                ],
              }))}
            />
            <p className={styles.lifecycle}>
              {`${LIFECYCLE} `}
              <Link href={`${stepHref(last)}#rest-of-year`}>{`The rest of the year, in step ${last.number} →`}</Link>
            </p>
          </div>

          <div className={styles.closing}>
            <WhoDecidesBox />
            <div className={styles.prose}>
              <WhoDoesTheWork />
            </div>
          </div>
        </div>
      </CaseStudyShell>
    </>
  );
}
