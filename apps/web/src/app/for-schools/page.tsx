import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { reportCatalog } from "@/content/solutions";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "For Schools",
  description:
    "The questions a school trip raises, each answered by a real ETI360 output — from the structured itinerary to the operating record of the days away.",
  alternates: { canonical: "/for-schools" },
  openGraph: {
    title: "For Schools — ETI360",
    description:
      "The questions a school trip raises, each answered by a real ETI360 output — from the structured itinerary to the operating record of the days away.",
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

// Thumbnail crops. A whole document page shrunk to the card slot reads as grey
// noise, so each asset is anchored — and where needed magnified — on the region
// that stays legible: a masthead, a status grid, a route line.
const crops: Record<string, { pos: string; zoom?: number }> = {
  "location-timeline": { pos: "left top", zoom: 1.5 },
  "route-intelligence": { pos: "center top" },
  "weather-brief": { pos: "left top", zoom: 2.3 },
  "medical-access": { pos: "left top", zoom: 2.4 },
  "standard-documentation": { pos: "center top" },
  "duty-manager": { pos: "left top" },
  "incident-reporting": { pos: "left top" },
};

// The slot a thumbnail occupies, multiplied by its crop zoom and a cover-crop
// factor: object-fit cover on a landscape source in the portrait slot shows
// under half the source width, so the source must be over-provisioned or the
// crop renders soft on retina displays.
function imageSizes(slug: string, wide: boolean) {
  const zoom = crops[slug]?.zoom ?? 1;
  const desktop = Math.round((wide ? 420 : 205) * zoom * 2.3);
  return `(max-width: 700px) ${Math.round(140 * zoom)}vw, ${desktop}px`;
}

const groups = [
  {
    label: "Understand the trip",
    title: "See the trip as time, place, movement and conditions.",
    copy: "Where the group is, how it moves, the conditions it will meet, and the medical access around it—read from one structured itinerary, not from disconnected source documents.",
    items: [
      reportCatalog.locationTimeline,
      reportCatalog.routeIntelligence,
      reportCatalog.weatherBrief,
      reportCatalog.medicalAccess,
    ],
  },
  {
    label: "Keep the record consistent",
    title: "Give different trips one familiar documentation structure.",
    copy: "The content remains specific to the departure while the way leadership, staff and families read it stays consistent.",
    items: [reportCatalog.standardDocumentation],
  },
  {
    label: "Operate and document",
    title: "Carry the trip record forward while groups travel.",
    copy: "Keep the current context, communications and operating record connected to the trip that produced them.",
    items: [reportCatalog.dutyManager, reportCatalog.incidentReporting],
  },
];

export default function ForSchoolsPage() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.label}>For Schools</p>
          <h1>Turn the itinerary into a complete operating picture.</h1>
          <p className={styles.heroLead}>
            ETI360 structures the trip information a school already holds into one trip record, then
            prepares the documents, intelligence and working views the program needs—from the first
            itinerary through the days away.
          </p>
        </div>
      </header>

      {groups.map((group, groupIndex) => (
        <section
          className={`${styles.groupSection} ${groupIndex % 2 === 1 ? styles.groupAlt : ""}`}
          key={group.label}
        >
          <div className={styles.groupInner}>
            <div className={styles.groupHeading}>
              <div>
                <p className={styles.sectionLabel}>{group.label}</p>
                <h2>{group.title}</h2>
              </div>
              <p>{group.copy}</p>
            </div>

            <div className={`${styles.solutionGrid} ${group.items.length === 1 ? styles.singleCard : ""}`}>
              {group.items.map((solution) => (
                <Link href={solution.href} className={styles.solutionCard} key={solution.slug}>
                  <div
                    className={styles.cardImage}
                    style={
                      {
                        "--crop-pos": crops[solution.slug]?.pos ?? "top center",
                        "--crop-zoom": crops[solution.slug]?.zoom ?? 1,
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={solution.image}
                      alt={solution.imageAlt}
                      fill
                      quality={90}
                      sizes={imageSizes(solution.slug, group.items.length === 1)}
                    />
                  </div>
                  <div className={styles.cardCopy}>
                    <h3>{solution.name}</h3>
                    <p>{solution.summary}</p>
                    <div className={styles.supportingQuestion}>
                      <span>A question it answers</span>
                      <strong>{solution.question}</strong>
                      <em className={styles.cardGo}>See the answer →</em>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.openSet}>
        <div className={styles.openSetInner}>
          <p className={styles.sectionLabel}>An open set</p>
          <p>
            These questions are where we start, not a catalog of everything a trip can raise. When a
            school brings a question that is not on this page, we work on it together—and the answer
            joins the library.
          </p>
          <Link href="/framework">Every document behind these answers, tier by tier →</Link>
        </div>
      </section>

      <section className={styles.changeSection}>
        <div className={styles.changeInner}>
          <div>
            <p className={styles.sectionLabel}>When the program changes</p>
            <h2>Update the trip record. Reissue the affected views.</h2>
          </div>
          <div>
            <p>
              A revised date, hotel, transport movement, route or activity can affect several documents.
              ETI360 updates the confirmed source information, refreshes the connected outputs and rechecks
              information that depends on the changed plan.
            </p>
            <Link href="/for-providers">See how this supports trip providers →</Link>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.sectionLabel}>Next step</p>
            <h2>Contact us.</h2>
            <p>
              Tell us about your program and we will show you the connected outputs that fit it.
            </p>
          </div>
          <Link href="/contact">Contact us →</Link>
        </div>
      </section>
    </article>
  );
}
