import { NextResponse } from "next/server";
import settings from "@/lib/settings.json";

export async function GET() {
  return NextResponse.json(settings);
}