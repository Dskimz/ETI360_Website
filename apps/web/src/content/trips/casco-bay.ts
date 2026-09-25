import { tripPaths } from "./helpers";
import type { Trip } from "./types";

/* Casco Bay Sea Kayaking Journey (Tideline School, Portland, Maine; V3 trip
   TDL-POR-OT02), built to the Tideline School Document Style Guide v1.0.
   Facts and captions come from the nine documents and the V3 trip record
   (customers/tideline-school/trips/casco-bay-2027/casco-bay-trip-record.md).
   Letter PDFs: customers/tideline-school/outputs/pdf/; A4 PDFs: outputs/pdf/a4/.
   Restore them locally with `npm run sync:trip-pdfs`. No photograph is placed in
   the Canva set yet, so the hero is the week's overview map from the Educational
   Journey (trips/casco-bay-2027/assets/casco-overview.png). Page images were
   rendered from the Letter PDFs with scripts/import-trip.py (2026-09-24/25). */

const { base, cover, inside, editions } = tripPaths({
  slug: "casco-bay",
  filePrefix: "tdl-por-ot02-casco-bay",
});

const cascoBay: Trip = {
  slug: "casco-bay",
  title: "Casco Bay",
  h1: "The documents for a five-day trip to Casco Bay.",
  school: "Tideline School",
  schoolType: "US",
  tripKind: "Outdoor",
  tripType: "Sea kayaking journey, five days and four nights",
  region: "Maine coast",
  dates: "Monday, August 16 to Friday, August 20, 2027",
  group: "20 tenth-grade students and four chaperones in two pods, each with two of the outfitter's guides",
  paperDefault: "letter",
  lede:
    "Tideline School in Portland, Maine runs a five-day sea kayaking journey on Casco Bay for its 10th grade summer program: 23.8 miles in two-person kayaks from East End Beach in Portland to Little Chebeague Island and Jewell Island and back, with four nights camping on the two state-owned islands. ETI360 brought together the school's plan, the islands' published rules, and NOAA's tide and current predictions for these dates, measured each day's distance and time on the water from the route itself, timed every crossing to a window near slack water or on weak current, and found the emergency department for each place, with the travel time by water and by road. Each document below is written for the person who uses it, and each opens in full.",
  summary:
    "A five-day 10th grade sea kayaking journey on Casco Bay: the documents for the office, the trip leader and chaperones, families, teachers, students, and next year's planning.",
  facts: [
    { label: "Trip", value: "Casco Bay Sea Kayaking Journey, Monday, August 16 to Friday, August 20, 2027" },
    {
      label: "Group",
      value:
        "20 tenth-grade students and four chaperones in two pods, each pod ten students, two chaperones, and two of the outfitter's guides",
    },
    {
      label: "Program",
      value:
        "Grade 10 summer program in marine science and the outdoor education requirement, with the unit A Bay We Can Measure",
    },
    {
      label: "On the water",
      value: "23.8 miles (20.7 nautical miles) over five days in two-person sea kayaks, each crossing timed to a window of weak current",
    },
    {
      label: "Nights",
      value: "Camping on state-owned islands: Little Chebeague Island on Monday and Tuesday, Jewell Island on Wednesday and Thursday",
    },
    {
      label: "Guides",
      value: "Registered Maine Guides holding the Specialized Sea-Kayaking classification, with a support boat and its own operator",
    },
    {
      label: "Travel",
      value: "Coach from school to East End Beach on Monday morning, and home on Friday by way of dinner on Commercial Street",
    },
    { label: "School", value: "Tideline School, Portland, Maine, a fictional school" },
  ],
  hero: {
    src: `${base}/hero-casco-bay.jpg`,
    width: 1400,
    height: 887,
    alt: "Map of the five paddling days on Casco Bay, from the launch at East End Beach in Portland to the camps on Little Chebeague Island and Jewell Island, and back.",
  },
  heroCredit: "Route map from the Educational Journey. Map data © Mapbox, © OpenStreetMap.",
  disclosure: "Tideline School is a fictional school; its location is shown for illustrative purposes.",
  decisions: [
    {
      title: "Approving the trip",
      note: "The record the office files, and the Trip Risk Working File for the school to review, complete, and approve.",
    },
    {
      title: "Telling families",
      note: "What the week asks, the cold water and the weather, camping on the islands, what to pack, and the permission and health form that comes back with the deposit.",
    },
    {
      title: "Preparing the leader and chaperones",
      note: "A Route Intelligence page for each paddling day, the crossing windows, the weather holds, the procedures, and the emergency department for each place, with the travel time by water and by road.",
    },
    {
      title: "Timing each paddling day",
      note: "How much light each day has, what the tide and current do on each crossing, and how long the group is exposed on open water.",
    },
    {
      title: "Connecting the trip to learning",
      note: "The unit A Bay We Can Measure: the water and weather measured every day, two shore transects, and the report students write when they are home.",
    },
    {
      title: "Improving next year's trip",
      note: "What students, parents, the chaperones, and the outfitter said, set out for the school's review.",
    },
  ],
  documents: [
    {
      slug: "school-trip-record",
      title: "School Trip Record",
      reader: "School office",
      decision: "Approving the trip",
      blurb:
        "The office copy: the trip in one place, the people who run it, the outfitter and the guides, the islands and their rules, emergency care, the cost, and what research changed in the plan and why.",
      cover: cover("school-trip-record", "School Trip Record"),
      editions: editions("school-trip-record"),
      insidePages: inside("school-trip-record", "School Trip Record", [
        [2, "The trip in one page: dates, program, group, the trip leader and the school contact at any hour, and the five days with their distance and where the group sleeps."],
        [4, "Camping on state-owned islands: the sites on Little Chebeague and Jewell, and each island rule beside what the plan does about it, from first-come sites to no campfires."],
        [7, "What research changed: two islands in place of one, two camps of fourteen, no campfires, a route clear of the main ship channel, and a long Friday kept on purpose."],
      ]),
    },
    {
      slug: "trip-risk-working-file",
      title: "Trip Risk Working File",
      reader: "The school, to review, complete, and approve",
      decision: "Approving the trip",
      blurb:
        "Hazards, controls, and emergency actions organized one section per activity group, from the coach and the beach to the crossings, the island camps, the shore study, and weather holds, with the live-assessment prompts for the trip leader and the guides. The school reviews it, completes it, amends it, and approves it.",
      cover: cover("trip-risk-working-file", "Trip Risk Working File"),
      editions: editions("trip-risk-working-file"),
      insidePages: inside("trip-risk-working-file", "Trip Risk Working File", [
        [2, "How the file is used: the forms of risk documentation it supports, how the prepared ratings are written, and who makes the live assessment."],
        [8, "Cold water after a capsize and tidal current on the crossings: the controls in place, the prepared ratings before and with them, and the emergency actions, with a blank column for the school."],
        [13, "The checks on the day for paddling and crossings: conditions, group readiness, equipment, and supervision, with space for the school to record them."],
      ]),
    },
    {
      slug: "family-trip-brief",
      title: "Family Trip Brief",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "What the week is and what the paddling asks, the cold water and the weather, camping on the islands, what to pack and what it costs, how families hear from the school, and the permission and health form that returns with the deposit.",
      cover: cover("family-trip-brief", "Family Trip Brief"),
      editions: editions("family-trip-brief"),
      insidePages: inside("family-trip-brief", "Family Trip Brief", [
        [3, "The week on the water, how the trip handles cold water, and what happens when fog or wind changes the plan."],
        [5, "What to pack for the water and for camp, what the outfitter supplies, and why families call the school, not the trip."],
        [7, "The permission and health form, returned to the school office with the water-activity consent, the swim assessment, and the deposit."],
      ]),
    },
    {
      slug: "trip-leader-card",
      title: "Trip Leader Card",
      reader: "Trip leader and chaperones",
      decision: "Preparing the leader and chaperones",
      blurb:
        "Pods, contacts, and standards on the water, the week in outline, a Route Intelligence page for each paddling day with its crossings and their windows, the weather holds and the radio plan, and the emergency plan.",
      cover: cover("trip-leader-card", "Trip Leader Card"),
      editions: editions("trip-leader-card"),
      insidePages: inside("trip-leader-card", "Trip Leader Card", [
        [10, "Monday's bail-out and boat access, what the guides watch, the radio plan, light and tide, and the emergency department for the day, with the travel time by water and by road."],
        [18, "Friday's Route Intelligence page: distance, time on the water at the group's pace, tide, and sunset, with the route from Jewell Island past Andrews Beach to East End Beach and its crossings numbered in order."],
        [22, "The weather holds: what happens in fog, under a small craft advisory, or with thunder, when a crossing cannot run, and how the pods and the support boat keep in touch by radio."],
      ]),
    },
    {
      slug: "chaperone-briefing",
      title: "Chaperone Briefing and Pocket Card",
      reader: "Chaperones",
      decision: "Preparing the leader and chaperones",
      blurb:
        "For the chaperones, who keep the same pod of students all week: the pod and the shape of a paddling day, what to do when something happens, the calls in order, and a pocket card to carry in a life jacket.",
      cover: cover("chaperone-briefing", "Chaperone Briefing and Pocket Card"),
      editions: editions("chaperone-briefing"),
      insidePages: inside("chaperone-briefing", "Chaperone Briefing and Pocket Card", [
        [2, "Each chaperone's pod and place on the water, and the shape of a paddling day from the count before launch to lights out at camp."],
        [3, "What to do after a capsize, for a student who is cold, in fog or wind, and for a student who cannot go on, then the calls in order."],
        [4, "The pocket card: the call order and the numbers, the emergency department, the islands for each night, and the signs that mean off the water at once."],
      ]),
    },
    {
      slug: "daylight-tide-and-exposure-report",
      title: "Daylight, Tide and Exposure Report",
      reader: "Trip leader and guides",
      decision: "Timing each paddling day",
      blurb:
        "How much light each paddling day has, what the tide and current do on each crossing, and how long the group is exposed on open water, from NOAA's predictions for these dates. On this trip fog, wind, and the current windows, not the light, set the limits.",
      cover: cover("daylight-tide-and-exposure-report", "Daylight, Tide and Exposure Report"),
      editions: editions("daylight-tide-and-exposure-report"),
      insidePages: inside("daylight-tide-and-exposure-report", "Daylight, Tide and Exposure Report", [
        [2, "Sun times for each day and the margin after the group is off the water: the smallest is Friday's, 4.6 hours before sunset."],
        [5, "Every crossing with its length, its window, and the strongest current predicted inside it; none is above 0.8 knots."],
        [6, "Exposure by day: time afloat, minutes on open crossings, and the longest crossing, with Friday the most exposed, and the water a student would be in after a capsize, a mean of 63.5°F for these dates."],
      ]),
    },
    {
      slug: "educational-journey",
      title: "Educational Journey",
      reader: "Teachers",
      decision: "Connecting the trip to learning",
      blurb:
        "The unit A Bay We Can Measure, what each paddling day teaches, a page for each day with its route, map, and tide, the two shore transects, the daily journal, and the report students write after the trip.",
      cover: cover("educational-journey", "Educational Journey"),
      editions: editions("educational-journey"),
      insidePages: inside("educational-journey", "Educational Journey", [
        [2, "What the week teaches: questions on the warming Gulf of Maine, life on the shore, who uses the bay, and the islands' Second World War history."],
        [8, "Wednesday's day page: distance, time on the water, tide, and sunset, the route from Little Chebeague to Jewell Island, and Jewell as a wartime fort."],
        [14, "The field studies: the same transect on Tuesday's sheltered flats and Thursday's open rock, safety on the shore as the tide turns, and the journal."],
      ]),
    },
    {
      slug: "student-journey-guide",
      title: "Student Journey Guide",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb:
        "The guide students carry all week in a dry bag: the week and the rules on the water, camp, cold and sun, a page for each day with its map, crossings, and stops, the questions for the journal, and a trip card to cut out and carry.",
      cover: cover("student-journey-guide", "Student Journey Guide"),
      editions: editions("student-journey-guide"),
      insidePages: inside("student-journey-guide", "Student Journey Guide", [
        [2, "Your week: the five days in a student's words, where you paddle and sleep, and the rules on the water, from a zipped life jacket to a paddle raised straight up."],
        [4, "Camp, cold, and sun, and the trip card to cut out and keep in a life jacket pocket."],
        [13, "Friday in the guide: the numbers for the longest day, the map home from Jewell Island, and each crossing with its length and time."],
      ]),
    },
    {
      slug: "post-trip-feedback-report",
      title: "Post-Trip Feedback Report",
      reader: "The school, after the trip",
      decision: "Improving next year's trip",
      blurb:
        "Four questions asked of students, parents, the chaperones, and the outfitter two weeks after the trip, how the answers are read, and the parts of this plan most likely to come up, named in advance.",
      cover: cover("post-trip-feedback-report", "Post-Trip Feedback Report"),
      editions: editions("post-trip-feedback-report"),
      insidePages: inside("post-trip-feedback-report", "Post-Trip Feedback Report", [
        [2, "The four questions, asked once, two weeks after the group is home, in each group's own words."],
        [4, "What the report looks like, with example figures because the trip has not yet run: labeled distributions for each question, students beside parents."],
        [6, "The open question for every group, and the parts of this plan most likely to come up: Monday morning, a weather hold, and Friday's 8.6 miles."],
      ]),
    },
  ],
  pdfSource: {
    letterDir: "customers/tideline-school/outputs/pdf",
    a4Dir: "customers/tideline-school/outputs/pdf/a4",
  },
};

export default cascoBay;
