"use client";

import { useEffect } from "react";

/* Scroll-reveal: elements carrying data-reveal fade and rise into place as
   they enter the viewport. The hidden initial state applies only once this
   component has run (html.fx), so content is never invisible without
   JavaScript, and prefers-reduced-motion disables the movement entirely
   in CSS. Restrained by design: one soft rise, no parallax, no counters. */
export function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("fx");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0 || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("revealed");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
