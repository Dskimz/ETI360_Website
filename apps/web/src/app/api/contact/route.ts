import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
 */

const TO = "danskimin@eti360.com";
const DEFAULT_FROM = "ETI360 Website <onboarding@resend.dev>";
const REQUIRED = ["name", "organization", "role", "email", "discuss"];

type Source = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing?: string;
};

type Submission = {
  name: string;
  organization: string;
  role: string;
  email: string;
  country?: string;
  discuss: string;
  source?: Source;
};

function renderText(s: Submission, receivedAt: string) {
  return [
    `Received: ${receivedAt}`,
    "",
    `Name:         ${s.name}`,
    `Organization: ${s.organization}`,
    `Role:         ${s.role}`,
    `Email:        ${s.email}`,
    `Country:      ${s.country || "(not provided)"}`,
    "",
    "What they'd like to discuss:",
    s.discuss,
    "",
    "Source:",
    ...(s.source
      ? Object.entries(s.source)
          .filter(([, v]) => v)
          .map(([k, v]) => `  ${k}: ${v}`)
      : ["  (none captured)"]),
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
    <tr><td style="color:#888;padding-right:18px">Organization</td><td>${esc(s.organization)}</td></tr>
    <tr><td style="color:#888;padding-right:18px">Role</td><td>${esc(s.role)}</td></tr>
    <tr><td style="color:#888;padding-right:18px">Email</td><td><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></td></tr>
    <tr><td style="color:#888;padding-right:18px">Country</td><td>${esc(s.country || "—")}</td></tr>
  </table>
  <p style="color:#888;font-size:12px;margin:24px 0 6px">What they'd like to discuss</p>
  <div style="border-left:3px solid #C9A24D;padding:4px 0 4px 14px;white-space:pre-wrap;line-height:1.5">${esc(s.discuss)}</div>
</body></html>`;
}

function renderAckText(name: string) {
  return [
    `Hello ${name},`,
    "",
    "Thank you for writing. Your note has reached me directly, and I will come back to you within two business days.",
    "",
    "If it concerns a trip you have coming up, it helps to know roughly when it runs and what the next decision on it is. You can reply straight to this message and it comes to me.",
    "",
    "In the meantime, the sample file on our site shows the documents a school receives across a year. It is built for Harborview International School, which is fictitious by design, so every page can be shown in full:",
    "https://www.eti360.com/showcase?utm_source=acknowledgment&utm_medium=email&utm_campaign=inbound&utm_content=sample-file",
    "",
    "Speak soon,",
    "Dan Skimin",
    "Co-Founder, ETI360",
    "danskimin@eti360.com · www.eti360.com",
    "",
    "ETI360 is an independent trip-governance service for international schools and educational travel providers. We structure the evidence behind trip decisions. The decision, and the duty of care, stay with the school.",
    "",
    "ETI360 PTE. LTD. · 1010 Dover Road, #01-360V, Singapore 139658 · UEN 202302514C",
  ].join("\n");
}

function renderAckHtml() {
  // The branded acknowledgment; design source: /review/emails/acknowledgment.html
  return `<!doctype html>
<html lang="en"><body style="margin:0;padding:0;background:#f3efe4;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3efe4;padding:28px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid rgba(13,53,88,0.14);">
    <tr><td style="background:#0d3558;padding:26px 34px 22px;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:25px;font-weight:600;color:#ffffff;line-height:1;">ETI<span style="color:#C9A24D;">360</span></div>
      <div style="font-family:Helvetica,Arial,sans-serif;font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;color:#C9A24D;font-weight:600;padding-top:9px;">Educational Travel Insights</div>
    </td></tr>
    <tr><td style="height:3px;background:#C9A24D;line-height:3px;font-size:0;">&nbsp;</td></tr>
    <tr><td style="padding:34px 34px 8px;font-family:Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.62;color:#1f2732;">
      <p style="margin:0 0 18px;">Hello,</p>
      <p style="margin:0 0 18px;">Thank you for writing. Your note has reached me directly, and I will come back to you within two business days.</p>
      <p style="margin:0 0 18px;">If it concerns a trip you have coming up, it helps to know roughly when it runs and what the next decision on it is, whether that is a leadership sign-off, a parents evening, or a provider still to be settled. You can reply straight to this message and it comes to me.</p>
      <p style="margin:0 0 22px;">In the meantime, the sample file below shows the documents a school receives across a year: the annual review of the organization, the set prepared for each trip, and what the team works from while a group is away. It is built for Harborview International School, which is fictitious by design, so every page can be shown in full.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px;"><tr><td style="background:#0d3558;">
        <a href="https://www.eti360.com/showcase?utm_source=acknowledgment&utm_medium=email&utm_campaign=inbound&utm_content=sample-file" style="display:inline-block;padding:13px 26px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-left:3px solid #C9A24D;">See the sample file</a>
      </td></tr></table>
      <p style="margin:0 0 4px;">Speak soon,</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:14px 0 4px;"><tr><td style="border-left:3px solid #C9A24D;padding:2px 0 2px 14px;font-family:Helvetica,Arial,sans-serif;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#0d3558;font-weight:600;line-height:1.25;">Dan Skimin</div>
        <div style="font-size:13px;color:#1f2732;padding-top:3px;">Co-Founder, ETI360</div>
        <div style="font-size:13px;color:rgba(31,39,50,0.66);padding-top:2px;"><a href="mailto:danskimin@eti360.com" style="color:#8a6c1f;text-decoration:none;">danskimin@eti360.com</a> &nbsp;&middot;&nbsp; <a href="https://www.eti360.com" style="color:#8a6c1f;text-decoration:none;">www.eti360.com</a></div>
      </td></tr></table>
    </td></tr>
    <tr><td style="padding:20px 34px 26px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid rgba(13,53,88,0.14);padding-top:16px;font-family:Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.55;color:rgba(31,39,50,0.66);">
        ETI360 is an independent trip-governance service for international schools and educational travel providers. We structure the evidence behind trip decisions. The decision, and the duty of care, stay with the school.
      </td></tr></table>
    </td></tr>
    <tr><td style="background:#0a2a45;padding:15px 34px;font-family:Helvetica,Arial,sans-serif;font-size:11.5px;line-height:1.5;color:rgba(255,255,255,0.62);">ETI360 PTE. LTD. &middot; 1010 Dover Road, #01-360V, Singapore 139658 &middot; UEN 202302514C</td></tr>
  </table>
</td></tr>
</table>
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
      { error: `Missing: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const email = String(body.email || "").trim();
  if (!email.includes("@") || !email.split("@")[1]?.includes(".")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const rawSource =
    body.source && typeof body.source === "object"
      ? (body.source as Record<string, unknown>)
      : undefined;
  const source: Source | undefined = rawSource
    ? Object.fromEntries(
        ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer", "landing"]
          .map((k) => [k, String(rawSource[k] ?? "").slice(0, 300)])
          .filter(([, v]) => v),
      )
    : undefined;

  const submission: Submission = {
    name: String(body.name).trim().slice(0, 200),
    organization: String(body.organization).trim().slice(0, 200),
    role: String(body.role).trim().slice(0, 200),
    email,
    country: String(body.country ?? "").trim().slice(0, 120) || undefined,
    discuss: String(body.discuss).trim().slice(0, 4000),
    source,
  };
  const receivedAt = new Date().toISOString();
  const subject = `Briefing request — ${submission.name}, ${submission.organization}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] no RESEND_API_KEY; logging only", { receivedAt, ...submission });
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

    // Automatic acknowledgment to the submitter (Dan, 2026-08-25: programmed
    // into the workflow, not a manual step). A failure here never fails the
    // submission — the notification above already reached the inbox.
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: submission.email,
        replyTo: TO,
        subject: "Thank you for getting in touch",
        text: renderAckText(submission.name),
        html: renderAckHtml(),
      });
    } catch (ackErr) {
      console.error("[contact] acknowledgment send failed", ackErr);
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
