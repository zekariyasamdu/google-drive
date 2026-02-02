import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user, session, account, verification } from "../db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { VerifyEmail } from "./components/VerifyEmail";
import { DeleteAccountEmail } from "./components/DeleteAccountEmail";
import { db } from "../db";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);
export const auth = betterAuth({
  plugins: [nextCookies()],
  user: {
    additionalFields:{
			imageFileKey: {
				type: "string",
				required: false,
			},
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }, request) => {
        const fromEmail =
          env.NODE_ENV === "production"
            ? "delivered@resend.dev"
            : "delivered@resend.dev";
        void resend.emails.send({
          from: fromEmail,
          to: user.email,
          subject: "Delete your account",
          react: DeleteAccountEmail({ verifyUrl: url }),
        });
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const fromEmail =
        env.NODE_ENV === "production"
          ? "delivered@resend.dev"
          : "delivered@resend.dev";
      void resend.emails.send({
        from: fromEmail,
        to: user.email,
        subject: "Verify your email",
        react: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    requireEmailVerification: true,
    callbackUrl: "",
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent",
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          profilePicture: profile.picture,
        };
      },
    },
  },
});
