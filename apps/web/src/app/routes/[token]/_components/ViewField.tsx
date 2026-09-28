"use client";

import { useSyncExternalStore } from "react";

/* Carries the view in the address (#white-mountains/day-2 and so on) through
   the password form, so the visitor lands on the day the link pointed at. */
const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

export function ViewField() {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => "",
  );
  return <input type="hidden" name="view" value={hash} />;
}
