import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addToAudience } from "@/app/lib/audience";

function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const trimmed = fullName.trim();
  if (!trimmed) return {};
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

interface EnquiryPayload {
  name?: string;
  email?: string;
  message?: string;
  telephone?: string | null;
  location?: string | null;
  intendedSpace?: string | null;
  timeline?: string | null;
  contactMethod?: "email" | "phone" | "either";
  newsletter?: boolean;
  product?: { name?: string; slug?: string | null } | string | null;
  source?: { url?: string; path?: string } | null;
  submittedAt?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 30_000;
const RATE_LIMIT_MAX_ENTRIES = 5_000;
const lastHitByIp = new Map<string, number>();

function getClientIp(request: Request): string | null {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip");
}

function isRateLimited(ip: string | null): boolean {
  if (!ip) return false;
  const now = Date.now();
  const last = lastHitByIp.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW_MS) return true;
  lastHitByIp.set(ip, now);
  if (lastHitByIp.size > RATE_LIMIT_MAX_ENTRIES) {
    for (const [key, value] of lastHitByIp) {
      if (now - value > RATE_LIMIT_WINDOW_MS) lastHitByIp.delete(key);
    }
  }
  return false;
}

const TIMELINE_LABELS: Record<string, string> = {
  "within-month": "Within a month",
  "1-3-months": "1 to 3 months",
  "later-year": "Later this year",
  exploring: "Still exploring",
};

const CONTACT_LABELS: Record<string, string> = {
  email: "Email",
  phone: "Phone",
  either: "Either",
};

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const ENQUIRY_TO = process.env.ENQUIRY_TO_EMAIL ?? "info@copaandglas.com";
const ENQUIRY_FROM =
  process.env.ENQUIRY_FROM_EMAIL ?? "Copa + Glas <enquiries@copaandglas.com>";

interface NormalisedEnquiry {
  name: string;
  email: string;
  message: string;
  telephone: string | null;
  location: string | null;
  intendedSpace: string | null;
  timeline: string | null;
  contactMethod: "email" | "phone" | "either";
  newsletter: boolean;
  product: { name: string; slug: string | null } | null;
  source: { url?: string; path?: string } | null;
  submittedAt: string;
  ip: string | null;
  userAgent: string | null;
}

function renderPlainText(e: NormalisedEnquiry): string {
  const rows: [string, string | null][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["Telephone", e.telephone],
    ["Location", e.location],
    ["Piece", e.product?.name ?? null],
    ["Intended space", e.intendedSpace],
    ["Timeline", e.timeline ? TIMELINE_LABELS[e.timeline] ?? e.timeline : null],
    ["Preferred contact", CONTACT_LABELS[e.contactMethod] ?? e.contactMethod],
    ["Studio news opt-in", e.newsletter ? "Yes" : "No"],
  ];

  const lines = rows
    .filter(([, v]) => v !== null && v !== "")
    .map(([k, v]) => `${k}: ${v}`);

  return [
    lines.join("\n"),
    "",
    "Message",
    "-------",
    e.message,
    "",
    "---",
    `Submitted: ${e.submittedAt}`,
    e.source?.url ? `From: ${e.source.url}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(e: NormalisedEnquiry): string {
  const row = (label: string, value: string | null) =>
    value
      ? `<tr>
          <td style="padding:8px 16px 8px 0; color:#6b6b6b; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; white-space:nowrap; vertical-align:top; width:1%;">${escape(label)}</td>
          <td style="padding:8px 0; color:#111; font-size:14px; line-height:1.5;">${escape(value)}</td>
        </tr>`
      : "";

  const rowsHtml = [
    row("Name", e.name),
    row("Email", e.email),
    row("Telephone", e.telephone),
    row("Location", e.location),
    row("Piece", e.product?.name ?? null),
    row("Intended space", e.intendedSpace),
    row("Timeline", e.timeline ? TIMELINE_LABELS[e.timeline] ?? e.timeline : null),
    row("Preferred contact", CONTACT_LABELS[e.contactMethod] ?? e.contactMethod),
    row("Studio news", e.newsletter ? "Wants occasional updates" : null),
  ].join("");

  const subjectLine = e.product
    ? `New enquiry about ${e.product.name}`
    : "New studio enquiry";

  return `<!doctype html>
<html>
  <body style="margin:0; padding:0; background:#fafafa; font-family: 'Georgia', serif; color:#111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:#fff; border:1px solid rgba(0,0,0,0.06);">
            <tr>
              <td style="padding:28px 32px 20px 32px; border-bottom:1px solid rgba(0,0,0,0.06);">
                <div style="font-family: Arial, sans-serif; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#8a8a8a; margin-bottom:8px;">Copa + Glas, enquiry</div>
                <div style="font-family: 'Georgia', serif; font-style:italic; font-size:22px; line-height:1.2; color:#111;">${escape(subjectLine)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
                  ${rowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px 32px;">
                <div style="font-family: Arial, sans-serif; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#6b6b6b; margin-bottom:8px;">Message</div>
                <div style="font-family: 'Georgia', serif; font-size:15px; line-height:1.7; color:#111; white-space:pre-wrap;">${escape(e.message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px 32px; border-top:1px solid rgba(0,0,0,0.06); font-family: Arial, sans-serif; font-size:11px; color:#8a8a8a; line-height:1.6;">
                <div>Submitted ${escape(e.submittedAt)}</div>
                ${e.source?.url ? `<div>From ${escape(e.source.url)}</div>` : ""}
                ${e.ip ? `<div>IP ${escape(e.ip)}</div>` : ""}
              </td>
            </tr>
          </table>
          <div style="font-family: Arial, sans-serif; font-size:11px; color:#9b9b9b; padding-top:12px;">Reply to this email to respond to ${escape(e.name)}.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  let body: EnquiryPayload;
  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const productName =
    typeof body.product === "string"
      ? body.product
      : body.product?.name ?? null;
  const productSlug =
    typeof body.product === "object" && body.product !== null
      ? body.product.slug ?? null
      : null;

  const enquiry: NormalisedEnquiry = {
    name,
    email,
    message,
    telephone: body.telephone?.toString().trim() || null,
    location: body.location?.toString().trim() || null,
    intendedSpace: body.intendedSpace?.toString().trim() || null,
    timeline: body.timeline || null,
    contactMethod: body.contactMethod ?? "either",
    newsletter: Boolean(body.newsletter),
    product: productName
      ? { name: productName.toString().slice(0, 200), slug: productSlug }
      : null,
    source: body.source ?? null,
    submittedAt: body.submittedAt ?? new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent"),
  };

  const subject = enquiry.product
    ? `Enquiry: ${enquiry.product.name} (${enquiry.name})`
    : `Studio enquiry from ${enquiry.name}`;

  if (resend) {
    try {
      const result = await resend.emails.send({
        from: ENQUIRY_FROM,
        to: [ENQUIRY_TO],
        replyTo: enquiry.email,
        subject,
        text: renderPlainText(enquiry),
        html: renderHtml(enquiry),
        tags: [
          { name: "source", value: "enquiry-drawer" },
          { name: "type", value: enquiry.product ? "product" : "studio" },
        ],
      });
      if (result.error) {
        console.error("[enquiry] Resend error", result.error);
        return NextResponse.json(
          { error: "Unable to send at the moment. Please try again shortly." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[enquiry] Resend threw", err);
      return NextResponse.json(
        { error: "Unable to send at the moment. Please try again shortly." },
        { status: 502 },
      );
    }
  } else {
    console.log("[enquiry] (email provider not configured) logged only:", enquiry);
  }

  if (enquiry.newsletter) {
    const { firstName, lastName } = splitName(enquiry.name);
    await addToAudience({ email: enquiry.email, firstName, lastName });
  }

  return NextResponse.json({ ok: true });
}
