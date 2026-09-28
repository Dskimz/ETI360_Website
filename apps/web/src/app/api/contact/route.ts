import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getProduct, PRODUCT_SLUGS } from "@/content/products";
import type { ProductSlug } from "@/content/trips/types";

/**
 * Contact-form submissions.
 *
 * Delivers to danskimin@eti360.com via Resend when RESEND_API_KEY is set.
 * Falls back to console logging when it isn't (so the form keeps working
 * during local dev / preview deploys without credentials).
 *
 * Vercel env vars required:
 *   RESEND_API_KEY        — from https://resend.com/api-keys
 *   RESEND_FROM           — optional; defaults to "ETI360 Website
 *                            <onboarding@resend.dev>" which works out of
 *                            the box without domain verification. Replace
 *                            with e.g. "ETI360 <danskimin@eti360.com>" once
 *                            the eti360.com domain is verified in Resend.
 *
 * The form's "School" field keeps the name `organization` (spec §4.7). A
 * product page's contact band sends `product`; it is kept only if it is one of
 * the four product slugs, and then adds a "Product" line to the email.
 */

const TO = "danskimin@eti360.com";
const DEFAULT_FROM = "ETI360 Website <onboarding@resend.dev>";
const REQUIRED = ["name", "organization", "role", "email", "discuss"];

// What the visitor sees if a required field is empty: the form's own labels.
const FIELD_LABEL: Record<string, string> = {
  name: "name",
  organization: "school",
  role: "role",
  email: "email",
  discuss: "what you'd like to discuss",
};

function isProductSlug(value: unknown): value is ProductSlug {
  return typeof value === "string" && (PRODUCT_SLUGS as string[]).includes(value);
}

type Submission = {
  name: string;
  organization: string;
  role: string;
  email: string;
  country?: string;
  discuss: string;
  product?: ProductSlug;
};

function renderText(s: Submission, receivedAt: string) {
  return [
    `Received: ${receivedAt}`,
    "",
    `Name:         ${s.name}`,
    `School:       ${s.organization}`,
    `Role:         ${s.role}`,
    `Email:        ${s.email}`,
    `Country:      ${s.country || "(not provided)"}`,
    ...(s.product ? [`Product:      ${getProduct(s.product).name}`] : []),
    "",
    "What they'd like to discuss:",
    s.discuss,
  ].join("\n");
}

function renderHtml(s: Submission, receivedAt: string) {
  const esc = (t: string) =>
    t
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  return `<!doctype html>
<html><body style="font-family:Helvetica,Arial,sans-serif;color:#1f2732;max-width:640px">
  <p style="color:#888;font-size:12px;margin:0 0 18px">Received ${esc(receivedAt)}</p>
  <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
    <tr><td style="color:#888;padding-right:18px">Name</td><td><strong>${esc(s.name)}</strong></td></tr>
    <tr><td style="color:#888;padding-right:18px">School</td><td>${esc(s.organization)}</td></tr>
    <tr><td style="color:#888;padding-right:18px">Role</td><td>${esc(s.role)}</td></tr>
    <tr><td style="color:#888;padding-right:18px">Email</td><td><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></td></tr>
    <tr><td style="color:#888;padding-right:18px">Country</td><td>${esc(s.country || "—")}</td></tr>${
      s.product
        ? `
    <tr><td style="color:#888;padding-right:18px">Product</td><td>${esc(getProduct(s.product).name)}</td></tr>`
        : ""
    }
  </table>
  <p style="color:#888;font-size:12px;margin:24px 0 6px">What they'd like to discuss</p>
  <div style="border-left:3px solid #C9A24D;padding:4px 0 4px 14px;white-space:pre-wrap;line-height:1.5">${esc(s.discuss)}</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const missing = REQUIRED.filter(
    (f) => !String((body as Record<string, unknown>)[f] ?? "").trim(),
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing: ${missing.map((f) => FIELD_LABEL[f] ?? f).join(", ")}` },
      { status: 400 },
    );
  }

  const email = String(body.email || "").trim();
  if (!email.includes("@") || !email.split("@")[1]?.includes(".")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const submission: Submission = {
    name: String(body.name).trim().slice(0, 200),
    organization: String(body.organization).trim().slice(0, 200),
    role: String(body.role).trim().slice(0, 200),
    email,
    country: String(body.country ?? "").trim().slice(0, 120) || undefined,
    discuss: String(body.discuss).trim().slice(0, 4000),
    product: isProductSlug(body.product) ? body.product : undefined,
  };
  const receivedAt = new Date().toISOString();
  const subject = `Contact request — ${submission.name}, ${submission.organization}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local dev / preview: log and report success so the form stays testable.
    // Production: a missing key means submissions would vanish behind a
    // "Thank you" — surface it as the failure it is (caught live 2026-09-02).
    console.log("[contact] no RESEND_API_KEY; logging only", { receivedAt, ...submission });
    if (process.env.VERCEL_ENV === "production") {
      return NextResponse.json(
        { error: "Mail delivery is not configured. Please email danskimin@eti360.com directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || DEFAULT_FROM,
      to: TO,
      replyTo: submission.email,
      subject,
      text: renderText(submission, receivedAt),
      html: renderHtml(submission, receivedAt),
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json(
        { error: "Mail delivery failed. Please email danskimin@eti360.com directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] resend exception", err);
    return NextResponse.json(
      { error: "Mail delivery failed. Please email danskimin@eti360.com directly." },
      { status: 502 },
    );
  }
}
