"use client";

import { useEffect } from "react";

/* Section highlighting for the framework sequence.

   The tier whose visual is currently pinned is the active one: its copy sits
   at full strength while the others recede. This is the device that makes a
   long scrolling section legible, because at any moment exactly one tier is
   holding the stage.

   The dimming applies only once this has run (html.seq), so with JavaScript
   off every tier stays fully legible, and it is disabled outright under
   prefers-reduced-motion. */
export function SequenceHighlight() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".ft-seq-item"),
    );
    if (items.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => (el.dataset.active = "true"));
      return;
    }

    const root = document.documentElement;
    root.classList.add("seq");

    const pick = () => {
      // A tier becomes active once its top passes the upper third of the
      // viewport, which is the point its visual takes over the pinned slot.
      const line = window.innerHeight * 0.42;
      let active = items[0];
      for (const el of items) {
        if (el.getBoundingClientRect().top <= line) active = el;
      }
      for (const el of items) {
        el.dataset.active = String(el === active);
      }
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
      root.classList.remove("seq");
    };
  }, []);

  return null;
}
