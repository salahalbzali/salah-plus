import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
  turnstileToken: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "بيانات غير صحيحة" },
        { status: 400 }
      );
    }

    const { name, email, subject, message, turnstileToken } = parsed.data;

    // 1. التحقق من Turnstile
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return NextResponse.json(
        { error: "خطأ في إعدادات الأمان" },
        { status: 500 }
      );
    }

    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
        signal: AbortSignal.timeout(5000),
      }
    );
    
    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      return NextResponse.json(
        { error: "فشل التحقق الأمني" },
        { status: 400 }
      );
    }

    // 2. إرسال البريد عبر EmailJS
    const emailjsRes = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_USER_ID,
          template_params: {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
          },
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!emailjsRes.ok) {
      throw new Error("EmailJS failed");
    }

    return NextResponse.json({
      success: true,
      message: "تم إرسال رسالتك بنجاح",
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "الخادم مشغول، حاول مرة أخرى" },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
