"use client";

import { useEffect } from "react";

// Unsubscribe clicks are recorded to the "ETI360 Email Unsubscribes" Google
// Sheet via its linked Form (Dan, 2026-09-09). Only the school slug and arm
// code from the link's query string are sent - never personal data.
const FORM_ENDPOINT =
  "https://docs.google.com/forms/d/e/1FAIpQLSfrCzed1iOBuIWtGXNM2wJoPIjF4FKrsS7xccldu3JUQnL1cQ/formResponse";
const ENTRY_SCHOOL = "entry.2044737610";
const ENTRY_ARM = "entry.977866988";

// The solutions marquee is gone (spec S17): it linked retired pages, showed
// the Dashboard, and sold to someone who had just opted out.

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
    </>
  );
}
