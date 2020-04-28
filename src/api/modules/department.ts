import http from '../main';

export default {
  // 新增或编辑部门
  async addOrUpdate(department: object) {
    return http.post('/user/departMent/addOrUpdate', department);
  },
  // 删除部门
  async del(departmentId: number) {
    return http.get(`/user/departMent/del?id=${departmentId}`);
  },
  // 获取部门树
  async findAll() {
    return http.get('/user/departMent/findAll');
  },
  // 获取部门详情
  async findById(departmentId: number) {
    return http.get(`/user/departMent/findById?id=${departmentId}`);
  },
};
