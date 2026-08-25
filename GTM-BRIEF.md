# ETI360 Go-to-Market: Agency Engagement, Round 1 (Brief v2)

**Candidate:** A · **Branch:** gtm-candidate-a · **Date:** 2026-08-25
**You are one of two independent agencies retained for this work. Work independently. Do not assume access to recommendations produced by other agents, and do not look for them.**

---

# Part I: Engagement mechanics (read first)

## Your lens

**Assigned lens: Global Brand Consultancy.**
Prioritize category definition, positioning, brand architecture, audience clarity, and long-term market differentiation.
Cover the complete brief in Part II, but let this perspective shape your priorities and recommendations. A competing agency holds a different lens; you will never see its work.

## Corpus (the "materials supplied with this brief")

Your working folder is this repository checkout (/Users/danskimin/ETI360/documents/04 - ETI360 - Knowledge Base/GTM-Candidate-A). The site source is `apps/web/`. Reference material lives in a SECOND repository at `/Users/danskimin/00 - eti360-rebuild`, which is STRICTLY READ-ONLY for you; never modify, create, or delete anything there.

| Brief item | Where it actually is |
|---|---|
| Website (live) | https://www.eti360.com (home, /framework, /for-schools, /for-providers, /showcase, /about, /contact, /privacy) |
| Website source + drafts | `apps/web/src/` in this checkout |
| Current campaign draft (emails, 8-post social story, target schools, infrastructure) | https://www.eti360.com/review/campaign-2026-08.html (unlisted; do not share) |
| Launch-readiness audit + task ledger | `/Users/danskimin/00 - eti360-rebuild/docs/launch-readiness/` |
| Positioning, business plan, product packages, Duty Manager Simulation doc | `/Users/danskimin/00 - eti360-rebuild/content/vault/Operations/Governance/` |
| Tone and voice | `/Users/danskimin/00 - eti360-rebuild/docs/ETI360_TONE_AND_VOICE.md` |
| Naming laws (binding) | `/Users/danskimin/00 - eti360-rebuild/CLAUDE.md`, section "Naming Laws" |
| Email copy (three arms + review package) | `/Users/danskimin/00 - eti360-rebuild/dev/schools-email/` |
| Marketing plans, trackers, prior LinkedIn drafts | `/Users/danskimin/00 - eti360-rebuild/content/vault/Marketing/` |
| Conference materials (OFFSEAS booth) | `apps/web/public/OFFSEAS2026/` in this checkout |
| Sample deliverables (reports schools receive) | `apps/web/public/docs/` and `/showcase` PDFs in this checkout; full packs at https://eti360-review.onrender.com/demo/docs/HIS-T01/ |
| School pool (510 rows) | `/Users/danskimin/00 - eti360-rebuild/content/vault/Schools/Directory/schools-directory.json` (sample the schema first; it is large) |

Known-unavailable inputs, record them as gaps in your source register rather than hunting: LinkedIn company page URL and founder profile (a company page exists but no handle is recorded in any repo), Facebook page, website analytics exports, search performance data, customer feedback, case studies (one real client exists: TSCT; no published case study). Ignore everything else in the reference repository (engine code, InDesign, guidebooks, data/): not part of this assignment.

If you cannot reach the web for the competitive-landscape research, say so and mark that section's external claims Unverified rather than inventing sources.

## Binding constraints (customer-facing copy must obey these in anything you produce)

- Tiers: Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, Tier 3 Dynamic Risk Operations. "Assurance" is retired vocabulary.
- The Tier 3 surface is the "Duty Manager Dashboard". Never "Live Ops Centre" or "Command Centre". Never "fleet"; say "trips".
- The showcase school is Harborview International School, fictitious by design, disclosed as fictitious wherever a prospect can see it.
- Tier 1 Baseline shows "At standard / Progressing" states. Never percentages or scores on customer surfaces.
- ARP (Activity Risk Profiles) sits behind RAMS in customer-facing material, never in front.
- Customer-facing surfaces never name ISO 31031; the framework presents as the ETI360 Operational Capability Framework. Standard alignment stays internal.
- "Start with one trip" is retired as a tagline or slogan (ruled salesy, 2026-08-25). The one-trip offer survives, phrased plainly.
- Voice: supportive, benefit-led, moment-first. Never open on what a school lacks. No fear or liability framing, no urgency, no document counts, no superlatives, no emojis, no exclamation marks. ETI360 never advises, certifies, approves, or guarantees; the decision stays with the school.
- American English. No em-dashes in ETI360 documents.
- Claims must trace to artifacts that exist in the corpus. Never invent features, numbers, clients, testimonials, or market statistics.

**Strategy may challenge a law; copy may not break one.** Part II asks you to review positioning, names, and architecture critically. Do that: you may recommend changing any standing decision, including a naming law, but flag it explicitly as "Recommended change to a standing decision" for the founder to rule on. Any example copy you write in the meantime obeys the laws as they stand.

## Standing decisions (build on them; recommendations against them must be flagged as above)

- The co-produced reports are the product (2026-07-17). The software platform (internal working name TripRisk360) is ETI360's internal instrument; school marketing leads on the reports, not the software.
- The Duty Manager Simulation is the sold product for Tier 2 entry: a facilitated 90-minute session, pilot-priced at $3,000 (2026-07-31). The written stress-test report survives only as the Simulation's After-Action Report.
- Email model: personal Gmail drafts, written per school, reviewed and sent by the founder. No email platform, no merge tags. 50 schools per week, Latin America first, three arms (A note, B marquee, C catalogue), UTM-tracked.
- Social: organic only on LinkedIn and Facebook, same posts both platforms, no paid spend this campaign.
- The website ships from this repository via Vercel; the working app runs on Render; DNS at GoDaddy. Analytics is cookieless Vercel Web Analytics; the site sets no cookies and shows no consent banner.

## Deliverable and mechanics

The completed strategic report specified in Part II, as one self-contained HTML page at `apps/web/public/review/gtm-report.html` in THIS checkout, committed to YOUR branch. Style it cleanly on the real brand system (below), include `<meta name="robots" content="noindex,nofollow">`, and open with the one-page executive summary Part II requires. Length: as long as the evidence needs and no longer; dense and specific beats long.

When done: `git add`, `git commit` on your branch, then `git push -u origin gtm-candidate-a`. Vercel builds a preview URL for the branch automatically.

**Rules of engagement:** never touch the `main` branch, never merge, never open a PR. Never modify the reference repository. Never publish, post, email, or contact anyone; no external actions of any kind. Do not visit or modify the other candidate's folder (/Users/danskimin/ETI360/documents/04 - ETI360 - Knowledge Base/GTM-Candidate-B). The unlisted /review/ URLs are internal.

## Corrections already applied to the retained-agency brief in Part II

So you are not misled by stale inputs: the brand navy is `#0d3558` (not #1F4E79) with gold `#C9A24D`, IBM Plex Sans body and Source Serif 4 display headings; canonical tokens are in the corpus. The live positioning as of today is the 3-Tier Risk Framework with the brand line "Risk intelligence for school trips" and hero "Every trip, decision-ready."; the "working brand direction" text in Part II predates today's ship and is preserved as material to evaluate, not as the current state. "TravelPolicy360" appears in no repository; treat it as a name under consideration only.

---

# Part II: The retained-agency brief

# Your Role

Act as one of the world's leading marketing firms. ETI360 has retained you to audit its current positioning, brand, website and social channels and to create an integrated marketing campaign.

This is not a request for generic marketing advice or a basic social media calendar. Produce a rigorous, client-ready strategic marketing report that could be presented by an elite agency to ETI360's leadership.

The campaign must align:

* ETI360's corporate positioning
* Website
* LinkedIn company page
* Founder and leadership LinkedIn activity
* Facebook
* Educational resources
* Sales and conference materials
* Product and service messaging
* Lead generation and client conversion

The final strategy must clearly explain what ETI360 should say, who it should say it to, where it should say it, how the channels should work together and how marketing activity should produce qualified business opportunities.

# Company Background

ETI360 stands for **Educational Travel Insights 360**.

ETI360 supports schools and educational travel providers by structuring fragmented trip information into consistent, customized and decision-ready information.

The company is developing an operational readiness approach to educational travel. Its work may include:

* Trip information normalization
* Operational readiness reviews
* Risk and emergency documentation
* Destination intelligence
* Trip leader resources
* Staff preparation and rehearsal
* Policy and provider reviews
* Structured trip records
* Educational travel research and insights

Current products, services or working names may include: ETI360, TripRisk360 (internal platform), TripReady360 (simulator working name), TravelPolicy360 (name under consideration, no repository presence), destination intelligence resources, teacher and trip-leader resources, educational travel readiness reports, the Duty Manager Simulation.

Do not assume that the current product architecture, names or positioning are correct. Review them critically, subject to Part I's rule: recommendations against standing decisions are welcome and must be flagged.

# Current Working Brand Direction

Treat these as working directions to evaluate, not conclusions that must automatically be retained. Where they conflict with the live site, the live site (which shipped 2026-08-25) is the current state.

**Tagline:** Educational Travel Insights.

**Live brand line:** Risk intelligence for school trips. **Live hero:** Every trip, decision-ready.

**Earlier company descriptor (evaluate):** ETI360 supports schools and educational travel providers by structuring fragmented trip information into consistent, customized, decision-ready evidence.

**Earlier positioning direction (evaluate):** Operational Readiness for Educational Travel.

**External process model (evaluate):** Selection, Preparation, Execution, Review.

**Brand attributes:** Calm · Credible · Precise · Practical · Evidence-led · Professional · Advisory rather than alarmist · Focused on educational travel · Human-reviewed rather than presented as automated certainty.

**Visual identity (canonical):** Navy `#0d3558` · Gold `#C9A24D` · IBM Plex Sans (body/UI) · Source Serif 4 (display headings) · square corners, restrained palette, no gradients or illustrations. Reference class: International SOS, Crisis24, The Economist. Anti-references: EdTech startup, generic SaaS, government compliance, adventure-travel brand.

The brand must not rely on fear-based risk messaging, exaggerated claims, generic AI language or unsupported statements about safety, compliance, certification or guarantees. Public-facing language should be understandable to school leaders and teachers. Avoid unnecessary consultancy jargon.

# Priority Audiences

Assess and refine these audiences rather than accepting them without analysis: school leadership; school risk, safety or compliance staff; educational travel coordinators; trip leaders and teachers; international schools; educational travel providers; destination management companies; school groups responsible for approving or commissioning travel; organisations seeking independent review of educational travel preparation.

Distinguish between economic buyer, decision-maker, internal influencer, user, gatekeeper, and referral source. Identify which audiences should receive the greatest marketing investment.

# Business Objectives

1. Establish a clear and defensible market position.
2. Explain what ETI360 does within a few seconds.
3. Build authority in educational travel.
4. Demonstrate the practical value of operational readiness.
5. Create consistency across the website, LinkedIn, Facebook and supporting materials.
6. Attract qualified school and educational travel provider enquiries.
7. Convert educational content into commercial opportunities.
8. Support conferences, partnerships and direct outreach.
9. Develop a sustainable content system that a small team can maintain.
10. Build a brand that can support multiple products without becoming confusing.

# Materials to Review

The corpus table in Part I is the definitive materials list with real locations. Create a source register showing which materials were reviewed. When an expected input is unavailable (the known gaps are listed in Part I), identify the gap and continue using clearly stated assumptions. Do not invent data, customer quotations, market statistics, competitor capabilities or campaign performance.

# Required Working Method

## 1. Audit Before Recommending

Begin with an evidence-based assessment of what currently exists. Identify: what is clear, unclear, distinctive, generic, inconsistent, too complicated, lacking proof; what should be retained, revised, removed. Do not praise weak material simply because it already exists.

## 2. Separate Evidence From Recommendation

Label important conclusions as **Observed** (directly supported by supplied material), **Inferred** (reasonable conclusion from evidence), **Recommended** (proposed strategic action), or **Unverified** (requires additional evidence or testing).

## 3. Make Strategic Choices

Do not recommend every possible channel, audience or marketing activity. Prioritize. Explain what ETI360 should do, should not do, what should happen now, what can happen later, what is likely to produce commercial value, and what would consume resources without sufficient return.

## 4. Avoid Generic Marketing Advice

Do not provide recommendations such as "post consistently," "tell authentic stories" or "use video" without explaining the intended audience, the specific subject, the business purpose, the format, the call to action, the distribution method and the measurement method.

# Required Final Report

Produce a comprehensive, client-ready final report using the following structure.

## 1. Executive Recommendation

The central marketing problem · the market opportunity · the recommended positioning · the selected campaign concept · the priority audience · the role of the website · the role of LinkedIn · the role of Facebook · the principal conversion mechanism · the first five actions ETI360 should take. Also provide a one-page strategy summary that could be presented independently.

## 2. Current-State Marketing Audit

Evaluate the existing brand, positioning, messaging, website, LinkedIn company presence, founder LinkedIn presence, Facebook presence, content, visual consistency, calls to action, conversion pathways, sales alignment, and product architecture. Score each major area 1-5 and explain the score. Include a channel alignment table (Channel · Current role · Current audience · Current message · Current CTA · Main problem). Identify contradictions and duplication across channels.

## 3. Market and Competitive Landscape

Identify direct competitors, indirect competitors, internal alternatives, travel provider alternatives, risk consultancy alternatives, software alternatives, and "do nothing" alternatives. For each significant one: positioning, audience, promise, proof, tone, visual presentation, content strategy, strengths, weaknesses, opportunity for ETI360. Identify market language that is overused and areas ETI360 could credibly own. Use current sources and cite them (or mark Unverified per Part I if the web is unreachable).

## 4. Audience and Buying Analysis

Profiles for the priority audiences: role, responsibilities, jobs to be done, problems, desired outcomes, buying triggers, objections, internal pressures, evidence required, preferred content, likely path to purchase, relevant ETI360 service, best call to action. Distinguish buyer, approver, user, and likely resistor. Select the primary and secondary campaign audiences.

## 5. Category and Positioning Strategy

Determine the category ETI360 should occupy (educational travel consultancy · operational readiness specialist · educational travel intelligence provider · trip risk and preparation service · independent educational travel review service · a new or hybrid category). Develop at least three credible positioning options; for each: category, target audience, problem addressed, core promise, differentiation, supporting proof, strategic benefits, strategic risks, example headline. Select one and explain why. Close with a formal positioning statement: "For [target audience], ETI360 is the [category] that [primary benefit] because [reason to believe], unlike [alternative]."

## 6. Brand and Product Architecture

Recommend how ETI360, TripRisk360, TripReady360, TravelPolicy360, destination resources, readiness reports, advisory services, and future products should relate. Branded house, house of brands, endorsed brands, or product descriptors rather than product brands? Show the recommended architecture in text or diagram form. Identify any product names that create unnecessary complexity. Honor the standing decisions in Part I when describing the current state; flagged recommendations may propose changing them.

## 7. Messaging Architecture

Master message · value proposition · three to five supporting pillars (each: audience problem, ETI360 response, benefit, supporting proof, example headline, example call to action) · message formats: five-word, ten-word, 25-word, 50-word, 100-word descriptions; elevator pitch; conference description; website description; LinkedIn company description; provider-facing, school-facing, and teacher-facing descriptions. Identify language ETI360 should use and language it should avoid.

## 8. Campaign Platform

Develop three meaningfully different integrated campaign concepts (not minor variations). Each: campaign name, central idea, audience insight, strategic promise, headline, supporting headlines, story structure, visual direction, website execution, LinkedIn execution, Facebook execution, lead-generation execution, advantages, risks. Select one as the recommendation and explain why it is memorable, credible, commercially useful and suitable for ETI360.

## 9. Creative Direction

Visual tone, photography style, illustration or diagram style, typography approach, color use, layout principles, iconography, data visualization style, motion or video style, accessibility requirements. Show how the campaign should look across: website homepage, LinkedIn post, LinkedIn document carousel, Facebook post, report cover, conference banner, downloadable guide, email, case study. Provide specific mockup descriptions (text descriptions suffice).

## 10. Website Strategy

Recommended sitemap, navigation structure, homepage hierarchy, priority audience pathways, product and service architecture, resource architecture, conversion pathways, calls to action, trust and proof requirements, case-study strategy, search strategy, AI-search visibility strategy, measurement requirements. Write a recommended homepage outline (hero headline, supporting statement, primary CTA, secondary CTA, problem section, solution section, how it works, audience section, proof section, resources section, final CTA). Identify which existing pages should be retained, revised, combined, removed, or added. Proposals only in Round 1; no code changes.

## 11. LinkedIn Strategy

Separate roles for the ETI360 company page (primary audience, purpose, content role, posting frequency, content formats, calls to action, success metrics) and founder/leadership profiles (how personal thought leadership supports ETI360, what is posted personally vs by the company, what is not duplicated, how personal profiles generate trust and enquiries). Recommended content pillars. Provide: six company-page post concepts, six founder-post concepts, three carousel concepts, two long-form article concepts, one downloadable resource campaign, one case-study campaign. For every concept: audience, business purpose, CTA. Note: an eight-post company story already exists in the campaign draft; audit it and build with or against it explicitly.

## 12. Facebook Strategy

Determine whether Facebook deserves meaningful investment; do not assume it does. Evaluate its role for teachers, school communities, parents, educational travel professionals, conference audiences, retargeting. Recommend one: strategic priority · supporting channel · paid-retargeting channel · resource-distribution channel · minimal-maintenance presence · discontinue active investment. Explain. Example content only if Facebook has a justified role. (Standing decision: organic-only this campaign; a flagged recommendation may argue otherwise.)

## 13. Content Strategy

Four to seven permanent content pillars. For each: audience, purpose, subject areas, best formats, publishing channel, CTA, commercial connection, required expertise, production difficulty. Consider destination intelligence, teacher and trip-leader resources, operational readiness, emergency preparation, educational travel trends, research, case studies, behind-the-scenes methodology, provider readiness, school policy and preparation, conference insights. Explain how one substantial piece repurposes across website, LinkedIn, Facebook, email and sales activity.

## 14. Acquisition and Conversion Funnel

Map awareness → engagement → education → trust → intent → enquiry → sales conversation → client conversion → retention and referral. For each stage: audience question, content required, channel, CTA, proof required, measurement, owner. Recommend lead magnets or entry offers genuinely useful to schools and travel providers; none that would attract large numbers of irrelevant consumers.

## 15. Ninety-Day Launch Campaign

Phases (foundation, preparation, launch, authority building, optimization) with a week-by-week schedule: theme, website activity, LinkedIn company activity, founder LinkedIn activity, Facebook activity, resource or lead magnet, sales integration, CTA, owner, measurement. Identify dependencies and critical-path actions. Anchor week 1 on the real state: the email waves and social story described in the campaign draft are ready pending approval.

## 16. Twelve-Month Marketing Roadmap

Brand implementation, website development, content, search, LinkedIn, Facebook, email, conferences, partnerships, case studies, research, lead generation, measurement, optimization. Separate into essential, recommended, optional, not recommended. Assume ETI360 is a small team (effectively one founder plus AI assistance and a collaborator) and cannot execute an enterprise-scale campaign without prioritization.

## 17. Measurement Framework

Distinguish vanity metrics from business outcomes. Awareness (reach, branded search, website discovery, share of relevant conversation) · engagement (content engagement, return visitors, resource use, qualified social interaction) · intent (service-page visits, case-study views, downloads, email subscriptions, contact-page activity) · commercial performance (qualified enquiries, meetings, proposals, conversion rate, client acquisition cost, pipeline value, revenue influenced). Recommended monthly dashboard; which metrics are weekly, monthly, quarterly. Ground it in what exists: cookieless Vercel Analytics plus UTM tagging today, Google Analytics wired but dormant.

## 18. Resources, Budget and Operating Model

Three implementation levels (lean, recommended, accelerated). For each: estimated resource requirements, internal responsibilities, external support required, technology requirements, content-production capacity, approximate budget allocation by category, expected limitations. No promised financial returns. Recommend who owns brand, website, content, social media, lead follow-up, analytics, approval, subject-matter review.

## 19. Risks and What ETI360 Should Stop Doing

Brand, positioning, credibility, resourcing, channel, legal or claims, content, product-confusion, and measurement risks. Provide a direct list titled "What ETI360 Should Stop Doing": practices, messages, channels or activities that dilute the brand or consume resources without sufficient value.

## 20. Final Agency Recommendation

A decision memorandum: recommended positioning · recommended campaign · primary audience · secondary audience · primary acquisition channel · role of the website · role of LinkedIn · role of Facebook · recommended lead-generation mechanism · recommended product architecture · five immediate actions · five actions for the next six months · three actions not to pursue · the most important strategic trade-off · the single decision ETI360 leadership must make. Explain how your assigned agency lens influenced your recommendation.

# Required Standards

The report must: be specific to ETI360 · demonstrate that the supplied materials were actually reviewed · challenge assumptions where necessary · distinguish strategy from tactics · connect marketing to commercial outcomes · include actual examples, not only recommendations · prioritize realistically · use current market research where relevant and cite it · avoid fabricated evidence · avoid generic marketing language · avoid inflated claims · avoid fear-based positioning · avoid presenting ETI360 as a certification or guarantee · maintain a calm, credible and professional tone.

Do not return a preliminary outline. Produce the completed strategic report. Where evidence is insufficient, state the limitation and make the most reasonable recommendation using clearly identified assumptions.
