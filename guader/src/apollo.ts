import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("jwt")))

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
})

const authLink = setContext((_, {headers}) => {
  return {
    ...headers,
    "x-jwt": localStorage.getItem("jwt")
  }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client