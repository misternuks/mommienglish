import { NextRequest, NextResponse } from 'next/server';
import { verify, JwtPayload } from 'jsonwebtoken';

// Define your custom JWT payload type
interface AdminJwtPayload extends JwtPayload {
  isAdmin: boolean;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Verify the JWT token and cast it as AdminJwtPayload
    const decoded = verify(token, jwtSecret) as AdminJwtPayload;

    // Now TypeScript knows that decoded has the property isAdmin
    if (!decoded.isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  } catch (error) {
    console.error('Error verifying token: ', error);
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],  // Apply middleware to all /admin routes
};
