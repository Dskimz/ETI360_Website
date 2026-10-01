import type { Metadata } from "next";
import { CaseStudyLink } from "@/components/CaseStudyLink";
import { ProductHeader } from "@/components/ProductHeader";
import { TripCard } from "@/components/TripCard";
import { getProduct, tierNames } from "@/content/products";
import { DECISIONS } from "@/content/services";
import { trips } from "@/content/trips";
import tripStyles from "../trips/trips.module.css";
import styles from "./page.module.css";

/* Individual Trip Reports, Tiers 2 and 3 (four-product site spec §4.3).

   2026-09-29 (Dan): "scrape out all the AI text ... just give the
   information and reports and let them talk for themselves", and say how the
   documents are made for each school. The page is now: the documents by
   decision (names and readers only; the ids stay, the retired solution pages
   redirect to them), the worked trips, how the documents are made for the
   school, how it works in three lines, who decides, who does the work. No
   fictional-school notices, no paper note (the open route picks the paper). */

const product = getProduct("trip-package");

/** The documents under each decision (DECISIONS in services.ts), with the
    ids the redirects land on. The names are the documents' own titles. */
const DOCS_BY_DECISION: Record<string, { id: string; name: string }[]> = {
  "Approving the trip": [
    { id: "school-trip-record", name: "School Trip Record" },
    { id: "trip-risk-working-file", name: "Trip Risk Working File" },
  ],
  "Telling families": [{ id: "family-trip-brief", name: "Family Trip Brief" }],
  "Preparing the leader and chaperones": [
    { id: "trip-leader-card", name: "Trip Leader Card" },
    { id: "chaperone-briefing", name: "Chaperone Briefing and Pocket Emergency Card" },
  ],
  "Connecting the trip to learning": [
    { id: "educational-journey", name: "Educational Journey" },
    { id: "student-journey-guide", name: "Student Journey Guide" },
  ],
  "Getting a student to care": [],
  "Improving next year's trip": [{ id: "post-trip-feedback-report", name: "Post-Trip Feedback Report" }],
};

/** Who reads each document, as the worked trips label it ("School",
    "Families", "Trip leader"…). A listed document that no worked trip
    carries fails the build rather than naming something the page cannot show. */
function readerOf(docId: string): string {
  for (const t of trips) {
    const d = t.documents.find((x) => x.slug === docId);
    if (d) return d.reader;
  }
  throw new Error(`Individual Trip Reports page lists "${docId}", which no worked trip carries`);
}

/** "Improving next year's trip" → "improving-next-years-trip". */
function anchorOf(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const DESCRIPTION = `${product.door} ${tierNames(product).join(" · ")}.`;

export const metadata: Metadata = {
  title: "Individual Trip Reports",
  description: DESCRIPTION,
  alternates: { canonical: "/trip-package" },
  openGraph: {
    title: "Individual Trip Reports — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

/** How the documents are made for each school (Dan, 2026-09-29). Tone
    review 2026-09-29. */
const MADE_FOR_THE_SCHOOL = [
  "Every document carries the school’s name, colors and logo, on US Letter or A4.",
  "The documents follow the school’s own trip policy, forms and escalation path.",
  "The risk documentation takes the format the school already uses: a risk assessment, RAMS, emergency action procedures, or the school’s own form.",
  "The documents use the school’s own names for its programs, such as Week Without Walls or service trips.",
  "A trip gets only the documents it needs. A day trip gets a shorter set, and walking, cycling and paddling days can add route maps.",
];

export default function TripPackagePage() {
  return (
    <>
      <ProductHeader product={product} lede={product.door} />

      <section className="article-body">
        <div className={tripStyles.wide}>
          <div className={styles.top}>
            <h2 id="receives">What the school receives</h2>
            <ol className={styles.decisions}>
              {DECISIONS.map((d) => {
                const docs = DOCS_BY_DECISION[d.title] ?? [];
                if (docs.length === 0) return null;
                return (
                  <li key={d.title}>
                    <h3 id={anchorOf(d.title)} className={styles.decisionTitle}>
                      {d.title}
                    </h3>
                    <ul className={`${styles.docs} ui`}>
                      {docs.map((doc) => (
                        <li key={doc.id}>
                          <span id={doc.id} className={styles.docName}>
                            {doc.name}
                          </span>
                          <span className={styles.docReader}>{readerOf(doc.id)}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className={styles.block}>
            <h2 id="worked-trips">Worked trips</h2>
            <div className={tripStyles.library}>
              {trips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} headingLevel={3} />
              ))}
            </div>
            <CaseStudyLink product={product} />
          </div>

          <div className={`${styles.block} ${styles.prose}`}>
            <h2 id="made-for-the-school">Made for the school</h2>
            <ul>
              {MADE_FOR_THE_SCHOOL.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.block} ${styles.prose}`}>
            <h2 id="how">How it works</h2>
            <ul>
              <li>The school emails ETI360 the itinerary, the provider&rsquo;s documents and its trip policy.</li>
              <li>ETI360 returns the documents. When the program changes, ETI360 updates them.</li>
              <li>ETI360 does not receive student records or personal student information.</li>
            </ul>
          </div>


          <div className={`${styles.block} ${styles.prose}`}>
            </div>
        </div>
      </section>
    </>
  );
}
