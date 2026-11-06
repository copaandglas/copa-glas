import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addToAudience } from "@/app/lib/audience";
import { resolveReferral } from "@/app/lib/referral";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFY_TO = process.env.ENQUIRY_TO_EMAIL ?? "info@copaandglas.com";
const NOTIFY_FROM = process.env.ENQUIRY_FROM_EMAIL ?? "Copa + Glas <info@copaandglas.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTERESTS = {
  collector: "Collector",
  designer: "Interior designer or architect",
  commission: "Planning a commission",
} as const;
type Interest = keyof typeof INTERESTS;

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

/** Short, single-line text from the browser, or null. */
function clean(value: unknown, max = 120): string | null {
  if (typeof value !== "string") return null;
  const text = value.replace(/[\r\n\t]+/g, " ").trim();
  return text ? text.slice(0, max) : null;
}

interface Body {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
  location?: unknown;
  referral?: unknown;
  campaign?: { source?: unknown; medium?: unknown; campaign?: unknown } | null;
  website?: unknown;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Accept quietly and do nothing.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Please share your name." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const interest =
    typeof body.interest === "string" && Object.hasOwn(INTERESTS, body.interest)
      ? INTERESTS[body.interest as Interest]
      : null;
  const location = clean(body.location, 120);
  const referral = resolveReferral(typeof body.referral === "string" ? body.referral : null);
  const campaign = body.campaign
    ? [clean(body.campaign.source, 60), clean(body.campaign.medium, 60), clean(body.campaign.campaign, 80)]
        .filter(Boolean)
        .join(" · ") || null
    : null;

  const [firstName, ...rest] = name.split(/\s+/);
  await addToAudience({ email, firstName, lastName: rest.join(" ") || undefined });

  if (resend) {
    const lines = [
      `${name} <${email}> joined the private list.`,
      interest ? `Interest: ${interest}` : null,
      location ? `Location: ${location}` : null,
      referral ? `Source: ${referral.label}` : null,
      campaign ? `Campaign: ${campaign}` : null,
    ].filter(Boolean);
    resend.emails
      .send({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        replyTo: email,
        subject: `Private list: ${name}${interest ? `, ${interest.toLowerCase()}` : ""}`,
        text: lines.join("\n"),
      })
      .catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
