import http from '../main'
export default{
  ////////////// 报销
   // 查询个人列表(报销)
  async getReimbyperson( data: any) {
    return http.post(`/ancillaryBusiness/reimbursement/findByPersonal`, data)
  },
  // 查询部门列表（报销）
  async getREimbyDepart(data: any) {
    return http.post(`/ancillaryBusiness/reimbursement/findByDepartment`, data)
  },
  // 新增报销单
  async addReim( data: any) {
    return http.post(`/ancillaryBusiness/reimbursement/add`, data)
  },
  // 更新报销单
  async updateReim( data: any) {
    return http.post(`/ancillaryBusiness/reimbursement/update`, data)
  },
  // 根据id查看
  async getReimByid(params: any) {
    return http.get(`/ancillaryBusiness/reimbursement/findById?` + params)
  },
  // 删除报销单
  async delReim(params: any) {
    return http.get(`/ancillaryBusiness/reimbursement/delete?` + params)
  },
  // 导出报销单(个人)
  async exportReimByperson(data: any) {
    return http.postDownload(`/ancillaryBusiness/reimbursement/exportPersonal`, data)
  },
  // 导出报销单（部门）
  async exportReimBydepart(data: any) {
    return http.postDownload(`/ancillaryBusiness/reimbursement/exportDepartment`, data)
  },
  // 查看个人报销单汇总
  async staticReimByperson( params: any ) {
    return http.get(`/ancillaryBusiness/reimbursement/statisticsByPersonal?` + params)
  },
  // 部门报销单汇总
  async staticReimBydepart( params: any ) {
    return http.get(`/ancillaryBusiness/reimbursement/statisticsByDepartment?` + params)
  },
  // 导出报销单列表
  async exportReim(params: any) {
    return http.getBlob(`/ancillaryBusiness/reimbursement/exportStatistics?` + params)
  },






///////////////// 预算
  async getBudbyperson( data: any) {
    return http.post(`/ancillaryBusiness/budget/findByPersonal`, data)
  },
  // 预算（部门）
  async getBudBydepart(data: any) {
    return http.post(`/ancillaryBusiness/budget/findByDepartment`, data)
  },
  // 新增预算单
  async addBud(data: any) {
    return http.post(`/ancillaryBusiness/budget/add`, data)
  },
  // 更新预算单
  async updateBud(data: any) {
    return http.post(`/ancillaryBusiness/budget/update`, data)
  },
  // 根据id查看
  async getBudByid(params: any) {
    return http.get(`/ancillaryBusiness/budget/findById?` + params)
  },
  // 删除预算单
  async delBud(params: any) {
    return http.get(`/ancillaryBusiness/budget/delete?` + params)
  },
  // 导出预算单(geren)
  async exportBudByperson(data: any) {
    return http.postDownload(`/ancillaryBusiness/budget/exportPersonal`, data)
  },
  // 导出预算单（部门）
  async exportBudBydepart(data: any) {
    return http.postDownload(`/ancillaryBusiness/budget/exportDepartment`, data)
  },
  // 个人预算汇总
  async staticBudByperson(params: any) {
    return http.get(`/ancillaryBusiness/budget/statisticsByPersonal?` + params)
  },
  // 部门预算汇总
  async staticBudBydepart(params: any) {
    return http.get(`/ancillaryBusiness/budget/statisticsByDepartment?` + params)
  },
  // 导出预算列表
  async exportBudStatistic(params: any) {
    return http.getBlob(`/ancillaryBusiness/budget/exportStatistics?` + params)
  },



  // 销售费率
  // 查询
  async getSaleinfo(data: any) {
    return http.post(`/ancillaryBusiness/marketRate/findAll`, data)
  },
  // 根据id查看
  async getInfoById(params: any) {
    return http.get(`/ancillaryBusiness/marketRate/findById?` + params)
  },
  // 新增
  async addSaleInfo(data: any) {
    return http.post(`/ancillaryBusiness/marketRate/add`, data)
  },
  // 更新
  async updataSaleInfo(data: any) {
    return http.post(`/ancillaryBusiness/marketRate/update`, data)
  },
  // 删除
  async deleteSaleInfo(params: any) {
    return http.get(`/ancillaryBusiness/marketRate/delete?` + params)
  },
}
