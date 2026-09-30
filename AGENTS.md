# Agent workflow for this repo

## Local-first default

- Make code/content changes locally.
- Do not run `git push` unless the user explicitly asks to ship.
- Prefer `npm run checkpoint -- "<message>"` for local commits.
- Use `npm run ship` only after explicit user approval.

## Deploy safety

- Before shipping, run the smallest relevant checks for touched code.
- For web changes, default to `npm run lint -w @eti360/web` and `npm run build -w @eti360/web`.

## Writing

- **No verbless sentences (Dan, 2026-09-30: "drives me mad").** Every sentence has a subject and a verb and says who does what. Never write (1) a sentence that is only a list of noun phrases ("The whole program, one trip, a year of day trips, or a conference year."), (2) a scene-setting clause, a colon, then a list of things ("Before the season starts: one guide for the coaches…"), or (3) a fragment posing as a claim ("The school’s own trip policy, forms and escalation path."). The rhetorical name is scesis onomaton (a verbless sentence); AI reaches for it because it sounds like ad copy. Headings and labels carry no period; anything that ends in a period has a verb. Fix: "ETI360 prepares four products." / "The documents follow the school’s own trip policy, forms and escalation path."
