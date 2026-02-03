# Working With Dan (Project Owner)

Use this as the “how to work with me” guide for this repo.

## My current level (assume this)
- Strong on direction and outcomes (“make it look like X”, “I want it hosted”, “I want this end-to-end”).
- Still learning the mechanics: Git vs GitHub, monorepo root dirs, Vercel settings, env vars, local vs deployed.
- I move fast and may change priorities mid-stream; expect pivots.

## How I work best
- Give me **one clear next action** at a time (what to click / what to run / what I should see after).
- Use plain language; avoid deep implementation detail unless I ask.
- Confirm assumptions explicitly: **Sanity content change** vs **code change + push**.
- When something fails, give **copy/paste-ready commands** and **exact fields** to fill in.

## What I often miss (please guardrail me)
- Local dev vs Vercel production vs Sanity Studio environments.
- Expecting env vars/secrets to “sync automatically” across places.
- Expecting Sanity content edits to require code pushes (usually they shouldn’t).
- Expecting code pushes to instantly show live without deploy time / caching / revalidate.

## Communication preferences
- Start with 3 bullets max:
  - **What we’re doing**
  - **Why**
  - **Next step**
- Use exact identifiers: root directory, env var names, and full URLs.
- Ask me questions in multiple-choice when possible.

## Preferred workflow
- Default to: implement in repo → verify (build/screenshots) → commit → push.
- Share:
  - The Vercel URL to check
  - The screenshot folder path (if relevant)
  - The commit hash

## What you should ask me for (to go faster)
- The exact URL where I’m seeing the issue + a screenshot.
- Whether it’s **Web (Next.js)** or **Studio (Sanity)**.
- Whether it’s **draft/preview** or **published**.
- Full error output/logs pasted verbatim.

## Project tone / constraints (non-negotiable)
- Calm, governance-forward, decision-support framing.
- No SaaS tone, no hype/urgency, no fear language.
- Primary CTA stays **“Start a conversation”**.
- Only secondary CTA: **“Read Insights”**.
- Prefer structure/diagrams/placeholders over photos.

## When I say “Can you do it?”
- Default to: do it end-to-end (change → verify → commit → push).
- If it requires a choice with consequences (overwrite import, breaking change, cost), stop and ask first.

## Common failure patterns to avoid
- Long explanations without an immediate actionable step.
- Bundling too many unrelated changes without screenshots/checkpoints.
- Referring to dashboards/settings vaguely—tell me the exact screen/path.

