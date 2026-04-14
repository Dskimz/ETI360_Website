import Link from "next/link";

export interface HeroProps {
  eyebrow?: string | null;
  headline?: string;
  headlineParts?: Array<{ text: string; gold: boolean }>;
  subhead: string;
  cta?: { label: string; href: string } | null;
  ctaSecondary?: { label: string; href: string } | null;
  image?: string | null;
}

export function HeroSection({
  eyebrow,
  headline,
  headlineParts,
  subhead,
  cta,
  ctaSecondary,
  image,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[var(--brand-navy)]/88" />
        </div>
      )}
      <div className={`relative section-padding ${image ? "py-32 md:py-40" : ""}`}>
        <div className="container-narrow">
          {eyebrow && (
            <div className="mb-5">
              <hr className="hero-rule" />
              <p className="eyebrow">{eyebrow}</p>
            </div>
          )}
          <h1 className={`heading-display max-w-4xl ${image ? "text-white" : ""}`}>
            {headlineParts
              ? headlineParts.map((part, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    {part.gold ? (
                      <span className="gold">{part.text}</span>
                    ) : (
                      part.text
                    )}
                    {i < headlineParts.length - 1 && <br />}
                  </span>
                ))
              : headline}
          </h1>
          <p
            className={`mt-7 max-w-2xl text-xl leading-relaxed ${
              image ? "text-white/75" : "body-text-secondary"
            }`}
          >
            {subhead}
          </p>
          {(cta || ctaSecondary) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {cta && (
                <Link
                  href={cta.href}
                  className="btn-primary"
                  style={{
                    background: "var(--brand-gold)",
                    color: "var(--brand-navy)",
                  }}
                >
                  {cta.label}
                </Link>
              )}
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="btn-secondary"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#ffffff",
                  }}
                >
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
