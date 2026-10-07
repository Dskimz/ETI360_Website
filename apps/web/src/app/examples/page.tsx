import type { Metadata } from "next";
import { TripCard } from "@/components/TripCard";
import { AREAS, areaOfDoc, TIER_TAG } from "@/content/areas";
import { getProduct } from "@/content/products";
import { trips } from "@/content/trips";
import { openAuto, publicNotice, versions } from "@/content/versions";
import { WHO_DECIDES } from "@/content/voice";
import tripStyles from "../trips/trips.module.css";
import { ExamplesLibrary, type ExampleArea, type ExampleItem } from "./ExamplesLibrary";
import styles from "./examples.module.css";

/* Examples (Dan, 2026-10-01 redesign): one library holding every worked
   document on the site, grouped by the eight areas, with a switch between
   international and independent schools. The four product pages folded in here (Dan's
   answer, 2026-10-01); their old addresses redirect to the matching area
   (src/lib/redirects.ts). Every document opens through the logged /open
   route; a worked trip's documents also link to the trip's own page, which
   keeps its address for the campaign emails. Unlisted versions (the Travel
   Year Guide, the Trip Budgets, the Kyoto visa report) are listed here: the
   library is where every example lives. */

const DESCRIPTION =
  "Every worked example ETI360 has prepared, grouped by area of work, for international and independent schools. Each document opens in full.";

export const metadata: Metadata = {
  title: "Examples",
  description: DESCRIPTION,
  alternates: { canonical: "/examples" },
  openGraph: {
    title: "Examples — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

/** Inside trip preparation, the documents fall under their product, so the
    old product addresses can land on their own group. */
const GROUP_OF_PRODUCT: Record<string, { id: string; label: string }> = {
  "trip-package": { id: "individual-trips", label: getProduct("trip-package").name },
  "field-trip-package": { id: "field-trips", label: getProduct("field-trip-package").name },
  "conference-travel-package": { id: "conference-travel", label: getProduct("conference-travel-package").name },
};

const TRIP_SLUGS = new Set(trips.map((t) => t.slug));

/** Every version but those shown only on the Case Study (Queenstown). */
const LIBRARY = versions.filter((v) => !v.caseStudyOnly);

const ITEMS: ExampleItem[] = LIBRARY.flatMap((v) =>
  v.documents.map((d) => {
    const area = areaOfDoc(d.slug);
    const group = area.id === "trip-preparation" ? GROUP_OF_PRODUCT[v.product] : undefined;
    return {
      key: `${v.slug}/${d.slug}`,
      area: area.id,
      group: group?.id,
      title: d.title,
      school: v.school,
      place: v.place,
      schoolType: v.schoolType,
      cover: d.cover,
      href: openAuto(v, d),
      // Only a worked trip has its own page; the Kyoto visa report is an
      // Individual Trip Reports version without one.
      tripHref: TRIP_SLUGS.has(v.slug) ? `/trips/${v.slug}` : undefined,
      tripTitle: TRIP_SLUGS.has(v.slug) ? v.title : undefined,
    };
  }),
);

const AREA_LIST: ExampleArea[] = AREAS.map((a) => {
  const shown = LIBRARY.filter((v) => v.documents.some((d) => a.docs.includes(d.slug)));
  return {
    id: a.id,
    title: a.title,
    line: a.line,
    tierTag: TIER_TAG[a.tier],
    tier: a.tier,
    groups:
      a.id === "trip-preparation"
        ? Object.values(GROUP_OF_PRODUCT).map((g) => ({ id: g.id, label: g.label }))
        : undefined,
    notices: Array.from(new Set(shown.map((v) => publicNotice(v.disclosure)).filter((n): n is string => !!n))),
  };
});

/** How the documents are made for each school (Dan, 2026-09-29; tone review
    2026-09-29), carried over from the Individual Trip Reports page. */
const MADE_FOR_THE_SCHOOL = [
  "Every document carries the school’s name, colors and logo, on US Letter or A4.",
  "The documents follow the school’s own trip policy, forms and escalation path.",
  "The risk documentation takes the format the school already uses: a risk assessment, RAMS, emergency action procedures, or the school’s own form.",
  "The documents use the school’s own names for its programs, such as Week Without Walls or service trips.",
  "The school and ETI360 scope the documents for each trip. Day trips use a shorter set, and walking, cycling and paddling days can add route maps.",
];

export default function ExamplesPage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <p className={`${styles.eyebrow} ui`}>Examples</p>
          <h1>Every document opens in full.</h1>
          <p className={styles.lede}>
            These worked examples show the form and level of detail ETI360 prepares. Each school’s documents reflect its name, policies and trip context.
          </p>
        </div>
      </header>

      <ExamplesLibrary areas={AREA_LIST} items={ITEMS} />

      <section className={styles.band}>
        <div className="container">
          <h2 className="section-heading rule-gold" id="worked-trips">
            The worked trips
          </h2>
          <p className={styles.sectionLede}>Each worked trip has its own page with every document in its set.</p>
          <div className={`${tripStyles.wide} ${tripStyles.library}`}>
            {trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} headingLevel={3} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bandLight}>
        <div className={`container ${styles.prose}`}>
          <h2 className="section-heading rule-gold" id="made-for-the-school">
            Made for the school
          </h2>
          <ul>
            {MADE_FOR_THE_SCHOOL.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className={styles.decides}>{WHO_DECIDES}</p>
        </div>
      </section>
    </>
  );
}
