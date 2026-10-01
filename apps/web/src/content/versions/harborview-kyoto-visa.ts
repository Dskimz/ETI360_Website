import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Japan Entry and Visa Report for Harborview's Kyoto trip (HIS-T02,
   13 to 19 March 2027), an Individual Trip Reports sample shown on the Case
   Study's trip step (Dan, 2026-10-01: "add it now with cover and one email").
   Not listed on the product page.

   PDFs: public/docs/japan-entry-and-visa-report-harborview-kyoto-2027-{a4,letter}.pdf,
   three pages cut from the full report (the cover and the two pages of the
   email to families with Chinese passports, pages 1, 3 and 4, which keep their
   own page numbers). The full report's school letters carry each student's
   date of birth and passport number, invented but personal in form, so they
   stay off the public site (Dan, 2026-10-01). Built in the rebuild repo by
   dev/customer-docs/HIS-T02/build_visa_report.py; the cut is
   japan-visa-report-sample-{A4,Letter}.pdf beside it. No pdfSource, so
   sync:trip-pdfs skips this version.

   Images: import-trip.py harborview-kyoto-visa --root versions, from the A4
   sample, pages cover, 2 and 3. */

const DOC = "japan-entry-and-visa-report";
const TITLE = "Japan Entry and Visa Report";

const { cover, inside, editions } = docPaths({
  slug: "harborview-kyoto-visa",
  letter: "japan-entry-and-visa-report-harborview-kyoto-2027-letter.pdf",
  a4: "japan-entry-and-visa-report-harborview-kyoto-2027-a4.pdf",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const harborviewKyotoVisa: Version = {
  slug: "harborview-kyoto-visa",
  product: "trip-package",
  listed: false,
  title: "Japan Entry and Visa Report, Kyoto",
  school: "Harborview International School",
  schoolType: "International",
  place: "Singapore",
  // [draft]
  summary:
    "The report sorts a group of 25 students and 3 teachers by passport, shows which travelers need a visa for Japan, and gives each family the steps and documents for its own application.",
  paperDefault: "a4",
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "Trip office and families",
      decision: "Preparing the visas",
      cover: cover(DOC, TITLE),
      editions: editions(),
      // [draft]
      insidePages: inside(DOC, TITLE, [
        [2, "The email to families whose children travel on a passport of the People's Republic of China: when to apply and how, step by step."],
        [3, "The documents each family brings to the Japan Visa Application Centre, in the order of the center's own checklist."],
      ]),
    },
  ],
};

export default harborviewKyotoVisa;
