import Vue from 'vue';
// import App from './App.vue';
// import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/css/base.css'
import echarts from 'echarts';
import App from './App.vue';
import router from './router';
import * as Filter from './filters'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

// 注册过滤器
Object.keys(Filter).forEach((key: string) => {
  Vue.filter(key, (Filter as any)[key])
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
