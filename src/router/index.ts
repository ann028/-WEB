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
        path: 'project',
        name: 'project',
        component: Index,
        children: [
          {
            path: 'projects',
            name: 'projects',
            component: Index,
            children: [
              {
                path: 'projects',
                name: 'projects',
                component: () => import('@/views/Project/Projects.vue'),
                meta: {
                  title: '项目管理添加',
                  icon: '',
                },
              },
              {
                path: 'addProject',
                name: 'addProject',
                component: () => import('@/views/Project/AddProject.vue'),
                meta: {
                  title: '项目管理添加',
                  icon: '',
                },
              },
            ],
          },
        ],
      },
      {
        path: 'publisher',
        name: 'publisher',
        component: Index,
        children: [
          {
            path: 'publishers',
            name: 'publishers',
            component: Index,
            meta: {
              title: '发行人管理',
              icon: '',
            },
            children: [
              {
                path: 'publishers',
                name: 'publishers',
                component: () => import('@/views/Publisher/Publishers.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'agency',
        name: 'agency',
        meta: {
          title: '代办事项',
        },
        component: Index,
        children: [
          {
            path: 'supervision',
            name: 'supervision',
            component: Index,
            meta: {
              title: '督导',
              icon: '',
            },
            children: [
              {
                path: 'supervision',
                name: 'supervision',
                component: () => import('@/views/Agency/Supervision.vue'),
              },
            ],
          },
          {
            path: 'projectLeader',
            name: 'projectLeader',
            component: Index,
            meta: {
              title: '项目负责人',
              icon: '',
            },
            children: [
              {
                path: 'projectLeader',
                name: 'projectLeader',
                component: () => import('@/views/Agency/ProjectLeader.vue'),
              },
            ],
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
