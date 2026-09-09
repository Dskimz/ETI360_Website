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
        .unsub-hero { padding: 42px 0 34px; }
        .unsub-hero h1 { font-size: clamp(28px, 3.6vw, 44px); max-width: 860px; }
        .unsub-hero .subhead { margin-top: 10px; font-size: 17px; }
        .unsub-marquee { overflow: hidden; position: relative; padding: 18px 0 6px; }
        .unsub-track { display: flex; gap: 20px; width: max-content; animation: unsub-scroll 60s linear infinite; align-items: flex-start; }
        .unsub-marquee:hover .unsub-track { animation-play-state: paused; }
        @keyframes unsub-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .unsub-card { flex: 0 0 auto; text-decoration: none; }
        .unsub-card span { display: block; margin: 0 0 6px; font-size: 12.5px; letter-spacing: 0.02em; color: var(--parchment, #f4ead2); font-weight: 600; }
        .unsub-card img { height: 240px; width: auto; max-width: 340px; object-fit: contain; display: block; border: 1px solid #dfe4e9; border-radius: 6px; background: #fff; box-shadow: 0 8px 20px rgba(13, 53, 88, 0.08); }
        @media (max-height: 800px) { .unsub-card img { height: 200px; } }
        @media (prefers-reduced-motion: reduce) { .unsub-track { animation: none; } .unsub-marquee { overflow-x: auto; } }
      `}</style>

      <section className="hero hero-inner-page unsub-hero">
        <div className="hero-inner">
          <p className="label label-light ui">Email preferences</p>
          <h1>You have been removed from our email list.</h1>
          <p className="subhead">
            No further campaign email will come from us to this address. If you arrived here by
            mistake, or would like to hear from us again, write to danskimin@eti360.com.
          </p>
        </div>
      </section>

      <section style={{ padding: 0 }}>
        <div className="container" style={{ maxWidth: 1120, padding: "18px 24px 34px" }}>
          <p className="label ui" style={{ color: "var(--gold-dark, #8a6c1f)", margin: 0 }}>
            Educational Travel Solutions from ETI360
          </p>
          <div className="unsub-marquee" aria-label="Educational travel solutions from ETI360">
            <div className="unsub-track">
              {[...SOLUTIONS, ...SOLUTIONS].map((s, i) => (
                <a className="unsub-card" key={`${s.slug}-${i}`} href={s.href} aria-hidden={i >= SOLUTIONS.length}>
                  <span>{s.name}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={i < SOLUTIONS.length ? s.imageAlt : ""} loading="lazy" />
                </a>
              ))}
            </div>
          </div>
          <p style={{ color: "var(--muted, #8592a3)", fontSize: 13.5, margin: "14px 0 0", maxWidth: 720 }}>
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
