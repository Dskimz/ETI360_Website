"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ActivityRiskProfile = dynamic(
  () => import("@/components/interactive/ActivityRiskProfile").then((m) => m.ActivityRiskProfile),
  { ssr: false }
);
const TripViews = dynamic(
  () => import("@/components/interactive/TripViews").then((m) => m.TripViews),
  { ssr: false }
);
const StressTest = dynamic(
  () => import("@/components/interactive/StressTest").then((m) => m.StressTest),
  { ssr: false }
);
const ComplianceScorecard = dynamic(
  () => import("@/components/interactive/ComplianceScorecard").then((m) => m.ComplianceScorecard),
  { ssr: false }
);
const Standardisation = dynamic(
  () => import("@/components/interactive/Standardisation").then((m) => m.Standardisation),
  { ssr: false }
);

const NAV_ITEMS = [
  { id: "activity-risk-profile", label: "Activity Risk Profile" },
  { id: "trip-views", label: "Trip Views" },
  { id: "stress-test", label: "Stress Test" },
  { id: "compliance", label: "Compliance" },
  { id: "standardisation", label: "Standardisation" },
] as const;

export default function SeeItPage() {
  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <>
      {/* Proposed update banner */}
      <div
        className="w-full py-2 px-4 text-center text-sm font-medium tracking-wide"
        style={{ backgroundColor: "var(--brand-navy)", color: "#fff" }}
      >
        <span className="uppercase mr-3">Proposed Update</span>
        <span className="opacity-70 mr-1">&mdash; comparing against current site</span>
        <Link
          href="/demo"
          className="underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity"
          style={{ color: "var(--brand-gold)" }}
        >
          View current &rarr;
        </Link>
      </div>

      {/* Opening frame */}
      <section className="section-padding">
        <div className="container-narrow text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-6" style={{ color: "var(--brand-gold)" }}>
            See It
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            This is a sample assessment of a Borneo Rainforest Expedition — a
            7-day Year 10 trip with 28 students. Every component below is
            produced from a single structured activity ledger.
          </p>
          <p className="body-text-secondary">
            This is what trip intelligence looks like.
          </p>
        </div>
      </section>

      {/* Sticky section nav */}
      <nav
        className="sticky top-0 z-40 w-full border-b backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="container-narrow overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max py-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  color:
                    activeSection === id
                      ? "var(--brand-navy)"
                      : "var(--text-tertiary)",
                }}
              >
                {label}
                {activeSection === id && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "var(--brand-gold)" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Activity Risk Profile */}
      <section
        id="activity-risk-profile"
        ref={(el) => { sectionRefs.current["activity-risk-profile"] = el; }}
        className="section-padding"
      >
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Activity Risk Profile</h2>
          <p className="body-text-secondary mb-8">
            Every activity scored across seven dimensions. Activities above
            threshold trigger full RAMS documentation.
          </p>
          <ActivityRiskProfile />
        </div>
      </section>

      {/* Trip Views */}
      <section
        id="trip-views"
        ref={(el) => { sectionRefs.current["trip-views"] = el; }}
        className="section-padding section-band"
      >
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Trip Views</h2>
          <p className="body-text-secondary mb-8">
            Multiple views of the same trip data — calendar, itinerary, route,
            location intelligence, transport routes, and weather.
          </p>
          <TripViews />
        </div>
      </section>

      {/* Stress Test */}
      <section
        id="stress-test"
        ref={(el) => { sectionRefs.current["stress-test"] = el; }}
        className="section-padding"
      >
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Trip Stress Test</h2>
          <p className="body-text-secondary mb-8">
            1,000 simulated iterations of your specific trip.
            Probability-weighted outcomes, not worst-case fear.
          </p>
          <StressTest />
        </div>
      </section>

      {/* Compliance Assessment */}
      <section
        id="compliance"
        ref={(el) => { sectionRefs.current["compliance"] = el; }}
        className="section-padding section-band"
      >
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Compliance Assessment</h2>
          <p className="body-text-secondary mb-8">
            ISO 31031 alignment scored across ten assessment dimensions.
          </p>
          <ComplianceScorecard />
        </div>
      </section>

      {/* Program Standardisation */}
      <section
        id="standardisation"
        ref={(el) => { sectionRefs.current["standardisation"] = el; }}
        className="section-padding"
      >
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Program Standardisation</h2>
          <p className="body-text-secondary mb-8">
            Raw provider itineraries converted to structured, verified activity
            ledgers.
          </p>
          <Standardisation />
        </div>
      </section>

      {/* Dual-audience CTA */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--band-background)" }}
      >
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schools CTA */}
            <div
              className="rounded-lg bg-white p-8"
              style={{
                borderTop: "4px solid var(--brand-navy)",
                border: "1px solid var(--border-color)",
                borderTopColor: "var(--brand-navy)",
                borderTopWidth: "4px",
              }}
            >
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Need this for your school&apos;s trips?
              </p>
              <Link
                href="/contact"
                className="inline-block font-medium transition-opacity hover:opacity-80"
                style={{ color: "var(--brand-navy)" }}
              >
                Start a conversation &rarr;
              </Link>
            </div>

            {/* Providers CTA */}
            <div
              className="rounded-lg bg-white p-8"
              style={{
                borderTop: "4px solid #2d8a4e",
                border: "1px solid var(--border-color)",
                borderTopColor: "#2d8a4e",
                borderTopWidth: "4px",
              }}
            >
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Want this in your proposals?
              </p>
              <Link
                href="/contact"
                className="inline-block font-medium transition-opacity hover:opacity-80"
                style={{ color: "#2d8a4e" }}
              >
                Start a conversation &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
