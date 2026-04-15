"use client";

const HAZARDS = [
  { hazard: "Raft capsize in Grade III rapids", domain: "Water", consequence: "Submersion, impact injury, panic", risk: "High" },
  { hazard: "Entrapment in river features", domain: "Water", consequence: "Drowning, hypothermia", risk: "High" },
  { hazard: "Impact with rocks/debris", domain: "Physical", consequence: "Fractures, lacerations", risk: "Medium" },
  { hazard: "Participant fatigue/cold", domain: "Environmental", consequence: "Reduced capacity, poor decisions", risk: "Medium" },
  { hazard: "Equipment failure", domain: "Equipment", consequence: "Loss of control, submersion", risk: "Medium" },
];

const CONTROLS = [
  { verb: "Require", text: "all participants to pass a swim competency assessment before departure. Non-swimmers assigned to calmer sections with 1:2 guide ratio." },
  { verb: "Brief", text: "all participants on capsize drill, whistle signals, and defensive swimming position. Briefing delivered by lead guide, minimum 20 minutes." },
  { verb: "Assign", text: "one certified swift-water rescue technician per raft (max 6 participants). Guide-to-participant ratio: 1:6." },
  { verb: "Inspect", text: "all PFDs, helmets, and paddles before launch. Remove any equipment showing wear on straps, buckles, or shell integrity." },
  { verb: "Halt", text: "activity if river flow exceeds 45 cumecs at the Kiulu gauge station, or if thunderstorm activity is detected within 15km." },
];

const DETAILS = [
  { label: "Activity", value: "White-Water Rafting (Grade III)" },
  { label: "Location", value: "Kiulu River, Sabah, Borneo" },
  { label: "Duration", value: "3.5 hours" },
  { label: "Provider", value: "Riverbug Borneo" },
];

const INCIDENT = [
  { label: "Primary", text: "River extraction to nearest bank. First aid assessment on site." },
  { label: "Escalation", text: "Activate Kiulu River rescue protocol. Notify Queen Elizabeth Hospital Kota Kinabalu (52 min drive)." },
  { label: "Communication", text: "Satellite phone carried by lead guide. Mobile coverage intermittent in gorge sections." },
];

function RiskBadge({ level }: { level: "High" | "Medium" | "Low" }) {
  const colors = {
    High: { bg: "rgba(192,57,43,0.1)", fg: "#c0392b" },
    Medium: { bg: "rgba(212,135,12,0.1)", fg: "#d4870c" },
    Low: { bg: "rgba(29,158,117,0.1)", fg: "#1d9e75" },
  };
  const c = colors[level];
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: 600,
      background: c.bg,
      color: c.fg,
      lineHeight: "20px",
    }}>
      {level}
    </span>
  );
}

export function RAMSPreview() {
  const cellBase: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: "13px",
    color: "var(--text-primary, #1a1a2e)",
    borderBottom: "1px solid var(--border-color, #e5e7eb)",
    verticalAlign: "top",
  };

  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      borderRadius: "8px",
      overflow: "hidden",
      border: "1px solid var(--border-color, #e5e7eb)",
      background: "var(--page-background, #fff)",
    }}>
      {/* ── Header ── */}
      <div style={{
        background: "var(--brand-navy, #0d3558)",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <span style={{ color: "#fff", fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em" }}>
          RAMS Entry — White-Water Rafting
        </span>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(201,162,77,0.15)",
          border: "1px solid rgba(201,162,77,0.4)",
          borderRadius: "4px",
          padding: "4px 12px",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--brand-gold, #C9A24D)",
        }}>
          ARP Score: 25/35
        </span>
      </div>

      {/* ── Activity details ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        borderBottom: "1px solid var(--border-color, #e5e7eb)",
        background: "var(--band-background, #f7f7f8)",
      }}>
        {DETAILS.map((d) => (
          <div key={d.label} style={{ padding: "12px 24px" }}>
            <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-tertiary, rgba(13,53,88,0.6))", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "2px" }}>
              {d.label}
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary, #1a1a2e)" }}>
              {d.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Hazard identification table ── */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand-navy, #0d3558)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Hazard Identification
        </div>
      </div>
      <div style={{ overflowX: "auto", padding: "0 24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--band-background, #f7f7f8)" }}>
              {["Hazard", "Domain", "Consequence", "Inherent Risk"].map((h) => (
                <th key={h} style={{
                  ...cellBase,
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--text-tertiary, rgba(13,53,88,0.6))",
                  textAlign: "left",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HAZARDS.map((h) => (
              <tr key={h.hazard}>
                <td style={{ ...cellBase, fontWeight: 500 }}>{h.hazard}</td>
                <td style={cellBase}>{h.domain}</td>
                <td style={cellBase}>{h.consequence}</td>
                <td style={cellBase}>
                  <RiskBadge level={h.risk as "High" | "Medium"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Controls ── */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand-navy, #0d3558)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Controls
        </div>
      </div>
      <div style={{
        margin: "0 24px 20px",
        borderLeft: "3px solid var(--brand-gold, #C9A24D)",
        paddingLeft: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}>
        {CONTROLS.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{
              flexShrink: 0,
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "var(--brand-navy, #0d3558)",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1px",
            }}>
              {i + 1}
            </span>
            <span style={{ fontSize: "13px", lineHeight: "20px", color: "var(--text-primary, #1a1a2e)" }}>
              <span style={{ fontWeight: 600, color: "var(--brand-navy, #0d3558)" }}>{c.verb}</span>{" "}
              {c.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── Residual risk ── */}
      <div style={{
        margin: "0 24px",
        padding: "12px 16px",
        background: "var(--band-background, #f7f7f8)",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary, #1a1a2e)" }}>
          Residual Risk (after controls)
        </span>
        <RiskBadge level="Medium" />
      </div>

      {/* ── Incident response ── */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand-navy, #0d3558)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Incident Response
        </div>
      </div>
      <div style={{
        margin: "0 24px 24px",
        border: "1px solid var(--border-color, #e5e7eb)",
        borderRadius: "6px",
        overflow: "hidden",
      }}>
        {INCIDENT.map((item, i) => (
          <div key={item.label} style={{
            padding: "12px 16px",
            borderBottom: i < INCIDENT.length - 1 ? "1px solid var(--border-color, #e5e7eb)" : "none",
            display: "flex",
            gap: "12px",
            alignItems: "baseline",
          }}>
            <span style={{
              flexShrink: 0,
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--text-tertiary, rgba(13,53,88,0.6))",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              minWidth: "110px",
            }}>
              {item.label}
            </span>
            <span style={{ fontSize: "13px", lineHeight: "20px", color: "var(--text-primary, #1a1a2e)" }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
