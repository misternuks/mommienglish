import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';  // Using bcryptjs for better serverless compatibility
import prisma from '@/prisma';  // Adjust this path based on your Prisma setup
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  console.log('Login route hit');
  const { email, password } = await req.json();

  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Compare the provided password with the hashed password from the database
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  console.log('Password matches for user:', user.email);

  // Ensure JWT_SECRET is defined
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    jwtSecret,  // Use the defined jwtSecret variable here
    { expiresIn: '1h' }  // Token expires in 1 hour
  );

  console.log('Generated token:', token);

  // Set the JWT as a cookie
  const response = NextResponse.json({ message: 'Login successful' });
  const isProduction = process.env.NODE_ENV === 'production';
  response.headers.set(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${isProduction ? 'Secure' : ''}`
  );

  return response;
}
