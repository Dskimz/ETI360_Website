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
     - one runtime log line, always unless ?nolog=1 ([pdf-open] in the Vercel
       logs, with the version and its product);
     - one campaign row when the visitor carries the email tags:
       src/middleware.ts matches this extensionless path (DOC_OPEN), and reads
       the tags from the referring page on this site when the link itself
       carries none.
   The old /trips/{slug}/open/{doc} links 308 here (next.config.ts). */

export const dynamic = "force-dynamic";

function decode(value: string | null) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ version: string; doc: string }> },
) {
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

  const base = process.env.DOCS_BASE_URL;
  const target = base
    ? new URL(file.replace(/^\//, ""), base.replace(/\/?$/, "/"))
    : new URL(file, req.url);

  const page = Number.parseInt(req.nextUrl.searchParams.get("page") ?? "", 10);
  if (Number.isInteger(page) && page > 0) target.hash = `page=${page}`;

  if (req.nextUrl.searchParams.get("nolog") !== "1") {
    console.log(
      `[pdf-open] ${JSON.stringify({
        version: slug,
        product: version.product,
        doc: docSlug,
        size,
        page: target.hash ? page : null,
        country: req.headers.get("x-vercel-ip-country") ?? "",
        city: decode(req.headers.get("x-vercel-ip-city")),
      })}`,
    );
  }

  return NextResponse.redirect(target, 302);
}
