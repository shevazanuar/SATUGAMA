import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Hanya proteksi rute /admin/* dan kecualikan halaman login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      // Jika cookie sesi tidak ditemukan, redirect ke halaman login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
