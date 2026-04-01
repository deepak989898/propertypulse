import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const role = request.cookies.get("role")?.value;
  if (role !== "admin") {
    const login = new URL("/login", request.url);
    login.searchParams.set("redirect", "/admin");
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
