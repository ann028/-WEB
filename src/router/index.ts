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
      {
        path: 'matter',
        name: 'matter',
        component: Index,
        children: [
          {
            path: 'matters',
            name: 'matters',
            component: Index,
            meta: {
              title: '事项模板',
              icon: '',
            },
            children: [
              {
                path: 'matters',
                name: 'matters',
                component: () => import('@/views/Matter/Matters.vue'),
              },
              {
                path: 'addMatters',
                name: 'addMatters',
                component: () => import('@/views/Matter/AddMatter.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'draft',
        name: 'draft',
        meta: {
          title: '底稿管理',
        },
        component: Index,
        children: [
          {
            path: 'projectDraft',
            name: 'projectDraft',
            component: Index,
            meta: {
              title: '项目底稿',
              icon: '',
            },
            children: [
              {
                path: 'projectDraft',
                name: 'projectDraft',
                component: () => import('@/views/Draft/ProjectDraft.vue'),
              },
            ],
          },
          {
            path: 'directoryManage',
            name: 'directoryManage',
            component: Index,
            meta: {
              title: '目录管理',
              icon: '',
            },
            children: [
              {
                path: 'directoryManage',
                name: 'directoryManage',
                component: () => import('@/views/Draft/DirectoryManage.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'mailRecord',
        name: 'mailRecord',
        component: Index,
        children: [
          {
            path: 'mailRecord',
            name: 'mailRecord',
            component: Index,
            meta: {
              title: '发信记录',
              icon: '',
            },
            children: [
              {
                path: 'mailRecord',
                name: 'mailRecord',
                component: () => import('@/views/MailRecord/MailRecords.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'personCenter',
        name: 'personCenter',
        component: Index,
        children: [
          {
            path: 'personCenter',
            name: 'personCenter',
            component: () => import('@/views/PersonCenter.vue'),
            meta: {
              title: '个人中心',
              icon: '',
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

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: Home,
//     redirect: 'index',
//     meta: {
//       auth: 1,
//     },
//     children: [
//       {
//         path: 'index',
//         name: 'index',
//         component: () => import('@/views/Index.vue'),
//         meta: {
//           title: '首页',
//           icon: '',
//         },
//       },
//       {
//         path: 'project',
//         name: 'project',
//         component: Index,
//         children: [
//           {
//             path: 'projects',
//             name: 'projects',
//             component: () => import('@/views/Project/Projects.vue'),
//             meta: {
//               title: '项目管理列表',
//               icon: '',
//             },
//           },
//           {
//             path: 'addProject',
//             name: 'addProject',
//             component: () => import('@/views/Project/AddProject.vue'),
//             meta: {
//               title: '项目管理添加',
//               icon: '',
//             },
//           },
//         ],
//       },
//       {
//         path: 'publisher',
//         name: 'publisher',
//         component: Index,
//         children: [
//           {
//             path: 'publishers',
//             name: 'publishers',
//             component: () => import('@/views/Publisher/Publishers.vue'),
//           },
//         ],
//       },
//       {
//         path: 'agency',
//         name: 'agency',
//         component: Index,
//         children: [
//           {
//             path: 'supervision',
//             name: 'supervision',
//             component: Index,
//             children: [
//               {
//                 path: 'supervision',
//                 name: 'supervision',
//                 component: () => import('@/views/Agency/Supervision.vue'),
//               },
//             ],
//           },
//           {
//             path: 'projectLeader',
//             name: 'projectLeader',
//             component: Index,
//             meta: {
//               title: '项目负责人',
//               icon: '',
//             },
//             children: [
//               {
//                 path: 'projectLeader',
//                 name: 'projectLeader',
//                 component: () => import('@/views/Agency/ProjectLeader.vue'),
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('../views/Login.vue'),
//   },

// ];
const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const state: any = store.state
  const token = state.auth.userInfo.token || window.sessionStorage.getItem('token');
  console.log(to)
  // if (to.matched.some((record) => record.meta.auth)) {
  //   if (!token) {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath },
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  if (to.matched.length === 0) {  // 如果未匹配到路由
    from.name ? next({ name: from.name }) : next('/');   // 如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    console.log(111111)
    next();    // 如果匹配到正确跳转
  }
});
router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})


export default router;
