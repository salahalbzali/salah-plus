import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // التحقق من Turnstile
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });
    
    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return NextResponse.json({ error: "فشل التحقق الأمني" }, { status: 400 });
    }

    // إرسال عبر EmailJS API
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

    if (!emailjsRes.ok) {
      throw new Error("EmailJS failed");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
