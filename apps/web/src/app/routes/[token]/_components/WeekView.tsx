"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import type { RegisterDay, RouteBundle } from "@/content/routes/bundle-types";
import type { RouteSetBrand } from "@/content/routes/types";
import { ClockRows, WeekBars, type WeekBarGroup } from "./Charts";
import { fmtNumber, fmtRatio, fmtShortDate, type LetteredStop } from "./format";
import { RouteMap } from "./RouteMap";
import type { MapboxSettings } from "./RouteDemo";
import { useWidth } from "./useWidth";
import s from "./routes.module.css";

/* Week at a glance: every day of both trips on shared scales, with the Back
   Cove Trail loop at the school as the first row wherever the walking days
   are compared. Distance and moving time put all nine days on one axis (the
   loop's dashed line runs through the walking days only; the water days share
   the axis, not the comparison). Climb and the elevation profiles are the
   walking days on one scale; the water days' crossings are drawn on the same
   miles as the profiles. Every figure is read from the register. */

type Props = {
  bundle: RouteBundle;
  mapbox: MapboxSettings;
  colors: RouteSetBrand["colors"];
  purposeLine: string;
  onOpenDay: (trip: number, day: number) => void;
};

const PROFILE_MAX_MI = 7;
const PROFILE_MAX_FT = 5500;
const WATER_MAX_MI = 9;

function DayButton({ d, onClick }: { d: RegisterDay; onClick: () => void }) {
  return (
    <button type="button" className={s.weekDayButton} onClick={onClick}>
      <span className={s.weekDayDate}>{fmtShortDate(d.date, d.weekday)}</span>
      <span className={s.weekDaySub}>Day {d.day}</span>
    </button>
  );
}

function RefLabel({ children }: { children: ReactNode }) {
  return <span className={s.weekRefLabel}>{children}</span>;
}

/** Miles under the small multiples. The unit sits in the label column, never
    against the last tick; on a phone only the even miles are labeled. */
function MilesAxis({ max, step }: { max: number; step: number }) {
  const ticks: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step) ticks.push(v);
  return (
    <div className={s.multiRow} aria-hidden="true">
      <span className={s.multiAxisUnit}>miles</span>
      <div className={s.multiAxis}>
        {ticks.map((t) => {
          const at = (t / max) * 100;
          const shift = at < 8 ? "0" : at > 92 ? "-100%" : "-50%";
          return (
            <span
              key={t}
              className={t % 2 === 1 ? s.axisMinor : undefined}
              style={{ left: `${at}%`, transform: `translateX(${shift})` }}
            >
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ProfileRow({ label, cum, elevFt, detail }: { label: ReactNode; cum: number[]; elevFt: number[]; detail: string }) {
  const [wrap, width] = useWidth<HTMLDivElement>(560);
  const height = 72;
  const x = (mi: number) => (mi / PROFILE_MAX_MI) * width;
  const y = (ft: number) => height - (ft / PROFILE_MAX_FT) * height;
  const line = cum.map((mi, i) => `${i ? "L" : "M"}${x(mi).toFixed(1)},${y(elevFt[i]).toFixed(1)}`).join("");
  const area = `${line}L${x(cum[cum.length - 1]).toFixed(1)},${height}L0,${height}Z`;
  return (
    <div className={s.multiRow}>
      <div className={s.multiLabel}>{label}</div>
      <div className={s.multiPlot} ref={wrap}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={detail}>
          {[1000, 2000, 3000, 4000, 5000].map((ft) => (
            <line key={ft} className={s.gridLine} x1={0} x2={width} y1={y(ft)} y2={y(ft)} />
          ))}
          <path className={s.profileArea} d={area} />
          <path className={s.profileLine} d={line} />
        </svg>
        <p className={s.multiDetail}>{detail}</p>
      </div>
    </div>
  );
}

function WaterRow({
  label,
  totalMi,
  spans,
  detail,
}: {
  label: ReactNode;
  totalMi: number;
  spans: { from_mi: number; to_mi: number }[];
  detail: string;
}) {
  const [wrap, width] = useWidth<HTMLDivElement>(560);
  const height = 22;
  const x = (mi: number) => (mi / WATER_MAX_MI) * width;
  return (
    <div className={s.multiRow}>
      <div className={s.multiLabel}>{label}</div>
      <div className={s.multiPlot} ref={wrap}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={detail}>
          <line className={s.stripBase} x1={x(0) + 1} x2={x(totalMi)} y1={height / 2} y2={height / 2} />
          <line className={s.stripEnd} x1={x(0) + 1} x2={x(0) + 1} y1={4} y2={height - 4} />
          <line className={s.stripEnd} x1={x(totalMi)} x2={x(totalMi)} y1={4} y2={height - 4} />
          {spans.map((c) => (
            <rect
              key={`${c.from_mi}-${c.to_mi}`}
              className={s.stripCrossing}
              x={x(c.from_mi)}
              y={height / 2 - 5}
              width={Math.max(3, x(c.to_mi) - x(c.from_mi))}
              height={10}
            />
          ))}
        </svg>
        <p className={s.multiDetail}>{detail}</p>
      </div>
    </div>
  );
}

export function WeekView({ bundle, mapbox, colors, purposeLine, onOpenDay }: Props) {
  const { register } = bundle;
  const ref = register.references.walking;
  const footIndex = register.trips.findIndex((t) => t.mode === "foot");
  const waterIndex = register.trips.findIndex((t) => t.mode === "water");
  const foot = register.trips[footIndex];
  const water = register.trips[waterIndex];

  const refStops: LetteredStop[] = useMemo(() => {
    const start = bundle.reference.stops.find((st) => st.kind === "bus_meeting");
    if (!start) return [];
    return [
      {
        letter: "A",
        name: start.name,
        kind: start.kind,
        label: "the school's location, start and finish",
        tone: "primary",
        lon: start.lon,
        lat: start.lat,
        onRoute: true,
        atMi: [0, ref.distance.mi],
        note: null,
      },
    ];
  }, [bundle.reference.stops, ref.distance.mi]);

  const refRow = (valueText: string, value: number) => ({
    key: "ref",
    label: <RefLabel>Back Cove loop</RefLabel>,
    value,
    valueText,
    compare: false,
    reference: true,
  });

  const distanceGroups: WeekBarGroup[] = [
    { key: "ref", title: "Reference walk at the school", rows: [refRow(`${fmtNumber(ref.distance.mi, 1)} mi`, ref.distance.mi)] },
    {
      key: "foot",
      title: `${foot.name}, on foot`,
      rows: foot.days.map((d) => ({
        key: `f${d.day}`,
        label: <DayButton d={d} onClick={() => onOpenDay(footIndex, d.day)} />,
        value: d.distance.mi,
        valueText: `${fmtNumber(d.distance.mi, 1)} mi · ${fmtRatio(d.vs_reference.distance ?? 0)}`,
        compare: true,
      })),
    },
    {
      key: "water",
      title: `${water.name}, on the water`,
      rows: water.days.map((d) => ({
        key: `w${d.day}`,
        label: <DayButton d={d} onClick={() => onOpenDay(waterIndex, d.day)} />,
        value: d.distance.mi,
        valueText: `${fmtNumber(d.distance.mi, 1)} mi`,
        compare: false,
      })),
    },
  ];

  const timeGroups: WeekBarGroup[] = [
    {
      key: "ref",
      title: "Reference walk at the school",
      rows: [refRow(ref.moving_time_group.text, ref.moving_time_group.h)],
    },
    {
      key: "foot",
      title: `${foot.name}, 2 mph plus 1 h per 1,000 ft of climb`,
      rows: foot.days.map((d) => ({
        key: `f${d.day}`,
        label: <DayButton d={d} onClick={() => onOpenDay(footIndex, d.day)} />,
        value: d.moving_time_group.h,
        valueText: `${d.moving_time_group.text} · ${fmtRatio(d.vs_reference.moving_time_group ?? 0)}`,
        compare: true,
      })),
    },
    {
      key: "water",
      title: `${water.name}, 2.5 knots`,
      rows: water.days.map((d) => ({
        key: `w${d.day}`,
        label: <DayButton d={d} onClick={() => onOpenDay(waterIndex, d.day)} />,
        value: d.moving_time_group.h,
        valueText: d.moving_time_group.text,
        compare: false,
      })),
    },
  ];

  const climbGroups: WeekBarGroup[] = [
    {
      key: "ref",
      title: "Reference walk at the school",
      rows: [refRow(`${fmtNumber(ref.ascent_ft)} ft`, ref.ascent_ft)],
      note: `As the tool reads it; about ${fmtNumber(ref.ascent_ft_deck_as_straight_line)} ft with the Tukey's Bridge deck read as a straight line, since the elevation model reads the water under the deck. Too small to divide by, so no climb ratio is given.`,
    },
    {
      key: "foot",
      title: `${foot.name}, on foot`,
      rows: foot.days.map((d) => ({
        key: `f${d.day}`,
        label: <DayButton d={d} onClick={() => onOpenDay(footIndex, d.day)} />,
        value: d.ascent?.ft ?? null,
        valueText: d.ascent ? `+${fmtNumber(d.ascent.ft)} ft${d.ascent.beside ? ` (${d.ascent.beside.label})` : ""}` : "",
        compare: true,
      })),
    },
  ];

  const clockRows = register.trips.flatMap((trip, ti) =>
    trip.days.map((d) => ({
      key: `${ti}-${d.day}`,
      label: (
        <button type="button" className={s.weekDayButton} onClick={() => onOpenDay(ti, d.day)}>
          <span className={s.weekDayDate}>{fmtShortDate(d.date, d.weekday)}</span>
          <span className={s.weekDaySub}>{trip.mode === "foot" ? "On foot" : "On the water"}</span>
        </button>
      ),
      sunrise: d.daylight.sunrise,
      sunset: d.daylight.sunset,
      dusk: d.daylight.civil_dusk,
      start: d.daylight.planned_start,
      finish: d.daylight.planned_finish,
      activity: `${trip.name}, day ${d.day}: ${trip.mode === "foot" ? "walking" : "on the water"}`,
    })),
  );

  return (
    <div className={s.week}>
      <div className={s.tripHead}>
        <h2 className={s.tripTitle}>Week at a glance</h2>
        <p className={s.tripMeta}>
          All nine days on shared scales, each walking day beside the {ref.name} at the school. Select a day to open it.
        </p>
      </div>

      <section className={s.refBlock} aria-labelledby="ref-title">
        <div className={s.refMap}>
          <RouteMap
            token={mapbox.token}
            styleUrl={mapbox.style}
            line={{ coordinates: bundle.reference.line.coordinates, cum_mi: bundle.reference.line.cum_mi }}
            stops={refStops}
            label={`Map of the ${ref.name} from ${ref.start}`}
            colors={colors}
            compact
          />
          <p className={s.caption}>
            The loop in Atlantic blue, measured with the same route tool as the trips. A: the school&apos;s location.
          </p>
        </div>
        <div className={s.refFacts}>
          <p className={s.runningLabel}>The reference walk</p>
          <h3 id="ref-title" className={s.refTitle}>
            The {ref.name}
          </h3>
          <p>
            The school&apos;s location, {ref.start}, sits 12 m from the trail, so the loop starts and ends at the
            school. Surface: {ref.surface.text}.
          </p>
          <dl className={s.facts}>
            <div>
              <dt>Distance</dt>
              <dd>
                {fmtNumber(ref.distance.mi, 1)} mi
                <span className={s.cellNote}>
                  Portland Trails publishes {ref.distance.published?.as_published ?? "3.6 miles"}; measured{" "}
                  {fmtNumber(ref.distance.tool.mi, 1)} mi
                </span>
              </dd>
            </div>
            <div>
              <dt>Climb</dt>
              <dd>
                {fmtNumber(ref.ascent_ft)} ft
                <span className={s.cellNote}>
                  as the tool reads it; about {fmtNumber(ref.ascent_ft_deck_as_straight_line)} ft with the bridge deck
                  read as a straight line
                </span>
              </dd>
            </div>
            <div>
              <dt>Moving time</dt>
              <dd>
                {ref.moving_time_group.text}
                <span className={s.cellNote}>at a school group&apos;s pace in the trips&apos; model</span>
              </dd>
            </div>
            <div>
              <dt>Naismith&apos;s rule</dt>
              <dd>
                {ref.naismith.text}
                <span className={s.cellNote}>as published in 1892, for walkers of reasonable fitness</span>
              </dd>
            </div>
          </dl>
          <p className={s.note}>
            Each walking day is a ratio of route facts against this loop, measured with the same tool and timed with the
            same model, {purposeLine}
          </p>
        </div>
      </section>

      <div className={s.weekGrid}>
        <WeekBars
          title="Distance, all nine days on one axis"
          unit="mi"
          max={9}
          ticks={[0, 2, 4, 6, 8]}
          refValue={ref.distance.mi}
          groups={distanceGroups}
          caption="Dashed line: the Back Cove loop, drawn through the walking days. Walking days show the ratio to the loop; the water days share the axis, not the comparison. Figures as the Trip Leader Cards print them."
        />
        <WeekBars
          title="Moving time before stops, on one axis"
          unit="h"
          max={7}
          ticks={[0, 2, 4, 6]}
          refValue={ref.moving_time_group.h}
          groups={timeGroups}
          caption="Each trip's own model at a school group's pace. Dashed line: the Back Cove loop, through the walking days."
        />
        <WeekBars
          title="Climb, the walking days on one axis"
          unit="ft"
          max={3500}
          ticks={[0, 1000, 2000, 3000]}
          refValue={ref.ascent_ft}
          groups={climbGroups}
          caption="Climb as the Trip Leader Card prints it; the Appalachian Mountain Club's figure beside where it differs. No climb on the water."
        />
        <ClockRows rows={clockRows} title="Planned hours against daylight, every day" />
      </div>

      <section className={s.multiples} aria-labelledby="ground-title">
        <h3 id="ground-title" className={s.multiTitle}>
          The ground on one scale
        </h3>
        <p className={s.blockLede}>
          The Back Cove loop and the four walking days, each drawn on the same miles and the same feet (0 to{" "}
          {fmtNumber(PROFILE_MAX_FT)} ft, gridlines every 1,000 ft).
        </p>
        <ProfileRow
          label={<RefLabel>Back Cove loop</RefLabel>}
          cum={bundle.reference.line.cum_mi}
          elevFt={bundle.reference.line.elev_ft}
          detail={`${fmtNumber(ref.distance.mi, 1)} mi, ${fmtNumber(ref.ascent_ft)} ft of climb as the tool reads it, high point on the line ${fmtNumber(ref.high_point_ft)} ft`}
        />
        {foot.days.map((d, i) => {
          const g = bundle.trips[footIndex].days[i].elevation;
          if (!g) return null;
          return (
            <ProfileRow
              key={d.day}
              label={<DayButton d={d} onClick={() => onOpenDay(footIndex, d.day)} />}
              cum={g.cum_mi}
              elevFt={g.elev_ft}
              detail={`${d.title}: ${fmtNumber(d.distance.mi, 1)} mi, +${fmtNumber(d.ascent?.ft ?? 0)} ft, high point on the measured line ${fmtNumber(d.high_point_ft?.ft ?? 0)} ft`}
            />
          );
        })}
        <MilesAxis max={PROFILE_MAX_MI} step={1} />
      </section>

      <section className={s.multiples} aria-labelledby="water-title">
        <h3 id="water-title" className={s.multiTitle}>
          The water days on one scale
        </h3>
        <p className={s.blockLede}>
          The five paddling lines on the same miles, with the open-water crossings in red. No elevation and no
          reference walk: on the water, open crossings, current, wind, fog and cold water are part of every day, and a
          distance ratio does not show them.
        </p>
        {water.days.map((d, i) => {
          const g = bundle.trips[waterIndex].days[i];
          const c = d.crossings;
          return (
            <WaterRow
              key={d.day}
              label={<DayButton d={d} onClick={() => onOpenDay(waterIndex, d.day)} />}
              totalMi={g.line.cum_mi[g.line.cum_mi.length - 1]}
              spans={(c?.list ?? []).map((x) => ({ from_mi: x.from_mi, to_mi: x.to_mi }))}
              detail={`${d.title}: ${fmtNumber(d.distance.mi, 1)} mi, ${c && c.count > 0 ? `${c.count} crossing${c.count === 1 ? "" : "s"}, ${fmtNumber(c.total_mi, 1)} mi in all, the longest ${fmtNumber(c.longest?.mi ?? 0, 1)} mi` : "no open-water crossing"}`}
            />
          );
        })}
        <MilesAxis max={WATER_MAX_MI} step={1} />
      </section>
    </div>
  );
}
