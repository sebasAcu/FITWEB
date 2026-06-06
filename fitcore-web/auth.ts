import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { findUser, hashPassword } from "@/lib/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const user = await findUser(credentials.email as string);
        if (!user) return null;
        if (user.passwordHash !== hashPassword(credentials.password as string)) return null;
        return { id: user.email, email: user.email, name: user.name };
      },
    }),
  ],
  pages: { signIn: "/signin" },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: { httpOnly: true, sameSite: "none", path: "/", secure: true },
    },
    sessionToken: {
      name: "next-auth.session-token",
      options: { httpOnly: true, sameSite: "none", path: "/", secure: true },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: { httpOnly: true, sameSite: "none", path: "/", secure: true },
    },
    state: {
      name: "next-auth.state",
      options: { httpOnly: true, sameSite: "none", path: "/", secure: true },
    },
  },
  callbacks: {
    async signIn({ user }) {
      const { logToSheet } = await import("@/lib/sheets");
      await logToSheet(
        user.name ?? "Sin nombre",
        user.email ?? "Sin email",
        "Inicio de sesión"
      );
      return true;
    },
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
