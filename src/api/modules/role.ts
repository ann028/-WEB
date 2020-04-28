import http from '../main';

export default {
  // 查询所有权限或指定角色对应的权限
  async findRolePermission(roleId?: number) {
    return http.get(`/user/role/findRolePermission${roleId ? `?roleId=${roleId}` : ''}`)
  },
  // 获取当前用户菜单相应的权限
  async findRoleUrlByMenu(keyCode: string, type?: string) {
    return http.get(`/user/role/findRoleUrlByMenu?keyCode=${keyCode}&type=${type}`)
  },
  // 获取当前用户菜单
  async findUserMenu() {
    return http.get(`/user/role/findUserMenu`)
  },
  // 查询所有角色信息
  async findRoleList() {
    return http.get(`/user/role/findRoleList`)
  },
  // 创建或更新用户角色
  async addorUpdateRole(role: object) {
    return http.post('/user/role/addorUpdateRole', role)
  },
  // 删除角色
  async delRole(roleId: number) {
    return http.get(`/user/role/delRole?roleId=${roleId}`)
  },
  // 添加角色用户
  async addRoleUsers(roleId: number, userIds: number[]) {
    return http.get(`/user/role/addRoleUser?roleId=${roleId}&userIds=${userIds}`)
  },
  // 删除角色用户
  async delRoleUser(roleId: number, userIds: number[]) {
    return http.get(`/user/role/delRoleUser?roleId=${roleId}&userIds=${userIds}`)
  },
  // 为角色配置权限
  async addRolePermission(role: {
    roleId: number,
    trees: any[],
  }) {
    return http.post('/user/role/addRolePermission', role)
  },
}
