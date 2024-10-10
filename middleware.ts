// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define your custom JWT payload type
interface AdminJwtPayload {
  id: string;
  email: string;
  isAdmin: boolean;
  // Add any other fields you include in the JWT payload
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (req.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Convert the secret to a Uint8Array as required by jose
    const encoder = new TextEncoder();
    const secret = encoder.encode(jwtSecret);

    // Verify the JWT token
    const { payload } = await jwtVerify(token, secret);

    // Now TypeScript knows that payload has the property isAdmin
    if (!payload.isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  } catch (error) {
    console.error('Error verifying token: ', error);
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all /admin routes
};
