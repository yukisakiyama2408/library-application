import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { HasuraAdapter } from "@skillrecordings/next-auth-hasura-adapter";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_GRAPHQL_ENDPOINT,
    adminSecret: process.env.HASURA_ADMIN_SECRET,
  }),
};

export default NextAuth(authOptions);
