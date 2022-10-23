import { createHttpLink,ApolloClient, InMemoryCache } from "@apollo/client";


const httpLink = createHttpLink({
    uri: "http://localhost:8080/v1/graphql",

  })
  const cache = new InMemoryCache()

  const client = new ApolloClient({
    link: httpLink,
    cache
  })

export {client, cache};