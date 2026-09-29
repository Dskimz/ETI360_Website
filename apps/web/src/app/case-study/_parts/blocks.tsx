import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  otherSchoolNote,
  siteDocument,
  STEP_COVER,
  STEP_RECEIVES,
  STEP_UI,
  stepHref,
  STEPS,
  TIER_LINES,
  WHO_DECIDES_BOX,
  type DocGroup,
  type Fact,
  type Step,
} from "@/content/case-study";
import { getProduct, type Tier } from "@/content/products";
import { TIER_NAMES } from "@/content/services";
import type { Version, VersionDocument } from "@/content/versions";
import { DocCard } from "@/components/TripDocCard";
import tripStyles from "@/app/trips/trips.module.css";
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
    under white text does not). "Tier 2" in the step list and on the
    overview's cards, the full canonical name in a step's hero bar. */
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

/** A step's hero chips: the full canonical names, and below 640px the short
    "Tier 2" chips (their full names still read to screen readers), so a
    step with two tiers keeps them on one row of a phone. */
export function HeroChips({ step }: { step: Step }) {
  return (
    <>
      <span className={styles.heroChipsWide}>
        <TierChips step={step} />
      </span>
      <span className={styles.heroChipsPhone}>
        <TierChips step={step} short />
      </span>
    </>
  );
}

/** ETI360's 3-Tier Risk Framework, one line per tier (Dan, 2026-09-28 and
    2026-09-29): under the step list on wide screens, a closed disclosure
    at the foot of the column below 1024px. */
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

/** Each fictional name's notice, verbatim, run as one paragraph. `phoneLead`
    opens the paragraph below 640px only: a step's hero note, which the hero
    bar drops on a phone (review fix, 2026-09-29), so the page still says it
    once, at the foot. */
export function Notices({
  notices,
  className,
  phoneLead,
}: {
  notices: string[];
  className?: string;
  phoneLead?: string;
}) {
  if (notices.length === 0) return null;
  return (
    <p className={`${styles.notices}${className ? ` ${className}` : ""} ui`}>
      {phoneLead ? <span className={styles.phoneOnly}>{`${phoneLead} `}</span> : null}
      {notices.join(" ")}
    </p>
  );
}

/* ── The hero bar (Dan, 2026-09-29: "a small hero bar on each of the
   pages. Give the key information."): a compact navy band under the pinned
   step bar, full width. The name (the page's h1), its line, the tier chips;
   the key facts beside them; the one-line illustrative note along the foot.
   No eyebrow: the pinned bar already says "Step 2 of 4" (review fix,
   2026-09-29). Below 640px only the facts marked `phone` show (at most
   two) and the note gives way to the foot, which says the same, so the
   first document cover lands on a phone's first screen. ── */

export function HeroBar({
  title,
  titleId,
  sub,
  chips,
  facts,
  note,
  overview = false,
}: {
  title: string;
  /** The h1's id: a step's skip link lands on it. */
  titleId?: string;
  sub?: string;
  chips?: ReactNode;
  facts: Fact[];
  note: string;
  /** The overview: a longer h1, set a size smaller, with more room. */
  overview?: boolean;
}) {
  return (
    <div className={`${styles.heroBar}${overview ? ` ${styles.heroBarOverview}` : ""}`}>
      <div className={styles.heroBarInner}>
        <div className={styles.heroHead}>
          <h1 id={titleId} className={styles.heroName} tabIndex={titleId ? -1 : undefined}>
            {title}
          </h1>
          {sub ? <p className={styles.heroSub}>{sub}</p> : null}
          {chips ? <div className={styles.heroChips}>{chips}</div> : null}
        </div>
        <dl className={`${styles.heroFacts} ui`}>
          {facts.map((f) => (
            <div key={f.label} className={f.phone ? undefined : styles.heroFactWide}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className={`${styles.heroNote} ui`}>{note}</p>
      </div>
    </div>
  );
}

/* ── A step's parts, in the page's order ── */

function List({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`${styles.list}${className ? ` ${className}` : ""}`}>
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

/** What Harborview needs: one sentence. */
export function Need({ step }: { step: Step }) {
  return (
    <div className={styles.need}>
      <h2 className={`${styles.needLabel} ui`}>{STEP_UI.need}</h2>
      <p className={styles.needText}>{step.need}</p>
    </div>
  );
}

/** A document as the case study shows it on the trip page's card: its line
    is the decision it supports, its reader line the group's where it sets
    one, and every image's alt text names the document, the school (a
    provider evaluation: the provider, which its title already names) and
    the page. */
function caseStudyDoc(version: Version, doc: VersionDocument, reader?: string): VersionDocument {
  const name = doc.title.includes(version.school) ? doc.title : `${doc.title}, ${version.school}`;
  return {
    ...doc,
    reader: reader ?? doc.reader,
    blurb: doc.decision,
    cover: { ...doc.cover, alt: `First page of the ${name}` },
    insidePages: doc.insidePages.map((pg) => ({
      ...pg,
      image: { ...pg.image, alt: `${name}, page ${pg.page}` },
    })),
  };
}

/* The grid a group's cards take: one document open (the step's own) or
   closed; two, side by side; three or more, with covers at the trip page's
   size or larger, three to a row with the group's `open` card across two
   columns and two rows, or four to a row at 1100px and wider with the open
   card across three columns of the first row. */
function gridClass(count: number, open: boolean): string {
  if (count === 1) return open ? styles.docOne : styles.docClosed;
  return count >= 3 ? styles.docTrio : styles.docGrid;
}

function Group({ group, open }: { group: DocGroup; open: boolean }) {
  const docs = group.docs.map((doc) => siteDocument({ version: group.version, doc }));
  const version = docs[0].version;
  const one = docs.length === 1;
  const note = group.otherSchool ? otherSchoolNote(group.otherSchool) : null;
  const aside = one && !open && (note !== null || group.provider === true);
  // Several documents from another school (the Trip Package's six from
  // Horizon Ridge): below 641px the one-sentence note comes before the grid,
  // so a phone reader is told whose samples they are before scrolling
  // through them, and the notice stays under it; 641px and wider keep both
  // under the grid (review fix, 2026-09-29).
  const noteFirst = !one && note !== null;
  const cls = [styles.docGroup, aside ? styles.docGroupAside : null, noteFirst ? styles.docGroupNoteFirst : null]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <h3 className={`${styles.groupHead} ui`}>{`${version.school} · ${version.title}`}</h3>
      <div className={gridClass(docs.length, open)}>
        {docs.map(({ doc }) => {
          const featured = !one && group.open === doc.slug;
          return (
            <DocCard
              key={doc.slug}
              id={`${version.slug}-${doc.slug}`}
              version={version}
              doc={caseStudyDoc(version, doc, group.readers?.[doc.slug])}
              solo={one}
              lookInside
              insideOpen={one ? open : featured}
              className={featured ? styles.docFeature : undefined}
            />
          );
        })}
      </div>
      {note ? (
        <div className={`${styles.otherSchool} ui`}>
          <p>{note.text}</p>
          <p className={styles.otherNotice}>{note.notice}</p>
        </div>
      ) : null}
      {group.provider ? (
        <div className={`${styles.otherSchool} ui`}>
          <p className={styles.otherNotice}>{version.disclosure}</p>
        </div>
      ) : null}
      {group.note ? (
        <p className={styles.groupNote}>
          <Lead lead={group.note.lead} text={group.note.text} />
        </p>
      ) : null}
    </div>
  );
}

/** What Harborview receives: the documents, as the trip page shows them.
    A step's first group opens its Look inside when it holds one document
    (the step's own document, shown whole); a group of several opens the
    one card it names; every other card starts closed. */
export function StepDocs({ step }: { step: Step }) {
  return (
    <div role="region" className={`${tripStyles.wide} ${styles.docs}`} aria-labelledby="documents">
      <h2 className={`${styles.blockLabel} ui`} id="documents">
        {STEP_UI.receives}
      </h2>
      {step.groups.map((g, i) => (
        <Group key={g.version} group={g} open={i === 0 && g.docs.length === 1} />
      ))}
    </div>
  );
}

function MoveHead({ n, label }: { n: number; label: string }) {
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
      </div>
    </div>
  );
}

/** How it works, one compact row: 1 sends, 2 ETI360 does (navy, the
    strongest cell), 3 decides. */
export function HowItWorks({ step }: { step: Step }) {
  return (
    <div role="region" className={styles.how} aria-labelledby="how">
      <h2 className={`${styles.blockLabel} ui`} id="how">
        {STEP_UI.how}
      </h2>
      <ol className={styles.moves}>
        <li className={`${styles.move} ${styles.moveSends}`}>
          <MoveHead n={1} label={STEP_UI.moves.sends} />
          <List items={step.sends} />
        </li>
        <li className={`${styles.move} ${styles.moveDoes}`}>
          <MoveHead n={2} label={STEP_UI.moves.does} />
          <List items={step.does} />
        </li>
        <li className={`${styles.move} ${styles.moveDecides}`}>
          <MoveHead n={3} label={STEP_UI.moves.decides} />
          <List items={step.decides} />
        </li>
      </ol>
    </div>
  );
}

/** The one decision-ownership line on a page: ETI360's role first. */
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

/** The step's foot: the pages on this site. The documents are the cards
    above; the next step is the pinned bar's Next. */
export function StepFoot({ step }: { step: Step }) {
  return (
    <div className={`${styles.stepFoot} ui`}>
      <h2 className={styles.footLabel}>{STEP_UI.onSite}</h2>
      <ul className={styles.footLinks}>
        {step.links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{`${l.label} →`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── The overview's year at a glance: one card per step, its document's
   cover first. A cover from another fictional school's samples says so
   under the card; that school's notice is in the overview's notices. ── */

export function GlanceCards() {
  return (
    <ol className={`${styles.glance} ui`}>
      {STEPS.map((s) => {
        const { version, doc } = siteDocument(STEP_COVER[s.id]);
        const href = stepHref(s);
        const other = version.school !== "Harborview International School";
        return (
          <li key={s.id} className={styles.glanceCard}>
            {/* The name below is the card's one focus stop (review fix,
                2026-09-29); the cover repeats its link for the pointer. */}
            <Link className={styles.glanceThumb} href={href} aria-hidden="true" tabIndex={-1}>
              <Image
                src={doc.cover.src}
                width={doc.cover.width}
                height={doc.cover.height}
                alt={`First page of the ${doc.title}, ${version.school}`}
                sizes="(max-width: 640px) 44vw, 190px"
              />
            </Link>
            <p className={styles.glanceStep}>
              <span className={styles.glanceNum}>{`Step ${s.number}`}</span> <TierChips step={s} short />
            </p>
            <h3 className={styles.glanceName}>
              <Link href={href}>{s.name}</Link>
            </h3>
            <p className={styles.glanceText}>{STEP_RECEIVES[s.id]}</p>
            {other ? <p className={styles.glanceSample}>{`${STEP_UI.sampleFrom} ${version.school}`}</p> : null}
          </li>
        );
      })}
    </ol>
  );
}

/** The notices of the other fictional schools whose covers the overview's
    cards show, in step order, each once. */
export function glanceNotices(): string[] {
  const seen = new Set<string>();
  for (const s of STEPS) {
    const { version } = siteDocument(STEP_COVER[s.id]);
    if (version.school !== "Harborview International School") seen.add(version.disclosure);
  }
  return [...seen];
}
