import type { Metadata } from "next";
import Link from "next/link";
import { CtaCard } from "@/components/CtaCard";
import { TripCard } from "@/components/TripCard";
import { TRIP_KINDS, trips, type TripKind } from "@/content/trips";
import { BRAND_EYEBROW, CLOSING_SENTENCE } from "@/content/voice";
import styles from "./trips.module.css";

/* The library of worked trips. Only built trips appear (src/content/trips/);
   no placeholders. The filter is plain links (?kind=city), rendered on the
   server, so it works without JavaScript. Only kinds that match at least one
   live trip are offered. There is no school-type filter (Dan, 2026-09-25: one
   approach for every school); each card still names its fictional school. */

export const metadata: Metadata = {
  title: "Trips",
  description:
    "Worked trips from ETI360: each page shows one trip and the documents prepared for it, decision by decision, every document open in full. The schools shown are fictional.",
  alternates: { canonical: "/trips" },
  openGraph: {
    title: "Trips — ETI360",
    description:
      "Worked trips from ETI360: each page shows one trip and the documents prepared for it, decision by decision, every document open in full.",
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

function kindParam(kind: TripKind): string {
  return kind.toLowerCase().replace(/\s+/g, "-");
}

function filterHref(kind: TripKind | null): string {
  return kind ? `/trips?kind=${kindParam(kind)}` : "/trips";
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={active ? `${styles.filterLink} ${styles.filterActive}` : styles.filterLink}
      aria-current={active ? "true" : undefined}
    >
      {children}
    </Link>
  );
}

type Props = { searchParams: Promise<{ kind?: string | string[] }> };

export default async function TripsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const kindQ = typeof sp.kind === "string" ? sp.kind : "";

  const kindOptions = TRIP_KINDS.filter((k) => trips.some((t) => t.tripKind === k));

  const kind = kindOptions.find((k) => kindParam(k) === kindQ) ?? null;

  const shown = trips.filter((t) => !kind || t.tripKind === kind);

  return (
    <>
      <section className="article-header">
        <div className="hero-inner">
          <p className="label label-light ui">{BRAND_EYEBROW}</p>
          <h1>Worked trips, document by document.</h1>
          <p className="subtitle">
            Each page shows one trip and the documents prepared for it, decision by decision, with
            every document open in full.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className={styles.wide}>
          <nav className={`${styles.filters} ui`} aria-label="Filter trips">
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Trip</span>
              <FilterLink href={filterHref(null)} active={!kind}>
                All trips
              </FilterLink>
              {kindOptions.map((k) => (
                <FilterLink key={k} href={filterHref(k)} active={kind === k}>
                  {k}
                </FilterLink>
              ))}
            </div>
          </nav>

          {shown.length === 0 ? (
            <p className={styles.empty}>
              No trips match this filter.{" "}
              <Link href="/trips" className="cta-link">
                All trips &rarr;
              </Link>
            </p>
          ) : (
            <div className={styles.library}>
              {shown.map((trip) => (
                <TripCard key={trip.slug} trip={trip} headingLevel={2} />
              ))}
            </div>
          )}
          {shown.length > 0 ? (
            <div className={`${styles.libraryNotes} ui`}>
              {Array.from(new Set(shown.map((t) => t.disclosure))).map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} />
    </>
  );
}
