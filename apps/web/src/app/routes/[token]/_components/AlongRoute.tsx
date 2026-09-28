"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import { fmtNumber, nearestIndex, type LetteredStop } from "./format";
import { useWidth } from "./useWidth";
import s from "./routes.module.css";

/* The two charts that run along a day's line, both linked to the map through
   one shared value, the mile under the pointer:
   - ElevationProfile for walking days (feet against miles), as on a route
     page like Strava's: moving along it moves the marker on the map, and
     hovering the route on the map moves the cursor here;
   - CrossingStrip for water days: no profile on the water, only where the
     open-water crossings fall along the line.
   Both are keyboard sliders (arrow keys, Home, End). Miles are measured along
   the drawn line, as the stops' positions are. */

type Scrub = {
  cum: number[];
  hoverMi: number | null;
  onHover: (mi: number | null) => void;
};

const PAD_LEFT = 62;
const PAD_RIGHT = 16;

function useScrub({ cum, hoverMi, onHover }: Scrub, width: number) {
  const total = cum[cum.length - 1] || 1;
  const plotW = Math.max(40, width - PAD_LEFT - PAD_RIGHT);
  const x = (mi: number) => PAD_LEFT + (mi / total) * plotW;
  const idx = hoverMi === null ? null : nearestIndex(cum, hoverMi);

  const fromPointer = (e: PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const mi = ((e.clientX - box.left) / box.width) * total;
    onHover(cum[nearestIndex(cum, Math.max(0, Math.min(total, mi)))]);
  };

  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    const at = idx ?? 0;
    const step = { ArrowRight: 2, ArrowUp: 2, ArrowLeft: -2, ArrowDown: -2, PageUp: 10, PageDown: -10 }[e.key];
    let next: number | null = null;
    if (step !== undefined) next = Math.max(0, Math.min(cum.length - 1, at + step));
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = cum.length - 1;
    if (next !== null) {
      e.preventDefault();
      onHover(cum[next]);
    }
  };

  return { total, plotW, x, idx, fromPointer, onKeyDown };
}

function xTicks(total: number) {
  const step = total > 6 ? 1 : total > 2.5 ? 0.5 : 0.25;
  const ticks: number[] = [];
  for (let v = 0; v <= total + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

/** Stack labels in up to `rows` rows so neighbors never overlap. */
function stackLabels(xs: number[], gap: number, rows: number) {
  const lastInRow: number[] = Array(rows).fill(-Infinity);
  return xs.map((px) => {
    for (let r = 0; r < rows; r += 1) {
      if (px - lastInRow[r] >= gap) {
        lastInRow[r] = px;
        return r;
      }
    }
    return rows - 1;
  });
}

type Point = { letter: string; mi: number; tone: string };

function stopPoints(stops: LetteredStop[]): Point[] {
  return stops
    .filter((st) => st.onRoute)
    .flatMap((st) => st.atMi.map((mi) => ({ letter: st.letter, mi, tone: st.tone })))
    .sort((a, b) => a.mi - b.mi);
}

export function ElevationProfile(props: {
  cum: number[];
  elevFt: number[];
  stops: LetteredStop[];
  hoverMi: number | null;
  onHover: (mi: number | null) => void;
  above4500: { from_mi: number; to_mi: number } | null;
  label: string;
}) {
  const { cum, elevFt, stops, hoverMi, onHover, above4500, label } = props;
  const [wrap, width] = useWidth<HTMLDivElement>(720);
  const { total, plotW, x, idx, fromPointer, onKeyDown } = useScrub({ cum, hoverMi, onHover }, width);

  const height = width < 520 ? 190 : 230;
  const top = 46;
  const bottom = 26;
  const plotH = height - top - bottom;
  const lo = Math.min(...elevFt);
  const hi = Math.max(...elevFt);
  const step = hi - lo > 2000 ? 1000 : 500;
  const y0 = Math.floor((lo - 50) / step) * step;
  const y1 = Math.ceil((hi + 50) / step) * step;
  const y = (ft: number) => top + plotH - ((ft - y0) / (y1 - y0)) * plotH;
  const yTicks: number[] = [];
  for (let v = y0; v <= y1; v += step) yTicks.push(v);

  const linePath = cum.map((mi, i) => `${i ? "L" : "M"}${x(mi).toFixed(1)},${y(elevFt[i]).toFixed(1)}`).join("");
  const areaPath = `${linePath}L${x(total).toFixed(1)},${top + plotH}L${x(0).toFixed(1)},${top + plotH}Z`;

  const points = stopPoints(stops);
  const rows = stackLabels(points.map((p) => x(p.mi)), 16, 3);
  const readout =
    idx === null
      ? "Move along the profile or the route to follow the day on the map."
      : `Mile ${fmtNumber(cum[idx], 1)} along the line · ${fmtNumber(Math.round(elevFt[idx] / 10) * 10)} ft`;

  return (
    <div className={s.along} ref={wrap}>
      <p className={s.alongReadout} aria-live="polite">
        {readout}
      </p>
      <svg
        className={s.alongSvg}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={Number(total.toFixed(1))}
        aria-valuenow={idx === null ? 0 : Number(cum[idx].toFixed(1))}
        aria-valuetext={idx === null ? "Start of the day" : readout}
        onKeyDown={onKeyDown}
        onFocus={() => {
          if (hoverMi === null) onHover(cum[0]);
        }}
        onBlur={() => onHover(null)}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line className={s.gridLine} x1={PAD_LEFT} x2={PAD_LEFT + plotW} y1={y(v)} y2={y(v)} />
            <text className={s.tick} x={PAD_LEFT - 8} y={y(v) + 4} textAnchor="end">
              {fmtNumber(v)} ft
            </text>
          </g>
        ))}
        {above4500 && y0 < 4500 && y1 > 4500 ? (
          <g>
            <line className={s.refLine} x1={PAD_LEFT} x2={PAD_LEFT + plotW} y1={y(4500)} y2={y(4500)} />
            <line
              className={s.aboveBand}
              x1={x(above4500.from_mi)}
              x2={x(above4500.to_mi)}
              y1={y(4500)}
              y2={y(4500)}
            />
          </g>
        ) : null}
        <path className={s.profileArea} d={areaPath} />
        <path className={s.profileLine} d={linePath} />
        {xTicks(total).map((v) => (
          <text key={v} className={s.tick} x={x(v)} y={height - 6} textAnchor="middle">
            {fmtNumber(v, v % 1 ? (v * 4) % 2 ? 2 : 1 : 0)}
          </text>
        ))}
        {points.map((p, i) => {
          const at = nearestIndex(cum, p.mi);
          const labelY = 14 + rows[i] * 14;
          return (
            <g key={`${p.letter}-${p.mi}`}>
              <line className={s.leader} x1={x(p.mi)} x2={x(p.mi)} y1={labelY + 3} y2={y(elevFt[at]) - 5} />
              <circle className={s[`dot_${p.tone}`]} cx={x(p.mi)} cy={y(elevFt[at])} r={4} />
              <text className={s.stopLetter} x={x(p.mi)} y={labelY} textAnchor="middle">
                {p.letter}
              </text>
            </g>
          );
        })}
        {idx !== null ? (
          <g pointerEvents="none">
            <line className={s.cursor} x1={x(cum[idx])} x2={x(cum[idx])} y1={top - 4} y2={top + plotH} />
            <circle className={s.cursorDot} cx={x(cum[idx])} cy={y(elevFt[idx])} r={6} />
          </g>
        ) : null}
        <rect
          className={s.hitArea}
          x={PAD_LEFT}
          y={0}
          width={plotW}
          height={height}
          onPointerMove={fromPointer}
          onPointerDown={fromPointer}
          onPointerLeave={() => onHover(null)}
        />
      </svg>
    </div>
  );
}

export function CrossingStrip(props: {
  cum: number[];
  crossings: { n: number; from_mi: number; to_mi: number }[];
  stops: LetteredStop[];
  hoverMi: number | null;
  onHover: (mi: number | null) => void;
  label: string;
}) {
  const { cum, crossings, stops, hoverMi, onHover, label } = props;
  const [wrap, width] = useWidth<HTMLDivElement>(720);
  const { total, plotW, x, idx, fromPointer, onKeyDown } = useScrub({ cum, hoverMi, onHover }, width);

  const height = 128;
  const base = 64;
  const points = stopPoints(stops);
  const rows = stackLabels(points.map((p) => x(p.mi)), 16, 2);
  const inCrossing = idx === null ? null : crossings.find((c) => cum[idx] >= c.from_mi && cum[idx] <= c.to_mi);
  const readout =
    idx === null
      ? "Move along the strip or the route to follow the day on the map."
      : `Mile ${fmtNumber(cum[idx], 1)} along the line${inCrossing ? ` · crossing ${inCrossing.n}` : ""}`;

  return (
    <div className={s.along} ref={wrap}>
      <p className={s.alongReadout} aria-live="polite">
        {readout}
      </p>
      <svg
        className={s.alongSvg}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={Number(total.toFixed(1))}
        aria-valuenow={idx === null ? 0 : Number(cum[idx].toFixed(1))}
        aria-valuetext={idx === null ? "Start of the day" : readout}
        onKeyDown={onKeyDown}
        onFocus={() => {
          if (hoverMi === null) onHover(cum[0]);
        }}
        onBlur={() => onHover(null)}
      >
        <text className={s.tick} x={PAD_LEFT - 8} y={base + 4} textAnchor="end">
          line
        </text>
        <line className={s.stripBase} x1={x(0)} x2={x(total)} y1={base} y2={base} />
        {crossings.map((c) => (
          <g key={c.n}>
            <rect
              className={s.stripCrossing}
              x={x(c.from_mi)}
              y={base - 6}
              width={Math.max(3, x(c.to_mi) - x(c.from_mi))}
              height={12}
            />
            <text className={s.crossingNumber} x={(x(c.from_mi) + x(c.to_mi)) / 2} y={base + 26} textAnchor="middle">
              {c.n}
            </text>
          </g>
        ))}
        {points.map((p, i) => {
          const labelY = 14 + rows[i] * 14;
          return (
            <g key={`${p.letter}-${p.mi}`}>
              <line className={s.leader} x1={x(p.mi)} x2={x(p.mi)} y1={labelY + 3} y2={base - 8} />
              <text className={s.stopLetter} x={x(p.mi)} y={labelY} textAnchor="middle">
                {p.letter}
              </text>
            </g>
          );
        })}
        {xTicks(total).map((v) => (
          <text key={v} className={s.tick} x={x(v)} y={height - 6} textAnchor="middle">
            {fmtNumber(v, v % 1 ? (v * 4) % 2 ? 2 : 1 : 0)}
          </text>
        ))}
        {idx !== null ? (
          <g pointerEvents="none">
            <line className={s.cursor} x1={x(cum[idx])} x2={x(cum[idx])} y1={base - 16} y2={base + 16} />
            <circle className={s.cursorDot} cx={x(cum[idx])} cy={base} r={6} />
          </g>
        ) : null}
        <rect
          className={s.hitArea}
          x={PAD_LEFT}
          y={0}
          width={plotW}
          height={height}
          onPointerMove={fromPointer}
          onPointerDown={fromPointer}
          onPointerLeave={() => onHover(null)}
        />
      </svg>
    </div>
  );
}
