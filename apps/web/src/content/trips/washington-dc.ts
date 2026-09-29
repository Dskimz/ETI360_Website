import { tripPaths } from "./helpers";
import type { Trip } from "./types";

/* Washington, DC (Horizon Ridge School of Cleveland), ported from the V3
   prototype (customers/hrs-cleveland/website/build_washington_dc_page.py,
   2026-09-22). Letter PDFs: customers/hrs-cleveland/outputs/pdf/; A4 PDFs:
   outputs/pdf/a4/ (2026-09-24, V3 ADR-024). Restore them locally with
   `npm run sync:trip-pdfs`.

   Hospital wording (V3 ADR-025, Dan 2026-09-25): ETI360 lists the emergency
   departments; the school confirms which one the group uses. The pages of
   the Working File were re-cut on 2026-09-27 from the 2026-09-25 re-renders,
   and the copy below describes a list, never a choice made by ETI360.

   Look inside (2026-09-29, review fix, as Italy's): the Working File's, the
   Chaperone Briefing's and the Post-Trip Feedback Report's first inside page
   was page 1, which repeats the cover; each is now a real inside page
   (pages 2, 3 and 3), rendered from the Letter PDF by scripts/import-trip.py
   at the standard size, and the Feedback Report's note that its responses
   are examples moved to its first caption. [draft] captions, tone-reviewed. */

const { base, cover, inside, editions } = tripPaths({
  slug: "washington-dc",
  filePrefix: "hrsc-ot01-washington-dc",
});

const washingtonDc: Trip = {
  slug: "washington-dc",
  product: "trip-package",
  title: "Washington, DC",
  h1: "The documents for a five-day trip to Washington, DC.",
  school: "Horizon Ridge School of Cleveland",
  schoolType: "US",
  tripKind: "City",
  tripType: "Overnight trip, five days",
  region: "Washington, DC",
  place: "Washington, DC",
  dates: "Wednesday, April 14 to Sunday, April 18, 2027",
  group: "30 eighth-grade students and six chaperones",
  paperDefault: "letter",
  lede:
    "Horizon Ridge School of Cleveland is taking thirty eighth graders to Washington, DC, for five days in April. ETI360 brought together the school's itinerary, the bus and hotel confirmations, and the school's own procedures, checked group entry and bag rules against each venue's own guidance, timed every drive for a motorcoach, and listed the emergency departments by drive time from each place; the school confirms which one the group uses. Each document below is written for the person who uses it, and each opens in full.",
  summary:
    "A five-day eighth-grade trip by charter bus: the documents for the office, the trip leader and chaperones, families, teachers, students, and next year's planning.",
  facts: [
    { label: "Trip", value: "Washington, DC Civic Journey, Wednesday, April 14 to Sunday, April 18, 2027" },
    { label: "Group", value: "30 eighth-grade students and six chaperones, one adult for every five students" },
    {
      label: "Program",
      value:
        "Fourteen sites over three days: the National Archives, the U.S. Capitol, the Library of Congress, the Supreme Court, two Smithsonian museums, four memorials at dusk, Arlington, the Portrait Gallery, Lafayette Square, and the White House",
    },
    { label: "Travel", value: "Charter bus, 372 miles each way, with a rested second driver team for the overnight ride home" },
    { label: "Lodging", value: "Three nights in College Park, Maryland" },
    { label: "School", value: "Horizon Ridge School of Cleveland, a fictional school" },
  ],
  hero: {
    src: `${base}/hero-capitol.jpg`,
    width: 1400,
    height: 656,
    alt: "The west front of the U.S. Capitol seen across the lawn from the National Mall.",
  },
  disclosure:
    "Horizon Ridge School of Cleveland is a fictional school; its location is shown for illustrative purposes.",
  decisions: [
    {
      title: "Approving the trip",
      note: "The record the office files, and the Trip Risk Working File for the school to review, complete, and approve.",
    },
    {
      title: "Telling families",
      note: "The letter home, the days at a glance, and the forms that come back with the deposit.",
    },
    {
      title: "Preparing the leader and chaperones",
      note: "Day plans timed to the bus, the procedures, and the emergency departments by drive time from each place.",
    },
    {
      title: "Connecting the trip to learning",
      note: "One inquiry question, carried from the classroom to every site and back.",
    },
    {
      title: "Improving next year's trip",
      note: "What students, families, the leaders, and the bus company said, set out for the school's review.",
    },
  ],
  documents: [
    {
      slug: "school-trip-record",
      title: "School Trip Record",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "Trip facts, contacts, and the approval line, then reservations, the trip calendar, and transportation. Filed with the contracts, confirmations, roster, and signed permission slips.",
      cover: cover("school-trip-record", "School Trip Record"),
      editions: editions("school-trip-record"),
      insidePages: inside("school-trip-record", "School Trip Record", [
        [2, "Trip facts, the contacts table, and the school's approval line."],
        [3, "Every reservation with where its confirmation is held, the hotel plan, and the trip calendar."],
        [4, "The 372-mile route with its three rest stops, the outbound schedule, and the rules on the bus."],
      ]),
    },
    {
      slug: "trip-risk-working-file",
      title: "Trip Risk Working File",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "Hazards, controls, and emergency actions organized one section per activity group, with the live-assessment prompts for the day. The school completes it, amends it, and approves it.",
      cover: cover("trip-risk-working-file", "Trip Risk Working File"),
      editions: editions("trip-risk-working-file"),
      insidePages: inside("trip-risk-working-file", "Trip Risk Working File", [
        [2, "The scales every risk is rated on, which the school may replace with its own, the review and sign-off, and what the school confirms with the bus company and the hotel before the trip."],
        [3, "Charter bus travel, one section per activity group: each risk with its controls, its emergency actions, and a rating the school can change."],
        [8, "Hotel overnight stays: the emergency department near the hotel, with the drive time and the route, the live-assessment prompts for the day, and the school's review lines."],
      ]),
    },
    {
      slug: "family-trip-brief",
      title: "Family Trip Brief",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "The letter home, the five days at a glance, how students are supervised, the packing list, the student agreement, and the permission slip and health update that come back with the deposit.",
      cover: cover("family-trip-brief", "Family Trip Brief"),
      editions: editions("family-trip-brief"),
      insidePages: inside("family-trip-brief", "Family Trip Brief", [
        [2, "The letter home leads with the dates, the cost, and the day the permission slip is due, then explains what students will learn."],
        [3, "The five days at a glance, the bus and the hotel from a family's side, staying in touch, Sunday pickup, and the cost."],
        [5, "The permission slip and health update, returned to the school office in a sealed envelope with the deposit."],
      ]),
    },
    {
      slug: "trip-leader-card",
      title: "Trip Leader Card",
      reader: "Trip leader",
      decision: "Preparing the leader and chaperones",
      blurb:
        "Groups, contacts, and standards, four day plans timed to the bus, the overnight return with its rest stops, and the emergency plan: the emergency departments by drive time from each place.",
      cover: cover("trip-leader-card", "Trip Leader Card"),
      editions: editions("trip-leader-card"),
      insidePages: inside("trip-leader-card", "Trip Leader Card", [
        [3, "Day plans timed to the bus. Each move has a time and a head count, and the day has a fallback: if Thursday runs late, the Supreme Court stop is the one to drop."],
        [5, "The overnight ride home: a rested second driver team, four rest stops at named service plazas, and a chaperone watch rota."],
        [6, "The emergency plan: the action sequence first, then the emergency departments with their drive times and the route, one in Washington and one near the hotel."],
      ]),
    },
    {
      slug: "chaperone-briefing",
      title: "Chaperone Briefing and Pocket Emergency Card",
      reader: "Chaperones",
      decision: "Preparing the leader and chaperones",
      blurb:
        "Three pages for the adults who each take five students: their role, the head count, the daily rhythm, hotel and bus duties, and the four procedures, with a card to print, cut, and fold that carries the emergency sequence and every working number.",
      cover: cover("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card"),
      editions: editions("chaperone-briefing"),
      insidePages: inside("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card", [
        [2, "Hotel and bus duties, then the four procedures: a separated student, a student hurt or unwell, a security instruction, a behavior or welfare concern."],
        [3, "Screening and conduct at the sites, phones and messages, what each chaperone carries, and the working contacts, above the line each chaperone signs at the April 9 briefing."],
        [4, "The pocket emergency card at finished size, printed and folded: the 911 sequence and every working number on one side, the emergency departments and the separated-student steps on the other."],
      ]),
    },
    {
      slug: "educational-journey",
      title: "Educational Journey",
      reader: "Teachers",
      decision: "Connecting the trip to learning",
      blurb:
        "One inquiry question, the fourteen sites day by day with a map and a photograph for each, the learning at every site, and the field journal and assessment guide.",
      cover: cover("educational-journey", "Educational Journey"),
      editions: editions("educational-journey"),
      insidePages: inside("educational-journey", "Educational Journey", [
        [2, "Democracy in Place: the question students carry all week, the three strands, and the fourteen sites on one map."],
        [4, "Friday on the National Mall: two museums by day, four memorials at dusk, each with what students do there."],
        [6, "Learning by Day: what students do, learn, and record at every site, with the work before and after the trip."],
      ]),
    },
    {
      slug: "student-journey-guide",
      title: "Student Journey Guide",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb:
        "The printed guide students carry all week: the question, the week ahead, how the group travels with a cut-out trip card, one page per day with the map, the sites, and journal prompts with room to write, then the final synthesis and grading guide.",
      cover: cover("student-journey-guide", "Student Journey Guide"),
      editions: editions("student-journey-guide"),
      insidePages: inside("student-journey-guide", "Student Journey Guide", [
        [3, "How We Travel: the agreement in the student's own voice, head counts and buddies, the daily backpack, and the trip card to cut out and carry."],
        [5, "Friday in the guide: the same map, the sites in a student's words, and the three prompts with room to write at the site."],
        [7, "After the Trip: the final synthesis for the closing seminar, the assignment due April 30, and the four-point guide teachers grade with."],
      ]),
    },
    {
      slug: "post-trip-feedback-report",
      title: "Post-Trip Feedback Report",
      reader: "After the trip",
      decision: "Improving next year's trip",
      blurb:
        "Four questions asked of students, parents, the leaders, and the bus company after the trip: what each group said, the moments that did not go to plan with the day they belong to, and what in the trip each one touches. It states; it does not recommend.",
      cover: cover("post-trip-feedback-report", "Post-Trip Feedback Report"),
      editions: editions("post-trip-feedback-report"),
      insidePages: inside("post-trip-feedback-report", "Post-Trip Feedback Report", [
        [2, "For the school's review, with example responses because the trip has not yet run: three sentences on what the responses show and what in the trip each touches, with no recommendation."],
        [3, "The three rated questions as each group was asked them, with the answers at each step of the scale; the leaders and the bus company appear in the words they chose, and the means are printed only for year-on-year comparison."],
        [4, "The moments people raised, each with its day, whether it points at the plan or at how the day was run, and the words as written."],
      ]),
    },
  ],
  pdfSource: {
    letterDir: "customers/hrs-cleveland/outputs/pdf",
    a4Dir: "customers/hrs-cleveland/outputs/pdf/a4",
  },
};

export default washingtonDc;
