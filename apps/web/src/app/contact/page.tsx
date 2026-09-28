"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CLOSING_SENTENCE } from "@/content/voice";

/* The product a visitor came from rides in a hidden field (spec §4.7, S14).
   A product page's contact band links /contact?product={slug}; the page reads
   the slug from window.location.search once it has loaded (no useSearchParams,
   so no Suspense boundary). The shape check here only keeps junk out of the
   field: the API keeps the value only if it is one of the four product slugs
   (PRODUCT_SLUGS in src/content/products.ts, which stays off the client so the
   version registry is never sent to the browser). A slug, never personal data. */
const SLUG_SHAPE = /^[a-z][a-z-]{0,63}$/;

export default function ContactPage() {
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; msg?: string }>({
    kind: "idle",
  });
  const productRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product") ?? "";
    if (productRef.current && SLUG_SHAPE.test(product)) productRef.current.value = product;
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "idle" });
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        setStatus({ kind: "ok", msg: "Thank you. We will be in touch within two business days." });
        form.reset();
      } else {
        const err = await resp.json().catch(() => ({}));
        setStatus({
          kind: "error",
          msg: err.error || "Something went wrong. Please email danskimin@eti360.com directly.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        msg: "Network error. Please email danskimin@eti360.com directly.",
      });
    }
  }

  return (
    <>
      <section
        className="hero hero-inner-page"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/contact.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">Contact</p>
          <h1>Contact us.</h1>
          <p className="subhead">{CLOSING_SENTENCE}</p>
        </div>
      </section>

      <section style={{ background: "var(--parchment)" }}>
        <div className="container">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required autoComplete="name" />

            {/* The label reads "School" (spec S14); the field name stays
                `organization`, so the API contract holds. */}
            <label htmlFor="organization">School</label>
            <input type="text" id="organization" name="organization" required autoComplete="organization" />

            <label htmlFor="role">Role</label>
            <input type="text" id="role" name="role" required autoComplete="organization-title" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required autoComplete="email" />

            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" autoComplete="country-name" />

            <label htmlFor="discuss">What you&apos;d like to discuss</label>
            <textarea id="discuss" name="discuss" required />

            <input type="hidden" name="product" ref={productRef} />

            <button type="submit" className="cta-button">Send</button>

            <p className="form-consent ui">
              We use these details only to answer your inquiry. They are sent to us by
              email and are not added to a mailing list or shared with anyone else.
              See our <Link href="/privacy">privacy notice</Link>.
            </p>
          </form>

          <div
            className={
              "form-status" +
              (status.kind !== "idle" ? " active" : "") +
              (status.kind === "error" ? " error" : "")
            }
          >
            {status.msg}
          </div>

          <p className="contact-email">
            Prefer email? Write to <Link href="mailto:danskimin@eti360.com">danskimin@eti360.com</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
