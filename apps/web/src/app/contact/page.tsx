"use client";

import React, { useState } from "react";
import { contactPage } from "@/content/contact";

/* ── Hero (client component version) ── */

function HeroSection({
  eyebrow,
  headlineParts,
  subhead,
  image,
}: {
  eyebrow?: string | null;
  headlineParts?: Array<{ text: string; gold: boolean }>;
  subhead: string;
  image?: string | null;
}) {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[var(--brand-navy)]/88" />
        </div>
      )}
      <div className={`relative section-padding ${image ? "py-32 md:py-40" : ""}`}>
        <div className="container-narrow">
          {eyebrow && (
            <div className="mb-5">
              <hr className="hero-rule" />
              <p className="eyebrow">{eyebrow}</p>
            </div>
          )}
          <h1 className={`heading-display max-w-4xl ${image ? "text-white" : ""}`}>
            {headlineParts
              ? headlineParts.map((part, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    {part.gold ? (
                      <span className="gold">{part.text}</span>
                    ) : (
                      part.text
                    )}
                    {i < headlineParts.length - 1 && <br />}
                  </span>
                ))
              : null}
          </h1>
          <p
            className={`mt-7 max-w-2xl text-xl leading-relaxed ${
              image ? "text-white/75" : "body-text-secondary"
            }`}
          >
            {subhead}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Form Styles ── */

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--brand-gold)",
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 0",
  fontSize: "1rem",
  color: "var(--text-primary)",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--border-color)",
  outline: "none",
  fontFamily: "var(--font-sans)",
  transition: "border-color 0.2s ease",
};

/* ── Contact Form ── */

function ContactForm() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <h2 className="heading-section mb-4">Message received.</h2>
        <p className="body-text-secondary">
          We will respond within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {contactPage.form.fields.map((field) => {
        if (field.type === "select" && "options" in field) {
          return (
            <div key={field.name}>
              <label htmlFor={field.name} style={labelStyle}>
                {field.label}
              </label>
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  appearance: "none",
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%230d3558\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0 center",
                  cursor: "pointer",
                }}
              >
                <option value="">Select...</option>
                {field.options.map((opt: string) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name}>
              <label htmlFor={field.name} style={labelStyle}>
                {field.label}
              </label>
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleChange}
                rows={5}
                style={{
                  ...inputStyle,
                  minHeight: "120px",
                  resize: "vertical",
                }}
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label htmlFor={field.name} style={labelStyle}>
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              value={formData[field.name] || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        );
      })}
      <div className="pt-4">
        <button type="submit" className="btn-primary">
          {contactPage.form.submitLabel}
        </button>
      </div>
    </form>
  );
}

/* ── What to Expect ── */

function WhatToExpect() {
  const { eyebrow, items } = contactPage.whatToExpect;
  return (
    <div>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="body-text-secondary flex gap-3">
            <span
              className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--brand-gold)" }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Page ── */

export default function ContactPage() {
  return (
    <main>
      <HeroSection {...contactPage.hero} />
      <section className="section-padding pt-0">
        <div className="container-narrow">
          <div className="grid gap-12 md:gap-16 md:grid-cols-3">
            <div className="md:col-span-2">
              <ContactForm />
            </div>
            <div>
              <WhatToExpect />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
