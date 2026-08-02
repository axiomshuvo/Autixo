import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("autixo");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(database, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "email-password"], // or async (request) => ["google", "github"]
    allowDifferentEmails: false,
    requireLocalEmailVerified: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: true,
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  // nextCookies() must stay last in the plugins array.
  plugins: [jwt(), nextCookies()],
});
