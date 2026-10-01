/* The partnership, first on the home page (Dan, 2026-10-01: the home page
   becomes the consulting page; the products become evidence of the work).
   Copy from the vault draft ETI360-Consulting-and-Partnership-Draft-2026-10
   (revision 2), tone-reviewed 2026-10-01. No fee on the site: ETI360 scopes
   and prices each partnership case by case. The Travel Year Guide is a guide
   the school owns, with its own dates; never deadlines. */

export const PARTNERSHIP = {
  heading: "A partner for the whole travel program",
  lede: "ETI360 works with schools across their whole travel program. It reviews the program, prepares each trip with the school and its providers, and supports staff while groups are away. The school keeps every decision and approval.",
  situations: [
    {
      title: "A new program",
      text: "ETI360 works with the school as it sets out its travel policies and prepares its first trips, so the program starts with a structure the whole staff can use.",
    },
    {
      title: "A growing program",
      text: "As trips and providers multiply, ETI360 prepares every trip in the same format and evaluates each new provider's documents.",
    },
    {
      title: "An established program",
      text: "ETI360 reviews what the school already runs, program by program, and prepares the documents that teachers leading trips would otherwise assemble.",
    },
  ],
  close: [
    "ETI360's consultants bring the experience of hundreds of school trips and many providers to each school.",
    "It takes no payment from trip providers, so its view of every provider stays independent.",
    "The program's documents and records stay with the school when staff move on.",
  ],
};

/** A worked example for an area: a version and document on the site,
    opened through the logged /open route (Dan, 2026-10-01). */
export type Example = { version: string; doc: string; label: string };

export const AREAS = {
  heading: "Where ETI360 helps",
  lede: "A school travel program depends on the same areas of work wherever it runs. ETI360 groups its work into these eight, and each school chooses the areas it needs.",
  items: [
    {
      title: "Policies, procedures and goals",
      text: "ETI360 reads the school's travel policies program by program in the Travel Program Review and prepares the Travel Year Guide, which sets out the school's year of trips in one place.",
      example: { version: "harborview-travel-year-guide", doc: "travel-year-guide", label: "See Harborview’s Travel Year Guide" } as Example,
    },
    {
      title: "Trip budgets",
      text: "ETI360 sets out each trip's costs from the provider's quote in one format, covering transport, provider fees, insurance and contingency, so leadership can compare trips side by side.",
      example: { version: "harborview-trip-budgets", doc: "trip-budgets", label: "See Harborview’s Trip Budgets" } as Example,
    },
    {
      title: "Trip providers",
      text: "ETI360 evaluates the documents of every provider the school uses and of each new provider it considers. ETI360 never ranks, approves or recommends a provider, and the school chooses.",
    },
    {
      title: "Trip preparation",
      text: "For each trip, ETI360 prepares the Individual Trip Reports with the school and its provider. The reports account for every day of the itinerary, list the nearest hospitals by drive time and set out the emergency action procedures.",
    },
    {
      title: "Entry requirements and travel documents",
      text: "ETI360 researches each destination's entry rules, including passport validity, visas and the border systems in force, and writes them into the reports for families. The school and families make the applications themselves.",
      example: { version: "harborview-kyoto-visa", doc: "japan-entry-and-visa-report", label: "See the Japan Entry and Visa Report" } as Example,
    },
    {
      title: "Trip leader preparation",
      text: "ETI360 runs a session with each trip's leaders before departure, in which they work through their Trip Leaders Brief day by day. New leaders get a longer session.",
    },
    {
      title: "Communication with families",
      text: "ETI360 prepares the Student and Parent Trip Report, the slides for the parent evening and a packing list built from the trip's own itinerary and weather.",
    },
    {
      title: "Feedback and reporting",
      text: "ETI360 gathers the feedback after each trip into the Post Trip Report and prepares the Semester Board Report for the school to issue to its Board.",
    },
  ],
};

export const YEAR = {
  heading: "A travel year with ETI360",
  lede: "ETI360 works through the whole travel year with the school. The school sets its own dates, and the phases below show how the work usually falls.",
  phases: [
    {
      title: "Review and planning",
      text: "ETI360 meets the school's leadership to go through the program and its policies. ETI360 prepares the Travel Year Guide for the year ahead.",
    },
    {
      title: "Choosing the trips",
      text: "Trip leaders set out each trip's goals, and providers send their proposals. ETI360 evaluates the providers' documents and sets out the budgets, and the school chooses its trips.",
    },
    {
      title: "Preparing families",
      text: "ETI360 writes the entry requirements and the Student and Parent Trip Report, and prepares the slides for the parent evening.",
    },
    {
      title: "Preparing the trips",
      text: "ETI360 prepares each trip's reports, from the risk assessment groundwork to the Trip Leaders Brief, and runs the session with the leaders.",
    },
    {
      title: "The trips",
      text: "The leaders carry their Trip Leaders Brief, and the school runs its own duty arrangements while groups are away.",
    },
    {
      title: "Feedback and reporting",
      text: "ETI360 gathers the feedback into the Post Trip Report and prepares the Semester Board Report. The next year's guide starts from what the school learned.",
    },
  ],
};

export const EVIDENCE = {
  heading: "What the work looks like",
  lede: "These are the documents a partnership produces, shown as worked examples that each open in full.",
};

export const START = {
  heading: "How a partnership starts",
  text: "A first conversation covers the school's program and the trips it runs. ETI360 then sets out the areas of work the school wants and what they cost, and the Travel Program Review is usually the first piece of work.",
  cta: "Start a conversation",
};
