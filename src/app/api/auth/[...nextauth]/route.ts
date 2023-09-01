// pages/api/auth/[...nextauth].js

import NextAuth, { NextAuthOptions, RequestInternal } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
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
            id: user.id.toString(),
            username: user.username,
            email: user.email,
          };
        } else {
          return null; // Invalid credentials
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async session({ session, user, token }) {
      if (user !== null) {

        session.user = user;
      }
      return session;
    },

    async jwt({ token, user }) {
      return token;
    },
  },
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }