"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* Two small conveniences on top of the step links, which work without it:
   the left and right arrow keys follow the bar's Previous and Next links
   (those marked aria-keyshortcuts; never while typing in a field, never
   with a modifier key, never on a held key's repeats, so holding the key
   moves one step, and never out of the guide: the last step's Next link to
   Contact carries no shortcut, so it stays a click), and on phones the step
   row scrolls sideways so the current step is in view, inset by the row's
   scroll padding so part of the step before it shows. */

function typing(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

export function StepKeys() {
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented || e.repeat || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (typing(e.target)) return;
      // The bar link that declares this key, read at the moment of the
      // press, so a key pressed mid-navigation follows the page on screen.
      const link = document.querySelector<HTMLAnchorElement>(`a[aria-keyshortcuts="${e.key}"]`);
      const href = link?.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      router.push(href);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  useEffect(() => {
    const row = document.querySelector<HTMLElement>("[data-step-row] ol");
    const current = row?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!row || !current || row.scrollWidth <= row.clientWidth) return;
    // Sideways only: the page itself does not move.
    const inset = parseFloat(getComputedStyle(row).scrollPaddingLeft) || 16;
    row.scrollLeft = Math.max(0, current.offsetLeft - inset);
  }, []);

  return null;
}
