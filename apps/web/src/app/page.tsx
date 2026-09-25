import type { Metadata } from "next";
import Link from "next/link";
import { CtaCard } from "@/components/CtaCard";
import { TripStrip } from "@/components/TripStrip";
import { TwoServices } from "@/components/TwoServices";
import { DECISIONS, PAPER_NOTE, TIER_NAMES } from "@/content/services";
import { CLOSING_SENTENCE, POSITIONING_STATEMENT, WHAT_WE_DO_LINE } from "@/content/voice";
import styles from "./home.module.css";

/* Home (Website v1, 2026-09-25). The order: the worked trips, decision by
   decision, the three tiers and where each one's documents appear, the two
   paper sizes, then the two services as the main doors (Dan, 2026-09-25: the
   Travel Program Review, and trip by trip; one approach for every school),
   then Dan's closing sentence, the only call to action. */

const DESCRIPTION =
  "Risk intelligence for school trips. Worked trips from ETI360, each document tied to the decision it supports and open in full, in US Letter and A4.";

export const metadata: Metadata = {
  title: "ETI360 — Risk intelligence for school trips",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "ETI360 — Risk intelligence for school trips",
    description: DESCRIPTION,
    type: "website",
  },
};

const TIERS: { n: 1 | 2 | 3; name: string; body: string; links: { href: string; label: string }[] }[] = [
  {
    n: 1,
    name: TIER_NAMES[1],
    body: "The school's travel program as a whole: its policies and procedures, path by path, reviewed once every four years.",
    links: [{ href: "/framework#tier1", label: "The sample review" }],
  },
  {
    n: 2,
    name: TIER_NAMES[2],
    body: "The documents for one trip, from the approval to the day the group leaves. Every worked trip shows them in full.",
    links: [{ href: "/trips", label: "The worked trips" }],
  },
  {
    n: 3,
    name: TIER_NAMES[3],
    body: "What the trip leader and chaperones carry while the group is away, and the report that closes the trip. The Duty Manager Dashboard is the school's own view while groups travel.",
    links: [
      { href: "/trips/washington-dc#trip-leader-card", label: "Trip Leader Card" },
      { href: "/trips/washington-dc#chaperone-briefing", label: "Chaperone Briefing" },
      { href: "/trips/washington-dc#post-trip-feedback-report", label: "Post-Trip Feedback Report" },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <section
        className="hero hero-compact"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/home.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <h1>
            Risk intelligence
            <br />
            <em>for school trips.</em>
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

      <section id="trips" className={styles.band}>
        <div className="container">
          <p className="label ui">Worked trips</p>
          <h2 className="section-heading rule-gold">Every document open in full.</h2>
          <p className={styles.lead}>
            Each worked trip shows the documents prepared for it, as the school receives them.
          </p>
          <TripStrip />
        </div>
      </section>

      <section id="decisions" className="about-strip">
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

      <section id="tiers" className={styles.band}>
        <div className="container">
          <p className="label ui">Three tiers</p>
          <h2 className="section-heading rule-gold">Where each tier&rsquo;s documents appear.</h2>
          <div className={styles.tiers}>
            {TIERS.map((t) => (
              <article key={t.n} className={`${styles.tier} ${styles[`tier${t.n}`]}`}>
                <p className={`${styles.tierName} ui`}>{t.name}</p>
                <p className={styles.tierBody}>{t.body}</p>
                <p className={`${styles.tierLinks} ui`}>
                  {t.links.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.label} &rarr;
                    </Link>
                  ))}
                </p>
              </article>
            ))}
          </div>
          <p className="bridge-line">
            <Link href="/framework" className="cta-link ui">
              The three tiers in full &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section id="paper" className={`about-strip ${styles.paperBand}`}>
        <div className="container measure">
          <p className="label ui">Two paper sizes</p>
          <p className={styles.paper}>{PAPER_NOTE}</p>
        </div>
      </section>

      <section id="services" className={styles.band}>
        <div className="container">
          <p className="label ui">Two services</p>
          <h2 className="section-heading rule-gold">The whole program, or one trip at a time.</h2>
          <TwoServices />
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} image={"/marketing/hero/home.jpg"} />
    </>
  );
}
