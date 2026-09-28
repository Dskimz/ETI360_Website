import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookieName, hasAccess, loadRouteConfig, publicSet, readPrivateFile } from "@/lib/routes/access";

/* GET /routes/{token}/cards/{half-letter|a5} — the pocket route card PDFs,
   served only with the route's cookie. Without it the visitor goes back to
   the password form. The PDFs sit in the route's private folder, copied from
   V3 by `npm run sync:route-private` once they are built; until then this
   answers 404 "in preparation" (the page shows the same). */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string; edition: string }> }) {
  const { token, edition } = await params;
  const config = await loadRouteConfig(token);
  if (!config) return new NextResponse("Not found", { status: 404 });
  if (!hasAccess(config, req.cookies.get(cookieName(token))?.value)) {
    return new NextResponse(null, { status: 303, headers: { Location: `/routes/${token}`, "Cache-Control": "no-store" } });
  }
  const set = publicSet(config);
  const card = set.cards.find((c) => c.slug === edition);
  if (!card) return new NextResponse("Not found", { status: 404 });
  const pdf = await readPrivateFile(set, card.file);
  if (!pdf) {
    return new NextResponse("This edition is in preparation.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${card.downloadName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
