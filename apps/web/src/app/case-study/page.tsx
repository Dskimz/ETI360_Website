import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import {
  ABOUT,
  ALL_NOTICES,
  CASE_STUDY_ON_HOLD,
  caseStudyLive,
  CHAPTERS,
  glanceOf,
  INTRO,
  NOTICES,
  OPENING_PAGES,
  READING_THE_STEPS,
  STEP_UI,
  stepHref,
  WHO_DECIDES_LEAD,
  WHO_DECIDES_PROVIDERS,
  WORK,
  type Chapter,
} from "@/content/case-study";
import { getProduct, tierNames } from "@/content/products";
import { BRAND_EYEBROW, WHO_DECIDES } from "@/content/voice";
import headerStyles from "@/components/productheader.module.css";
import { Notices, Rows } from "./_parts/blocks";
import { HashRedirect } from "./_parts/HashRedirect";
import { CaseStudyShell } from "./_parts/Shell";
import styles from "./page.module.css";

/* Case Study, the overview (/case-study; Dan, 2026-09-28: "I was hoping
   for a website"; "How we work I do not like. I prefer Case Study."; then
   "That is too much scroll … a step by step guide for each of the
   products"). One illustrative school year with Harborview International
   School across the four products, told in six steps, each on its own page
   (/case-study/{step}). Not a product page: it sits after the four products
   in the nav, and each step links to its product page and version.

   ON HOLD FOR PUBLISHING until both fictional providers are renamed: see
   the comment at the top of src/content/case-study.ts, where each provider
   name lives once.

   Top to bottom: the header (the brand eyebrow, the h1, the illustrative
   label, the lede); then the guide's frame (the step bar and the step
   list, _parts/Shell.tsx) around: the disclosure and the three verbatim
   notices; how the work divides (the school sends, ETI360 does the
   reading, the data entry, the research and the writing, the school
   receives and decides); the year at a glance, one row per step, and the
   button to step 1; who decides; who does the work; every notice. The
   footer's contact row, with Dan's closing sentence, is the only call to
   action. Copy: src/content/case-study.ts. */

const TITLE = "Case Study";

// [draft], tone-reviewed 2026-09-28 with the page. Then every notice,
// verbatim (ADR-023: the disclosure on the page and in its metadata).
const DESCRIPTION = `An illustrative case study: one school’s year with ETI360 across the Travel Program Review, the Field Trip Package, the Conference Travel Package and the Trip Package. The school sends what it has by email; ETI360 does the reading, the data entry, the research and the writing; the school reviews the documents and makes every decision. ${ALL_NOTICES.join(" ")}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/case-study" },
  // Kept out of search engines while the provider-name hold is on.
  robots: CASE_STUDY_ON_HOLD ? { index: false, follow: false } : undefined,
  openGraph: {
    title: `${TITLE} — ETI360`,
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

const HERO = "/case-study/hero-marina-bay.jpg";

/** The tier label(s) or the chapter's own label. */
function chapterLabel(ch: Chapter): string {
  if (ch.product) return tierNames(getProduct(ch.product)).join(" · ");
  return ch.label ?? "";
}

export default function CaseStudyPage() {
  if (!caseStudyLive()) notFound();
  const first = CHAPTERS[0];
  return (
    <>
      <HashRedirect ids={CHAPTERS.map((c) => c.id)} />
      <CaseStudyShell
        current={null}
        lead={
          <section
            className={`article-header ${styles.hero}`}
            style={{ ["--hero-bg" as string]: `url('${HERO}')` } as React.CSSProperties}
          >
            <div className="hero-inner">
              <p className="label label-light ui">{BRAND_EYEBROW}</p>
              <h1>{TITLE}</h1>
              <p className={`${headerStyles.tiers} ui`}>
                Illustrative case study &middot; Harborview International School &middot; Singapore
              </p>
              <p className={headerStyles.lede}>{INTRO.lede}</p>
            </div>
          </section>
        }
      >
        <div className={styles.overview}>
          <div className={styles.disclosure}>
            <p>{INTRO.illustrative}</p>
            <Notices notices={[NOTICES.harborview, NOTICES.cycling, NOTICES.orienteering]} />
          </div>

          <div className={styles.block}>
            <h2 className={`${styles.overviewHeading} rule-gold`} id="the-work">
              How the work divides
            </h2>
            <p className={styles.workLead}>{INTRO.work}</p>
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
              ordered
              labels={["What Harborview needs", "What meets it", "What Harborview receives"]}
              rows={CHAPTERS.map((ch) => {
                const g = glanceOf(ch);
                return {
                  key: ch.id,
                  cells: [
                    <span key="n">{g.need}</span>,
                    <span key="m" className={styles.meets}>
                      <Link href={stepHref(ch)}>{g.meets}</Link>
                      <span className={`${styles.meetsLabel} ui`}>{g.label ?? chapterLabel(ch)}</span>
                    </span>,
                    <span key="r">{g.receives}</span>,
                  ],
                };
              })}
            />
            <p className={styles.reading}>
              {READING_THE_STEPS} {OPENING_PAGES}
            </p>
            <p className={styles.startLine}>
              <Link className={`${styles.start} ui`} href={stepHref(first)}>
                {STEP_UI.start}: {first.name} &rarr;
              </Link>
            </p>
          </div>

          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>
              {WHO_DECIDES_LEAD} {WHO_DECIDES} {WHO_DECIDES_PROVIDERS}
            </p>
          </div>

          <div className={`${styles.block} ${styles.prose}`}>
            <WhoDoesTheWork />
          </div>

          <div className={styles.about}>
            <p className={`${styles.aboutLabel} ui`}>About this case study</p>
            <p>{ABOUT}</p>
            <Notices notices={ALL_NOTICES} />
          </div>
        </div>
      </CaseStudyShell>
    </>
  );
}
