import Link from "next/link";
import type { CSSProperties } from "react";
import { TIERS, findBranch, type TierKey } from "@/content/program-map";
import styles from "./programmap.module.css";

/* The Program Map and the You-are-here strip (Dan, 2026-10-08). Both read
   src/content/program-map.ts, so a renamed report or a new branch changes
   one file. The three rectangles always share one size. */

const TIER_COLOR: Record<TierKey, string> = {
  1: "var(--tier1-band)",
  2: "var(--tier2-band)",
  3: "var(--tier3-band)",
};

const color = (key: TierKey) => ({ "--c": TIER_COLOR[key] }) as CSSProperties;

/** The full map: three tiers on the gold line, each tier's documents below. */
export function ProgramMap({ className }: { className?: string }) {
  return (
    <div
      className={[styles.map, className].filter(Boolean).join(" ")}
      role="group"
      aria-label="The ETI360 Program Map: three tiers and the reports under each"
    >
      {TIERS.map((tier) => (
        <div key={tier.key} className={styles.col} style={color(tier.key)}>
          <div className={styles.node}>
            <span className={styles.nodeTier}>Tier {tier.key}</span>
            <span className={styles.nodeName}>{tier.name}</span>
          </div>
          <ul className={styles.branches}>
            {tier.branches.map((b) => (
              <li key={b.id} className={styles.branch}>
                {b.href ? (
                  <Link href={b.href} className={styles.branchLabel}>
                    {b.label}
                  </Link>
                ) : (
                  <span className={styles.branchLabel}>{b.label}</span>
                )}
                <span className={styles.reports}>{b.reports.join(" · ")}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The strip: the three tiers, one lit, with the branch named beneath it.
    Pass a branch id, or a tier alone to light a tier without a branch. */
export function YouAreHere({ branch, tier }: { branch?: string; tier?: TierKey }) {
  const found = branch ? findBranch(branch) : undefined;
  const litTier = found?.tier.key ?? tier;
  return (
    <div className={styles.strip} role="group" aria-label="Where this sits in the Program Map">
      {TIERS.map((t) => {
        const on = t.key === litTier;
        return (
          <div
            key={t.key}
            className={[styles.cell, on ? styles.on : ""].join(" ")}
            style={color(t.key)}
            aria-current={on ? "step" : undefined}
          >
            <div className={styles.box}>
              <span className={styles.boxTier}>Tier {t.key}</span>
              <span className={styles.boxName}>{t.name}</span>
              <span className={styles.boxShort}>{t.short}</span>
            </div>
            {on && found ? <span className={styles.here}>{found.branch.label}</span> : null}
          </div>
        );
      })}
    </div>
  );
}
