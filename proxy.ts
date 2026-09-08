import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hosts, isVercelAppHost } from "@/lib/hosts";

function hostnameOf(host: string | null) {
  return (host ?? "").split(":")[0].toLowerCase();
}

export function proxy(request: NextRequest) {
  const hostname = hostnameOf(request.headers.get("host"));

  if (hostname === hosts.apex || hostname === hosts.vercelProduction) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = hosts.canonical;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();
  response.headers.delete("Access-Control-Allow-Origin");

  if (isVercelAppHost(hostname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|txt|xml)$).*)",
  ],
};
