import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { GateView } from "@/content/routes/types";
import {
  LIMIT_MINUTES,
  cookieName,
  hasAccess,
  loadBundle,
  loadRouteConfig,
  privateFileExists,
  publicSet,
} from "@/lib/routes/access";
import { BrandFrame } from "./_components/BrandFrame";
import { PasswordGate, type GateStatus } from "./_components/PasswordGate";
import { RouteDemo, type CardLink } from "./_components/RouteDemo";

/* /routes/{token} — a school's private route page (Dan, 2026-09-25: "Private
   link. But maybe we need a password."). The route's words, data and
   password hash come from the private store (src/lib/routes/store.ts), never
   from this repository. Without the route's cookie the page shows the
   school-branded password form and reads nothing else; with it, the page
   reads the web bundle on the server and hands it to the interactive view.
   Never in the sitemap, noindex in the meta and in the X-Robots-Tag header
   (next.config.ts), no ETI360 chrome and no site analytics
   (src/components/PublicOnly.tsx). */

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: { index: false, follow: false },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const config = await loadRouteConfig(token);
  const title = config ? `${config.school} · ${config.title}` : "Not found";
  return {
    title: { absolute: title },
    description: config ? `${config.school}: a private page.` : undefined,
    robots: ROBOTS,
    referrer: "strict-origin-when-cross-origin",
    openGraph: { title: config?.school ?? title, description: "A private page.", images: [] },
    twitter: { card: "summary", title: config?.school ?? title, description: "A private page.", images: [] },
  };
}

const STATUSES: GateStatus[] = ["wrong", "wait", "closed"];

export default async function RoutePage({ params, searchParams }: Props) {
  const { token } = await params;
  const config = await loadRouteConfig(token);
  if (!config) notFound();

  const jar = await cookies();
  if (!hasAccess(config, jar.get(cookieName(token))?.value)) {
    const query = await searchParams;
    const status = STATUSES.find((s) => s === query.gate) ?? null;
    // The form gets only what it shows: never the hash or the page's text.
    const gate: GateView = {
      token: config.token,
      title: config.title,
      notice: config.notice,
      preparedBy: config.preparedBy,
      brand: config.brand,
    };
    return (
      <BrandFrame brand={config.brand}>
        <PasswordGate gate={gate} status={status} waitMinutes={LIMIT_MINUTES} />
      </BrandFrame>
    );
  }

  const set = publicSet(config);
  const bundle = await loadBundle(set);
  const cards: CardLink[] = await Promise.all(
    set.cards.map(async (card) => ({
      slug: card.slug,
      label: card.label,
      size: card.size,
      href: `/routes/${token}/cards/${card.slug}`,
      available: await privateFileExists(set, card.file),
    })),
  );

  return (
    <BrandFrame brand={set.brand}>
      <RouteDemo
        set={set}
        bundle={bundle}
        cards={cards}
        mapbox={{
          token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
          style: process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/outdoors-v12",
        }}
      />
    </BrandFrame>
  );
}
