"use client";

/* ── Step data ── */
interface VerificationBadge {
  label: string;
  color: string;
}

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
  badges: VerificationBadge[];
  highlight?: boolean;
}

const steps: WorkflowStep[] = [
  {
    number: 1,
    title: "Intake & Standardisation",
    description:
      "Raw itinerary documents submitted. ETI360 converts to structured activity ledger — every minute, location, and transport leg resolved.",
    badges: [{ label: "ETI360", color: "#0d3558" }],
  },
  {
    number: 2,
    title: "Data Verification",
    description:
      "School and provider review the structured ledger. Confirm locations, timings, and activities are accurate. Three-way sign-off before assessment begins.",
    badges: [
      { label: "ETI360", color: "#0d3558" },
      { label: "School", color: "#1a5c3a" },
      { label: "Provider", color: "#374151" },
    ],
    highlight: true,
  },
  {
    number: 3,
    title: "Intelligence Production",
    description:
      "Activity Risk Profiles scored. Location intelligence mapped. Compliance assessed. Stress test simulated. All intelligence generated from the verified ledger.",
    badges: [{ label: "ETI360", color: "#0d3558" }],
  },
  {
    number: 4,
    title: "Delivery & Governance",
    description:
      "Complete intelligence package delivered. Trip Options Brief, RAMS documentation, compliance scorecard, stress test results — structured evidence for the approval decision.",
    badges: [
      { label: "ETI360", color: "#0d3558" },
      { label: "School", color: "#1a5c3a" },
    ],
  },
];

/* ── Icons (inline SVG paths) ── */
const icons: Record<number, JSX.Element> = {
  1: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  2: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  3: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  4: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
};

/* ── Checkmark for badges ── */
function Check() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Component ── */
export function WorkflowDiagram() {
  return (
    <div style={{ position: "relative", padding: "0 0 0 0" }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;

        return (
          <div
            key={step.number}
            style={{
              display: "flex",
              gap: 24,
              position: "relative",
              paddingBottom: isLast ? 0 : 32,
            }}
          >
            {/* ── Timeline column ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              {/* Numbered circle */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "var(--brand-navy, #0d3558)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: 15,
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                {icons[step.number]}
              </div>
              {/* Gold connecting line */}
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    backgroundColor: "var(--brand-gold, #C9A24D)",
                    marginTop: 4,
                  }}
                />
              )}
            </div>

            {/* ── Content card ── */}
            <div
              style={{
                flex: 1,
                padding: "16px 20px",
                borderRadius: 6,
                backgroundColor: step.highlight ? "var(--band-background, #f7f7f8)" : "transparent",
                borderLeft: step.highlight ? "3px solid var(--brand-gold, #C9A24D)" : "3px solid transparent",
                marginTop: -4,
              }}
            >
              {/* Step label */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
                  marginBottom: 4,
                }}
              >
                Step {step.number}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "var(--text-primary, #1a1a2e)",
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--text-tertiary, rgba(13, 53, 88, 0.6))",
                  marginBottom: 12,
                }}
              >
                {step.description}
              </div>

              {/* Verification badges */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {step.badges.map((badge) => (
                  <span
                    key={badge.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "3px 10px 3px 8px",
                      borderRadius: 100,
                      backgroundColor: badge.color,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}
                  >
                    <Check />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
