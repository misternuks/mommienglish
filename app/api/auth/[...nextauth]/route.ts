import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaClient, User } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

const PASSCODE = process.env.PASSCODE;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        passcode: { label: 'Passcode', type: 'password' },
      },
      authorize: async (credentials): Promise<any> => {
        if (credentials?.passcode === PASSCODE) {
          // Return a basic user object if matching
          return { id: 1, name: 'User'};
        }
        // Return null if incorrect
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
