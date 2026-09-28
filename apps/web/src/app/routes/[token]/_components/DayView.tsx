"use client";

import { useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type {
  Beside,
  ExitToRoad,
  FootBailOut,
  RegisterDay,
  RegisterTrip,
  RouteBundle,
  WaterBailOut,
} from "@/content/routes/bundle-types";
import type { RouteSetBrand } from "@/content/routes/types";
import { CrossingStrip, ElevationProfile } from "./AlongRoute";
import { ClockRows, RatioBars, type RatioRow } from "./Charts";
import {
  clockMinutes,
  collectSources,
  fmtClock,
  fmtDuration,
  fmtLongDate,
  fmtNumber,
  fmtRatio,
  fmtShortDate,
  letterStops,
  fullStop,
  gradeStudents,
  sentence,
  type LetteredStop,
} from "./format";
import { RouteMap } from "./RouteMap";
import type { MapboxSettings } from "./RouteDemo";
import s from "./routes.module.css";

/* One day of one trip: the figure strip, the map with its profile (walking)
   or crossing strip (water), the comparison, daylight, the ways off the route
   in the Trip Leader Card's words and in figures, the emergency line as the
   trip words it, what is not measured, and the day's sources.

   Every figure is read from the register (v1.1). Each printed figure is the
   one the trip's own documents print; where the Appalachian Mountain Club
   publishes a different one, it appears beside, under its own label
   ("AMC: 7.7 mi"). Nothing is graded and nothing is recommended. */

type Props = {
  bundle: RouteBundle;
  tripIndex: number;
  day: number;
  slug: string;
  mapbox: MapboxSettings;
  colors: RouteSetBrand["colors"];
  sourceLabels: Record<string, string>;
  purposeLine: string;
  onDay: (day: number) => void;
};

function windowText(window: string) {
  const [a, b] = window.split(" to ");
  return b ? `${fmtClock(a)} to ${fmtClock(b)}` : window;
}

function Pin({ stop }: { stop: LetteredStop }) {
  return (
    <span className={`${s.pinInline} ${s[`pin_${stop.tone}`]}`} aria-hidden="true">
      {stop.letter}
    </span>
  );
}

/** AMC's differing figure, under AMC's own label, with its span where the span
    starts somewhere other than the day's start. */
function BesideNote({ beside, start }: { beside: Beside | undefined; start?: string }) {
  if (!beside) return null;
  const span = beside.span && start && !beside.span.startsWith(start) ? `, ${beside.span}` : "";
  return (
    <span className={s.beside}>
      {beside.label}
      {span}
    </span>
  );
}

function Figure({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <div className={s.figure}>
      <p className={s.figureLabel}>{label}</p>
      <p className={s.figureValue}>{value}</p>
      <div className={s.figureSub}>{children}</div>
    </div>
  );
}

function printedBy(basis: string, document = "Trip Leader Card") {
  return basis === "trip_documents" ? `as the ${document} prints it` : "measured; the trip's documents give no figure";
}

function FootFigures({ reg }: { reg: RegisterDay }) {
  const d = reg.distance;
  const ascent = reg.ascent;
  const mt = reg.moving_time_group;
  return (
    <div className={s.figures}>
      <Figure label="Distance" value={`${fmtNumber(d.mi, 1)} mi`}>
        <p>
          {reg.start.split(",")[0]} to {reg.end.split(",")[0]}, measured along the day&apos;s line,{" "}
          {printedBy(d.basis, d.trip_documents?.document)}.
        </p>
        <BesideNote beside={d.beside} start={reg.start.split(",")[0]} />
      </Figure>
      <Figure label="Climb" value={ascent ? `+${fmtNumber(ascent.ft)} ft` : "Not given"}>
        <p>
          {reg.descent ? `Descent ${fmtNumber(reg.descent.ft)} ft` : ""}
          {reg.high_point_ft
            ? `; high point on the day's measured line ${fmtNumber(reg.high_point_ft.ft)} ft (USGS 3DEP).`
            : "."}
        </p>
        <BesideNote beside={ascent?.beside} start={reg.start.split(",")[0]} />
      </Figure>
      <Figure label="Moving time" value={mt.text}>
        <p>At a school group&apos;s pace in the trip&apos;s model (2 mph plus 1 h per 1,000 ft of climb), before stops.</p>
        <BesideNote beside={mt.beside} start={reg.start.split(",")[0]} />
      </Figure>
      <SunsetFigure reg={reg} />
    </div>
  );
}

function SunsetFigure({ reg }: { reg: RegisterDay }) {
  return (
    <Figure label="Sunset" value={fmtClock(reg.daylight.sunset)}>
      <p>
        {fullStop(
          `Civil dusk ${fmtClock(reg.daylight.civil_dusk)}; planned finish ${fmtClock(reg.daylight.planned_finish)}`,
        )}
      </p>
    </Figure>
  );
}

function WaterFigures({ reg }: { reg: RegisterDay }) {
  const d = reg.distance;
  const c = reg.crossings;
  return (
    <div className={s.figures}>
      <Figure label="Distance" value={`${fmtNumber(d.mi, 1)} mi`}>
        <p>
          {d.nm !== undefined ? `${fmtNumber(d.nm, 1)} nautical miles, ` : ""}measured along the planned line,{" "}
          {printedBy(d.basis, d.trip_documents?.document)}.
        </p>
      </Figure>
      <Figure label="Moving time" value={reg.moving_time_group.text}>
        <p>
          At the trip&apos;s 2.5 knots, before stops.
          {reg.time_on_water
            ? ` ${fullStop(`Planned on the water ${fmtClock(reg.time_on_water.planned_start)} to ${fmtClock(reg.time_on_water.planned_finish)}`)}`
            : ""}
        </p>
      </Figure>
      <Figure label="Open-water crossings" value={c && c.count > 0 ? String(c.count) : "None"}>
        <p>
          {c && c.count > 0
            ? `${fmtNumber(c.total_mi, 1)} mi in all, about ${c.total_minutes_at_2_5_kt} min at 2.5 knots; the longest ${fmtNumber(c.longest?.mi ?? 0, 1)} mi.`
            : (c?.note ?? "No open-water crossing on this day.")}
        </p>
      </Figure>
      <SunsetFigure reg={reg} />
    </div>
  );
}

function FootComparison({ bundle, reg, purposeLine }: { bundle: RouteBundle; reg: RegisterDay; purposeLine: string }) {
  const ref = bundle.register.references.walking;
  const vs = reg.vs_reference;
  const rows: RatioRow[] = [];
  if (vs.distance !== undefined) {
    rows.push({
      key: "distance",
      label: "Distance",
      value: vs.distance,
      valueText: fmtRatio(vs.distance),
      detail: `${fmtNumber(reg.distance.mi, 1)} mi against the loop's ${fmtNumber(ref.distance.mi, 1)} mi`,
    });
  }
  if (vs.moving_time_group !== undefined) {
    rows.push({
      key: "moving",
      label: "Moving time at a school group's pace",
      value: vs.moving_time_group,
      valueText: fmtRatio(vs.moving_time_group),
      detail: `${reg.moving_time_group.text} against ${ref.moving_time_group.text}, the trip's own model for both`,
    });
  }
  if (vs.naismith !== undefined && reg.naismith) {
    rows.push({
      key: "naismith",
      label: "Time by Naismith's rule",
      value: vs.naismith,
      valueText: fmtRatio(vs.naismith),
      detail: `${reg.naismith.text} against ${ref.naismith.text}; Naismith's rule as published in 1892, cited in the sources`,
    });
  }
  if (vs.climb) {
    rows.push({
      key: "climb",
      label: "Time the climb adds",
      value: vs.climb.climb_time_vs_reference_time,
      valueText: fmtRatio(vs.climb.climb_time_vs_reference_time),
      detail: `the hours the trip's model gives the day's ${fmtNumber(vs.climb.day_ft)} ft of climb (1 h per 1,000 ft), over the loop's whole moving time`,
    });
  }
  return (
    <section className={s.block} aria-labelledby="compare-title">
      <h4 id="compare-title" className={s.blockTitle}>
        Beside the Back Cove Trail loop
      </h4>
      <p className={s.blockLede}>
        The loop at the school: {fmtNumber(ref.distance.mi, 1)} mi, {ref.moving_time_group.text} at a school
        group&apos;s pace, {ref.naismith.text} by Naismith&apos;s rule. Each bar is the day&apos;s figure over the
        loop&apos;s.
      </p>
      <RatioBars rows={rows} max={4} refValue={1} refLabel="Back Cove loop = 1" />
      {vs.climb && vs.climb.ratio === null ? (
        <p className={s.note}>
          <strong>No climb ratio.</strong> {vs.climb.reason}
        </p>
      ) : null}
      <p className={s.note}>
        Ratios of route facts, measured with the same tool and timed with the same model, {purposeLine}
      </p>
    </section>
  );
}

function WaterComparison({ trip, reg }: { trip: RegisterTrip; reg: RegisterDay }) {
  const vs = reg.vs_trip_days;
  if (!vs) return null;
  const longest = trip.days.find((d) => d.day === vs.longest_day);
  const longestName = longest ? longest.weekday : `day ${vs.longest_day}`;
  const count = ["", "one", "two", "three", "four", "five", "six", "seven"][trip.days.length] ?? String(trip.days.length);
  const rank = ["", "The longest", "The second longest", "The third longest", "The fourth longest", "The fifth longest"][
    vs.rank_by_distance
  ];
  const rows: RatioRow[] = [
    {
      key: "distance",
      label: "Distance",
      value: vs.distance_share_of_longest_day,
      valueText: fmtNumber(vs.distance_share_of_longest_day, 1),
      detail: longest
        ? `${fmtNumber(reg.distance.mi, 1)} mi against ${longestName}'s ${fmtNumber(longest.distance.mi, 1)} mi`
        : "",
    },
    {
      key: "moving",
      label: "Moving time at 2.5 knots",
      value: vs.moving_time_share_of_longest_day,
      valueText: fmtNumber(vs.moving_time_share_of_longest_day, 1),
      detail: longest ? `${reg.moving_time_group.text} against ${longest.moving_time_group.text}` : "",
    },
  ];
  return (
    <section className={s.block} aria-labelledby="compare-title">
      <h4 id="compare-title" className={s.blockTitle}>
        Beside the week&apos;s longest water day
      </h4>
      <p className={s.blockLede}>
        Each water day is set beside {longestName}, the longest of the {count} by distance.{" "}
        {rank ? `This is ${rank.toLowerCase()} of the ${count}.` : ""}
      </p>
      <RatioBars rows={rows} max={1} refValue={1} refLabel={`${longestName} = 1`} />
      <p className={s.note}>
        <strong>No paddling reference.</strong> Nothing in the trip record or the school&apos;s documents names a route
        the group has paddled before the trip. On the water, open crossings, current, wind, fog and cold water are part
        of every day, and a distance ratio does not show them. The Back Cove walk is a different mode, so the water days
        are set beside each other.
      </p>
    </section>
  );
}

function Daylight({ reg }: { reg: RegisterDay }) {
  const dl = reg.daylight;
  const activity = reg.mode === "foot" ? "Walking" : "On the water";
  const toSunset = clockMinutes(dl.sunset) - clockMinutes(dl.planned_finish);
  const toDusk = clockMinutes(dl.civil_dusk) - clockMinutes(dl.planned_finish);
  return (
    <section className={s.block} aria-labelledby="daylight-title">
      <h4 id="daylight-title" className={s.blockTitle}>
        Daylight
      </h4>
      <ClockRows
        rows={[
          {
            key: "day",
            sunrise: dl.sunrise,
            sunset: dl.sunset,
            dusk: dl.civil_dusk,
            start: dl.planned_start,
            finish: dl.planned_finish,
            activity,
          },
        ]}
      />
      <dl className={s.facts}>
        <div>
          <dt>Sunrise</dt>
          <dd>{fmtClock(dl.sunrise)}</dd>
        </div>
        <div>
          <dt>{activity}</dt>
          <dd>
            {fmtClock(dl.planned_start)} to {fmtClock(dl.planned_finish)}
          </dd>
        </div>
        <div>
          <dt>Sunset</dt>
          <dd>{fmtClock(dl.sunset)}</dd>
        </div>
        <div>
          <dt>Civil dusk</dt>
          <dd>{fmtClock(dl.civil_dusk)}</dd>
        </div>
        <div>
          <dt>Planned finish to sunset</dt>
          <dd>{fmtDuration(toSunset)}</dd>
        </div>
        <div>
          <dt>Planned finish to civil dusk</dt>
          <dd>{fmtDuration(toDusk)}</dd>
        </div>
      </dl>
      <p className={s.caption}>Local time (Eastern). Daylight {fmtNumber(dl.daylight_h, 1)} h, sunrise to sunset.</p>
    </section>
  );
}

function Tide({ reg }: { reg: RegisterDay }) {
  if (!reg.tide) return null;
  return (
    <section className={s.block} aria-labelledby="tide-title">
      <h4 id="tide-title" className={s.blockTitle}>
        Tide at Portland
      </h4>
      <dl className={s.facts}>
        {reg.tide.events_05_to_21.map((ev) => (
          <div key={ev.time}>
            <dt>{ev.type === "high" ? "High water" : "Low water"}</dt>
            <dd>
              {fmtClock(ev.time)}, {fmtNumber(ev.ft, 1)} ft
            </dd>
          </div>
        ))}
      </dl>
      <p className={s.caption}>
        {reg.tide.station}, feet above {reg.tide.datum}; predictions between 5 a.m. and 9 p.m.
      </p>
    </section>
  );
}

function Crossings({ reg }: { reg: RegisterDay }) {
  const c = reg.crossings;
  if (!c || c.count === 0) return null;
  return (
    <section className={s.block} aria-labelledby="crossings-title">
      <h4 id="crossings-title" className={s.blockTitle}>
        Open-water crossings and the current
      </h4>
      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col">Crossing</th>
            <th scope="col" className={s.num}>
              Length
            </th>
            <th scope="col" className={s.num}>
              At 2.5 kt
            </th>
            <th scope="col">Planned window</th>
            <th scope="col">Current in the window</th>
            <th scope="col">Slack water at the station</th>
          </tr>
        </thead>
        <tbody>
          {c.list.map((x) => (
            <tr key={x.n}>
              <td>
                <span className={`${s.pinInline} ${s.pinSquare} ${s.pin_accent}`} aria-hidden="true">
                  {x.n}
                </span>{" "}
                <span className={s.srOnly}>Crossing {x.n}: </span>
                {x.name}
              </td>
              <td className={s.num} data-label="Length">
                {fmtNumber(x.mi, 1)} mi / {fmtNumber(x.nm, 1)} nm
              </td>
              <td className={s.num} data-label="At 2.5 kt">
                {x.minutes_at_2_5_kt} min
              </td>
              <td data-label="Planned window">{windowText(x.window)}</td>
              <td data-label="Current in the window">
                up to {fmtNumber(x.max_current_in_window_kt, 1)} kt, {x.set}
              </td>
              <td data-label="Slack water">
                {x.slack.map(fmtClock).join(", ")}
                <span className={s.cellNote}>{x.current_station}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={s.caption}>
        Windows as the trip plans them. Current: NOAA predictions at the station named, the strongest in the
        crossing&apos;s window. Lengths along the planned line, as the Trip Leader Card prints them.
      </p>
    </section>
  );
}

function stopFor(stops: LetteredStop[], name: string) {
  return stops.find((st) => st.name === name) ?? null;
}

function DocumentWords({ text }: { text: RegisterDay["exits_text"] }) {
  if (!text) return null;
  return (
    <div className={s.docWords}>
      <p className={s.runningLabel}>As the Trip Leader Card words it</p>
      <p>{text.text}</p>
    </div>
  );
}

function ExitLength({ exit, atMi, dayMi }: { exit: ExitToRoad | undefined; atMi: number; dayMi: number }) {
  if (!exit) {
    return <>{atMi === 0 ? "at the start of the line" : Math.abs(atMi - dayMi) < 0.05 ? "at the finish" : "at the road"}</>;
  }
  if (exit.parts && exit.parts.length > 1) {
    const words = exit.parts
      .map((p) => `${fmtNumber(p.mi, 1)} mi ${p.to ? `to the ${p.to}` : `by the ${p.trail}`}`)
      .join(", then ");
    return (
      <>
        {exit.parts.map((p) => fmtNumber(p.mi, 1)).join(" + ")} mi
        <span className={s.cellNote}>{sentence(words)}</span>
        {exit.beside ? <span className={s.cellNote}>{exit.beside.label}</span> : null}
      </>
    );
  }
  return (
    <>
      {fmtNumber(exit.mi, 1)} mi
      {exit.basis === "tool" ? <span className={s.cellNote}>measured</span> : null}
      {exit.beside ? <span className={s.cellNote}>{exit.beside.label}</span> : null}
    </>
  );
}

function FootBailOuts({
  reg,
  stops,
  onShow,
}: {
  reg: RegisterDay;
  stops: LetteredStop[];
  onShow: (letter: string) => void;
}) {
  const list = reg.bail_outs as FootBailOut[];
  const ed = reg.emergency_department.name;
  const notes = list.filter((b) => b.note).map((b) => b.note);
  return (
    <section className={s.block} aria-labelledby="exits-title">
      <h4 id="exits-title" className={s.blockTitle}>
        Ways off the route
      </h4>
      <DocumentWords text={reg.exits_text} />
      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col">Where</th>
            <th scope="col" className={s.num}>
              At mile
            </th>
            <th scope="col">Way off</th>
            <th scope="col" className={s.num}>
              To the road
            </th>
            <th scope="col">Road access</th>
            <th scope="col" className={s.num}>
              Drive to {ed}
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((b) => {
            const at = stopFor(stops, b.name) ?? stopFor(stops, b.name.split(",")[0]);
            const road = stopFor(stops, b.road_access);
            return (
              <tr key={`${b.name}-${b.at_mi_measured}`}>
                <td>
                  {at ? <Pin stop={at} /> : null} {b.name}
                </td>
                <td className={s.num} data-label="At mile">
                  {fmtNumber(b.at_mi_measured, 1)}
                </td>
                <td data-label="Way off">{sentence(b.how)}</td>
                <td className={s.num} data-label="To the road">
                  <ExitLength exit={b.exit_to_road} atMi={b.at_mi_measured} dayMi={reg.distance.mi} />
                </td>
                <td data-label="Road access">
                  {road ? <Pin stop={road} /> : null} {b.road_access}
                  {road && !road.onRoute ? (
                    <button type="button" className={s.linkButton} onClick={() => onShow(road.letter)}>
                      Show {road.letter} on the map
                    </button>
                  ) : null}
                </td>
                <td className={s.num} data-label={`Drive to ${ed}`}>
                  {b.drive_to_ed_min} min
                  <span className={s.cellNote}>{fmtNumber(b.drive_to_ed_mi, 1)} mi</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className={s.caption}>
        Miles along the day&apos;s line. Exit lengths as the Trip Leader Card prints them; where it gives none, measured
        on the same trail data and marked so; the Appalachian Mountain Club&apos;s figure beside where it differs. Drive
        times are typical, by Mapbox Directions.{notes.length ? ` ${notes.join(" ")}` : ""}
      </p>
    </section>
  );
}

function landingLine(b: WaterBailOut) {
  if (b.off_line_mi === 0 || !b.off_line) return `On the day's line at mile ${fmtNumber(b.at_mi_measured, 1)}.`;
  if (b.off_line.basis === "trip_documents" && b.off_line.as_printed) {
    return `${sentence(b.off_line.as_printed)}, as the Trip Leader Card words it; the line passes nearest at mile ${fmtNumber(b.at_mi_measured, 1)}.`;
  }
  return `${fmtNumber(b.off_line.mi, 1)} mi off the day's line at its nearest, near mile ${fmtNumber(b.at_mi_measured, 1)}; measured, as the Trip Leader Card gives no distance.`;
}

function WaterBailOuts({
  reg,
  stops,
  onShow,
}: {
  reg: RegisterDay;
  stops: LetteredStop[];
  onShow: (letter: string) => void;
}) {
  const list = reg.bail_outs as WaterBailOut[];
  return (
    <section className={s.block} aria-labelledby="exits-title">
      <h4 id="exits-title" className={s.blockTitle}>
        Bail-out landings
      </h4>
      <DocumentWords text={reg.bail_out_text} />
      <ul className={s.placeList}>
        {list.map((b) => {
          const at = stopFor(stops, b.name);
          return (
            <li key={`${b.name}-${b.at_mi_measured}`}>
              <p className={s.placeName}>
                {at ? <Pin stop={at} /> : null} {b.name}
              </p>
              <p className={s.placeMeta}>
                {landingLine(b)} {sentence(b.note)}.
                {at && !at.onRoute ? (
                  <button type="button" className={s.linkButton} onClick={() => onShow(at.letter)}>
                    Show {at.letter} on the map
                  </button>
                ) : null}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Emergency({ reg }: { reg: RegisterDay }) {
  const ed = reg.emergency_department;
  return (
    <section className={s.block} aria-labelledby="ed-title">
      <h4 id="ed-title" className={s.blockTitle}>
        {reg.mode === "foot" ? "Emergency department" : "Emergency care"}
      </h4>
      <p className={s.runningLabel}>As the Trip Leader Card words it</p>
      <p className={s.edLine}>{ed.document_line}</p>
      <p className={s.note}>{ed.who_confirms}</p>
    </section>
  );
}

function NotMeasured({ trip, reg }: { trip: RegisterTrip; reg: RegisterDay }) {
  const c = reg.cover;
  const wt = trip.water_temperature;
  return (
    <section className={s.block} aria-labelledby="cover-title">
      <h4 id="cover-title" className={s.blockTitle}>
        {c.measured ? "Tree cover, and what is not measured" : "What is not measured on the water"}
      </h4>
      {c.measured ? (
        <>
          <p>
            Under tree canopy for {c.under_canopy_pct_of_route}% of the day&apos;s line, open for {c.open_pct_of_route}
            %.{" "}
            {c.longest_open_mi && c.longest_open_mi > 0
              ? `The longest open stretch is ${fmtNumber(c.longest_open_mi, 1)} mi, from mile ${fmtNumber(c.longest_open_at_mi ?? 0, 1)}${c.longest_open_name ? `, at ${c.longest_open_name}` : ""}.`
              : "The canopy data shows no open stretch as long as 0.1 mi."}
            {reg.above_4500_ft
              ? ` Above 4,500 ft from mile ${fmtNumber(reg.above_4500_ft.from_mi, 1)} to ${fmtNumber(reg.above_4500_ft.to_mi, 1)}, measured from elevation.`
              : ""}
          </p>
          {c.raster ? <p className={s.caption}>{c.raster}.</p> : null}
        </>
      ) : null}
      {c.not_measured.length ? (
        <>
          <p className={`${s.runningLabel} ${s.spaced}`}>Not measured</p>
          <ul className={s.bullets}>
            {c.not_measured.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}
      {!c.measured && wt ? (
        <p className={s.note}>
          <strong>Water temperature.</strong> At Portland, {wt.window} in {wt.years}: mean {fmtNumber(wt.mean_f, 1)} °F,
          from {fmtNumber(wt.low_f, 1)} to {fmtNumber(wt.high_f, 1)} °F ({wt.station}).
        </p>
      ) : null}
    </section>
  );
}

function Sources({ ids, bundle, labels }: { ids: string[]; bundle: RouteBundle; labels: Record<string, string> }) {
  return (
    <details className={s.sources}>
      <summary>Sources for this day ({ids.length})</summary>
      <ul>
        {ids.map((id) => {
          const src = bundle.register.sources[id];
          return (
            <li key={id}>
              {labels[id] ?? src?.what ?? id}
              {src?.url ? (
                <>
                  {" "}
                  <a href={src.url} rel="noreferrer noopener" target="_blank">
                    {new URL(src.url).hostname.replace(/^www\./, "")}
                  </a>
                  {src.accessed ? `, accessed ${src.accessed}` : ""}.
                </>
              ) : null}
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export function DayView(props: Props) {
  const { bundle, tripIndex, day, slug, mapbox, colors, sourceLabels, purposeLine, onDay } = props;
  const trip = bundle.register.trips[tripIndex];
  const geoTrip = bundle.trips[tripIndex];
  const reg = trip.days[day - 1];
  const geo = geoTrip.days[day - 1];
  const dayKey = `${slug}/${day}`;
  const foot = reg.mode === "foot";

  const stops = useMemo(() => letterStops(geo.stops, geo.mode), [geo]);
  const crossings = useMemo(
    () => (reg.crossings?.list ?? []).map((c) => ({ n: c.n, from_mi: c.from_mi, to_mi: c.to_mi })),
    [reg],
  );
  // Hover and "show on map" belong to one day; a new day starts clear.
  const [hover, setHover] = useState<{ key: string; mi: number } | null>(null);
  const [focus, setFocus] = useState<{ key: string; letter: string } | null>(null);
  const hoverMi = hover && hover.key === dayKey ? hover.mi : null;
  const focusLetter = focus && focus.key === dayKey ? focus.letter : null;
  const onHover = (mi: number | null) => setHover(mi === null ? null : { key: dayKey, mi });
  const onShow = (letter: string) => {
    setFocus({ key: dayKey, letter });
    document.getElementById("day-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sourceIds = useMemo(() => {
    const ids = collectSources(reg);
    if (foot) ["ref_route", "portland_trails_back_cove", "naismith", "contract_pace"].forEach((id) => ids.add(id));
    return [...ids].filter((id) => bundle.register.sources[id]);
  }, [reg, foot, bundle.register.sources]);

  const dayTabs = trip.days;
  const onDayKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = dayTabs.length - 1;
    const target =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    onDay(target + 1);
    document.getElementById(`day-tab-${slug}-${target + 1}`)?.focus();
  };

  const tripLine =
    trip.mode === "foot"
      ? trip.totals.as_printed
      : `${trip.totals.as_printed}, with ${trip.totals.crossings ?? 0} open-water crossings`;

  const activity = foot ? "walking" : "on the water";
  const panelId = `day-panel-${slug}`;

  return (
    <div className={s.trip}>
      <div className={s.tripHead}>
        <h2 className={s.tripTitle}>{trip.name}</h2>
        <p className={s.tripMeta}>
          {trip.dates} · {gradeStudents(trip.school_grade)} · {sentence(tripLine)}
        </p>
      </div>

      <div className={s.dayTabs} role="tablist" aria-label={`Days of the ${trip.name}`}>
        {dayTabs.map((d, i) => {
          const selected = d.day === day;
          return (
            <button
              key={d.day}
              id={`day-tab-${slug}-${d.day}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={s.dayTab}
              onClick={() => onDay(d.day)}
              onKeyDown={(e) => onDayKey(e, i)}
            >
              <span className={s.dayTabDate}>{fmtShortDate(d.date, d.weekday)}</span>
              <span className={s.dayTabSub}>
                Day {d.day} · {fmtNumber(d.distance.mi, 1)} mi
              </span>
            </button>
          );
        })}
      </div>

      <section id={panelId} role="tabpanel" aria-labelledby={`day-tab-${slug}-${day}`} className={s.day}>
        <header className={s.dayHead}>
          <p className={s.runningLabel}>
            {fmtLongDate(reg.date, reg.weekday)} · day {reg.day} of {trip.days.length}
          </p>
          <h3 className={s.dayTitle}>{reg.title}</h3>
          <p className={s.dayMeta}>
            {reg.start} to {reg.end} · {activity} {fmtClock(reg.daylight.planned_start)} to{" "}
            {fmtClock(reg.daylight.planned_finish)} · night: {reg.night}
          </p>
        </header>

        {foot ? <FootFigures reg={reg} /> : <WaterFigures reg={reg} />}

        <div className={s.dayGrid}>
          <div className={s.dayMain} id="day-map">
            <RouteMap
              token={mapbox.token}
              styleUrl={mapbox.style}
              line={geo.line}
              stops={stops}
              crossings={crossings}
              hoverMi={hoverMi}
              onHover={onHover}
              focusLetter={focusLetter}
              label={`Map of ${reg.title}, ${fmtLongDate(reg.date, reg.weekday)}`}
              colors={colors}
            />
            <p className={s.caption}>
              {foot
                ? "The day's line in Atlantic blue; places lettered in route order, then the exit trailheads off the route (exit trails are not drawn). Hover or tap the line to follow it on the profile."
                : "The planned paddling line in Atlantic blue; open-water crossings in red, numbered in order; places lettered. Hover or tap the line to follow it on the strip."}
            </p>
            {foot && geo.elevation ? (
              <>
                <ElevationProfile
                  cum={geo.elevation.cum_mi}
                  elevFt={geo.elevation.elev_ft}
                  stops={stops}
                  hoverMi={hoverMi}
                  onHover={onHover}
                  above4500={reg.above_4500_ft ?? null}
                  label={`Elevation profile of ${reg.title}; arrow keys move along the day`}
                />
                <p className={s.caption}>
                  Feet above sea level (USGS 3DEP) against miles along the day&apos;s line (
                  {fmtNumber(reg.distance.mi, 1)} mi). Moving along the profile moves the marker on the map.
                  {reg.above_4500_ft ? " Dashed line: 4,500 ft; the heavier stretch on it marks the miles above it." : ""}
                </p>
              </>
            ) : (
              <>
                <CrossingStrip
                  cum={geo.line.cum_mi}
                  crossings={crossings}
                  stops={stops}
                  hoverMi={hoverMi}
                  onHover={onHover}
                  label={`Where the open-water crossings fall on ${reg.title}; arrow keys move along the day`}
                />
                <p className={s.caption}>
                  No elevation on the water. Miles along the planned line; red bars are the open-water crossings,
                  numbered as on the map and in the table. Moving along the strip moves the marker on the map.
                </p>
              </>
            )}
            <ul className={s.legend} aria-label="Places on the map">
              {stops.map((st) => (
                <li key={st.letter}>
                  <Pin stop={st} />
                  <span>
                    <strong>{st.name}</strong>, {st.label}
                    {st.onRoute ? `, mile ${st.atMi.map((m) => fmtNumber(m, 1)).join(" and ")}` : ", off the route"}
                    {st.note ? `. ${sentence(st.note)}.` : "."}
                  </span>
                </li>
              ))}
            </ul>
            {foot && reg.high_point_ft && stops.some((st) => st.kind === "summit") ? (
              <p className={s.caption}>
                Summit heights in this list are the published heights. The high point in the figures above is read
                along the day&apos;s measured line from USGS 3DEP elevation, so the two figures can differ.
              </p>
            ) : null}
          </div>
          <div className={s.daySide}>
            {foot ? (
              <FootComparison bundle={bundle} reg={reg} purposeLine={purposeLine} />
            ) : (
              <WaterComparison trip={trip} reg={reg} />
            )}
            <Daylight reg={reg} />
            <Tide reg={reg} />
          </div>
        </div>

        <Crossings reg={reg} />
        {foot ? (
          <FootBailOuts reg={reg} stops={stops} onShow={onShow} />
        ) : (
          <WaterBailOuts reg={reg} stops={stops} onShow={onShow} />
        )}
        <div className={s.pair}>
          <Emergency reg={reg} />
          <NotMeasured trip={trip} reg={reg} />
        </div>
        <Sources ids={sourceIds} bundle={bundle} labels={sourceLabels} />
      </section>
    </div>
  );
}
