import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/rutina/:path*", "/planner/:path*", "/perfil/:path*"],
};
