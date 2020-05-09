import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Index from '@/components/DefaultIndex.vue';
import store from '../store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: 'index',
    meta: {
      auth: 1,
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/Index.vue'),
        meta: {
          title: '首页',
          icon: '',
        },
      },
      {
        path: '/projects',
        name: 'projects',
        component: Index,
        children: [
          {
            path: '/project',
            name: 'project',
            component: () => import('@/views/Project/Projects.vue'),
            meta: {
              title: '项目管理添加',
              icon: '',
              requireAuth: true,
            },
          },
          {
            path: '/addProject',
            name: 'addProject',
            component: () => import('@/views/Project/AddProject.vue'),
            meta: {
              title: '项目管理添加',
              icon: '',
              requireAuth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },

];

const router = new Router({
  mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//   const state: any = store.state
//   const token = state.auth.userInfo.token || window.sessionStorage.getItem('token');
//   console.log(to)
//   if (to.matched.some((record) => record.meta.auth)) {
//     if (!token) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath },
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})


export default router;
