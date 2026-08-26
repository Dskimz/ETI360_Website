"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@vercel/analytics";

export default function ContactPage() {
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; msg?: string }>({
    kind: "idle",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "idle" });
    const form = e.currentTarget;
    const data: Record<string, unknown> = Object.fromEntries(new FormData(form).entries());
    // Attach the first-touch source captured at landing, so every submission
    // arrives in the inbox with its campaign attribution.
    try {
      const src = sessionStorage.getItem("eti_source");
      if (src) data.source = JSON.parse(src);
    } catch { /* no source available */ }
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        track("contact_submit");
        setStatus({ kind: "ok", msg: "Thank you. We will be in touch within two business days. A confirmation is on its way to your inbox." });
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
          <h1>Arrange a briefing.</h1>
          <p className="subhead">
            Briefings are conversations, not sales calls. We respond within two business days
            to schedule a time.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--parchment)" }}>
        <div className="container">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required autoComplete="name" />

            <label htmlFor="organization">Organization</label>
            <input type="text" id="organization" name="organization" required autoComplete="organization" />

            <label htmlFor="role">Role</label>
            <input type="text" id="role" name="role" required autoComplete="organization-title" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required autoComplete="email" />

            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" autoComplete="country-name" />

            <label htmlFor="discuss">What you&apos;d like to discuss</label>
            <textarea id="discuss" name="discuss" required />

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
