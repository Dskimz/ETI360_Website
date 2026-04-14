import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import {
  SectionIntro,
  OutputPanel,
  CtaBlock,
} from "@/components/Blocks";
import { homePage } from "@/content/home";

/* ── Trip Options Brief — document image + description ── */

function TripOptionsBrief() {
  const { eyebrow, headline, statement, outputs } = homePage.wedge;
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left: text */}
          <div>
            <SectionIntro eyebrow={eyebrow} headline={headline} />
            <p className="statement mb-8">{statement}</p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {outputs.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    paddingLeft: "1.25rem",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "0.55em",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--brand-gold)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Right: document image placeholder */}
          <div className="flex justify-center">
            <div
              style={{
                width: "100%",
                maxWidth: "360px",
                aspectRatio: "210 / 297",
                background: "var(--band-background)",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(2deg)",
                boxShadow:
                  "0 20px 60px rgba(13, 53, 88, 0.12), 0 8px 24px rgba(13, 53, 88, 0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-tertiary)",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                Trip Options Brief image
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Audience Routing — For Schools / For Trip Providers ── */

function AudienceRouting() {
  const { schools, providers } = homePage.audienceRouting;
  return (
    <section className="section-padding section-band">
      <div className="container-narrow">
        <div className="grid gap-8 md:grid-cols-2">
          {[schools, providers].map((audience) => (
            <div key={audience.eyebrow} className="output-card">
              <p className="eyebrow mb-4">{audience.eyebrow}</p>
              <p
                className="statement mb-6"
                style={{ fontSize: "1.125rem" }}
              >
                {audience.statement}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {audience.outputs.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: "var(--text-primary)",
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--brand-gold)",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href={audience.cta.href}
                  className="text-sm font-semibold"
                  style={{ color: "var(--brand-navy)" }}
                >
                  {audience.cta.label} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function HomePage() {
  return (
    <main>
      <HeroSection {...homePage.hero} />
      <TripOptionsBrief />
      <AudienceRouting />
      <OutputPanel
        eyebrow={homePage.independence.eyebrow}
        statement={homePage.independence.statement}
        outputs={homePage.independence.outputs}
      />
      <CtaBlock {...homePage.cta} />
    </main>
  );
}
