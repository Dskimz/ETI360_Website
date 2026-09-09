import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Shared reviewer password for the unlisted campaign pages and the Users
// Guides (Dan, 2026-09-04). Username is ignored; any value works.
const REVIEW_PASSWORD = "Goodtimes2026";

// The exact set the basic-auth gate covers. Everything else on the site is
// public and only ever passes through the campaign logger below.
const AUTH_PAGES = new Set([
  "/review",
  "/review/index.html",
  "/review/marketing-2026-09.html",
  "/review/email-list.html",
  "/review/email-arms.html",
  "/review/school-review.html",
]);

function isAuthPath(pathname: string) {
  return AUTH_PAGES.has(pathname) || pathname === "/guides" || pathname.startsWith("/guides/");
}

// ---------------------------------------------------------------------------
// M1.3 — campaign visit log (dev/schools-email/MEASUREMENT-PLAN.md, 2026-09-09)
//
// Every wave-1 email link carries utm_source=email, utm_content=<arm-slug> and
// utm_term=<school_id>. This records one row per navigation that arrives with
// those tags, server-side, taking the visitor's city from the Vercel edge
// headers. Vercel Web Analytics has no city dimension at any plan and puts UTM
// filtering behind Web Analytics Plus, which is why this exists.
//
// Deliberate boundaries:
//   - Navigations only. Asset requests are never logged, so the email's hosted
//     images never become an open pixel (decision 3 in the plan).
//   - School slug, arm code, path, city, region, country, agent class. Never a
//     name, an email address, or an IP.
//   - Add ?nolog=1 to any link to suppress a row (our own link checks).
// ---------------------------------------------------------------------------

// Column order is the contract shared with the Google Form and the M1.7
// dashboard. Timestamp comes from the Form's own response column, and
// seconds_since_send is derived at dashboard time against campaign.sent_at.
const COLUMNS = ["event", "school", "arm", "path", "city", "region", "country", "agent", "utm"] as const;
type Row = Record<(typeof COLUMNS)[number], string>;

// Set both in Vercel, then redeploy: middleware env is bound at build time.
//   CAMPAIGN_LOG_ENDPOINT — the Google Form .../formResponse URL
//   CAMPAIGN_LOG_ENTRIES  — its nine entry ids, comma separated, in COLUMNS order
const LOG_ENDPOINT = process.env.CAMPAIGN_LOG_ENDPOINT;
const LOG_ENTRIES = process.env.CAMPAIGN_LOG_ENTRIES;

// Fallback sink so a wave is never lost to an unconfigured form. Uses the
// Resend key the contact route already relies on.
const RESEND_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "ETI360 Website <onboarding@resend.dev>";
const SIGNAL_TO = "danskimin@eti360.com";

const ARM_BY_SLUG: Record<string, string> = {
  hos: "HOS",
  hsa: "HS-A",
  hsb: "HS-B",
  hsc: "HS-C",
  es: "ES",
  ad: "AD",
};

// Mail security scanners and link previewers follow every link in a cold email
// within seconds of delivery. UA matching catches the honest ones; the rest are
// caught at dashboard time by seconds_since_send.
const BOT_UA =
  /bot|crawl|spider|slurp|preview|scan|fetch|monitor|curl|wget|python-requests|headless|phantom|lighthouse|facebookexternalhit|whatsapp|slackbot|telegram|discord|proofpoint|mimecast|barracuda|forcepoint|urldefense|safelinks|bitdefender|symantec/i;

function decode(value: string | null) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function armFrom(utmContent: string, explicitArm: string) {
  if (explicitArm) return explicitArm.toUpperCase();
  if (!utmContent) return "";
  if (utmContent === "signature") return "signature";
  return ARM_BY_SLUG[utmContent.split("-")[0]] || utmContent;
}

function classifyAgent(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (!ua) return "no-ua";
  if (BOT_UA.test(ua)) return "bot-ua";
  // Real browsers have sent Sec-Fetch-* on navigations for years. Its absence
  // is the strongest cheap tell that something automated followed the link.
  if (!req.headers.get("sec-fetch-mode")) return "no-sec-fetch";
  return "browser";
}

function buildRow(req: NextRequest): Row | null {
  if (req.method !== "GET") return null;

  const { pathname, searchParams } = req.nextUrl;
  if (searchParams.get("nolog") === "1") return null;

  // Navigations only. Missing sec-fetch-dest is allowed through (older clients
  // and scanners both do it) and shows up in the agent column instead.
  const dest = req.headers.get("sec-fetch-dest");
  if (dest && dest !== "document") return null;

  const tagged = searchParams.get("utm_source") === "email";
  const explicitArm = searchParams.get("arm") || "";
  const isUnsubscribe = pathname === "/unsubscribe";
  // The unsubscribe link carries ?arm=&school= rather than the UTM triplet, so
  // both event types land in one stream (M1.4).
  if (!tagged && !(isUnsubscribe && explicitArm)) return null;

  const utmContent = searchParams.get("utm_content") || "";
  const school = searchParams.get("utm_term") || searchParams.get("school") || "";

  return {
    event: isUnsubscribe ? "unsubscribe" : "visit",
    school,
    arm: armFrom(utmContent, explicitArm),
    path: pathname,
    city: decode(req.headers.get("x-vercel-ip-city")),
    region: decode(req.headers.get("x-vercel-ip-country-region")),
    country: decode(req.headers.get("x-vercel-ip-country")),
    agent: classifyAgent(req),
    utm: req.nextUrl.search.replace(/^\?/, ""),
  };
}

async function postToForm(row: Row) {
  if (!LOG_ENDPOINT || !LOG_ENTRIES) return false;
  const ids = LOG_ENTRIES.split(",").map((id) => id.trim()).filter(Boolean);
  if (ids.length !== COLUMNS.length) {
    console.error(`[campaign-signal] CAMPAIGN_LOG_ENTRIES has ${ids.length} ids, expected ${COLUMNS.length}`);
    return false;
  }
  const body = new URLSearchParams();
  COLUMNS.forEach((column, i) => body.append(ids[i], row[column]));
  const res = await fetch(LOG_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  return res.ok;
}

async function emailRow(row: Row) {
  if (!RESEND_KEY || row.agent === "bot-ua") return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${RESEND_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: SIGNAL_TO,
      subject: `[signal] ${row.event} · ${row.school || "unknown school"} · ${row.city || "unknown city"}`,
      text: COLUMNS.map((column) => `${column.padEnd(8)} ${row[column] || "(none)"}`).join("\n"),
    }),
  });
  return res.ok;
}

async function record(row: Row) {
  // Always leave a runtime log line: it is the last resort if both sinks fail.
  console.log(`[campaign-signal] ${JSON.stringify(row)}`);
  try {
    if (await postToForm(row)) return;
    await emailRow(row);
  } catch (error) {
    console.error(`[campaign-signal] sink failed: ${String(error)}`);
  }
}

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (isAuthPath(pathname)) {
    const auth = req.headers.get("authorization");
    if (auth?.startsWith("Basic ")) {
      try {
        const decoded = atob(auth.slice(6));
        const pass = decoded.slice(decoded.indexOf(":") + 1);
        if (pass === REVIEW_PASSWORD) {
          if ((pathname.startsWith("/guides") || pathname === "/review") && !/\.[a-z0-9]+$/i.test(pathname)) {
            // public/ files don't auto-serve directory indexes, and Next strips
            // trailing slashes before middleware runs — send folder URLs to
            // their explicit index.html so relative asset paths resolve.
            const url = req.nextUrl.clone();
            url.pathname = pathname.replace(/\/$/, "") + "/index.html";
            return NextResponse.redirect(url);
          }
          return NextResponse.next();
        }
      } catch {
        // fall through to the challenge
      }
    }
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="ETI360 review"' },
    });
  }

  const row = buildRow(req);
  // waitUntil so the sink never delays the page the prospect is waiting on.
  if (row) event.waitUntil(record(row));
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Basic-auth gate. Listed file by file so the rest of public/ stays public.
    "/review",
    "/review/index.html",
    "/review/marketing-2026-09.html",
    "/review/email-list.html",
    "/review/email-arms.html",
    "/review/school-review.html",
    "/guides/:path*",
    // Campaign logger. Every navigable route, minus Next internals, the API,
    // and anything with a file extension (assets and the static HTML drafts).
    "/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
