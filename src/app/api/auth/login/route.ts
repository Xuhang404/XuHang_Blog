import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validatePassword, createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!validatePassword(password)) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }

  const token = createToken(password);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
