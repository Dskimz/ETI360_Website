"use client";

import { useEffect } from "react";
import { reportCatalog } from "@/content/solutions";

// Unsubscribe clicks are recorded to the "ETI360 Email Unsubscribes" Google
// Sheet via its linked Form (Dan, 2026-09-09). Only the school slug and arm
// code from the link's query string are sent - never personal data.
const FORM_ENDPOINT =
  "https://docs.google.com/forms/d/e/1FAIpQLSfrCzed1iOBuIWtGXNM2wJoPIjF4FKrsS7xccldu3JUQnL1cQ/formResponse";
const ENTRY_SCHOOL = "entry.2044737610";
const ENTRY_ARM = "entry.977866988";

const SOLUTIONS = Object.values(reportCatalog);

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
      <style>{`
        .unsub-marquee { overflow: hidden; position: relative; padding: 26px 0 10px; }
        .unsub-track { display: flex; gap: 18px; width: max-content; animation: unsub-scroll 55s linear infinite; }
        .unsub-marquee:hover .unsub-track { animation-play-state: paused; }
        @keyframes unsub-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .unsub-card { flex: 0 0 auto; width: 230px; text-decoration: none; }
        .unsub-card img { width: 230px; height: 150px; object-fit: cover; object-position: top; display: block; border: 1px solid #dfe4e9; border-radius: 6px; background: #fff; box-shadow: 0 8px 20px rgba(13, 53, 88, 0.08); }
        .unsub-card span { display: block; margin-top: 8px; font-size: 13px; color: var(--navy, #0d3558); font-weight: 600; }
        @media (prefers-reduced-motion: reduce) { .unsub-track { animation: none; } .unsub-marquee { overflow-x: auto; } }
      `}</style>

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
        <div className="container" style={{ maxWidth: 1120, padding: "26px 24px 40px" }}>
          <p className="label ui" style={{ color: "var(--gold-dark, #8a6c1f)", margin: 0 }}>
            The solutions we produce
          </p>
          <div className="unsub-marquee" aria-label="ETI360 solutions">
            <div className="unsub-track">
              {[...SOLUTIONS, ...SOLUTIONS].map((s, i) => (
                <a className="unsub-card" key={`${s.slug}-${i}`} href={s.href} aria-hidden={i >= SOLUTIONS.length}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={i < SOLUTIONS.length ? s.imageAlt : ""} loading="lazy" />
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
          <p style={{ color: "var(--muted, #8592a3)", fontSize: 13.5, margin: "18px 0 0", maxWidth: 720 }}>
            The pages shown are prepared for Harborview International School. Harborview is not a
            real school; it is used only as a sample school, so no real school&apos;s documents are
            shown. ETI360 provides decision support and does not certify trips or sell insurance.
            Decisions and responsibilities remain with the school.
          </p>
        </div>
      </section>
    </>
  );
}
