import http from '../main'
export default {
// 获取维度列表
async getCompareDimension() {
  return http.get(`/outProduct/ProductCompare/getCompareDimension`)
},
// 模糊搜索产品
async findProductInfoNoPageList(data: any) {
  return http.post(`/outProduct/outProduct/findProductInfoNoPageList`, data)
},
// 产品比较
async exeProductCompare(data: any) {
  return http.post(`/outProduct/ProductCompare/exeProductCompare`, data)
},
// 根据基金账户获取客户基本信息
async findCustomerInfoByFundAccount(params: any) {
  return http.get(`/outProduct/outProduct/findCustomerInfoByFundAccount?fundAccount=` + params)
},
// 根据基金账户获取客户持仓信息
async findSharesInfoByFundAccount(params: any) {
  return http.get(`/outProduct/outProduct/findSharesInfoByFundAccount?fundAccount=` + params)
},
}
