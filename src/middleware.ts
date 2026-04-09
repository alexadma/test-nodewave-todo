import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];
const DEFAULT_LOGIN = "/login";
const DEFAULT_HOME = "/todos";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read token from cookies (zustand persist uses localStorage,
  // so we check cookie fallback or rely on client-side guard)
  const authStorage = request.cookies.get("auth-storage")?.value;

  let isAuthenticated = false;
  if (authStorage) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authStorage));
      isAuthenticated = !!parsed?.state?.token;
    } catch {}
  }

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN, request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};