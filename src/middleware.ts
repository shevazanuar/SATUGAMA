import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Hanya proteksi rute /admin/* dan kecualikan halaman login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    // Better Auth menyimpan token sesi dalam cookie dengan nama "better-auth.session_token" atau "__Secure-better-auth.session_token" (HTTPS)
    const sessionCookie = 
      request.cookies.get("better-auth.session_token") || 
      request.cookies.get("__Secure-better-auth.session_token");

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
