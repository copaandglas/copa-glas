import "server-only";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

/**
 * Add a contact to the studio's Resend audience.
 *
 * Optimistic by design: callers should not block on this. Any failure
 * (rate-limit, audience misconfig, network) is logged but never thrown,
 * because newsletter signup is non-critical to the user-facing flow.
 * "Already exists" is a quiet no-op success.
 */
export async function addToAudience(opts: {
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<void> {
  if (!resend || !AUDIENCE_ID) {
    console.log("[audience] not configured, logged only:", opts);
    return;
  }
  try {
    const result = await resend.contacts.create({
      email: opts.email,
      firstName: opts.firstName,
      lastName: opts.lastName,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });
    if (result.error) {
      const msg = result.error.message?.toLowerCase() ?? "";
      if (!msg.includes("already")) {
        console.error("[audience] Resend error:", result.error);
      }
    }
  } catch (err) {
    console.error("[audience] Resend threw:", err);
  }
}
