"use client";

import { useState } from "react";

/* ── Issue badges for the Before panel ── */
const issues = [
  { icon: "❌", text: "No timestamps — impossible to verify schedule coverage" },
  { icon: "❌", text: "Transport legs missing between locations" },
  { icon: "⚠", text: '"Afternoon free time" — 3+ hours unaccounted' },
  { icon: "⚠", text: "Meal locations unspecified" },
  { icon: "⚠", text: "No activity provider names or certifications" },
  { icon: "❌", text: "No emergency hospital identified for any location" },
];

/* ── After table data ── */
interface LedgerRow {
  time: string;
  activity: string;
  category: string;
  categoryColor: string;
  location: string;
  annotation?: string;
}

const day1Rows: LedgerRow[] = [
  {
    time: "14:30\u201315:15",
    activity: "Arrive KK International Airport",
    category: "Transport",
    categoryColor: "#0d3558",
    location: "Kota Kinabalu Intl (BKI)",
    annotation: "Place ID resolved",
  },
  {
    time: "15:15\u201316:00",
    activity: "Coach transfer to hotel",
    category: "Transport",
    categoryColor: "#0d3558",
    location: "BKI \u2192 Shangri-La",
    annotation: "Route: 8.2km, 18min",
  },
  {
    time: "16:00\u201317:30",
    activity: "Check-in and orientation",
    category: "Accommodation",
    categoryColor: "#1d9e75",
    location: "Shangri-La Tanjung Aru",
    annotation: "Hospital: 6.1km, 12min",
  },
  {
    time: "17:30\u201319:00",
    activity: "Free time \u2014 hotel grounds",
    category: "Activity",
    categoryColor: "#534ab7",
    location: "Hotel grounds (supervised)",
  },
  {
    time: "19:00\u201320:30",
    activity: "Welcome dinner",
    category: "Meal",
    categoryColor: "#C9A24D",
    location: "Shang Palace",
    annotation: "Dietary req. confirmed",
  },
];

const day2Rows: LedgerRow[] = [
  {
    time: "07:00\u201307:45",
    activity: "Breakfast",
    category: "Meal",
    categoryColor: "#C9A24D",
    location: "Shangri-La Caf\u00e9",
  },
  {
    time: "07:45\u201309:30",
    activity: "Coach to Kinabalu NP",
    category: "Transport",
    categoryColor: "#0d3558",
    location: "Route: 83km, 1hr 45min",
    annotation: "Hospital en route: QEH",
  },
  {
    time: "09:30\u201312:30",
    activity: "Guided rainforest walk",
    category: "Activity",
    categoryColor: "#534ab7",
    location: "Silau Silau Trail",
    annotation: "ARP: 18/35 \u2192 RAMS req.",
  },
  {
    time: "12:30\u201313:30",
    activity: "Lunch",
    category: "Meal",
    categoryColor: "#C9A24D",
    location: "Liwagu Restaurant",
    annotation: "Place ID resolved",
  },
];

const metrics = [
  { value: "100%", label: "Time coverage" },
  { value: "0", label: "Gaps found" },
  { value: "14", label: "Locations resolved" },
];

/* ── Component ── */
export function Standardisation() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        gap: "0",
        alignItems: "start",
        fontFamily: "var(--font-sans)",
      }}
      className="standardisation-root"
    >
      {/* ── BEFORE PANEL ── */}
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "rgba(220, 53, 69, 0.08)",
            borderBottom: "1px solid rgba(220, 53, 69, 0.2)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#dc3545",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#dc3545",
              letterSpacing: "-0.01em",
            }}
          >
            What arrives — raw provider itinerary
          </span>
        </div>

        {/* Raw itinerary block */}
        <div style={{ padding: "20px" }}>
          <div
            style={{
              background: "#fafafa",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              padding: "16px 18px",
              fontFamily: "'IBM Plex Mono', 'SF Mono', 'Consolas', monospace",
              fontSize: "12.5px",
              lineHeight: "1.85",
              color: "var(--text-primary)",
              whiteSpace: "pre-wrap",
            }}
          >
            <RawLine bold>Day 1 - Arrival</RawLine>
            <RawLine>Arrive Kota Kinabalu airport</RawLine>
            <RawLine>Transfer to hotel</RawLine>
            <RawLine>
              <Highlight>&quot;Check in and rest&quot;</Highlight>{" "}
              <VagueNote>\u2190 vague</VagueNote>
            </RawLine>
            <GapBadge text="\u26A0 NO TIME" />
            <RawLine>Evening: Welcome dinner at hotel</RawLine>
            <Spacer />
            <RawLine bold>Day 2 - Rainforest</RawLine>
            <RawLine>
              <Highlight>&quot;After breakfast&quot;</Highlight>, depart for
            </RawLine>
            <RawLine>Kinabalu National Park</RawLine>
            <GapBadge text="\u26A0 NO TRANSPORT DETAIL" />
            <RawLine>Guided nature walk</RawLine>
            <RawLine dim>(approx 3 hours)</RawLine>
            <RawLine>
              Lunch at park <RedNote>\u2190 where?</RedNote>
            </RawLine>
            <RawLine>
              <Highlight>&quot;Afternoon free time&quot;</Highlight>
            </RawLine>
            <RawLine>Return to hotel</RawLine>
            <GapBadge text="\u26A0 3HR UNACCOUNTED" />
            <Spacer />
            <RawLine bold>Day 3 - River</RawLine>
            <RawLine>White-water rafting on</RawLine>
            <RawLine>the Kiulu River</RawLine>
            <RawLine>
              <Highlight>&quot;Full day activity&quot;</Highlight>
            </RawLine>
            <GapBadge text="\u26A0 NO TIMES" />
            <RawLine>
              <RedNote>\u2190 no provider named</RedNote>
            </RawLine>
          </div>

          {/* Issue list */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {issues.map((issue, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  color:
                    issue.icon === "\u274C"
                      ? "#dc3545"
                      : "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    background:
                      issue.icon === "\u274C"
                        ? "rgba(220,53,69,0.1)"
                        : "rgba(255,165,0,0.1)",
                  }}
                >
                  {issue.icon}
                </span>
                <span>{issue.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARROW ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "200px",
        }}
        className="standardisation-arrow"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="standardisation-arrow-svg"
        >
          <path
            d="M6 16h18M18 10l6 6-6 6"
            stroke="var(--brand-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── AFTER PANEL ── */}
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "rgba(29, 158, 117, 0.08)",
            borderBottom: "1px solid rgba(29, 158, 117, 0.2)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#1d9e75",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#1d9e75",
              letterSpacing: "-0.01em",
            }}
          >
            What ETI360 produces — structured activity ledger
          </span>
        </div>

        {/* Ledger table */}
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
              <tr
                style={{
                  borderBottom: "2px solid var(--border-color)",
                  textAlign: "left",
                }}
              >
                {["Time", "Activity", "Category", "Location"].map((h) => (
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
              {/* Day 1 header */}
              <DayHeaderRow label="Day 1 — Arrival Day" />
              {day1Rows.map((row, i) => (
                <LedgerTableRow key={`d1-${i}`} row={row} />
              ))}
              {/* Day 2 header */}
              <DayHeaderRow label="Day 2 — Kinabalu National Park" />
              {day2Rows.map((row, i) => (
                <LedgerTableRow key={`d2-${i}`} row={row} />
              ))}
            </tbody>
          </table>

          {/* Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: "rgba(29, 158, 117, 0.06)",
                  border: "1px solid rgba(29, 158, 117, 0.15)",
                  borderRadius: "8px",
                  padding: "14px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#1d9e75",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: "11.5px",
                    color: "var(--text-tertiary)",
                    marginTop: "2px",
                    fontWeight: 500,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .standardisation-root {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .standardisation-arrow {
            min-height: auto !important;
            padding: 12px 0;
          }
          .standardisation-arrow-svg {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}

/* ── Sub-components ── */

function RawLine({
  children,
  bold,
  dim,
}: {
  children: React.ReactNode;
  bold?: boolean;
  dim?: boolean;
}) {
  return (
    <div
      style={{
        fontWeight: bold ? 700 : 400,
        opacity: dim ? 0.55 : 1,
        color: bold ? "var(--brand-navy)" : undefined,
      }}
    >
      {children}
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "rgba(255, 165, 0, 0.18)",
        padding: "1px 5px",
        borderRadius: "3px",
        color: "#8b6914",
      }}
    >
      {children}
    </span>
  );
}

function GapBadge({ text }: { text: string }) {
  return (
    <div style={{ margin: "3px 0" }}>
      <span
        style={{
          display: "inline-block",
          background: "rgba(220, 53, 69, 0.12)",
          color: "#dc3545",
          fontSize: "11px",
          fontWeight: 600,
          padding: "2px 8px",
          borderRadius: "4px",
          letterSpacing: "0.02em",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function VagueNote({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: "#8b6914", fontSize: "11.5px", fontStyle: "italic" }}>
      {children}
    </span>
  );
}

function RedNote({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: "#dc3545", fontSize: "11.5px", fontWeight: 500 }}>
      {children}
    </span>
  );
}

function Spacer() {
  return <div style={{ height: "10px" }} />;
}

function DayHeaderRow({ label }: { label: string }) {
  return (
    <tr>
      <td
        colSpan={4}
        style={{
          padding: "12px 10px 8px",
          fontWeight: 700,
          fontSize: "12px",
          color: "var(--brand-navy)",
          borderBottom: "1px solid var(--border-color)",
          background: "rgba(13, 53, 88, 0.03)",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </td>
    </tr>
  );
}

function LedgerTableRow({ row }: { row: LedgerRow }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
      <td
        style={{
          padding: "8px 10px",
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
          fontWeight: 500,
          fontSize: "12px",
          color: "var(--text-primary)",
        }}
      >
        {row.time}
      </td>
      <td style={{ padding: "8px 10px", fontWeight: 500 }}>{row.activity}</td>
      <td style={{ padding: "8px 10px" }}>
        <span
          style={{
            display: "inline-block",
            background: row.categoryColor,
            color: "#fff",
            fontSize: "10.5px",
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: "10px",
            letterSpacing: "0.02em",
          }}
        >
          {row.category}
        </span>
      </td>
      <td style={{ padding: "8px 10px" }}>
        <span style={{ color: "var(--text-primary)" }}>{row.location}</span>
        {row.annotation && (
          <span
            style={{
              marginLeft: "8px",
              fontSize: "11px",
              color: "#1d9e75",
              fontWeight: 500,
            }}
          >
            \u2713 {row.annotation}
          </span>
        )}
      </td>
    </tr>
  );
}
