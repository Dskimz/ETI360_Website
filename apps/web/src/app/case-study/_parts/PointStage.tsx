import Image from "next/image";
import Link from "next/link";
import { siteDocument } from "@/content/case-study";
import type { PointPage } from "@/content/case-study-points";
import { STAGES, type Stage, type StageDoc } from "@/content/case-study-stages";
import styles from "../desk.module.css";

/* The point pages carry the Case Study home's document desk (Dan,
   2026-10-08: "We have the folder view. Lets keep that as a theme on the
   rest of the pages."): a fanned stack of the point's own document covers
   in the hero, and a strip of the five stages on the gold thread in place
   of the old step pages' left bar, with the point's stage marked. CSS only,
   no client JavaScript. */

type Cover = Pick<StageDoc, "src" | "width" | "height" | "name">;

/** The stage whose links include this point's page. */
export function stageOf(id: string): Stage | undefined {
  return STAGES.find((s) => s.links.some((l) => l.href === `/case-study/${id}`));
}

/** Up to three covers: the documents the point page shows, else its
    stage's covers (During trips and The next year have no cards). */
function coversFor(p: PointPage, stage: Stage | undefined): Cover[] {
  const own: Cover[] = (p.docs?.groups ?? []).flatMap((g) =>
    g.docs.map((slug) => {
      const d = siteDocument({ version: g.version, doc: slug }).doc;
      return { src: d.cover.src, width: d.cover.width, height: d.cover.height, name: d.title };
    }),
  );
  return (own.length ? own : (stage?.docs ?? [])).slice(0, 3);
}

function tierClass(t: number) {
  return t === 1 ? styles.t1 : t === 2 ? styles.t2 : styles.t3;
}

/** The hero's fanned stack. The covers link to the documents section when
    the page has one; otherwise they are a picture of the stage. */
export function HeroStack({ p }: { p: PointPage }) {
  const covers = coversFor(p, stageOf(p.id));
  if (!covers.length) return null;
  const mid = (covers.length - 1) / 2;
  return (
    <div className={styles.heroStack}>
      {covers.map((c, i) => {
        const img = <Image src={c.src} width={c.width} height={c.height} alt="" sizes="120px" loading="eager" />;
        const style = { ["--i" as string]: i - mid };
        return p.docs ? (
          <a key={c.src + i} href="#documents" className={styles.heroCover} style={style} aria-label={`${c.name}, in the documents below`}>
            {img}
          </a>
        ) : (
          <span key={c.src + i} className={styles.heroCover} style={style} aria-hidden="true">
            {img}
          </span>
        );
      })}
    </div>
  );
}

/** The five stages on the gold thread; each opens its first point page. */
export function StageStrip({ id }: { id: string }) {
  const current = stageOf(id);
  return (
    <nav className={`${styles.strip} ui`} aria-label="The year, stage by stage">
      <ol>
        {STAGES.map((s) => {
          const here = s.id === current?.id;
          return (
            <li key={s.id} className={here ? styles.stripHere : undefined}>
              <Link href={s.links[0].href} aria-current={here ? "step" : undefined}>
                <span className={`${styles.stripPin} ${tierClass(s.tier)}`} aria-hidden="true">
                  {s.n}
                </span>
                <span className={styles.stripLabel}>{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
