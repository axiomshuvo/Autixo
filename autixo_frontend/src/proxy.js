import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/add-car", "/my-bookings", "/dashboard"],
};
