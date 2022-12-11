import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { Auth0ContextInterface } from "@auth0/auth0-react";

function createClient(
  getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"]
) {
  const endpointUri = "http://localhost:8080/v1/graphql";
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

// const authLink = setContext((_, { headers }) => {
//   console.log("aaa")
//   const { getAccessTokenSilently } = useAuth0();
//   console.log("bbb")
//   const getAccessToken = async () => {
//     return await getAccessTokenSilently();
//   };
//   const accessToken = getAccessToken()
//   console.log(accessToken)
//   return {
//     headers: {
//       ...headers,
//       authorization: accessToken ? `Bearer ${accessToken}` : '',
//     },
//   };
// });
// console.log("hoge")
// console.log(authLink)
// const httpLink = createHttpLink({
//   uri: endpointUri,
// })
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// })
