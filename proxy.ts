import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export function proxy(request: NextRequest) {
  // If getSession is async, keep this async and await it.
  // If it’s sync, remove async/await.
  return handleAuth(request);
}

async function handleAuth(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    url.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
