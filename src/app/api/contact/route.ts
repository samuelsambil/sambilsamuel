import { NextResponse } from "next/server";
import { site } from "@/lib/content";

interface ContactBody {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  /** Honeypot. Bots fill it, humans never see it. */
  website?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website) {
    // Silently accept spam so the bot does not learn anything.
    return NextResponse.json({ success: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.warn("Contact submission received but RESEND_API_KEY is unset.", {
      name,
      email,
    });
    return NextResponse.json({ success: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      replyTo: email,
      subject: `New enquiry from ${name}${
        body.projectType ? ` — ${body.projectType}` : ""
      }`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        body.projectType ? `Project type: ${body.projectType}` : null,
        body.budget ? `Budget: ${body.budget}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Could not send the message. Please email me directly." },
      { status: 500 }
    );
  }
}
