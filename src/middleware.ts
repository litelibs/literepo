import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const headerKeyPath = "direct-pathname";
export const pathPrefix = "path";

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

// webpack breaks if this matcher field isn't written explicity (no str vars or interpolation)
export const config = {
  matcher: ["/", "/path/:path*"],
};
