import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePasswords } from "@lib/validation";

// https://authjs.dev/guides/pages/built-in-pages
// https://authjs.dev/getting-started/authentication/credentials

export const { handlers, signIn, signOut, auth } = NextAuth({
  // pages: {
  //   signIn: "/",
  //   verifyRequest: "/",
  //   signOut: "/",
  //   error: "/",
  // },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        let user = null;

        // console.log(credentials);

        // logic to salt and hash password
        // TODO: const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        // TODO: user = await getUserFromDb(credentials.email, pwHash)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          // throw new Error("Invalid credentials." + " dapsy!");
          return null;
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
