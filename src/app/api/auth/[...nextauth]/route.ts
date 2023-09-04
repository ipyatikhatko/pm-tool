// pages/api/auth/[...nextauth].js

import NextAuth, { AuthOptions, RequestInternal, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import { prisma } from '@/db'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'text' },
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req: Pick<RequestInternal, "query" | "body" | "headers" | "method">
      ) {
        if (!credentials) {
          return null; // No credentials provided
        }

        const { username, password } = credentials;

        // Find the user by username
        const user = await prisma.user.findFirst({
          where: {
            username: username,
          },
        });

        // Check if the user exists and if the password matches
        if (user && (await compare(password, user.password))) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        } else {
          return null; // Invalid credentials
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user }
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }