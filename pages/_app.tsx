import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createClient } from "./api/apollo-client";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { FC, ReactNode } from "react";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const AuthApolloProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const client = createClient(getAccessTokenSilently);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <Auth0Provider
      domain="dev-95au-j9j.us.auth0.com"
      clientId="je55u4Ols3LCJTZaKjPCdcgt1Xzh0ALN"
      redirectUri="http://localhost:3000"
      audience="https://fgn-library.hasura.app/v1/graphql"
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <AuthApolloProvider>
            <Component {...pageProps} />
          </AuthApolloProvider>
        </ThemeProvider>
      </CacheProvider>
    </Auth0Provider>
  );
}

export default MyApp;
