"use client";

import { useEffect } from "react";

/* First-touch source capture. UTM parameters arrive on the landing page and
   are gone by the time a visitor reaches /contact, so the first page load
   stores them (plus referrer and landing path) in sessionStorage; the contact
   form reads them back at submit time. No cookies — sessionStorage only,
   cleared when the tab closes, consistent with the cookieless posture. */
export function SourceCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("eti_source")) return;
      const p = new URLSearchParams(window.location.search);
      const source = {
        utm_source: p.get("utm_source") || "",
        utm_medium: p.get("utm_medium") || "",
        utm_campaign: p.get("utm_campaign") || "",
        utm_content: p.get("utm_content") || "",
        utm_term: p.get("utm_term") || "",
        referrer: document.referrer || "",
        landing: window.location.pathname,
      };
      sessionStorage.setItem("eti_source", JSON.stringify(source));
    } catch {
      /* storage unavailable — submissions simply arrive without source */
    }
  }, []);
  return null;
}
