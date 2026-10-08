import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDY_ON_HOLD, caseStudyLive } from "@/content/case-study";
import { HOME } from "@/content/case-study-home";
import { HashRedirect } from "./_parts/HashRedirect";
import { Chapters } from "./_parts/Chapters";
import { TierHead } from "./_parts/TierHead";
import { HARBORVIEW_CHAPTERS, HARBORVIEW_MAP } from "@/content/case-study-map";
import styles from "./home.module.css";

/* Case Study home (/case-study). The hero, the tier head (Dan, 2026-10-08:
   the Program Map's four columns filled with the covers of the documents
   ETI360 prepared for Harborview), the three chapters under it (D3, which
   replaced the five-stage desk) and the closing. Copy:
   src/content/case-study-home.ts and case-study-map.ts. */

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

        <div className={styles.tierHead}>
          <TierHead
            map={HARBORVIEW_MAP}
            ariaLabel="The documents ETI360 prepared for Harborview, by tier"
          />
          <Chapters chapters={HARBORVIEW_CHAPTERS} />
        </div>

        <div className="container">
          <div className={`${styles.closing} ${styles.closingCentered}`}>
            <p>{HOME.closing}</p>
            <p className="ui">
              <Link className={styles.cta} href="/contact">
                Contact
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
