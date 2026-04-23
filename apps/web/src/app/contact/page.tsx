"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; msg?: string }>({
    kind: "idle",
  });

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
          msg: err.error || "Something went wrong. Please email hello@eti360.com directly.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        msg: "Network error. Please email hello@eti360.com directly.",
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
            Prefer email? Write to <Link href="mailto:hello@eti360.com">hello@eti360.com</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
