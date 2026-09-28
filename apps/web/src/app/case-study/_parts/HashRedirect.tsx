"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* The case study was one long page until 2026-09-28; a link to one of its
   chapters (/case-study#{chapter}) now lands on that step's own page. Other
   anchors (#the-work, #the-year, #who-decides) are still on the overview. */
export function HashRedirect({ ids }: { ids: string[] }) {
  const router = useRouter();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (ids.includes(id)) router.replace(`/case-study/${id}`);
  }, [ids, router]);
  return null;
}
