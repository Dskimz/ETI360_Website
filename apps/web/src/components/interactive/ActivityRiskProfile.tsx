"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ══════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════ */

const DIMS = [
  "Physical intensity",
  "Supervision intensity",
  "Location exposure",
  "Emergency access",
  "Skill required",
  "Environmental conditions",
  "Equipment dependence",
];

const THRESHOLD = 14;
const COLORS = [
  "#C9A24D",
  "#0d3558",
  "#1d9e75",
  "#534ab7",
  "#993c1d",
  "#3266ad",
  "#d4537e",
  "#888780",
];

interface RiskBand {
  likelihood: string;
  severity: string;
  band: "high" | "moderate" | "low";
  score: number;
}

interface RamsData {
  risk: string;
  domain: string;
  consequence: string;
  inherent: RiskBand;
  residual: RiskBand;
  controls: string[];
  incident: string;
}

interface Activity {
  name: string;
  scores: number[];
  defaultOn: boolean;
  rams: RamsData | null;
}

const ACTIVITIES: Activity[] = [
  {
    name: "White-water rafting",
    scores: [4, 4, 4, 3, 3, 3, 4],
    defaultOn: true,
    rams: {
      risk: "Capsize or participant ejection in grade III rapids",
      domain: "Activity",
      consequence: "Serious injury (drowning, hypothermia)",
      inherent: { likelihood: "Possible", severity: "Major", band: "high", score: 12 },
      residual: { likelihood: "Unlikely", severity: "Major", band: "moderate", score: 8 },
      controls: [
        "Require all participants to wear fitted PFDs inspected before launch",
        "Brief group on self-rescue and flip-drill procedures before entering water",
        "Assign qualified river guide per raft with current swift-water rescue certification",
        "Restrict to grade III maximum; halt activity if water level exceeds safe threshold",
        "Verify emergency throw-bag positioned in each raft before departure",
      ],
      incident:
        "Initiate swift-water rescue protocol. Account for all participants. Administer first aid on riverbank. Contact emergency services if injury sustained.",
    },
  },
  { name: "Museum visit", scores: [1, 1, 1, 1, 1, 1, 1], defaultOn: true, rams: null },
  {
    name: "Mountain trekking",
    scores: [4, 3, 4, 4, 3, 4, 3],
    defaultOn: false,
    rams: {
      risk: "Participant injury or exposure on exposed mountain terrain",
      domain: "Environment",
      consequence: "Serious injury (fracture, hypothermia)",
      inherent: { likelihood: "Possible", severity: "Major", band: "high", score: 12 },
      residual: { likelihood: "Unlikely", severity: "Moderate", band: "moderate", score: 6 },
      controls: [
        "Verify mountain weather forecast before departure; suspend if storms forecast",
        "Brief group on lightning protocol and shelter point locations",
        "Assign qualified mountain leader with current first aid certification",
        "Require participants to carry waterproof layer, warm layer, and emergency whistle",
        "Halt activity and descend if visibility drops below 100 metres",
      ],
      incident:
        "Activate mountain rescue protocol. Shelter group. Administer first aid. Contact mountain rescue if participant cannot self-evacuate.",
    },
  },
  { name: "City walking tour", scores: [2, 2, 2, 1, 1, 2, 1], defaultOn: false, rams: null },
  {
    name: "Snorkelling",
    scores: [3, 4, 3, 3, 3, 3, 4],
    defaultOn: false,
    rams: {
      risk: "Submersion incident or marine creature contact",
      domain: "Activity",
      consequence: "Serious injury (drowning, envenomation)",
      inherent: { likelihood: "Possible", severity: "Major", band: "high", score: 12 },
      residual: { likelihood: "Unlikely", severity: "Major", band: "moderate", score: 8 },
      controls: [
        "Require buddy system with paired swim checks every 5 minutes",
        "Assign qualified water-safety instructor per group of 8 participants",
        "Brief participants on marine hazards specific to location before entry",
        "Restrict snorkelling to designated areas with known currents and depths",
        "Fit and test all masks and snorkels on shore before entering water",
      ],
      incident:
        "Initiate water rescue. Remove participant from water. Administer CPR if required. Contact emergency services immediately.",
    },
  },
  {
    name: "Via ferrata",
    scores: [5, 5, 4, 4, 4, 3, 5],
    defaultOn: false,
    rams: {
      risk: "Fall from height or equipment failure on via ferrata route",
      domain: "Activity",
      consequence: "Fatality (fall from height)",
      inherent: { likelihood: "Possible", severity: "Catastrophic", band: "high", score: 15 },
      residual: { likelihood: "Rare", severity: "Major", band: "moderate", score: 4 },
      controls: [
        "Fit and inspect dual-lanyard via ferrata sets for each participant before entry",
        "Require qualified via ferrata instructor with current rescue certification",
        "Brief participants on clipping technique and demonstrate transfer procedure",
        "Limit group size to 6 participants per instructor on the route",
        "Inspect all fixed anchors and cables at entry point before group proceeds",
      ],
      incident:
        "Activate vertical rescue protocol. Secure participant on route. Contact mountain rescue. Do not attempt unqualified rescue from height.",
    },
  },
  { name: "Cooking class", scores: [1, 2, 1, 1, 2, 1, 1], defaultOn: false, rams: null },
  {
    name: "Overnight camping",
    scores: [3, 3, 4, 3, 2, 4, 3],
    defaultOn: false,
    rams: {
      risk: "Exposure or medical emergency in remote campsite overnight",
      domain: "Environment",
      consequence: "Serious injury (hypothermia, allergic reaction)",
      inherent: { likelihood: "Possible", severity: "Major", band: "high", score: 12 },
      residual: { likelihood: "Unlikely", severity: "Moderate", band: "moderate", score: 6 },
      controls: [
        "Verify campsite emergency vehicle access route before group arrival",
        "Assign staff member to carry satellite communicator and first aid kit",
        "Brief group on campsite boundaries and emergency muster point",
        "Require all participants to have sleeping bag rated for forecast overnight low",
        "Confirm nearest emergency hospital route and estimated transfer time",
      ],
      incident:
        "Administer first aid. Activate emergency evacuation if required. Contact emergency services via satellite communicator.",
    },
  },
];

/* ══════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════ */

function sum(scores: number[]): number {
  return scores.reduce((a, b) => a + b, 0);
}

function useIsDesktop(breakpoint = 768): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [breakpoint],
  );
  const getSnapshot = useCallback(
    () => window.matchMedia(`(min-width: ${breakpoint}px)`).matches,
    [breakpoint],
  );
  const getServerSnapshot = useCallback(() => true, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function bandColor(band: string): { bg: string; text: string } {
  switch (band) {
    case "high":
      return { bg: "#dc2626", text: "#fff" };
    case "moderate":
      return { bg: "#C9A24D", text: "#fff" };
    case "low":
      return { bg: "#16a34a", text: "#fff" };
    default:
      return { bg: "#6b7280", text: "#fff" };
  }
}

/* ══════════════════════════════════════════════════
   RADAR CANVAS
   ══════════════════════════════════════════════════ */

function drawRadar(
  canvas: HTMLCanvasElement,
  activeIndices: Set<number>,
) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  canvas.width = w * dpr;
  canvas.height = h * dpr;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(cx, cy) - 48;
  const rings = 5;
  const axes = DIMS.length;
  const angleStep = (Math.PI * 2) / axes;
  const startAngle = -Math.PI / 2; // top

  // get CSS variable values from computed style
  const cs = getComputedStyle(canvas);
  const navy = cs.getPropertyValue("--brand-navy").trim() || "#0d3558";
  const textTertiary = cs.getPropertyValue("--text-tertiary").trim() || "rgba(13,53,88,0.6)";
  const borderColor = cs.getPropertyValue("--border-color").trim() || "#e5e7eb";

  ctx.clearRect(0, 0, w, h);

  // --- grid rings ---
  for (let r = 1; r <= rings; r++) {
    const radius = (maxR / rings) * r;
    ctx.beginPath();
    for (let i = 0; i <= axes; i++) {
      const angle = startAngle + angleStep * i;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // --- spokes ---
  for (let i = 0; i < axes; i++) {
    const angle = startAngle + angleStep * i;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // --- scale numbers along top spoke ---
  ctx.font = "11px 'IBM Plex Sans', sans-serif";
  ctx.fillStyle = textTertiary;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  for (let r = 1; r <= rings; r++) {
    const radius = (maxR / rings) * r;
    const px = cx + Math.cos(startAngle) * radius;
    const py = cy + Math.sin(startAngle) * radius;
    ctx.fillText(String(r), px + 12, py + 4);
  }

  // --- dimension labels ---
  ctx.font = "12px 'IBM Plex Sans', sans-serif";
  ctx.fillStyle = navy;
  for (let i = 0; i < axes; i++) {
    const angle = startAngle + angleStep * i;
    const labelR = maxR + 24;
    const px = cx + Math.cos(angle) * labelR;
    const py = cy + Math.sin(angle) * labelR;

    // alignment based on position
    if (Math.abs(Math.cos(angle)) < 0.01) {
      ctx.textAlign = "center";
    } else if (Math.cos(angle) > 0) {
      ctx.textAlign = "left";
    } else {
      ctx.textAlign = "right";
    }
    if (Math.sin(angle) < -0.3) {
      ctx.textBaseline = "bottom";
    } else if (Math.sin(angle) > 0.3) {
      ctx.textBaseline = "top";
    } else {
      ctx.textBaseline = "middle";
    }

    ctx.fillText(DIMS[i], px, py);
  }

  // --- RAMS threshold polygon (dashed red, score=2 on every axis) ---
  const thresholdScore = 2;
  ctx.beginPath();
  ctx.setLineDash([6, 4]);
  for (let i = 0; i <= axes; i++) {
    const angle = startAngle + angleStep * (i % axes);
    const radius = (maxR / rings) * thresholdScore;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = "#dc2626";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // threshold label
  const threshLabelAngle = startAngle + angleStep * 3.5;
  const threshLabelR = (maxR / rings) * thresholdScore;
  ctx.font = "10px 'IBM Plex Sans', sans-serif";
  ctx.fillStyle = "#dc2626";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText(
    "RAMS threshold",
    cx + Math.cos(threshLabelAngle) * threshLabelR + 4,
    cy + Math.sin(threshLabelAngle) * threshLabelR - 2,
  );

  // --- activity polygons ---
  const activeArr = Array.from(activeIndices).sort((a, b) => a - b);
  for (const idx of activeArr) {
    const act = ACTIVITIES[idx];
    const color = COLORS[idx % COLORS.length];

    // filled polygon
    ctx.beginPath();
    for (let i = 0; i <= axes; i++) {
      const angle = startAngle + angleStep * (i % axes);
      const radius = (maxR / rings) * act.scores[i % axes];
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color + "20";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // vertex dots
    for (let i = 0; i < axes; i++) {
      const angle = startAngle + angleStep * i;
      const radius = (maxR / rings) * act.scores[i];
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
}

/* ══════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════ */

export function ActivityRiskProfile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeSet, setActiveSet] = useState<Set<number>>(() => {
    const s = new Set<number>();
    ACTIVITIES.forEach((a, i) => {
      if (a.defaultOn) s.add(i);
    });
    return s;
  });

  const [selectedRams, setSelectedRams] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  const toggle = useCallback((idx: number) => {
    setActiveSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  // draw / redraw
  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawRadar(canvasRef.current, activeSet);
    }
  }, [activeSet]);

  useEffect(() => {
    redraw();
    const onResize = () => redraw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [redraw]);

  // sorted activities by composite score descending
  const sorted = ACTIVITIES.map((a, i) => ({ ...a, idx: i })).sort(
    (a, b) => sum(b.scores) - sum(a.scores),
  );

  return (
    <div ref={containerRef} style={{ fontFamily: "inherit" }}>
      {/* ---- Toggle pills ---- */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {ACTIVITIES.map((act, i) => {
          const on = activeSet.has(i);
          return (
            <button
              key={act.name}
              onClick={() => toggle(i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "9999px",
                border: `1px solid ${on ? COLORS[i % COLORS.length] : "var(--border-color)"}`,
                background: on ? COLORS[i % COLORS.length] + "12" : "transparent",
                color: on ? COLORS[i % COLORS.length] : "var(--text-tertiary)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: COLORS[i % COLORS.length],
                  opacity: on ? 1 : 0.35,
                }}
              />
              {act.name}
            </button>
          );
        })}
      </div>

      {/* ---- Main layout: radar + score table ---- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "55% 45%" : "1fr",
          gap: "32px",
        }}
      >
        {/* Radar */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>

        {/* Score table + dimension reference */}
        <div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid var(--border-color)",
                }}
              >
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px 8px 8px 0",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Activity
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Score
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px 0 8px 8px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  RAMS
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((act) => {
                const total = sum(act.scores);
                const required = total >= THRESHOLD;
                const on = activeSet.has(act.idx);
                const clickable = required && act.rams;
                const isSelected = selectedRams === act.idx;

                return (
                  <tr
                    key={act.name}
                    onClick={() => {
                      if (clickable) {
                        setSelectedRams(isSelected ? null : act.idx);
                      }
                    }}
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                      opacity: on ? 1 : 0.4,
                      cursor: clickable ? "pointer" : "default",
                      background: isSelected ? "var(--band-background)" : "transparent",
                      transition: "opacity 0.15s, background 0.15s",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 8px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: COLORS[act.idx % COLORS.length],
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>
                        {act.name}
                      </span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px 8px",
                        fontVariantNumeric: "tabular-nums",
                        color: "var(--text-primary)",
                      }}
                    >
                      {total}/35
                    </td>
                    <td style={{ textAlign: "center", padding: "10px 0 10px 8px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 10px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background: required ? "#dc262615" : "#16a34a15",
                          color: required ? "#dc2626" : "#16a34a",
                        }}
                      >
                        {required ? "Required" : "Below"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Dimension reference */}
          <div
            style={{
              marginTop: "20px",
              padding: "12px 0",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--text-tertiary)",
                marginBottom: "6px",
              }}
            >
              Dimensions
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2px 16px",
                fontSize: "12px",
                color: "var(--text-tertiary)",
              }}
            >
              {DIMS.map((d, i) => (
                <span key={d}>
                  D{i + 1}. {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- RAMS preview panel ---- */}
      {selectedRams !== null && ACTIVITIES[selectedRams].rams && (
        <RamsPanel
          activity={ACTIVITIES[selectedRams]}
          color={COLORS[selectedRams % COLORS.length]}
          onClose={() => setSelectedRams(null)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   RAMS PREVIEW PANEL
   ══════════════════════════════════════════════════ */

function RamsPanel({
  activity,
  color,
  onClose,
}: {
  activity: Activity;
  color: string;
  onClose: () => void;
}) {
  const rams = activity.rams!;

  return (
    <div
      style={{
        marginTop: "24px",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          background: "var(--brand-navy)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: color,
              border: "2px solid rgba(255,255,255,0.5)",
            }}
          />
          <span style={{ fontWeight: 600, fontSize: "15px" }}>{activity.name}</span>
          <span
            style={{
              padding: "2px 10px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 500,
              background: "rgba(255,255,255,0.15)",
              color: "var(--brand-gold)",
            }}
          >
            Stage 2 — Risk &amp; Operations
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            padding: "4px",
            fontFamily: "inherit",
          }}
          aria-label="Close RAMS preview"
        >
          &times;
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "0",
          padding: "0",
        }}
      >
        <Row label="Risk" value={rams.risk} />
        <Row label="Domain" value={rams.domain} />
        <Row label="Consequence" value={rams.consequence} />
        <Row label="Inherent risk">
          <RiskBadge band={rams.inherent} />
        </Row>
        <Row label="Controls">
          <ul style={{ margin: 0, paddingLeft: "16px", listStyle: "none" }}>
            {rams.controls.map((c, i) => (
              <li
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: "4px",
                  marginBottom: i < rams.controls.length - 1 ? "4px" : 0,
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color: "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "-14px",
                    top: "6px",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--brand-gold)",
                  }}
                />
                {c}
              </li>
            ))}
          </ul>
        </Row>
        <Row label="Residual risk">
          <RiskBadge band={rams.residual} />
        </Row>
        <Row label="Incident response" value={rams.incident} last />
      </div>
    </div>
  );
}

/* ── row + badge helpers ── */

function Row({
  label,
  value,
  children,
  last,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        borderBottom: last ? "none" : "1px solid var(--border-color)",
        padding: "12px 20px",
        gap: "12px",
        alignItems: "start",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "var(--text-tertiary)",
          paddingTop: "2px",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--text-primary)" }}>
        {children ?? value}
      </span>
    </div>
  );
}

function RiskBadge({ band }: { band: RiskBand }) {
  const { bg, text } = bandColor(band.band);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          display: "inline-block",
          padding: "2px 10px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          background: bg,
          color: text,
          textTransform: "capitalize",
        }}
      >
        {band.band}
      </span>
      <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
        {band.likelihood} / {band.severity} (score {band.score})
      </span>
    </span>
  );
}
