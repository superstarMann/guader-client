import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import { LOCALSTORAGE_TOKEN } from "./contants/token";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN)
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
})

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || ""
    }
  }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query:{
          fields:{
            isLoggedInVar:{
              read(){
                return isLoggedInVar();
              }
            },
            token: {
              read() {
                return authTokenVar()
              }
            }
          }
        }
      }
    })
});

export default client