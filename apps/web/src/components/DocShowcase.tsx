import Link from "next/link";

/* Shared presentation for the audience pages: email-style tier bands,
   compact document rows with PDF click-through, and the auto-scrolling
   document strip. Band colors mirror the campaign email
   (T1 #0B2B47, T2 #1D6A95, T3 #3182AC). */

export type DocEntry = {
  anchor: string;
  stage: string;
  name: string;
  reader: string;
  desc: string;
  image: { src: string; alt: string };
  pdf?: string;
  wide?: boolean;
  pageHref?: string;
};

export function TierBand({
  n,
  eyebrow,
  name,
  desc,
}: {
  n: 1 | 2 | 3;
  eyebrow: string;
  name: string;
  desc: string;
}) {
  return (
    <section className={`tier-band tier-band-${n}`}>
      <div className="tier-band-inner">
        <span className="tier-band-numeral" aria-hidden="true">
          {n}
        </span>
        <div>
          <p className="tier-band-eyebrow ui">{eyebrow}</p>
          <h2>{name}</h2>
          <p className="tier-band-desc">{desc}</p>
        </div>
      </div>
    </section>
  );
}

export function DocRow({ e, eager }: { e: DocEntry; eager?: boolean }) {
  const thumbClass = `doc-row-thumb${e.wide ? " wide" : ""}`;
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={e.image.src} alt={e.image.alt} loading={eager ? undefined : "lazy"} />
  );
  return (
    <section id={e.anchor} className="doc-row">
      {e.pdf ? (
        <a
          href={e.pdf}
          target="_blank"
          rel="noopener"
          className={thumbClass}
          aria-label={`Open the ${e.name} PDF`}
        >
          {img}
        </a>
      ) : e.pageHref ? (
        <Link href={e.pageHref} className={thumbClass} aria-label={`Read the ${e.name} overview`}>
          {img}
        </Link>
      ) : (
        <div className={thumbClass}>{img}</div>
      )}
      <div className="doc-row-body">
        <p className="artifact-stage ui">{e.stage}</p>
        <h3 style={{ marginTop: 0 }}>{e.name}</h3>
        <p>{e.desc}</p>
        <p className="artifact-reader ui">
          <span className="artifact-reader-label">Read by</span> {e.reader}
        </p>
        {e.pdf && (
          <p>
            <a href={e.pdf} target="_blank" rel="noopener" className="cta-link ui">
              Open the PDF &rarr;
            </a>
          </p>
        )}
        {e.pageHref && (
          <p>
            <Link href={e.pageHref} className="cta-link ui">
              Read the full overview &rarr;
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

/* Auto-scrolling strip: drifts right to left, pauses on hover or focus,
   each thumbnail opens its document. Under prefers-reduced-motion the
   strip stops and becomes a normal horizontal scroller. */
export function DocMarquee({ items, label }: { items: DocEntry[]; label: string }) {
  const half = (hidden: boolean) => (
    <div className="doc-marquee-half" aria-hidden={hidden || undefined}>
      {items.map((e) =>
        e.pdf || e.pageHref ? (
          <a
            key={e.anchor}
            className="doc-marquee-item"
            href={e.pdf ?? e.pageHref}
            target={e.pdf ? "_blank" : undefined}
            rel={e.pdf ? "noopener" : undefined}
            tabIndex={hidden ? -1 : undefined}
            aria-label={e.pdf ? `Open the ${e.name} PDF` : `Read the ${e.name} overview`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.image.src} alt={hidden ? "" : e.image.alt} loading="lazy" />
          </a>
        ) : (
          <div key={e.anchor} className="doc-marquee-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.image.src} alt={hidden ? "" : e.image.alt} loading="lazy" />
          </div>
        ),
      )}
    </div>
  );
  return (
    <div className="doc-marquee" role="region" aria-label={label}>
      <div className="doc-marquee-track">
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}
