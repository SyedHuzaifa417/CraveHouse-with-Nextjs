import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 30000,
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const existingUser = await db.user.findUnique({
          where: { email: profile.email },
          include: { accounts: true },
        });

        if (existingUser) {
          // Check if the user already has a Google account
          const existingGoogleAccount = existingUser.accounts.find(
            (acc) => acc.provider === "google"
          );

          if (existingGoogleAccount) {
            // Update the existing account if necessary
            await db.account.update({
              where: { id: existingGoogleAccount.id },
              data: {
                access_token: account.access_token,
                expires_at: account.expires_at,
                id_token: account.id_token,
                scope: account.scope,
                token_type: account.token_type,
              },
            });
          } else {
            // Create a new account if it doesn't exist
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: account.type ?? "",
                provider: account.provider,
                providerAccountId: account.providerAccountId ?? "",
                access_token: account.access_token ?? "",
                expires_at: account.expires_at ?? 0,
                token_type: account.token_type ?? "",
                scope: account.scope ?? "",
                id_token: account.id_token ?? "",
              },
            });
          }
          return true;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      if (account && account.provider === "google") {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
