import { HeroSection } from "@/components/HeroSection";
import { insightsPage } from "@/content/insights";

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
