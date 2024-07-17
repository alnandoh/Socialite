import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userLogin } from "./libs/api/api-libs";
import { UserData } from "./types/userData";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const userData: UserData = {
          email: credentials.username as string,
          password: credentials.password as string,
        };
        const user = await userLogin(userData);
        // TODO: Adjust code below according to your backend response structure
        return user
          ? {
              ...user,
              token: user.token,
              role: user.role,
            }
          : null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async jwt({ token, user }: any) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Add user data to the session object
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      console.log("session", session);
      return session;
    },
    async redirect() {
      return "/";
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3,
    updateAge: 20 * 60,
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "session-jwt",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
});
