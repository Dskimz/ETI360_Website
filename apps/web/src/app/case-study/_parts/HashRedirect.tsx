"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* The case study was one long page until 2026-09-28; a link to one of its
   chapters (/case-study#{chapter}) now lands on that step's own page. Other
   anchors (#the-work, #the-year, #who-decides) are still on the overview,
   and the removed Across the four products table (#across) lands on How the
   work divides, which says the same for the whole year. */
const MOVED: Record<string, string> = { across: "the-work" };

export function HashRedirect({ ids }: { ids: string[] }) {
  const router = useRouter();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (ids.includes(id)) {
      router.replace(`/case-study/${id}`);
      return;
    }
    const moved = MOVED[id];
    const target = moved ? document.getElementById(moved) : null;
    if (target) {
      window.history.replaceState(window.history.state, "", `#${moved}`);
      target.scrollIntoView();
    }
  }, [ids, router]);
  return null;
}
