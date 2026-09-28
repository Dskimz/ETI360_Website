import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getVersion } from "@/content/versions";

/* Every document on the site opens through here (spec S6, S16):
   /open/{version}/{doc}?size=letter|a4 (optional &page=N). The route answers
   with a 302 to the PDF, so the open is a navigation the site can see.

   Where the PDF is:
     - DOCS_BASE_URL set (production: https://eti360-site-documents.s3.us-east-1.amazonaws.com,
       Dan 2026-09-25, scripts/s3/README.md): the S3 object whose key is the
       site path without its leading slash, trips/{slug}/{letter|a4}/{file}.pdf
       or docs/{file}.pdf, exactly what scripts/upload-docs-s3.py writes. Read
       at request time, so changing it needs no rebuild.
     - unset (local): the same path under public/.

   Two records per open:
     - one runtime log line ([pdf-open] in the Vercel logs, with the version,
       its product and the agent class), unless ?nolog=1 is on the open or
       on the page it was opened from; never for a HEAD request;
     - one campaign row when the visitor carries the email tags:
       src/middleware.ts matches this extensionless path (DOC_OPEN), and reads
       the tags from the referring page on this site when the link itself
       carries none.
   The old /trips/{slug}/open/{doc} links 308 here (next.config.ts). */

export const dynamic = "force-dynamic";

// The same agent classes the campaign logger uses (src/middleware.ts), so a
// [pdf-open] line can be read without the scanners and link previewers.
const BOT_UA =
  /bot|crawl|spider|slurp|preview|scan|fetch|monitor|curl|wget|python-requests|headless|phantom|lighthouse|facebookexternalhit|whatsapp|slackbot|telegram|discord|proofpoint|mimecast|barracuda|forcepoint|urldefense|safelinks|bitdefender|symantec/i;

function agentOf(req: NextRequest): string {
  const ua = req.headers.get("user-agent") || "";
  if (!ua) return "no-ua";
  if (BOT_UA.test(ua)) return "bot-ua";
  if (!req.headers.get("sec-fetch-mode")) return "no-sec-fetch";
  return "browser";
}

function decode(value: string | null) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** ?nolog=1 on the open itself, or on the page of this site it was opened
    from (our own link checks), suppresses the log line. */
function suppressed(req: NextRequest): boolean {
  if (req.nextUrl.searchParams.get("nolog") === "1") return true;
  const referer = req.headers.get("referer");
  if (!referer) return false;
  try {
    const ref = new URL(referer);
    return ref.host === req.nextUrl.host && ref.searchParams.get("nolog") === "1";
  } catch {
    return false;
  }
}

type Resolved = { target: URL; slug: string; product: string; docSlug: string; size: string; page: number | null };

async function resolve(
  req: NextRequest,
  params: Promise<{ version: string; doc: string }>,
): Promise<Resolved | NextResponse> {
  const { version: slug, doc: docSlug } = await params;
  const version = getVersion(slug);
  const doc = version?.documents.find((d) => d.slug === docSlug);
  if (!version || !doc) return new NextResponse("Not found", { status: 404 });

  const size = req.nextUrl.searchParams.get("size") ?? version.paperDefault;
  if (size !== "letter" && size !== "a4") {
    return new NextResponse("Unknown paper size", { status: 400 });
  }
  const file = doc.editions[size];
  if (!file) return new NextResponse("This edition is in preparation", { status: 404 });

  // In production the PDFs live only in S3 (none is in git): without
  // DOCS_BASE_URL every open would land on a missing file, so say so
  // plainly instead (review fix, 2026-09-27).
  const base = process.env.DOCS_BASE_URL;
  if (!base && process.env.VERCEL_ENV === "production") {
    console.error("[pdf-open] DOCS_BASE_URL missing");
    return new NextResponse("This document is temporarily unavailable.", { status: 503 });
  }
  const target = base
    ? new URL(file.replace(/^\//, ""), base.replace(/\/?$/, "/"))
    : new URL(file, req.url);

  const page = Number.parseInt(req.nextUrl.searchParams.get("page") ?? "", 10);
  const hasPage = Number.isInteger(page) && page > 0;
  if (hasPage) target.hash = `page=${page}`;
  return { target, slug, product: version.product, docSlug, size, page: hasPage ? page : null };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ version: string; doc: string }> },
) {
  const r = await resolve(req, params);
  if (r instanceof NextResponse) return r;

  if (!suppressed(req)) {
    console.log(
      `[pdf-open] ${JSON.stringify({
        version: r.slug,
        product: r.product,
        doc: r.docSlug,
        size: r.size,
        page: r.page,
        agent: agentOf(req),
        country: req.headers.get("x-vercel-ip-country") ?? "",
        city: decode(req.headers.get("x-vercel-ip-city")),
      })}`,
    );
  }

  return NextResponse.redirect(r.target, 302);
}

/* HEAD answers the same redirect without a log line: link checkers and
   previewers send HEAD, and Next would otherwise run GET for it. */
export async function HEAD(
  req: NextRequest,
  { params }: { params: Promise<{ version: string; doc: string }> },
) {
  const r = await resolve(req, params);
  if (r instanceof NextResponse) return new NextResponse(null, { status: r.status });
  return NextResponse.redirect(r.target, 302);
}
