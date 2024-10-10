import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed
import prisma from '@/prisma'; // Adjust based on your Prisma setup
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { email, password } = await req.json();  // Use req.json() directly in App Router API routes

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    if (user.isAdmin) {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return NextResponse.json({ message: 'JWT_SECRET is not defined' }, { status: 500 });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        jwtSecret,
        { expiresIn: '1h' }
      );

      // Set the token in a cookie
      const response = NextResponse.json({ message: 'Login successful' });
      response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

      console.log('Token generated:', token);  // Add this to verify the token is being generated
      console.log('Setting cookie:', `token=${token}`);

      return response;
    } else {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
