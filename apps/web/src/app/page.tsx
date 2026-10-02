import { incidentCaseLive } from "@/lib/incident-case-hold";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardCarousel } from "@/components/CardCarousel";
import { SOLUTION_CARDS, TIER_TAG, type TileDoc } from "@/content/areas";
import {
  ABOUT,
  CASE_STUDIES,
  SOLUTIONS_INTRO,
  START,
  WHAT_WE_DO,
  WHO_WE_WORK_WITH,
  YEAR,
} from "@/content/partnership";
import { siteDescription } from "@/content/products";
import { getVersion, openAuto, publicNotice } from "@/content/versions";
import { BRAND_EYEBROW, BRAND_LINE, WHAT_WE_DO_LINE } from "@/content/voice";
import styles from "./home.module.css";

/* Services: the home page (Dan, 2026-10-01, second pass: fewer words, links
   to learn more, the solutions and the travel year as sideways card rows,
   case studies and About ETI360 as cards). Copy in content/partnership.ts;
   the solutions in content/areas.ts. */

// The h1 is BRAND_LINE split for its line break: "Risk intelligence" /
// "for school trips." Never retyped (voice.ts).
const BREAK_AT = BRAND_LINE.indexOf(" for ");
const BRAND_HEAD = BRAND_LINE.slice(0, BREAK_AT);
const BRAND_TAIL = BRAND_LINE.slice(BREAK_AT + 1);

const DESCRIPTION = siteDescription();

export const metadata: Metadata = {
  title: `ETI360 — ${BRAND_EYEBROW}`,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: `ETI360 — ${BRAND_EYEBROW}`,
    description: DESCRIPTION,
    type: "website",
  },
};

const TIER_CLASS = { 1: styles.tier1, 2: styles.tier2, 3: styles.tier3 } as const;

/** A document on the site; a missing one fails the build. */
function resolve(t: TileDoc) {
  const version = getVersion(t.version);
  const doc = version?.documents.find((d) => d.slug === t.doc);
  if (!version || !doc) throw new Error(`Home: ${t.version}/${t.doc} is not on the site`);
  return { version, doc };
}

const SOLUTIONS = SOLUTION_CARDS.map((c) => ({ ...c, ...resolve(c.doc) }));
const PHASES = YEAR.phases.map((p) => ({ ...p, resolved: p.docs.map(resolve) }));

/** Each fictional provider's notice once, verbatim, for the covers shown. */
const NOTICES = Array.from(
  new Set(
    [...SOLUTIONS.map((s) => s.version), ...PHASES.flatMap((p) => p.resolved.map((r) => r.version))]
      .map((v) => publicNotice(v.disclosure))
      .filter((n): n is string => !!n),
  ),
);

export default function HomePage() {
  return (
    <>
      <section
        className={`hero hero-compact ${styles.hero}`}
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/queenstown-remarkables.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <h1>
            {BRAND_HEAD}
            <br />
            <em>{BRAND_TAIL}</em>
          </h1>
          <p className={styles.heroLine}>{WHAT_WE_DO_LINE}</p>
        </div>
      </section>

      <section id="what-we-do" className={styles.partnerBand}>
        <div className={`container ${styles.whatGrid}`}>
          <div>
            <h2 className="section-heading rule-gold">{WHAT_WE_DO.heading}</h2>
            <p className={styles.whatLine}>{WHAT_WE_DO.line}</p>
          </div>
          <ul className={`${styles.quickLinks} ui`}>
            {WHAT_WE_DO.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label} &rarr;</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="who-we-work-with" className={styles.band}>
        <div className="container">
          <h2 className="section-heading rule-gold">{WHO_WE_WORK_WITH.heading}</h2>
          <div className={styles.pair}>
            {WHO_WE_WORK_WITH.groups.map((g) => (
              <Link key={g.title} href={g.href} className={styles.groupCard}>
                <span className={styles.groupTitle}>{g.title}</span>
                <span>{g.text}</span>
                <span className={`${styles.go} ui`}>{g.cta} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className={styles.partnerBand}>
        <div className="container">
          <h2 className="section-heading rule-gold">{SOLUTIONS_INTRO.heading}</h2>
          <p className={styles.lede}>{SOLUTIONS_INTRO.lede}</p>
          <CardCarousel label="ETI360 solutions">
            {SOLUTIONS.map((s, i) => (
              <li key={s.key}>
                <article className={styles.slide}>
                  <a href={openAuto(s.version, s.doc)} className={styles.slideCover}>
                    <Image
                      src={s.doc.cover.src}
                      width={s.doc.cover.width}
                      height={s.doc.cover.height}
                      alt={`Cover of the ${s.doc.title}`}
                      sizes="300px"
                    />
                  </a>
                  <div className={styles.slideBody}>
                    <span className={`${styles.slideNum} ui`}>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{s.title}</h3>
                    <p>{s.line}</p>
                    <p className={`${styles.tierTag} ${TIER_CLASS[s.area.tier]} ui`}>{TIER_TAG[s.area.tier]}</p>
                    <Link href={s.href} className={`${styles.go} ui`}>
                      See the examples &rarr;
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </CardCarousel>
        </div>
      </section>

      <section id="year" className={styles.band}>
        <div className="container">
          <h2 className="section-heading rule-gold">{YEAR.heading}</h2>
          <p className={styles.lede}>{YEAR.lede}</p>
          <CardCarousel label="The travel year in six phases">
            {PHASES.map((p, i) => (
              <li key={p.title}>
                <article className={`${styles.slide} ${styles.phaseSlide}`}>
                  <div className={styles.phaseCovers}>
                    {p.resolved.map(({ version, doc }) => (
                      <a key={`${version.slug}/${doc.slug}`} href={openAuto(version, doc)} title={doc.title}>
                        <Image
                          src={doc.cover.src}
                          width={doc.cover.width}
                          height={doc.cover.height}
                          alt={`Cover of the ${doc.title}`}
                          sizes="150px"
                        />
                      </a>
                    ))}
                  </div>
                  <div className={styles.slideBody}>
                    <span className={`${styles.phaseNum} ui`}>{i + 1}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <ul className={`${styles.phaseDocs} ui`}>
                      {p.resolved.map(({ version, doc }) => (
                        <li key={`${version.slug}/${doc.slug}`}>
                          <a href={openAuto(version, doc)}>{doc.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </CardCarousel>
          {NOTICES.map((n) => (
            <p key={n} className={`${styles.notice} ui`}>
              {n}
            </p>
          ))}
        </div>
      </section>

      <section id="case-studies" className={styles.partnerBand}>
        <div className="container">
          <h2 className="section-heading rule-gold">{CASE_STUDIES.heading}</h2>
          <div className={styles.pair}>
            {CASE_STUDIES.cards.filter((c) => !c.incidentHold || incidentCaseLive()).map((c) => (
              <Link key={c.href} href={c.href} className={styles.case}>
                <span className={styles.casePhoto}>
                  <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(max-width: 900px) 100vw, 540px" />
                  {c.status ? <span className={`${styles.status} ui`}>{c.status}</span> : null}
                </span>
                <span className={styles.caseBody}>
                  <span className={`${styles.audience} ui`}>{c.audience}</span>
                  <span className={styles.caseTitle}>{c.school}</span>
                  <span className={`${styles.place} ui`}>{c.place}</span>
                  <span className={styles.caseText}>{c.text}</span>
                  <span className={`${styles.go} ui`}>{c.cta} &rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className={styles.band}>
        <div className="container">
          <h2 className="section-heading rule-gold">{ABOUT.heading}</h2>
          <div className={styles.aboutCards}>
            {ABOUT.people.map((p) => (
              <div key={p.name} className={styles.aboutCard}>
                <Image src={p.photo} width={112} height={112} alt={`Portrait of ${p.name}`} className={styles.headshot} />
                <h3>
                  {p.name}
                  <span className="ui">{p.title}</span>
                </h3>
                <p>{p.line}</p>
              </div>
            ))}
            <div className={`${styles.aboutCard} ${styles.howCard}`}>
              <h3>{ABOUT.how.title}</h3>
              <ul>
                {ABOUT.how.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.start}>
            {START.text}{" "}
            <Link className={styles.cta} href="/contact">
              {START.cta} &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
