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

    const cleanEmail = email.toLowerCase().trim();

    // Store in PostgreSQL database if connected
    try {
      const { prisma, isDatabaseConnected } = await import("@/lib/db");
      const connected = await isDatabaseConnected();
      if (connected) {
        await prisma.subscriber.upsert({
          where: { email: cleanEmail },
          update: {},
          create: { email: cleanEmail },
        });
        console.log(`[PostgreSQL] Saved subscriber to database: ${cleanEmail}`);
      }
    } catch (dbErr) {
      console.warn("[PostgreSQL] Optional DB write skipped:", dbErr);
    }

    console.log(`[Newsletter Subscription] New subscriber email: ${cleanEmail}`);

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
