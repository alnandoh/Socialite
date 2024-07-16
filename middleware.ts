import { auth } from "@/auth";

export default auth((req) => {
  if (
    !req.auth &&
    (req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  const user: any = req.auth?.user;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export { auth as middleware } from "@/auth";
