import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|favicon.ico|events|event|login|register).*)",
  ],
};

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const reqUrl = new URL(req.url);
  if (reqUrl?.pathname !== "/") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  const isProtectedRoute =
    reqUrl.pathname.startsWith("/profile") ||
    reqUrl.pathname.startsWith("/dashboard");

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = req.auth?.user;
  const userRole = user?.role ?? "default";

  if (isLoggedIn) {
    if (
      userRole !== "ORGANIZER" &&
      req.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      userRole !== "PARTICIPANT" &&
      req.nextUrl.pathname.startsWith("/profile/tickets")
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }
});
