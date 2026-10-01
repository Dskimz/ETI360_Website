import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* Harborview's Trip Budgets for March 2027 (Dan, 2026-10-01): the budget for
   each of the school's 35 trips in one format, in Singapore dollars.
   Partnership work (the home page's trip budgets area), shown on the Case
   Study's first step. Not listed on a product page.

   Built in the rebuild repo by dev/trip-budgets/build_budget_report.py from
   the HIA Budget sheet (vault: Operations/Budgets/). PDFs copied to
   public/docs/trip-budgets-harborview-march-2027-{a4,letter}.pdf
   (gitignored, S3 at publish). No pdfSource, so sync:trip-pdfs skips it.

   Images: import-trip.py harborview-trip-budgets --root versions, from the
   A4 edition, pages cover, 2, 3 and 7. */

const DOC = "trip-budgets";
const TITLE = "Trip Budgets";

const { cover, inside, editions } = docPaths({
  slug: "harborview-trip-budgets",
  letter: "trip-budgets-harborview-march-2027-letter.pdf",
  a4: "trip-budgets-harborview-march-2027-a4.pdf",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const harborviewTripBudgets: Version = {
  slug: "harborview-trip-budgets",
  product: "travel-program-review",
  listed: false,
  title: "Trip Budgets, March 2027",
  school: "Harborview International School",
  schoolType: "International",
  place: "Singapore",
  summary:
    "The report sets out the budget for each of the school's 35 March trips in one format, from the provider's cost and flights to GST and card fees, so leadership can compare them side by side.",
  paperDefault: "a4",
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "Leadership and the travel lead",
      decision: "Choosing and pricing the trips",
      cover: cover(DOC, TITLE),
      editions: editions(),
      insidePages: inside(DOC, TITLE, [
        [2, "The program overview: what families pay in total, the average prices and where the money goes."],
        [3, "What makes up each trip's price, trip by trip."],
        [7, "One trip's budget, line by line, from the subtotal to the price per student."],
      ]),
    },
  ],
};

export default harborviewTripBudgets;
