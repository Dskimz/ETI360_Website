import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Editions } from "@/components/TripDocCard";
import {
  chapterDocuments,
  openTarget,
  shownExhibits,
  STEP_UI,
  type Chapter,
  type Exhibit,
} from "@/content/case-study";
import { getProduct, type Tier } from "@/content/products";
import { TIER_NAMES } from "@/content/services";
import { openHref, thumbEdition } from "@/content/versions";
import styles from "../page.module.css";

/* The pieces the overview and the steps share. Copy lives in
   src/content/case-study.ts; nothing here adds words beyond STEP_UI. */

/* ── Tiers ── */

/** A step's tiers: its product's, or those of the products its label names. */
export function tiersOf(ch: Chapter): Tier[] {
  const slugs = ch.product ? [ch.product] : (ch.opens ?? []);
  return [...new Set(slugs.flatMap((s) => getProduct(s).tiers))].sort();
}

const TIER_CLASS: Record<Tier, string> = { 1: styles.tier1, 2: styles.tier2, 3: styles.tier3 };

/** The tier chips in the tier colors: "Tier 2" in the step list (the full
    name read out), the full canonical name on the step itself. */
export function TierChips({ chapter, short = false }: { chapter: Chapter; short?: boolean }) {
  const tiers = tiersOf(chapter);
  if (tiers.length === 0) return null;
  return (
    <span className={`${styles.chips} ui`}>
      {tiers.map((t) =>
        short ? (
          <span key={t} className={`${styles.chip} ${TIER_CLASS[t]}`} title={TIER_NAMES[t]}>
            <span aria-hidden="true">Tier {t}</span>
            <span className="sr-only">, {TIER_NAMES[t]}</span>
          </span>
        ) : (
          <span key={t} className={`${styles.chip} ${TIER_CLASS[t]}`}>
            {TIER_NAMES[t]}
          </span>
        ),
      )}
    </span>
  );
}

/* ── Notices ── */

export function Notices({ notices, className }: { notices: string[]; className?: string }) {
  if (notices.length === 0) return null;
  return (
    <div className={`${styles.notices}${className ? ` ${className}` : ""} ui`}>
      {notices.map((n) => (
        <p key={n}>{n}</p>
      ))}
    </div>
  );
}

/* ── Exhibits ── */

/** One page from a sample: a portrait page as a thumbnail with its caption
    beside it, a wide crop across its cell with the caption under it. A page
    of a document on this site opens that document at the page, through the
    logged /open route; any other page opens its own image. */
function ExhibitCard({ ex }: { ex: Exhibit }) {
  const target = openTarget(ex);
  const edition = target ? thumbEdition(target.version, target.doc) : null;
  const link =
    target && edition
      ? {
          href: openHref(target.version, target.doc, edition, target.page),
          label: `Open the ${target.doc.title} at page ${target.page} (PDF, opens in a new tab)`,
        }
      : { href: `/case-study/${ex.image}`, label: "Open this page larger (image, opens in a new tab)" };
  return (
    <figure className={ex.wide ? styles.exWide : styles.exPage}>
      <a className={styles.figLink} href={link.href} target="_blank" rel="noopener" aria-label={link.label}>
        <Image
          src={`/case-study/${ex.image}`}
          width={ex.width}
          height={ex.height}
          alt={ex.alt}
          sizes={ex.wide ? "(max-width: 767px) 92vw, 400px" : "(max-width: 640px) 112px, 150px"}
        />
      </a>
      <figcaption>
        <span className={styles.caption}>{ex.caption}</span>
        <span className={`${styles.source} ui`}>{ex.source}</span>
      </figcaption>
    </figure>
  );
}

/** A step's exhibits: another school's lead first, where it applies; the
    pages two to a row, each section's run under that section's intro
    (across the row); the sections' notes in the free cell or under. Where
    the last row has a free cell, the last section's intro opens it, above
    the notes, rather than taking a row of its own. */
export function StepExhibits({ chapter }: { chapter: Chapter }) {
  const { lead, groups, notes } = shownExhibits(chapter);
  const lastGroup = groups[groups.length - 1];
  // The cell beside the last page, when that row has one free.
  const noteInGrid = (lastGroup?.exhibits.length ?? 0) % 2 === 1;
  const sideIntro = noteInGrid ? lastGroup?.intro : undefined;
  const noteBlock =
    notes.length > 0 || sideIntro ? (
      <div className={styles.exNotes}>
        {sideIntro ? <p className={styles.note}>{sideIntro}</p> : null}
        {notes.map((n) => (
          <p key={n.lead} className={styles.note}>
            <strong>{n.lead}</strong> {n.text}
          </p>
        ))}
      </div>
    ) : null;
  return (
    <div className={styles.exhibitsBlock}>
      <h2 className={`${styles.blockLabel} ui`}>{STEP_UI.exhibits}</h2>
      {lead ? (
        <div className={styles.otherSchool}>
          <p>{lead.text}</p>
          <Notices notices={lead.notices} />
        </div>
      ) : null}
      <div className={styles.exhibits}>
        {groups.map((g) => (
          <Fragment key={g.exhibits[0].image}>
            {g.intro && !(g === lastGroup && sideIntro) ? <p className={styles.sectionIntro}>{g.intro}</p> : null}
            {g.exhibits.map((ex) => (
              <ExhibitCard key={ex.image} ex={ex} />
            ))}
          </Fragment>
        ))}
        {noteInGrid ? noteBlock : null}
      </div>
      {noteInGrid ? null : noteBlock}
    </div>
  );
}

/* ── The four moves ── */

function List({ items, cols = false }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`${styles.list}${cols ? ` ${styles.listCols}` : ""}`}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

function MoveHead({ n, label, title }: { n: number; label: string; title?: string }) {
  return (
    <div className={styles.moveHead}>
      <span className={`${styles.moveNum} ui`} aria-hidden="true">
        {n}
      </span>
      <div>
        <h2 className={`${styles.moveLabel} ui`}>
          <span className="sr-only">{n}. </span>
          {label}
        </h2>
        {title ? <p className={styles.moveTitle}>{title}</p> : null}
      </div>
    </div>
  );
}

function WhoDecides({ ch }: { ch: Chapter }) {
  return (
    <>
      {ch.whoDecides.map((w) => (
        <blockquote key={w.text} className={styles.who}>
          <p className={`${styles.whoLabel} ui`}>Who decides</p>
          <p className={styles.whoText}>{w.text}</p>
          {w.source ? <p className={`${styles.whoSource} ui`}>{w.source}</p> : null}
        </blockquote>
      ))}
    </>
  );
}

const chars = (xs: string[]) => xs.reduce((n, x) => n + x.length, 0);

/** Whether the Who decides lines fit under the fourth move without making
    it much taller than the third (judged by length); if not, they run as a
    row under both, so neither card is left half empty. Layout only. */
function whoInDecides(ch: Chapter): boolean {
  const receives = chars([ch.receives.title, ...ch.receives.receives]);
  const decides = chars(ch.receives.decides) + chars(ch.whoDecides.map((w) => `${w.text} ${w.source ?? ""}`));
  return decides <= receives * 1.15;
}

/** Sends, does, receives, decides: ETI360's move on navy across the
    column, since it carries the work. The chapter's Who decides lines,
    from the documents' own text, close the fourth move or run under the
    third and fourth. */
export function Moves({ ch }: { ch: Chapter }) {
  const inCard = whoInDecides(ch);
  return (
    <>
    <ol className={styles.moves}>
      <li className={`${styles.move} ${styles.moveSends}`}>
        <MoveHead n={1} label={STEP_UI.moves.sends} title={ch.sends.title} />
        <List items={ch.sends.items} cols={ch.sends.items.length > 2} />
      </li>
      <li className={`${styles.move} ${styles.moveDoes}`}>
        <MoveHead n={2} label={STEP_UI.moves.does} title={ch.does.title} />
        <List items={ch.does.items} cols={ch.does.items.length > 2} />
      </li>
      <li className={`${styles.move} ${styles.moveReceives}`}>
        <MoveHead n={3} label={STEP_UI.moves.receives} title={ch.receives.title} />
        <List items={ch.receives.receives} />
      </li>
      <li className={`${styles.move} ${styles.moveDecides}`}>
        <MoveHead n={4} label={STEP_UI.moves.decides} />
        <List items={ch.receives.decides} />
        {inCard ? <WhoDecides ch={ch} /> : null}
      </li>
    </ol>
    {inCard ? null : (
      <div className={`${styles.whoRow}${ch.whoDecides.length > 1 ? ` ${styles.whoRowTwo}` : ""}`}>
        <WhoDecides ch={ch} />
      </div>
    )}
    </>
  );
}

/* ── Ruled rows (the year at a glance, the decision table): a labeled
   grid on wide screens, stacked with inline labels on phones. ── */

export function Rows({
  labels,
  rows,
  variant,
  ordered = false,
}: {
  labels: string[];
  rows: { key: string; cells: ReactNode[] }[];
  variant: "glance" | "decisions";
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <div className={`${styles.rows} ${styles[variant]}`}>
      <div className={`${styles.rowHead} ui`} aria-hidden="true">
        {ordered ? <span /> : null}
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <Tag className={styles.rowList}>
        {rows.map((r, i) => (
          <li key={r.key} className={styles.rowItemLine}>
            {ordered ? <span className={`${styles.rowNum} ui`}>{i + 1}</span> : null}
            {r.cells.map((c, j) => (
              <div key={labels[j]} className={styles.cell}>
                <span className={`${styles.cellLabel} ui`}>{labels[j]}</span>
                <div className={styles.cellBody}>{c}</div>
              </div>
            ))}
          </li>
        ))}
      </Tag>
    </div>
  );
}

/** The Trip Package step's decision table ("listed below" in its third move). */
export function DecisionTable({ ch }: { ch: Chapter }) {
  if (!ch.decisionTable) return null;
  return (
    <div className={styles.decisionBlock}>
      <h2 className={`${styles.blockLabel} ui`}>The Trip Package, decision by decision</h2>
      <Rows
        variant="decisions"
        labels={["The decision", "The documents", "Who holds them"]}
        rows={ch.decisionTable.map((d) => ({
          key: d.decision,
          cells: [
            <strong key="d">{d.decision}</strong>,
            <span key="docs" className={styles.docNames}>
              {d.documents.map((doc, i) => (
                <span key={doc.id}>
                  {i > 0 ? <span aria-hidden="true"> &middot; </span> : null}
                  <Link href={`/trip-package#${doc.id}`}>{doc.name}</Link>
                </span>
              ))}
            </span>,
            <span key="h">{d.holders}</span>,
          ],
        }))}
      />
    </div>
  );
}

/* ── The step's foot: the documents in both papers, the pages on this site ── */

export function StepLinks({ ch }: { ch: Chapter }) {
  const docs = chapterDocuments(ch);
  return (
    <div className={`${styles.stepFoot} ui`}>
      {docs.length > 0 ? (
        <div className={styles.footGroup}>
          <p className={styles.footLabel}>Open the documents</p>
          <ul className={styles.footDocs}>
            {docs.map(({ version, doc }) => (
              <li key={`${version.slug}/${doc.slug}`}>
                <span className={styles.footDocName}>
                  {doc.title} <span className={styles.footSchool}>&middot; {version.school}</span>
                </span>
                <Editions version={version} doc={doc} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className={styles.footGroup}>
        <p className={styles.footLabel}>On this site</p>
        <ul className={styles.footLinks}>
          {ch.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label} &rarr;</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
