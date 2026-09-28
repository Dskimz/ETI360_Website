import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import { ProductHeader } from "@/components/ProductHeader";
import { TripCard } from "@/components/TripCard";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import { getProduct, tierNames } from "@/content/products";
import { DECISIONS, PAPER_NOTE } from "@/content/services";
import { trips } from "@/content/trips";
import { CLOSING_SENTENCE, WHO_DECIDES } from "@/content/voice";
import { WORKING_FILE_BOUNDARY } from "../trips/boundary";
import tripStyles from "../trips/trips.module.css";
import styles from "./page.module.css";

/* The Trip Package, Tiers 2 and 3 (four-product site spec §4.3; Dan,
   2026-09-25: each page is one of the four products and shows its
   versions). Built from the former /trips library, which redirects here.

   1. What the school receives, decision by decision: text only (the trip
      cards carry the pictures). Every decision and every document name has
      an id: the retired solution pages redirect to them (spec §8 rows 5–11),
      e.g. /for-schools/student-journey → /trip-package#student-journey-guide.
   2. Worked trips: one card per Trip Package version, each opening
      /trips/{slug}; only built trips (src/content/trips/index.ts), never a
      placeholder. Each fictional school's notice once, under the cards.
   3. How it works, moved from For Schools; who decides; who does the work;
      the contact band carrying the product.
   No prices. Lines marked [draft] passed the tone review on 2026-09-27
   (Stage D) and await Dan's preview. */

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
  throw new Error(`Trip Package page lists "${docId}", which no worked trip carries`);
}

/** "Improving next year's trip" → "improving-next-years-trip". */
function anchorOf(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Moved verbatim from the former home page's decision list.
const DECISIONS_LEAD =
  "A trip is a run of decisions the school makes, and each person involved needs something different. Every document is written for the person who uses it and names the decision behind it.";

// [draft] Spec §4.3: getting a student to care has no document of its own;
// this says where it lives. Follows the hospital rule (N4 Option B,
// 2026-09-25): ETI360 lists; the school confirms which one the group uses.
const TO_CARE_WHERE =
  "No document of its own: the emergency departments appear in the Trip Risk Working File, the emergency plan on the Trip Leader Card, and the pocket card. The school confirms which one the group uses.";

// The door sentence, then one [draft] sentence.
const DESCRIPTION = `The Trip Package (${tierNames(product).join(" · ")}): ${product.door.charAt(0).toLowerCase()}${product.door.slice(1)} Worked trips show every document in full, in US Letter and A4.`;

export const metadata: Metadata = {
  title: "The Trip Package",
  description: DESCRIPTION,
  alternates: { canonical: "/trip-package" },
  openGraph: {
    title: "The Trip Package — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

export default function TripPackagePage() {
  // One notice per fictional school, verbatim from the trip files.
  const notices = Array.from(new Map(trips.map((t) => [t.school, t.disclosure])).values());

  return (
    <>
      <ProductHeader product={product} lede={product.door} />

      <section className="article-body">
        <div className={tripStyles.wide}>
          <div className={styles.top}>
            <h2 id="receives">What the school receives</h2>
            <p className={styles.lead}>{DECISIONS_LEAD}</p>

            <ol className={styles.decisions}>
              {DECISIONS.map((d) => {
                const docs = DOCS_BY_DECISION[d.title] ?? [];
                return (
                  <li key={d.title}>
                    <h3 id={anchorOf(d.title)} className={styles.decisionTitle}>
                      {d.title}
                    </h3>
                    <p className={styles.note}>{d.note}</p>
                    {docs.length > 0 ? (
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
                    ) : (
                      <p className={`${styles.noDoc} ui`}>{TO_CARE_WHERE}</p>
                    )}
                  </li>
                );
              })}
            </ol>

            {/* [draft] spec §4.3; the redirect target for the retired route and weather pages. */}
            <p id="outdoor-trips" className={styles.outdoor}>
              <strong>Outdoor trips</strong> add a day-by-day conditions report (daylight and cover; on
              the water, tide and exposure) and route pages on the Trip Leader Card.
            </p>
            <p className={`${styles.paper} ui`}>{PAPER_NOTE}</p>
          </div>

          <div className={styles.block}>
            <h2 id="worked-trips">Worked trips</h2>
            {/* Moved verbatim from For Schools. */}
            <p className={styles.lead}>
              Each worked trip shows the documents prepared for one trip, decision by decision, with
              every document open in full.
            </p>
            <div className={tripStyles.library}>
              {trips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} headingLevel={3} />
              ))}
            </div>
            <div className={`${tripStyles.libraryNotes} ui`}>
              {notices.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>
          </div>

          {/* Moved from For Schools (spec §4.3 item 4). Tone review 2026-09-27:
              ETI360 in the third person, as on every product page; the
              emergency departments in the plural (hospital rule); "not a
              competitor" off. */}
          <div className={`${styles.block} ${styles.prose}`}>
            <h2 id="how">How it works</h2>
            <p>
              The school&rsquo;s trip lead emails ETI360 the itinerary, the provider&rsquo;s documents,
              and the school&rsquo;s trip policy. ETI360 adds what the group needs to know along the
              way, such as venue entry rules and the emergency departments for each place with their
              drive times, and returns the documents in the school&rsquo;s name and branding, each in a
              US Letter edition and an A4 edition. Where a provider runs the trip, its documents are the starting point.
              The school approves the trip.
            </p>
            <p>
              <strong>We book through a provider. What does this add?</strong> The provider&rsquo;s
              documents are the starting point. ETI360 brings them together with the
              school&rsquo;s policy and the itinerary, adds what the group needs to know about each
              place, and prepares the file the school reviews and the card the trip leader carries.
              Nothing the provider does is replaced.
            </p>
            <p>
              <strong>When the program changes.</strong> A revised date, hotel, transport movement,
              route or activity can affect several documents. ETI360 updates the confirmed source
              information and rechecks information that depends on the changed plan.
            </p>
            <p>
              <strong>Student data.</strong> ETI360 does not receive student records or personally
              identifiable student information. Trip files name places, dates, providers, and staff
              roles. The school&rsquo;s obligations for student data stay with the school.
            </p>
            <p>There are no due dates and no tracking.</p>
          </div>

          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES}</p>
            <p className={tripStyles.boundaryNext}>{WORKING_FILE_BOUNDARY}</p>
          </div>

          <div className={`${styles.block} ${styles.prose}`}>
            <WhoDoesTheWork />
          </div>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} product="trip-package" />
    </>
  );
}
