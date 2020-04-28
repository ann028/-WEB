import http from '../main'
export default{
// 产品资料列表
async findProductInfoList(data: any) {
  return http.post('/outProduct/outProduct/findProductInfoList', data)
},
// 导出产品列表
async exportProductInfo(data: any) {
  return http.postDownload1('/outProduct/outProduct/exportList', data)
},
// 产品详情
async getProductInfo(param: any) {
  return http.get('/outProduct/outProduct/findById?' +  param)
},
// 获取系统已生效的产品筛查指标
async getOKProdIndexs() {
  return http.get('/productControl/IndexSelect/getOKProdIndexs')
},
// 根据筛查条件，搜索产品，分页返回查询结果(天风环境)
async selectProductList(param: any) {
  return http.post('/outProduct/ProductSelect/selectProductList', param)
},
// 导出筛查出的产品列表
async exportSelectList(param: any) {
  return http.postDownload1('/outProduct/ProductSelect/exportSelectList', param)
},
}
