// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// const PASSCODE = process.env.PASSCODE;

// export const authOptions: NextAuthOptions = {
//   providers: [
//     // Visitor passcode entry
//     CredentialsProvider({
//       id: 'passcode',
//       name: 'Passcode',
//       credentials: {
//         passcode: { label: 'Passcode', type: 'password' },
//       },
//       authorize: async (credentials): Promise<any> => {
//         if (credentials?.passcode === PASSCODE) {
//           return { id: 'visitor', name: 'Visitor' };
//         }
//         return null;
//       },
//     }),

//     // Admin email/password login
//     CredentialsProvider({
//       id: 'admin-login',
//       name: 'Admin Login',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         const { email, password } = credentials || {};

//         if (!email || !password) {
//           throw new Error('Email and password are required');
//         }

//         const user = await prisma.user.findUnique({ where: { email } });

//         if (!user || !user.password) {
//           throw new Error('No user found with that email');
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password as string);

//         if (!isValidPassword) {
//           throw new Error('Incorrect password');
//         }

//         if (!user.isAdmin) {
//           throw new Error('Access denied: You are not an admin');
//         }

//         return { id: user.id, name: user.email };
//       },
//     }),
//   ],

//   pages: {
//     signIn: '/auth/signin',
//   },

//   session: {
//     strategy: 'jwt',
//   },

//   callbacks: {
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.sub as string;
//       }
//       return session;
//     },
//   },
// };
