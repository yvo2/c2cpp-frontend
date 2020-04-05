import Vue from "vue";
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
    uri: 'https://c2c-backend.lars.ninja/graphql'
})

export default new VueApollo({
    defaultClient: apolloClient,
})