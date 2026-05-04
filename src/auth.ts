import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";

import authConfig from "@/auth.config";
import clientPromise from "@/lib/db/mongo-client";
import { connectDB } from "@/lib/db/mongoose";
import { User } from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "customer" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "customer" | "admin";
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_DB ?? "xenco",
  }),

  providers: [
    ...authConfig.providers,

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        await connectDB();

        const user = await User.findOne({
          email: parsed.data.email.toLowerCase(),
        }).select("+password");

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
