import type { CSSProperties } from "react";
import Image from "next/image";
import { reportList } from "@/content/solutions";
import styles from "./report.module.css";

type Artifact = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

type Answer = {
  number: string;
  title: string;
  body: string;
};

export type SolutionReportData = {
  slug: string;
  eyebrow: string;
  question: string;
  lead: string;
  answerTitle: string;
  answerBody: string;
  heroImage: string;
  planningLabel: string;
  problemTitle: string;
  problemCopy: string[];
  proofEyebrow: string;
  proofTitle: string;
  proofCopy: string;
  stats: Array<[string, string, string]>;
  primaryArtifact: Artifact;
  answersLabel: string;
  answersTitle: string;
  answersCopy: string;
  answers: Answer[];
  detailEyebrow: string;
  detailTitle: string;
  detailCopy: string;
  detailItems: Array<[string, string]>;
  secondaryArtifact?: Artifact;
  detailPanel?: {
    label: string;
    title: string;
    body: string;
  };
  scopeTitle: string;
  scopeCopy: string;
  boundaryTitle: string;
  boundaryCopy: string;
  widerTitle: string;
  widerCopy: string;
  ctaTitle: string;
  ctaCopy: string;
};

export function SolutionReport({ data }: { data: SolutionReportData }) {
  const heroStyle = {
    "--report-hero": `url("${data.heroImage}")`,
  } as CSSProperties;

  return (
    <article className={styles.page}>
      <header className={styles.hero} style={heroStyle}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Report navigation">
            <a href="/for-schools">For Schools</a>
            <span>·</span>
            <span>{data.eyebrow}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{data.eyebrow}</p>
              <h1>{data.question}</h1>
              <p className={styles.heroLead}>{data.lead}</p>
            </div>
            <aside className={styles.answerCard}>
              <span>The ETI360 answer</span>
              <strong>{data.answerTitle}</strong>
              <p>{data.answerBody}</p>
            </aside>
          </div>
        </div>
      </header>

      <section className={styles.intro}>
        <div className={styles.sectionLabel}>The problem and the solution</div>
        <div className={styles.problemGrid}>
          <div>
            <p className={styles.eyebrowDark}>{data.planningLabel}</p>
            <h2>{data.problemTitle}</h2>
          </div>
          <div className={styles.problemCopy}>
            {data.problemCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.proofInner}>
          <div className={styles.proofHeading}>
            <div>
              <p className={styles.eyebrow}>{data.proofEyebrow}</p>
              <h2>{data.proofTitle}</h2>
            </div>
            <p>{data.proofCopy}</p>
          </div>

          <div className={styles.stats}>
            {data.stats.map(([value, label, note]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
                <small>{note}</small>
              </div>
            ))}
          </div>

          <figure className={styles.artifact}>
            <Image
              src={data.primaryArtifact.src}
              width={data.primaryArtifact.width}
              height={data.primaryArtifact.height}
              alt={data.primaryArtifact.alt}
              sizes="(max-width: 760px) 100vw, 960px"
              quality={90}
              priority
            />
            <figcaption>{data.primaryArtifact.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.answersSection}>
        <div className={styles.sectionLabel}>{data.answersLabel}</div>
        <div className={styles.sectionIntro}>
          <h2>{data.answersTitle}</h2>
          <p>{data.answersCopy}</p>
        </div>
        <div className={styles.answersGrid}>
          {data.answers.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.detailGrid}>
          <div className={styles.detailCopy}>
            <p className={styles.eyebrowDark}>{data.detailEyebrow}</p>
            <h2>{data.detailTitle}</h2>
            <p>{data.detailCopy}</p>
            <dl>
              {data.detailItems.map(([term, description]) => (
                <div key={term}><dt>{term}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          </div>
          {data.secondaryArtifact ? (
            <figure className={styles.secondArtifact}>
              <Image
                src={data.secondaryArtifact.src}
                width={data.secondaryArtifact.width}
                height={data.secondaryArtifact.height}
                alt={data.secondaryArtifact.alt}
                sizes="(max-width: 760px) 100vw, 720px"
                quality={90}
              />
              <figcaption>{data.secondaryArtifact.caption}</figcaption>
            </figure>
          ) : data.detailPanel ? (
            <aside className={styles.detailPanel}>
              <span>{data.detailPanel.label}</span>
              <strong>{data.detailPanel.title}</strong>
              <p>{data.detailPanel.body}</p>
            </aside>
          ) : null}
        </div>
      </section>

      <section className={styles.scopeSection}>
        <div className={styles.scopeGrid}>
          <div>
            <p className={styles.eyebrow}>Where this applies</p>
            <h2>{data.scopeTitle}</h2>
            <p>{data.scopeCopy}</p>
          </div>
          <aside>
            <span>{data.boundaryTitle}</span>
            <p>{data.boundaryCopy}</p>
          </aside>
        </div>
      </section>

      <section className={styles.otherQuestions}>
        <div className={styles.sectionLabel}>One question in a wider system</div>
        <div className={styles.otherGrid}>
          <div>
            <h2>{data.widerTitle}</h2>
            <p>{data.widerCopy}</p>
          </div>
          <div className={styles.questionList}>
            {reportList.map((report) => (
              <a
                key={report.href}
                aria-current={report.href.endsWith(data.slug) ? "page" : undefined}
                href={report.href}
              >
                {report.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.eyebrowDark}>A practical starting point</p>
            <h2>{data.ctaTitle}</h2>
            <p>{data.ctaCopy}</p>
          </div>
          <a href="/contact">Contact us →</a>
        </div>
      </section>
    </article>
  );
}
