import Link from "next/link";
import type { CSSProperties } from "react";
import { TIERS, findBranch, type TierKey } from "@/content/program-map";
import styles from "./programmap.module.css";

/* The Program Map and the You-are-here strip, revision 2 (Dan, 2026-10-08).
   Both read src/content/program-map.ts, so a renamed report or a new branch
   changes one file. The three columns and the three strip segments always
   share one width. */

const TIER_COLOR: Record<TierKey, string> = {
  1: "var(--tier1-band)",
  2: "var(--tier2-band)",
  3: "var(--tier3-band)",
};

const color = (key: TierKey) => ({ "--c": TIER_COLOR[key] }) as CSSProperties;
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** The full map. Pass `current` (a branch id) to light one item and turn
    the map into the you-are-here view on pages with room for it. */
export function ProgramMap({ current, className }: { current?: string; className?: string }) {
  const found = current ? findBranch(current) : undefined;
  return (
    <div className={cx(styles.map, className)} role="group" aria-label="The ETI360 Program Map: three tiers and the reports under each">
      {TIERS.map((tier) => {
        const dimTier = found && found.tier.key !== tier.key;
        return (
          <div key={tier.key} className={cx(styles.col, dimTier && styles.dim)} style={color(tier.key)}>
            <span className={styles.tierNo}>Tier {tier.key}</span>
            <span className={styles.tierName}>{tier.name}</span>
            <p className={styles.purpose}>{tier.purpose}</p>
            <ul className={styles.branches}>
              {tier.branches.map((b) => {
                const lit = found?.branch.id === b.id;
                return (
                  <li
                    key={b.id}
                    className={cx(styles.branch, lit && styles.lit, found && !dimTier && !lit && styles.dimItem)}
                    aria-current={lit ? "true" : undefined}
                  >
                    {b.href ? (
                      <Link href={b.href} className={styles.branchLabel}>
                        {b.label}
                      </Link>
                    ) : (
                      <span className={styles.branchLabel}>{b.label}</span>
                    )}
                    <span className={styles.reports}>{b.reports.join(" · ")}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** The strip. The document is the headline; the tier and branch sit above
    it, and three equal segments below show where it falls in the year. */
export function YouAreHere({ branch, doc }: { branch: string; doc?: string }) {
  const found = findBranch(branch);
  if (!found) return null;
  const { tier, branch: b } = found;
  return (
    <div className={styles.strip} style={color(tier.key)}>
      <span className={styles.where}>
        Tier {tier.key} · {tier.name} · {b.label}
      </span>
      <span className={styles.doc}>{doc ?? b.reports.join(" · ")}</span>
      <div className={styles.bar} role="group" aria-label="Where this sits in the Program Map">
        {TIERS.map((t) => (
          <div key={t.key} className={cx(styles.seg, t.key === tier.key && styles.segOn)} style={color(t.key)}>
            <span className={styles.segRule} />
            <span className={styles.segLabel}>
              <span className={styles.segFull}>
                Tier {t.key} {t.name}
              </span>
              <span className={styles.segShort}>Tier {t.key}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
