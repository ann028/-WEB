import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from '@/router'

const instance = axios.create({
  baseURL: '/api',
});

let loadingInstance: any;

instance.interceptors.request.use((config) => {
  if (config.url) {
    const url = config.url;
    const arr = url.split('/');
    const req = arr[arr.length - 1].split('?')[0];
    const reqUrl = req !== 'searchDownloadPackAge';
    let reqUrl1: boolean = false
    if (req === 'downLoadById' || req === 'download') {
      reqUrl1 = true
    }
    if (reqUrl) {
      loadingInstance = Loading.service({
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
      });
    }
    if (reqUrl1) {
      config.timeout = 60000;
    } else {
      config.timeout = 55000;
    }
  }
  config.headers['Content-Type'] = 'application/json;charset=utf-8'
  config.headers.Platform = 'PC'
  // config.timeout = 18000;
  return config;
}, async (error) => {
  loadingInstance.close();
  Message.error(`请求失败${error}`);
  return Promise.reject(error);
});
instance.interceptors.response.use((response: any) => {
  loadingInstance.close();
  switch (response.data.code) {
    case 100:
      router.push({name: 'login', query: {msg: '登录超时，请重新登录'}})
      break
    default:
      return response
  }
}, async (error) => {
  loadingInstance.close();
  Message.error(`请求失败${error}`);
  return Promise.reject(error);
});

export default instance;
