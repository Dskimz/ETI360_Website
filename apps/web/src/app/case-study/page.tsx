import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDY_ON_HOLD, caseStudyLive } from "@/content/case-study";
import { CYCLE, HOME, POINTS, TIER_NAMES, type Point } from "@/content/case-study-home";
import { HashRedirect } from "./_parts/HashRedirect";
import styles from "./home.module.css";

/* Case Study home (/case-study; Dan, 2026-10-07). The case study is a
   series: this page walks through the points in Harborview's process where
   a need comes up, each with the problem, what we prepared, a recommended
   lead time and a link to its page (or "Page in preparation"). It replaces
   the four-step overview; the four step pages (/case-study/{product}) stay
   as the solution pages until each point gets its own. Copy:
   src/content/case-study-home.ts. */

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

function tierClass(p: Point): string {
  if (p.tier === 1) return styles.t1;
  if (p.tier === 2) return styles.t2;
  if (p.tier === 3) return styles.t3;
  return styles.t0;
}

function PointCard({ p, n }: { p: Point; n: number }) {
  return (
    <li className={`${styles.point} ${tierClass(p)}`} id={p.id}>
      <div className={styles.pointHead}>
        <span className={`${styles.num} ui`}>{String(n).padStart(2, "0")}</span>
        <h3 className={styles.pointLabel}>{p.label}</h3>
        {p.tier ? <span className={`${styles.tier} ui`}>{TIER_NAMES[p.tier]}</span> : null}
      </div>
      <p className={styles.problem}>{p.problem}</p>
      {p.prepared.length > 0 ? (
        <div className={`${styles.prepared} ui`}>
          <span className={styles.k}>What we prepare</span>
          <span>{p.prepared.join(" · ")}</span>
        </div>
      ) : null}
      <div className={`${styles.lead} ui`}>
        <span className={styles.k}>Lead time</span>
        <p>{p.lead}</p>
      </div>
      <div className={`${styles.go} ui`}>
        {p.href ? (
          <Link href={p.href}>{`See how we did it →`}</Link>
        ) : (
          <span className={styles.soon}>Page in preparation</span>
        )}
        {p.status ? <span className={styles.status}>{p.status}</span> : null}
      </div>
    </li>
  );
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
            <dl className={`${styles.facts} ui`}>
              {HOME.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="container">
          <div className={styles.body}>
            <p className={styles.intro}>{HOME.intro}</p>

            <div className={styles.block} role="region" aria-labelledby="the-360">
              <h2 className={styles.h2} id="the-360">How a partnership works</h2>
              <ol className={styles.cycle}>
                {CYCLE.map((c) => (
                  <li key={c.label}>
                    <h3 className={`${styles.cycleLabel} ui`}>{c.label}</h3>
                    <p>{c.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.block} role="region" aria-labelledby="the-points">
              <h2 className={styles.h2} id="the-points">Where Harborview needed help</h2>
              <p className={styles.note}>{HOME.leadNote}</p>
              <ol className={styles.points}>
                {POINTS.map((p, i) => (
                  <PointCard key={p.id} p={p} n={i + 1} />
                ))}
              </ol>
            </div>

            <div className={styles.closing}>
              <p>{HOME.closing}</p>
              <p className="ui">
                <Link className={styles.cta} href="/contact">
                  Start a conversation
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
