import Image from "next/image";
import { relatedTier2, reportList, tier3Solutions } from "@/content/solutions";
import styles from "./evidence.module.css";

export type EvidencePlate = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  note: string;
};

export type SolutionEvidenceData = {
  slug: string;
  question: string;
  heroLine: string;
  editorial: [string, string];
  spreadTitle: string;
  plates: EvidencePlate[];
  disclosure: string;
  pdfHref?: string;
  claims: Array<{ lead: string; body: string }>;
  boundary: string;
  promo?: { title: string; body: string };
  stripLine: string;
  ctaTitle: string;
  ctaCopy: string;
};

const TIER_NAMES: Record<number, string> = {
  1: "Tier 1 Organizational Baseline",
  2: "Tier 2 Trip Risk Review",
  3: "Tier 3 Dynamic Risk Operations",
};

export function SolutionEvidence({ data }: { data: SolutionEvidenceData }) {
  const currentSolution = reportList.find((r) => r.slug === data.slug);
  const related = relatedTier2[data.slug] ?? [];
  const crumb = `For Schools · ${TIER_NAMES[currentSolution?.tier ?? 2]}`;

  return (
    <article className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.wrap}>
          <p className={styles.crumb}>{crumb}</p>
          <h1>{data.question}</h1>
          <p className={styles.heroLine}>{data.heroLine}</p>
        </div>
      </div>

      <div className={styles.editorial}>
        <div className={styles.wrap}>
          <div className={styles.measure}>
            <p>{data.editorial[0]}</p>
            <p>{data.editorial[1]}</p>
          </div>
        </div>
      </div>

      <div className={styles.spread}>
        <div className={styles.wrap}>
          <p className={styles.spreadTitle}>{data.spreadTitle}</p>
          <div className={styles.evGrid}>
            <figure className={styles.plate}>
              <div className={data.plates.length > 1 ? styles.pagesTwo : styles.pagesOne}>
                {data.plates.map((p) => (
                  <div key={p.src} className={styles.thumb}>
                    <a href={data.pdfHref ?? p.src} target="_blank" rel="noreferrer">
                      <Image src={p.src} width={p.width} height={p.height} alt={p.alt} sizes="(max-width: 900px) 100vw, 380px" quality={90} />
                    </a>
                    <div className={styles.thumbLabel}>
                      <b>{p.label}</b>
                      <span>{p.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <figcaption className={styles.caption}>
                {data.disclosure}
                {data.pdfHref ? (
                  <>
                    {" "}
                    <a href={data.pdfHref} target="_blank" rel="noreferrer">
                      Open the document (PDF) →
                    </a>
                  </>
                ) : null}
              </figcaption>
            </figure>
            <div>
              {data.claims.map((c) => (
                <div key={c.lead} className={styles.claim}>
                  <b>{c.lead}</b>
                  <p>{c.body}</p>
                </div>
              ))}
              <p className={styles.boundary}>{data.boundary}</p>
              {data.promo ? (
                <div className={styles.promo}>
                  <b>{data.promo.title}</b>
                  <p>{data.promo.body}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={styles.wrap}>
          <p className={styles.stripIntro}>{data.stripLine}</p>
          <div className={styles.tierCards}>
            <div className={`${styles.tierCard} ${styles.tier1}`}>
              <p className={styles.tierEyebrow}>Tier One &middot; Annual</p>
              <p className={styles.tierName}>Organizational Baseline</p>
              <div className={styles.tierLinks}>
                <a href="/framework#tier1">Organizational Baseline Evaluation</a>
              </div>
            </div>
            <div className={`${styles.tierCard} ${styles.tier2}`}>
              <p className={styles.tierEyebrow}>Tier Two &middot; Every trip</p>
              <p className={styles.tierName}>Trip Risk Review</p>
              <div className={styles.tierLinks}>
                {currentSolution?.tier === 2 ? (
                  <span className={styles.herePage} aria-current="page">
                    {currentSolution.name}
                    <span className={styles.hereTag}>This page</span>
                  </span>
                ) : null}
                {related.map((r) => (
                  <a key={r.href} href={r.href}>{r.name}</a>
                ))}
              </div>
              <a className={styles.allLink} href="/for-schools">
                All Tier 2 solutions &rarr;
              </a>
            </div>
            <div className={`${styles.tierCard} ${styles.tier3}`}>
              <p className={styles.tierEyebrow}>Tier Three &middot; During and after</p>
              <p className={styles.tierName}>Dynamic Risk Operations</p>
              <div className={styles.tierLinks}>
                {tier3Solutions.map((r) =>
                  r.slug === data.slug ? (
                    <span key={r.href} className={styles.herePage} aria-current="page">
                      {r.name}
                      <span className={styles.hereTag}>This page</span>
                    </span>
                  ) : (
                    <a key={r.href} href={r.href}>{r.name}</a>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className={styles.frameworkFoot}>
            <a href="/framework">See the full framework &rarr;</a>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <div className={styles.wrap}>
          <div className={styles.ctaInner}>
            <div>
              <h2>{data.ctaTitle}</h2>
              <p>{data.ctaCopy}</p>
            </div>
            <a href="/contact">Contact ETI360 &rarr;</a>
          </div>
        </div>
      </div>
    </article>
  );
}
