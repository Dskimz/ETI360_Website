import Image from "next/image";
import { siteDocument } from "@/content/case-study";
import type { PointPage } from "@/content/case-study-points";
import { STAGES, type Stage, type StageDoc } from "@/content/case-study-stages";
import styles from "../desk.module.css";

/* The point pages carry the Case Study home's document desk (Dan,
   2026-10-08: "We have the folder view. Lets keep that as a theme on the
   rest of the pages."): a fanned stack of the point's own document covers
   in the hero. The five-stage strip gave way to ChapterStrip (Dan,
   2026-10-08). CSS only, no client JavaScript. */

type Cover = Pick<StageDoc, "src" | "width" | "height" | "name">;

/** The stage whose links include this point's page. */
export function stageOf(id: string): Stage | undefined {
  return STAGES.find((s) =>
    s.links.some((l) => l.href === `/case-study/${id}`),
  );
}

/** Up to three covers: the documents the point page shows, else its
    stage's covers (During trips and The next year have no cards). */
function coversFor(p: PointPage, stage: Stage | undefined): Cover[] {
  const own: Cover[] = (p.docs?.groups ?? []).flatMap((g) =>
    g.docs.map((slug) => {
      const d = siteDocument({ version: g.version, doc: slug }).doc;
      return {
        src: d.cover.src,
        width: d.cover.width,
        height: d.cover.height,
        name: d.title,
      };
    }),
  );
  return (own.length ? own : (stage?.docs ?? [])).slice(0, 3);
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
        const img = (
          <Image
            src={c.src}
            width={c.width}
            height={c.height}
            alt=""
            sizes="172px"
            loading="eager"
          />
        );
        const style = { ["--i" as string]: i - mid };
        return p.docs ? (
          <a
            key={c.src + i}
            href="#documents"
            className={styles.heroCover}
            style={style}
            aria-label={`${c.name}, in the documents below`}
          >
            {img}
          </a>
        ) : (
          <span
            key={c.src + i}
            className={styles.heroCover}
            style={style}
            aria-hidden="true"
          >
            {img}
          </span>
        );
      })}
    </div>
  );
}
