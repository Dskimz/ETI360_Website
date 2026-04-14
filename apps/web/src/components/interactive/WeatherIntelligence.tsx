"use client";

import React from "react";

/* ══════════════════════════════════════════════════
   Weather Intelligence Briefing — Standalone View
   Full-page weather analysis component
   ══════════════════════════════════════════════════ */

const weatherData = {
  destination: "Kota Kinabalu, Sabah",
  period: "14–20 March 2027",
  yearsAnalyzed: 15,
  summary:
    "Tropical maritime climate with consistent heat and humidity. March is in the dry(er) inter-monsoon period — expect afternoon showers on 4–5 of 7 days, typically clearing by evening. UV index very high year-round.",
  daily: [
    { day: "D1", date: "14 Mar", high: 32, low: 24, rain: 45, condition: "Partly cloudy", uvIndex: 11, humidity: 78, wind: "12 km/h SW", sunrise: "06:12", sunset: "18:18" },
    { day: "D2", date: "15 Mar", high: 31, low: 24, rain: 55, condition: "PM showers", uvIndex: 10, humidity: 82, wind: "14 km/h SW", sunrise: "06:12", sunset: "18:18" },
    { day: "D3", date: "16 Mar", high: 33, low: 25, rain: 30, condition: "Mostly sunny", uvIndex: 12, humidity: 74, wind: "10 km/h W", sunrise: "06:11", sunset: "18:18" },
    { day: "D4", date: "17 Mar", high: 32, low: 24, rain: 60, condition: "Thunderstorms", uvIndex: 9, humidity: 85, wind: "18 km/h SW", sunrise: "06:11", sunset: "18:19" },
    { day: "D5", date: "18 Mar", high: 31, low: 24, rain: 50, condition: "PM showers", uvIndex: 10, humidity: 80, wind: "15 km/h SW", sunrise: "06:11", sunset: "18:19" },
    { day: "D6", date: "19 Mar", high: 32, low: 25, rain: 40, condition: "Partly cloudy", uvIndex: 11, humidity: 76, wind: "11 km/h W", sunrise: "06:11", sunset: "18:19" },
    { day: "D7", date: "20 Mar", high: 31, low: 24, rain: 35, condition: "Mostly sunny", uvIndex: 11, humidity: 75, wind: "10 km/h W", sunrise: "06:10", sunset: "18:19" },
  ],
  concerns: [
    { label: "Heat stress", severity: "high", detail: "Sustained 31–33\u00B0C with high humidity. Mandatory hydration breaks during outdoor activities. Wet-bulb temperature frequently exceeds safe thresholds for sustained physical exertion." },
    { label: "UV exposure", severity: "high", detail: "UV index 9–12 (very high to extreme). Sunscreen, hats, and shade breaks essential for all outdoor activities. Risk peaks 10:00–14:00." },
    { label: "Afternoon storms", severity: "moderate", detail: "60% chance of PM thunderstorms on D4 (rafting day). Lightning protocol required for water activities. Typical storm duration 45–90 minutes." },
    { label: "Flash flooding", severity: "low", detail: "River levels can rise rapidly after heavy rain. Kiulu River operator monitors conditions in real-time. Historical flood risk for March: 8%." },
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

const severityColors: Record<string, { color: string; bg: string }> = {
  high: { color: "#dc3545", bg: "rgba(220,53,69,0.08)" },
  moderate: { color: "#e6a817", bg: "rgba(230,168,23,0.08)" },
  low: { color: "#1d9e75", bg: "rgba(29,158,117,0.08)" },
};

function uvColor(uv: number): string {
  if (uv >= 11) return "#dc3545";
  if (uv >= 8) return "#e6a817";
  return "#1d9e75";
}

function uvLabel(uv: number): string {
  if (uv >= 11) return "Extreme";
  if (uv >= 8) return "Very high";
  return "High";
}

export function WeatherIntelligence() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}>
      {/* ── Header Bar ── */}
      <div
        style={{
          background: "var(--brand-navy, #0d3558)",
          padding: "28px 32px",
          marginBottom: "28px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "var(--brand-gold, #C9A24D)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "6px",
          }}
        >
          ETI360 Intelligence
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "6px",
          }}
        >
          Weather Intelligence Briefing
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "4px",
          }}
        >
          {weatherData.destination} &middot; {weatherData.period}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {weatherData.yearsAnalyzed}-year historical climate analysis
        </div>
      </div>

      {/* ── Climate Overview Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {[
          { value: `${weatherData.climate.avgHigh}\u00B0C`, label: "Avg. High", sub: "Daily maximum" },
          { value: `${weatherData.climate.avgLow}\u00B0C`, label: "Avg. Low", sub: "Daily minimum" },
          { value: `${weatherData.climate.avgRainDays}`, label: "Rain Days / Month", sub: "March average" },
          { value: weatherData.climate.daylightHours, label: "Daylight Hours", sub: `${weatherData.climate.sunrise} – ${weatherData.climate.sunset}` },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--band-background, #f8f9fa)",
              borderRadius: "10px",
              padding: "20px 16px",
              textAlign: "center",
              border: "1px solid var(--border-color, #e5e7eb)",
            }}
          >
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--brand-navy, #0d3558)", lineHeight: 1.1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", marginTop: "6px" }}>
              {s.label}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary, #6b7280)", marginTop: "2px" }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── Temperature + Precipitation + UV Chart ── */}
      <div
        style={{
          background: "var(--band-background, #f8f9fa)",
          borderRadius: "10px",
          padding: "20px 24px",
          marginBottom: "28px",
          border: "1px solid var(--border-color, #e5e7eb)",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--brand-navy, #0d3558)", marginBottom: "16px" }}>
          Daily Temperature, Precipitation &amp; UV Index
        </div>
        <svg width="100%" height="260" viewBox="0 0 700 260" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 40, 80, 120].map((y) => (
            <line key={y} x1="40" y1={y + 12} x2="680" y2={y + 12} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
          ))}

          {/* Y axis labels */}
          <text x="36" y="16" fontSize="9" fill="var(--text-tertiary, #6b7280)" textAnchor="end">35°C</text>
          <text x="36" y="56" fontSize="9" fill="var(--text-tertiary, #6b7280)" textAnchor="end">30°C</text>
          <text x="36" y="96" fontSize="9" fill="var(--text-tertiary, #6b7280)" textAnchor="end">25°C</text>
          <text x="36" y="136" fontSize="9" fill="var(--text-tertiary, #6b7280)" textAnchor="end">20°C</text>

          {/* Legend */}
          <circle cx="430" cy="10" r="5" fill="var(--brand-navy, #0d3558)" />
          <text x="440" y="14" fontSize="9" fill="var(--text-tertiary, #6b7280)">High</text>
          <circle cx="480" cy="10" r="4" fill="var(--brand-gold, #C9A24D)" />
          <text x="490" y="14" fontSize="9" fill="var(--text-tertiary, #6b7280)">Low</text>
          <rect x="520" y="5" width="14" height="10" rx="4" fill="rgba(52,152,219,0.18)" />
          <text x="538" y="14" fontSize="9" fill="var(--text-tertiary, #6b7280)">Rain %</text>
          <circle cx="590" cy="10" r="5" fill="#dc3545" />
          <text x="600" y="14" fontSize="9" fill="var(--text-tertiary, #6b7280)">UV 11+</text>
          <circle cx="645" cy="10" r="5" fill="#e6a817" />
          <text x="655" y="14" fontSize="9" fill="var(--text-tertiary, #6b7280)">UV 8-10</text>

          {weatherData.daily.map((d, i) => {
            const x = 70 + i * 88;
            const barWidth = 38;
            // Scale: 20°C = y:132, 35°C = y:12
            const scale = (temp: number) => 132 - ((temp - 20) / 15) * 120;
            const highY = scale(d.high);
            const lowY = scale(d.low);

            return (
              <g key={d.day}>
                {/* Temperature range bar */}
                <rect
                  x={x - barWidth / 2}
                  y={highY}
                  width={barWidth}
                  height={lowY - highY}
                  rx="5"
                  fill="rgba(13,53,88,0.12)"
                />
                {/* High temp dot + label */}
                <circle cx={x} cy={highY} r="5" fill="var(--brand-navy, #0d3558)" />
                <text x={x} y={highY - 9} fontSize="11" fontWeight="700" fill="var(--brand-navy, #0d3558)" textAnchor="middle">
                  {d.high}°
                </text>
                {/* Low temp dot + label */}
                <circle cx={x} cy={lowY} r="4" fill="var(--brand-gold, #C9A24D)" />
                <text x={x} y={lowY + 16} fontSize="10" fill="var(--brand-gold, #C9A24D)" textAnchor="middle">
                  {d.low}°
                </text>

                {/* Rain probability pill */}
                <rect
                  x={x - 20}
                  y={170}
                  width={40}
                  height={20}
                  rx="10"
                  fill={d.rain > 50 ? "rgba(52,152,219,0.18)" : "rgba(52,152,219,0.08)"}
                />
                <text x={x} y={184} fontSize="10" fontWeight="600" fill="#3498db" textAnchor="middle">
                  {d.rain}%
                </text>

                {/* UV index dot */}
                <circle cx={x} cy={210} r="8" fill={uvColor(d.uvIndex)} opacity={0.15} />
                <circle cx={x} cy={210} r="5" fill={uvColor(d.uvIndex)} />
                <text x={x} y={230} fontSize="9" fontWeight="600" fill={uvColor(d.uvIndex)} textAnchor="middle">
                  {d.uvIndex}
                </text>

                {/* Day + date labels */}
                <text x={x} y={155} fontSize="10" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">
                  {d.day}
                </text>
                <text x={x} y={165} fontSize="8.5" fill="var(--text-tertiary, #6b7280)" textAnchor="middle">
                  {d.date}
                </text>

                {/* Row labels (only first column) */}
                {i === 0 && (
                  <>
                    <text x="36" y="184" fontSize="9" fill="var(--text-tertiary, #6b7280)" textAnchor="end">Rain</text>
                    <text x="36" y="214" fontSize="9" fill="var(--text-tertiary, #6b7280)" textAnchor="end">UV</text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Daily Conditions Table ── */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--brand-navy, #0d3558)", marginBottom: "12px" }}>
          Daily Conditions
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr>
                {["Day", "Date", "Conditions", "High", "Low", "Rain %", "UV Index", "Humidity", "Wind", "Sunrise", "Sunset"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "10px 8px",
                      fontWeight: 600,
                      color: "var(--brand-navy, #0d3558)",
                      borderBottom: "2px solid var(--border-color, #e5e7eb)",
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
              {weatherData.daily.map((d) => (
                <tr key={d.day} style={{ transition: "background 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--band-background, #f8f9fa)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontWeight: 600, color: "var(--brand-navy, #0d3558)", fontSize: "11px" }}>
                    {d.day}
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontSize: "11px", color: "var(--text-tertiary, #6b7280)" }}>
                    {d.date}
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)" }}>
                    {d.condition}
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
                    {d.high}°C
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontVariantNumeric: "tabular-nums" }}>
                    {d.low}°C
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontVariantNumeric: "tabular-nums" }}>
                    <span style={{ fontWeight: d.rain > 50 ? 600 : 400, color: d.rain > 50 ? "#3498db" : "inherit" }}>
                      {d.rain}%
                    </span>
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)" }}>
                    <span style={{ fontWeight: 600, color: uvColor(d.uvIndex) }}>{d.uvIndex}</span>
                    <span
                      style={{
                        fontSize: "10px",
                        color: uvColor(d.uvIndex),
                        marginLeft: "5px",
                        fontWeight: 500,
                        opacity: 0.8,
                      }}
                    >
                      {uvLabel(d.uvIndex)}
                    </span>
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontVariantNumeric: "tabular-nums" }}>
                    {d.humidity}%
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", whiteSpace: "nowrap" }}>
                    {d.wind}
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontVariantNumeric: "tabular-nums", fontSize: "11px" }}>
                    {d.sunrise}
                  </td>
                  <td style={{ padding: "9px 8px", borderBottom: "0.5px solid var(--border-color, #e5e7eb)", fontVariantNumeric: "tabular-nums", fontSize: "11px" }}>
                    {d.sunset}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Operational Weather Concerns ── */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--brand-navy, #0d3558)", marginBottom: "12px" }}>
          Operational Weather Concerns
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {weatherData.concerns.map((c) => {
            const sev = severityColors[c.severity] || severityColors.moderate;
            return (
              <div
                key={c.label}
                style={{
                  border: "1px solid var(--border-color, #e5e7eb)",
                  borderRadius: "10px",
                  padding: "16px 18px",
                  borderLeft: `4px solid ${sev.color}`,
                  background: "#ffffff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "13px", color: "var(--text-primary)" }}>
                    {c.label}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: sev.color,
                      background: sev.bg,
                      padding: "2px 10px",
                      borderRadius: "10px",
                      textTransform: "capitalize",
                    }}
                  >
                    {c.severity}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-tertiary, #6b7280)", lineHeight: 1.6 }}>
                  {c.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Climate Context Panel ── */}
      <div
        style={{
          background: "var(--band-background, #f8f9fa)",
          borderRadius: "10px",
          padding: "20px 24px",
          border: "1px solid var(--border-color, #e5e7eb)",
          borderLeft: "4px solid var(--brand-gold, #C9A24D)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--brand-navy, #0d3558)",
            }}
          >
            Climate Context
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--brand-gold, #C9A24D)",
              background: "rgba(201,162,77,0.1)",
              padding: "2px 8px",
              borderRadius: "8px",
            }}
          >
            {weatherData.yearsAnalyzed}-year analysis
          </span>
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.7 }}>
          {weatherData.summary}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-color, #e5e7eb)",
          }}
        >
          <div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary, #6b7280)", marginBottom: "2px" }}>
              Average humidity
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--brand-navy, #0d3558)" }}>
              {weatherData.climate.avgHumidity}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary, #6b7280)", marginBottom: "2px" }}>
              Sunrise / Sunset
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--brand-navy, #0d3558)" }}>
              {weatherData.climate.sunrise} / {weatherData.climate.sunset}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary, #6b7280)", marginBottom: "2px" }}>
              Daylight
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--brand-navy, #0d3558)" }}>
              {weatherData.climate.daylightHours}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
