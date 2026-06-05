import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { logToSheet } from "@/lib/sheets";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: { signIn: "/signin" },
  callbacks: {
    async signIn({ user }) {
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
