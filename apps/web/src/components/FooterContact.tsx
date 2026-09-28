"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCT_SLUGS } from "@/content/products";
import { CLOSING_SENTENCE, CLOSING_SIGNATURE } from "@/content/voice";

/* The contact row at the top of the footer. It replaces the separate navy
   contact band (Dan, 2026-09-28: one footer, not two bars). On a product page
   the button carries that product to the form (/contact?product={slug},
   spec S14); trip pages carry the Trip Package. Hidden on /contact itself. */
function productFor(pathname: string): string | null {
  const first = pathname.split("/")[1] ?? "";
  if (first === "trips" && pathname.split("/")[2]) return "trip-package";
  return (PRODUCT_SLUGS as string[]).includes(first) ? first : null;
}

export function FooterContact() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/contact")) return null;
  const product = productFor(pathname);
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
