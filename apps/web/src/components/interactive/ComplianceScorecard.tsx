"use client";

interface Dimension {
  name: string;
  clause: string;
  score: number;
  pill: "green" | "yellow" | "amber" | "red";
}

const PILL_STYLES: Record<string, { background: string; color: string }> = {
  green: { background: "rgba(29,158,117,0.1)", color: "#1d9e75" },
  yellow: { background: "rgba(201,164,10,0.1)", color: "#c9a40a" },
  amber: { background: "rgba(212,135,12,0.1)", color: "#d4870c" },
  red: { background: "rgba(192,57,43,0.1)", color: "#c0392b" },
};

const BAR_COLORS: Record<string, string> = {
  green: "#1d9e75",
  yellow: "#c9a40a",
  amber: "#d4870c",
  red: "#c0392b",
};

const dimensions: Dimension[] = [
  { name: "Trip planning and approval", clause: "\u00a76.2", score: 92, pill: "green" },
  { name: "Leadership accountability", clause: "\u00a75.1", score: 88, pill: "green" },
  { name: "Risk assessment process", clause: "\u00a76.3", score: 85, pill: "green" },
  { name: "Medical preparedness", clause: "\u00a76.7", score: 82, pill: "green" },
  { name: "Supervision ratios", clause: "\u00a76.5", score: 78, pill: "yellow" },
  { name: "Transport safety", clause: "\u00a76.6", score: 75, pill: "yellow" },
  { name: "Emergency procedures", clause: "\u00a76.8", score: 72, pill: "yellow" },
  { name: "Accommodation standards", clause: "\u00a76.4", score: 70, pill: "amber" },
  { name: "Dynamic risk assessment", clause: "\u00a76.3.4", score: 58, pill: "amber" },
  { name: "Post-trip review", clause: "\u00a77.2", score: 45, pill: "red" },
];

const OVERALL_SCORE = 78;
const CIRCUMFERENCE = 2 * Math.PI * 50; // ~314.16
const DASH_OFFSET = CIRCUMFERENCE * (1 - OVERALL_SCORE / 100);

export function ComplianceScorecard() {
  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      borderRadius: "8px",
      overflow: "hidden",
      border: "1px solid var(--border-color, #e5e7eb)",
      background: "#fff",
    }}>
      {/* Header */}
      <div style={{
        background: "var(--brand-navy, #0d3558)",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <span style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>
          ISO 31031:2024 Compliance Assessment — Sample School
        </span>
        <span style={{
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          fontSize: "12px",
          fontWeight: 500,
          padding: "4px 12px",
          borderRadius: "4px",
        }}>
          SOP Coverage Review
        </span>
      </div>

      {/* Summary row */}
      <div style={{
        display: "flex",
        gap: "24px",
        padding: "24px",
        borderBottom: "1px solid var(--border-color, #e5e7eb)",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        {/* Score ring */}
        <div style={{ flexShrink: 0 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="var(--border-color, #e5e7eb)"
              strokeWidth="8"
            />
            {/* Score arc */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#1d9e75"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={DASH_OFFSET}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
            {/* Center text */}
            <text
              x="60"
              y="55"
              textAnchor="middle"
              style={{
                fontSize: "28px",
                fontWeight: 700,
                fill: "var(--text-primary, #1a1a2e)",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              {OVERALL_SCORE}%
            </text>
            <text
              x="60"
              y="72"
              textAnchor="middle"
              style={{
                fontSize: "11px",
                fontWeight: 500,
                fill: "#1d9e75",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              Aligned
            </text>
          </svg>
        </div>

        {/* Summary text */}
        <div style={{
          flex: 1,
          minWidth: "200px",
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
        }}>
          Strong alignment across planning, leadership accountability, and medical
          preparedness. Gaps exist in dynamic risk assessment procedures and formal
          post-trip review processes — both addressable through targeted SOP
          development.
        </div>
      </div>

      {/* Dimension grid */}
      <div style={{ padding: "16px 24px 24px" }}>
        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 72px 64px 1fr",
          gap: "12px",
          padding: "0 0 8px",
          borderBottom: "1px solid var(--border-color, #e5e7eb)",
          marginBottom: "4px",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
            Dimension
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
            Clause
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))", textTransform: "uppercase" as const, letterSpacing: "0.05em", textAlign: "center" as const }}>
            Score
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
            Coverage
          </span>
        </div>

        {/* Rows */}
        {dimensions.map((dim) => (
          <div
            key={dim.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 72px 64px 1fr",
              gap: "12px",
              padding: "10px 0",
              borderBottom: "1px solid var(--border-color, #e5e7eb)",
              alignItems: "center",
            }}
          >
            {/* Name */}
            <span style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-primary, #1a1a2e)",
            }}>
              {dim.name}
            </span>

            {/* Clause */}
            <span style={{
              fontSize: "12px",
              color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
              fontFamily: "'IBM Plex Mono', 'IBM Plex Sans', monospace",
            }}>
              {dim.clause}
            </span>

            {/* Score pill */}
            <div style={{ textAlign: "center" }}>
              <span style={{
                display: "inline-block",
                padding: "2px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
                background: PILL_STYLES[dim.pill].background,
                color: PILL_STYLES[dim.pill].color,
              }}>
                {dim.score}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{
              height: "6px",
              borderRadius: "3px",
              background: "var(--border-color, #e5e7eb)",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                borderRadius: "3px",
                width: `${dim.score}%`,
                background: BAR_COLORS[dim.pill],
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
