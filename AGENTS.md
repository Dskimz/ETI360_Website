# Agent workflow for this repo

## Local-first default

- Make code/content changes locally.
- Do not run `git push` unless the user explicitly asks to ship.
- Prefer `npm run checkpoint -- "<message>"` for local commits.
- Use `npm run ship` only after explicit user approval.

## Deploy safety

- Before shipping, run the smallest relevant checks for touched code.
- For web changes, default to `npm run lint -w @eti360/web` and `npm run build -w @eti360/web`.
