import { docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Annual Elementary Field Trip Risk Assessment Pack 2026–27 (Firholm
   School, Magnolia, Seattle), a Field Trip Package version (Dan, 2026-09-25:
   "Lets finish up the Seattle one and the one we have for Singapore"). Twelve
   one-day trips, Kindergarten to Grade 5, one for each grade in each semester.

   Source: V3 customers/firholm-school/outputs/pdf/frh-field-trip-pack-2026-27.pdf
   (US Letter) and outputs/pdf/a4/ (A4); sync:trip-pdfs publishes them under
   the product-named files below. Firholm is a US school, so US Letter is the
   default edition.

   Images: import-trip.py firholm-elementary --root versions, from the US
   Letter edition (2026-09-25), pages cover, 4, 18 and 19.

   Copy marked [draft] goes through the tone review before Dan's preview. */

const PACK = "customers/firholm-school/outputs/pdf";
const DOC = "field-trip-risk-assessment-pack";
const TITLE = "Annual Elementary Field Trip Risk Assessment Pack";

const { cover, inside, editions } = docPaths({
  slug: "firholm-elementary",
  letter: "field-trip-risk-assessment-pack-firholm-2026-27-letter.pdf",
  a4: "field-trip-risk-assessment-pack-firholm-2026-27-a4.pdf",
});

const firholmElementary: Version = {
  slug: "firholm-elementary",
  product: "field-trip-package",
  title: "Lower School Field Trips, Seattle",
  school: "Firholm School",
  schoolType: "US",
  place: "Seattle, Washington",
  // [draft]
  summary:
    "A school year of one-day lower school field trips in and around Seattle: one page per trip and a calendar for each month, for the school's lower school leaders, trip coordinator, teachers, and families.",
  paperDefault: "letter",
  disclosure: "Firholm School is a fictional school; its location is shown for illustrative purposes.",
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "Lower school leaders",
      decision: "Planning the year",
      // [draft]
      blurb:
        "The lower school's single list of the year's one-day trips: the year at a glance by grade, a calendar for each month, and for each trip a page with its learning purpose, schedule, and notes for families, then a planning page with the emergency departments, their drive times, and the hazards and controls for the school to review.",
      cover: cover(DOC, TITLE),
      editions: editions(),
      // [draft] captions
      insidePages: inside(DOC, TITLE, [
        [4, "The year at a glance: one trip for each grade in each semester, with the class size and the supervision ratio."],
        [18, "A Grade 1 trip page: Oxbow Farm, with the learning purpose, the schedule, and notes for families."],
        [19, "The same trip's planning page: the emergency departments with the drive time from the venue, the route from school, and the hazards and controls for the school to review, amend, and approve."],
      ]),
      source: {
        letter: `${PACK}/frh-field-trip-pack-2026-27.pdf`,
        a4: `${PACK}/a4/frh-field-trip-pack-2026-27.pdf`,
      },
    },
  ],
  pdfSource: {
    letterDir: PACK,
    a4Dir: `${PACK}/a4`,
  },
};

export default firholmElementary;
