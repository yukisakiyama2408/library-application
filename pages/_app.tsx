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
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN||""}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID||""}
    redirectUri={`${process.env.NEXT_PUBLIC_APP_URL}/`}
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
