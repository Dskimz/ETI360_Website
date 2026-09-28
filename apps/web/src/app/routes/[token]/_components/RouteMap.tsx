"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import type { GeoJSONSource, LngLatBoundsLike, Map as MapboxMap, Marker } from "mapbox-gl";
import { nearestIndex, type LetteredStop } from "./format";
import s from "./routes.module.css";

/* One Mapbox GL map per view, kept across day changes: the day's line (with a
   white casing, as on the printed maps), the open-water crossings on water
   days, the lettered places, and a marker that follows the elevation profile
   or crossing strip. Hovering the line reports the mile back up, so the
   profile follows the map and the map follows the profile.

   Style: the field-briefing style the trips' printed maps use
   (NEXT_PUBLIC_MAPBOX_STYLE), with its deep-navy water paled the way the print
   pipeline pales it (build_*_assets.py lighten_water: 32 percent retained). */

type GeoJSONData = Parameters<GeoJSONSource["setData"]>[0];

export type MapLine = { coordinates: [number, number, number][]; cum_mi: number[] };
export type MapCrossing = { n: number; from_mi: number; to_mi: number };
export type MapColors = { primary: string; accent: string; muted: string };

type Props = {
  token: string;
  styleUrl: string;
  line: MapLine;
  stops: LetteredStop[];
  crossings?: MapCrossing[];
  hoverMi?: number | null;
  onHover?: (mi: number | null) => void;
  focusLetter?: string | null;
  label: string;
  colors: MapColors;
  /** A shorter map (the reference loop in the week view). */
  compact?: boolean;
};

// The print pipeline's water treatment, applied to the style's own colors.
const PALE_WATER = "#B1C0C9"; // #0A3A56 at 32 percent over white
const PALE_WATERWAY = "#8FA4B1";

function bounds(coords: [number, number][]): LngLatBoundsLike {
  let w = Infinity;
  let e = -Infinity;
  let so = Infinity;
  let n = -Infinity;
  for (const [lon, lat] of coords) {
    w = Math.min(w, lon);
    e = Math.max(e, lon);
    so = Math.min(so, lat);
    n = Math.max(n, lat);
  }
  return [
    [w, so],
    [e, n],
  ];
}

function padding(el: HTMLElement | null) {
  const width = el?.clientWidth ?? 800;
  return width < 520 ? 28 : 56;
}

function lineData(line: MapLine): GeoJSONData {
  return {
    type: "Feature",
    properties: {},
    geometry: { type: "LineString", coordinates: line.coordinates.map(([lon, lat]) => [lon, lat]) },
  };
}

function crossingData(line: MapLine, crossings: MapCrossing[]): GeoJSONData {
  return {
    type: "FeatureCollection",
    features: crossings.map((c) => {
      const from = nearestIndex(line.cum_mi, c.from_mi);
      const to = nearestIndex(line.cum_mi, c.to_mi);
      return {
        type: "Feature",
        properties: { n: c.n },
        geometry: {
          type: "LineString",
          coordinates: line.coordinates.slice(from, Math.max(to, from + 1) + 1).map(([lon, lat]) => [lon, lat]),
        },
      };
    }),
  };
}

function hoverData(line: MapLine, mi: number | null | undefined): GeoJSONData {
  if (mi === null || mi === undefined) return { type: "FeatureCollection", features: [] };
  const [lon, lat] = line.coordinates[nearestIndex(line.cum_mi, mi)];
  return { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [lon, lat] } };
}

function pinElement(text: string, tone: string, title: string, extra = "") {
  const el = document.createElement("div");
  el.className = `${s.pin} ${tone} ${extra}`.trim();
  el.textContent = text;
  el.title = title;
  el.setAttribute("aria-hidden", "true");
  return el;
}

export function RouteMap(props: Props) {
  const { token, styleUrl, line, stops, crossings, hoverMi, focusLetter, label, colors, compact } = props;
  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapboxMap | null>(null);
  const [failed, setFailed] = useState(false);
  const lib = useRef<typeof import("mapbox-gl").default | null>(null);
  const markers = useRef<Marker[]>([]);
  const fitted = useRef(false);
  // The latest line and hover callback, for the map's own event handlers.
  const latest = useRef({ line, onHover: props.onHover });
  useEffect(() => {
    latest.current = { line, onHover: props.onHover };
  });

  // Create the map once.
  useEffect(() => {
    if (!token || !container.current) return;
    let cancelled = false;
    let instance: MapboxMap | null = null;
    import("mapbox-gl").then(({ default: mapboxgl }) => {
      if (cancelled || !container.current) return;
      lib.current = mapboxgl;
      try {
        instance = new mapboxgl.Map({
          container: container.current,
          accessToken: token,
          style: styleUrl,
          bounds: bounds(latest.current.line.coordinates.map(([lon, lat]) => [lon, lat])),
          fitBoundsOptions: { padding: padding(container.current), maxZoom: 14.5 },
          cooperativeGestures: true,
          projection: "mercator",
          attributionControl: true,
          logoPosition: "bottom-left",
          // No performance telemetry from this private page. Mapbox still
          // records each map load for billing; that request cannot be turned off.
          performanceMetricsCollection: false,
        });
      } catch {
        setFailed(true);
        return;
      }
      const m = instance;
      m.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
      // A listener keeps a failed tile from reaching the console; a style that
      // cannot load at all is reported on the page instead.
      m.on("error", (event) => {
        const status = (event.error as { status?: number } | undefined)?.status;
        if (!m.isStyleLoaded() && (status === 401 || status === 403 || status === 404)) setFailed(true);
      });
      m.on("load", () => {
        if (m.getLayer("water-fill-deep-navy")) m.setPaintProperty("water-fill-deep-navy", "fill-color", PALE_WATER);
        if (m.getLayer("waterway-line")) m.setPaintProperty("waterway-line", "line-color", PALE_WATERWAY);

        m.addSource("route", { type: "geojson", data: lineData(latest.current.line) });
        m.addSource("crossings", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        m.addSource("hover", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        m.addLayer({
          id: "route-casing",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#FFFFFF", "line-width": 8 },
        });
        m.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": colors.primary, "line-width": 4.5 },
        });
        m.addLayer({
          id: "crossing-line",
          type: "line",
          source: "crossings",
          layout: { "line-join": "round", "line-cap": "butt" },
          paint: { "line-color": colors.accent, "line-width": 4.5 },
        });
        m.addLayer({
          id: "route-hit",
          type: "line",
          source: "route",
          paint: { "line-color": "#000000", "line-width": 26, "line-opacity": 0 },
        });
        m.addLayer({
          id: "hover-dot",
          type: "circle",
          source: "hover",
          paint: {
            "circle-radius": 7,
            "circle-color": colors.accent,
            "circle-stroke-color": "#FFFFFF",
            "circle-stroke-width": 2.5,
          },
        });

        const report = (lon: number, lat: number) => {
          const { line: current, onHover } = latest.current;
          if (!onHover) return;
          const k = Math.cos((lat * Math.PI) / 180);
          let best = 0;
          let bestD = Infinity;
          current.coordinates.forEach(([x, y], i) => {
            const d = ((x - lon) * k) ** 2 + (y - lat) ** 2;
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          onHover(current.cum_mi[best]);
        };
        m.on("mousemove", "route-hit", (e) => {
          m.getCanvas().style.cursor = "crosshair";
          report(e.lngLat.lng, e.lngLat.lat);
        });
        m.on("click", "route-hit", (e) => report(e.lngLat.lng, e.lngLat.lat));
        m.on("mouseleave", "route-hit", () => {
          m.getCanvas().style.cursor = "";
          latest.current.onHover?.(null);
        });
        setMap(m);
      });
    });
    return () => {
      cancelled = true;
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];
      instance?.remove();
    };
  }, [token, styleUrl, colors.primary, colors.accent]);

  // The day's line and crossings; fit the view to the route.
  useEffect(() => {
    if (!map) return;
    (map.getSource("route") as GeoJSONSource | undefined)?.setData(lineData(line));
    (map.getSource("crossings") as GeoJSONSource | undefined)?.setData(crossingData(line, crossings ?? []));
    map.fitBounds(bounds(line.coordinates.map(([lon, lat]) => [lon, lat])), {
      padding: padding(container.current),
      maxZoom: 14.5,
      duration: fitted.current ? 700 : 0,
    });
    fitted.current = true;
  }, [map, line, crossings]);

  // Lettered places and numbered crossings.
  useEffect(() => {
    const mapboxgl = lib.current;
    if (!map || !mapboxgl) return;
    markers.current.forEach((marker) => marker.remove());
    const next: Marker[] = [];
    for (const stop of stops) {
      const el = pinElement(stop.letter, s[`pin_${stop.tone}`], `${stop.letter}: ${stop.name} (${stop.label})`);
      el.dataset.letter = stop.letter;
      next.push(new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat([stop.lon, stop.lat]).addTo(map));
    }
    for (const crossing of crossings ?? []) {
      const mid = nearestIndex(line.cum_mi, (crossing.from_mi + crossing.to_mi) / 2);
      const [lon, lat] = line.coordinates[mid];
      const el = pinElement(String(crossing.n), s.pin_accent, `Crossing ${crossing.n}`, s.pinCrossing);
      next.push(new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat([lon, lat]).addTo(map));
    }
    markers.current = next;
  }, [map, stops, crossings, line]);

  // The marker that follows the profile.
  useEffect(() => {
    if (!map) return;
    (map.getSource("hover") as GeoJSONSource | undefined)?.setData(hoverData(line, hoverMi));
  }, [map, line, hoverMi]);

  // "Show on map" for a place off the route: fit the route and the place.
  useEffect(() => {
    if (!map || !focusLetter) return;
    const stop = stops.find((st) => st.letter === focusLetter);
    if (!stop) return;
    const coords: [number, number][] = line.coordinates.map(([lon, lat]) => [lon, lat]);
    coords.push([stop.lon, stop.lat]);
    map.fitBounds(bounds(coords), { padding: padding(container.current), maxZoom: 14.5, duration: 700 });
    for (const marker of markers.current) {
      const el = marker.getElement();
      el.classList.toggle(s.pinFocus, el.dataset.letter === focusLetter);
    }
  }, [map, focusLetter, stops, line]);

  if (!token) {
    return (
      <div className={`${s.mapBox} ${s.mapMessage}`} role="note">
        The map needs a Mapbox token (NEXT_PUBLIC_MAPBOX_TOKEN). The figures below do not depend on it.
      </div>
    );
  }
  return (
    <div className={s.mapBox}>
      <div ref={container} className={`${s.mapCanvas} ${compact ? s.mapCompact : ""}`} role="region" aria-label={label} />
      {failed ? (
        <p className={s.mapMessage} role="note">
          The map could not load here. The figures below do not depend on it.
        </p>
      ) : null}
    </div>
  );
}
