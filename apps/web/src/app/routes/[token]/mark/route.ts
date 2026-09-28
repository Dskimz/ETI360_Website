import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { loadRouteConfig, readPrivateFile, publicSet } from "@/lib/routes/access";

/* GET /routes/{token}/mark — the school's logo. The password form shows it,
   so this is the one file under /routes/{token} served without the cookie;
   it is the school's public mark and carries nothing of the route set. */

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const config = await loadRouteConfig(token);
  if (!config) return new NextResponse("Not found", { status: 404 });
  const set = publicSet(config);
  const png = await readPrivateFile(set, set.brand.mark.file);
  if (!png) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "private, max-age=3600" },
  });
}
