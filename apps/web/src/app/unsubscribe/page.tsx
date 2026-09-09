"use client";

import { useEffect } from "react";

// Unsubscribe clicks are recorded to the "ETI360 Email Unsubscribes" Google
// Sheet via its linked Form (Dan, 2026-09-09). Only the school slug and arm
// code from the link's query string are sent - never personal data.
const FORM_ENDPOINT =
  "https://docs.google.com/forms/d/e/1FAIpQLSfrCzed1iOBuIWtGXNM2wJoPIjF4FKrsS7xccldu3JUQnL1cQ/formResponse";
const ENTRY_SCHOOL = "entry.2044737610";
const ENTRY_ARM = "entry.977866988";

const DOCUMENTS: { src: string; title: string; note: string }[] = [
  {
    src: "/email/spread-school-baseline-v3.png",
    title: "Organizational Baseline Evaluation",
    note: "The school-wide annual review of policies, roles, provider arrangements, and records.",
  },
  {
    src: "/email/itoshima-route-panel.png",
    title: "Route Intelligence",
    note: "A full-day cycling route with distance, elevation, terrain, and waypoints measured.",
  },
  {
    src: "/Claude/Questions/assets/scheduled-group-locations.png",
    title: "Duty Manager Dashboard",
    note: "Every traveling group's scheduled location and next planned movement, in one view.",
  },
  {
    src: "/Claude/Questions/assets/student-journey-day.png",
    title: "Student Journey Guide",
    note: "One student-facing page per travel day, with the learning purpose beside the schedule.",
  },
  {
    src: "/Claude/Questions/assets/field-trip-parent-letter.png",
    title: "Field Trip Register",
    note: "The parent letter for a one-day trip: the day hour by hour, the route, the named emergency department.",
  },
  {
    src: "/Claude/Questions/assets/tournament-travel-guide.png",
    title: "Tournament Travel Guide",
    note: "The host-issued guide visiting coaches receive: contacts, arrivals, accommodation, meals.",
  },
];

export default function UnsubscribePage() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("eti360-unsub-logged")) return;
    } catch {
      // storage unavailable; log anyway
    }
    const params = new URLSearchParams(window.location.search);
    const data = new FormData();
    data.append(ENTRY_SCHOOL, params.get("school") || "unknown");
    data.append(ENTRY_ARM, params.get("arm") || "unknown");
    fetch(FORM_ENDPOINT, { method: "POST", mode: "no-cors", body: data })
      .then(() => {
        try {
          sessionStorage.setItem("eti360-unsub-logged", "1");
        } catch {
          // ignore
        }
      })
      .catch(() => {
        // The removal is honored regardless; logging is best-effort.
      });
  }, []);

  return (
    <>
      <section className="hero hero-inner-page">
        <div className="hero-inner">
          <p className="label label-light ui">Email preferences</p>
          <h1>You have been removed from our email list.</h1>
          <p className="subhead">
            No further campaign email will come from us to this address. If you arrived here by
            mistake, or would like to hear from us again, write to danskimin@eti360.com.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 860, padding: "56px 24px 24px" }}>
          <p className="label ui" style={{ color: "var(--gold-dark, #8a6c1f)" }}>
            The documents we produce
          </p>
          <p style={{ maxWidth: 640, color: "var(--slate, #586776)", margin: "10px 0 40px" }}>
            The work continues on the website. Every page below is from Harborview International
            School, our reference school, fictitious by design, so no real school&apos;s documents
            are ever shown.
          </p>

          {DOCUMENTS.map((doc) => (
            <figure key={doc.src} style={{ margin: "0 0 48px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doc.src}
                alt={doc.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  border: "1px solid #dfe4e9",
                  borderRadius: 6,
                  boxShadow: "0 12px 32px rgba(13, 53, 88, 0.08)",
                }}
              />
              <figcaption style={{ marginTop: 12 }}>
                <strong style={{ color: "var(--navy, #0d3558)" }}>{doc.title}</strong>
                <span style={{ color: "var(--slate, #586776)" }}> · {doc.note}</span>
              </figcaption>
            </figure>
          ))}

          <p style={{ color: "var(--muted, #8592a3)", fontSize: 14, margin: "8px 0 64px" }}>
            ETI360 provides decision support and does not certify trips or sell insurance.
            Decisions and responsibilities remain with the school.
          </p>
        </div>
      </section>
    </>
  );
}
