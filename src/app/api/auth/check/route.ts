import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/helpers/auth-cookie";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  return NextResponse.json({
    hasToken: !!token,
    tokenExists: token ? true : false,
  });
}
