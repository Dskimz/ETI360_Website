import Link from "next/link";

/* ══════════════════════════════════════════════════
   SECTION INTRO — eyebrow + heading + 1 sentence
   ══════════════════════════════════════════════════ */

export function SectionIntro({
  eyebrow,
  headline,
  lead,
}: {
  eyebrow?: string;
  headline?: string;
  lead?: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {headline && <h2 className="heading-section mb-4">{headline}</h2>}
      {lead && <p className="section-intro-lead">{lead}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OUTPUT CARD — title + gold-dot bullet list
   Used in 2–3 column grids
   ══════════════════════════════════════════════════ */

export function OutputCard({
  title,
  outputs,
}: {
  title: string;
  outputs: string[];
}) {
  return (
    <div className="output-card">
      <h3 className="output-card-title">{title}</h3>
      <ul>
        {outputs.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function OutputCardGrid({
  eyebrow,
  headline,
  lead,
  cards,
  columns,
  band,
  id,
}: {
  eyebrow?: string;
  headline?: string;
  lead?: string;
  cards: Array<{ title: string; outputs: string[] }>;
  columns?: 2 | 3;
  band?: boolean;
  id?: string;
}) {
  const cols = columns === 3 ? "lg:grid-cols-3" : "";
  return (
    <section
      id={id}
      className={`section-padding ${band ? "section-band" : ""}`}
    >
      <div className="container-narrow">
        <SectionIntro eyebrow={eyebrow} headline={headline} lead={lead} />
        <div className={`grid gap-6 md:grid-cols-2 ${cols}`}>
          {cards.map((card) => (
            <OutputCard key={card.title} title={card.title} outputs={card.outputs} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   OUTPUT PANEL — gold-topped panel with bullet list
   Full-width, used for single-column emphasis blocks
   ══════════════════════════════════════════════════ */

export function OutputPanel({
  eyebrow,
  headline,
  statement,
  outputs,
  band,
}: {
  eyebrow?: string;
  headline?: string;
  statement: string;
  outputs: string[];
  band?: boolean;
}) {
  return (
    <section className={`section-padding ${band ? "section-band" : ""}`}>
      <div className="container-narrow">
        <div className="max-w-3xl">
          <SectionIntro eyebrow={eyebrow} headline={headline} />
          <p className="section-intro-lead mb-8">{statement}</p>
          <div className="output-panel">
            <ul>
              {outputs.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   PROCESS STEPS — numbered steps with containment
   ══════════════════════════════════════════════════ */

export function ProcessSteps({
  eyebrow,
  headline,
  steps,
  band,
}: {
  eyebrow?: string;
  headline?: string;
  steps: Array<{ number: number; title: string; body: string }>;
  band?: boolean;
}) {
  return (
    <section className={`section-padding ${band ? "section-band" : ""}`}>
      <div className="container-narrow">
        <SectionIntro eyebrow={eyebrow} headline={headline} />
        <div className="process-steps-container">
          {steps.map((step, i) => (
            <div key={step.number} className="process-step">
              <div className="process-step-marker">
                <div className="process-step-number">{step.number}</div>
                {i < steps.length - 1 && <div className="process-step-line" />}
              </div>
              <div className="process-step-content">
                <p className="process-step-title">{step.title}</p>
                <p className="process-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   COMPARISON TABLE — before / after
   ══════════════════════════════════════════════════ */

export function ComparisonTable({
  eyebrow,
  headline,
  rows,
  band,
}: {
  eyebrow?: string;
  headline?: string;
  rows: Array<{ before: string; after: string }>;
  band?: boolean;
}) {
  return (
    <section className={`section-padding ${band ? "section-band" : ""}`}>
      <div className="container-narrow">
        <SectionIntro eyebrow={eyebrow} headline={headline} />
        <div className="overflow-x-auto">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Unstructured</th>
                <th>With ETI360</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="comparison-before">{row.before}</td>
                  <td className="comparison-after">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   STAGE TABLE — governance stages overview
   ══════════════════════════════════════════════════ */

export function StageTable({
  eyebrow,
  headline,
  rows,
  band,
}: {
  eyebrow?: string;
  headline?: string;
  rows: Array<{ stage: string; structured: string; output: string }>;
  band?: boolean;
}) {
  return (
    <section className={`section-padding ${band ? "section-band" : ""}`}>
      <div className="container-narrow">
        <SectionIntro eyebrow={eyebrow} headline={headline} />
        <div className="overflow-x-auto">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>What is Structured</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: "var(--brand-navy)" }}>
                    {row.stage}
                  </td>
                  <td>{row.structured}</td>
                  <td style={{ fontWeight: 500, color: "var(--brand-navy)" }}>
                    {row.output}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CTA BLOCK — navy background, centered
   ══════════════════════════════════════════════════ */

export function CtaBlock({
  headline,
  body,
  cta,
}: {
  headline: string;
  body: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="section-padding section-band-dark">
      <div className="container-narrow text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{headline}</h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">{body}</p>
        <Link
          href={cta.href}
          className="btn-primary"
          style={{ background: "var(--brand-gold)", color: "var(--brand-navy)" }}
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
