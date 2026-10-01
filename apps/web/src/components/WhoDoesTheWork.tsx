import { DAN_TRACK_RECORD, FOUNDERS_LINE, SEB_LINE } from "@/content/voice";

/* Who does the work (spec S13): the founders, always named together, then
   Dan's and Seb's bios (Dan, 2026-10-01). Dan's track record stays credited
   to his career in schools, never to ETI360 as a company. Place inside the
   page's own container. */

export function WhoDoesTheWork({ title = "Who does the work", id = "who" }: { title?: string; id?: string }) {
  return (
    <div>
      <h2 className="section-heading rule-gold" id={id}>
        {title}
      </h2>
      <p>{FOUNDERS_LINE}</p>
      <p>{DAN_TRACK_RECORD}</p>
      <p>{SEB_LINE}</p>
    </div>
  );
}
