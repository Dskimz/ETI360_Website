import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudyLive } from "@/content/case-study";
import { HOME } from "@/content/case-study-home";
import { STAGES } from "@/content/case-study-stages";
import { Desk } from "../_parts/Desk";
import styles from "../home.module.css";

/* MOCKUP (Dan, 2026-10-07): the Case Study home as the document desk. Not linked,
   not indexed; remove once Dan picks a direction. */

export const metadata: Metadata = { title: "Case Study mockup", robots: { index: false, follow: false } };

export default function MockPage() {
  if (!caseStudyLive()) notFound();
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <p className={`${styles.eyebrow} ui`}>Case Study</p>
          <h1 className={styles.h1}>{HOME.heading}</h1>
          <p className={styles.heroIntro}>{HOME.intro}</p>
        </div>
      </div>
      <div className="container">
        <Desk stages={STAGES} />
      </div>
    </div>
  );
}
