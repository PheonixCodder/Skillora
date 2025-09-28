import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import bcrypt from "bcryptjs";

import { api } from "./api";
import { SignInSchema } from "./validations";

import { IAccountDoc } from "@/database/account.model";
import { IUserDoc } from "@/database/user.model";
import { ActionResponse } from "@/types/global";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({}),
  ],

  callbacks: {
    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account?.provider) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "github"
            ? (profile?.login as string)
            : (profile?.name as string),
      };

      const { success } = await api.auth.signInWithOAuth({
        provider: account.provider as "github" | "google",
        providerAccountId: account.providerAccountId,
        user: userInfo,
      });

      if (!success) return false;

      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        const { success, data: existingAccount } =
          await api.accounts.getByProviderId(
            account.type === "credentials"
              ? token.email!
              : account.providerAccountId,
          );

        if (!success || !existingAccount) return token;

        const userId = existingAccount.userId;

        if (userId) token.sub = userId.toString();
      }

      //
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub!;

      return session;
    },
  },
});