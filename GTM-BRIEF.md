# ETI360 Go-to-Market: Agency Brief, Round 1

**Candidate:** B · **Branch:** gtm-candidate-b · **Date:** 2026-08-25
**You are one of two independent agencies pitching for this work. Work independently. Do not assume access to recommendations produced by any other agent, and do not look for them.**

## 1. The assignment

ETI360 is about to run its first outbound campaign to international schools. Your job in Round 1 is a **go-to-market strategy report**: read the corpus below, judge what we have, and tell us how you would take it to market. Round 1 is strategy only. Do not build website changes, emails, or posts yet; that is Round 2, and only the winning strategy gets built.

## 2. Your lens

**Assigned lens: B2B Growth Agency.**
Prioritize website conversion, search visibility, LinkedIn, lead generation, sales integration, analytics, and measurable growth.
Cover the complete brief, but let this perspective shape your priorities and recommendations.

## 3. What ETI360 is

ETI360 is a risk governance and intelligence consulting firm for educational travel. It reviews school trips against a 3-Tier Risk Framework (Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, Tier 3 Dynamic Risk Operations) and produces the documents that carry them: itineraries, RAMS, route intelligence, parent packs, a read-only Duty Manager Dashboard. ETI360 does not advise, certify, or guarantee outcomes; it structures risk evidence and supports leadership judgment. The decision always stays with the school. The company is ETI360 PTE. LTD., Singapore (UEN 202302514C). The brand line is "Risk intelligence for school trips."

## 4. Corpus (read-only)

Your working folder is this repository checkout (/Users/danskimin/ETI360/documents/04 - ETI360 - Knowledge Base/GTM-Candidate-B). The site source is `apps/web/`. Reference material lives in a SECOND repository at `/Users/danskimin/00 - eti360-rebuild`, which is STRICTLY READ-ONLY for you; never modify, create, or delete anything there.

Read, in roughly this order:
1. `/Users/danskimin/00 - eti360-rebuild/docs/launch-readiness/launch-readiness-2026-08-25.html` and `LAUNCH-CHECKLIST.md`: the audited current state of every campaign surface.
2. https://www.eti360.com/review/campaign-2026-08.html: the current campaign draft (emails, eight-post social story, target schools, infrastructure). Unlisted; do not share the URL.
3. `/Users/danskimin/00 - eti360-rebuild/content/vault/Operations/Governance/`: positioning, business plan, product packages, Duty Manager Simulation doc.
4. `/Users/danskimin/00 - eti360-rebuild/docs/ETI360_TONE_AND_VOICE.md` and the naming laws in `/Users/danskimin/00 - eti360-rebuild/CLAUDE.md` (section "Naming Laws").
5. `/Users/danskimin/00 - eti360-rebuild/dev/schools-email/` (the three email arms + REVIEW-PACKAGE-v12.md) and `/Users/danskimin/00 - eti360-rebuild/content/vault/Marketing/` (trackers, campaign production map).
6. The live site: https://www.eti360.com (home, /framework, /for-schools, /for-providers, /showcase) and this checkout's `apps/web/src/`.
7. `/Users/danskimin/00 - eti360-rebuild/content/vault/Schools/Directory/schools-directory.json`: the 510-school pool (schema first; it is large).

Ignore everything else in the reference repository (engine code, InDesign, guidebooks, data/). It is not part of this assignment.

## 5. Binding constraints (not open for debate in either round)

- Tiers are named Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, Tier 3 Dynamic Risk Operations. "Assurance" is retired vocabulary.
- The Tier 3 surface is the "Duty Manager Dashboard". Never "Live Ops Centre" or "Command Centre" in customer copy. Never "fleet"; say "trips".
- The showcase school is Harborview International School, fictitious by design, and must be disclosed as fictitious wherever a prospect can see it.
- Tier 1 Baseline shows "At standard / Progressing" states. Never percentages or scores on customer surfaces.
- ARP (Activity Risk Profiles) sits behind RAMS in customer-facing material, never in front.
- Customer-facing surfaces never name ISO 31031; the framework presents as the ETI360 Operational Capability Framework. Standard alignment stays internal.
- "Start with one trip" is retired as a tagline or slogan (ruled salesy). The one-trip offer survives, phrased plainly: send an itinerary for one upcoming trip and we produce the reviewed file, no cost.
- Voice: supportive, benefit-led, moment-first. Never open on what a school lacks. No fear or liability framing, no urgency, no document counts, no superlatives, no emojis, no exclamation marks. ETI360 never advises, certifies, approves, or guarantees.
- American English. No em-dashes in ETI360 documents.
- Claims must trace to artifacts that exist in the corpus. Do not invent features, numbers, clients, or testimonials.

## 6. Decisions already made (build on them, do not re-litigate)

- Sending model: personal Gmail drafts, written per school, reviewed and sent by Dan. No email platform, no merge tags.
- Cadence: 50 schools per week, Latin America first, three arms (A note, B marquee, C catalogue) tracked by UTM.
- Social: organic only on LinkedIn and Facebook, same posts both platforms, no paid spend this campaign.
- The website ships from this repository via Vercel; the working app runs on Render. Analytics is cookieless Vercel Web Analytics; the site sets no cookies and shows no consent banner.
- You may RECOMMEND changing any of these in your report, with reasoning, but flag it explicitly as a recommendation against a standing decision.

## 7. Round 1 deliverable

One self-contained HTML report at `apps/web/public/review/gtm-report.html` in THIS checkout, committed to YOUR branch. Structure:

1. **Executive summary** (one screen).
2. **Market read and category**: what ETI360 is selling, to whom, against what alternatives.
3. **Positioning and messaging hierarchy**: the one-line position, the three supporting messages, proof points drawn from real artifacts.
4. **Channel plan and sequencing**: what runs, in what order, and why, for the first 90 days.
5. **Website**: specific changes you would make and why (pages, copy direction, structure). Proposals only; no code changes in Round 1.
6. **Measurement**: what gets counted, where, and what decides continue or stop.
7. **What you would cut**: the things in the current draft campaign you would drop, with reasons.
8. **Risks and open questions** for the founder.

Keep it under roughly 5,000 words. Dense and specific beats long. Style the page cleanly (navy #0d3558, gold #C9A24D, IBM Plex Sans body, Source Serif 4 headings, noindex meta tag).

When done: `git add`, `git commit` on your branch, then `git push -u origin gtm-candidate-b`. Vercel will build a preview URL for the branch automatically.

## 8. Rules of engagement

- Never touch the `main` branch, never merge, never open a PR. Your branch is yours alone.
- Never modify the reference repository at `/Users/danskimin/00 - eti360-rebuild`.
- Never publish, post, email, or contact anyone. No external actions of any kind.
- Do not visit or modify the other candidate's folder (/Users/danskimin/ETI360/documents/04 - ETI360 - Knowledge Base/GTM-Candidate-A).
- The unlisted /review/ URLs are internal; do not share them.

## 9. What happens next

Dan and Seb read both reports side by side. One strategy wins (or a merged spine is defined), and Round 2 briefs the build: campaign pages, site changes, and asset production on these same branches, judged again on preview URLs. Cherry-picks from the losing report are fair game.
