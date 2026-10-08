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
