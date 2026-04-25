import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    // TODO: integrate a mailing list service (Mailchimp, ConvertKit, Resend Audiences, etc.)
    // Example with Mailchimp:
    //   await mailchimp.lists.addListMember(AUDIENCE_ID, {
    //     email_address: email,
    //     status: "subscribed",
    //   });

    console.log("[newsletter]", { email });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}
