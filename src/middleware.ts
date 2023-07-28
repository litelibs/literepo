import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const headerKeyPath = "direct-pathname";

export function middleware(request: NextRequest) {
  const url = "http://" + request.nextUrl.host + "/";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(headerKeyPath, request.nextUrl.pathname);

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/path/:path*",
};
