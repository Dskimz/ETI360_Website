import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INCIDENT_CASE_HREF, INCIDENT_CASE_ON_HOLD, incidentCaseLive } from "@/lib/incident-case-hold";
import styles from "./page.module.css";

/* Case study: incident reporting and Check In and Feedback at Harborview
   International School (Dan, 2026-10-03). Harborview asked for one way to
   record incidents, near misses and trip leaders' feedback, with every record
   in the school's own Google Workspace account. The story follows the Nepal
   Himalaya Trek (HIS-T28) through the Educational Travel Incident Reporting
   System; every image is the system's own screen or report for that trip.
   The print edition is the vault's
   ETI360-Case-Study-Incident-Reporting-Harborview-2026-10 (Letter and A4).
   ON HOLD on production: src/lib/incident-case-hold.ts. */

const TITLE = "Case Study: Incident Reporting";
const DESCRIPTION =
  "How Harborview International School records incident reports, an evening check-in and trip leaders' feedback, with every record in the school's own Google Workspace account.";
const IMG = "/marketing/case-studies/incident-reporting";
const PROVIDER_NOTICE = "Tarahill Expeditions is a fictional trip provider; its trip was written for this example.";

export function generateMetadata(): Metadata {
  if (!incidentCaseLive()) return {};
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: INCIDENT_CASE_HREF },
    robots: INCIDENT_CASE_ON_HOLD ? { index: false, follow: false } : undefined,
    openGraph: { title: `${TITLE} — ETI360`, description: DESCRIPTION, type: "website", images: ["/marketing/og-default.png"] },
  };
}

type Shot = { src: string; w: number; h: number; alt: string; num: string; title: string; text: string; source: string };

function Exhibit({ s, narrow }: { s: Shot; narrow?: boolean }) {
  return (
    <figure className={`${styles.exhibit} ${narrow ? styles.narrow : ""}`}>
      <span className={styles.frame}>
        <Image src={`${IMG}/${s.src}`} width={s.w} height={s.h} alt={s.alt} sizes="(max-width: 900px) 100vw, 900px" />
      </span>
      <figcaption className="ui">
        <span className={styles.num}>{s.num}</span>
        <span className={styles.ttl}>{s.title}</span>
        {s.text}
        <span className={styles.src}>{s.source}</span>
      </figcaption>
    </figure>
  );
}

const WHERE: [string, string][] = [
  ["The page staff open", "Harborview's Google Cloud project"],
  ["The scripts", "Harborview's Apps Script project, installed from a versioned ETI360 release"],
  ["Records, recordings, photos and PDFs", "A Sheet and a Shared Drive folder in Harborview's Workspace"],
  ["The AI that drafts summaries", "Gemini through Vertex AI in Harborview's Google Cloud project, on the school's own key and billing"],
  ["Access", "A personal link for each trip leader and one for the duty team, reviewed by Harborview's IT and closed when the trip ends"],
];

export default function IncidentCaseStudyPage() {
  if (!incidentCaseLive()) notFound();
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="label label-light ui">Case study · Harborview International School</span>
          <h1 className={styles.h1}>Records that stay with the school</h1>
          <p className={styles.lede}>
            Harborview International School asked ETI360 for one way to record incidents, near misses and trip
            leaders&rsquo; feedback while groups are away, with every record kept in the school&rsquo;s own Google
            Workspace account rather than in an outside system.
          </p>
          <p className={`${styles.facts} ui`}>
            Educational Travel Incident Reporting System · Tier 3 Live Trip Support and Review · The trip shown:
            Nepal Himalaya Trek, 5 to 12 September 2026
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <div className={styles.measure}>
            <p>
              Schools work under different data protection laws in every country, and Harborview&rsquo;s families come
              from many of them. So the system is built to run in the school&rsquo;s own account: the page staff open, the scripts,
              the AI that drafts each report, and every record. Once ETI360 installs it there, the records sit on
              Google&rsquo;s servers under Harborview&rsquo;s own agreement with Google, where its IT team already
              manages access and retention. ETI360 builds the system and does not receive the records.
            </p>
          </div>
          <div className={styles.divide}>
            <div className={styles.sends}>
              <h3 className="ui">Harborview sends</h3>
              <p>
                Harborview sends what it already has by email: its incident and near-miss forms, its escalation steps,
                the duty roster, and each trip&rsquo;s itinerary and staff list. Its IT team gives one short meeting.
              </p>
            </div>
            <div className={styles.does}>
              <h3 className="ui">ETI360 does</h3>
              <p>
                Dan Skimin and Seb Wong design the reporting workflow with leadership. ETI360 builds the release,
                installs it in the school&rsquo;s account with IT, loads each trip, and sends a test report with the
                school before any trip uses it.
              </p>
            </div>
            <div className={styles.gets}>
              <h3 className="ui">Harborview receives, and decides</h3>
              <p>
                Harborview receives the system, installed in its own account at handover. Its staff write every record, and its duty manager
                confirms every field, closes every record and approves every report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.plain}>
        <div className="container">
          <span className="label ui">Setup</span>
          <h2 className="section-heading rule-gold">Built to run inside the school&rsquo;s account</h2>
          <table className={`${styles.where} ui`}>
            <thead>
              <tr>
                <th>Part</th>
                <th>Installed in</th>
              </tr>
            </thead>
            <tbody>
              {WHERE.map(([a, b]) => (
                <tr key={a}>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.decides}>
            After installation, ETI360 keeps no copy of the records and has no access to the account. When Harborview
            wants a change, its IT team grants ETI360 edit access for that change and closes it afterward, because
            anyone who can edit the scripts can read the records.
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <span className="label ui">During the trip</span>
          <h2 className="section-heading rule-gold">One recording from the field</h2>
          <div className={styles.measure}>
            <p>
              A trip leader opens their personal link, taps Report, chooses Incident or Near miss and records one voice
              message: where they are, what happened, who was involved, using students&rsquo; initials, and what they
              have done. The system adds the reporter, the time in the trip&rsquo;s time zone, the day&rsquo;s planned
              activity and the nearest emergency departments. Gemini writes a short summary and suggests the incident
              type, severity and medical attention, each with the words it relied on, and the duty manager confirms or
              changes every suggestion.
            </p>
          </div>
          <div className={styles.pair}>
            <Exhibit
              s={{ src: "phone-report-checkin.jpg", w: 1400, h: 729, alt: "The trip leader's phone: Report and Check in", num: "Exhibit 1",
                   title: "The trip leader's phone", text: "Report asks one question, then records one message.", source: "Nepal Himalaya Trek, Day 5, 21:30 in Pokhara" }}
            />
            <Exhibit
              narrow
              s={{ src: "duty-drawer.jpg", w: 900, h: 1456, alt: "The duty manager's record of incident HIS-T28-IN002", num: "Exhibit 2",
                   title: "The record as the duty manager opens it", text: "Gemini's suggestions wait for the duty manager to confirm them, beside the summary, the transcript, the map and the updates.", source: "Record HIS-T28-IN002, Day 6, on the trek above Dhampus" }}
            />
          </div>
          <p className={styles.decides}>
            Gemini suggests and summarizes from what was said; it makes no medical judgment and sets no status. The duty
            manager confirms every field, and the trip leader makes every decision on the ground.
          </p>
        </div>
      </section>

      <section className={styles.plain}>
        <div className="container">
          <span className="label ui">Each evening</span>
          <h2 className="section-heading rule-gold">Every evening at 21:00</h2>
          <div className={styles.measure}>
            <p>
              At 21:00 local time the system emails each trip leader one question: is all good tonight? &ldquo;All
              good&rdquo; is one tap. &ldquo;Not all good&rdquo; opens one short recording that says what is wrong, and
              the duty roster is emailed at once. Then, if the leader chooses, the page asks for about 30 seconds on what
              went well and what could improve. There is no headcount and no form, and a leader can skip the review.
            </p>
          </div>
          <Exhibit
            s={{ src: "phone-wrong-feedback.jpg", w: 1400, h: 962, alt: "The evening check-in: What is wrong, and How was today", num: "Exhibit 3",
                 title: "The evening, on the phone", text: "“What is wrong?” appears only after “Not all good”. “How was today?” follows every check-in and can be skipped.", source: "Check In and Feedback" }}
          />
          <Exhibit
            s={{ src: "duty-cf.jpg", w: 1600, h: 594, alt: "The duty view's Check In and Feedback section on Day 5", num: "Exhibit 4",
                 title: "Day 5, as the duty manager sees it", text: "After a two-hour road delay to Pokhara, the trip leader checked in “Not all good” at 21:34 and asked the school to send a message home. Her review of the day sits beside it.", source: "The duty view, Check In and Feedback" }}
          />
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <span className="label ui">The duty desk</span>
          <h2 className="section-heading rule-gold">The duty manager&rsquo;s view</h2>
          <Exhibit
            s={{ src: "duty-board.jpg", w: 1600, h: 938, alt: "The duty view: trips tonight and incidents", num: "Exhibit 5",
                 title: "The duty view on Day 6 at 21:24 in Pokhara", text: "Each trip's tile shows tonight's check-in. Each record shows its severity and status in color, with flags for a request for help, suggestions to confirm, a recording, a location and a final report.", source: "The duty view, opened from the duty team's link" }}
          />
          <p className={styles.decides}>
            The duty view shows the records Harborview&rsquo;s own staff wrote and the status the duty manager set. It
            keeps no due dates or countdowns; the school&rsquo;s own procedures say what happens next.
          </p>
        </div>
      </section>

      <section className={styles.plain}>
        <div className="container">
          <span className="label ui">Close-out and after the trip</span>
          <h2 className="section-heading rule-gold">From each record to the end of the trip</h2>
          <div className={styles.measure}>
            <p>
              When the duty manager closes a record, Gemini drafts the narrative and the timeline from the first report
              and every update. The duty manager edits the draft, adds the resolution and who was told, and the final
              incident report is saved as a PDF in Harborview&rsquo;s Drive. When the group is home, the evenings become
              the Check In and Feedback Report, and ETI360 adds it to the families&rsquo; Post-Trip Report in one End of
              Trip Pack.
            </p>
          </div>
          <div className={styles.three}>
            <Exhibit
              s={{ src: "incident-p1.jpg", w: 900, h: 1273, alt: "Final incident report HIS-T28-NM001, page 1", num: "Exhibit 6",
                   title: "A final incident report", text: "The Day 3 near miss at the cooking class, with the record, two maps and the account of what happened.", source: "Incident Report HIS-T28-NM001, page 1" }}
            />
            <Exhibit
              s={{ src: "cf-themes.jpg", w: 800, h: 1132, alt: "Check In and Feedback Report, the themes", num: "Exhibit 7",
                   title: "For next year", text: "The page lists every point the trip leaders made, by theme, with its day and who made it.", source: "Check In and Feedback Report, page 5" }}
            />
            <Exhibit
              s={{ src: "pack-sources.jpg", w: 900, h: 1273, alt: "End of Trip Pack, where the record and the feedback meet", num: "Exhibit 8",
                   title: "Where the record and the feedback meet", text: "The page sets what the system recorded beside what the leaders said that evening and what families said afterward. It draws no conclusion about cause.", source: "End of Trip Pack, page 3" }}
            />
          </div>
          <p className={styles.decides}>
            ETI360 designs the workflow and installs the system in the school&rsquo;s own account; it does not read what
            the school writes into it. The school&rsquo;s staff write every record, and the school retains responsibility
            for decisions, live assessments, and final approval of every report.
          </p>
          <p className={`${styles.notice} ui`}>
            The screens and reports shown are the output of ETI360&rsquo;s working version
            of the system for the trip&rsquo;s records, and ETI360 installs the release in a school&rsquo;s own account
            at handover. {PROVIDER_NOTICE} The same workflow can be built in Microsoft 365 when a school works
            there. <Link href="/case-study">Read the Harborview partnership case study</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
