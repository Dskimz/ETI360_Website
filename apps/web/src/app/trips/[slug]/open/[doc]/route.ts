import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getTrip } from "@/content/trips";

/* Every trip-document PDF opens through here: /trips/{slug}/open/{doc}?size=letter|a4
   (optional &page=N). The route redirects (302) to the static PDF, so the open
   is a navigation the site can see. Two records are kept:
     - one runtime log line per open, always ([trip-pdf-open] in the Vercel logs);
     - one campaign row when the visitor carries the email tags: src/middleware.ts
       matches this extensionless path, and for these routes it reads the tags
       from the referring trip page when the link itself carries none.
   The PDFs under public/ are skipped by the middleware (file extension). */

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
  { params }: { params: Promise<{ slug: string; doc: string }> },
) {
  const { slug, doc } = await params;
  const trip = getTrip(slug);
  const entry = trip?.documents.find((d) => d.slug === doc);
  if (!trip || !entry) return new NextResponse("Not found", { status: 404 });

  const size = req.nextUrl.searchParams.get("size") ?? "letter";
  if (size !== "letter" && size !== "a4") {
    return new NextResponse("Unknown paper size", { status: 400 });
  }
  const pdf = entry.editions[size];
  if (!pdf) return new NextResponse("This edition is in preparation", { status: 404 });

  const page = Number.parseInt(req.nextUrl.searchParams.get("page") ?? "", 10);
  const target = new URL(pdf, req.url);
  if (Number.isInteger(page) && page > 0) target.hash = `page=${page}`;

  if (req.nextUrl.searchParams.get("nolog") !== "1") {
    console.log(
      `[trip-pdf-open] ${JSON.stringify({
        trip: slug,
        doc,
        size,
        page: target.hash ? page : null,
        country: req.headers.get("x-vercel-ip-country") ?? "",
        city: decode(req.headers.get("x-vercel-ip-city")),
      })}`,
    );
  }

  return NextResponse.redirect(target, 302);
}
