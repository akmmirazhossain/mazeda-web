import { NextResponse } from "next/server";

const MAP = {
  "/home": "/",
  "/blog": "/news-and-blogs",
  "/articles": "/news-and-blogs",
  "/news-&-blogs": "/news-and-blogs",
  "/bill-pay": "/pay-bill",
};

export function middleware(req) {
  const url = req.nextUrl.clone();
  const p = url.pathname;
  let norm = p.toLowerCase();
  if (norm.length > 1 && norm.endsWith("/")) norm = norm.slice(0, -1);

  let key = norm;
  try {
    key = decodeURIComponent(norm);
  } catch {} // "&" may arrive as %26

  const target = MAP[key] ?? norm;
  if (target !== p) {
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|images|fonts|videos|locales|data|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
