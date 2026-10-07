import { A4_COVER, A4_PAGE, tripPaths } from "./helpers";
import type { Trip } from "./types";

/* Queenstown (Harborview International School, trip HIS-T07): Harborview's
   own trip set, built in V3 (customers/his/trips/queenstown-2027/; the
   document use review there gave the Sep 29 names). It replaces Horizon
   Ridge's Italy set on the Case Study (Dan, 2026-10-07: "Build Harborview's
   own trip set for the covers"; port from V3, not a rebuild).

   PORT STATE: the structure is ready, the files are not. This version
   exports null, so nothing on the site changes, until a session on Dan's
   Mac (which reaches V3) has:
     1. run scripts/import-queenstown.py (covers, inside pages, hero, PDFs);
     2. replaced every V3: placeholder below from the V3 trip record and
        checked each blurb and caption against the PDFs;
     3. set READY to true and run the build.
   The Case Study switches to these documents on its own once READY is
   true (src/content/case-study-trip.ts). Handoff:
   ETI360-New dev/website-outputs/queenstown-port/HANDOFF.md.

   Document names: the Sep 29 trip set (CLAUDE.md, Trip document names).
   Slugs are the new names; the import maps V3 files that still carry the
   earlier names. An international school, so A4 is the default edition and
   the images are rendered from the A4 PDFs. [draft] blurbs. */

const READY = false;

const { base, cover, inside, editions } = tripPaths({
  slug: "queenstown",
  filePrefix: "his-t07-queenstown",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const queenstown: Trip = {
  slug: "queenstown",
  product: "trip-package",
  title: "Queenstown",
  h1: "The documents for a week in Queenstown.",
  school: "Harborview International School",
  schoolType: "International",
  tripKind: "Outdoor",
  tripType: "V3: e.g. Overnight trip, eight days",
  region: "New Zealand",
  place: "Queenstown, New Zealand",
  dates: "V3: e.g. Saturday, March 13 to Saturday, March 20, 2027",
  group: "V3: students, grades and staff",
  paperDefault: "a4",
  lede: "V3: one paragraph from the trip record, in the shape of italy.ts.",
  summary:
    "V3: one sentence, e.g. An eight-day outdoor trip to Queenstown: the documents for the office, the trip leaders, families, students, and next year's planning.",
  facts: [
    { label: "Trip", value: "V3" },
    { label: "Group", value: "V3" },
    { label: "Program", value: "V3" },
    { label: "Travel", value: "V3" },
    { label: "Lodging", value: "V3" },
    { label: "School", value: "Harborview International School" },
  ],
  hero: {
    src: `${base}/hero-queenstown.jpg`,
    width: 1400,
    height: 656,
    alt: "V3: describe the hero photo",
  },
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  decisions: [
    {
      title: "Approving the trip",
      note: "The record the office files, and the Risk Assessment Report for the school to review, complete, and approve.",
    },
    {
      title: "Telling families",
      note: "The report for students and parents, with the days at a glance and the forms that come back to the office.",
    },
    {
      title: "Preparing the trip leaders",
      note: "One page for each day of the trip, the procedures, and the emergency departments by travel time from each place.",
    },
    {
      title: "Connecting the trip to learning",
      note: "The fieldbook students carry from the classroom to Queenstown and back.",
    },
    {
      title: "Improving next year's trip",
      note: "What students, families, the leaders, and the provider said, set out for the school's review.",
    },
  ],
  documents: [
    {
      slug: "off-campus-travel-report",
      title: "Off Campus Travel Report",
      reader: "School office",
      decision: "Approving the trip",
      blurb:
        "Trip facts and contacts, passports, entry, and insurance, then the reservations, the trip calendar, and the flights and transfers. The school files it with its contracts, roster, and signed permission forms.",
      cover: cover("off-campus-travel-report", "Off Campus Travel Report"),
      editions: editions("off-campus-travel-report"),
      insidePages: inside("off-campus-travel-report", "Off Campus Travel Report", [
        // V3: confirm each page number and caption against the A4 PDF.
        [2, "V3"],
        [3, "V3"],
      ]),
    },
    {
      slug: "risk-assessment-report",
      title: "Risk Assessment Report",
      reader: "Head of School and trip leader",
      decision: "Approving the trip",
      blurb:
        "Hazards, controls, and emergency actions organized one section per activity group, with the emergency care for each group and the prompts for the trip leader's live assessment. The school reviews, completes, amends, and approves it.",
      cover: cover("risk-assessment-report", "Risk Assessment Report"),
      editions: editions("risk-assessment-report"),
      insidePages: inside("risk-assessment-report", "Risk Assessment Report", [
        [2, "V3"],
        [3, "V3"],
      ]),
    },
    {
      slug: "student-and-parent-trip-report",
      title: "Student and Parent Trip Report",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "The letter home, passports, insurance, and health, the days at a glance, how to reach the group, the packing list, and the forms that come back to the school office.",
      cover: cover("student-and-parent-trip-report", "Student and Parent Trip Report"),
      editions: editions("student-and-parent-trip-report"),
      insidePages: inside("student-and-parent-trip-report", "Student and Parent Trip Report", [
        [2, "V3"],
        [3, "V3"],
      ]),
    },
    {
      slug: "trip-leaders-brief",
      title: "Trip Leaders Brief",
      reader: "Trip leaders and chaperones",
      decision: "Preparing the trip leaders",
      blurb:
        "One page for each day of the trip, with the plan for the day, the contacts, and what to do if something goes wrong. The chaperones carry the same brief.",
      cover: cover("trip-leaders-brief", "Trip Leaders Brief"),
      editions: editions("trip-leaders-brief"),
      insidePages: inside("trip-leaders-brief", "Trip Leaders Brief", [
        [2, "V3"],
        [3, "V3"],
      ]),
    },
    {
      slug: "educational-travel-fieldbook",
      title: "Educational Travel Fieldbook",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb: "V3: what the fieldbook asks of students, day by day.",
      cover: cover("educational-travel-fieldbook", "Educational Travel Fieldbook"),
      editions: editions("educational-travel-fieldbook"),
      insidePages: inside("educational-travel-fieldbook", "Educational Travel Fieldbook", [
        [2, "V3"],
        [3, "V3"],
      ]),
    },
    {
      slug: "post-trip-report",
      title: "Post Trip Report",
      reader: "School",
      decision: "Improving next year's trip",
      blurb:
        "What students, families, the leaders, and the provider said after the trip, set out for the school's review and for planning the trip again next year.",
      cover: cover("post-trip-report", "Post Trip Report"),
      editions: editions("post-trip-report"),
      insidePages: inside("post-trip-report", "Post Trip Report", [
        [2, "V3"],
        [3, "V3"],
      ]),
    },
  ],
  pdfSource: {
    // V3: confirm both folders; the import prints the ones it used.
    letterDir: "customers/his/outputs/pdf",
    a4Dir: "customers/his/outputs/pdf/a4",
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default READY ? queenstown : null;
