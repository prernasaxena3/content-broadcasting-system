import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/live"];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based route protection
  if (userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      const role = user?.role;

      if (pathname.startsWith("/teacher") && role !== "teacher") {
        return NextResponse.redirect(new URL("/principal", request.url));
      }

      if (pathname.startsWith("/principal") && role !== "principal") {
        return NextResponse.redirect(new URL("/teacher", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
