import { DAN_TRACK_RECORD, FOUNDERS_LINE, SEB_LINE } from "@/content/voice";

/* Who does the work (spec S13): the founders, always named together, Dan's
   track record (credited to his career in schools, never to ETI360 as a
   company), and Seb's part in every engagement. On the home page and every
   product page. Place inside the page's own container. */

export function WhoDoesTheWork({ title = "Who does the work", id = "who" }: { title?: string; id?: string }) {
  return (
    <div>
      <h2 className="section-heading rule-gold" id={id}>
        {title}
      </h2>
      {/* One text run, so copy-paste and screen readers keep the spaces
          between the three lines (Case Study review, 2026-09-28). */}
      <p>{`${FOUNDERS_LINE} ${DAN_TRACK_RECORD} ${SEB_LINE}`}</p>
    </div>
  );
}
