import { NextResponse } from "next/server";
import { appendJsonRecord } from "@/lib/json-storage";

const ALLOWED_SUBJECTS = new Set([
  "data-correction",
  "missing-player",
  "media-inquiry",
  "sponsorship",
  "other",
]);

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
    }

    const values = body as Record<string, unknown>;
    const name = typeof values.name === "string" ? values.name.trim() : "";
    const email = typeof values.email === "string" ? values.email.trim().toLowerCase() : "";
    const subject = typeof values.subject === "string" ? values.subject : "";
    const message = typeof values.message === "string" ? values.message.trim() : "";

    if (
      name.length < 1 || name.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      !ALLOWED_SUBJECTS.has(subject) ||
      message.length < 10 || message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Check the form fields and try again." },
        { status: 400 }
      );
    }

    await appendJsonRecord("contact-submissions.json", {
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
