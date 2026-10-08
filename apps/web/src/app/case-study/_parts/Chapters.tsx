import Link from "next/link";
import type { CSSProperties } from "react";
import type { Chapter } from "@/content/case-study-map";
import { TIERS, type TierKey } from "@/content/program-map";
import styles from "./tierhead.module.css";

/* The three chapters under the Case Study head (Dan, 2026-10-08), on the
   same four-column grid so each chapter sits under its tier. */

const TIER_COLOR: Record<TierKey, string> = {
  1: "var(--tier1-band)",
  2: "var(--tier2-band)",
  3: "var(--tier3-band)",
};

export function Chapters({ chapters }: { chapters: Record<TierKey, Chapter> }) {
  return (
    <ol className={styles.chapters} aria-label="The year in three chapters">
      {TIERS.map((t) => {
        const c = chapters[t.key];
        if (!c) return null;
        return (
          <li
            key={t.key}
            className={`${styles.chapter} ${t.key === 2 ? styles.wide : ""}`}
            style={{ "--c": TIER_COLOR[t.key] } as CSSProperties}
          >
            <p className={styles.when}>
              Tier {t.key} · {c.when}
            </p>
            <h2 className={styles.chapterTitle}>{c.title}</h2>
            <p className={styles.chapterLine}>{c.line}</p>
            <ul
              className={`${styles.chapterLinks} ${t.key === 2 ? styles.chapterLinksWide : ""}`}
            >
              {c.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{`${l.label} →`}</Link>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
