import { insightsPage } from "@/content/insights";

/* ── Shared Section Components ── */

function HeroSection({
  eyebrow,
  headline,
  subhead,
}: {
  eyebrow?: string | null;
  headline: string;
  subhead: string;
}) {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="heading-display max-w-3xl">{headline}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed body-text-secondary">
          {subhead}
        </p>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function InsightsPage() {
  return (
    <main>
      <HeroSection {...insightsPage.hero} />
      <section className="section-padding pt-0">
        <div className="container-narrow text-center">
          <div
            className="mx-auto max-w-xl rounded-sm border px-8 py-12"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p className="body-text" style={{ color: "var(--text-tertiary)" }}>
              Insights are coming soon. Check back for published briefings on trip
              governance, risk documentation, and institutional travel management.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
