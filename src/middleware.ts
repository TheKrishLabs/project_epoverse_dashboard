
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;
  
  console.log(`[Middleware] Processing: ${pathname} | Token present: ${!!token}`);

  // Paths that require authentication
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Paths that are only for public/unauthenticated users (e.g., login)
  const isAuthRoute = pathname === "/login" || pathname === "/auth";

  // 1. If trying to access a protected route without a token -> Redirect to Login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    // Optional: Add ?from=... to redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If trying to access login/auth route WITH a token -> Redirect to Dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

// Configure paths to match
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
