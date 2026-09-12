import { NextRequest, NextResponse } from "next/server";
import { checkAdminCode, createAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";

  if (!code || !checkAdminCode(code)) {
    return NextResponse.json({ error: "Incorrect code. Please try again." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
