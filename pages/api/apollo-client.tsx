import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { Auth0ContextInterface } from "@auth0/auth0-react";

function createClient(
  getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"]
) {
  const endpointUri = "https://fgn-library.hasura.app/v1/graphql";
  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken);
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: endpointUri,
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export { createClient };
