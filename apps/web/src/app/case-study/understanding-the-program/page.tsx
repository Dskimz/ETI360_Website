import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDY_ON_HOLD, caseStudyLive } from "@/content/case-study";
import { UNDERSTANDING as P } from "@/content/case-study-points";
import { StepDocs } from "../_parts/blocks";
import styles from "../home.module.css";
import stepStyles from "../page.module.css";

/* Case Study point 1, Understanding the program (Dan, 2026-10-07: "build as
   needed"). The problem, what we did, the documents (the step pages' cards:
   the Travel Program Review and the Line & Landmark evaluation), what
   Harborview decides and the lead time. Copy:
   src/content/case-study-points.ts. A static route, so it wins over
   /case-study/[step]. */

const PATH = `/case-study/${P.id}`;

export function generateMetadata(): Metadata {
  if (!caseStudyLive()) return {};
  const title = `${P.label} — Case Study`;
  return {
    title,
    description: P.description,
    alternates: { canonical: PATH },
    robots: CASE_STUDY_ON_HOLD ? { index: false, follow: false } : undefined,
    openGraph: { title: `${title} — ETI360`, description: P.description, type: "website", images: ["/marketing/og-default.png"] },
  };
}

export default function UnderstandingTheProgramPage() {
  if (!caseStudyLive()) notFound();
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <p className={`${styles.eyebrow} ui`}>
            <Link className={styles.crumb} href="/case-study">
              Case Study
            </Link>{" "}
            · Harborview International School
          </p>
          <h1 className={styles.h1}>{P.label}</h1>
          <p className={`${styles.heroTier} ui`}>{P.tier}</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.body}>
          <div className={styles.section} role="region" aria-labelledby="problem">
            <h2 className={styles.h2} id="problem">What Harborview needed</h2>
            {P.problem.map((t) => (
              <p key={t} className={styles.text}>{t}</p>
            ))}
          </div>

          <div className={styles.section} role="region" aria-labelledby="did">
            <h2 className={styles.h2} id="did">What we did</h2>
            {P.did.map((t) => (
              <p key={t} className={styles.text}>{t}</p>
            ))}
          </div>

          <div className={`${styles.section} ${stepStyles.step}`}>
            <StepDocs step={P.docs} />
            <p className={`${styles.text} ${styles.small}`}>{P.docsNote}</p>
          </div>

          <div className={styles.section} role="region" aria-labelledby="decides">
            <h2 className={styles.h2} id="decides">What Harborview decides</h2>
            <ul className={styles.textList}>
              {P.decides.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className={styles.text}>{P.boundary}</p>
          </div>

          <div className={styles.leadBox}>
            <span className={`${styles.k} ui`}>Lead time</span>
            <p>{P.lead}</p>
          </div>

          <nav className={`${styles.pager} ui`} aria-label="Case study">
            <Link href="/case-study">← All the points in the case study</Link>
            {P.next.href ? (
              <Link href={P.next.href}>{`Next: ${P.next.label} →`}</Link>
            ) : (
              <span className={styles.soon}>{`Next: ${P.next.label}, page in preparation`}</span>
            )}
          </nav>

          <div className={styles.closing}>
            <p>If this way of working may be useful for your school, we would be glad to hear about your program.</p>
            <p className="ui">
              <Link className={styles.cta} href="/contact">
                Start a conversation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
