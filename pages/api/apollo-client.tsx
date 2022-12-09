import { createHttpLink,ApolloClient, InMemoryCache} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { useAuth0 } from "@auth0/auth0-react";


const endpointUri ="http://localhost:8080/v1/graphql"
  const authLink = setContext((_, { headers }) => {
    const { getAccessTokenSilently } = useAuth0();
    const getAccessToken = async () => {
      try {
        return await getAccessTokenSilently();
      } catch (error) {
        return null;
      }
    };
    // auth0から取得したJWTを取得する
    const accessToken = getAccessToken()
    console.log(accessToken)
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  const httpLink = createHttpLink({
    uri: endpointUri,
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

export {client};