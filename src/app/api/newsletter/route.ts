import { NextResponse } from "next/server";
import { appendJsonRecord } from "@/lib/json-storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    await appendJsonRecord("subscribers.json", {
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
    }, "email");

    return NextResponse.json(
      {
        success: true,
        message: "Your subscription is saved. Thank you for joining the USA Sevens Stats community.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
