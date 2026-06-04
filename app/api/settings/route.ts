import { NextResponse } from "next/server";
import settings from "@/lib/settings.json";

export async function GET(request: Request) {
  const host = request.headers.get("host") || "";
  const referer = request.headers.get("referer") || "";

  // السماح فقط للطلب من موقعك أو البيئة المحلية
  if (
    !host.includes("salah-plus") &&
    !host.includes("localhost") &&
    !referer.includes("salah-plus")
  ) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  return NextResponse.json(settings);
}