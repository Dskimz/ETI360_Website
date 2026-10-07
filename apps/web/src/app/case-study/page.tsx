import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDY_ON_HOLD, caseStudyLive } from "@/content/case-study";
import { HOME, POINTS, TIER_NAMES } from "@/content/case-study-home";
import { HashRedirect } from "./_parts/HashRedirect";
import { Timeline } from "./_parts/Timeline";
import styles from "./home.module.css";

/* Case Study home (/case-study; Dan, 2026-10-07: "the first page should be
   a timeline of the engagement"). The hero, one line of introduction, the
   timeline of the points in Harborview's process (each a card with two
   short sentences, the document's image and a link to its page) and the
   closing. Copy: src/content/case-study-home.ts. */

export function generateMetadata(): Metadata {
  if (!caseStudyLive()) return {};
  return {
    title: HOME.title,
    description: HOME.description,
    alternates: { canonical: "/case-study" },
    robots: CASE_STUDY_ON_HOLD ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${HOME.title} — ETI360`,
      description: HOME.description,
      type: "website",
      images: ["/marketing/og-default.png"],
    },
  };
}

export default function CaseStudyPage() {
  if (!caseStudyLive()) notFound();
  return (
    <>
      <HashRedirect />
      <div className={styles.page}>
        <div className={styles.hero}>
          <div className="container">
            <p className={`${styles.eyebrow} ui`}>Case Study</p>
            <h1 className={styles.h1}>{HOME.heading}</h1>
            <p className={styles.heroIntro}>{HOME.intro}</p>
          </div>
        </div>

        <div className="container">
          <div className={styles.timelineWrap} role="region" aria-label="The year, step by step">
            <Timeline points={POINTS.map((p) => ({ ...p, tierName: p.tier ? TIER_NAMES[p.tier] : null }))} />
          </div>

          <div className={`${styles.closing} ${styles.closingCentered}`}>
            <p>{HOME.closing}</p>
            <p className="ui">
              <Link className={styles.cta} href="/contact">
                Start a conversation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
