<template>
  <main class="container">
    <div id="departDaily">
      <Step :stepName="message"></Step>
      <div  style="margin-top:20px;display:flex;justify-content:space-between">
        <section class="flex">
          <el-date-picker
            v-model="timeValue"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="value"
            :clearable="false"
            class="line">
          </el-date-picker>
          <section class="flex m0">
            <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">员工姓名</span>
            <el-input v-model="searchInfo.userName" clearable placeholder="请输入内容" class="line"></el-input>
          </section>
          <!-- <section class="m0">
            <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">部门</span>
            <el-select v-model="searchInfo.department" placeholder="请选择" class="text1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </section> -->
          <section class="flex m0" v-if="tab === '工作'">
            <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">机构名称</span>
            <el-input v-model="searchInfo.mechanism" clearable placeholder="xx银行xx分行" class="line"></el-input>
          </section>
        <button class="btn btn_primary" style="width:76px;height:32px;" @click="search">查询</button>
        </section>
        <section class="flex">
          <button class="btn btn_warning" style="width:76px;height:32px;" @click="outPut" v-if="permission.includes('prm1125')">
            <img src="../../assets/img/send2.png" alt="" style="width:16px;height:16px">
            导出</button>
          <!-- <el-button type="primary">新增</el-button> -->
        </section>
      </div>
      <div style="margin-top:27px">
        <el-tabs type="border-card" @tab-click="handleclick" v-model="tab">
          <el-tab-pane label="工作" name="工作">
            <el-table
              :data="tableData"
              style="width: 100%"
              :header-cell-style="{background:'#F5F6FA'}"
              @row-click="viewInfo">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                :index="indexMethod"
                width="50">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="员工姓名"
                align="center">
              </el-table-column>
              <el-table-column
                prop="departName"
                label="部门"
                align="center">
              </el-table-column>
              <el-table-column
                prop="dailyAt"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="mechanism"
                label="机构名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="mechanismDept"
                label="机构部门"
                align="center">
              </el-table-column>
              <el-table-column
                prop="workProgress"
                label="工作进展"
                align="center">
              </el-table-column>
              <el-table-column
                label="状态"
                align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.state === 'COMMIT'">已提交</span>
                    <span v-if="scope.row.state === 'DRAFT'" style="color:#5792FC">暂存</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="updateAt"
                label="提交时间"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                  <div class="main-around">
                      <span
                      style="cursor: pointer;margin-right:31px;color:#5792FC" @click.stop="toRoute(scope.row.id)"
                      v-if=" permission.includes('prm1123')"
                    >
                    <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                    编辑</span>
                    <span
                      style="cursor: pointer;color:#5792FC"
                      @click.stop="deleteDep(scope.row.id,scope.row.state,scope.row.statistics)"
                      v-if="permission.includes('prm1124')"
                    >
                    <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                    删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="请假" name="请假">
            <el-table
              :data="leavetableData"
              style="width: 100%"
              :header-cell-style="{background:'#F5F6FA'}" @row-click="viewInfo">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                :index="indexMethod1"
                width="50">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="员工姓名"
                align="center">
              </el-table-column>
              <el-table-column
                prop="departName"
                label="部门"
                align="center">
              </el-table-column>
              <el-table-column
                label="请假类型"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.type | leaveStatusFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="开始时间"
                align="center">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="结束时间"
                align="center">
              </el-table-column>
              <el-table-column
                prop="day"
                label="请假天数"
                align="center">
              </el-table-column>
              <el-table-column
                label="状态"
                align="center">
                <template slot-scope="scope">
                  <span v-if='scope.row.state === "COMMIT"'> 已提交</span>
                  <span v-if='scope.row.state === "DRAFT"' style="color:#5792FC"> 暂存</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createAt"
                label="提交时间"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope" >
                  <div class="main-around">
                    <span
                      style="cursor: pointer;color:#5792FC;"  @click.stop="toRoute(scope.row.id)"
                      v-if="scope.row.state === 'DRAFT' && permission.includes('prm1123')">
                      <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                    编辑</span>
                    <span
                      style="cursor: pointer;color:#5792FC"
                      @click.stop="deleteDep(scope.row.id)"
                      v-if=" permission.includes('prm1124')"
                    >
                    <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                    删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex" style="margin-top:15px;justify-content:space-between">
        <section>
          <span class="word">共<span style="color:#5792FC">{{this.pageJson.total}}</span>条</span>
          <el-select v-model="pageValue" placeholder="10条/页" style="width:101px;height:28px" @change="changePage(pageValue)">
            <el-option value="1" label="10条/页"></el-option>
            <el-option value="2" label="20条/页"></el-option>
            <el-option value="3" label="30条/页"></el-option>
            <!-- <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option> -->
          </el-select>
        </section>
        <section>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageJson.currentPage"
              :page-size="pageJson.pageSize"
              layout="prev, pager, next, jumper"
              :total="pageJson.total">
          </el-pagination>
        </section>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue,Watch} from 'vue-property-decorator';
 import { daily } from '@/api/index';
 import Step from '@/components/Step.vue';
 @Component({
    components: {
      Step,
    },
  })
export default class DepartmentDaily extends Vue{
  private message=['日常管理','日报','部门表']
  private timeValue=''
  private searchInfo={
    mechanism:'',
    userName:''
  }
  private pageValue='1'
  private tableData=[]
  private leavetableData = []
  private tab: any = '工作'
  private options=[{
    value:'1',
    label:'销售沟通部'
  }]
  private departValue=''
  private currentTabledata=[]
  // 分页相关数据
  private pageJson = {
    total: this.tableData.length,
    currentPage: 1,
    pageSize: parseInt(this.pageValue) * 10,

  };
  public get permission() {
    return this.$store.state.permission
  }
  //  导出日报-部门表
  private async outPut(){
    let res:any = await daily.outputDepart({
      endTime:this.timeValue[1],
      mechanism: this.searchInfo.mechanism,
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      // sortType": "string",
      startTime: this.timeValue[0],
      userName: this.searchInfo.userName
    })
    let res1 = res.data
    var blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download =`日报-${this.timeValue[0]}-${this.timeValue[1]}.xls` ; //下载后文件名'日报-部门表.xls'
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
  // 设置当前时间
  private nowTime() {
    const date = new Date();
    const dateTime  = date.getTime();
    const dateDay = date.getDay();
    let end = new Date(dateTime)
    let beg = new Date(dateTime - 30*24*60*60*1000)
    // let end = new Date(dateTime - dateDay*24*60*60*1000)
    // let beg = new Date(dateTime -(dateDay + 6)*24*60*60*1000)
    const year = beg.getFullYear();   // '2019'
    const month = beg.getMonth() + 1 < 10 ? '0' + (beg.getMonth() + 1) : (beg.getMonth() + 1);  // '04'
    const da = beg.getDate() < 10 ? '0' + beg.getDate() :beg.getDate();  // '12'
    const year1 = end.getFullYear();   // '2019'
    const month1 = end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);  // '04'
    const da1 = end.getDate() < 10 ? '0' + end.getDate() :end.getDate();  // '12'
    const beg1 = `${year}-${month}-${da}`
    const end1 = `${year1}-${month1}-${da1}`
    let dat: any = [];
    dat = [beg1, end1]; // 将值设置给插件绑定的数据
    this.timeValue = dat;
  }
  // 时间选择器改变时触发
  private value(val: any) {
    this.timeValue = val;
  }
  // tab标签页切换
  private handleclick(tab:any,event:any){
      this.tab = tab.label
  }
  // 日报--部门--工作
  private async getDepartinfo(){
    let res: any = await daily.getDailydepart({
      endTime: this.timeValue[1],
      mechanism: this.searchInfo.mechanism || '',
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      startTime: this.timeValue[0],
      userName: this.searchInfo.userName
    })
    let index:number =0
    let count:number = 0
    for(var i=0,len = res.data.data.records.length;i<len;i++){
        let pageNum:number= this.pageJson.currentPage
        let pageSize:number = this.pageJson.pageSize
        count+=1
        index = (pageNum - 1)*pageSize+count
        res.data.data.records[i]['index'] = index
    }
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  //日报--部门--请假
  private async getDepartLeave(){
    let res:any = await daily.getdepartLeave({
      endTime: this.timeValue[1],
      mechanism: this.searchInfo.mechanism||'',
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      startTime: this.timeValue[0],
      userName: this.searchInfo.userName
    })
    let index:number =0
    let count:number = 0
    for(var i=0,len = res.data.data.records.length;i<len;i++){
        let pageNum:number= this.pageJson.currentPage
        let pageSize:number = this.pageJson.pageSize
        count+=1
        index = (pageNum - 1)*pageSize+count
        res.data.data.records[i]['index'] = index
    }
    this.leavetableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  } 
  // 查看
  private viewInfo(row:any){
    if(this.$store.state.permission.includes('prm1122')) {
      // this.$router.push({name:'detail',query:{id:row.id,type:'depart'}})
      if(this.tab=='工作'||this.tab==''){
        this.$router.push({name: 'detail', query: {id: row.id,type:'工作'}});
      }else if(this.tab=='请假'){
        this.$router.push({name:'leaveDetail', query: {id: row.id,type:'请假'}})
      }
    } else {
      this.$message.error(`暂无查看详情权限`)
    }
   
  }
  // Depart
  private async deleteDep1(id:any,state:any,isDel:any){
    if(this.tab === '工作'||this.tab === ''){
        // if(isDel === 'YES'){
        //   this.$message.error(`该项已统计，不可删除`)
        //   return false
        // }
        let res:any = await daily.deleteDepart(`id=${id}`)
        if(res.data.success){
          this.$message.success('删除成功!')
          this.getDepartinfo()
        }else{
          this.$message.error(`${res.data.msg}`)
        }
    }else if(this.tab === '请假'){
      let res:any = await daily.deletePersonleave(`id=${id}`)
       if(res.data.success){
          this.$message.success('删除成功!')
          this.getDepartLeave()
        }else{
          this.$message.error(`${res.data.msg}`)
        }
    }
    
  }
  private deleteDep(id:any,state:any,isDel:any){
    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDep1(id,state,isDel)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
    });
  }
  // 点击查看
  private search(){
    if(this.tab === '工作'){
      this.getDepartinfo()
    }else if(this.tab === '请假'){
        this.getDepartLeave()
    }
  }
  // 
  private handleCurrentChange(val:any){
    this.pageJson.currentPage = val
    if(this.tab === '工作'){
      this.getDepartinfo()
    }else if(this.tab === '请假'){
      this.getDepartLeave()
    }
  }
  private changePage(val: any) {
    this.pageJson.currentPage = 1;
    this.pageJson.pageSize = parseInt(val) * 10;
    if(this.tab === '工作'){
      this.getDepartinfo()
    }else if(this.tab === '请假'){
      this.getDepartLeave()
    }
  }
  // 路由跳转
  private toRoute(userId:any){
    if(this.tab=='工作'||this.tab == ''){
      this.$router.push({name:'departEdit',query:{userId:userId,type:'1'}})
    }else if(this.tab=='请假'){
      this.$router.push({name:'departEdit',query:{userId:userId,type:'2'}})
    }
  }
  @Watch('tab') private tabChange(val:any,oldval:any){
    this.pageJson.currentPage = 1
    this.pageValue = '1'
    if(val=='工作'){
        this.getDepartinfo() // 获取个人表--工作信息
    }else if(val=='请假'){
        this.getDepartLeave() //获取个人表--请假信息
    }
  }
  // 序号
  private indexMethod(index: any) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize * 1 + index + 1 
  }
  private indexMethod1(index: any) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize * 1 + index + 1 
  }
  created() {
    this.nowTime()
    this.getDepartinfo()  //部门工作
  }
  
}
</script>
<style lang="less" scoped>
.container{
  #departDaily{
    /deep/.el-date-editor .el-range-separator,.el-input__icon{
      height:32px
    }
    /deep/.el-input__icon{
      line-height: 26px;
    }
    .line{
      width:224px !important;
    }
    .m0{
      margin-right:10px;
    }
    
    .word{
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(102,102,102,1);
      line-height:19px;
      margin-right:5px;
    }
  }
}
</style>