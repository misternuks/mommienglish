import NextAuth from  'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password"}
      },
      authorize: async (credentials) => {
        const user = { id: "1", name: "Demo User" };

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
