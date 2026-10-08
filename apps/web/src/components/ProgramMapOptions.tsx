import type { CSSProperties } from "react";
import { TIERS, findBranch, type TierKey } from "@/content/program-map";
import s from "./programmapOptions.module.css";

/* Review-only options A–D for the Program Map (Dan, 2026-10-08). Each
   lights one branch the way the you-are-here view does. */

const TIER_COLOR: Record<TierKey, string> = { 1: "var(--tier1-band)", 2: "var(--tier2-band)", 3: "var(--tier3-band)" };
const color = (k: TierKey) => ({ "--c": TIER_COLOR[k] }) as CSSProperties;
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export function ProgramMapOption({ option, current }: { option: "a" | "b" | "c" | "d" | "e"; current?: string }) {
  const found = current ? findBranch(current) : undefined;
  const isDim = (tk: TierKey) => !!found && found.tier.key !== tk;
  const itemCls = (tk: TierKey, id: string) =>
    cx(found?.branch.id === id && s.lit, found && !isDim(tk) && found.branch.id !== id && s.dim);
  const items = (tk: TierKey) =>
    TIERS.find((t) => t.key === tk)!.branches.map((b) => (
      <li key={b.id} className={itemCls(tk, b.id)}>
        <span className={s.lbl}>{b.label}</span>
        <span className={s.doc}>{b.reports.join(" · ")}</span>
      </li>
    ));

  if (option === "c") {
    return (
      <div className={cx(s.wrap, s.c)}>
        {TIERS.map((t) => (
          <div key={t.key} className={cx(s.row, isDim(t.key) && s.dim)} style={color(t.key)}>
            <div className={s.tierCell}>
              <span className={s.eyebrow}>Tier {t.key}</span>
              <span className={s.name}>{t.name}</span>
            </div>
            <ul className={s.list}>
              {items(t.key)}
              {t.note ? <li className={s.note}>{t.note}</li> : null}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cx(s.wrap, s[option])}>
      {TIERS.map((t) => (
        <div key={t.key} className={cx(s.col, isDim(t.key) && s.dim, (option === "d" || option === "e") && t.key === 2 && s.wide)} style={color(t.key)}>
          {option === "b" ? (
            <div className={s.head}>
              <span className={s.eyebrow}>Tier {t.key}</span>
              <span className={s.name}>{t.name}</span>
            </div>
          ) : (
            <>
              <span className={s.eyebrow}>Tier {t.key}</span>
              <span className={s.name}>{t.name}</span>
              {option === "a" ? <p className={s.purpose}>{t.purpose}</p> : null}
            </>
          )}
          <ul className={s.list}>{items(t.key)}</ul>
          {t.note ? <p className={s.note}>{t.note}</p> : null}
        </div>
      ))}
    </div>
  );
}
