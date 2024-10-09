// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import prisma from '@/prisma'; // Adjust the import based on your prisma client path

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Fetch the user from the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && user.isAdmin) {
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Set a session cookie or token
        // For simplicity, we can use a JWT or Next.js middleware for sessions
        // Here, we'll set a simple cookie (not secure for production)
        const response = NextResponse.json({ success: true });
        response.cookies.set('admin-auth', 'authenticated', { httpOnly: true, path: '/' });
        return response;
      }
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
