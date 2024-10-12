// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
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
          // Return a basic user object if matching
          return { id: 1, name: 'User' };
        }
        // Return null if incorrect
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
