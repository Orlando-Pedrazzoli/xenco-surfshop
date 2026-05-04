import NextAuth from "next-auth";
import authConfig from "@/auth.config";

/**
 * Proxy do Next.js 16 (substitui middleware.ts).
 *
 * Usa apenas authConfig (edge-safe), sem Mongoose ou bcrypt.
 * A autorização é feita pelo callback `authorized` em auth.config.ts
 */
export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  // O callback `authorized` em auth.config.ts trata da lógica.
  // Se retornar false, o utilizador é redirecionado para /login.
  return;
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|fonts|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)).*)",
  ],
};
