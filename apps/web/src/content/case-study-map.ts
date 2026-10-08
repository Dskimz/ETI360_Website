import { siteDocument } from "@/content/case-study";
import type { CoverImage } from "@/content/case-study-home";
import { tripDoc, type TripDocSlug } from "@/content/case-study-trip";
import type { TierKey } from "@/content/program-map";

/* The Case Study head (Dan, 2026-10-08): the Program Map's three tiers and
   four columns, filled with the covers of the documents ETI360 prepared for
   this school only. Not every school takes every document, so each school's
   head lists its own rows. Trip Readiness fills two columns. */

export type MapDoc = CoverImage & { name: string };
export type MapRow = { label: string; href: string; docs: MapDoc[] };
export type SchoolMap = Record<TierKey, MapRow[]>;

const page = (id: string) => `/case-study/${id}`;

function doc(version: string, slug: string, name: string): MapDoc {
  const d = siteDocument({ version, doc: slug }).doc;
  return {
    src: d.cover.src,
    width: d.cover.width,
    height: d.cover.height,
    alt: d.cover.alt,
    name,
  };
}
function tdoc(slug: TripDocSlug, name: string): MapDoc {
  const r = tripDoc(slug);
  return doc(r.version, r.doc, name);
}

/** Harborview International School: what ETI360 prepared for its year. */
export const HARBORVIEW_MAP: SchoolMap = {
  1: [
    {
      label: "The school’s travel program",
      href: page("understanding-the-program"),
      docs: [
        doc(
          "harborview-review",
          "travel-program-review",
          "Travel Program Review",
        ),
        doc(
          "harborview-travel-year-guide",
          "travel-year-guide",
          "Travel Year Guide",
        ),
        doc("harborview-trip-budgets", "trip-budgets", "Trip Budgets"),
      ],
    },
    {
      label: "Trip providers",
      href: page("understanding-the-program"),
      docs: [
        doc(
          "line-and-landmark-evaluation",
          "provider-evaluation",
          "Trip Provider Review",
        ),
      ],
    },
  ],
  2: [
    {
      label: "Trip approval and risk",
      href: page("preparing-each-trip"),
      docs: [
        tdoc("off-campus-travel-report", "Off Campus Travel Report"),
        tdoc("risk-assessment-report", "Risk Assessment Report"),
      ],
    },
    {
      label: "Families",
      href: page("preparing-families"),
      docs: [
        tdoc(
          "student-and-parent-trip-report",
          "Student and Parent Trip Report",
        ),
        doc(
          "harborview-kyoto-visa",
          "japan-entry-and-visa-report",
          "Entry and Visa Report",
        ),
      ],
    },
    {
      label: "Day trips",
      href: page("preparing-for-field-trips"),
      docs: [
        doc(
          "harborview-elementary",
          "field-trip-risk-assessment-pack",
          "Field Trip Reports",
        ),
      ],
    },
    {
      label: "Trip leaders",
      href: page("preparing-trip-leaders"),
      docs: [tdoc("trip-leaders-brief", "Trip Leaders Brief")],
    },
    {
      label: "Students",
      href: page("preparing-families"),
      docs: [
        tdoc("educational-travel-fieldbook", "Educational Travel Fieldbook"),
      ],
    },
  ],
  3: [
    {
      label: "Incident reports",
      href: page("during-trips"),
      docs: [
        {
          src: "/marketing/case-studies/incident-reporting/incident-p1.jpg",
          width: 900,
          height: 1273,
          alt: "The first page of an incident report from Harborview’s incident reporting system",
          name: "Incident Report System",
        },
      ],
    },
    {
      label: "Feedback",
      href: page("after-the-trips"),
      docs: [tdoc("post-trip-report", "Post Trip Report")],
    },
  ],
};

/* The three chapters under the head (Dan, 2026-10-08, D3: the five stages
   regrouped by tier). Each names when it happens, what the school was
   doing and what we prepared, then links to its point pages under the
   branch names from the Program Map. Voice: "we" for ETI360. */
export type Chapter = {
  when: string;
  title: string;
  line: string;
  links: { label: string; href: string }[];
};

export const HARBORVIEW_CHAPTERS: Record<TierKey, Chapter> = {
  1: {
    when: "Before the year begins",
    title: "The program",
    line: "Harborview’s trip rules and its providers’ procedures sit in many places. We review them against one framework and lay out the year in one guide.",
    links: [
      {
        label: "The school’s travel policies",
        href: page("understanding-the-program"),
      },
      { label: "The year ahead", href: page("laying-out-the-year") },
    ],
  },
  2: {
    when: "From planning to departure",
    title: "Each trip",
    line: "Every trip arrives in its own format. We prepare each one the same way, from a week away to the elementary day trips, so families and trip leaders have what they need before the group leaves.",
    links: [
      {
        label: "Itinerary and risk reports",
        href: page("preparing-each-trip"),
      },
      { label: "Parent documents", href: page("preparing-families") },
      { label: "Trip leaders", href: page("preparing-trip-leaders") },
      { label: "Field trips", href: page("preparing-for-field-trips") },
      {
        label: "Sports and exchange trips",
        href: page("preparing-for-sports-and-cultural-exchange-trips"),
      },
    ],
  },
  3: {
    when: "While groups are away, and after",
    title: "The record",
    line: "Harborview records incidents in its own system while groups are away. The records and feedback from every trip become the starting point for next year.",
    links: [
      { label: "Incident reports", href: page("during-trips") },
      { label: "Feedback", href: page("after-the-trips") },
      { label: "The next year", href: page("the-next-year") },
    ],
  },
};
