import http from '../main';

export default {
  async getDailyperson(data: any) {
    return http.post('/daily/daily/findByPersonal', data);
  },
  async getLeaveperson(data: any) {
    return http.post('/daily/leaveApplication/findByPersonal', data);
  },
  async getEditperson(params: string) {  // 根据userId查看个人信息
    return http.get('/daily/daily/findById?' + params );
  },
  async deletePerson(params: string) { // 根据userId删除个人信息
    return http.get('/daily/daily/deletePersonal?' + params);
  },
  // 新增日报--工作
  async addDailyperson(data: any) {
    return http.post('/daily/daily/add', data);
  },
  async getEditleave(params: string) {
    return http.get('/daily/leaveApplication/findById?' + params);
  },
  // 日报--请假表删除
  async deletePersonleave(params: string) {
    return http.get('/daily/leaveApplication/delete?' + params);
  },
  // 新增日报--请假
  async addleavePerson(data: any) {
    return http.post('/daily/leaveApplication/add', data);
  },
  // 更新日报-- 工作
  async updatePerson(data: any) {
    return http.post('/daily/daily/update', data);
  },
  // 更新日报--请假
  async updateleavePerson(data: any) {
    return http.post('/daily/leaveApplication/update', data);
  },
  // 批量提交日报--工作
  async batchperson(params: any) {
    return http.get('/daily/daily/batchCommit?' +  params);
  },

  // 批量提交日报--请假
  async batchLeave(params: any) {
    return http.get('/daily/leaveApplication/batchCommit?' + params);
  },

  // 部门
  async getDailydepart(data: any) {  // 部门工作单
    return http.post('/daily/daily/findByDepartment', data);
  },
  async getdepartLeave(data: any) { // 部门请假单
    return http.post('/daily/leaveApplication/findByDepartment', data);
  },
  async deleteDepart(params: any) {
    return http.get('/daily/daily/deleteByDepartment?' + params);
  },
  // 导出日报---部门表
  async outputDepart(data: any) {
    return http.postDownload('/daily/daily/importByDepartment', data);
  },

  // 周报--个人
  async getweeklyPerson(data: any) {
    return http.post('/daily/weekly/findByPersonal', data);
  },
  // 周报-个人-导出
  async exportPerson(data: any ) {
    return http.postDownload('/daily/weekly/exportByPersonal', data);
  },
  // 周报-部门-导出（部门）
  async exportDepart(data: any) {
    return http.postDownload('/daily/weekly/exportByDepartment', data);
  },
  // 周报-部门-导出（个人）
  async exportDepartP(data: any) {
    return http.postDownload('/daily/weekly/exportByPersonal', data);
  },
  // 周报--部门(部门数据)
  async getweeklyDepart(data: any) {
    return http.post('/daily/weekly/findByDepartment', data);
  },
  // 周报--部门（个人数据）
  async getweeklyDepartP(data: any) {
    return http.post('/daily/weekly/findByPersonal', data);
  },
  // 周报-部门表修改提交
  async updateDepart(data: any) {
    return http.post('/daily/daily/updateByWeekly', data);
  },
  // 周报-统计表--实际表（部门数据）
  async findActual(data: any) {
    return http.post('/daily/statistics/statisticsAct', data);
  },
  // 周报-统计表--实际表（个人）
  async findActualP(data: any) {
    return http.post('/daily/statistics/statisticsActByPersonal', data);
  },
  // 周报-统计表--折算表(部门数据)
  async findConversion(data: any) {
    return http.post('/daily/statistics/statisticsConversion', data);
  },
  // 周报-统计表--折算表（个人）
  async findConversionP(data: any) {
    return http.post('/daily/statistics/statisticsConversionByPersonal', data);
  },
  // 周报-统计表导出--实际表(部门数据)
  async exportAct(data: any) {
    return http.postDownload('/daily/statistics/exportByAct', data);
  },
  // 周报-统计表导出--实际表(个人)
  async exportActP(data: any) {
    return http.postDownload('/daily/statistics/exportByActPersonal', data);
  },
  // 周报-统计表导出--折算表（部门）
  async exportConversion(data: any) {
    return http.postDownload('/daily/statistics/exportByConversion', data);
  },
  // 周报-统计表导出--折算表（部门）
  async exportConversionP(data: any) {
    return http.postDownload('/daily/statistics/exportByConversionByPersonal', data);
  },
  // 周报--重新计算
  async reCalcula(params: any) {
    return http.get('/daily/weekly/statistical?' + params )
  },



  // 培训会议(部门数据)
  async getMeetinginfo(data: any) {
    return http.post('/daily/trainMeet/findByDepartment', data);
  },
  // 培训会议(个人)
  async getMeetinginfoP(data: any) {
    return http.post('/daily/trainMeet/findByPersonal', data);
  },
  // 培训会议---新增
  async addMeeting(data: any) {
    return http.post('/daily/trainMeet/add', data);
  },
  // 培训会议---更新
  async updateMeeting(data: any) {
    return http.post('/daily/trainMeet/update', data);
  },
  // 培训会议---编辑
  async editmeetInfo(params: string) {
    return http.get('/daily/trainMeet/findById?' + params);
  },
  // 培训会议---删除（个人）
  async deletemeetInfoP(params: string) {
    return http.get('/daily/trainMeet/delete?' + params)
  },
  // 培训会议---删除（部门）
  async deletemeetInfo(params: string) {
    return http.get('/daily/trainMeet/deleteByDepartment?' + params)
  },
  // 培训会议---导出（个人）
  async exportMeetP(data: any) {
    return http.postDownload(`/daily/trainMeet/exportByPersonal`, data);
  },
  // 培训会议---导出（部门）
  async exportMeet(data: any) {
    return http.postDownload(`/daily/trainMeet/exportByDepartment`, data);
  },
  // 培训会议--导入模板
  async exportTemplate() {
    return http.postDownload('/daily/trainMeet/exportTemplate')
  },
  // 培训会议---导入
  async importMeet(data: any) {
    return http.postDownload(`/trainMeet/importTrainMeet`, data);
  },

  // 系统设置---查询所有达标值
  async findStand() {
    return http.get('/daily/dailyStandard/findAll')
  },
  // 系统设置---获取部门树
  async geDeptree() {
    return http.get(`/user/departMent/findAll`)
  },
  // 系统设置---添加达标值
  async addStand(data: any) {
    return http.post('/daily/dailyStandard/add', data)
  },
  // 系统设置---删除达标值
  async deleteStand(params: string) {
    return http.get('/daily/dailyStandard/delete?' + params);
  },
  // 系统设置---编辑
  async editStand(data: any) {
    return http.post(`/daily/dailyStandard/update`, data);
  },
  // 系统设置---获取时间
  async getSystime() {
    return http.get(`/user/SystemParamService/findAll`);
  },
  // 系统设置---修改系统时间
  async updateSystime(data: any) {
    return http.post(`/user/SystemParamService/update`, data)
  },
};
