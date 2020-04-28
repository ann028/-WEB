import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Index from '@/views/Index.vue';
import store from './store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      auth: 1,
    },
    children: [
      {
        path: 'daily',
        name: 'daily',
        component: Index,
        children: [
          {
            path: 'journal',
            name: 'journal',
            component: Index,
            children: [
              {
                path: 'personal',
                name: 'personal',
                component: () => import('@/views/Daily/PersonalDaily.vue'),
              },
              {
                path: 'department',
                name: 'department',
                component: () => import('@/views/Daily/DepartmentDaily.vue'),
              },
            ],
          },
          {
            path: 'Clientjournal',
            name: 'Clientjournal',
            component: Index,
            children: [
              {
                path: 'clientList',
                name: 'clientList',
                component: () => import('@/views/ClientDaily/ClientList.vue'),
              },
              {
                path: 'clientdailyAdd',
                name: 'clientdailyAdd',
                component: () => import('@/views/ClientDaily/ClientDailyAdd.vue'),
              },
              {
                path: 'clientDepartList',
                name: 'clientDepartList',
                component: () => import('@/views/ClientDaily/ClientDepartList.vue'),
              },
            ],
          },
          {
            path: 'weekly',
            name: 'weekly',
            component: Index,
            children: [
              {
                path: 'weekPersonal',
                name: 'weekPersonal',
                component: () => import('@/views/Daily/weekly1.vue'),
              },
              {
                path: 'weekDepart',
                name: 'weekDepart',
                component: () => import('@/views/Daily/weeklyDepart.vue'),
              },
            ],
          },
          {
            path: 'meeting',
            name: 'meeting',
            component: () => import('./views/Daily/Meeting1.vue'),
          },
          // 部门/日报/个人表/详情
          {
            name: 'detail',
            path: 'detail',
            component: () => import('./views/Daily/Detail.vue'),
          },
          // 部门/日报/个人表/请假详情
          {
            name: 'leaveDetail',
            path: 'leaveDetail',
            component: () => import('./views/Daily/leaveDetail.vue'),
          },
          // // 部门/日报/个人表/编辑
          {
            name: 'edit',
            path: 'edit',
            component: () => import('./views/Daily/Edit.vue'),
          },
          // 部门/日报/部门表/编辑
          {
            path: 'departEdit',
            name: 'departEdit',
            component: () => import('./views/Daily/departEdit.vue'),
          },
          // 培训会议/详情
          {
            name: 'mettingDetail',
            path: 'mettingDetail',
            component: () => import('./views/Daily/MeetingDetail.vue'),
          },
          // 培训会议/编辑
          {
            name: 'mettingEdit',
            path: 'mettingEdit',
            component: () => import('./views/Daily/MeetingEdit.vue'),
          },
          // 日报/周报/统计表/实际表
          {
            name: 'actualTable',
            path: 'actualTable',
            component: () => import('./views/Daily/actualTable.vue'),
          },
          // 日报/周报/统计表/折算表
          {
            name: 'conversionTable',
            path: 'conversionTable',
            component: () => import('./views/Daily/conversionTable.vue'),
          },
        ],
      },
      {
        path: 'databank',
        name: 'databank',
        component: Index,
        children: [
          {
            path: 'common',
            name: 'common',
            component: Index,
            children: [
              {
                path: 'DatabankCommon',
                name: 'DatabankCommon',
                component: () => import('@/views/dataBase/DatabankCommon.vue'),
              },
              {
                path: 'JournalCommon',
                name: 'JournalCommon',
                component: () => import('@/views/dataBase/JournalCommon.vue'),
              },
              {
                path: 'RecycleCommon',
                name: 'RecycleCommon',
                component: () => import('@/views/dataBase/RecycleCommon.vue'),
              },
            ],
          },
          {
            path: 'mine',
            name: 'mine',
            component: Index,
            children: [
              {
                path: 'DatabankCommon1',
                name: 'DatabankCommon1',
                component: () => import('@/views/dataBase/DatabankCommon.vue'),
              },
              {
                path: 'RecycleCommon1',
                name: 'RecycleCommon1',
                component: () => import('@/views/dataBase/RecycleCommon.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'account',
        name: 'account',
        component: Index,
        children: [
          {
            path: 'userManage',
            name: 'userManage',
            component: () => import('./views/Setting/UserManage.vue'),
          },
          {
            path: 'roleManage',
            name: 'roleManage',
            component: () => import('./views/Setting/RoleManage.vue'),
          },
        ],
      },
      {
        path: 'conference',
        name: 'conference',
        component: Index,
        redirect: '/conference/conference',
        children: [
          {
            path: '/',
            name: 'conference',
            component: () => import('./views/Conference/Conference.vue'),
          },
          {
            path: 'conferenceEdit',
            name: 'conferenceEdit',
            component: () => import('./views/Conference/ConferenceEdit.vue'),
          },
        ],
      },
      {
        path: 'client',
        name: 'client',
        component: Index,
        redirect: '/client/client',
        children: [
          {
            path: '/',
            name: 'client',
            component: () => import('./views/Client/Client.vue'),
          },
          {
            path: 'clientInfo',
            name: 'clientInfo',
            component: () => import('./views/Client/ClientInfo.vue'),
          },
          {
            path: 'clientAdd',
            name: 'clientAdd',
            component: () => import('./views/Client/ClientAdd.vue'),
          },
        ],
      },
      {
        path: 'setting',
        name: 'setting',
        component: Index,
        redirect: '/setting/setting',
        children: [
          {
            path: '/',
            name: 'setting',
            component: () => import('./views/Setting/Setting.vue'),
          },
        ],
      },
      {
        path: 'finance',
        name: 'finance',
        component: Index,
        children: [
          {
            path: 'Summary',
            name: 'Summary',
            component: Index,
            children: [
              {
                path: 'finance',
                name: 'finance',
                component: () => import('./views/Finance/Finance.vue'),
              },
              {
                path: 'budget',
                name: 'budget',
                component: () => import('./views/Finance/Budget.vue'),
              },
              {
                path: 'reimbursement',
                name: 'reimbursement',
                component: () => import('./views/Finance/Reimbursement.vue'),
              },
              {
                path: 'financeAdd',
                name: 'financeAdd',
                component: () => import('./views/Finance/FinanceAdd.vue'),
              },
            ],
          },
          {
            path: 'salerate',
            name: 'salerate',
            component: Index,
            // component: () => import('./views/Finance/Salerate.vue'),
            children: [
              {
                path: 'salerate',
                name: 'salerate',
                component: () => import('./views/Finance/Salerate.vue'),
              },
              {
                path: 'salerateEdit',
                name: 'salerateEdit',
                component: () => import('./views/Finance/SalerateEdit.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/PersonCenter',
        name: 'PersonCenter',
        component: Index,
        redirect: '/PersonCenter/PersonCenter',
        children: [
          {
            path: '/',
            name: 'PersonCenter',
            component: () => import('./views/PersonCenter.vue'),
          },
        ],
      },
      {
        path: 'product',
        name: 'product',
        component: Index,
        children: [
          {
            path: 'saleManage',
            name: 'saleManage',
            component: Index,
            children: [
              {
                path: 'saledetail',
                name: 'saledetail',
                component: () => import('./views/Product/SalesDetails.vue'),
              },
              {
                path: 'detailAdd',
                name: 'detailAdd',
                component: () => import('./views/Product/DetailsAdd.vue'),
              },
              {
                path: 'salesummary',
                name: 'salesummary',
                component: () => import('./views/Product/SalesSummary.vue'),
              },
            ],
          },
          {
            path: 'period',
            name: 'period',
            component: Index,
            children: [
              {
                path: 'openperiod',
                name: 'openperiod',
                component: () => import('./views/Product/Openperiod/Openperiod.vue'),
              },
              {
                path: 'nearopenperiod',
                name: 'nearopenperiod',
                component: () => import('./views/Product/Openperiod/Nearopenperiod.vue'),
              },
              {
                path: 'addproduct',
                name: 'addproduct',
                component: () => import('./views/Product/Openperiod/Addproduct.vue'),
              },
              {
                path: 'addopenperiod',
                name: 'addopenperiod',
                component: () => import('./views/Product/Openperiod/Addopen.vue'),
              },
            ],
          },
          {
            path: 'sharetransfer',
            name: 'sharetransfer',
            component: Index,
            children: [
              {
                path: 'sharemanage',
                name: 'sharemanage',
                component: () => import('./views/Product/Sharetransfer/ShareManage.vue'),
              },
              {
                path: 'shareadd',
                name: 'shareadd',
                component: () => import('./views/Product/Sharetransfer/ShareAdd.vue'),
              },
              {
                path: 'producttable',
                name: 'producttable',
                component: () => import('./views/Product/Sharetransfer/ProductTable.vue'),
              },
              {
                path: 'tableadd',
                name: 'tableadd',
                component: () => import('./views/Product/Sharetransfer/TableAdd.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'productstactis',
        name: 'productstactis',
        component: Index,
        children: [
          {
            path: 'productexhibition',
            name: 'productexhibition',
            component: () => import('./views/ProductStatics/ProductExhibition.vue'),
          },
          {
            path: 'fundDetail',
            name: 'fundDetail',
            component: () => import('./views/ProductStatics/FoundDetail.vue'),
          },
          {
            path: 'productscreen',
            name: 'productscreen',
            component: () => import(`./views/ProductStatics/ProductScreen.vue`),
          },
          {
            path: 'productcompare',
            name: 'productcompare',
            component: () => import(`./views/ProductStatics/ProductCompare.vue`),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
  },

];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const token = store.state.userInfo.token || window.sessionStorage.getItem('token');
  if (to.matched.some((record) => record.meta.auth)) {
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})


export default router;
