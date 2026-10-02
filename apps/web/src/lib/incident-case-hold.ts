/* The incident reporting case study's publishing hold (Dan, 2026-10-03: "Lets
   add it to the website also"). No imports, so any module can read it.

   ON HOLD until the school release runs with nothing on ETI360's side. The
   page says the reporting page, the scripts, the AI and every record run in
   the school's own Google Workspace account. The product spec
   (eti360-rebuild: content/vault/Operations/Governance/ETI360-Incident-Reporting-Product-Spec-2026-09.html)
   lets that claim go public only once a release has run on a clean test
   Workspace with no part on ETI360's side; the working version still serves
   its page from ETI360's app and runs Gemini on ETI360's key.

   While the hold is on, a production deploy (VERCEL_ENV "production") serves
   /incident-reporting as a 404 and drops its home-page card and sitemap entry.
   Local builds and Vercel previews show it for review. This repository is
   public, so pushing the branch publishes the copy in source, whatever the
   hold; the copy holds no private data. */
export const INCIDENT_CASE_ON_HOLD = true;

/** False on a production deploy while the hold is on; true everywhere else. */
export function incidentCaseLive(): boolean {
  return !(INCIDENT_CASE_ON_HOLD && process.env.VERCEL_ENV === "production");
}

export const INCIDENT_CASE_HREF = "/incident-reporting";
