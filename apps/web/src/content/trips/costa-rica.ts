import { tripPaths } from "./helpers";
import type { Trip } from "./types";

/* Costa Rica (Horizon Ridge School of Cleveland), ported from the V3
   prototype (customers/hrs-cleveland/website/build_costa_rica_page.py,
   2026-09-22). Facts and captions checked against the issued PDFs of
   2026-09-24 and the trip record (customers/hrs-cleveland/trips/
   costa-rica-2027/costa-rica-trip-record.md). Page images rendered from the
   Letter PDFs by scripts/import-trip.py; A4 page numbers match Letter.
   Letter PDFs: customers/hrs-cleveland/outputs/pdf/hrsc-ot02-costa-rica-*.pdf;
   A4 PDFs: outputs/pdf/a4/ (never the *-trip-pack). Restore them locally with
   `npm run sync:trip-pdfs`. Hero: trips/costa-rica-2027/assets/photo-site-01-poas.jpg. */

const { base, cover, inside, editions } = tripPaths({
  slug: "costa-rica",
  filePrefix: "hrsc-ot02-costa-rica",
});

const costaRica: Trip = {
  slug: "costa-rica",
  title: "Costa Rica",
  h1: "The documents for a nine-day trip to Costa Rica.",
  school: "Horizon Ridge School of Cleveland",
  schoolType: "US",
  tripKind: "Service",
  tripType: "Overnight trip abroad, nine days",
  region: "Central America",
  dates: "Saturday, March 20 to Sunday, March 28, 2027",
  group: "20 tenth-grade students and four chaperones",
  paperDefault: "letter",
  lede:
    "Horizon Ridge School of Cleveland is taking twenty 10th graders to Costa Rica for nine days over spring break. ETI360 brought together the school's itinerary, the host operator's and the properties' arrangements, and the school's own procedures, checked the passport rule against Costa Rica's own entry requirements and the health guidance against the CDC, timed every road transfer and traced the boat leg along the canal, and found the emergency department for each of the three bases, with the travel time. Each document below is written for the person who uses it, and each opens in full.",
  summary:
    "A nine-day 10th grade service and ecology trip, by air through Miami, then by minibus and boat: the documents for the office, the trip leader and chaperones, families, teachers, students, and next year's planning.",
  facts: [
    { label: "Trip", value: "Costa Rica Service and Ecology Journey, Saturday, March 20 to Sunday, March 28, 2027" },
    {
      label: "Group",
      value: "20 tenth-grade students and four chaperones, one adult for every five students, in the same groups of five all week",
    },
    {
      label: "Program",
      value:
        "Poás Volcano National Park; a rainforest field study with the Selva Verde naturalists and the Tirimbina biologists, including river water quality and the bat program; a school-improvement project with the Sarapiquí Conservation Learning Center; the opening nights of the leatherback census at Pacuare Nature Reserve; a canal wildlife transect. Spanish is used every day and assessed.",
    },
    {
      label: "Travel",
      value:
        "Flights through Miami, then two minibuses with the host operator's own drivers for nine days. The coastal reserve has no road: the reserve's boats carry the group the last ten kilometers, about forty minutes each way",
    },
    {
      label: "Lodging",
      value:
        "Eight nights at three bases: an airport hotel in Alajuela on arrival and before the flight home, three nights at a rainforest lodge in Sarapiquí, and three at a coastal reserve with no mains electricity and no cell coverage",
    },
    { label: "School", value: "Horizon Ridge School of Cleveland, a fictional school" },
  ],
  hero: {
    src: `${base}/hero-poas.jpg`,
    width: 1100,
    height: 734,
    alt: "The crater lake at Poás Volcano National Park, a turquoise pool in a gray basin with forest on the slope above.",
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
      note: "The letter home, where the group sleeps each night, the passport and health requirements, and the forms that come back with the deposit.",
    },
    {
      title: "Preparing the leader and chaperones",
      note: "The airport days, day plans timed to the minibuses and the boats, the procedures, and the emergency department for each base, with the travel time.",
    },
    {
      title: "Connecting the trip to learning",
      note: "One inquiry question, carried from the classroom to six places and back.",
    },
    {
      title: "Improving next year's trip",
      note: "What students, families, the leaders, and the host operator said, set out for the school's review.",
    },
  ],
  documents: [
    {
      slug: "school-trip-record",
      title: "School Trip Record",
      reader: "School office",
      decision: "Approving the trip",
      blurb:
        "Trip facts and contacts, the travel documents, insurance, and health requirements, the reservations and trip calendar, and the flights, roads, and water. Filed with the host contract, the policy, passport copies, the roster, health records, and signed permission slips.",
      cover: cover("school-trip-record", "School Trip Record"),
      editions: editions("school-trip-record"),
      insidePages: inside("school-trip-record", "School Trip Record", [
        [2, "Trip facts, the contacts table, and the school's approval line."],
        [3, "Passports against Costa Rica's own entry rule, the insurance and its assistance line, and the health requirements the school sets, for families to take to their own physician."],
        [5, "Flights through Miami, the road legs between the three bases, and the one leg that is not a road: about ten kilometers by the reserve's boats."],
      ]),
    },
    {
      slug: "trip-risk-working-file",
      title: "Trip Risk Working File",
      reader: "The school, to review, complete, and approve",
      decision: "Approving the trip",
      blurb:
        "Hazards, controls, and emergency actions organized one section per activity group, from the flights and the host's road travel to the boat crossing and the night patrols, with the live-assessment prompts for the day. The school completes it, amends it, and approves it.",
      cover: cover("trip-risk-working-file", "Trip Risk Working File"),
      editions: editions("trip-risk-working-file"),
      insidePages: inside("trip-risk-working-file", "Trip Risk Working File", [
        [1, "The trip summary, the activity groups, and how the file is used: review, complete, approve, carry."],
        [11, "The rainforest field study: where the group works, then each risk with its controls, its emergency actions, and a starting rating the school can replace with its own."],
        [20, "Night patrols on the nesting beach: the boat-then-road route to the emergency department, with the travel time, the live-assessment prompts for the day, and the school's review lines."],
      ]),
    },
    {
      slug: "family-trip-brief",
      title: "Family Trip Brief",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "The letter home, the passport and insurance requirements, the nine days at a glance, where the group sleeps each night, the health requirements for families to take to their own physician, money and staying in touch, the packing list and student agreement, and the permission slip and health update that come back with the deposit.",
      cover: cover("family-trip-brief", "Family Trip Brief"),
      editions: editions("family-trip-brief"),
      insidePages: inside("family-trip-brief", "Family Trip Brief", [
        [2, "The letter home leads with the dates, the cost, and the day the permission slip is due, then explains what students will do at each place."],
        [4, "Where They Will Be: the three bases with the nights at each, where they sit in the country, and the one base that has no road to it."],
        [7, "The permission slip and health update, returned to the school office with the deposit by Friday, November 13."],
      ]),
    },
    {
      slug: "trip-leader-card",
      title: "Trip Leader Card",
      reader: "Trip leader and chaperones",
      decision: "Preparing the leader and chaperones",
      blurb:
        "Groups, contacts, and standards, the airport and travel days in both directions, day plans for all nine days, and the emergency plan: the emergency department for each of the three bases, with the travel time.",
      cover: cover("trip-leader-card", "Trip Leader Card"),
      editions: editions("trip-leader-card"),
      insidePages: inside("trip-leader-card", "Trip Leader Card", [
        [3, "The airport days: a head count at every fixed point in both directions, and the Miami connection on the way home, where the group spreads out."],
        [5, "The service day in Chilamate, then the crossing to the coast: lifejackets fitted and checked by a chaperone before anyone boards, and a patrol rotation in which nobody patrols two nights running."],
        [7, "The emergency plan: 911 and the action sequence first, then the emergency department for each base, with the travel time, and the boat-then-road route from the reserve."],
      ]),
    },
    {
      slug: "chaperone-briefing",
      title: "Chaperone Briefing and Pocket Emergency Card",
      reader: "Chaperones",
      decision: "Preparing the leader and chaperones",
      blurb:
        "For the adults who each take five students: their group and role, the head count, the nine days in brief, property, boat, and beach duties, and the four procedures, with a card to print, cut, and fold that carries the emergency sequence and every working number.",
      cover: cover("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card"),
      editions: editions("chaperone-briefing"),
      insidePages: inside("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card", [
        [1, "Each chaperone's group and role, the head-count rule, and what each of the nine days asks of them."],
        [2, "Property, boat, and beach duties, then the four procedures: a separated student, a student hurt or unwell, a security instruction or evacuation, a welfare or conduct concern."],
        [4, "The pocket emergency card at finished size: the 911 sequence and every working number on one side, the three emergency departments and the separated-student steps on the other."],
      ]),
    },
    {
      slug: "educational-journey",
      title: "Educational Journey",
      reader: "Teachers",
      decision: "Connecting the trip to learning",
      blurb:
        "One inquiry question, the six places day by day with a map for each day, what each day contributes to the biology and environmental science unit and to Spanish, and the field journal and assessment guide.",
      cover: cover("educational-journey", "Educational Journey"),
      editions: editions("educational-journey"),
      insidePages: inside("educational-journey", "Educational Journey", [
        [2, "Living Systems, Shared Work: the question students carry for nine days, the three strands, and the six places on one map."],
        [4, "Monday in the forest: the lodge's reserve, Tirimbina's bridges and plots, the river station, and the bat program, each with what students do there."],
        [7, "Learning by Day: what each day contributes to the unit, and the Spanish students use that day."],
      ]),
    },
    {
      slug: "student-journey-guide",
      title: "Student Journey Guide",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb:
        "The printed guide students carry for nine days: the question, the days ahead, how the group travels with a cut-out trip card, one page for each part of the trip with the map, the places, and the journal prompts, then the final synthesis and what a strong response does.",
      cover: cover("student-journey-guide", "Student Journey Guide"),
      editions: editions("student-journey-guide"),
      insidePages: inside("student-journey-guide", "Student Journey Guide", [
        [3, "How We Travel: the agreement in the student's own voice, the head counts, the days without signal at the reserve, and the trip card to cut out and carry."],
        [7, "Wednesday to Friday on the coast: the map, the nesting beach, the hatchery, and the canal in a student's words, and the journal prompt for the reserve."],
        [8, "After the Trip: the final synthesis due April 16, and the four points a strong response is judged on."],
      ]),
    },
    {
      slug: "post-trip-feedback-report",
      title: "Post-Trip Feedback Report",
      reader: "The school, after the trip",
      decision: "Improving next year's trip",
      blurb:
        "Four questions asked of students, parents, the leaders, and the host operator after the trip: what each group said, the moments that did not go to plan with the day they belong to, and what in the trip each one touches. It states; it does not recommend.",
      cover: cover("post-trip-feedback-report", "Post-Trip Feedback Report"),
      editions: editions("post-trip-feedback-report"),
      insidePages: inside("post-trip-feedback-report", "Post-Trip Feedback Report", [
        [1, "What people said: the three rated questions as labeled distributions for each group, and the three most-raised moments with their day and a quote."],
        [2, "For the school's review: what the responses show and what in the trip each touches, who answered, and where parents and students differed, with no recommendation."],
        [4, "The moments people raised, each with its day, whether it points at the plan or at how the day was run, and the words as written."],
      ]),
    },
  ],
  pdfSource: {
    letterDir: "customers/hrs-cleveland/outputs/pdf",
    a4Dir: "customers/hrs-cleveland/outputs/pdf/a4",
  },
};

export default costaRica;
