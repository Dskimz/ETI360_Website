import { tripPaths } from "./helpers";
import type { Trip } from "./types";

/* White Mountains Hut-to-Hut Trek (Tideline School, Portland, Maine; V3 trip
   TDL-POR-OT01), built to the Tideline School Document Style Guide v1.0.
   Facts and captions come from the nine documents and the V3 trip record
   (customers/tideline-school/trips/white-mountains-2027/white-mountains-trip-record.md).
   Letter PDFs: customers/tideline-school/outputs/pdf/; A4 PDFs: outputs/pdf/a4/.
   Restore them locally with `npm run sync:trip-pdfs`. No photograph is placed in
   the Canva set yet, so the hero is the route overview map from the Educational
   Journey (trips/white-mountains-2027/assets/wm-trek-overview.png). Page images
   were rendered from the Letter PDFs with scripts/import-trip.py (2026-09-24;
   School Trip Record p. 3 and Working File p. 6 on 2026-09-25, replacing pages
   that print "designated emergency department"). */

const { base, cover, inside, editions } = tripPaths({
  slug: "white-mountains",
  filePrefix: "tdl-por-ot01-white-mountains",
});

const whiteMountains: Trip = {
  slug: "white-mountains",
  title: "White Mountains",
  h1: "The documents for a four-day trip to the White Mountains.",
  school: "Tideline School",
  schoolType: "US",
  tripKind: "Outdoor",
  tripType: "Hut-to-hut trek, four days and three nights",
  region: "New Hampshire",
  dates: "Tuesday, September 7 to Friday, September 10, 2027",
  group: "20 ninth-grade students, four trail adults, and a valley support adult",
  paperDefault: "letter",
  lede:
    "Tideline School in Portland, Maine, is starting the ninth-grade year with a four-day hut-to-hut trek in the White Mountains of New Hampshire: 20.9 miles on the Appalachian Trail and its approach trails from Franconia Notch to Crawford Notch, with three nights in the Appalachian Mountain Club's huts. ETI360 brought together the school's plan, the huts' published information, and the national forest's rules, measured each day's distance, climb, and daylight from the route itself, checked the plan against the wilderness boundary and the roads, and found the emergency department for each place, with the drive time from every trailhead. Each document below is written for the person who uses it, and each opens in full.",
  summary:
    "A four-day ninth-grade hut-to-hut trek on the Appalachian Trail: the documents for the office, the trip leader and trail adults, families, teachers, students, and next year's planning.",
  facts: [
    { label: "Trip", value: "White Mountains Hut-to-Hut Trek, Tuesday, September 7 to Friday, September 10, 2027" },
    {
      label: "Group",
      value:
        "20 ninth-grade students and four trail adults, one adult for every five students, walking as two parties of twelve; a fifth adult in the valley",
    },
    {
      label: "Program",
      value:
        "Outdoor education, with a science and history unit on the White Mountains: alpine ecology, the Appalachian Trail, and the history of the huts",
    },
    {
      label: "On foot",
      value: "20.9 miles and 8,710 feet of climb over four days, above treeline on Wednesday and Thursday mornings",
    },
    { label: "Nights", value: "Three nights in the Appalachian Mountain Club's huts: Greenleaf, Galehead, and Zealand Falls" },
    {
      label: "Travel",
      value:
        "Charter coach out to Franconia Notch and home from Crawford Notch, with a coach on call on Wednesday and Thursday mornings for the weather routes",
    },
    { label: "School", value: "Tideline School, Portland, Maine, a fictional school" },
  ],
  hero: {
    src: `${base}/hero-route.jpg`,
    width: 1400,
    height: 653,
    alt: "Map of the four-day route from Lafayette Place in Franconia Notch past Greenleaf, Galehead, and Zealand Falls huts to Crawford Depot, each day drawn in alternating blue and brick.",
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
      note: "What each day asks, the huts, what to pack, and the consent, fitness, and health forms that come back with the deposit.",
    },
    {
      title: "Preparing the leader and trail adults",
      note: "A Route Intelligence page for each hiking day, the weather call and the turn-back triggers, the procedures, and the emergency department for each place, with the drive time.",
    },
    {
      title: "Timing each hiking day",
      note: "How much light each day has, how the planned day sits inside it, and how much of each route is open ground above the trees.",
    },
    {
      title: "Connecting the trip to learning",
      note: "The unit Above the Trees: questions carried from the forest to the alpine ridge and back to class.",
    },
    {
      title: "Improving next year's trip",
      note: "What students, parents, the trip leaders, and the hut crews said, set out for the school's review.",
    },
  ],
  documents: [
    {
      slug: "school-trip-record",
      title: "School Trip Record",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "The office copy: the trip in one place, the people who run it, the huts, the coach and the permits, the emergency care, the cost, and what the research found and how the plan changed.",
      cover: cover("school-trip-record", "School Trip Record"),
      editions: editions("school-trip-record"),
      insidePages: inside("school-trip-record", "School Trip Record", [
        [2, "The trip in one page: dates, program, group and ratio, the leader and the school contact at any hour, and the four days with their distance and climb."],
        [3, "Huts, transport and permits: the three hut nights with their beds and what each hut provides, the meal times and the season, what the booking asks of the Appalachian Mountain Club, and the coach."],
        [7, "What the research found and how the plan changed: two parties of twelve, a longer coach time, a Friday exit on a paved road at Crawford Notch, a fifth adult in the valley, and measured distances shorter than the published ones."],
      ]),
    },
    {
      slug: "trip-risk-working-file",
      title: "Trip Risk Working File",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "Hazards, controls, and emergency actions organized one section per activity group, from the coach and the hut nights to the open ridge and rescue in the backcountry, with the live-assessment prompts for the trip leader. The school reviews it, completes it, amends it, and approves it.",
      cover: cover("trip-risk-working-file", "Trip Risk Working File"),
      editions: editions("trip-risk-working-file"),
      insidePages: inside("trip-risk-working-file", "Trip Risk Working File", [
        [6, "What the school confirms with the huts, the coach operator, the ranger district, and the state park before the trip, with a line for who confirmed it and when."],
        [22, "Above treeline on Mount Lafayette and the Twinway: when and where the group is on open ground, the supervision, the emergency care, and lightning on an open ridge, rated before and with its controls."],
        [26, "The road access from Wednesday's exit trailheads to Littleton Regional Healthcare, and the checks the trip leader makes on the day, with the turnaround time for each summit."],
      ]),
    },
    {
      slug: "family-trip-brief",
      title: "Family Trip Brief",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "What the trek is and what the walking asks, the huts and how families hear from the school, what to pack and what it costs, then the backcountry consent, fitness confirmation, and health update that return with the deposit.",
      cover: cover("family-trip-brief", "Family Trip Brief"),
      editions: editions("family-trip-brief"),
      insidePages: inside("family-trip-brief", "Family Trip Brief", [
        [2, "What the trek is: the four days with their distance and climb, what the walking asks of a student, and how the leader reads the mountain forecast each ridge morning."],
        [3, "The huts from a family's side, food and allergies, reaching the group through the school, and the coach times at each end."],
        [5, "The backcountry consent, returned to the school office with the deposit: walking above treeline, three hut nights, the coach, and emergency treatment."],
      ]),
    },
    {
      slug: "trip-leader-card",
      title: "Trip Leader Card",
      reader: "Trip leader",
      decision: "Preparing the leader and trail adults",
      blurb:
        "Parties, contacts, and standards, the week in outline, a Route Intelligence page for each hiking day, the communication plan and the weather decision, and the emergency plan. Every trail adult carries a copy.",
      cover: cover("trip-leader-card", "Trip Leader Card"),
      editions: editions("trip-leader-card"),
      insidePages: inside("trip-leader-card", "Trip Leader Card", [
        [11, "Wednesday's Route Intelligence page: distance, climb, moving time at a school group's pace, and sunset, with the route from Greenleaf Hut over Mount Lafayette and Garfield Ridge to Galehead Hut."],
        [14, "Wednesday's exits and road access, water, light and tree cover, and the emergency department for the day, with the drive time from each exit trailhead."],
        [25, "The emergency plan: the action sequence first, search and rescue in New Hampshire, and the emergency department nearest by road to every trailhead on the trek."],
      ]),
    },
    {
      slug: "chaperone-briefing",
      title: "Chaperone Briefing and Pocket Card",
      reader: "Trail adults",
      decision: "Preparing the leader and trail adults",
      blurb:
        "For the adults who each take five students all week: their group and place in the party, the shape of a hut-to-hut day, what to do when something happens, the calls in order, and a pocket card to cut out and carry.",
      cover: cover("chaperone-briefing", "Chaperone Briefing and Pocket Card"),
      editions: editions("chaperone-briefing"),
      insidePages: inside("chaperone-briefing", "Chaperone Briefing and Pocket Card", [
        [2, "Each adult's group and place on the trail, the valley support adult's role, and the shape of every hiking day from the hut to the ridge and back."],
        [3, "What to do after a fall, for a student who is cold, a student who cannot continue, and a student who is missing, then the calls in order."],
        [4, "The pocket card: the call order, every working number, the emergency department, the huts, and the conditions that send the group down, not on."],
      ]),
    },
    {
      slug: "daylight-and-cover-report",
      title: "Daylight and Cover Report",
      reader: "Trip leader",
      decision: "Timing each hiking day",
      blurb:
        "How much light each hiking day has, how the planned day sits inside it, and how much of each route is open ground, with each day's elevation profile and the tree cover along the route. On this trek the ridge weather, not the light, sets the limits.",
      cover: cover("daylight-and-cover-report", "Daylight and Cover Report"),
      editions: editions("daylight-and-cover-report"),
      insidePages: inside("daylight-and-cover-report", "Daylight and Cover Report", [
        [2, "Sun times for each day and the planned day against the light: the smallest margin is Wednesday's, 3.2 hours before sunset on the longest day."],
        [4, "Wednesday's elevation profile, the stretch above 4,500 feet, and the tree canopy along the route, mile by mile."],
        [5, "What the canopy figure does not show: the survey counts the low, wind-stunted spruce of the high ridge as cover, so the exposure is named from the ground."],
      ]),
    },
    {
      slug: "educational-journey",
      title: "Educational Journey",
      reader: "Teachers",
      decision: "Connecting the trip to learning",
      blurb:
        "The unit Above the Trees, what each hiking day teaches, a Route Intelligence page for each day, the field study at each hut, the evening reflection, and the field report students write after the trek.",
      cover: cover("educational-journey", "Educational Journey"),
      editions: editions("educational-journey"),
      insidePages: inside("educational-journey", "Educational Journey", [
        [2, "What the trek teaches: questions on the forest zones, the Appalachian Trail, and the huts, each tied to what students record on the trail."],
        [4, "The route and the learning by day: the four days on one map, from Lafayette Place to Crawford Depot, each with its learning focus."],
        [12, "Thursday's field study at Zealand Falls Hut, comparing the high forest of the Twinway with the valley forest below, logged and burned and since regrown, and the stops on the way."],
      ]),
    },
    {
      slug: "student-journey-guide",
      title: "Student Journey Guide",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb:
        "The guide students keep at the top of their pack: the four days, the pack and the huts, a page for each day with its map, elevation profile, and stops, a journal to fill in on the day, and a trip card to cut out and carry.",
      cover: cover("student-journey-guide", "Student Journey Guide"),
      editions: editions("student-journey-guide"),
      insidePages: inside("student-journey-guide", "Student Journey Guide", [
        [2, "Your trek: the four days in a student's words, the parties, and the things that keep the trek simple, from drinking at every stop to three whistle blasts if lost."],
        [7, "Wednesday in the guide: the numbers for the longest and highest day, and the map from Greenleaf Hut over Mount Lafayette to Galehead Hut."],
        [16, "The trip card to cut out and carry, and the field report students write two weeks after they return, with their journal records as evidence."],
      ]),
    },
    {
      slug: "post-trip-feedback-report",
      title: "Post-Trip Feedback Report",
      reader: "After the trip",
      decision: "Improving next year's trip",
      blurb:
        "Four questions asked of students, parents, the trip leaders, and the hut crews after the trek: what each group said, where students' and parents' answers part, and the moments that did not go to plan, each with the day it belongs to.",
      cover: cover("post-trip-feedback-report", "Post-Trip Feedback Report"),
      editions: editions("post-trip-feedback-report"),
      insidePages: inside("post-trip-feedback-report", "Post-Trip Feedback Report", [
        [2, "The four questions, asked once two weeks after the group returned, in each group's own words, with who was asked and who answered."],
        [4, "What the report looks like, with example responses because the trip has not yet run: labeled distributions for each question, students beside parents."],
        [5, "The moments raised in the example responses, each with its day and who raised it, and two things that went well: the ridge mornings and the field study at Zealand Falls."],
      ]),
    },
  ],
  pdfSource: {
    letterDir: "customers/tideline-school/outputs/pdf",
    a4Dir: "customers/tideline-school/outputs/pdf/a4",
  },
};

export default whiteMountains;
