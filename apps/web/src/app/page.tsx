import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AREAS, TIER_TAG, type TileDoc } from "@/content/areas";
import { AREAS_INTRO, CASE_STUDIES, PARTNERSHIP, PEOPLE, START, YEAR } from "@/content/partnership";
import { siteDescription } from "@/content/products";
import { getVersion, openAuto, publicNotice } from "@/content/versions";
import { BRAND_EYEBROW, BRAND_LINE, WHAT_WE_DO_LINE } from "@/content/voice";
import styles from "./home.module.css";

/* Services: the home page (Dan, 2026-10-01 redesign brief). About 400 words,
   images over prose: the Queenstown hero with the two brand lines, the
   partnership, the eight areas as document tiles, the travel year as a
   six-phase strip beside the Travel Year Guide, two case-study cards, who
   does the work, and one line to start a conversation. Copy in
   content/partnership.ts; areas and tile documents in content/areas.ts. */

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

/** A tile document resolved against the registry; a missing one fails the build. */
function resolve(t: TileDoc) {
  const version = getVersion(t.version);
  const doc = version?.documents.find((d) => d.slug === t.doc);
  if (!version || !doc) throw new Error(`Home tile: ${t.version}/${t.doc} is not on the site`);
  return { version, doc, caption: t.caption ?? doc.title };
}

const TILES = AREAS.map((a) => ({ area: a, docs: a.tile.map(resolve) }));

/** Each fictional provider's notice once, verbatim, for the covers shown. */
const NOTICES = Array.from(
  new Set(TILES.flatMap((t) => t.docs.map((d) => publicNotice(d.version.disclosure))).filter((n): n is string => !!n)),
);

const GUIDE = resolve(YEAR.guide);

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

      <section id="partnership" className={styles.partnerBand}>
        <div className="container">
          <h2 className="section-heading rule-gold">{PARTNERSHIP.heading}</h2>
          <p className={styles.lede}>{PARTNERSHIP.lede}</p>
          <ul className={styles.points}>
            {PARTNERSHIP.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="areas" className={styles.band}>
        <div className="container">
          <h2 className="section-heading rule-gold">{AREAS_INTRO.heading}</h2>
          <p className={styles.lede}>{AREAS_INTRO.lede}</p>
          <ol className={styles.tiles}>
            {TILES.map(({ area, docs }, i) => (
              <li key={area.id} className={styles.tile}>
                <div className={styles.tileHead}>
                  <span className={styles.tileNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{area.title}</h3>
                </div>
                <p className={styles.tileLine}>{area.line}</p>
                <div className={`${styles.covers} ${docs.length > 1 ? styles.coversMany : ""}`}>
                  {docs.map(({ version, doc, caption }) => (
                    <a key={`${version.slug}/${doc.slug}`} href={openAuto(version, doc)} className={styles.cover}>
                      <Image
                        src={doc.cover.src}
                        width={doc.cover.width}
                        height={doc.cover.height}
                        alt={`Cover of the ${doc.title}`}
                        sizes="(max-width: 640px) 40vw, 140px"
                      />
                      <span className="ui">{caption}</span>
                    </a>
                  ))}
                </div>
                <p className={`${styles.tierTag} ${TIER_CLASS[area.tier]} ui`}>{TIER_TAG[area.tier]}</p>
              </li>
            ))}
          </ol>
          {NOTICES.map((n) => (
            <p key={n} className={`${styles.notice} ui`}>
              {n}
            </p>
          ))}
          <p className={`${styles.more} ui`}>
            <Link href="/examples" className="cta-link">
              See every example &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section id="year" className={styles.partnerBand}>
        <div className={`container ${styles.yearGrid}`}>
          <div>
            <h2 className="section-heading rule-gold">{YEAR.heading}</h2>
            <p className={styles.lede}>{YEAR.lede}</p>
            <ol className={styles.phases}>
              {YEAR.phases.map((p, i) => (
                <li key={p.title}>
                  <span className={styles.phaseNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <a href={openAuto(GUIDE.version, GUIDE.doc)} className={styles.guide}>
            <Image
              src={GUIDE.doc.cover.src}
              width={GUIDE.doc.cover.width}
              height={GUIDE.doc.cover.height}
              alt={`Cover of the ${GUIDE.doc.title}`}
              sizes="(max-width: 900px) 50vw, 260px"
            />
            <span className="ui">{GUIDE.caption}, Harborview &rarr;</span>
          </a>
        </div>
      </section>

      <section id="case-studies" className={styles.band}>
        <div className="container">
          <h2 className="section-heading rule-gold">{CASE_STUDIES.heading}</h2>
          <div className={styles.cases}>
            {CASE_STUDIES.cards.map((c) => (
              <Link key={c.school} href={c.href} className={styles.case}>
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

      <section id="who" className={styles.partnerBand}>
        <div className="container">
          <h2 className="section-heading rule-gold">{PEOPLE.heading}</h2>
          <div className={styles.people}>
            {PEOPLE.people.map((p) => (
              <div key={p.name} className={styles.person}>
                <Image src={p.photo} width={120} height={120} alt={`Portrait of ${p.name}`} className={styles.headshot} />
                <div>
                  <h3>
                    {p.name}
                    <span className="ui">{p.title}</span>
                  </h3>
                  <p>{p.line}</p>
                </div>
              </div>
            ))}
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
