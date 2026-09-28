import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookieName, hasAccess, loadRouteConfig, publicSet, readPrivateFile } from "@/lib/routes/access";

/* GET /routes/{token}/data/{file} — the route set's web bundle (the register
   and the geometry files), served only with the route's cookie. Only the file
   names the route set lists can be read. */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string; file: string }> }) {
  const { token, file } = await params;
  const config = await loadRouteConfig(token);
  if (!config) return new NextResponse("Not found", { status: 404 });
  if (!hasAccess(config, req.cookies.get(cookieName(token))?.value)) {
    return new NextResponse("Password required", { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const set = publicSet(config);
  const listed = [set.files.register, set.files.reference, ...set.files.trips];
  const body = listed.includes(file) ? await readPrivateFile(set, file) : null;
  if (!body) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(body), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
