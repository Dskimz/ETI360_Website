import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { MapRow, SchoolMap } from "@/content/case-study-map";
import { TIERS, type TierKey } from "@/content/program-map";
import styles from "./tierhead.module.css";

/* The Case Study head (Dan, 2026-10-08): the Program Map's design (three
   tiers, four equal columns, a full-width tier bar under two-line headings)
   with each row a fanned stack of the school's own document covers beside
   its label and document names. Hover fans the stack; a click opens the
   row's point page. CSS only. */

const TIER_COLOR: Record<TierKey, string> = {
  1: "var(--tier1-band)",
  2: "var(--tier2-band)",
  3: "var(--tier3-band)",
};

function Row({ row }: { row: MapRow }) {
  const n = row.docs.length;
  return (
    <li>
      <Link href={row.href} className={styles.row}>
        <span className={styles.fan} aria-hidden="true">
          {row.docs.map((d, i) => (
            <span
              key={d.src + i}
              className={styles.cover}
              style={{ ["--i" as string]: i - (n - 1) / 2 }}
            >
              <Image
                src={d.src}
                width={d.width}
                height={d.height}
                alt=""
                sizes="72px"
              />
            </span>
          ))}
        </span>
        <span className={styles.text}>
          <span className={styles.label}>{row.label}</span>
          {row.docs.map((d) => (
            <span key={d.name} className={styles.doc}>
              {d.name}
            </span>
          ))}
        </span>
      </Link>
    </li>
  );
}

export function TierHead({
  map,
  ariaLabel,
}: {
  map: SchoolMap;
  ariaLabel: string;
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.grid} role="group" aria-label={ariaLabel}>
        {TIERS.map((t) => {
          const rows = map[t.key] ?? [];
          const wide = t.key === 2;
          const half = Math.ceil(rows.length / 2);
          return (
            <div
              key={t.key}
              className={`${styles.col} ${wide ? styles.wide : ""}`}
              style={{ "--c": TIER_COLOR[t.key] } as CSSProperties}
            >
              <div className={styles.head}>
                <span className={styles.tierNo}>Tier {t.key}</span>
                <span className={styles.name}>
                  {(t.lines ?? [t.name]).map((l, i) => (
                    <span key={l} className={styles.line}>
                      {i > 0 ? " " : null}
                      {l}
                    </span>
                  ))}
                </span>
              </div>
              {wide ? (
                <div className={styles.halves}>
                  <ul className={styles.rows}>
                    {rows.slice(0, half).map((r) => (
                      <Row key={r.label} row={r} />
                    ))}
                  </ul>
                  <ul className={styles.rows}>
                    {rows.slice(half).map((r) => (
                      <Row key={r.label} row={r} />
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className={styles.rows}>
                  {rows.map((r) => (
                    <Row key={r.label} row={r} />
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
