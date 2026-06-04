import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    console.log("Received:", { name, email, subject, turnstileToken: turnstileToken ? "Present" : "Missing" });

    // إرسال مباشر عبر EmailJS
    const emailjsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_yygh4dj",
        template_id: "template_0n382af",
        user_id: "j766og8IrXhks3sKC",
        template_params: {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
      }),
    });

    const responseText = await emailjsRes.text();
    console.log("EmailJS Response:", responseText);

    if (!emailjsRes.ok) {
      return NextResponse.json({ error: responseText }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
