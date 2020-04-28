import Vue from 'vue';
import Vuex from 'vuex';
import { user, role } from '../../api';
import { Message } from 'element-ui';
import router from '@/router';

Vue.use(Vuex);

interface Iuser {
  userId: number;
  token: string;
}

export default new Vuex.Store({
  state: {
    userInfo: {
      userId: window.sessionStorage.getItem('userId') || NaN,
      token: window.sessionStorage.getItem('token') || '',
      user: {},
    },
    permission: [],
    isHeader: true,
    isAside: true,
  },
  mutations: {
    saveUserToken(state, data: Iuser) {
      state.userInfo.userId = data.userId;
      state.userInfo.token = data.token;

      window.sessionStorage.setItem('userId', data.userId.toString());
      window.sessionStorage.setItem('token', data.token);
    },
    saveUserInfo(state, userInfo) {
      state.userInfo.user = {
        ...userInfo,
      };
    },
    setUserPermission(state, permission) {
      const permissionSet: any = new Set()
      permission.forEach((ele: any) => {
        permissionSet.add(ele.keyCode)
        permissionSet.add(ele.parentCode)
      });
      state.permission = Array.from(permissionSet)
    },
    clearUserToken(state) {
      state.userInfo.userId = NaN;
      state.userInfo.token = '';
      state.userInfo.user = {};
      state.permission = []

      window.sessionStorage.removeItem('userId');
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('permission')
      router.push({path: '/login'})
      Message.success('您已退出登录')
    },
    changeMune(state: any, payload: any) {
      state.isHeader = payload.head;
      state.isAside = payload.aside;
    },
  },
  actions: {
    saveUser({ commit }, data) {
      commit('saveUserToken', data);
      this.dispatch('getUserInfo');
      this.dispatch('getUserPermission')
    },
    async getUserInfo({ commit }) {
      const res = await user.userInfo();
      const {code, msg = '', data} = res.data
      if (code === 0) {
        commit('saveUserInfo', data);
      } else {
        Message.warning(`登录过期，请重新登录`);
        router.push({path: '/login'});
      }
    },
    async logOut( {commit } ) {
      await user.userLogout()
      commit('clearUserToken')
    },
    async getUserPermission({ commit }) {
      const res: any = await role.findUserMenu()
      const { code, msg = '', data} = res.data
      if (code === 0) {
        commit('setUserPermission', data)
      } else {
        Message.warning(`获取用户权限失败，请重新登录`);
        router.push({path: '/login'});
      }
    },
    changeM({ commit }: any, data: any) {
      commit('changeMune', data)
    },
  },
});
