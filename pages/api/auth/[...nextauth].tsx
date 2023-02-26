import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { HasuraAdapter } from "@skillrecordings/next-auth-hasura-adapter";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_GRAPHQL_ENDPOINT || "",
    adminSecret: process.env.HASURA_ADMIN_SECRET || "",
  }),
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
      // return token;
    },
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
});
