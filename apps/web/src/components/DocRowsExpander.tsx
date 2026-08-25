"use client";

import { useEffect, useState } from "react";
import { DocRow, type DocEntry } from "./DocShowcase";

/* Collapsed continuation of a doc-row sequence. One-way expand; opens
   automatically when the URL hash targets one of its hidden entries so
   email anchor links keep landing on their document. */

export function DocRowsExpander({
  items,
  label,
}: {
  items: DocEntry[];
  label: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const hash = window.location.hash.slice(1);
      if (hash && items.some((e) => e.anchor === hash)) {
        setOpen(true);
        /* second pass: image loads shift layout after the first scroll */
        [50, 600].forEach((ms) =>
          setTimeout(() => document.getElementById(hash)?.scrollIntoView(), ms),
        );
      }
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [items]);

  if (open) {
    return (
      <div className="doc-rows">
        {items.map((e) => (
          <DocRow key={e.anchor} e={e} />
        ))}
      </div>
    );
  }

  return (
    <div className="doc-rows-more">
      <button
        type="button"
        className="doc-rows-toggle ui"
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
    </div>
  );
}
