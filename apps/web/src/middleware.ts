import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Shared reviewer password for the unlisted campaign pages and the Users
// Guides (Dan, 2026-09-04). Username is ignored; any value works.
const REVIEW_PASSWORD = "Goodtimes2026";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const pass = decoded.slice(decoded.indexOf(":") + 1);
      if (pass === REVIEW_PASSWORD) {
        const { pathname } = req.nextUrl;
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

export const config = {
  matcher: [
    "/review",
    "/review/index.html",
    "/review/marketing-2026-09.html",
    "/review/email-list.html",
    "/review/email-arms.html",
    "/review/school-review.html",
    "/guides/:path*",
  ],
};
