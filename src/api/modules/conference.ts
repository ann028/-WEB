import http from '../main'
export default{
  // 查询会议活动
  async getConference( data: any ) {
    return http.post(`/ancillaryBusiness/meeting/findAll`, data)
  },
  // 根据id查询
  async getInfobyid( params: any) {
    return http.get('/ancillaryBusiness/meeting/findById?' + params )
  },
  // 新增
  async addConference(data: any) {
    return http.post(`/ancillaryBusiness/meeting/add`, data)
  },
  // 更新
  async updateConference( data: any ) {
    return http.post(`/ancillaryBusiness/meeting/update`, data)
  },
  // 删除
  async delConference( params: any) {
    return http.get('/ancillaryBusiness/meeting/delete?' + params)
  },
  // 导出
  async exportConference( params: any) {
    return http.getBlob('/ancillaryBusiness/meeting/exportAll?' + params)
  },
}
