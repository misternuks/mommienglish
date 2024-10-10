import { NextRequest, NextResponse } from 'next/server';

// Helper function to decode JWT using Web Crypto API
async function verifyJwt(token: string, secret: string) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['verify']
  );

  const [header, payload, signature] = token.split('.');
  const data = `${header}.${payload}`;

  const signatureArray = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureArray,
    new TextEncoder().encode(data)
  );

  if (!valid) throw new Error('Invalid token signature');

  const decodedPayload = JSON.parse(atob(payload));

  return decodedPayload;
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

    // Verify token using Web Crypto API
    const decoded = await verifyJwt(token, jwtSecret);

    // Check if the user is an admin
    if (!decoded.isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
