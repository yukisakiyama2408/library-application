import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import {client} from './api/apollo-client'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import { Auth0Provider } from '@auth0/auth0-react'

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps) {
  return (
    <Auth0Provider
    domain="dev-95au-j9j.us.auth0.com"
    clientId="je55u4Ols3LCJTZaKjPCdcgt1Xzh0ALN"
    redirectUri="http://localhost:3000"
        >
       <CacheProvider value={emotionCache}>
       <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>  
      <Component {...pageProps} />
       </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
    </Auth0Provider>
  )
}

export default MyApp
