// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const adminAuth = req.cookies.get('admin-auth')?.value;

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (adminAuth !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
