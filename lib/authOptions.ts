// lib/authOptions.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const PASSCODE = process.env.PASSCODE;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        passcode: { label: 'Passcode', type: 'password' },
      },
      authorize: async (credentials): Promise<any> => {
        if (credentials?.passcode === PASSCODE) {
          return { id: 1, name: 'User' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
