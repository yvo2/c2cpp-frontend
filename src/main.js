import Vue from "vue";
import App from "./App.vue";

import Vuex from 'vuex'

import Ionic from "@ionic/vue";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import { IonicVueRouter } from "@ionic/vue";


Vue.use(VueApollo)
Vue.use(IonicVueRouter);
Vue.use(Ionic);
Vue.use(Vuex)

Vue.config.productionTip = false;

const router = new IonicVueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/tabs",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/pages/HomePage.vue"),
      children: [
        {
          path: "tab1",
          name: "tab1",
          components: {
            tab1: () =>
              import(/* webpackChunkName: "tab1" */ "@/pages/Tab1.vue")
          }
        },
        {
          path: "tab1/details",
          name: "tab1-details",
          components: {
            tab1: () =>
              import(
                /* webpackChunkName: "tab1" */ "@/pages/Tab1Details.vue"
              )
          }
        },
        {
          path: "tab2",
          name: "tab2",
          components: {
            tab2: () =>
              import(/* webpackChunkName: "tab2" */ "@/pages/Tab2.vue")
          }
        }
      ]
    },
    {
      path: "/login",
      alias: "/signup",
      component: () =>
        import("@/pages/Onboarding.vue"),
    },
    { path: "/", redirect: "login" }
  ]
})

const apolloClient = new ApolloClient({
  uri: 'https://countries.trevorblades.com/'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    getToken(state) {
      return state.token
    }
  }
})


new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount("#app");