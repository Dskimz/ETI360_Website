import type { Metadata } from "next";
import Link from "next/link";
import { CtaCard } from "@/components/CtaCard";
import { TripStrip } from "@/components/TripStrip";
import { TwoServices } from "@/components/TwoServices";
import { DECISIONS, PAPER_NOTE, TIER_NAMES } from "@/content/services";
import {
  BRAND_EYEBROW,
  BRAND_LINE,
  CLOSING_SENTENCE,
  POSITIONING_STATEMENT,
  WHAT_WE_DO_LINE,
} from "@/content/voice";
import styles from "./home.module.css";

/* Home (Website v1, 2026-09-25). The order: What we do, then the two
   services as the main doors (Dan, 2026-09-25: the Travel Program Review,
   and trip by trip; one approach for every school), the worked trips,
   decision by decision, the three tiers and what each includes, then Dan's
   closing sentence, the only call to action. */

// The h1 is BRAND_LINE split for its line break: "Risk intelligence" /
// "for school trips." Never retyped (voice.ts).
const BREAK_AT = BRAND_LINE.indexOf(" for ");
const BRAND_HEAD = BRAND_LINE.slice(0, BREAK_AT);
const BRAND_TAIL = BRAND_LINE.slice(BREAK_AT + 1);

const DESCRIPTION = `${BRAND_LINE} Worked trips from ETI360, each document tied to the decision it supports and open in full, in US Letter and A4.`;

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

const TIERS: { n: 1 | 2 | 3; name: string; body: string; docs: string[] }[] = [
  {
    n: 1,
    name: TIER_NAMES[1],
    body: "The school's travel program as a whole: its policies and procedures, path by path, reviewed once every four years.",
    docs: ["Travel Program Review"],
  },
  {
    n: 2,
    name: TIER_NAMES[2],
    body: "The documents for one trip, from the approval to the day the group leaves.",
    docs: ["School Trip Record", "Trip Risk Working File", "Family Trip Brief"],
  },
  {
    n: 3,
    name: TIER_NAMES[3],
    body: "What the trip leader and chaperones carry while the group is away, and the report that closes the trip. The Duty Manager Dashboard is the school's own view while groups travel.",
    docs: ["Trip Leader Card", "Chaperone Briefing", "Post-Trip Feedback Report"],
  },
];

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
        </div>
      </section>

      <section id="what-we-do" className="about-strip">
        <div className="container measure">
          <p className="label ui">What we do</p>
          <h2 className="section-heading section-heading-lg rule-gold">{WHAT_WE_DO_LINE}</h2>
          <p className="section-lead">{POSITIONING_STATEMENT}</p>
        </div>
      </section>

      <section id="services" className={styles.band}>
        <div className="container">
          <p className="label ui">Two services</p>
          <h2 className="section-heading rule-gold">The whole program, or one trip at a time.</h2>
          <TwoServices />
        </div>
      </section>

      <section id="trips" className="about-strip">
        <div className="container">
          <p className="label ui">Worked trips</p>
          <h2 className="section-heading rule-gold">Every document open in full.</h2>
          <p className={styles.lead}>
            Each worked trip shows the documents prepared for it, as the school receives them. {PAPER_NOTE}
          </p>
          <TripStrip />
        </div>
      </section>

      <section id="decisions" className={styles.band}>
        <div className="container">
          <p className="label ui">Decision by decision</p>
          <h2 className="section-heading rule-gold">Each document is tied to the decision it supports.</h2>
          <p className={styles.lead}>
            A trip is a run of decisions the school makes, and each person involved needs something
            different. Every document is written for the person who uses it and names the decision
            behind it.
          </p>
          <ol className={styles.decisions}>
            {DECISIONS.map((d) => (
              <li key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="tiers" className="about-strip">
        <div className="container">
          <p className="label ui">Three tiers</p>
          <h2 className="section-heading rule-gold">What each tier includes.</h2>
          <div className={styles.tiers}>
            {TIERS.map((t) => (
              <article key={t.n} className={`${styles.tier} ${styles[`tier${t.n}`]}`}>
                <p className={`${styles.tierName} ui`}>{t.name}</p>
                <p className={styles.tierBody}>{t.body}</p>
                <ul className={`${styles.tierDocs} ui`}>
                  {t.docs.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className={`${styles.tierLinks} ui`}>
                  <Link href={`/framework#tier${t.n}`}>See Tier {t.n} &rarr;</Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} image={"/marketing/hero/home.jpg"} />
    </>
  );
}
