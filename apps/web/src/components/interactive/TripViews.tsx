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

const tabs = ["Calendar", "Itinerary", "Route & Elevation", "Location Intelligence", "Transport", "Weather"] as const;
type Tab = (typeof tabs)[number];

/* ── (location data moved to LocationIntelView below) ── */

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
        {activeTab === "Location Intelligence" && <LocationIntelView />}
        {activeTab === "Transport" && <TransportView />}
        {activeTab === "Weather" && <WeatherView />}
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
    { value: "28.4 km", label: "Total distance" },
    { value: "186 m", label: "Max elevation" },
    { value: "5", label: "Stops" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Route map — Mapbox rendered */}
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "20px",
          border: "1px solid var(--border-color)",
        }}
      >
        <img
          src="/images/itoshima-route-map.png"
          alt="Itoshima cycling route — Chikuzen-Maebaru to Keya no Ohto loop"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
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
          {/* Elevation area — Itoshima coastal profile (max ~80m) */}
          <path
            d="M 0 100 L 37 95 L 74 82 L 111 62 L 148 30 L 185 48 L 222 78 L 259 88 L 296 72 L 333 52 L 370 38 L 407 58 L 444 80 L 481 92 L 518 98 L 555 88 L 592 78 L 629 88 L 666 92 L 700 100 L 700 120 L 0 120 Z"
            fill="rgba(13,53,88,0.08)"
          />
          {/* Elevation line */}
          <path
            d="M 0 100 L 37 95 L 74 82 L 111 62 L 148 30 L 185 48 L 222 78 L 259 88 L 296 72 L 333 52 L 370 38 L 407 58 L 444 80 L 481 92 L 518 98 L 555 88 L 592 78 L 629 88 L 666 92 L 700 100"
            fill="none"
            stroke="var(--brand-navy)"
            strokeWidth="2"
          />
          {/* Peak marker — Sakurai Futamigaura hills */}
          <circle cx="148" cy="30" r="4" fill="var(--brand-gold)" stroke="#fff" strokeWidth="2" />
          <text
            x="148"
            y="22"
            textAnchor="middle"
            fontSize="9"
            fill="var(--brand-navy)"
            fontWeight="600"
          >
            80m
          </text>
          {/* Labels — Itoshima stops */}
          <text x="0" y="118" fontSize="9" fill="var(--text-tertiary)">
            Station
          </text>
          <text x="148" y="118" fontSize="9" fill="var(--text-tertiary)" textAnchor="middle">
            Futamigaura
          </text>
          <text x="370" y="118" fontSize="9" fill="var(--text-tertiary)" textAnchor="middle">
            Keya no Ohto
          </text>
          <text x="555" y="118" fontSize="9" fill="var(--text-tertiary)" textAnchor="middle">
            Nogita
          </text>
          <text x="695" y="118" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">
            Station
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW 4 — LOCATION INTELLIGENCE
   All trip locations + hospitals with drive times
   ══════════════════════════════════════════════════ */

const locationIntelCards: {
  name: string;
  tag: "Activity" | "Accommodation" | "Hospital" | "Airport";
  day?: string;
  arp?: string;
  arpColor?: string;
  nearestHospital?: string;
  driveTime?: string;
  distance?: string;
}[] = [
  { name: "Shangri-La Tanjung Aru", tag: "Accommodation", day: "D1–D7", nearestHospital: "Queen Elizabeth Hospital", driveTime: "12 min", distance: "6.1 km" },
  { name: "BKI International Airport", tag: "Airport", day: "D1, D7", nearestHospital: "Queen Elizabeth Hospital", driveTime: "15 min", distance: "8.2 km" },
  { name: "Kinabalu National Park", tag: "Activity", day: "D2", arp: "18/35", arpColor: "#e6a817", nearestHospital: "Kinabalu District Hospital", driveTime: "45 min", distance: "38 km" },
  { name: "Poring Hot Springs", tag: "Activity", day: "D2", arp: "15/35", arpColor: "#e6a817", nearestHospital: "Kinabalu District Hospital", driveTime: "55 min", distance: "42 km" },
  { name: "Gaya Street Market", tag: "Activity", day: "D3", arp: "8/35", arpColor: "#1d9e75", nearestHospital: "Queen Elizabeth Hospital", driveTime: "8 min", distance: "3.2 km" },
  { name: "Kiulu River", tag: "Activity", day: "D4", arp: "25/35", arpColor: "#dc3545", nearestHospital: "Queen Elizabeth Hospital", driveTime: "62 min", distance: "42 km" },
  { name: "Weston Wetlands", tag: "Activity", day: "D5", arp: "20/35", arpColor: "#e6a817", nearestHospital: "Beaufort District Hospital", driveTime: "35 min", distance: "28 km" },
  { name: "Manukan Island", tag: "Activity", day: "D6", arp: "23/35", arpColor: "#dc3545", nearestHospital: "Queen Elizabeth Hospital", driveTime: "45 min (inc. ferry)", distance: "8 km" },
  { name: "Queen Elizabeth Hospital", tag: "Hospital", nearestHospital: "—", driveTime: "—", distance: "6.1 km from hotel" },
  { name: "Kinabalu District Hospital", tag: "Hospital", nearestHospital: "—", driveTime: "—", distance: "93 km from hotel" },
  { name: "Beaufort District Hospital", tag: "Hospital", nearestHospital: "—", driveTime: "—", distance: "91 km from hotel" },
];

function LocationIntelView() {
  const tagStyles: Record<string, { color: string; bg: string }> = {
    Activity: { color: "var(--brand-navy)", bg: "rgba(13,53,88,0.08)" },
    Accommodation: { color: "#1d9e75", bg: "rgba(29,158,117,0.08)" },
    Hospital: { color: "#dc3545", bg: "rgba(220,53,69,0.08)" },
    Airport: { color: "#3498db", bg: "rgba(52,152,219,0.08)" },
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Map */}
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "20px",
          border: "1px solid var(--border-color)",
        }}
      >
        <img
          src="/images/borneo-location-intel.png"
          alt="Borneo trip — all locations including hospitals and emergency facilities"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
        {[
          { label: "Activity", color: "#C9A24D" },
          { label: "Accommodation", color: "#0d3558" },
          { label: "Hospital", color: "#DC2626" },
          { label: "Airport", color: "#3498DB" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "var(--text-tertiary)" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
        {[
          { value: "14", label: "Locations" },
          { value: "3", label: "Hospitals mapped" },
          { value: "12 min", label: "Fastest TTDC" },
          { value: "62 min", label: "Longest TTDC" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--band-background)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--brand-navy)", letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Location cards with hospital info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {locationIntelCards.map((loc) => {
          const style = tagStyles[loc.tag] || tagStyles.Activity;
          return (
            <div
              key={loc.name}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "12px 14px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, fontSize: "12.5px", color: "var(--text-primary)" }}>{loc.name}</span>
                  <span style={{ fontSize: "10px", fontWeight: 600, color: style.color, background: style.bg, padding: "2px 7px", borderRadius: "8px" }}>{loc.tag}</span>
                  {loc.arp && (
                    <span style={{ fontSize: "10px", fontWeight: 600, color: loc.arpColor, background: `${loc.arpColor}15`, padding: "2px 7px", borderRadius: "8px" }}>
                      ARP {loc.arp}
                    </span>
                  )}
                  {loc.day && <span style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>{loc.day}</span>}
                </div>
                {loc.tag !== "Hospital" && loc.nearestHospital !== "—" && (
                  <div style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "flex", gap: "6px", alignItems: "center" }}>
                    <span style={{ color: "#dc3545", fontWeight: 600 }}>+</span>
                    <span>{loc.nearestHospital}</span>
                    <span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}>·</span>
                    <span style={{ fontWeight: 600, color: Number(loc.driveTime?.replace(/\D/g, "")) > 30 ? "#dc3545" : "#1d9e75" }}>
                      {loc.driveTime}
                    </span>
                    <span style={{ color: "var(--text-tertiary)" }}>{loc.distance}</span>
                  </div>
                )}
                {loc.tag === "Hospital" && (
                  <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                    Emergency department · {loc.distance}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW 5 — TRANSPORT ROUTES
   Daily transport segments with distances and times
   ══════════════════════════════════════════════════ */

const transportDays: {
  day: number;
  label: string;
  color: string;
  segments: { from: string; to: string; mode: string; distance: string; time: string }[];
}[] = [
  {
    day: 1, label: "Arrival", color: "#4a90c4",
    segments: [
      { from: "BKI Airport", to: "Shangri-La Tanjung Aru", mode: "Coach", distance: "8.2 km", time: "18 min" },
    ],
  },
  {
    day: 2, label: "Kinabalu NP", color: "#0d3558",
    segments: [
      { from: "Hotel", to: "Kinabalu NP", mode: "Coach", distance: "93 km", time: "2hr 3min" },
      { from: "Kinabalu NP", to: "Poring Hot Springs", mode: "Coach", distance: "36 km", time: "1hr" },
      { from: "Poring Hot Springs", to: "Hotel", mode: "Coach", distance: "124 km", time: "2hr 52min" },
    ],
  },
  {
    day: 3, label: "KK City", color: "#4c5968",
    segments: [
      { from: "Hotel", to: "Gaya Street", mode: "Walk", distance: "2.4 km", time: "30 min" },
      { from: "Gaya Street", to: "Hotel", mode: "Walk", distance: "2.4 km", time: "30 min" },
    ],
  },
  {
    day: 4, label: "Kiulu River", color: "#C9A24D",
    segments: [
      { from: "Hotel", to: "Kiulu River", mode: "Coach", distance: "42 km", time: "1hr 2min" },
      { from: "Kiulu River", to: "Hotel", mode: "Coach", distance: "41 km", time: "1hr 3min" },
    ],
  },
  {
    day: 5, label: "Weston", color: "#1d9e75",
    segments: [
      { from: "Hotel", to: "Weston Wetlands", mode: "Coach", distance: "91 km", time: "1hr 51min" },
      { from: "Weston Wetlands", to: "Hotel", mode: "Coach", distance: "88 km", time: "1hr 49min" },
    ],
  },
  {
    day: 6, label: "Manukan Island", color: "#1F4E79",
    segments: [
      { from: "Hotel", to: "Jesselton Point", mode: "Coach", distance: "4 km", time: "12 min" },
      { from: "Jesselton Point", to: "Manukan Island", mode: "Speedboat", distance: "6 km", time: "20 min" },
      { from: "Manukan Island", to: "Jesselton Point", mode: "Speedboat", distance: "6 km", time: "20 min" },
      { from: "Jesselton Point", to: "Hotel", mode: "Coach", distance: "4 km", time: "12 min" },
    ],
  },
  {
    day: 7, label: "Departure", color: "#4a90c4",
    segments: [
      { from: "Hotel", to: "BKI Airport", mode: "Coach", distance: "8.2 km", time: "18 min" },
    ],
  },
];

function TransportView() {
  const totalDistance = "558 km";
  const totalSegments = transportDays.reduce((sum, d) => sum + d.segments.length, 0);
  const longestDay = "D2 — 253 km";

  return (
    <div style={{ padding: "20px" }}>
      {/* Transport routes map */}
      <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "20px", border: "1px solid var(--border-color)" }}>
        <img
          src="/images/borneo-transport-routes.png"
          alt="Borneo trip transport routes — daily routes from Kota Kinabalu"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Route legend */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "16px" }}>
        {[
          { label: "Day 2 — Kinabalu NP", color: "#0d3558" },
          { label: "Day 4 — Kiulu River", color: "#C9A24D" },
          { label: "Day 5 — Weston", color: "#1d9e75" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "var(--text-tertiary)" }}>
            <span style={{ width: "16px", height: "3px", borderRadius: "2px", background: item.color, flexShrink: 0 }} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "24px" }}>
        {[
          { value: totalDistance, label: "Total distance" },
          { value: String(totalSegments), label: "Segments" },
          { value: longestDay, label: "Longest day" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--band-background)", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--brand-navy)", letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Daily segment table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr>
              {["Day", "From", "To", "Mode", "Distance", "Time"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: 600,
                    color: "var(--brand-navy)",
                    borderBottom: "2px solid var(--border-color)",
                    fontSize: "11px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transportDays.map((day) => (
              <>
                {/* Day header row */}
                <tr key={`dh-${day.day}`}>
                  <td
                    colSpan={6}
                    style={{
                      background: day.color,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "12px",
                      padding: "7px 8px",
                    }}
                  >
                    Day {day.day} — {day.label}
                  </td>
                </tr>
                {day.segments.map((seg, i) => (
                  <tr key={`${day.day}-${i}`}>
                    <td style={{ padding: "6px 8px", borderBottom: "0.5px solid var(--border-color)", color: "var(--text-tertiary)", fontSize: "11px" }}>
                      D{day.day}
                    </td>
                    <td style={{ padding: "6px 8px", borderBottom: "0.5px solid var(--border-color)" }}>{seg.from}</td>
                    <td style={{ padding: "6px 8px", borderBottom: "0.5px solid var(--border-color)" }}>{seg.to}</td>
                    <td style={{ padding: "6px 8px", borderBottom: "0.5px solid var(--border-color)" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 7px",
                          borderRadius: "4px",
                          background: seg.mode === "Coach" ? "rgba(13,53,88,0.08)" : seg.mode === "Speedboat" ? "rgba(52,152,219,0.08)" : "rgba(76,89,104,0.08)",
                          color: seg.mode === "Coach" ? "var(--brand-navy)" : seg.mode === "Speedboat" ? "#3498db" : "#4c5968",
                        }}
                      >
                        {seg.mode}
                      </span>
                    </td>
                    <td style={{ padding: "6px 8px", borderBottom: "0.5px solid var(--border-color)", fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{seg.distance}</td>
                    <td style={{ padding: "6px 8px", borderBottom: "0.5px solid var(--border-color)", fontVariantNumeric: "tabular-nums" }}>{seg.time}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   VIEW 6 — WEATHER INTELLIGENCE
   15-year climate analysis for trip destination
   ══════════════════════════════════════════════════ */

const weatherData = {
  destination: "Kota Kinabalu, Sabah",
  period: "14–20 March",
  yearsAnalyzed: 15,
  summary: "Tropical maritime climate with consistent heat and humidity. March is in the dry(er) inter-monsoon period — expect afternoon showers on 4–5 of 7 days, typically clearing by evening. UV index very high year-round.",
  daily: [
    { day: "D1", date: "14 Mar", high: 32, low: 24, rain: 45, condition: "Partly cloudy", uvIndex: 11, humidity: 78 },
    { day: "D2", date: "15 Mar", high: 31, low: 24, rain: 55, condition: "PM showers", uvIndex: 10, humidity: 82 },
    { day: "D3", date: "16 Mar", high: 33, low: 25, rain: 30, condition: "Mostly sunny", uvIndex: 12, humidity: 74 },
    { day: "D4", date: "17 Mar", high: 32, low: 24, rain: 60, condition: "Thunderstorms", uvIndex: 9, humidity: 85 },
    { day: "D5", date: "18 Mar", high: 31, low: 24, rain: 50, condition: "PM showers", uvIndex: 10, humidity: 80 },
    { day: "D6", date: "19 Mar", high: 32, low: 25, rain: 40, condition: "Partly cloudy", uvIndex: 11, humidity: 76 },
    { day: "D7", date: "20 Mar", high: 31, low: 24, rain: 35, condition: "Mostly sunny", uvIndex: 11, humidity: 75 },
  ],
  concerns: [
    { label: "Heat stress", severity: "high", detail: "Sustained 31–33°C with high humidity. Mandatory hydration breaks during outdoor activities." },
    { label: "UV exposure", severity: "high", detail: "UV index 9–12 (very high). Sunscreen, hats, and shade breaks essential for all outdoor activities." },
    { label: "Afternoon storms", severity: "moderate", detail: "60% chance of PM thunderstorms on D4 (rafting day). Lightning protocol required for water activities." },
    { label: "Flash flooding", severity: "low", detail: "River levels can rise rapidly after heavy rain. Kiulu River operator monitors conditions in real-time." },
  ],
  climate: {
    avgHigh: 32,
    avgLow: 24,
    avgRainDays: 12,
    avgHumidity: 79,
    sunrise: "06:12",
    sunset: "18:18",
    daylightHours: "12h 06m",
  },
};

function WeatherView() {
  const severityColors: Record<string, { color: string; bg: string }> = {
    high: { color: "#dc3545", bg: "rgba(220,53,69,0.08)" },
    moderate: { color: "#e6a817", bg: "rgba(230,168,23,0.08)" },
    low: { color: "#1d9e75", bg: "rgba(29,158,117,0.08)" },
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--brand-gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
          15-Year Climate Analysis
        </div>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--brand-navy)", marginBottom: "4px" }}>
          {weatherData.destination} · {weatherData.period}
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-tertiary)", lineHeight: 1.5 }}>
          {weatherData.summary}
        </div>
      </div>

      {/* Climate overview stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "24px" }}>
        {[
          { value: `${weatherData.climate.avgHigh}°C`, label: "Avg. high" },
          { value: `${weatherData.climate.avgLow}°C`, label: "Avg. low" },
          { value: `${weatherData.climate.avgRainDays}`, label: "Rain days/mo" },
          { value: weatherData.climate.daylightHours, label: "Daylight" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--band-background)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--brand-navy)" }}>{s.value}</div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Temperature chart (SVG bar chart) */}
      <div style={{ background: "var(--band-background)", borderRadius: "8px", padding: "16px 20px", marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--brand-navy)", marginBottom: "12px" }}>
          Daily temperature & precipitation probability
        </div>
        <svg width="100%" height="180" viewBox="0 0 700 180" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 45, 90, 135].map((y) => (
            <line key={y} x1="40" y1={y + 10} x2="680" y2={y + 10} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          ))}
          {/* Y axis labels */}
          <text x="36" y="14" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">35°C</text>
          <text x="36" y="59" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">30°C</text>
          <text x="36" y="104" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">25°C</text>
          <text x="36" y="149" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">20°C</text>

          {weatherData.daily.map((d, i) => {
            const x = 60 + i * 90;
            const barWidth = 32;
            // Scale: 20°C = y:145, 35°C = y:10
            const scale = (temp: number) => 145 - ((temp - 20) / 15) * 135;
            const highY = scale(d.high);
            const lowY = scale(d.low);

            return (
              <g key={d.day}>
                {/* Temperature range bar */}
                <rect x={x - barWidth / 2} y={highY} width={barWidth} height={lowY - highY} rx="4" fill="rgba(13,53,88,0.15)" />
                {/* High dot */}
                <circle cx={x} cy={highY} r="4" fill="var(--brand-navy)" />
                <text x={x} y={highY - 7} fontSize="10" fontWeight="600" fill="var(--brand-navy)" textAnchor="middle">{d.high}°</text>
                {/* Low dot */}
                <circle cx={x} cy={lowY} r="3" fill="var(--brand-gold)" />
                <text x={x} y={lowY + 14} fontSize="9" fill="var(--brand-gold)" textAnchor="middle">{d.low}°</text>
                {/* Rain probability pill */}
                <rect x={x - 16} y={156} width={32} height={16} rx="8" fill={d.rain > 50 ? "rgba(52,152,219,0.15)" : "rgba(52,152,219,0.08)"} />
                <text x={x} y={168} fontSize="9" fontWeight="600" fill="#3498db" textAnchor="middle">{d.rain}%</text>
                {/* Day label */}
                <text x={x} y={155} fontSize="9" fill="var(--text-tertiary)" textAnchor="middle">{d.day}</text>
              </g>
            );
          })}

          {/* Legend */}
          <circle cx="540" cy="10" r="4" fill="var(--brand-navy)" />
          <text x="548" y="14" fontSize="9" fill="var(--text-tertiary)">High</text>
          <circle cx="590" cy="10" r="3" fill="var(--brand-gold)" />
          <text x="598" y="14" fontSize="9" fill="var(--text-tertiary)">Low</text>
          <rect x="630" y="5" width="12" height="10" rx="3" fill="rgba(52,152,219,0.15)" />
          <text x="646" y="14" fontSize="9" fill="var(--text-tertiary)">Rain %</text>
        </svg>
      </div>

      {/* Daily conditions table */}
      <div style={{ overflowX: "auto", marginBottom: "24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr>
              {["Day", "Conditions", "High", "Low", "Rain %", "UV Index", "Humidity"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px", fontWeight: 600, color: "var(--brand-navy)", borderBottom: "2px solid var(--border-color)", fontSize: "11px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weatherData.daily.map((d) => (
              <tr key={d.day}>
                <td style={{ padding: "7px 8px", borderBottom: "0.5px solid var(--border-color)", fontWeight: 600, color: "var(--brand-navy)", fontSize: "11px" }}>{d.day}</td>
                <td style={{ padding: "7px 8px", borderBottom: "0.5px solid var(--border-color)" }}>{d.condition}</td>
                <td style={{ padding: "7px 8px", borderBottom: "0.5px solid var(--border-color)", fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{d.high}°C</td>
                <td style={{ padding: "7px 8px", borderBottom: "0.5px solid var(--border-color)", fontVariantNumeric: "tabular-nums" }}>{d.low}°C</td>
                <td style={{ padding: "7px 8px", borderBottom: "0.5px solid var(--border-color)", fontVariantNumeric: "tabular-nums" }}>
                  <span style={{ fontWeight: d.rain > 50 ? 600 : 400, color: d.rain > 50 ? "#3498db" : "inherit" }}>{d.rain}%</span>
                </td>
                <td style={{ padding: "7px 8px", borderBottom: "0.5px solid var(--border-color)" }}>
                  <span style={{ fontWeight: 600, color: d.uvIndex >= 11 ? "#dc3545" : d.uvIndex >= 8 ? "#e6a817" : "#1d9e75" }}>{d.uvIndex}</span>
                  <span style={{ fontSize: "10px", color: "var(--text-tertiary)", marginLeft: "4px" }}>
                    {d.uvIndex >= 11 ? "Extreme" : d.uvIndex >= 8 ? "Very high" : "High"}
                  </span>
                </td>
                <td style={{ padding: "7px 8px", borderBottom: "0.5px solid var(--border-color)", fontVariantNumeric: "tabular-nums" }}>{d.humidity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weather concerns */}
      <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--brand-navy)", marginBottom: "10px" }}>
        Operational weather concerns
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {weatherData.concerns.map((c) => {
          const sev = severityColors[c.severity] || severityColors.moderate;
          return (
            <div
              key={c.label}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "12px 14px",
                borderLeft: `3px solid ${sev.color}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontWeight: 600, fontSize: "12.5px", color: "var(--text-primary)" }}>{c.label}</span>
                <span style={{ fontSize: "10px", fontWeight: 600, color: sev.color, background: sev.bg, padding: "2px 7px", borderRadius: "8px", textTransform: "capitalize" }}>{c.severity}</span>
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--text-tertiary)", lineHeight: 1.5 }}>{c.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
