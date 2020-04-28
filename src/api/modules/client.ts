import http from '../main'
export default {
  // 查询个人直销单
  async getSellbyperson( data: any) {
    return http.post(`/ancillaryBusiness/directSellingCustomer/findByPersonal`, data)
  },
  // 查询部门直销单
  async getSellbydepart( data: any) {
    return http.post(`/ancillaryBusiness/directSellingCustomer/findByDepartment`, data)
  },
  // 新增直销单
  async addSell( data: any) {
    return http.post(`/ancillaryBusiness/directSellingCustomer/add`, data)
  },
  // 删除直销单
  async delSell( params: any) {
    return http.get(`/ancillaryBusiness/directSellingCustomer/delete?` + params)
  },
  // 修改
  async updateSell( data: any) {
    return http.post(`/ancillaryBusiness/directSellingCustomer/update`, data)
  },
  // id获取详情
  async findsellById( params: any) {
    return http.get(`/ancillaryBusiness/directSellingCustomer/findById?` + params)
  },
  // 导出（个人）
  async exportByperson(data: any) {
    return http.postDownload(`/ancillaryBusiness/directSellingCustomer/exportByPersonal`, data)
  },
  // 导出（部门）
  async exportBydepart(data: any) {
    return http.postDownload(`/ancillaryBusiness/directSellingCustomer/exportByDepartment`, data)
  },
  // 新增子表信息
  async addSoninfo(data: any) {
    return http.post(`/ancillaryBusiness/directSellingCustomer/addInfo`, data)
  },
  // 删除子表
  async delSoninfo(params: any) {
    return http.get(`/ancillaryBusiness/directSellingCustomer/deleteInfo?` + params)
  },
  // 修改子表
  async updateSoninfo(data: any) {
    return http.post(`/ancillaryBusiness/directSellingCustomer/updateInfo`, data)
  },
  // 直销日报
  // 查询个人直销日报
  async getClientByperson(data: any) {
    return http.post(`/daily/directDaily/findByPersonal`, data)
  },
  // 新增直销日报
  async addClientDailyInfo(data: any) {
    return http.post(`/daily/directDaily/add`, data)
  },
  // 修改直销日报
  async upClientDailyInfo(data: any) {
    return http.post(`/daily/directDaily/update`, data)
  },
  // 新增参与人
  async addParticipant(data: any) {
    return http.post(`/daily/directDaily/addParticipant`, data)
  },
  // 新增调研进度
  async addInfo(data: any) {
    return http.post(`/daily/directDaily/addInfo`, data)
  },
  // 修改调研进度
  async updateInfo(data: any) {
    return http.post(`/daily/directDaily/updateInfo`, data)
  },
  //  删除调研进度
    async deleteInfo(params: any) {
      return http.get(`/daily/directDaily/deleteInfo?` + params)
    },
  // 根据id查询详情
  async findById(params: any) {
    return http.get(`/daily/directDaily/findById?` + params)
  },
  // 删除直销日报
  async deleteClientDaily(params: any) {
    return http.get(`/daily/directDaily/delete?` + params)
  },
  // 导出（个人日报）
  async exportDailyByperson(data: any) {
    return http.postDownload(`/daily/directDaily/exportByPersonal`, data)
  },
  // 根据id查询参与人
  async getParticipantById(params: any) {
    return http.get(`/daily/directDaily/searchParticipants?` + params)
  },
  // 部门
  // 查询部门直销日报
  async getClientBydepart(data: any) {
    return http.post(`/daily/directDaily/findByDepartment`, data)
  },
  // 导出（部门日报）
  async exportDailyBydepart(data: any) {
    return http.postDownload(`/daily/directDaily/exportByDepartment`, data)
  },
 }
