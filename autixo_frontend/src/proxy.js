import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const sessionCookie = getSessionCookie(request);
  const { pathname, search } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/add-car",
    "/my-bookings",
    "/my-added-cars",
  ];
  const authRoutes = ["/login", "/register"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (!sessionCookie && isProtectedRoute) {
    const redirectPath = `${pathname}${search}`;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", redirectPath);

    return NextResponse.redirect(loginUrl);
  }

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/add-car/:path*",
    "/my-bookings/:path*",
    "/my-added-cars/:path*",
    "/login",
    "/register",
  ],
};
