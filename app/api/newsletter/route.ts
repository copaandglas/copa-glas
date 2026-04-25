import { NextResponse } from "next/server";
import { addToAudience } from "@/app/lib/audience";

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

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  let email: string;
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  await addToAudience({ email });

  return NextResponse.json({ ok: true });
}
