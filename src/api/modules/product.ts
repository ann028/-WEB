import http from '../main'
export default{
// 销售明细--查询
async getSaledetailInfo(data: any) {
  return http.post(`/productControl/salesdetail/findAll`, data)
},
// 根据id查看
async getSaledetailByid(params: any) {
  return http.get(`/productControl/salesdetail/findById?` + params)
},
// 销售明细--新增
async addSaledetailInfo(data: any) {
  return http.post(`/productControl/salesdetail/add`, data)
},
// 销售明细--更新
async updateSaledetailInfo(data: any) {
  return http.post(`/productControl/salesdetail/update`, data)
},
// 销售明细--删除
async delSaledetail(params: any) {
  return http.get(`/productControl/salesdetail/delete?` + params)
},
// 新增/编辑子集
async addSaleson(data: any) {
  return http.post(`/productControl/salesdetail/addOrUpdateInfo`, data)
},
// 删除子集
async delSaleson(params: any) {
  return http.get(`/productControl/salesdetail/deleteByInfo?` + params)
},
// 明细汇总
async saleStatics(params ?: any) {
  return http.get(`/productControl/salesdetail/findStatisticsList?` + params)
},
// 导出销售明细
async exportSaledetail(data: any) {
  return http.postDownload(`/productControl/salesdetail/exportList`, data)
},
// 导出销售汇总
async exportSalestatics(params: any) {
  return http.getBlob(`/productControl/salesdetail/exportStatisticsList?` +  params)
},
// 根据销售人员查询分行
async getBranch(params: any) {
  return http.get(`/productControl/salesdetail/findBranchByUserAndSeries?` + params)
},

///////// 系统设置 //////////////
// 新增可选用户配置
async assSalesetting(data: any) {
  return http.post(`/user/optional/addOrUpdate`, data)
},
// 查询用户可选配置列表
async getSaleperson(params: any) {
  return http.get(`/user/optional/findList?` + params)
},
// 查询用户所属部门
async getSaledepart(params: any) {
  return http.get(`/user/optional/findAll?` + params)
},

////////////////////// 产品代码 //////////////
// 查询所有
async findProduct() {
  return http.get(`/productControl/product/findAll`)
},
// 查询代码
async findAllproduct() {
  return http.get(`/outProduct/outProduct/findAllNameAndCode`)
},


////////////////// 开放周期表 ////////////////////
async getAllopenperiod(data: any) {
  return http.post(`/productControl/productOpenPeriod/findAll`, data)
},
// 新增开放期(产品)
async addProduct(data: any) {
  return http.post(`/productControl/productOpenPeriod/add`, data)
},
// 更新开放期(产品)
async updateProduct(data: any) {
  return http.post(`/productControl/productOpenPeriod/update`, data)
},
// 删除开放期(产品)
async deleteProduct(params: any) {
  return http.get(`/productControl/productOpenPeriod/delete?` + params)
},
// 根据id开放期(产品)
async getProductbyId(params: any) {
  return http.get(`/productControl/productOpenPeriod/findById?` + params)
},
// 新增子表
async addOpeninfo(data: any) {
  return http.post(`/productControl/productOpenPeriod/addInfo`, data)
},
// 更新子表
async updateOpeninfo(data: any) {
  return http.post(`/productControl/productOpenPeriod/updateInfo`, data)
},
// 删除子表
async deleteOpeninfo(params: any) {
  return http.get(`/productControl/productOpenPeriod/deleteInfoById?` + params)
},
// 根据id查询子表
async getOpeninfoByid(params: any) {
  return http.get(`/productControl/productOpenPeriod/findInfoById?` + params)
},
// 获取上一开放退出期
async getLasttime(params: any) {
  return http.get(`/productControl/productOpenPeriod/getLastTime?` + params)
},
// 近期开放一览表
async getNearfuture(data: any) {
  return http.post(`/productControl/productOpenPeriod/findNearFuture`, data)
},
// 导出开放期
async exportOpenperiod(data: any) {
  return http.postDownload(`/productControl/productOpenPeriod/exportAll`, data)
},
// 导出开放一览表
async exportNearfuture(data: any) {
  return http.postDownload(`/productControl/productOpenPeriod/exportNearFuture`, data)
},

//////////// 份额转让 ////////////
async getShareinfo(data: any) {
  return http.post(`/productControl/shareTransfer/findByStokeAndCodeOrName`, data)
},
// 新增份额转让
async addShareinfo(data: any) {
  return http.post(`/productControl/shareTransfer/add`, data)
},
// 更新
async updateShareinfo(data: any) {
  return http.post(`/productControl/shareTransfer/update`, data)
},
// 根据id查询（）
async getSharebyId(params: any) {
  return http.get(`/productControl/shareTransfer/findById?` + params)
},
// 根据id删除
async deleteSharebyId(params: any) {
  return http.get(`/productControl/shareTransfer/del?` + params)
},
//  获取约定交易额
async findMaxReservationNumber() {
  return http.get(`/productControl/shareTransfer/findMaxReservationNumber`)
},
// 导出
async exportShareinfo(data: any) {
  return http.postDownload(`/productControl/shareTransfer/export`, data)
},


////////////// 证券代码 //////////
// 获取All
async getStackcode(data: any) {
  return http.post(`/productControl/productStackCode/findAll`, data)
},
// 根据id删除
async delStackcodeByid(params: any) {
  return http.get(`/productControl/productStackCode/delete?id=` + params)
},
// 新增证券代码
async addStackcode(data: any) {
  return http.post(`/productControl/productStackCode/add`, data)
},
/// id查询证券代码
async getStackcodeByid(params: any) {
  return http.get(`/productControl/productStackCode/findById?` + params)
},
// 更新证券代码
async updateStackcode(data: any) {
  return http.post(`/productControl/productStackCode/update`, data)
},
// 导出
async exportStackcode(data: any) {
  return http.postDownload(`/productControl/productStackCode/export`, data)
},
}
