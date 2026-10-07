import { A4_COVER, A4_PAGE, tripPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* Queenstown (Harborview International School, trip HIS-T07): Harborview's
   own trip set, built in V3 (customers/his/trips/queenstown-2027/; the
   document use review there gave the Sep 29 names). It replaces Horizon
   Ridge's Italy set on the Case Study (Dan, 2026-10-07: "Build Harborview's
   own trip set for the covers"; port from V3, not a rebuild).

   Case Study only (Dan, 2026-10-07: "Keep Queenstown on the case study
   only"): registered so its documents open through /open and the S3 upload
   and sync carry its PDFs, but `listed: false` and `caseStudyOnly` keep it
   off the Examples library, the sitemap and the worked trips, so it has no
   /trips/queenstown page. Its files still live under /trips/queenstown/,
   where scripts/import-queenstown.py writes them.

   PORT STATE: ported 2026-10-07 on Dan's Mac by scripts/import-queenstown.py
   from the V3-queenstown worktree (branch harborview-queenstown-2027). The
   Case Study switches to these documents through
   src/content/case-study-trip.ts. Handoff:
   ETI360-New dev/website-outputs/queenstown-port/HANDOFF.md.

   Document names: the Sep 29 trip set (CLAUDE.md, Trip document names).
   Slugs are the new names; the import maps V3 files that still carry the
   earlier names. An international school, so A4 is the default edition and
   the images are rendered from the A4 PDFs. [draft] blurbs. */

const READY = true;

const { cover, inside, editions } = tripPaths({
  slug: "queenstown",
  filePrefix: "his-t07-queenstown",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const V3Q = "../00 - ETI360 - V3-queenstown/customers/his/outputs/pdf";

/* The V3 builders still write the earlier file names; `source` maps each
   published slug to its V3 file (the Trip Leaders Brief is the day book,
   never the retired trip-leader-card). */
const src = (file: string) => ({
  letter: `${V3Q}/his-t07-queenstown-${file}.pdf`,
  a4: `${V3Q}/a4/his-t07-queenstown-${file}.pdf`,
});

const queenstown: Version = {
  slug: "queenstown",
  product: "trip-package",
  title: "Queenstown",
  school: "Harborview International School",
  schoolType: "International",
  place: "Queenstown, New Zealand",
  paperDefault: "a4",
  summary:
    "Harborview's Grade 10 spends September 24 to October 1, 2027 in Queenstown, New Zealand. We prepared a report for each reader, from the school office and the Head of School to families, trip leaders and students.",
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  listed: false,
  caseStudyOnly: true,
  documents: [
    {
      slug: "off-campus-travel-report",
      title: "Off Campus Travel Report",
      reader: "School office",
      decision: "Approving the trip",
      blurb:
        "The report sets out who goes, where and when, what the trip costs and covers, and how to reach everyone on it. It also lists the bookings, the flights and the calendar the school office works to. The Head of School signs the approval.",
      cover: cover("off-campus-travel-report", "Off Campus Travel Report"),
      editions: editions("off-campus-travel-report"),
      insidePages: inside("off-campus-travel-report", "Off Campus Travel Report", [
        [2, "Page 2 sets out the trip facts and a phone number for everyone on the trip, and the Head of School signs the approval here."],
        [3, "Page 3 lists the bookings, the flights, the calendar the office works to, and what the trip price covers."],
      ]),
      source: src("school-trip-record"),
    },
    {
      slug: "risk-assessment-report",
      title: "Risk Assessment Report",
      reader: "Head of School and trip leader",
      decision: "Approving the trip",
      blurb:
        "Each of the trip's nine activity groups has its own section, with its hazards, controls, emergency actions and emergency care. The report closes with the questions the school asks each provider before departure and the prompts for the trip leader's live assessment. The school reviews, completes, amends and approves it.",
      cover: cover("risk-assessment-report", "Risk Assessment Report"),
      editions: editions("risk-assessment-report"),
      insidePages: inside("risk-assessment-report", "Risk Assessment Report", [
        [7, "The Routeburn Track section covers the turnaround, avalanche terrain and the swing bridges, each with its controls, and a map shows the route."],
        [9, "The Milford Sound section covers the avalanche zone on the Milford Road and the distance from help, and it closes with the emergency care for the day."],
      ]),
      source: src("trip-risk-working-file"),
    },
    {
      slug: "student-and-parent-trip-report",
      title: "Student and Parent Trip Report",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "The report opens with the letter home. It walks families through the week, the lodge and how to stay in touch. It then covers packing, fitness and the student agreement, and it ends with the consent and health form that families return to the school office.",
      cover: cover("student-and-parent-trip-report", "Student and Parent Trip Report"),
      editions: editions("student-and-parent-trip-report"),
      insidePages: inside("student-and-parent-trip-report", "Student and Parent Trip Report", [
        [2, "The letter to families opens the report, with the deposit, balance and departure dates across the top."],
        [3, "Families see the week day by day, the lodge, supervision and medical care, and how to stay in touch."],
      ]),
      source: src("family-trip-brief"),
    },
    {
      slug: "trip-leaders-brief",
      title: "Trip Leaders Brief",
      reader: "Trip leaders and chaperones",
      decision: "Preparing the trip leaders",
      blurb:
        "Each day of the trip has its own page, with the timetable, the head counts, what students carry and what to do if the day runs late. The brief closes with the Emergency Plan and a pocket emergency card. The chaperones carry the same brief.",
      cover: cover("trip-leaders-brief", "Trip Leaders Brief"),
      editions: editions("trip-leaders-brief"),
      insidePages: inside("trip-leaders-brief", "Trip Leaders Brief", [
        [8, "The Milford Sound day runs from the 7:00 coach to a return at about 21:00, and the page says what to do if the day runs late."],
        [12, "The Emergency Plan starts with a call to 111, then sets out the order of calls, the contacts and the nearest emergency departments on a map."],
      ]),
      source: src("trip-leader-day-book"),
    },
    {
      slug: "educational-travel-fieldbook",
      title: "Educational Travel Fieldbook",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb:
        "The fieldbook gives students one question for the week: how does a landscape made by ice decide how people live in it? They carry it on the three route days, write in its journal each route evening, and answer the question in a response after the trip.",
      cover: cover("educational-travel-fieldbook", "Educational Travel Fieldbook"),
      editions: editions("educational-travel-fieldbook"),
      insidePages: inside("educational-travel-fieldbook", "Educational Travel Fieldbook", [
        [4, "Each route day has its own map, its distance and climb, and the numbered places where students stop to look."],
        [5, "Students write a journal entry each route evening, and the response at the end answers the week's question."],
      ]),
      source: src("student-journey-guide"),
    },
    {
      slug: "post-trip-report",
      title: "Post Trip Report",
      reader: "School",
      decision: "Improving next year's trip",
      blurb:
        "The report sets out what students, families, the trip leaders and the provider said after the trip. It names three things to look at and what went well, for the school's review before the trip runs again next year.",
      cover: cover("post-trip-report", "Post Trip Report"),
      editions: editions("post-trip-report"),
      insidePages: inside("post-trip-report", "Post Trip Report", [
        [2, "This page shows who answered, and how students, parents, the trip leaders and the provider rated the trip, the plan and the days."],
      ]),
      source: src("post-trip-feedback-report"),
    },
  ],
  pdfSource: {
    letterDir: V3Q,
    a4Dir: `${V3Q}/a4`,
  },
};

// A V3: placeholder (or a bare "V3" caption) left in the data fails the
// build once READY is true, since no trip page exposes it to the copy check.
if (READY && /"V3[:"]/.test(JSON.stringify(queenstown))) {
  throw new Error("Queenstown: replace every V3 placeholder in src/content/versions/queenstown.ts before READY");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default READY ? queenstown : null;
