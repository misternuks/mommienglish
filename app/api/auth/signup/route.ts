// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password, name } = await req.json();

//     // Check if user exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json({ error: 'User already exists'}, { status: 400 });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         name,
//       },
//     });

//     return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return NextResponse.json({ error: 'I, { status: 500 }nternal server error'}, { status: 500 });
//   }
// }
