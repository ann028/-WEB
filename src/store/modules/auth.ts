import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface Iuser {
  userId: number;
  token: string;
}

const auth = {
  state: {
    userInfo: {
      userId: window.sessionStorage.getItem('userId') || NaN,
      token: window.sessionStorage.getItem('token') || '',
      user: {},
    },
  },
  mutations: {
    SET_USER(state: any, data: Iuser ) {
      state.userInfo.userId = data.userId
      state.userInfo.token = data.token

      window.sessionStorage.setItem('userId', data.userId.toString())
      window.sessionStorage.setItem('token', data.token)
    },
  },
  actions: {
    saveUser({commit}: any, data: any) {
      commit('SET_USER', data)
    },
  },
}
export default auth;
