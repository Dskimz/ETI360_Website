"use client";

import { useState } from "react";

/* ══════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════ */

const COLORS: Record<string, string> = {
  activity: "#1F4E79",
  meals: "#C9A24D",
  air: "#4a90c4",
  land: "#6b7f99",
  accom: "#9fb9d4",
  logistics: "#4c5968",
  free: "#d0d3d6",
};

const CATEGORY_LABELS: Record<string, string> = {
  activity: "Activity",
  meals: "Meals",
  air: "Air",
  land: "Land",
  accom: "Accommodation",
  logistics: "Logistics",
  free: "Free Time",
};

interface ActivityBlock {
  start: string; // "HH:MM"
  end: string;
  name: string;
  cat: string;
  location?: string;
  arp?: string;
  arpColor?: string;
}

const allDays: { label: string; date: string; activities: ActivityBlock[] }[] = [
  {
    label: "Day 1",
    date: "Mon 14 Jul",
    activities: [
      { start: "14:30", end: "15:15", name: "Arrive KK Airport", cat: "air", location: "Kota Kinabalu Intl (BKI)" },
      { start: "15:15", end: "16:00", name: "Coach to hotel", cat: "land", location: "BKI \u2192 Shangri-La" },
      { start: "16:00", end: "17:30", name: "Check-in & orientation", cat: "accom", location: "Shangri-La Tanjung Aru" },
      { start: "17:30", end: "19:00", name: "Free time", cat: "free", location: "Hotel grounds" },
      { start: "19:00", end: "20:30", name: "Welcome dinner", cat: "meals", location: "Shang Palace" },
      { start: "20:30", end: "22:00", name: "Evening / overnight", cat: "accom", location: "Shangri-La" },
    ],
  },
  {
    label: "Day 2",
    date: "Tue 15 Jul",
    activities: [
      { start: "07:00", end: "07:45", name: "Breakfast", cat: "meals", location: "Shangri-La Caf\u00e9" },
      { start: "07:45", end: "09:30", name: "Coach to Kinabalu NP", cat: "land", location: "Route: 83km, 1hr 45min" },
      { start: "09:30", end: "12:30", name: "Guided rainforest walk", cat: "activity", location: "Silau Silau Trail", arp: "18/35", arpColor: "#e6a817" },
      { start: "12:30", end: "13:30", name: "Lunch", cat: "meals", location: "Liwagu Restaurant" },
      { start: "13:30", end: "15:00", name: "Canopy walkway", cat: "activity", location: "Poring Hot Springs", arp: "15/35", arpColor: "#e6a817" },
      { start: "15:00", end: "16:45", name: "Coach return", cat: "land", location: "Route: 83km, 1hr 45min" },
      { start: "16:45", end: "19:00", name: "Free time / recovery", cat: "free", location: "Hotel" },
      { start: "19:00", end: "20:30", name: "Dinner", cat: "meals", location: "Oceano Restaurant" },
      { start: "20:30", end: "22:00", name: "Evening / overnight", cat: "accom", location: "Shangri-La" },
    ],
  },
  {
    label: "Day 3",
    date: "Wed 16 Jul",
    activities: [
      { start: "07:00", end: "07:45", name: "Breakfast", cat: "meals", location: "Shangri-La Caf\u00e9" },
      { start: "07:45", end: "09:00", name: "Coach to Weston", cat: "land", location: "Route: 112km" },
      { start: "09:00", end: "12:00", name: "Wetlands exploration", cat: "activity", location: "Weston Wetlands" },
      { start: "12:00", end: "13:00", name: "Lunch", cat: "meals", location: "Weston village" },
      { start: "13:00", end: "14:30", name: "Coach return", cat: "land", location: "Route: 112km" },
      { start: "14:30", end: "19:00", name: "Free time / beach", cat: "free", location: "Tanjung Aru Beach" },
      { start: "19:00", end: "20:30", name: "Dinner", cat: "meals", location: "Hotel" },
      { start: "20:30", end: "22:00", name: "Evening / overnight", cat: "accom", location: "Shangri-La" },
    ],
  },
  {
    label: "Day 4",
    date: "Thu 17 Jul",
    activities: [
      { start: "06:00", end: "06:45", name: "Breakfast", cat: "meals", location: "Shangri-La Caf\u00e9" },
      { start: "06:45", end: "08:30", name: "Coach to Kiulu River", cat: "land", location: "Route: 72km" },
      { start: "08:30", end: "09:00", name: "Safety briefing", cat: "logistics", location: "Kiulu base camp" },
      { start: "09:00", end: "12:30", name: "White-water rafting Gr. III", cat: "activity", location: "Kiulu River", arp: "25/35", arpColor: "#dc3545" },
      { start: "12:30", end: "13:30", name: "Riverside lunch", cat: "meals", location: "Kiulu riverside" },
      { start: "13:30", end: "15:15", name: "Coach return", cat: "land", location: "Route: 72km" },
      { start: "15:15", end: "19:00", name: "Free time / recovery", cat: "free", location: "Hotel" },
      { start: "19:00", end: "20:30", name: "Dinner", cat: "meals", location: "Salut Seafood" },
      { start: "20:30", end: "22:00", name: "Evening / overnight", cat: "accom", location: "Shangri-La" },
    ],
  },
  {
    label: "Day 5",
    date: "Fri 18 Jul",
    activities: [
      { start: "07:00", end: "07:45", name: "Breakfast", cat: "meals", location: "Shangri-La Caf\u00e9" },
      { start: "07:45", end: "08:30", name: "Transfer to Jesselton Point", cat: "land", location: "Route: 4km" },
      { start: "08:30", end: "09:15", name: "Boat to Manukan Island", cat: "air", location: "TARP ferry" },
      { start: "09:15", end: "12:30", name: "Snorkeling & beach", cat: "activity", location: "Manukan Island" },
      { start: "12:30", end: "13:30", name: "Island lunch", cat: "meals", location: "Manukan caf\u00e9" },
      { start: "13:30", end: "14:15", name: "Boat return", cat: "air", location: "TARP ferry" },
      { start: "14:15", end: "15:00", name: "Transfer to hotel", cat: "land", location: "Route: 4km" },
      { start: "15:00", end: "19:00", name: "Free time", cat: "free", location: "Hotel" },
      { start: "19:00", end: "20:30", name: "Dinner", cat: "meals", location: "Hotel" },
      { start: "20:30", end: "22:00", name: "Evening / overnight", cat: "accom", location: "Shangri-La" },
    ],
  },
  {
    label: "Day 6",
    date: "Sat 19 Jul",
    activities: [
      { start: "07:00", end: "07:45", name: "Breakfast", cat: "meals", location: "Shangri-La Caf\u00e9" },
      { start: "08:00", end: "12:00", name: "Community project visit", cat: "activity", location: "KK community center" },
      { start: "12:00", end: "13:00", name: "Lunch", cat: "meals", location: "Local restaurant" },
      { start: "13:00", end: "17:00", name: "Cultural walk & market", cat: "activity", location: "Gaya Street" },
      { start: "17:00", end: "19:00", name: "Free time / packing", cat: "free", location: "Hotel" },
      { start: "19:00", end: "21:00", name: "Farewell dinner", cat: "meals", location: "Le M\u00e9ridien" },
      { start: "21:00", end: "22:00", name: "Evening / overnight", cat: "accom", location: "Shangri-La" },
    ],
  },
  {
    label: "Day 7",
    date: "Sun 20 Jul",
    activities: [
      { start: "06:00", end: "07:00", name: "Breakfast & checkout", cat: "meals", location: "Shangri-La Caf\u00e9" },
      { start: "07:00", end: "07:45", name: "Coach to airport", cat: "land", location: "Route: 8.2km" },
      { start: "07:45", end: "09:00", name: "Airport check-in", cat: "logistics", location: "BKI Terminal 1" },
      { start: "09:00", end: "14:30", name: "Flight to London", cat: "air", location: "BKI \u2192 LHR (via KUL)" },
    ],
  },
];

const stats = [
  { value: "7", label: "Days" },
  { value: "28", label: "Students" },
  { value: "42", label: "Activities" },
  { value: "14", label: "Locations" },
  { value: "3", label: "RAMS req." },
  { value: "100%", label: "Coverage" },
];

const tabs = ["Calendar", "Itinerary", "Route & Elevation", "Location Map"] as const;
type Tab = (typeof tabs)[number];

/* ── Location map pins ── */
interface MapPin {
  label: string;
  type: "activity" | "accommodation" | "hospital";
  x: number; // % from left
  y: number; // % from top
  detail?: string;
}

const mapPins: MapPin[] = [
  { label: "Kinabalu NP", type: "activity", x: 62, y: 18, detail: "Silau Silau Trail, Canopy walkway" },
  { label: "Kiulu River", type: "activity", x: 52, y: 30, detail: "White-water rafting Gr. III" },
  { label: "Weston Wetlands", type: "activity", x: 25, y: 72, detail: "Wetlands exploration" },
  { label: "Manukan Island", type: "activity", x: 22, y: 45, detail: "Snorkeling & beach" },
  { label: "Shangri-La Tanjung Aru", type: "accommodation", x: 38, y: 48, detail: "6 nights" },
  { label: "Queen Elizabeth Hospital", type: "hospital", x: 44, y: 42, detail: "6.1km from hotel" },
  { label: "Kinabalu NP Clinic", type: "hospital", x: 68, y: 24, detail: "On-site medical" },
];

const locationCards = [
  { name: "Kinabalu National Park", tag: "Activity", dist: "83km from hotel", time: "1hr 45min" },
  { name: "Kiulu River", tag: "Activity", dist: "72km from hotel", time: "1hr 30min" },
  { name: "Weston Wetlands", tag: "Activity", dist: "112km from hotel", time: "2hr" },
  { name: "Manukan Island", tag: "Activity", dist: "4km + ferry", time: "45min total" },
  { name: "Shangri-La Tanjung Aru", tag: "Accommodation", dist: "8.2km from BKI", time: "18min" },
  { name: "Queen Elizabeth Hospital", tag: "Hospital", dist: "6.1km from hotel", time: "12min" },
];

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════ */

export function TripViews() {
  const [activeTab, setActiveTab] = useState<Tab>("Calendar");

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {/* ── Stats bar ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "24px",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              flex: "1 1 0",
              minWidth: "90px",
              background: "var(--band-background)",
              borderRadius: "8px",
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--brand-navy)",
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "11.5px",
                color: "var(--text-tertiary)",
                marginTop: "2px",
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tab bar ── */}
      <div
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "2px solid var(--border-color)",
          marginBottom: "24px",
          overflowX: "auto",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13.5px",
              fontWeight: activeTab === tab ? 600 : 400,
              color:
                activeTab === tab
                  ? "var(--brand-navy)"
                  : "var(--text-tertiary)",
              borderBottom:
                activeTab === tab
                  ? "2px solid var(--brand-gold)"
                  : "2px solid transparent",
              marginBottom: "-2px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {activeTab === "Calendar" && <CalendarView />}
        {activeTab === "Itinerary" && <ItineraryView />}
        {activeTab === "Route & Elevation" && <RouteView />}
        {activeTab === "Location Map" && <LocationMapView />}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW 1 — CALENDAR (Gantt)
   ══════════════════════════════════════════════════ */

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

const AXIS_START = timeToMinutes("06:00"); // 360
const AXIS_END = timeToMinutes("22:00"); // 1320
const AXIS_SPAN = AXIS_END - AXIS_START; // 960

function CalendarView() {
  const hours = [6, 8, 10, 12, 14, 16, 18, 20, 22];

  return (
    <div style={{ padding: "20px" }}>
      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11.5px",
              color: "var(--text-tertiary)",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                background: COLORS[key],
                flexShrink: 0,
              }}
            />
            {label}
          </div>
        ))}
      </div>

      {/* Time axis header */}
      <div style={{ position: "relative", height: "22px", marginBottom: "4px", marginLeft: "110px" }}>
        {hours.map((h) => {
          const pct = ((h * 60 - AXIS_START) / AXIS_SPAN) * 100;
          return (
            <span
              key={h}
              style={{
                position: "absolute",
                left: `${pct}%`,
                transform: "translateX(-50%)",
                fontSize: "10px",
                color: "var(--text-tertiary)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(h).padStart(2, "0")}:00
            </span>
          );
        })}
      </div>

      {/* Days */}
      {allDays.map((day) => (
        <div key={day.label} style={{ marginBottom: "8px" }}>
          {/* Day header */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              minHeight: "38px",
            }}
          >
            {/* Label column */}
            <div
              style={{
                width: "110px",
                flexShrink: 0,
                background: "var(--brand-navy)",
                borderRadius: "6px 0 0 6px",
                padding: "6px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {day.label}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "10.5px",
                  lineHeight: 1.2,
                }}
              >
                {day.date}
              </div>
            </div>

            {/* Gantt area */}
            <div
              style={{
                flex: 1,
                position: "relative",
                background: "var(--band-background)",
                borderRadius: "0 6px 6px 0",
                minHeight: "38px",
              }}
            >
              {/* Grid lines */}
              {hours.map((h) => {
                const pct = ((h * 60 - AXIS_START) / AXIS_SPAN) * 100;
                return (
                  <div
                    key={h}
                    style={{
                      position: "absolute",
                      left: `${pct}%`,
                      top: 0,
                      bottom: 0,
                      width: "1px",
                      background: "rgba(0,0,0,0.06)",
                    }}
                  />
                );
              })}

              {/* Activity blocks */}
              {day.activities.map((a, i) => {
                const startMin = timeToMinutes(a.start);
                const endMin = timeToMinutes(a.end);
                const leftPct = Math.max(
                  0,
                  ((startMin - AXIS_START) / AXIS_SPAN) * 100
                );
                const widthPct = Math.max(
                  2,
                  ((endMin - startMin) / AXIS_SPAN) * 100
                );
                const isLight = a.cat === "free" || a.cat === "accom";
                return (
                  <div
                    key={i}
                    title={`${a.start}\u2013${a.end} ${a.name}`}
                    style={{
                      position: "absolute",
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      top: "4px",
                      bottom: "4px",
                      background: COLORS[a.cat],
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 6px",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: isLight ? "var(--text-primary)" : "#fff",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {a.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW 2 — ITINERARY TABLE
   ══════════════════════════════════════════════════ */

function ItineraryView() {
  return (
    <div style={{ padding: "20px", overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12.5px",
          lineHeight: "1.5",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
            {["Time", "Activity", "Category", "Location", "ARP"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "8px 10px",
                  fontWeight: 600,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-tertiary)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allDays.slice(0, 4).map((day) => (
            <>
              <tr key={`hdr-${day.label}`}>
                <td
                  colSpan={5}
                  style={{
                    padding: "12px 10px 8px",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "var(--brand-navy)",
                    borderBottom: "1px solid var(--border-color)",
                    background: "rgba(13,53,88,0.03)",
                  }}
                >
                  {day.label} \u2014 {day.date}
                </td>
              </tr>
              {day.activities.map((a, i) => (
                <tr
                  key={`${day.label}-${i}`}
                  style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <td
                    style={{
                      padding: "8px 10px",
                      fontVariantNumeric: "tabular-nums",
                      whiteSpace: "nowrap",
                      fontWeight: 500,
                      fontSize: "12px",
                    }}
                  >
                    {a.start}\u2013{a.end}
                  </td>
                  <td style={{ padding: "8px 10px", fontWeight: 500 }}>
                    {a.name}
                  </td>
                  <td style={{ padding: "8px 10px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: COLORS[a.cat],
                        color: a.cat === "free" || a.cat === "accom" ? "var(--text-primary)" : "#fff",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "10px",
                      }}
                    >
                      {CATEGORY_LABELS[a.cat]}
                    </span>
                  </td>
                  <td style={{ padding: "8px 10px", color: "var(--text-primary)" }}>
                    {a.location}
                  </td>
                  <td style={{ padding: "8px 10px" }}>
                    {a.arp && (
                      <span
                        style={{
                          display: "inline-block",
                          background: a.arpColor === "#dc3545"
                            ? "rgba(220,53,69,0.1)"
                            : "rgba(230,168,23,0.12)",
                          color: a.arpColor,
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: "10px",
                        }}
                      >
                        {a.arp}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW 3 — ROUTE & ELEVATION
   ══════════════════════════════════════════════════ */

function RouteView() {
  const routeStats = [
    { value: "412 km", label: "Total distance" },
    { value: "1,520 m", label: "Max elevation" },
    { value: "14", label: "Activity locations" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Map placeholder */}
      <div
        style={{
          background: "linear-gradient(145deg, #e8ecf0 0%, #d0d8e0 50%, #c5cdd6 100%)",
          borderRadius: "8px",
          height: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        {/* Decorative route SVG */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 280"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path
            d="M 50 200 C 100 180, 140 120, 200 140 S 280 200, 340 160 S 420 80, 480 120 S 540 160, 570 140"
            fill="none"
            stroke="var(--brand-navy)"
            strokeWidth="3"
            strokeDasharray="8,4"
            opacity="0.35"
          />
          {/* Waypoint dots */}
          {[
            [50, 200],
            [200, 140],
            [340, 160],
            [480, 120],
            [570, 140],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="5"
              fill="var(--brand-gold)"
              stroke="#fff"
              strokeWidth="2"
            />
          ))}
        </svg>
        <div
          style={{
            position: "relative",
            textAlign: "center",
            color: "var(--text-tertiary)",
            fontSize: "13px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px", color: "var(--brand-navy)" }}>
            Route map placeholder
          </div>
          <div>Mapbox integration pending</div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        {routeStats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--band-background)",
              borderRadius: "8px",
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--brand-navy)",
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "11.5px",
                color: "var(--text-tertiary)",
                marginTop: "2px",
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Elevation profile */}
      <div
        style={{
          background: "var(--band-background)",
          borderRadius: "8px",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--brand-navy)",
            marginBottom: "12px",
          }}
        >
          Elevation profile
        </div>
        <svg
          width="100%"
          height="120"
          viewBox="0 0 700 120"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 30, 60, 90].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="700"
              y2={y}
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
            />
          ))}
          {/* Elevation area */}
          <path
            d="M 0 110 L 40 108 L 100 95 L 180 60 L 250 30 L 300 15 L 340 35 L 400 70 L 440 85 L 500 75 L 540 55 L 580 70 L 640 90 L 700 105 L 700 120 L 0 120 Z"
            fill="rgba(13,53,88,0.08)"
          />
          {/* Elevation line */}
          <path
            d="M 0 110 L 40 108 L 100 95 L 180 60 L 250 30 L 300 15 L 340 35 L 400 70 L 440 85 L 500 75 L 540 55 L 580 70 L 640 90 L 700 105"
            fill="none"
            stroke="var(--brand-navy)"
            strokeWidth="2"
          />
          {/* Peak marker */}
          <circle cx="300" cy="15" r="4" fill="var(--brand-gold)" stroke="#fff" strokeWidth="2" />
          <text
            x="300"
            y="8"
            textAnchor="middle"
            fontSize="9"
            fill="var(--brand-navy)"
            fontWeight="600"
          >
            1,520m
          </text>
          {/* Labels */}
          <text x="0" y="118" fontSize="9" fill="var(--text-tertiary)">
            KK
          </text>
          <text x="250" y="118" fontSize="9" fill="var(--text-tertiary)" textAnchor="middle">
            Kinabalu NP
          </text>
          <text x="500" y="118" fontSize="9" fill="var(--text-tertiary)" textAnchor="middle">
            Kiulu
          </text>
          <text x="695" y="118" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">
            KK
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW 4 — LOCATION MAP
   ══════════════════════════════════════════════════ */

function LocationMapView() {
  const pinColors: Record<string, string> = {
    activity: "var(--brand-navy)",
    accommodation: "#1d9e75",
    hospital: "#dc3545",
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Map area */}
      <div
        style={{
          background: "linear-gradient(155deg, #dde4ec 0%, #c8d4e0 40%, #bbc9d7 100%)",
          borderRadius: "8px",
          height: "340px",
          position: "relative",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        {/* Coastline hint */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 340"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path
            d="M 0 180 C 60 170, 100 200, 160 190 S 240 150, 300 170 S 380 210, 440 190 S 520 160, 600 180"
            fill="none"
            stroke="rgba(13,53,88,0.12)"
            strokeWidth="2"
          />
          {/* South China Sea label */}
          <text x="80" y="260" fontSize="11" fill="rgba(13,53,88,0.2)" fontStyle="italic">
            South China Sea
          </text>
        </svg>

        {/* Pins */}
        {mapPins.map((pin) => (
          <div
            key={pin.label}
            title={`${pin.label}: ${pin.detail}`}
            style={{
              position: "absolute",
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "default",
            }}
          >
            {/* Label */}
            <div
              style={{
                background: "#fff",
                border: `1px solid ${pinColors[pin.type]}`,
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "10px",
                fontWeight: 600,
                color: pinColors[pin.type],
                whiteSpace: "nowrap",
                marginBottom: "2px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {pin.label}
            </div>
            {/* Pin dot */}
            <svg width="12" height="16" viewBox="0 0 12 16">
              <path
                d="M6 0C2.7 0 0 2.7 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6z"
                fill={pinColors[pin.type]}
              />
              <circle cx="6" cy="6" r="2.5" fill="#fff" />
            </svg>
          </div>
        ))}

        {/* Legend */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "6px",
            padding: "8px 12px",
            display: "flex",
            gap: "12px",
            fontSize: "10.5px",
          }}
        >
          {(
            [
              ["Activity", "var(--brand-navy)"],
              ["Accommodation", "#1d9e75"],
              ["Hospital", "#dc3545"],
            ] as const
          ).map(([label, color]) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: color,
                }}
              />
              <span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Location cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "10px",
        }}
      >
        {locationCards.map((loc) => {
          const tagColor =
            loc.tag === "Activity"
              ? "var(--brand-navy)"
              : loc.tag === "Accommodation"
                ? "#1d9e75"
                : "#dc3545";
          return (
            <div
              key={loc.name}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "12.5px",
                    color: "var(--text-primary)",
                  }}
                >
                  {loc.name}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: tagColor,
                    background:
                      loc.tag === "Activity"
                        ? "rgba(13,53,88,0.08)"
                        : loc.tag === "Accommodation"
                          ? "rgba(29,158,117,0.08)"
                          : "rgba(220,53,69,0.08)",
                    padding: "2px 7px",
                    borderRadius: "8px",
                  }}
                >
                  {loc.tag}
                </span>
              </div>
              <div
                style={{
                  fontSize: "11.5px",
                  color: "var(--text-tertiary)",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <span>{loc.dist}</span>
                <span style={{ fontWeight: 500 }}>{loc.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
