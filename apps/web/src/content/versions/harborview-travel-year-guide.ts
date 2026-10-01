import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* Harborview's Travel Year Guide, 2026-27 (Dan, 2026-10-01): the school's
   year of trips in six phases, a guide the school owns with its own dates,
   never deadlines. Partnership work, shown on the Case Study's first step
   and linked from the home page's first area. Not listed on a product page.

   Built in the rebuild repo by dev/travel-year-guide/build_travel_year_guide.py
   (vault: Operations/Travel Year Guides/). PDFs copied to
   public/docs/travel-year-guide-harborview-2026-27-{a4,letter}.pdf
   (gitignored, S3 at publish). No pdfSource, so sync:trip-pdfs skips it.

   Images: import-trip.py harborview-travel-year-guide --root versions, from
   the A4 edition, pages cover, 2, 3 and 4. */

const DOC = "travel-year-guide";
const TITLE = "Travel Year Guide";

const { cover, inside, editions } = docPaths({
  slug: "harborview-travel-year-guide",
  letter: "travel-year-guide-harborview-2026-27-letter.pdf",
  a4: "travel-year-guide-harborview-2026-27-a4.pdf",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const harborviewTravelYearGuide: Version = {
  slug: "harborview-travel-year-guide",
  product: "travel-program-review",
  listed: false,
  title: "Travel Year Guide, 2026-27",
  school: "Harborview International School",
  schoolType: "International",
  place: "Singapore",
  summary:
    "The guide sets out the school's year of trips in six phases, from the review of the program to the reports after the trips, with the people each step involves.",
  paperDefault: "a4",
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "The travel lead and leadership",
      decision: "Planning the travel year",
      cover: cover(DOC, TITLE),
      editions: editions(),
      insidePages: inside(DOC, TITLE, [
        [2, "The year at a glance: the six phases across the school year, and who takes part."],
        [3, "Review and planning, then choosing the trips, each step with its date and the people involved."],
        [4, "Preparing families and preparing the trips, including the Kyoto visa window."],
      ]),
    },
  ],
};

export default harborviewTravelYearGuide;
