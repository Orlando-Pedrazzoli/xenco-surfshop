import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Configuração base do NextAuth — Edge-safe.
 *
 * Este ficheiro NÃO importa Mongoose, bcrypt, ou qualquer
 * coisa que use Node.js APIs. Pode ser usado no middleware/proxy
 * e edge runtime.
 *
 * O provider Credentials (que usa bcrypt) está em auth.ts apenas.
 */
export default {
  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "customer";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "customer" | "admin";
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const { pathname } = nextUrl;

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        if (role !== "admin") return false;
      }

      if (pathname.startsWith("/conta")) {
        if (!isLoggedIn) return false;
      }

      return true;
    },
  },

  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
