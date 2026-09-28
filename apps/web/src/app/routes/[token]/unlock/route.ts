import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  SESSION_HOURS,
  clearMisses,
  clientAddress,
  cookieName,
  cookiePath,
  gateOpen,
  loadRouteConfig,
  newSessionValue,
  noteMiss,
  passwordMatches,
  tooManyMisses,
} from "@/lib/routes/access";

/* POST /routes/{token}/unlock — the password form's target. A match sets the
   route's cookie (HttpOnly, SameSite=Lax, path /routes/{token}, 12 hours) and
   returns to the page; a miss returns to the form with ?gate=wrong after a
   short pause. Too many misses from one address (or at one route) within the
   window return ?gate=wait without checking; a site with no session secret
   returns ?gate=closed and opens nothing. The view the visitor asked for
   (#white-mountains/day-2 and so on) rides along in a hidden field and comes
   back as the fragment. */

export const dynamic = "force-dynamic";

const VIEW = /^#[a-z0-9/-]{1,48}$/;
const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const config = await loadRouteConfig(token);
  if (!config) return new NextResponse("Not found", { status: 404 });

  let attempt = "";
  let view = "";
  try {
    const form = await req.formData();
    attempt = String(form.get("password") ?? "");
    view = String(form.get("view") ?? "");
  } catch {
    // An empty or malformed body is simply a wrong password.
  }

  // Relative Location headers: the page is reached on whatever host the
  // visitor used, and a redirect to another spelling of it (localhost against
  // 127.0.0.1, www against the bare domain) would leave the cookie behind.
  const hash = VIEW.test(view) ? view : "";
  const seeOther = (query: string) =>
    new NextResponse(null, {
      status: 303,
      headers: { Location: `/routes/${token}${query}${hash}`, "Cache-Control": "no-store" },
    });
  const answer = (gate: "wrong" | "wait" | "closed") => seeOther(`?gate=${gate}`);

  if (!gateOpen()) {
    console.error("[routes] ROUTES_SESSION_SECRET is not set; the private route pages stay closed");
    return answer("closed");
  }

  const address = clientAddress(req.headers);
  if (tooManyMisses(token, address)) {
    await pause(600);
    return answer("wait");
  }

  const matched = attempt && attempt.length <= 200 ? await passwordMatches(config, attempt) : false;
  if (matched === null) {
    await pause(600);
    return answer("wait");
  }
  if (!matched) {
    noteMiss(token, address);
    await pause(600);
    return answer("wrong");
  }

  const value = newSessionValue(config);
  if (!value) return answer("closed");
  clearMisses(token, address);
  const res = seeOther("");
  res.cookies.set({
    name: cookieName(token),
    value,
    httpOnly: true,
    sameSite: "lax",
    secure: req.nextUrl.protocol === "https:" || req.headers.get("x-forwarded-proto") === "https",
    path: cookiePath(token),
    maxAge: SESSION_HOURS * 3600,
  });
  return res;
}
