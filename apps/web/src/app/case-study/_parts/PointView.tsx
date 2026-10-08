import Link from "next/link";
import type { PointPage } from "@/content/case-study-points";
import { StepDocs } from "./blocks";
import { HeroStack } from "./PointStage";
import { ChapterStrip } from "./ChapterStrip";
import styles from "../home.module.css";
import stepStyles from "../page.module.css";

/* One Case Study point page (Dan, 2026-10-07: "build as needed"): the
   hero, what Harborview needed, what we did, the documents (the step
   pages' cards), what Harborview decides, the lead time, the pager and the
   closing. Each point's route renders this with its copy from
   src/content/case-study-points.ts. */

export function PointView({ p: P }: { p: PointPage }) {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={`container ${styles.heroRow}`}>
          <div>
            <p className={`${styles.eyebrow} ui`}>
              <Link className={styles.crumb} href="/case-study">
                Case Study
              </Link>{" "}
              · Harborview International School
            </p>
            <h1 className={styles.h1}>{P.label}</h1>
            {P.tier ? (
              <p className={`${styles.heroTier} ui`}>{P.tier}</p>
            ) : null}
          </div>
          <HeroStack p={P} />
        </div>
      </div>
      <div className="container">
        <ChapterStrip id={P.id} />
      </div>

      <div className="container">
        <div className={styles.body}>
          <div
            className={styles.section}
            role="region"
            aria-labelledby="problem"
          >
            <h2 className={styles.h2} id="problem">
              What Harborview needed
            </h2>
            {P.problem.map((t) => (
              <p key={t} className={styles.text}>
                {t}
              </p>
            ))}
          </div>

          <div className={styles.section} role="region" aria-labelledby="did">
            <h2 className={styles.h2} id="did">
              What we did
            </h2>
            {P.did.map((t) => (
              <p key={t} className={styles.text}>
                {t}
              </p>
            ))}
            {P.links?.length ? (
              <ul className={`${styles.textList} ui`}>
                {P.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {P.docs ? (
            <div
              id="documents"
              className={`${styles.section} ${stepStyles.step}`}
            >
              <StepDocs step={P.docs} />
              {P.docsNote ? (
                <p className={`${styles.text} ${styles.small}`}>{P.docsNote}</p>
              ) : null}
            </div>
          ) : null}

          <div
            className={styles.section}
            role="region"
            aria-labelledby="decides"
          >
            <h2 className={styles.h2} id="decides">
              What Harborview decides
            </h2>
            <ul className={styles.textList}>
              {P.decides.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className={styles.text}>{P.boundary}</p>
          </div>

          <div
            className={`${styles.leadBox} ${P.tierNum === 2 ? styles.leadT2 : P.tierNum === 3 ? styles.leadT3 : ""}`}
          >
            <span className={`${styles.k} ui`}>Lead time</span>
            <p>{P.lead}</p>
          </div>

          <nav className={`${styles.pager} ui`} aria-label="Case study">
            <Link href="/case-study">← All the points in the case study</Link>
            {P.next.href ? (
              <Link href={P.next.href}>{`Next: ${P.next.label} →`}</Link>
            ) : (
              <span
                className={styles.soon}
              >{`Next: ${P.next.label}, page in preparation`}</span>
            )}
          </nav>

          <div className={styles.closing}>
            <p>
              If this way of working may be useful for your school, we would be
              glad to hear about your program.
            </p>
            <p className="ui">
              <Link className={styles.cta} href="/contact">
                Contact
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
