# Parked pages

Kept readable, not compiled: excluded in `tsconfig.json` and in the ESLint
ignores (four-product site spec §12, 2026-09-27). Their components
(`SolutionEvidence`, `DocShowcase`, `WorkedTripDocs`, `solutions.ts`) were
deleted; restore them from git history if a page returns.

- `for-schools/duty-manager`, `for-schools/duty-manager-simulation`,
  `for-schools/incident-reporting`: the Duty Manager Dashboard, the Duty
  Manager Simulation and Incident Reporting, off customer surfaces until a
  school has piloted them. Their old addresses redirect to `/trip-package`.
- `content/for-providers.ts`: the providers page's content.

The providers page itself stays parked where it was, unrouted, at
`src/app/_for-providers-parked/page.tsx` (Dan, 2026-09-25: "Focus on
schools."), and is excluded the same way.
