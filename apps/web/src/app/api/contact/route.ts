import { NextRequest, NextResponse } from "next/server";

// Contact-form submissions.
// For now this just logs the submission server-side and returns 200.
// When Dan supplies the destination email / hosting decision, wire in the
// actual delivery (Resend, SendGrid, or a Vercel KV queue).

const REQUIRED = ["name", "organization", "role", "email", "discuss"];

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

  console.log("[contact]", {
    received_at: new Date().toISOString(),
    ...body,
  });

  return NextResponse.json({ ok: true });
}
