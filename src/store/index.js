import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user: {},
}

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
}

const actions = {};

export default new Vuex.Store({
    state,
    actions,
    mutations,
});