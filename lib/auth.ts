import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse one client across hot reloads / serverless invocations.
const globalForMongo = globalThis as unknown as { _mongo?: MongoClient };
const client =
  globalForMongo._mongo ??
  new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/bazardor");
globalForMongo._mongo = client;

const db = client.db();

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    // Assignment: after register, send the user to the login page (no auto sign-in).
    autoSignIn: false,
    // Assignment: no email verification / forgot-password flow.
    requireEmailVerification: false,
  },
  socialProviders,
  // Same email via Google/GitHub and email+password -> link to one account
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      // email/password users here are never email-verified (assignment has no verification flow)
      requireLocalEmailVerified: false,
    },
  },
  plugins: [nextCookies()], // keep last
});