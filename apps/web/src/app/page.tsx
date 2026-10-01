import type { Metadata } from "next";
import Link from "next/link";
import { ProductDoors } from "@/components/ProductDoors";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import { AREAS, EVIDENCE, PARTNERSHIP, START, YEAR } from "@/content/partnership";
import { liveProducts, siteDescription } from "@/content/products";
import {
  BRAND_EYEBROW,
  BRAND_LINE,
  WHAT_WE_DO_LINE,
} from "@/content/voice";
import styles from "./home.module.css";

/* Home, led by the partnership (Dan, 2026-10-01: the home page becomes the
   consulting page, and the products become evidence of what ETI360
   produces). Order: the two brand lines, the partnership, where ETI360
   helps, a travel year, the products as worked examples, who does the work,
   how a partnership starts. Copy in content/partnership.ts. */

// The h1 is BRAND_LINE split for its line break: "Risk intelligence" /
// "for school trips." Never retyped (voice.ts).
const BREAK_AT = BRAND_LINE.indexOf(" for ");
const BRAND_HEAD = BRAND_LINE.slice(0, BREAK_AT);
const BRAND_TAIL = BRAND_LINE.slice(BREAK_AT + 1);

const LIVE = liveProducts();

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

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function HomePage() {
  return (
    <>
      <section
        className="hero hero-compact"
        style={{ ["--hero-bg" as string]: "url('/trips/washington-dc/hero-capitol.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <h1>
            {BRAND_HEAD}
            <br />
            <em>{BRAND_TAIL}</em>
          </h1>
          <p className={`hero-line ${styles.heroLine}`}>{WHAT_WE_DO_LINE}</p>
        </div>
      </section>

      <section id="partnership" className={styles.partnerBand}>
        <div className="container">
          <h2 className="section-heading rule-gold">{PARTNERSHIP.heading}</h2>
          <p className={styles.lede}>{PARTNERSHIP.lede}</p>
          <div className={styles.situations}>
            {PARTNERSHIP.situations.map((s) => (
              <div key={s.title} className={styles.situation}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <p className={styles.close}>{PARTNERSHIP.close.join(" ")}</p>
        </div>
      </section>

      <section id="areas" className={styles.band}>
        <div className="container">
          <h2 className="section-heading rule-gold">{AREAS.heading}</h2>
          <p className={styles.lede}>{AREAS.lede}</p>
          <ol className={styles.areas}>
            {AREAS.items.map((a, i) => (
              <li key={a.title}>
                <span className={styles.num} aria-hidden="true">{pad(i + 1)}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="year" className={styles.partnerBand}>
        <div className="container">
          <h2 className="section-heading rule-gold">{YEAR.heading}</h2>
          <p className={styles.lede}>{YEAR.lede}</p>
          <ol className={styles.phases}>
            {YEAR.phases.map((p, i) => (
              <li key={p.title}>
                <span className={styles.phaseNum} aria-hidden="true">{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {LIVE.length > 0 ? (
        <section id="products" className={styles.doorsBand}>
          <div className="container">
            <h2 className="section-heading rule-gold">{EVIDENCE.heading}</h2>
            <p className={styles.lede}>{EVIDENCE.lede}</p>
            <ProductDoors products={LIVE} />
          </div>
        </section>
      ) : null}

      <section className={styles.band}>
        <div className={`container ${styles.narrow}`}>
          <WhoDoesTheWork />
          <h2 className="section-heading rule-gold" id="start">{START.heading}</h2>
          <p>{START.text}</p>
          <p>
            <Link className={styles.cta} href="/contact">{START.cta} &rarr;</Link>
          </p>
        </div>
      </section>
    </>
  );
}
