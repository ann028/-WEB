<template>
  <main class="container">
      <Step :stepName = 'message' :imgUrl = "imgUrl"></Step>
      <section class="flex  main_space" style="flex-wrap: wrap">
        <section class="flex mt20">
            <el-date-picker
              v-model="searchInfo.timeValue"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="searchBox"
              v-show="tab === '报销'">
            </el-date-picker>
            <el-date-picker
              v-model="searchInfo.mounthTime"
              type="month"
              placeholder="选择月份"
              value-format="yyyy-MM"
              class="searchBox"
              v-show="tab === '预算'">
            </el-date-picker>
            <section class="flex">
              <span class="search_title">费用发生人</span>
              <el-input v-model="searchInfo.userName" placeholder="请输入内容" maxlength="50" class="searchBox" clearable ></el-input>
            </section>
            <section class="flex" v-if="tab === '报销'">
              <span class="search_title">报销单号</span>
              <el-input v-model="searchInfo.order" placeholder="请输入内容" maxlength="50" class="searchBox" clearable ></el-input>
            </section>
            <section class="flex">
              <span class="search_title">费用类别</span>
              <el-cascader
                v-model="searchInfo.types"
                :options="typeList"
                clearable
                style="line-height: 32px"></el-cascader>
              <!-- <el-input v-model="searchInfo.type" placeholder="请输入内容" maxlength="50" class="searchBox"></el-input> -->
            </section>
            <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="getReimbyperson">查询</button>
        </section>
        <section class="flex">
          <button class="btn btn_warning mt20 " style="width:76px;height:32px;" @click="exportInfo" v-if="permission.includes('prm7115')" >
            <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
            导出</button>
          <button class="btn btn_primary ml20 mt20" style="width:76px;height:32px;" @click="toRoute" v-if="permission.includes('prm7111')">
            <img src="../../assets/img/addition.png" alt="" style="width:16px;height:16px">
            新增</button>
          </section>
      </section>
      <section class="mt20">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="报销" name= "报销" >
            <el-table
              :data="tableData"
              style="width: 100%"
              :header-cell-style="{background:'#F5F6FA'}"
              @row-click="viewInfo">
              <el-table-column
                type="selection"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="55"
                :index = "indexMethods"
                align="center">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="费用发生人"
                align="center">
              </el-table-column>
              <el-table-column
                prop="expenseDate"
                label="日期"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.expenseDate.split(' ')[0]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderId"
                label="报销单号"
                align="center">
              </el-table-column>
              <el-table-column
                prop="typeNames"
                label="费用类别"
                align="center">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额 "
                align="center">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="200"
                v-if="permission.includes('prm7112') || permission.includes('prm7114')">
                <template slot-scope="scope" >
                  <div class="main-around">
                    <span
                    style="cursor: pointer;color:#5792FC;" @click.stop="editInfo(scope.row.id)" v-if="permission.includes('prm7112')">
                    <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                  编辑</span>
                  <span
                    style="cursor: pointer;color:#5792FC;" @click.stop="deleteInfo(scope.row.id)" v-if="permission.includes('prm7114')"
                  >
                  <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                  删除</span>
                  </div>
                 
              </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="预算" name="预算">
            <el-table
              :data="budgetTableData"
              style="width: 100%"
              :header-cell-style="{background:'#F5F6FA'}"
               @row-click="viewInfo">
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="55"
                :index = "indexMethods"
                align="center">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="费用发生人"
                align="center">
              </el-table-column>
              <el-table-column
                prop="rmonth"
                label="月份"
                align="center">
              </el-table-column>
              <el-table-column
                prop="sumAmount"
                label="金额 "
                align="center">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="200"
                v-if="permission.includes('prm7112') || permission.includes('prm7114')">
               <template slot-scope="scope" >
                  <div class="main-around">
                    <span
                    style="cursor: pointer;color:#5792FC;" @click.stop="editInfo(scope.row.id)" v-if="permission.includes('prm7112')">
                    <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                  编辑</span>
                  <span
                    style="cursor: pointer;color:#5792FC;" @click.stop="deleteInfo(scope.row.id)" v-if="permission.includes('prm7114')"
                  >
                  <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                  删除</span>
                  </div>
                 
              </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </section>
      <div class="main_space pagination_box">
        <section>
          <span class="word">共<span style="color:#5792FC">{{pageJson.total}}</span>条</span>
          <el-select v-model="pageValue" placeholder="10条/页" style="width:101px;height:28px" @change="changePage(pageValue)">
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
              :total="pageJson.total">
          </el-pagination>
        </section>
      </div>
  </main>
</template>
<script lang="ts">
import { Prop, Vue, Component, Watch } from 'vue-property-decorator';
import Step from '@/components/Step.vue'
import { user, finance } from '@/api/index'
import { obj1 } from '@/utils/util'
@Component({
  components: {
    Step,
  },
})
export default class Finance extends Vue {
  private message = ['财务管理', '财务报销', '预算报销表']
  private imgUrl = require('../../assets/img/head/finance.png')
  private tab: string = ''
  private searchInfo: any = {
    timeValue: [],
    mounthTime: '',
    userName: '',
    order: '',
    types: [],
    type: '',
  }
  private tableData: any = []
  private budgetTableData: any = []
  private pageValue: any = '1'
  private pageJson = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
  }
  private typeList: any[] = []
  private activeName = sessionStorage.getItem('tab') || '报销'
  @Watch(`tab`) private tabValue(val: any, oldVal: any) {
    this.tab = val
    this.activeName = val
    sessionStorage.setItem('tab', `${this.tab}`)
    this.pageJson = {
      total: 0,
      currentPage: 1,
      pageSize: 10,
    }
    this.getReimbyperson()
    this.getCosttype()
  }
  // 报销--时间选择器
  @Watch(`searchInfo.timeValue`) private timeValue(val: any, oldVal: any) {
    sessionStorage.setItem('timeValue', val)
  }
  // 预算--时间选择器
  @Watch(`searchInfo.mounthTime`) private mounthTime(val: any, oldVal: any) {
    sessionStorage.setItem('mounthTime', val)
  }
  private get permission() {
    return this.$store.state.permission
  }
  // 查询费用类别
  private async getCosttype() {
    // this.typeList = []
    let nodeList = []
    if (this.tab === '报销') {
      const type: string = 'REIMBURSEMENT'
      const res: any = await user.getCosttype(`type=${type}`)
      nodeList = res.data.data
    } else if (this.tab === '预算') {
      const type: string = 'BUDGET'
      const res: any = await user.getCosttype(`type=${type}`)
      nodeList = res.data.data
    }
    const brr = this.getList(nodeList)
    this.typeList = brr
  }
  // 回调函数
  private getList(list: any) {
    const arr: any[] = []
    for ( let i = 0, len = list.length; i < len; i++) {
      if (list[i].child.length) {
        arr.push({
          label: list[i].name,
          value: list[i].id,
          children: this.getList(list[i].child),
        })
      } else {
        arr.push({
          label: list[i].name,
          value: list[i].id,
        })
      }
    }
    return arr
  }
  // 查询个人报销单
  private async getReimbyperson() {
    const data1 = sessionStorage.getItem('tab') || '报销'
    this.tab = data1
    const time: any = sessionStorage.getItem('timeValue')
    this.searchInfo.timeValue = time ? time.split(',') : this.searchInfo.timeValue
    const mounthTime: any = sessionStorage.getItem(`mounthTime`) || this.searchInfo.mounthTime
    this.searchInfo.mounthTime = mounthTime
    const current: any = sessionStorage.getItem('currentPage') || this.pageJson.currentPage
    this.pageJson.currentPage =  current * 1
    this.pageValue = sessionStorage.getItem('pageSize') || '1'
    // const pageSize: any =  Psize * 10 || this.pageJson.pageSize
    // this.pageValue = pageSize / 10 + '' || '1'
    this.pageJson.pageSize = this.pageValue * 10
    if ( this.tab === '报销') {
      const data = {
        endTime: this.searchInfo.timeValue[1],
        order: this.searchInfo.order,
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        startTime: this.searchInfo.timeValue[0],
        type: this.searchInfo.types[this.searchInfo.types.length - 1] || '',
        userName: this.searchInfo.userName,
      }
      if ( this.$store.state.permission.includes('prm7116')) {
        const res: any = await finance.getREimbyDepart(data)
        this.tableData = res.data.data.records
        this.pageJson.total = res.data.data.total
      } else {
        const res: any = await finance.getReimbyperson(data)
        this.tableData = res.data.data.records
        this.pageJson.total = res.data.data.total
      }
    } else if (this.tab === '预算') {
      const data = {
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        rmonth: this.searchInfo.mounthTime,
        type: this.searchInfo.type,
        userName: this.searchInfo.userName,
      }
      if ( this.$store.state.permission.includes('prm7116') ) {
        const res: any = await finance.getBudBydepart(data)
        this.budgetTableData = res.data.data.records
        this.pageJson.total = res.data.data.total
      } else {
        const res: any = await finance.getBudbyperson(data)
        this.budgetTableData = res.data.data.records
        this.pageJson.total = res.data.data.total
      }
    }
  }
  // 根据id查看
  private editInfo( id: any) {
    sessionStorage.setItem('tab', `${this.tab}`)
    if (this.tab === '报销') {
      this.$router.push({name: 'financeAdd', query: {id, type: 'edit', way: '1'}})
    } else if (this.tab === '预算') {
      this.$router.push({name: 'financeAdd', query: {id, type: 'edit', way: '2'}})
    }
  }
  private async viewInfo(row: any) {
    if ( this.$store.state.permission.includes('prm7113')) {
      if (this.tab === '报销') {
        this.$router.push({name: 'financeAdd', query: {id: row.id, way: '1'}})
      } else if (this.tab === '预算') {
        this.$router.push({name: 'financeAdd', query: {id: row.id, way: '2'}})
      }
    }
  }
  // 删除
  private async deleteInfo1(id: any) {
    if ( this.tab === '报销') {
      const res: any = await finance.delReim(`id=${id}`)
      if (res.data.success) {
        this.$message.success(`删除成功！`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    } else if (this.tab === '预算') {
      const res: any = await finance.delBud(`id=${id}`)
      if (res.data.success) {
        this.$message.success(`删除成功！`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    }
    this.getReimbyperson()
  }
  private deleteInfo(id: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.deleteInfo1(id)
    })
  }
  // 导出
  private async exportInfo() {
    let res: any
    if (this.tab === '报销') {
      const data = {
        endTime: this.searchInfo.timeValue[1],
        order: this.searchInfo.order,
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        startTime: this.searchInfo.timeValue[0],
        type: '',
        userName: this.searchInfo.userName,
      }
      if ( this.$store.state.permission.includes('prm7116') ) {
        res = await finance.exportReimBydepart(data)
      } else {
        res = await finance.exportReimByperson(data)
      }
    } else if (this.tab === '预算') {
      const data = {
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        rmonth: this.searchInfo.mounthTime,
        type: '',
        userName: this.searchInfo.userName,
      }
      if ( this.$store.state.permission.includes('prm7116') ) {
        res = await finance.exportBudBydepart(data)
      } else {
        res = await finance.exportBudByperson(data)
      }
    }
    const res1 = res.data
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download =
    `${this.tab}单-${this.searchInfo.timeValue[0]}-${this.searchInfo.timeValue[1]}.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  //
  private toRoute() {
    this.$router.push({name: 'financeAdd'})
  }
  // 修改currentPage
  private handleCurrentChange(val: any) {
    sessionStorage.setItem('currentPage', val)
    this.pageJson.currentPage = val
    this.getReimbyperson()
  }
  // 修改pageSize
  private changePage(val: any) {
    sessionStorage.setItem('pageSize', val)
    sessionStorage.setItem('currentPage', `1`)
    this.pageJson.currentPage = 1
    this.pageJson.pageSize = parseInt( val, 10 ) * 10
    this.getReimbyperson()
  }
  // 修改tab页标签值
  private handleClick(tab: any, event: any) {
    sessionStorage.setItem('currentPage', `1`)
    this.tab = tab.label
  }
  // 序号
  private indexMethods(index: any) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1
  }
  private created() {
    this.searchInfo.mounthTime = obj1.getNowmonth()
    this.searchInfo.timeValue = obj1.getNowtime();
    this.getReimbyperson() // 查询个人列表
    this.getCosttype()
  }
  private beforeRouteLeave(to: any, from: any, next: any) {
    if (to.name !== 'financeAdd') {
      sessionStorage.removeItem('tab')
      sessionStorage.removeItem('timeValue')
      sessionStorage.removeItem('mounthTime')
      sessionStorage.removeItem('currentPage')
      sessionStorage.removeItem('pageSize')
      next()
    } else {
      next()
    }
  }
}
</script>
<style lang="less" scoped >
main{
  /deep/ .el-date-editor .el-range-separator,.el-input__icon{
    height:32px
  }
  /deep/ .el-input__icon{
  line-height: 26px;
  }
    .mt20{
      margin-top: 20px;
    }
    .searchBox{
      width: 224px !important;
      height: 32px;
    }
    .search_title{
      flex-shrink: 0;
      font-size: 14px;
      color:rgba(96,98,102,1);
      line-height:32px;
      margin:0 12px 0 20px
    }
    .pagination_box{
      margin-top:15px;
    }
    .word{
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(102,102,102,1);
      line-height:19px;
      margin-right:5px;
    }
  }
</style>