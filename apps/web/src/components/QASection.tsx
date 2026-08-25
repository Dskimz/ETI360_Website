"use client";

import { useState } from "react";

/* Q&A section for the audience pages. Each entry follows the fixed
   grammar: the question in the school's voice, what a complete answer
   requires, how the evidence is assembled, and the document that
   carries it (the bridge). First entries render expanded; the rest
   open on demand. */

export type QAEntry = {
  q: string;
  needs: string;
  how: string;
  bridge: { label: string; href: string };
};

function QARow({ e, defaultOpen }: { e: QAEntry; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`qa-entry${open ? " open" : ""}`}>
      <button
        type="button"
        className="qa-q"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{e.q}</span>
        <span className="qa-marker" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="qa-body">
          <p>
            <strong>{e.needs}</strong> {e.how}
          </p>
          <p className="qa-bridge ui">
            Carried by <a href={e.bridge.href}>{e.bridge.label}</a>
          </p>
        </div>
      )}
    </div>
  );
}

export function QABlock({
  label,
  entries,
  expandFirst = 0,
}: {
  label: string;
  entries: QAEntry[];
  expandFirst?: number;
}) {
  return (
    <div className="qa-block">
      <p className="qa-block-label ui">{label}</p>
      {entries.map((e, i) => (
        <QARow key={e.bridge.href + i} e={e} defaultOpen={i < expandFirst} />
      ))}
    </div>
  );
}
