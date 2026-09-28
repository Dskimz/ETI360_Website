import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CtaCard } from "@/components/CtaCard";
import { Editions } from "@/components/TripDocCard";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import {
  ABOUT,
  ACROSS,
  ALL_NOTICES,
  CHAPTERS,
  chapterDocuments,
  glanceOf,
  INTRO,
  NOTICES,
  OPENING_PAGES,
  openTarget,
  READING_THE_CHAPTERS,
  WHO_DECIDES_LEAD,
  WHO_DECIDES_PROVIDERS,
  WORK,
  type Chapter,
  type ChapterSection,
  type Exhibit,
} from "@/content/case-study";
import { getProduct, tierNames } from "@/content/products";
import { openHref, thumbEdition } from "@/content/versions";
import { BRAND_EYEBROW, CLOSING_SENTENCE, WHO_DECIDES } from "@/content/voice";
import headerStyles from "@/components/productheader.module.css";
import styles from "./page.module.css";

/* Case Study (/case-study; Dan, 2026-09-28: "I was hoping for a website";
   "How we work I do not like. I prefer Case Study."). One illustrative
   school year with Harborview International School across the four
   products. Not a product page: it sits after the four products in the nav
   and links each chapter to its product page and version.

   ON HOLD FOR PUBLISHING until both fictional providers are renamed: see
   the comment at the top of src/content/case-study.ts, where each provider
   name lives once.

   Top to bottom: the header (the brand eyebrow, the h1, the illustrative
   label, the lede); the disclosure and the three verbatim notices; how the
   work divides (the school sends, ETI360 does the reading, the data entry,
   the research and the writing, the school receives and decides); the year
   at a glance, linking each chapter; six chapters, each with the same
   three-part block, its Who decides line from the document's own text, and
   real pages from the samples; across the four products; who does the
   work; who decides; every notice; Dan's closing sentence, the only call to
   action. Copy: src/content/case-study.ts. */

const TITLE = "Case Study";

// [draft], tone-reviewed 2026-09-28 with the page. Then every notice,
// verbatim (ADR-023: the disclosure on the page and in its metadata).
const DESCRIPTION = `An illustrative case study: one school’s year with ETI360 across the Travel Program Review, the Field Trip Package, the Conference Travel Package and the Trip Package. The school sends what it has by email; ETI360 does the reading, the data entry, the research and the writing; the school reviews the documents and makes every decision. ${ALL_NOTICES.join(" ")}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/case-study" },
  openGraph: {
    title: `${TITLE} — ETI360`,
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

const HERO = "/case-study/hero-marina-bay.jpg";

/** The tier label(s) or the chapter's own label. */
function chapterLabel(ch: Chapter): string {
  if (ch.product) return tierNames(getProduct(ch.product)).join(" · ");
  return ch.label ?? "";
}

/* ── Exhibits ── */

function Figure({ ex }: { ex: Exhibit }) {
  const target = openTarget(ex);
  const edition = target ? thumbEdition(target.version, target.doc) : null;
  const img = (
    <Image
      src={`/case-study/${ex.image}`}
      width={ex.width}
      height={ex.height}
      alt={ex.alt}
      sizes={ex.wide ? "(max-width: 960px) 92vw, 880px" : "(max-width: 767px) 72vw, (max-width: 960px) 45vw, 340px"}
    />
  );
  // A page of a document on this site opens that document at the page,
  // through the logged /open route; any other page opens its own image.
  const link =
    target && edition
      ? {
          href: openHref(target.version, target.doc, edition, target.page),
          label: `Open the ${target.doc.title} at page ${target.page} (PDF, opens in a new tab)`,
        }
      : { href: `/case-study/${ex.image}`, label: `Open this page larger (image, opens in a new tab)` };
  return (
    <figure className={ex.wide ? styles.wideFig : styles.pageFig}>
      <a className={styles.figLink} href={link.href} target="_blank" rel="noopener" aria-label={link.label}>
        {img}
      </a>
      <figcaption>
        <span className={styles.caption}>{ex.caption}</span>
        <span className={`${styles.source} ui`}>{ex.source}</span>
      </figcaption>
    </figure>
  );
}

/** Exhibits in order: consecutive pages share a grid; a wide crop runs
    across the column on its own. */
function Exhibits({ exhibits }: { exhibits: Exhibit[] }) {
  const groups: Exhibit[][] = [];
  for (const ex of exhibits) {
    const last = groups[groups.length - 1];
    if (!ex.wide && last && !last[0].wide) last.push(ex);
    else groups.push([ex]);
  }
  return (
    <>
      {groups.map((g) =>
        g[0].wide ? (
          <Figure key={g[0].image} ex={g[0]} />
        ) : (
          <div key={g[0].image} className={styles.pageGrid}>
            {g.map((ex) => (
              <Figure key={ex.image} ex={ex} />
            ))}
          </div>
        ),
      )}
    </>
  );
}

function Notices({ notices }: { notices: string[] }) {
  return (
    <div className={`${styles.notices} ui`}>
      {notices.map((n) => (
        <p key={n}>{n}</p>
      ))}
    </div>
  );
}

function Section({ section }: { section: ChapterSection }) {
  return (
    <div className={styles.section}>
      {section.heading ? <h3 className={styles.sectionHeading}>{section.heading}</h3> : null}
      {section.intro ? <p className={styles.sectionIntro}>{section.intro}</p> : null}
      {section.otherSchool ? (
        <div className={styles.otherSchool}>
          <p>{section.otherSchool.text}</p>
          <Notices notices={section.otherSchool.notices} />
        </div>
      ) : null}
      <Exhibits exhibits={section.exhibits} />
      {section.notes?.map((n) => (
        <p key={n.lead} className={styles.note}>
          <strong>{n.lead}</strong> {n.text}
        </p>
      ))}
      {section.notices ? <Notices notices={section.notices} /> : null}
    </div>
  );
}

/* ── The three-part block ── */

function List({ items }: { items: string[] }) {
  return (
    <ul className={styles.partList}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

function Parts({ ch }: { ch: Chapter }) {
  return (
    <div className={styles.parts}>
      <div className={styles.part}>
        <h3 className={`${styles.partLabel} ui`}>Harborview sends</h3>
        <p className={styles.partTitle}>{ch.sends.title}</p>
        <List items={ch.sends.items} />
      </div>
      <div className={`${styles.part} ${styles.partEti}`}>
        <h3 className={`${styles.partLabel} ui`}>ETI360 does</h3>
        <p className={styles.partTitle}>{ch.does.title}</p>
        <List items={ch.does.items} />
      </div>
      <div className={styles.part}>
        <h3 className={`${styles.partLabel} ui`}>Harborview receives, and decides</h3>
        <p className={styles.partTitle}>{ch.receives.title}</p>
        <p className={`${styles.partSub} ui`}>Receives</p>
        <List items={ch.receives.receives} />
        <p className={`${styles.partSub} ui`}>Decides</p>
        <List items={ch.receives.decides} />
      </div>
    </div>
  );
}

/* ── Ruled rows (the year at a glance, the decision table, the four
   products): a labeled grid on wide screens, stacked with inline labels on
   phones. ── */

function Rows({
  labels,
  rows,
  variant,
  ordered = false,
}: {
  labels: string[];
  rows: { key: string; cells: ReactNode[] }[];
  variant: "glance" | "decisions" | "across";
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
          <li key={r.key} className={styles.row}>
            {ordered ? <span className={`${styles.rowNum} ui`}>{String(i + 1).padStart(2, "0")}</span> : null}
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

/* ── A chapter ── */

function ChapterBlock({ ch, shade }: { ch: Chapter; shade: boolean }) {
  const docs = chapterDocuments(ch);
  return (
    <section id={ch.id} className={`${styles.chapter}${shade ? ` ${styles.shade}` : ""}`} aria-labelledby={`${ch.id}-title`}>
      <div className={styles.wide}>
        <header className={styles.chapterHead}>
          <p className={`${styles.chapterEyebrow} ui`}>
            Chapter {ch.number} &middot; {ch.name}
          </p>
          <h2 id={`${ch.id}-title`} className={styles.chapterTitle}>
            {ch.title}
          </h2>
          <p className={`${styles.chapterLabel} ui`}>{chapterLabel(ch)}</p>
        </header>

        <div className={styles.need}>
          <p className={`${styles.needLabel} ui`}>What Harborview needs</p>
          <p className={styles.needText}>{ch.need}</p>
        </div>

        <Parts ch={ch} />

        {ch.decisionTable ? (
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>The Trip Package, decision by decision</h3>
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
        ) : null}

        {ch.whoDecides.map((w) => (
          <blockquote key={w.text} className={styles.whoDecides}>
            <p className={`${styles.whoLabel} ui`}>Who decides</p>
            <p className={styles.whoText}>{w.text}</p>
            {w.source ? <p className={`${styles.whoSource} ui`}>{w.source}</p> : null}
          </blockquote>
        ))}

        {ch.sections.map((s, i) => (
          <Section key={s.heading ?? `${ch.id}-${i}`} section={s} />
        ))}

        <footer className={`${styles.chapterFoot} ui`}>
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
        </footer>
      </div>
    </section>
  );
}

export default function CaseStudyPage() {
  return (
    <>
      <section
        className="article-header"
        style={{ ["--hero-bg" as string]: `url('${HERO}')` } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">{BRAND_EYEBROW}</p>
          <h1>{TITLE}</h1>
          <p className={`${headerStyles.tiers} ui`}>
            Illustrative case study &middot; Harborview International School &middot; Singapore
          </p>
          <p className={headerStyles.lede}>{INTRO.lede}</p>
        </div>
      </section>

      <section className={styles.opening}>
        <div className={styles.wide}>
          <div className={styles.disclosure}>
            <p>{INTRO.illustrative}</p>
            <Notices notices={[NOTICES.harborview, NOTICES.cycling, NOTICES.orienteering]} />
          </div>

          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="the-work">
              How the work divides
            </h2>
            <p className={styles.workLead}>{INTRO.work}</p>
            <div className={styles.parts}>
              <div className={styles.part}>
                <h3 className={`${styles.partLabel} ui`}>Harborview sends</h3>
                <p className={styles.partText}>{WORK.sends}</p>
              </div>
              <div className={`${styles.part} ${styles.partEti}`}>
                <h3 className={`${styles.partLabel} ui`}>ETI360 does</h3>
                <p className={styles.partText}>{WORK.does}</p>
              </div>
              <div className={styles.part}>
                <h3 className={`${styles.partLabel} ui`}>Harborview receives, and decides</h3>
                <p className={styles.partText}>{WORK.receives}</p>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className="section-heading rule-gold" id="the-year">
              The year at a glance
            </h2>
            <Rows
              variant="glance"
              ordered
              labels={["What Harborview needs", "What meets it", "What Harborview receives"]}
              rows={CHAPTERS.map((ch) => {
                const g = glanceOf(ch);
                return {
                  key: ch.id,
                  cells: [
                    <span key="n">{g.need}</span>,
                    <span key="m" className={styles.meets}>
                      <Link href={`#${ch.id}`}>{g.meets}</Link>
                      <span className={`${styles.meetsLabel} ui`}>{g.label ?? chapterLabel(ch)}</span>
                    </span>,
                    <span key="r">{g.receives}</span>,
                  ],
                };
              })}
            />
            <p className={styles.reading}>
              {READING_THE_CHAPTERS} {OPENING_PAGES}
            </p>
          </div>
        </div>
      </section>

      {CHAPTERS.map((ch, i) => (
        <ChapterBlock key={ch.id} ch={ch} shade={i % 2 === 0} />
      ))}

      <section className={styles.closing}>
        <div className={styles.wide}>
          <div>
            <h2 className="section-heading rule-gold" id="across">
              Across the four products
            </h2>
            <Rows
              variant="across"
              labels={["Product", "The school sends", "ETI360 does", "The school receives"]}
              rows={ACROSS.map((a) => {
                const p = getProduct(a.product);
                return {
                  key: a.product,
                  cells: [
                    <span key="p" className={styles.meets}>
                      <Link href={p.href}>{p.name}</Link>
                      <span className={`${styles.meetsLabel} ui`}>{tierNames(p).join(" · ")}</span>
                    </span>,
                    <span key="s">{a.sends}</span>,
                    <span key="d">{a.does}</span>,
                    <span key="r">{a.receives}</span>,
                  ],
                };
              })}
            />
          </div>

          <div className={`${styles.block} ${styles.prose}`}>
            <WhoDoesTheWork />
          </div>

          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>
              {WHO_DECIDES_LEAD} {WHO_DECIDES} {WHO_DECIDES_PROVIDERS}
            </p>
          </div>

          <div className={styles.about}>
            <p className={`${styles.aboutLabel} ui`}>About this case study</p>
            <p>{ABOUT}</p>
            <Notices notices={ALL_NOTICES} />
          </div>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} />
    </>
  );
}
