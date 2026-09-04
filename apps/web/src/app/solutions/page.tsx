import type { Metadata } from "next";
import { reportList } from "@/content/solutions";
import styles from "@/components/evidence.module.css";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Every ETI360 solution in its tier: the annual Organizational Baseline, the Tier 2 trip documents, and the Tier 3 working views for the days away.",
  alternates: { canonical: "/solutions" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const tier2 = reportList.filter((r) => r.tier === 2);
const tier3 = reportList.filter((r) => r.tier === 3);

export default function SolutionsPage() {
  return (
    <article className={styles.page}>
      <div className={styles.solutionsHead}>
        <div className={styles.wrap}>
          <p className={styles.crumb}>Solutions</p>
          <h1>Every solution, in its tier.</h1>
          <p className={styles.heroLine}>
            Each answers one question a school brings us. Open any of them for the problem,
            a worked example, and the boundaries of what it does.
          </p>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={styles.wrap}>
          <div className={styles.tierCards}>
            <div className={`${styles.tierCard} ${styles.tier1}`}>
              <p className={styles.tierEyebrow}>Tier One &middot; Annual</p>
              <p className={styles.tierName}>Organizational Baseline</p>
              <div className={styles.tierLinks}>
                <a href="/framework#tier1">
                  Organizational Baseline Evaluation
                  <span className={styles.linkQuestion}>
                    Where does a trip operation stand &mdash; yours, or a provider&rsquo;s?
                  </span>
                </a>
              </div>
            </div>
            <div className={`${styles.tierCard} ${styles.tier2}`}>
              <p className={styles.tierEyebrow}>Tier Two &middot; Every trip</p>
              <p className={styles.tierName}>Trip Risk Review</p>
              <div className={styles.tierLinks}>
                {tier2.map((r) => (
                  <a key={r.href} href={r.href}>
                    {r.name}
                    <span className={styles.linkQuestion}>{r.question}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className={`${styles.tierCard} ${styles.tier3}`}>
              <p className={styles.tierEyebrow}>Tier Three &middot; During and after</p>
              <p className={styles.tierName}>Dynamic Risk Operations</p>
              <div className={styles.tierLinks}>
                {tier3.map((r) => (
                  <a key={r.href} href={r.href}>
                    {r.name}
                    <span className={styles.linkQuestion}>{r.question}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.frameworkFoot}>
            <a href="/framework">See the full framework &rarr;</a>
          </div>
        </div>
      </div>
    </article>
  );
}
