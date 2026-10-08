import Link from "next/link";
import type { CSSProperties } from "react";
import { HARBORVIEW_CHAPTERS } from "@/content/case-study-map";
import { TIERS, type TierKey } from "@/content/program-map";
import styles from "./tierhead.module.css";

/* The point pages' you-are-here strip (Dan, 2026-10-08): the Case Study's
   three chapters on the head's four-column grid. The current tier keeps
   its full bar and lists the chapter's pages with this one marked; the
   other tiers step back and link to their chapter's first page. Replaces
   the five-stage strip. */

const TIER_COLOR: Record<TierKey, string> = {
  1: "var(--tier1-band)",
  2: "var(--tier2-band)",
  3: "var(--tier3-band)",
};

export function ChapterStrip({ id }: { id: string }) {
  const href = `/case-study/${id}`;
  const current = TIERS.find((t) =>
    HARBORVIEW_CHAPTERS[t.key]?.links.some((l) => l.href === href),
  )?.key;
  return (
    <nav
      className={`${styles.cstrip} ui`}
      aria-label="The Case Study in three chapters"
    >
      {TIERS.map((t) => {
        const c = HARBORVIEW_CHAPTERS[t.key];
        const on = t.key === current;
        return (
          <div
            key={t.key}
            className={`${styles.cstripCell} ${on ? styles.cstripOn : ""} ${t.key === 2 ? styles.wide : ""}`}
            style={{ "--c": TIER_COLOR[t.key] } as CSSProperties}
          >
            <Link
              href={c.links[0].href}
              className={styles.cstripHead}
              aria-current={on ? "step" : undefined}
            >
              <span className={styles.cstripTier}>Tier {t.key}</span>
              <span className={styles.cstripTitle}>{c.title}</span>
            </Link>
            {on ? (
              <ul className={styles.cstripLinks}>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={
                        l.href === href ? styles.cstripHere : undefined
                      }
                      aria-current={l.href === href ? "page" : undefined}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
