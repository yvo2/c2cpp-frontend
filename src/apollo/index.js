import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import store from "../store";
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.use(VueApollo);

const graphqlEndpoint = new HttpLink({ uri: 'https://c2c-backend.lars.ninja/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = store.state.accessToken
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    })
  
    return forward(operation)
  })

const apolloClient = new ApolloClient({
    link: authMiddleware.concat(graphqlEndpoint),
    cache: new InMemoryCache(),
    connectToDevTools: true
})

export default new VueApollo({
    defaultClient: apolloClient,
})