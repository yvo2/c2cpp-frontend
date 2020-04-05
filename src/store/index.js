import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex',
    storage: window.localStorage,
  })

export default new Vuex.Store({
    state: {
        accessToken: null,
        deniedOrderIds: []
    },
    mutations: {
        setAccessToken: (state, accessToken) => state.accessToken = accessToken,
        setDeniedOrderIds: (state, deniedOrderIds) => state.deniedOrderIds = deniedOrderIds,
    },
    actions: {},
    plugins: [vuexLocalStorage.plugin]
});