import requset from '../utils/request';
import Component from 'vue-class-component';
const get = async (url: string) => {
  return requset.get(url, {
    headers: {
      'Token': window.sessionStorage.getItem('token') || null,
      'Token-Id': window.sessionStorage.getItem('userId') || null,
    },
  });
};

const getPic = async (url: string, params?: any ) => {
  return new Promise((resolve, reject) => {
    requset({
      method: 'get',
      url,
      data: {},
      params,
      responseType: 'arraybuffer',
      headers: {
        'Token': window.sessionStorage.getItem('token') || null,
        'Token-Id': window.sessionStorage.getItem('userId') || null,
      },
    })
    .then((res: any) => {
      resolve(res);
    })
    .catch((err: any) => {
      reject(err);
    });
  });
};
const getBlob = async (url: string, params?: any ) => {
  return new Promise((resolve, reject) => {
    requset({
      method: 'get',
      url,
      data: {},
      params,
      responseType: 'blob',
      headers: {
        'Token': window.sessionStorage.getItem('token') || null,
        'Token-Id': window.sessionStorage.getItem('userId') || null,
      },
    })
    .then((res: any) => {
      resolve(res);
    })
    .catch((err: any) => {
      reject(err);
    });
  });
};
const post = async (url: string, data?: any, token?: string) => {
  return requset.post(url, data, {
    headers: {
      'Token': token || window.sessionStorage.getItem('token'),
      'Token-Id': window.sessionStorage.getItem('userId') || null,
    },
  });
};
const postDownload = async (url: string, data?: any, token?: string) => {
  return requset.post(url, data, {
    responseType: 'blob',
    headers: {
      'Token': token || window.sessionStorage.getItem('token'),
      'Token-Id': window.sessionStorage.getItem('userId') || null,
      'Platform': 'PC',
    },
  });
};
const postDownload1 = async (url: string, data?: any, token?: string) => {
  return requset.post(url, data, {
    responseType: 'blob',
    headers: {
      'Token': token || window.sessionStorage.getItem('token'),
      'Token-Id': window.sessionStorage.getItem('userId') || null,
      'Platform': 'PC',
      'Content-Type': 'application/json;charset=gbk',
    },
  });
};
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
export default {
  get,
  getPic,
  getBlob,
  post,
  postDownload,
  postDownload1,
};
