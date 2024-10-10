// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';  // Using bcryptjs for better serverless compatibility
import prisma from '@/prisma';  // Adjust this path based on your Prisma setup
import { SignJWT } from 'jose';

// Define the JWT payload type
interface AdminJwtPayload {
  id: string;
  email: string;
  isAdmin: boolean;
  // Add any other fields you include in the JWT payload
}

export async function POST(req: Request) {
  console.log('Login route hit');
  const { email, password } = await req.json();
  console.log('Password provided:', password);

  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Compare the provided password with the hashed password from the database
  if (!bcrypt.compareSync(password, user.password)) {
    console.log('Password does not match for user:', user.email);
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  console.log('Password matches for user:', user.email);

  // Ensure JWT_SECRET is defined
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  // Encode the secret as a Uint8Array
  const encoder = new TextEncoder();
  const secret = encoder.encode(jwtSecret);

  // Generate a JWT token using 'jose'
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    // Add any other fields you include in the JWT payload
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  console.log('Generated token:', token);

  // Set the JWT as a cookie
  const response = NextResponse.json({ message: 'Login successful' });
  const isProduction = process.env.NODE_ENV === 'production';
  response.headers.set(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${isProduction ? 'Secure' : ''}; SameSite=Strict`
  );

  return response;
}
