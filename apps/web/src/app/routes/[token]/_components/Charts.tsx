import type { CSSProperties, ReactNode } from "react";
import { clockMinutes, fmtClock, fullStop } from "./format";
import s from "./routes.module.css";

/* Plain HTML charts (percent-positioned marks, text in HTML so it reflows at
   phone width): ratio bars against a reference, bars on a shared axis for the
   week, and the day's planned hours against daylight on a clock axis. Every
   chart carries its figures as text as well; color is never the only carrier. */

const clamp = (value: number, max: number) => Math.max(0, Math.min(100, (value / max) * 100));
const pct = (value: number, max: number) => `${clamp(value, max).toFixed(2)}%`;

/** A hairline's position, handed to CSS, which rounds it to a whole pixel
    where the browser can (a 1 px line at a fractional offset all but vanishes). */
const hairline = (left: string) => ({ "--at": left }) as CSSProperties;

/** A label centered on its mark, or held inside the track near either end. */
function edgeStyle(value: number, max: number): CSSProperties {
  const at = clamp(value, max);
  const shift = at < 12 ? "0" : at > 88 ? "-100%" : "-50%";
  return { left: `${at.toFixed(2)}%`, transform: `translateX(${shift})` };
}

export type RatioRow = { key: string; label: string; value: number; valueText: string; detail: ReactNode };

/** Bars on a 0..max scale with a dashed line at the reference value. */
export function RatioBars({
  rows,
  max,
  refValue,
  refLabel,
}: {
  rows: RatioRow[];
  max: number;
  refValue: number;
  refLabel: string;
}) {
  return (
    <div className={s.ratio}>
      <div className={s.ratioKey} aria-hidden="true">
        <span className={s.ratioKeyMark} style={edgeStyle(refValue, max)}>
          {refLabel}
        </span>
      </div>
      {rows.map((row) => (
        <div key={row.key} className={s.ratioRow}>
          <div className={s.ratioHead}>
            <span>{row.label}</span>
            <strong>{row.valueText}</strong>
          </div>
          <div className={s.ratioTrack} aria-hidden="true">
            <div className={s.ratioBar} style={{ width: pct(row.value, max) }} />
            <div className={s.ratioRef} style={{ left: pct(refValue, max) }} />
          </div>
          <p className={s.ratioDetail}>{row.detail}</p>
        </div>
      ))}
    </div>
  );
}

export type WeekBarRow = {
  key: string;
  label: ReactNode;
  value: number | null;
  valueText: string;
  /** Draw the reference line through this row (walking days only). */
  compare: boolean;
  reference?: boolean;
};

export type WeekBarGroup = { key: string; title: string; note?: string; rows: WeekBarRow[] };

/** Horizontal bars for every day on one axis; the reference row first, its
    value carried as a dashed line through the rows it compares with. */
export function WeekBars({
  title,
  unit,
  max,
  ticks,
  refValue,
  groups,
  caption,
}: {
  title: string;
  unit: string;
  max: number;
  ticks: number[];
  refValue: number;
  groups: WeekBarGroup[];
  caption?: ReactNode;
}) {
  return (
    <figure className={s.weekChart}>
      <figcaption className={s.weekChartTitle}>{title}</figcaption>
      <div className={s.weekAxisRow} aria-hidden="true">
        <div className={s.weekAxis}>
          {ticks.map((t) => (
            <span key={t} style={edgeStyle(t, max)}>
              {t.toLocaleString("en-US")}
            </span>
          ))}
        </div>
        {/* The unit sits in its own column, never against the last tick. */}
        <span className={s.weekAxisUnit}>{unit}</span>
      </div>
      {groups.map((group) => (
        <div key={group.key} className={s.weekGroup}>
          <p className={s.weekGroupTitle}>{group.title}</p>
          {group.rows.map((row) => (
            <div key={row.key} className={`${s.weekRow} ${row.reference ? s.weekRowRef : ""}`}>
              <div className={s.weekRowLabel}>{row.label}</div>
              <div className={s.weekTrack}>
                {ticks.map((t) => (
                  <span key={t} className={s.weekTick} style={hairline(pct(t, max))} aria-hidden="true" />
                ))}
                {row.value !== null ? (
                  <div
                    className={row.reference ? s.weekBarRef : s.weekBar}
                    style={{ width: pct(row.value, max) }}
                    aria-hidden="true"
                  />
                ) : null}
                {row.compare ? (
                  <div className={s.weekRefLine} style={{ left: pct(refValue, max) }} aria-hidden="true" />
                ) : null}
              </div>
              <span className={s.weekValue}>{row.valueText}</span>
            </div>
          ))}
          {group.note ? <p className={s.weekGroupNote}>{group.note}</p> : null}
        </div>
      ))}
      {caption ? <p className={s.caption}>{caption}</p> : null}
    </figure>
  );
}

export type ClockRow = {
  key: string;
  label?: ReactNode;
  sunrise: string;
  sunset: string;
  dusk: string;
  start: string;
  finish: string;
  activity: string;
};

const FROM = 5 * 60;
const TO = 21 * 60;
const HOURS = [6, 9, 12, 15, 18, 21];

function hourLabel(h: number) {
  if (h === 12) return "noon";
  return h < 12 ? `${h} a.m.` : `${h - 12} p.m.`;
}

/** Planned hours (solid) against daylight (sunrise to sunset, then civil dusk)
    on a 5 a.m. to 9 p.m. axis shared by every row. */
export function ClockRows({ rows, title }: { rows: ClockRow[]; title?: string }) {
  const at = (hhmm: string) => pct(clockMinutes(hhmm) - FROM, TO - FROM);
  const span = (a: string, b: string) => pct(clockMinutes(b) - clockMinutes(a), TO - FROM);
  const labelled = rows.some((r) => r.label);
  return (
    <figure className={`${s.clock} ${labelled ? s.clockLabelled : ""}`}>
      {title ? <figcaption className={s.weekChartTitle}>{title}</figcaption> : null}
      <div className={s.clockAxisRow} aria-hidden="true">
        {labelled ? <span className={s.clockLabelSpacer} /> : null}
        <div className={s.clockAxis}>
          {HOURS.map((h) => (
            <span
              key={h}
              className={h % 6 === 0 ? undefined : s.clockMinor}
              style={edgeStyle(h * 60 - FROM, TO - FROM)}
            >
              {hourLabel(h)}
            </span>
          ))}
        </div>
      </div>
      {rows.map((row) => (
        <div key={row.key} className={s.clockRow}>
          {labelled ? <div className={s.clockLabel}>{row.label}</div> : null}
          <div className={s.clockTrack}>
            {HOURS.map((h) => (
              <span key={h} className={s.clockTick} style={hairline(pct(h * 60 - FROM, TO - FROM))} aria-hidden="true" />
            ))}
            <span
              className={s.clockDay}
              style={{ left: at(row.sunrise), width: span(row.sunrise, row.sunset) }}
              aria-hidden="true"
            />
            <span
              className={s.clockDusk}
              style={{ left: at(row.sunset), width: span(row.sunset, row.dusk) }}
              aria-hidden="true"
            />
            <span
              className={s.clockPlan}
              style={{ left: at(row.start), width: span(row.start, row.finish) }}
              aria-hidden="true"
            />
            <span className={s.srOnly}>
              {fullStop(
                `${row.activity} ${fmtClock(row.start)} to ${fmtClock(row.finish)}; sunrise ${fmtClock(row.sunrise)}, sunset ${fmtClock(row.sunset)}, civil dusk ${fmtClock(row.dusk)}`,
              )}
            </span>
          </div>
        </div>
      ))}
      <p className={s.clockKey}>
        <span className={s.keyItem}>
          <span className={s.keyPlan} aria-hidden="true" /> planned hours
        </span>
        <span className={s.keyItem}>
          <span className={s.keyDay} aria-hidden="true" /> sunrise to sunset
        </span>
        <span className={s.keyItem}>
          <span className={s.keyDusk} aria-hidden="true" /> sunset to civil dusk
        </span>
      </p>
    </figure>
  );
}
