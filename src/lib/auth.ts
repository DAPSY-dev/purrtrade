import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { comparePasswords } from "@lib/validation";

// https://authjs.dev/getting-started/authentication/credentials

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
    verifyRequest: "/",
    signOut: "/",
    error: "/",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        let user = null;

        console.log(credentials);

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
});
