import { A4_COVER, A4_PAGE, tripPaths } from "./helpers";
import type { Trip } from "./types";

/* Elementary field trips (Harborview International School, Singapore): the
   Annual Elementary Field Trip Risk Assessment Pack 2026–27, one pack for the
   school year, one page per trip, a calendar for each month.

   Source: the eti360-rebuild repo, not V3. Built by
   dev/field-trip-register/build_register.py --clean --web, which writes
   out/Harborview-Field-Trip-Register-2026-27-clean-web.pdf (legacy file name;
   out/ is gitignored there, so rebuild it before a sync on a fresh machine).
   The same file is published at /docs/field-trip-risk-assessment-pack-harborview-2026-27.pdf.
   The paths below are relative to the V3 root, as sync:trip-pdfs expects;
   the rebuild repo sits beside V3 (/Users/danskimin/00 - eti360-rebuild).

   US Letter: not built. A Letter render of the pack's HTML with only a
   page-size override (8.5 x 11 in) was checked page by page on 2026-09-25:
   the contents, the year at a glance, and five trip pages run into the footer
   or clip at the foot, so the Letter edition needs its own layout pass in
   build_register.py. Until then the page shows it in preparation. */

const V3_RELATIVE_OUT = "../00 - eti360-rebuild/dev/field-trip-register/out";

const { base, cover, inside, editions } = tripPaths({
  slug: "elementary",
  filePrefix: "his-elementary-2026-27",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const TITLE = "Annual Elementary Field Trip Risk Assessment Pack";

const elementaryFieldTripsInternational: Trip = {
  slug: "elementary",
  title: "Elementary Field Trips, Singapore",
  h1: "The documents for a year of elementary field trips.",
  school: "Harborview International School",
  schoolType: "International",
  tripKind: "Day trips",
  tripType: "One-day field trips, a school year",
  region: "Singapore",
  dates: "Tuesday, September 15, 2026 to Tuesday, June 8, 2027",
  group: "Grades 1 to 5, 66 to 70 students in each grade",
  paperDefault: "a4",
  lede:
    "Harborview International School's elementary school takes thirty one-day field trips in the 2026–27 school year: six for each grade from Grade 1 to Grade 5, one for each unit of inquiry. ETI360 prepared the pack before the school year began. Each trip is dated to a school day around the breaks and holidays, with two venues in Singapore, and each trip page maps the route from school and the emergency department for each trip, with the drive time from the venue. Every trip has one page and every month a calendar, so the school reads every trip the same way. The pack opens in full.",
  summary:
    "A school year of one-day elementary field trips in Singapore: one page per trip and a calendar for each month, for the school's elementary leaders, trip coordinators, teachers, and families.",
  facts: [
    {
      label: "Year",
      value:
        "School year 2026–27: Semester 1, August 11 to December 11, 2026, and Semester 2, January 4 to June 18, 2027",
    },
    {
      label: "Trips",
      value:
        "Thirty one-day field trips, Tuesday, September 15, 2026 to Tuesday, June 8, 2027, one for each unit of inquiry in each grade",
    },
    {
      label: "Grades",
      value:
        "Grades 1 to 5, 66 to 70 students in each grade; one adult to five students in Grades 1 and 2, to six in Grade 3, and to eight in Grades 4 and 5",
    },
    {
      label: "Venues",
      value: "Two venues per trip, all within Singapore; standard departure 8:15 a.m., return 2:10 to 2:45 p.m.",
    },
    { label: "Prepared", value: "August 3, 2026, before the school year" },
    { label: "School", value: "Harborview International School, Singapore, a fictional school" },
  ],
  hero: {
    src: `${base}/hero-marina-bay.jpg`,
    width: 1400,
    height: 656,
    alt: "The Merlion and the Singapore skyline across the water at Marina Bay.",
  },
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  decisions: [
    {
      title: "Planning the year",
      note: "The year at a glance by grade, and a calendar for each month with the school's breaks and holidays marked and every trip dated to a school day.",
    },
    {
      title: "Approving each day trip",
      note: "Each trip's page and its risk-assessment working documents, one per activity group, for the school to review, complete, and approve. The pack records that the working documents were prepared, not that a trip is approved.",
    },
    {
      title: "Briefing teachers and chaperones",
      note: "The learning purpose the teachers wrote, the schedule timed to the bus, the supervision ratio, the two venues with their addresses, and the trip coordinator.",
    },
    {
      title: "Telling families",
      note: "Notes for families on every trip page, and a parent information letter, in the school's own name, in each trip's documentation set.",
    },
    {
      title: "Getting a child to care",
      note: "The emergency department for each trip, with the drive time from the venue and the address, mapped. For the Pulau Ubin trip, the route is the island ferry, then the road.",
    },
  ],
  documents: [
    {
      slug: "field-trip-risk-assessment-pack",
      title: TITLE,
      reader: "Elementary leaders",
      decision: "Planning the year",
      blurb:
        "The elementary school's single list of the year's one-day trips: the year at a glance by grade, a calendar for each month, and one page per trip with its learning purpose, schedule, notes for families, venues, the route from school, and the emergency department with the drive time. A trip that moves keeps its page.",
      cover: cover("field-trip-risk-assessment-pack", TITLE),
      editions: editions("field-trip-risk-assessment-pack", { letter: false }),
      insidePages: inside("field-trip-risk-assessment-pack", TITLE, [
        [5, "The year at a glance: each grade's trips by date and unit of inquiry, with the class size, the supervision ratio, and the two semesters."],
        [6, "What every trip carries: the itinerary, the parent letter, the risk-assessment working documents for the school to complete and approve, the weather note from the 15-year record, and the mapped route and emergency department."],
        [8, "A Grade 1 trip page: Mount Faber Park and Henderson Waves, with the learning purpose, the schedule, notes for families, the route from school, and the emergency department, about eight minutes' drive from the venue."],
      ]),
      source: { a4: `${V3_RELATIVE_OUT}/Harborview-Field-Trip-Register-2026-27-clean-web.pdf` },
    },
  ],
  pdfSource: {
    letterDir: V3_RELATIVE_OUT,
    a4Dir: V3_RELATIVE_OUT,
  },
};

export default elementaryFieldTripsInternational;
