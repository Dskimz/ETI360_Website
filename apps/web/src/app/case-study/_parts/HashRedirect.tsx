"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* Old anchors on /case-study (a hash never reaches the server, so the
   redirects in src/lib/redirects.ts cannot see them). The case study was
   one long page until 2026-09-28, then six steps, now four:
     - a product chapter (#travel-program-review, …) lands on its step;
     - #first-conversation lands on the Travel Program Review's How it
       works, whose ETI360 cell opens with the first conversation
       (2026-09-29: the conversation block folded into it);
     - #through-the-year lands on the overview's line for the rest of the
       year (2026-09-29: the Trip Package's block folded into it, the Trip
       Package being step 2, no longer the last);
     - #across (the removed Across the four products table) lands on How
       the work divides, which says the same for the whole year;
     - #the-work, #the-year and #who-decides are still on the overview. */
const STEP_ANCHORS: Record<string, string> = {
  "travel-program-review": "/case-study/travel-program-review",
  "field-trip-package": "/case-study/field-trip-package",
  "conference-travel-package": "/case-study/conference-travel-package",
  "trip-package": "/case-study/trip-package",
  "first-conversation": "/case-study/travel-program-review#how",
};
const MOVED: Record<string, string> = { across: "the-work", "through-the-year": "rest-of-year" };

export function HashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const step = STEP_ANCHORS[id];
    if (step) {
      router.replace(step);
      return;
    }
    const moved = MOVED[id];
    const target = moved ? document.getElementById(moved) : null;
    if (target) {
      window.history.replaceState(window.history.state, "", `#${moved}`);
      target.scrollIntoView();
    }
  }, [router]);
  return null;
}
