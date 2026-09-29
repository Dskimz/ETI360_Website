"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLOSING_SENTENCE, CLOSING_SIGNATURE } from "@/content/voice";

/* The contact row at the top of the footer. It replaces the separate navy
   contact band (Dan, 2026-09-28: one footer, not two bars). On a product page
   the button carries that product to the form (/contact?product={slug},
   spec S14); trip pages carry the Trip Package. Hidden on /contact itself.

   The product slugs come from the server footer as a prop. This is a client
   component, so importing src/content/products.ts here would pull the whole
   version registry into the public layout chunk (review fix, 2026-09-29). */
function productFor(pathname: string, productSlugs: readonly string[]): string | null {
  const first = pathname.split("/")[1] ?? "";
  if (first === "trips" && pathname.split("/")[2]) return "trip-package";
  return productSlugs.includes(first) ? first : null;
}

export function FooterContact({ productSlugs }: { productSlugs: readonly string[] }) {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/contact")) return null;
  const product = productFor(pathname, productSlugs);
  const href = product ? `/contact?product=${product}` : "/contact";
  return (
    <div className="site-footer-contact">
      <div className="site-footer-contact-copy">
        <h2>Contact us.</h2>
        <p>{CLOSING_SENTENCE}</p>
        <p className="site-footer-contact-sig ui">{CLOSING_SIGNATURE}</p>
      </div>
      <Link className="site-footer-contact-btn ui" href={href}>
        Get in touch &rarr;
      </Link>
    </div>
  );
}
