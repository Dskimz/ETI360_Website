"use client";

/* ══════════════════════════════════════════════════
   SINGAPORE LOCATION INTELLIGENCE
   GESS day trips — all activity locations + hospitals
   ══════════════════════════════════════════════════ */

const locations: {
  name: string;
  tag: "Activity" | "School" | "Hospital";
  day?: string;
  nearestHospital?: string;
  driveTime?: string;
  distance?: string;
}[] = [
  { name: "GESS (German European School)", tag: "School", nearestHospital: "—", driveTime: "—", distance: "Base" },
  { name: "Singapore Botanic Gardens", tag: "Activity", day: "D1", nearestHospital: "Gleneagles Hospital", driveTime: "3 min", distance: "1.2 km" },
  { name: "Singapore Zoo", tag: "Activity", day: "D2", nearestHospital: "Khoo Teck Puat Hospital", driveTime: "8 min", distance: "4.5 km" },
  { name: "Sungei Buloh Wetland Reserve", tag: "Activity", day: "D3", nearestHospital: "Woodlands Health Campus", driveTime: "15 min", distance: "12 km" },
  { name: "Changi Point Ferry Terminal", tag: "Activity", day: "D4", nearestHospital: "Changi General Hospital", driveTime: "12 min", distance: "8 km" },
  { name: "Gardens by the Bay", tag: "Activity", day: "D5", nearestHospital: "Singapore General Hospital", driveTime: "8 min", distance: "4 km" },
  { name: "Gleneagles Hospital", tag: "Hospital", distance: "1.2 km from Botanic Gardens" },
  { name: "Khoo Teck Puat Hospital", tag: "Hospital", distance: "4.5 km from Zoo" },
  { name: "Woodlands Health Campus", tag: "Hospital", distance: "12 km from Sungei Buloh" },
  { name: "Changi General Hospital", tag: "Hospital", distance: "8 km from Changi Point" },
  { name: "Singapore General Hospital", tag: "Hospital", distance: "4 km from Gardens by the Bay" },
];

export function SingaporeLocations() {
  const tagStyles: Record<string, { color: string; bg: string }> = {
    Activity: { color: "var(--brand-navy)", bg: "rgba(13,53,88,0.08)" },
    School: { color: "var(--brand-gold)", bg: "rgba(201,162,77,0.08)" },
    Hospital: { color: "#dc3545", bg: "rgba(220,53,69,0.08)" },
  };

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
          Singapore Day Trips — GESS
        </div>
        <div style={{ fontSize: "12px", opacity: 0.7 }}>
          5 activity destinations · 5 hospitals mapped · All locations within 15 min of emergency care
        </div>
      </div>

      {/* Map */}
      <div
        style={{
          borderLeft: "1px solid var(--border-color)",
          borderRight: "1px solid var(--border-color)",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/singapore-location-intel.png"
          alt="Singapore — GESS day trip locations with activity destinations and nearest hospitals"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Legend + Stats */}
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderTop: "none",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {[
            { label: "School", color: "#0d3558", icon: "★" },
            { label: "Activity", color: "#C9A24D", icon: "●" },
            { label: "Hospital", color: "#DC2626", icon: "+" },
          ].map((item) => (
            <div
              key={item.label}
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
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          {[
            { value: "11", label: "Locations mapped" },
            { value: "5", label: "Hospitals identified" },
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
                  letterSpacing: "-0.02em",
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
      </div>

      {/* Location cards */}
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
          overflow: "hidden",
        }}
      >
        {locations.map((loc, i) => {
          const style = tagStyles[loc.tag] || tagStyles.Activity;
          return (
            <div
              key={loc.name}
              style={{
                padding: "10px 20px",
                borderTop: i > 0 ? "0.5px solid var(--border-color)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "2px",
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
                      color: style.color,
                      background: style.bg,
                      padding: "2px 7px",
                      borderRadius: "8px",
                    }}
                  >
                    {loc.tag}
                  </span>
                  {loc.day && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {loc.day}
                    </span>
                  )}
                </div>
                {loc.tag === "Activity" && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-tertiary)",
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#dc3545", fontWeight: 600 }}>+</span>
                    <span>{loc.nearestHospital}</span>
                    <span style={{ fontWeight: 500 }}>·</span>
                    <span style={{ fontWeight: 600, color: "#1d9e75" }}>
                      {loc.driveTime}
                    </span>
                    <span>{loc.distance}</span>
                  </div>
                )}
                {loc.tag === "Hospital" && (
                  <div
                    style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
                  >
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
