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
      return NextResponse.json({ error: "بيانات غير صحيحة", details: parsed.error.issues }, { status: 400 });
    }

    const { name, email, subject, message, turnstileToken } = parsed.data;

    // 1. التحقق من Turnstile
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      console.error("Missing TURNSTILE_SECRET_KEY");
      return NextResponse.json({ error: "خطأ في إعدادات الخادم" }, { status: 500 });
    }

    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: turnstileSecret, response: turnstileToken }),
      signal: AbortSignal.timeout(5000),
    });
    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      return NextResponse.json({ error: "فشل التحقق الأمني، حاول مرة أخرى" }, { status: 400 });
    }

    // 2. إرسال البريد عبر EmailJS
    const emailjsService = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplate = process.env.EMAILJS_TEMPLATE_ID;
    const emailjsUser = process.env.EMAILJS_USER_ID;

    if (!emailjsService || !emailjsTemplate || !emailjsUser) {
      console.error("Missing EmailJS environment variables");
      return NextResponse.json({ error: "خطأ في إعدادات البريد" }, { status: 500 });
    }

    const emailjsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: emailjsService,
        template_id: emailjsTemplate,
        user_id: emailjsUser,
        template_params: {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!emailjsRes.ok) {
      const errorText = await emailjsRes.text();
      console.error("EmailJS error:", errorText);
      throw new Error("EmailJS failed");
    }

    return NextResponse.json({ success: true, message: "تم إرسال رسالتك بنجاح" });
  } catch (error) {
    console.error("Contact API error:", error);
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json({ error: "انتهت المهلة، حاول مرة أخرى" }, { status: 504 });
    }
    return NextResponse.json({ error: "حدث خطأ غير متوقع، حاول لاحقاً" }, { status: 500 });
  }
}
