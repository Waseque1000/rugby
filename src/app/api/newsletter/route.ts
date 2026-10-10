import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // TODO: Connect your newsletter marketing provider here!
    // Examples:
    // - Resend (https://resend.com/docs/api-reference/audiences/create-contact)
    // - ConvertKit / Kit API (https://developers.kit.com)
    // - Mailchimp (https://mailchimp.com/developer/marketing/api/list-members)
    // - SendGrid Marketing Campaigns
    //
    // Example pseudo-code:
    // await resend.contacts.create({
    //   email: email.toLowerCase().trim(),
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    // });

    console.log(`[Newsletter Subscription] New subscriber email: ${email.toLowerCase().trim()}`);

    return NextResponse.json(
      {
        success: true,
        message: "You're subscribed! Welcome to the USA Sevens Stats community.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
