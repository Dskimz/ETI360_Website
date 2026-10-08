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
    the map into the you-are-here view on pages with room for it. `rule`
    sets the tier-color rule above or below each tier's heading. */
export function ProgramMap({
  current,
  rule = "below",
  className,
}: {
  current?: string;
  rule?: "top" | "below";
  className?: string;
}) {
  const found = current ? findBranch(current) : undefined;
  return (
    <div
      className={cx(styles.map, rule === "top" ? styles.ruleTop : styles.ruleBelow, className)}
      role="group"
      aria-label="The ETI360 Program Map: three tiers and the reports under each"
    >
      {TIERS.map((tier) => {
        const dimTier = !!found && found.tier.key !== tier.key;
        return (
          <div key={tier.key} className={cx(styles.col, dimTier && styles.dim, tier.key === 2 && styles.wide)} style={color(tier.key)}>
            <div className={styles.head}>
              <span className={styles.tierNo}>Tier {tier.key}</span>
              <span className={styles.tierName}>{tier.name}</span>
              <p className={styles.purpose}>{tier.purpose}</p>
            </div>
            <div className={styles.body}>
              <ul className={styles.branches}>
                {tier.branches.map((b) => {
                  const lit = found?.branch.id === b.id;
                  return (
                    <li
                      key={b.id}
                      className={cx(lit && styles.lit, found && !dimTier && !lit && styles.dimItem)}
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
              {tier.note ? <p className={styles.note}>{tier.note}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The strip. "bar" (the website): the document is the headline, the tier
    and branch sit above it, and three equal segments below show where it
    falls. "boxes" (the social carousels, read at thumbnail size): three
    equal boxes on the gold line, the lit box carrying the branch and the
    document in large type beneath it, as in Dan's sketch. */
export function YouAreHere({
  branch,
  doc,
  variant = "bar",
}: {
  branch: string;
  doc?: string;
  variant?: "bar" | "boxes";
}) {
  const found = findBranch(branch);
  if (!found) return null;
  const { tier, branch: b } = found;
  const docName = doc ?? b.reports.join(" · ");
  if (variant === "boxes") {
    return (
      <div className={styles.boxStrip} role="group" aria-label="Where this sits in the Program Map">
        {TIERS.map((t) => (
          <div key={t.key} className={cx(styles.boxCell, t.key === tier.key && styles.boxOn)} style={color(t.key)}>
            <div className={styles.box}>
              <span className={styles.boxTier}>Tier {t.key}</span>
              <span className={styles.boxName}>{t.name}</span>
            </div>
          </div>
        ))}
        <div className={styles.boxHere} data-tier={tier.key}>
          <span className={styles.boxBranch}>{b.label}</span>
          <span className={styles.boxDoc}>{docName}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.strip} style={color(tier.key)}>
      <span className={styles.where}>
        Tier {tier.key} · {tier.name} · {b.label}
      </span>
      <span className={styles.doc}>{docName}</span>
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
