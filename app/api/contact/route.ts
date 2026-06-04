import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!privateKey) {
      return NextResponse.json({ error: "Missing Private Key" }, { status: 500 });
    }

    const emailjsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_yygh4dj",
        template_id: "template_0n382af",
        user_id: privateKey,
        accessToken: privateKey,
        template_params: {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
      }),
    });

    if (!emailjsRes.ok) {
      const errorText = await emailjsRes.text();
      return NextResponse.json({ error: errorText }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "تم الإرسال بنجاح" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
