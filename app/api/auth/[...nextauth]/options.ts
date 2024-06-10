// app/api/auth/[...nextauth]/options.ts

import { loginUser } from "@/app/lib/actions/user.action";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser extends User {
  role?: string;
}

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const user = credentials as {
          email: string;
          password: string;
        };

        const response = await loginUser(user.email, user.password);
        const loggedInUser = response.data;
        console.log("logged:", loggedInUser);

        if (loggedInUser && response.error === null) {
          // if everything is fine
          return {
            id: loggedInUser._id,
            name: loggedInUser.name,
            email: loggedInUser.email,
            role: loggedInUser.role,
          };
        } else {
          throw new Error(response.error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const Exteduser: ExtendedUser = user;
      if (Exteduser) token.role = Exteduser.role;
      console.log("token : ", token);
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      console.log("session:", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin", // your custom signin page with signin form.
    error: "/signinError", // Error code passed in query string as ?error=
  },
};