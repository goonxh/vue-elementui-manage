import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user: {},
    isLogin: false,
}

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    isLogin(state, status) {
        state.isLogin = status;
    },
}

const actions = {};

export default new Vuex.Store({
    state,
    actions,
    mutations,
});