// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const PASSCODE = process.env.PASSCODE;

export const authOptions: NextAuthOptions = {
  providers: [
    // Visitor passcode entry
    CredentialsProvider({
      id: 'passcode',
      name: 'Passcode',
      credentials: {
        passcode: { label: 'Passcode', type: 'password' },
      },
      authorize: async (credentials): Promise<any> => {
        if (credentials?.passcode === PASSCODE) {
          // Return a basic user object if the passcode matches
          return { id: 'visitor', name: 'Visitor' };
        }
        // Return null if incorrect
        return null;
      },
    }),

    // Admin email/password login
    CredentialsProvider({
      id: 'admin-login',
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials || {};

        // Type guard to ensure both email and password are present
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        // Validate email and password
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error('No user found with that email');
        }

        // Since we know `password` is present, no need for more type checks here
        const isValidPassword = await bcrypt.compare(password, user.password as string);

        if (!isValidPassword) {
          throw new Error('Incorrect password');
        }

        // Check if user is an admin
        if (!user.isAdmin) {
          throw new Error('Access denied: You are not an admin');
        }

        // Return admin user object
        return { id: user.id, name: user.email };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin', // Default sign-in page
  },

  session: {
    strategy: 'jwt', // We'll use JWTs for session management
  },

  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
