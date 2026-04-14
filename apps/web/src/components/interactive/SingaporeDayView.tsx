"use client";

import { useState } from "react";

/* ══════════════════════════════════════════════════
   SINGAPORE ACTIVE ADVENTURE — DAY-BY-DAY VIEW
   7-day trip with per-day location maps + hospitals
   ══════════════════════════════════════════════════ */

interface DayData {
  day: number;
  label: string;
  date: string;
  image: string;
  locations: { name: string; type: "activity" | "transport" | "hospital"; time?: string; arp?: string; arpColor?: string }[];
  hospital: string;
  driveTime: string;
}

const days: DayData[] = [
  {
    day: 2,
    label: "Sentosa + Kallang + Night Safari",
    date: "16 Mar",
    image: "/images/singapore-day-2.png",
    locations: [
      { name: "Mega Adventure Park, Sentosa", type: "activity", time: "09:00–12:00", arp: "22/35", arpColor: "#dc3545" },
      { name: "Kallang Basin kayaking", type: "activity", time: "14:00–17:00", arp: "19/35", arpColor: "#e6a817" },
      { name: "Night Safari, Singapore Zoo", type: "activity", time: "19:30–21:30", arp: "8/35", arpColor: "#1d9e75" },
    ],
    hospital: "Singapore General Hospital",
    driveTime: "8 min",
  },
  {
    day: 3,
    label: "Sungei Buloh + Science Centre",
    date: "17 Mar",
    image: "/images/singapore-day-3.png",
    locations: [
      { name: "Sungei Buloh Wetland Reserve", type: "activity", time: "09:00–12:30", arp: "12/35", arpColor: "#e6a817" },
      { name: "Science Centre / Omni-Theatre", type: "activity", time: "14:00–17:00", arp: "5/35", arpColor: "#1d9e75" },
    ],
    hospital: "Woodlands Health Campus",
    driveTime: "15 min",
  },
  {
    day: 4,
    label: "Cultural Heritage Walk",
    date: "18 Mar",
    image: "/images/singapore-day-4.png",
    locations: [
      { name: "Chinatown heritage walk", type: "activity", time: "09:00–10:30", arp: "6/35", arpColor: "#1d9e75" },
      { name: "Kampong Glam", type: "activity", time: "10:30–12:00", arp: "5/35", arpColor: "#1d9e75" },
      { name: "Little India walking tour", type: "activity", time: "13:00–14:30", arp: "7/35", arpColor: "#1d9e75" },
      { name: "National Museum of Singapore", type: "activity", time: "15:00–17:00", arp: "3/35", arpColor: "#1d9e75" },
    ],
    hospital: "Singapore General Hospital",
    driveTime: "8 min",
  },
  {
    day: 5,
    label: "Gardens by the Bay + Marina Barrage",
    date: "19 Mar",
    image: "/images/singapore-day-5.png",
    locations: [
      { name: "Cloud Forest", type: "activity", time: "09:00–10:30", arp: "4/35", arpColor: "#1d9e75" },
      { name: "Flower Dome", type: "activity", time: "10:30–12:00", arp: "3/35", arpColor: "#1d9e75" },
      { name: "Supertree Grove skyway", type: "activity", time: "13:00–14:30", arp: "9/35", arpColor: "#1d9e75" },
      { name: "Marina Barrage rooftop", type: "activity", time: "15:00–17:00", arp: "5/35", arpColor: "#1d9e75" },
    ],
    hospital: "Singapore General Hospital",
    driveTime: "8 min",
  },
  {
    day: 6,
    label: "Marina Bay + Departure",
    date: "20 Mar",
    image: "/images/singapore-day-6.png",
    locations: [
      { name: "Merlion Park & Marina Bay Sands", type: "activity", time: "08:00–10:00", arp: "4/35", arpColor: "#1d9e75" },
    ],
    hospital: "Singapore General Hospital",
    driveTime: "8 min",
  },
];

const ALL_DAYS_IMAGE = "/images/singapore-day-all.png";

export function SingaporeDayView() {
  const [activeDay, setActiveDay] = useState<number | "all">("all");
  const currentDay = activeDay === "all" ? null : days.find((d) => d.day === activeDay);

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <div
        style={{
          background: "var(--brand-navy)",
          borderRadius: "12px 12px 0 0",
          padding: "20px 24px",
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "var(--brand-gold)",
            marginBottom: "6px",
          }}
        >
          LOCATION INTELLIGENCE
        </div>
        <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
          Active Singapore Educational Adventure
        </div>
        <div style={{ fontSize: "12px", opacity: 0.7 }}>
          Ohori International School · Year 10 · 7 days · 15–21 March 2026
        </div>
      </div>

      {/* Day filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "2px solid var(--border-color)",
          borderLeft: "1px solid var(--border-color)",
          borderRight: "1px solid var(--border-color)",
          overflowX: "auto",
          background: "#fff",
        }}
      >
        <button
          onClick={() => setActiveDay("all")}
          style={{
            padding: "10px 16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: activeDay === "all" ? 600 : 400,
            color: activeDay === "all" ? "var(--brand-navy)" : "var(--text-tertiary)",
            borderBottom: activeDay === "all" ? "2px solid var(--brand-gold)" : "2px solid transparent",
            marginBottom: "-2px",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-sans)",
          }}
        >
          All Days
        </button>
        {days.map((d) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(d.day)}
            style={{
              padding: "10px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: activeDay === d.day ? 600 : 400,
              color: activeDay === d.day ? "var(--brand-navy)" : "var(--text-tertiary)",
              borderBottom: activeDay === d.day ? "2px solid var(--brand-gold)" : "2px solid transparent",
              marginBottom: "-2px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)",
            }}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Map */}
      <div
        style={{
          borderLeft: "1px solid var(--border-color)",
          borderRight: "1px solid var(--border-color)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={currentDay ? currentDay.image : ALL_DAYS_IMAGE}
          alt={currentDay ? `Day ${currentDay.day} — ${currentDay.label}` : "All days overview"}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Day label overlay */}
        {currentDay && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "var(--brand-navy)",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Day {currentDay.day} · {currentDay.date} · {currentDay.label}
          </div>
        )}
      </div>

      {/* Day details or overview */}
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
          overflow: "hidden",
        }}
      >
        {activeDay === "all" ? (
          /* All days summary */
          <div style={{ padding: "16px 20px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              {[
                { value: "12", label: "Activity locations" },
                { value: "5", label: "Hospitals mapped" },
                { value: "3 min", label: "Fastest TTDC" },
                { value: "15 min", label: "Longest TTDC" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "var(--band-background)",
                    borderRadius: "8px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--brand-navy)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--text-tertiary)",
                      marginTop: "2px",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Day summary cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(d.day)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    background: "#fff",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "var(--brand-gold)",
                        color: "var(--brand-navy)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {d.day}
                    </div>
                    <div>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {d.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                        {d.date} · {d.locations.length} location{d.locations.length !== 1 ? "s" : ""} · {d.hospital} ({d.driveTime})
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--brand-gold)", fontWeight: 600 }}>View →</span>
                </button>
              ))}
            </div>
          </div>
        ) : currentDay ? (
          /* Single day detail */
          <div style={{ padding: "16px 20px" }}>
            {/* Hospital info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                background: "rgba(220,53,69,0.04)",
                borderRadius: "8px",
                marginBottom: "16px",
                border: "1px solid rgba(220,53,69,0.12)",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "#dc3545",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                +
              </span>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {currentDay.hospital}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                  Nearest emergency facility · {currentDay.driveTime} drive
                </div>
              </div>
            </div>

            {/* Activity list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {currentDay.locations.map((loc, i) => (
                <div
                  key={loc.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "var(--brand-gold)",
                        color: "var(--brand-navy)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {loc.name}
                      </div>
                      {loc.time && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--text-tertiary)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {loc.time}
                        </div>
                      )}
                    </div>
                  </div>
                  {loc.arp && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: loc.arpColor,
                        background: `${loc.arpColor}15`,
                        padding: "3px 8px",
                        borderRadius: "8px",
                      }}
                    >
                      ARP {loc.arp}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
