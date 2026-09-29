import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  otherSchoolNote,
  siteDocument,
  STEP_UI,
  TIER_LINES,
  WHO_DECIDES_BOX,
  type Excerpt,
  type Step,
} from "@/content/case-study";
import { getProduct, type Tier } from "@/content/products";
import { TIER_NAMES } from "@/content/services";
import { openHref, PAPER_NAME, thumbEdition, type Paper } from "@/content/versions";
import styles from "../page.module.css";

/* The pieces the overview and the steps share. Copy lives in
   src/content/case-study.ts; nothing here adds words beyond STEP_UI.

   Spacing (reviewer's point 12): wherever a label and a sentence sit in
   separate elements, the space between them is inside a text node (a
   template string), so copy-paste and screen readers get "leave out. The
   school", never "leave out.The school". */

/* ── Tiers ── */

export function tiersOf(s: Step): Tier[] {
  return [...getProduct(s.id).tiers].sort();
}

const TIER_CLASS: Record<Tier, string> = { 1: styles.tier1, 2: styles.tier2, 3: styles.tier3 };

/** Tier chips: a swatch in the tier color beside navy text on white, so the
    text passes AA at its size whatever the tier color (Tier 3's #3182AC
    under white text does not). "Tier 2" in the step list, the full
    canonical name on the step itself. */
export function TierChips({ step, short = false }: { step: Step; short?: boolean }) {
  return (
    <span className={`${styles.chips} ui`}>
      {tiersOf(step).map((t, i) => (
        <span key={t} className={styles.chip}>
          {i > 0 ? " " : null}
          <span className={`${styles.swatch} ${TIER_CLASS[t]}`} aria-hidden="true" />
          {short ? (
            <>
              <span aria-hidden="true">{`Tier ${t}`}</span>
              <span className="sr-only">{`, ${TIER_NAMES[t]}`}</span>
            </>
          ) : (
            TIER_NAMES[t]
          )}
        </span>
      ))}
    </span>
  );
}

/** What Tier 1, 2 and 3 mean, one line each (Dan, 2026-09-28): under the
    step list on wide screens, a closed disclosure under the step row below
    1024px. */
export function TierKey({ variant }: { variant: "list" | "disclosure" }) {
  const lines = (
    <ul className={styles.tierLines}>
      {([1, 2, 3] as Tier[]).map((t) => (
        <li key={t}>
          <span className={`${styles.swatch} ${TIER_CLASS[t]}`} aria-hidden="true" />
          <span>
            <strong>{`${TIER_NAMES[t]}.`}</strong>
            {` ${TIER_LINES[t]}`}
          </span>
        </li>
      ))}
    </ul>
  );
  if (variant === "list") {
    return (
      <div className={`${styles.tierKey} ui`}>
        <p className={styles.tierKeyLabel}>{STEP_UI.tiers}</p>
        {lines}
      </div>
    );
  }
  return (
    <details className={`${styles.tierDisclosure} ui`}>
      <summary>{STEP_UI.tiers}</summary>
      {lines}
    </details>
  );
}

/* ── Notices ── */

/** Each fictional name's notice, verbatim, run as one paragraph. */
export function Notices({ notices, className }: { notices: string[]; className?: string }) {
  if (notices.length === 0) return null;
  return (
    <p className={`${styles.notices}${className ? ` ${className}` : ""} ui`}>{notices.join(" ")}</p>
  );
}

/* ── Rows: a labeled grid on wide screens, stacked on phones (the parts
   summaries, the decision table, the overview's year). The visible column
   heads are aria-hidden; each cell carries its column's name as a label
   that only screen readers hear, so the table's header semantics reach
   them at every width (review fix, 2026-09-28). On phones the decision
   table shows its two labels inline; the others need none, the first cell
   naming the row. ── */

export function Rows({
  labels,
  rows,
  variant,
}: {
  labels: string[];
  rows: { key: string; cells: ReactNode[] }[];
  variant: "outputs" | "decisions" | "glance";
}) {
  return (
    <div className={`${styles.rows} ${styles[variant]}`}>
      <div className={`${styles.rowHead} ui`} aria-hidden="true">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <ul className={styles.rowList}>
        {rows.map((r) => (
          <li key={r.key} className={styles.rowItemLine}>
            {r.cells.map((c, j) => (
              <div key={labels[j]} className={styles.cell}>
                <span className={`${styles.cellLabel} ui`}>{`${labels[j]}: `}</span>
                <div className={styles.cellBody}>{c}</div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── A step's parts, in the page's order ── */

function BlockHead({ label, sub, aside, id }: { label: string; sub?: string; aside?: string; id?: string }) {
  return (
    <div className={styles.blockHead}>
      <h2 className={`${styles.blockLabel} ui`} id={id}>
        {label}
      </h2>
      {sub ? (
        <p className={styles.blockSub}>
          {sub}
          {aside ? <span className={`${styles.paper} ui`}>{` · ${aside}`}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

function List({ items, cols = false, className }: { items: string[]; cols?: boolean; className?: string }) {
  return (
    <ul className={`${styles.list}${cols ? ` ${styles.listCols}` : ""}${className ? ` ${className}` : ""}`}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

/** A lead in bold and its sentence, one text run apart. */
function Lead({ lead, text }: { lead: string; text: string }) {
  return (
    <>
      <strong>{lead}</strong>
      {` ${text}`}
    </>
  );
}

/** The Travel Program Review's opening: the first conversation. */
export function Conversation({ step }: { step: Step }) {
  if (!step.conversation) return null;
  return (
    <div role="region" className={styles.conversation} aria-labelledby="conversation">
      <BlockHead id="conversation" label={STEP_UI.conversation} sub={step.conversation.title} />
      <List items={step.conversation.items} className={styles.listThree} />
    </div>
  );
}

/** What Harborview receives: a compact summary of the output. */
export function Receives({ step }: { step: Step }) {
  const r = step.receives;
  return (
    <div role="region" className={styles.receives} aria-labelledby="receives">
      <BlockHead id="receives" label={STEP_UI.receives} sub={r.title} aside={r.paper} />
      {r.decisions ? (
        <Rows
          variant="decisions"
          labels={["The decision", "The documents", "Who holds them"]}
          rows={r.decisions.map((d) => ({
            key: d.decision,
            cells: [
              <strong key="d">{d.decision}</strong>,
              <span key="docs" className={styles.docNames}>
                {d.documents.map((doc, i) => (
                  <span key={doc.id}>
                    {i > 0 ? " · " : null}
                    <Link href={`/trip-package#${doc.id}`}>{doc.name}</Link>
                  </span>
                ))}
              </span>,
              <span key="h">{d.holders}</span>,
            ],
          }))}
        />
      ) : (
        <Rows
          variant="outputs"
          labels={["Part", "What it holds"]}
          rows={(r.parts ?? []).map((p) => ({
            key: p.part,
            cells: [<strong key="p">{p.part}</strong>, <span key="h">{p.holds}</span>],
          }))}
        />
      )}
      {r.note ? (
        <p className={styles.receivesNote}>
          <Lead lead={r.note.lead} text={r.note.text} />
        </p>
      ) : null}
    </div>
  );
}

function MoveHead({ n, label, title }: { n: number; label: string; title?: string }) {
  return (
    <div className={styles.moveHead}>
      <span className={`${styles.moveNum} ui`} aria-hidden="true">
        {n}
      </span>{" "}
      <div>
        <h3 className={`${styles.moveLabel} ui`}>
          <span className="sr-only">{`${n}. `}</span>
          {label}
        </h3>
        {title ? <p className={styles.moveTitle}>{title}</p> : null}
      </div>
    </div>
  );
}

/** How it works: 1 sends, 2 ETI360 does (navy, the strongest block, beside
    the other two on wide screens), 3 decides. */
export function HowItWorks({ step }: { step: Step }) {
  return (
    <div role="region" className={styles.how} aria-labelledby="how">
      <BlockHead id="how" label={STEP_UI.how} />
      <ol className={styles.moves}>
        <li className={`${styles.move} ${styles.moveSends}`}>
          <MoveHead n={1} label={STEP_UI.moves.sends} />
          <List items={step.sends} />
        </li>
        <li className={`${styles.move} ${styles.moveDoes}`}>
          <MoveHead n={2} label={STEP_UI.moves.does} title={step.does.title} />
          <List items={step.does.items} />
        </li>
        <li className={`${styles.move} ${styles.moveDecides}`}>
          <MoveHead n={3} label={STEP_UI.moves.decides} />
          <List items={step.decides} />
        </li>
      </ol>
    </div>
  );
}

/** The one decision-ownership box on a page: ETI360's role first. */
export function WhoDecidesBox({ id = "who-decides" }: { id?: string }) {
  return (
    <aside className={styles.who} aria-labelledby={id}>
      <h2 className={`${styles.whoLabel} ui`} id={id}>
        {STEP_UI.whoDecides}
      </h2>
      <p className={styles.whoText}>{WHO_DECIDES_BOX}</p>
    </aside>
  );
}

/* ── Excerpts ── */

/** One excerpt: a column of a sample page, opening its document at that
    page. `grow` sets its share of the row so every excerpt's source text
    reads at one size (its width in points over its text size). */
function ExcerptFigure({ ex }: { ex: Excerpt }) {
  const t = siteDocument(ex.open);
  const edition = thumbEdition(t.version, t.doc);
  const href = edition ? openHref(t.version, t.doc, edition, ex.open.page) : `/case-study/${ex.image}`;
  const label = edition
    ? `Open the ${t.doc.title} at page ${ex.open.page}, ${PAPER_NAME[edition]} PDF (${STEP_UI.opens}).`
    : `Open this excerpt larger (image, ${STEP_UI.opens}).`;
  const style = { ["--grow" as string]: (ex.pt / ex.textPt).toFixed(2) } as CSSProperties;
  return (
    <figure className={styles.excerpt} style={style}>
      {/* The link's name is the image's alt text, then the action, so a
          screen reader hears what the excerpt shows (review fix,
          2026-09-28: an aria-label here replaced the alt text). */}
      <a className={styles.excerptLink} href={href} target="_blank" rel="noopener">
        <Image
          src={`/case-study/${ex.image}`}
          width={ex.width}
          height={ex.height}
          alt={ex.alt}
          sizes="(max-width: 640px) 100vw, 460px"
        />
        <span className="sr-only">{` ${label}`}</span>
      </a>
      <figcaption>
        <span className={styles.caption}>{ex.caption}</span>{" "}
        <span className={`${styles.source} ui`}>{ex.source}</span>
      </figcaption>
    </figure>
  );
}

export function Excerpts({ step }: { step: Step }) {
  const note = step.otherSchool ? otherSchoolNote(step.otherSchool) : null;
  return (
    <div role="region" className={styles.excerpts} aria-labelledby="excerpts">
      <BlockHead id="excerpts" label={STEP_UI.excerpts} />
      {note ? (
        <div className={`${styles.otherSchool} ui`}>
          <p>{note.text}</p>
          <p className={styles.otherNotice}>{note.notice}</p>
        </div>
      ) : null}
      <div className={`${styles.excerptRow}${step.excerpts.length === 1 ? ` ${styles.excerptSingle}` : ""}`}>
        {step.excerpts.map((ex) => (
          <ExcerptFigure key={ex.image} ex={ex} />
        ))}
      </div>
      {step.excerptNote ? (
        <p className={styles.excerptNote}>
          <Lead lead={step.excerptNote.lead} text={step.excerptNote.text} />
        </p>
      ) : null}
    </div>
  );
}

/** The Trip Package's close: the rest of the year. */
export function RestOfYear({ step }: { step: Step }) {
  const r = step.restOfYear;
  if (!r) return null;
  return (
    <div role="region" className={styles.rest} aria-labelledby="rest-of-year">
      <div className={styles.restText}>
        <BlockHead id="rest-of-year" label={r.title} sub={r.subtitle} />
        <ul className={styles.restList}>
          {r.items.map((it) => (
            <li key={it.lead}>
              <Lead lead={it.lead} text={it.text} />
            </li>
          ))}
        </ul>
        <p className={styles.restDecides}>
          <Lead lead={`${STEP_UI.moves.decides}.`} text={r.decides} />
        </p>
      </div>
    </div>
  );
}

/* ── The step's foot: the documents in both papers and the pages on this
   site. The next step is the pinned bar's Next (review fix, 2026-09-28:
   the foot's own Next step block repeated it). ── */

/** The two editions of a document, each named in full for a screen reader
    ("Open the Travel Program Review, A4 PDF"), the school's own paper
    first. */
function PdfLinks({ refDoc }: { refDoc: { version: string; doc: string } }) {
  const { version, doc } = siteDocument(refDoc);
  const sizes: Paper[] = version.paperDefault === "a4" ? ["a4", "letter"] : ["letter", "a4"];
  return (
    <span className={styles.pdfLinks}>
      {sizes.map((size, i) => (
        <span key={size}>
          {i > 0 ? " · " : null}
          {doc.editions[size] ? (
            <a
              href={openHref(version, doc, size)}
              target="_blank"
              rel="noopener"
              aria-label={`Open the ${doc.title}, ${PAPER_NAME[size]} PDF (opens in a new tab)`}
            >
              {`${PAPER_NAME[size]} PDF`}
            </a>
          ) : (
            <span className={styles.pending}>{`${PAPER_NAME[size]} edition in preparation`}</span>
          )}
        </span>
      ))}
    </span>
  );
}

export function StepFoot({ step }: { step: Step }) {
  return (
    <div className={`${styles.stepFoot} ui`}>
      <div className={styles.footGroup}>
        <h2 className={styles.footLabel}>{STEP_UI.docs}</h2>
        <ul className={styles.footDocs}>
          {step.docs.map((d) => {
            const { version, doc } = siteDocument(d);
            return (
              <li key={`${d.version}/${d.doc}`}>
                <span className={styles.footDocName}>{`${doc.title}, ${version.school}`}</span>{" "}
                <PdfLinks refDoc={d} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.footGroup}>
        <h2 className={styles.footLabel}>{STEP_UI.onSite}</h2>
        <ul className={styles.footLinks}>
          {step.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{`${l.label} →`}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
