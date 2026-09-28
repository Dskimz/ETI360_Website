"use client";

import { usePathname } from "next/navigation";

/* The site's own header, footer and analytics (Vercel Analytics and GA4) stay
   off the private route pages (/routes/{token}): those pages carry a school's
   identity, not ETI360's. The site measures nothing there. The page's map is
   Mapbox GL JS, which still reports each map load to Mapbox for billing
   (events.mapbox.com) even with its performance metrics turned off.
   Everything else on the site renders its children unchanged. */
export function isPrivateRoute(pathname: string) {
  return pathname === "/routes" || pathname.startsWith("/routes/");
}

export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  if (isPrivateRoute(pathname)) return null;
  return <>{children}</>;
}
