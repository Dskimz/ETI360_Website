"use client";

import { useRef, useEffect, useState, useCallback } from "react";

type RiskLevel = "low" | "moderate" | "high" | "critical";

interface DayData {
  day: number;
  label: string;
  description: string;
  level: RiskLevel;
}

const RISK_COLORS: Record<RiskLevel, string> = {
  low: "#1d9e75",
  moderate: "#c9a40a",
  high: "#d4870c",
  critical: "#c0392b",
};

const RISK_BAR_WIDTH: Record<RiskLevel, number> = {
  low: 20,
  moderate: 45,
  high: 70,
  critical: 90,
};

const P50_DATA: DayData[] = [
  { day: 1, label: "Arrival & orientation", description: "Low activity, controlled environment. Transfer from airport is the primary exposure.", level: "low" },
  { day: 2, label: "Kinabalu National Park", description: "Moderate terrain exposure. Guided trail with established infrastructure.", level: "moderate" },
  { day: 3, label: "Cultural — KK city", description: "Urban environment, low physical demand. Walking distances manageable.", level: "low" },
  { day: 4, label: "White-water rafting", description: "Peak risk day. Grade III rapids with qualified guide. 72km transfer each way.", level: "high" },
  { day: 5, label: "Mangrove kayaking", description: "Water-based activity with moderate exposure. Wildlife observation is low-risk.", level: "moderate" },
  { day: 6, label: "Marine — TARP", description: "Snorkelling carries moderate water risk. Boat transfers add exposure.", level: "moderate" },
  { day: 7, label: "Departure", description: "Logistics only. Airport transfer.", level: "low" },
];

const P90_DATA: DayData[] = [
  { day: 1, label: "Arrival & orientation", description: "Low activity, controlled environment. Transfer from airport is the primary exposure.", level: "low" },
  { day: 2, label: "Kinabalu National Park", description: "Altitude sickness presents in one participant. Group pace affected. Extended exposure on trail.", level: "high" },
  { day: 3, label: "Cultural — KK city", description: "Urban environment, low physical demand. Walking distances manageable.", level: "low" },
  { day: 4, label: "White-water rafting", description: "Participant ejection in rapids. Swift-water rescue deployed. Minor injury requiring medical attention. Activity halted.", level: "critical" },
  { day: 5, label: "Mangrove kayaking", description: "Delayed departure due to Day 4 incident review. Modified itinerary.", level: "moderate" },
  { day: 6, label: "Marine — TARP", description: "Weather deterioration. Boat transfer delayed. Snorkelling cancelled, substitute activity.", level: "high" },
  { day: 7, label: "Departure", description: "Logistics only. Airport transfer.", level: "low" },
];

function generateHistogramData(): number[] {
  // Right-skewed distribution: most trips score low (good), tail of bad outcomes
  const bins = new Array(20).fill(0);
  for (let i = 0; i < 1000; i++) {
    // Beta-like distribution skewed right
    const u1 = Math.random();
    const u2 = Math.random();
    const beta = Math.pow(u1, 2.5) * 100; // right-skewed
    const score = Math.min(99, Math.max(0, beta + (u2 - 0.5) * 10));
    const bin = Math.min(19, Math.floor(score / 5));
    bins[bin]++;
  }
  return bins;
}

function getBinColor(binIndex: number): string {
  const score = binIndex * 5;
  if (score < 25) return "#1d9e75";
  if (score < 50) return "#a3b518";
  if (score < 75) return "#d4870c";
  return "#c0392b";
}

export function StressTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"p50" | "p90">("p50");
  const [histogramData] = useState(() => generateHistogramData());

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = 220;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const padLeft = 44;
    const padRight = 16;
    const padTop = 16;
    const padBottom = 36;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Clear
    ctx.clearRect(0, 0, width, height);

    const maxVal = Math.max(...histogramData);
    const barW = chartW / 20;

    // Bars
    for (let i = 0; i < 20; i++) {
      const barH = (histogramData[i] / maxVal) * chartH;
      const x = padLeft + i * barW;
      const y = padTop + chartH - barH;
      ctx.fillStyle = getBinColor(i);
      ctx.fillRect(x + 1, y, barW - 2, barH);
    }

    // Axes
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop);
    ctx.lineTo(padLeft, padTop + chartH);
    ctx.lineTo(padLeft + chartW, padTop + chartH);
    ctx.stroke();

    // X-axis labels
    ctx.fillStyle = "rgba(13, 53, 88, 0.6)";
    ctx.font = "11px 'IBM Plex Sans', sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i <= 4; i++) {
      const val = i * 25;
      const x = padLeft + (val / 100) * chartW;
      ctx.fillText(String(val), x, height - 8);
    }
    ctx.fillText("100", padLeft + chartW, height - 8);

    // X-axis title
    ctx.fillStyle = "rgba(13, 53, 88, 0.6)";
    ctx.font = "11px 'IBM Plex Sans', sans-serif";
    ctx.fillText("Trip Outcome Score", padLeft + chartW / 2, height - 0);

    // Y-axis label
    ctx.save();
    ctx.translate(12, padTop + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Frequency", 0, 0);
    ctx.restore();

    // P50 line (around score 18)
    const p50X = padLeft + (18 / 100) * chartW;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "var(--brand-navy, #0d3558)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(p50X, padTop);
    ctx.lineTo(p50X, padTop + chartH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#0d3558";
    ctx.font = "bold 11px 'IBM Plex Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("P50", p50X + 4, padTop + 12);

    // P90 line (around score 52)
    const p90X = padLeft + (52 / 100) * chartW;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#c0392b";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(p90X, padTop);
    ctx.lineTo(p90X, padTop + chartH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#c0392b";
    ctx.font = "bold 11px 'IBM Plex Sans', sans-serif";
    ctx.fillText("P90", p90X + 4, padTop + 12);
  }, [histogramData]);

  useEffect(() => {
    drawChart();
    const handleResize = () => drawChart();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawChart]);

  const data = activeTab === "p50" ? P50_DATA : P90_DATA;

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
          Borneo Rainforest Expedition — Year 10 — 7 days
        </span>
        <span style={{
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          fontSize: "12px",
          fontWeight: 500,
          padding: "4px 12px",
          borderRadius: "4px",
        }}>
          1,000 iterations
        </span>
      </div>

      {/* Stats row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1px",
        background: "var(--border-color, #e5e7eb)",
        borderBottom: "1px solid var(--border-color, #e5e7eb)",
      }}>
        {[
          { value: "1,000", label: "Simulated trips" },
          { value: "73%", label: "Completed without incident" },
          { value: "4.2 hrs", label: "P50 time-to-definitive-care" },
          { value: "Day 4", label: "Peak risk day" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "#fff",
            padding: "16px 20px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary, #1a1a2e)",
              lineHeight: 1.2,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: "12px",
              color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
              marginTop: "4px",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Distribution chart */}
      <div style={{ padding: "20px 24px 12px" }}>
        <div style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--text-primary, #1a1a2e)",
          marginBottom: "12px",
        }}>
          Outcome Distribution
        </div>
        <div ref={containerRef} style={{ width: "100%" }}>
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Percentile toggle */}
      <div style={{ padding: "0 24px 16px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => setActiveTab("p50")}
          style={{
            flex: 1,
            padding: "10px 16px",
            border: activeTab === "p50" ? "2px solid var(--brand-navy, #0d3558)" : "1px solid var(--border-color, #e5e7eb)",
            borderRadius: "6px",
            background: activeTab === "p50" ? "rgba(13, 53, 88, 0.05)" : "#fff",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "13px",
            fontWeight: activeTab === "p50" ? 600 : 400,
            color: activeTab === "p50" ? "var(--brand-navy, #0d3558)" : "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
            textAlign: "left",
          }}
        >
          P50 — Realistic scenario
        </button>
        <button
          onClick={() => setActiveTab("p90")}
          style={{
            flex: 1,
            padding: "10px 16px",
            border: activeTab === "p90" ? "2px solid #c0392b" : "1px solid var(--border-color, #e5e7eb)",
            borderRadius: "6px",
            background: activeTab === "p90" ? "rgba(192, 57, 43, 0.05)" : "#fff",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "13px",
            fontWeight: activeTab === "p90" ? 600 : 400,
            color: activeTab === "p90" ? "#c0392b" : "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
            textAlign: "left",
          }}
        >
          P90 — Statistically bad trip
        </button>
      </div>

      {/* Daily risk timeline */}
      <div style={{ padding: "0 24px 24px" }}>
        <div style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--text-primary, #1a1a2e)",
          marginBottom: "12px",
        }}>
          Daily Risk Timeline
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {data.map((day) => (
            <div key={day.day} style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}>
              {/* Day number square */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: RISK_COLORS[day.level],
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {day.day}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-primary, #1a1a2e)",
                  lineHeight: 1.3,
                }}>
                  {day.label}
                </div>
                <div style={{
                  fontSize: "12px",
                  color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
                  lineHeight: 1.4,
                  marginTop: "2px",
                }}>
                  {day.description}
                </div>
                {/* Risk bar */}
                <div style={{
                  marginTop: "6px",
                  height: "4px",
                  borderRadius: "2px",
                  background: "var(--border-color, #e5e7eb)",
                  width: "100%",
                }}>
                  <div style={{
                    height: "100%",
                    borderRadius: "2px",
                    background: RISK_COLORS[day.level],
                    width: `${RISK_BAR_WIDTH[day.level]}%`,
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
