<template>
  <div class="container">
    <main class="content">
      <Step :stepName="message"></Step>
      <div style="overflow-y: auto">
        <div  style="margin-top: 20px;display: flex;justify-content: space-between;">
          <section class="flex">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
              :clearable="false"
              class="line">
            </el-date-picker>
            <section class="flex m0" v-if="tab === '工作'">
              <span style="flex-shrink: 0;font-size: 14px;color: rgba(96,98,102,1);margin: 0 10px 0 20px;line-height: 28px;">机构名称</span>
              <el-input v-model="mechanism" placeholder="xx银行xx分行" clearable class="line"></el-input>
            </section>
            <button class="btn btn_primary" style="width: 76px;height: 32px;margin-left: 10px;" @click="searchInfo">查询</button>
          </section>
          <section class="flex">
            <button  class="btn btn_succ" style="width: 106px;height: 32px;margin-right: 20px" @click="allSubmit">
              <img src="../../assets/img/submit_all.png" alt="" style="width: 16px;height: 16px;">
              一键提交
            </button>
            <button  class="btn btn_primary" style="width:76px;height:32px;" @click="$router.push({name:'edit'})">
              <img src="../../assets/img/addition.png" alt="" style="width: 16px;height: 16px;">
              新增
            </button>
          </section>
        </div>
        <div style="margin-top:27px">
          <el-tabs type="border-card" @tab-click="handleclick" v-model="tab">
            <el-tab-pane label="工作" name="工作">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#F5F6FA'}"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                @row-click="viewInfo">
                <el-table-column
                  type="selection"
                  width="45">
                </el-table-column>
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
                  width="110"
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
                      <span v-if='scope.row.state=="COMMIT"'>已提交</span>
                      <span v-if='scope.row.state=="DRAFT"' style="color:#5792FC">暂存</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="updateAt"
                  label="提交时间"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column label="操作" align="center" width="220px">
                  <template slot-scope="scope" >
                    <div class="main-around">
                      <span style="cursor: pointer;color:#5792FC;" @click.stop="toRoute(scope.row.id)" >
                        <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                        编辑
                      </span>
                      <span style="cursor: pointer;color:#5792FC;"  @click.stop='changeState(scope.row.id)'>
                        <img src="../../assets/img/submit_personSub.png" alt="" style="width:13px;height:13px">
                        提交
                      </span>
                      <span style="cursor: pointer;color:#5792FC" @click.stop="deletePerson(scope.row.id,scope.row.state,scope.row.statistics)" >
                        <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                        删除
                      </span>
                      <span style="cursor: pointer;color:#5792FC" @click.stop="toRoute(scope.row.id, 'copy')" >
                        <img src="../../assets/img/copy.png" alt="" style="width:18px">
                        复制
                      </span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="请假" name='请假'>
              <el-table
                :data="leaveTabledata"
                style="width: 100%"
                :header-cell-style="{background:'#F5F6FA'}"
                @row-click="viewInfo"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="45">
                </el-table-column>
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                  :index="indexMethod1"
                  align="center">
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
                  width="110"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  label="结束时间"
                  width="110"
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
                    <span v-if='scope.row.state === "COMMIT"'>已提交</span>
                    <span v-if='scope.row.state === "DRAFT"' style="color:#5792FC">暂存</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createAt"
                  label="提交时间"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column label="操作" align="center" width="200px">
                  <template slot-scope="scope" class="flex">
                    <div class="main-around">
                      <span style="cursor: pointer;color:#5792FC" @click.stop="toRoute(scope.row.id)" v-if="scope.row.state === 'DRAFT'">
                        <img src="../../assets/img/editor.png" alt="" style="width: 13px;height: 13px;">
                        编辑
                      </span>
                      <span style="cursor: pointer;color:#5792FC;" @click.stop='changeState(scope.row.id)' v-if="scope.row.state === 'DRAFT'">
                        <img src="../../assets/img/submit_personSub.png" alt="" style="width: 13px;height: 13px;">
                        提交
                      </span>
                      <span style="cursor: pointer;color:#5792FC" @click.stop="deletePerson(scope.row.id,scope.row.state)">
                        <img src="../../assets/img/trash.png" alt="" style="width: 13px;height: 13px;">
                        删除
                      </span>
                    </div>
                </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="main_space pagination_box">
          <section>
            <span class="word">共<span style="color: #5792FC;">{{pageJson.total}}</span>条</span>
            <el-select v-model="pageValue" placeholder="10条/页" style="width: 101px;height: 28px" @change="changePage(pageValue)">
              <el-option value="1" label="10条/页"></el-option>
              <el-option value="2" label="20条/页"></el-option>
              <el-option value="3" label="30条/页"></el-option>
            </el-select>
          </section>
          <section>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageJson.currentPage"
              :page-size="pageJson.pageSize"
              layout="prev, pager, next, jumper"
              :total="pageJson.total"
              v-if="pageJson.total != 0">
            </el-pagination>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { daily } from '@/api/index';
import Step from '@/components/Step.vue';
import {obj1} from '@/utils/util'
import { Message } from 'element-ui';

@Component({
  components: {
    Step,
  },
})

export default class PersonalDaily extends Vue {
  private message = ['日常管理','日报','个人表']
  private timeValue : any[] = []
  private mechanism: any = ''
  private pageValue: any = '1'
  private tableData: any[] = [] // 工作表格数据
  private leaveTabledata: any[] = [] // 请假表格数据
  private tab =  sessionStorage.getItem('tab') || '工作' // tab标签页
  private multiSelection: any[] = [] // 选择项
  // 分页相关数据
  private pageJson = {
    total: this.tableData.length,
    currentPage: 1,
    pageSize: parseInt(this.pageValue) * 10,
  };

  public get permission() {
    return this.$store.state.permission
  }

  @Watch(`mechanism`) private Mechanism(val: any, oldVal: any) {
    sessionStorage.setItem('mechanism', val)
  }
  // 工作
  public async getDailyInfo() {
    const res: any = await daily.getDailyperson({
      endTime: this.timeValue[1],
      mechanism: this.mechanism || '',
      pageNum: this.pageJson.currentPage * 1,
      pageSize: this.pageJson.pageSize,
      startTime: this.timeValue[0],
    });
    this.tableData = res.data.data.records;
    this.pageJson.total = res.data.data.total;
  }
  // 请假
  public async getleaveInfo() {
    let res: any = await daily.getLeaveperson({
      endTime: this.timeValue[1],
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      startTime: this.timeValue[0],
    })
    this.leaveTabledata = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  // 时间选择器改变时触发
  private changeTime(val: any) {
    sessionStorage.setItem('timeValue', val.toString())
    this.timeValue = val;
  }
  // 查看
  private viewInfo(row: any) {
    // if ( this.$store.state.permission.includes('prm1112') ) {
    //   if (this.tab === '工作' || this.tab === '') {
    //     this.$router.push({name: 'detail', query: {id: row.id, type: '工作'}});
    //   } else if (this.tab === '请假') {
    //     this.$router.push({name:'leaveDetail', query: {id: row.id ,type: '请假'}})
    //   }
    // } else {
    //   this.$message.error(`暂无查看详情权限`)
    // }
    
  }
  // tab标签页切换
  private handleclick(tab: any, event: any) {
    this.tab = tab.label
    sessionStorage.setItem('tab', `${tab.label}`)
  }
  // 提交
  private async changeState(id: any) {
    this.multiSelection = id
    if (this.tab === '工作') {
      let res: any = await daily.batchperson(`ids=${this.multiSelection}`)
      if (res.data.success) {
        this.$message.success('提交成功')
        this.getDailyInfo()
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.multiSelection = []
    } else if (this.tab === '请假') {
      let res: any = await daily.batchLeave(`ids=${this.multiSelection}`)
      if (res.data.success) {
        this.$message.success('提交成功')
        this.getleaveInfo()
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    }
  }
//  批量提交
  private handleSelectionChange(val: any) {
    let arr: any = []
    for (var i = 0; i < val.length; i++) {
      arr.push(val[i].id)
    }
    this.multiSelection = arr
  }
  // 批量提交
  private async allSubmit() {
    if (!this.multiSelection.length) {
      this.$message.warning('请对批量提交项进行选择')
      return false
    }
    if (this.tab === '工作') {
      let res:any = await daily.batchperson(`ids=${this.multiSelection}`)
      if (res.data.code === 0) {
        this.$message.success('提交成功')
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.getDailyInfo()
      this.multiSelection = []
    } else if(this.tab == '请假') {
      let res: any = await daily.batchLeave(`id=${this.multiSelection}`)
      if (res.data.code === 0) {
        this.$message.success('提交成功')
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.getleaveInfo() 
      this.multiSelection = []
    }
  }
  // 删除
  private deletePerson(userId: any, state: any, isDel: any) {
    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.deletePerson1(userId, state, isDel)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }
  private async deletePerson1(userId: any, state: any, isDel: any) {
      if (this.tab === '工作' || this.tab === '') {
        //  if(isDel === 'YES'){
        //    this.$message.error(`该项已统计，不可删除`)
        //    return false
        //  }
        let res: any = await daily.deletePerson(`id=${userId}`)
        if (res.data.success) {
          this.$message.success('删除成功!')
          this.getDailyInfo()
        } else {
          this.$message({
            message:res.data.msg,
            type:'error'
          })
        }
      } else if (this.tab === '请假') {
        let res: any = await daily.deletePersonleave(`id=${userId}`)
        if (res.data.success) {
          this.$message.success('删除成功!')
          this.getleaveInfo()
        } else {
          this.$message({
            message:res.data.msg,
            type:'error'
          })
        }
      }
  }
  // 修改页码当前页
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
    sessionStorage.setItem('currentPage', `${val}`)
    if (this.tab === '工作') {
      this.getDailyInfo()
    } else if (this.tab === '请假') {
      this.getleaveInfo()
    }
  }
  // 修改页码--每页显示数量
  private changePage(val: any) {
    sessionStorage.setItem('pageSize', `${val}`)
    sessionStorage.setItem('currentPage', `1`)
    this.pageJson.currentPage = 1;
    this.pageJson.pageSize = parseInt(val) * 10;
    if (this.tab === '工作') {
      this.getDailyInfo()
    } else if (this.tab === '请假') {
      this.getleaveInfo()
    }
  }
  // 路由跳转
  private toRoute(userId: any, operation?: string) {
    if (this.tab === '工作' || this.tab === '') {
      this.$router.push({name: 'edit', query: {userId: userId, type: '1', operation: operation}})
    } else if (this.tab === '请假'){
      this.$router.push({name: 'edit', query: {userId: userId, type: '2'}})
    }
  }
  //查询按钮
  private searchInfo() {
    this.pageJson.currentPage = 1
    if (this.tab === '工作') {
      this.getDailyInfo()
    } else if (this.tab === '请假') {
      this.getleaveInfo()
    }
  }
  @Watch('tab') private tabChange(val: any, oldval: any) {
    let current: any = sessionStorage.setItem('currentPage', `1`) 
    this.pageJson.currentPage = current * 1 || 1
    // let pageSize1: any = sessionStorage.setItem('pageSize', `1`) 
    let pageSize: any = sessionStorage.getItem('pageSize') || '1'
    this.pageValue = pageSize
    this.pageJson.pageSize = pageSize * 10
    // this.pageValue = '1'
    if (val === '工作') {
      this.getDailyInfo() // 获取个人表--工作信息
    } else if (val === '请假'){
      this.getleaveInfo() //获取个人表--请假信息
    }
  }
  // 序号
  private indexMethod(index: any) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1 
  }
  private indexMethod1(index: any) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1 
  }
  private created() {
    // this.handleCurrentChange(val)
    // this.nowTime()
    this.timeValue = obj1.getNowtime()
    let current: any = sessionStorage.getItem('currentPage')  || 1
    this.pageJson.currentPage = current * 1
    this.tab = sessionStorage.getItem('tab') || '工作'
    let timeValue: any = sessionStorage.getItem('timeValue') || this.timeValue.toString()
    this.timeValue = timeValue.split(',')
    this.mechanism = sessionStorage.getItem('mechanism') || ''
    let pageSize: any = sessionStorage.getItem('pageSize') || '1'
    this.pageValue = pageSize
    this.pageJson.pageSize = pageSize * 10
    if (this.tab === '工作') {
       this.getDailyInfo() // 获取个人表--工作信息
    } else {
      this.getleaveInfo() //获取个人表--请假信息
    }
  }
  private beforeRouteLeave(to: any, from: any, next: any) {
    if (to.name === 'detail' || to.name ==='leaveDetail' || to.name === 'edit') {
      next()
    }else {
      sessionStorage.removeItem('timeValue')
      sessionStorage.removeItem('currentPage')
      sessionStorage.removeItem('mechanism')
      sessionStorage.removeItem('tab')
      sessionStorage.removeItem('pageSize')
      next()
    }
  }
}
</script>
<style lang="less" scoped>
main{
  overflow-y: auto;
  // background: #fff;
}
#PersonalDaily{
  /deep/.el-date-editor .el-range-separator,.el-input__icon{
    height:32px
  }
  /deep/.el-input__icon{
    line-height: 26px;
  }
  .edit_btn{
    display: inline-block;
    height: 100%;
  }
  .container{
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

    .pagination_box{
      margin-top:15px;
    }
  }
}
</style>