import http from '../main';
export default {
  // 首页条件筛选
  async searchHome(data: any) {
    return http.post(`/cmdp/cmdpFile/list`, data)
  },
  // 查询文件(首页)
  // async getHomePage( params: any) {
  //   return http.get(`/cmdp/cmdpFile/homePage?` + params)
  // },
   // 查询文件(首页)
  async getHomePage(data: any) {
    return http.post(`/cmdp/cmdpFile/homePage`, data)
  },
  // 查询文件（子集）
  async getChildrenPage(params: any) {
    return http.get(`/cmdp/cmdpFile/searchPaperInfo?` + params)
  },
  // 新建文件夹
  async createFilefload( data: any) {
    return http.post('/cmdp/cmdpFile/addPaper', data)
  },
  // 删除文件/文件夹
  async deleteFile( params: any) {
    return http.get('/cmdp/cmdpFile/del?' + params)
  },
  // 重命名
  async renameFile( params: any) {
    return http.get('/cmdp/cmdpFile/rename?' + params)
  },
  // 打包文件
  async packageFile( params: any) {
    return http.get('/cmdp/cmdpFile/packPaper?' + params )
  },
  // 判断打包是否完成
  async isPackage( params: any) {
    return http.get('/cmdp/cmdpFile/searchDownloadPackAge?' + params)
  },
  // 下载文件夹
  async downLoad(params: any) {
    return http.postDownload('/cmdp/cmdpFile/download?' + params)
  },
  // 下载文件
  async downloadFile(params: any) {
    return http.getBlob('/attachment/attachment/downLoadById?' +  params)
  },
  //  移动文件夹
  async moveFile(params: any) {
    return http.get('/cmdp/cmdpFile/remove?' + params)
  },
  // 上传文件
  // 返回objectId
  async getFileId( data: any) {
    return http.post('/cmdp/attachment/saveAttachment', data)
  },
  // 上传文件
  async uploadFile(params: any) {
    return http.get('/cmdp/cmdpFile/upload?' + params)
  },
  // 添加成员
  async addUser(data: any) {
    return http.post('/cmdp/cmdpFile/addMember', data)
  },
  // 查看所属文件夹的成员列表
  async getUserlist(params: any) {
    return http.get('/cmdp/cmdpFile/searchFolderUser?' +  params)
  },
  // 根据ID查看当前用户所属文件夹的角色
  async getFloderrole(params: any) {
    return http.get('/cmdp/cmdpFile/searchFolderRole?' + params)
  },


  // 日志
  async getLog( data: any) {
    return http.post('/cmdp/operationLog/searchList', data)
  },




  // 回收站
  // 查询文件
  async getReducefile(data: any) {
    return http.post('/cmdp/recycleInfo/list', data)
  },
  // 还原已删除文件
  async reduceFile(data: any) {
    return http.post('/cmdp/recycleInfo/restore', data)
  },
  // 永久删除
  async perDelefile(data: any) {
    return http.post('/cmdp/recycleInfo/shred' , data)
  },
}
