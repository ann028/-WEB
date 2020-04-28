import http from '../main';

export default {
  // 获取验证码
  async getCaptcha() {
    return http.getPic('/user/common/captcha');
  },
  // 新增或编辑用户
  async addOrUpdate(data: any) {
    return http.post('/user/account/addOrUpdate', {userAccount: data});
  },
  // 用户登录
  async userLogin(data: any, token?: string) {
    return http.post('/user/account/login', data, token);
  },
  // 用户退出登录
  async userLogout() {
    return http.post('/user/account/logout');
  },
  // 获取用户信息
  async userInfo() {
    return http.get('/user/account/info');
  },
  // 查询用户列表-分页
  async searchUserList(data: any) {
    return http.post('/user/account/searchList', data);
  },
  // 新增或编辑用户
  async addOrUpdateUser(data: any) {
    return http.post('/user/account/addOrUpdate', data);
  },
  // 根据指定的部门ID获取所有下级部门的用户信息
  async findBydepartMentId(departMentId: number) {
    return http.get(`/user/account/findBydepartMentId?departMentId=${departMentId}`);
  },
  // 删除用户信息
  async delUser(userId: number) {
    return http.get(`/user/account/del?id=${userId}`);
  },
  // 给用户设置部门
  async setUserDepartment(departmentId: number, ids: any[]) {
    return http.get(`/user/account/changeDepartment?departmentId=${departmentId}&ids=${ids}`)
  },

  // 重置密码
  async resetPassword(data: any) {
    return http.post(`/user/account/resetPassword`, data)
  },
  // 查询费用类别
  async getCosttype( params: any ) {
    return http.get(`/user/dictionary/findByType?` + params)
  },

};
