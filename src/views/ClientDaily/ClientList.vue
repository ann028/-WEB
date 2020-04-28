<template>
  <main class="container">
    <Step :stepName="message" :imgUrl="imgUrl"></Step>
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap">
      <section class="flex" style="flex-wrap:wrap">
        <el-date-picker
          value-format="yyyy-MM-dd"
          clearable
          v-model="searchInfo.timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="searchBox mt20"
        ></el-date-picker>
        <section v-if="tab === '工作'" class="flex mt20" style="flex-shrink:0">
          <span class="search_title">机构名称</span>
          <el-input v-model="searchInfo.mechanism" clearable style="line-height: 32px" placeholder="请输入内容"></el-input>
        </section>
        <section class="flex mt20" v-if="tab === '工作'">
          <span class="search_title" style="flex-shrink:0">机构类别</span>
          <el-input v-model="searchInfo.category" clearable style="line-height: 32px"  placeholder="请输入内容"></el-input>
        </section>
        <section v-if="tab === '工作'" class="flex mt20" style="flex-shrink:0">
          <span class="search_title">客户级别</span>
          <el-select v-model="searchInfo.level" clearable placeholder="">
            <el-option  value="1" label="一级"> </el-option>
            <el-option  value="2" label="二级"> </el-option>
            <el-option  value="3" label="三级"> </el-option>
          </el-select>
        </section>
        <button
          class="btn btn_primary ml20 mt20"
          style="width:76px;height:32px"
          @click="getSellinfo"
        >查询</button>
        <button
            class="btn btn_primary ml20 mt20"
            style="width:76px;height:32px"
            @click="$router.push({name: 'clientdailyAdd'})"
            v-if="permission.includes('prm1412')"
        >新增</button>
      </section>
    </div>
    <div style="margin-top: 20px">
      <el-tabs type="border-card" @tab-click="clickTab" v-model="tab">
        <el-tab-pane label="工作" name="工作">
          <el-table
              :data="tableData"
              :header-cell-style="{background:'#F5F6FA'}"
              style="width: 100%"
              @row-click="toDetail"
            >
              <el-table-column
                type="index"
                label="序号" 
                width="50" 
                :index="indexMethod" 
                align="center">
              </el-table-column>
              <el-table-column 
                prop="mechanism" 
                label="机构名称" 
                align="center">
              </el-table-column>
              <el-table-column 
                prop="mechanismCategory"
                label="机构类别" 
                align="center">
                <!-- <template slot-scope="scope">
                  <span>{{scope.row.category1}}</span>
                  <span v-if="scope.row.category2">-{{scope.row.category2}}</span>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="mechanismDept"
                label="机构部门" 
                align="center">
              </el-table-column>
              <el-table-column
                prop="secondSector"
                label="二级部门" 
                align="center">
              </el-table-column>
              <el-table-column 
                prop="contacts" 
                label="联系人" 
                align="center">
              </el-table-column>
               <el-table-column 
                prop="position" 
                label="职位" 
                align="center">
              </el-table-column>
               <el-table-column 
                label="客户级别"
                align="center">
                 <template slot-scope="scope">
                   <span v-if="scope.row.customerLevel==='1'">一级</span>
                   <span v-if="scope.row.customerLevel==='2'">二级</span>
                   <span v-if="scope.row.customerLevel==='3'">三级</span>
                 </template>
              </el-table-column>
               <el-table-column 
                prop="typeOfBusiness" 
                label="业务类别" 
                align="center">
              </el-table-column>
               <el-table-column 
                prop="dailyAt"
                label="最新时间"
                width="100"
                align="center">
              </el-table-column>
               <el-table-column 
                prop="workProgress" 
                label="工作进展" 
                align="center">
              </el-table-column>
              <el-table-column label="操作" align="center" class="main_center" width="150" v-if="permission.includes('prm1414') || permission.includes('prm1415')">
                <template slot-scope="scope">
                  <span
                    @click.stop="toDetail(scope, 'edit')"
                    style="color:#5792FC;cursor: pointer;margin-right: 5px"
                    v-if="permission.includes('prm1414')"
                  >
                    <img src="../../assets/img/editor.png" alt />
                    编辑
                  </span>
                  <span
                    @click.stop="deleteDetail(scope.row.id)"
                    style="color:#5792FC;cursor: pointer"
                    v-if="permission.includes('prm1415')"
                  >
                    <img src="../../assets/img/trash.png" alt />
                    删除
                  </span>
                </template>
              </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="请假" name="请假">
          <el-table
              :data="leaveData"
              :header-cell-style="{background:'#F5F6FA'}"
              style="width: 100%"
              @row-click="toDetail"
            >
              <el-table-column 
                type="index"
                label="序号" 
                width="50" 
                :index="indexMethod1" 
                align="center">
              </el-table-column>
              <el-table-column 
                prop="departName" 
                label="部门" 
                align="center">
              </el-table-column>
              <el-table-column 
                prop="userName" 
                label="员工姓名" 
                align="center">
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
                  <span v-if='scope.row.state === "COMMIT"'>已提交</span>
                  <span v-if='scope.row.state === "DRAFT"' style="color:#5792FC">暂存</span>
                </template>
              </el-table-column>
              <el-table-column 
                prop="createAt" 
                label="提交时间" 
                align="center">
              </el-table-column>
              <el-table-column label="操作" align="center" width="200px">
                <template slot-scope="scope" class="flex">
                  <div class="main-around">
                          <span
                    style="cursor: pointer;color:#5792FC"
                    @click.stop="toDetail(scope, 'edit')"
                    v-if="scope.row.state === 'DRAFT' && permission.includes('prm1414')"
                  >
                    <!-- <i class="el-icon-edit" style="color:#5792FC"></i> -->
                    <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                  编辑</span>
                  <span
                    style="cursor: pointer;color:#5792FC;"
                    @click.stop='changeState(scope.row)'
                    v-if="scope.row.state === 'DRAFT' && permission.includes('prm1413')"
                  >
                  <img src="../../assets/img/submit_personSub.png" alt="" style="width:13px;height:13px">
                  提交</span>
                  <span
                    style="cursor: pointer;color:#5792FC"
                    @click.stop="deleteDetail(scope.row.id)"
                    v-if=" permission.includes('prm1415')"
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
    <div class="main_space pagination_box">
      <section>
        <span class="word">
          共
          <span style="color:#5792FC">{{pageJson.total}}</span>条
        </span>
        <el-select
          v-model="pageValue"
          placeholder="10条/页"
          style="width:101px;height:28px"
          @change="changePage(pageValue)"
        >
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
        ></el-pagination>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { client, daily } from '@/api/index'
import Step from '@/components/Step.vue'
import {obj1} from '@/utils/util'
@Component({
  components: {
    Step,
  },
})
export default class ClientList extends Vue {
  private message = ['直销日报']
  private imgUrl = require('../../assets/img/head/client.png')
  private tab: any = '工作'
  private tableData: any[] = [] // 工作
  private leaveData: any[] = [] // 请假
  private searchInfo: any = {
    timeValue: [],
    mechanism: '',
    category: '',
    level: '',
  }
  private pageValue: any = '1'
  private pageJson = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }
  private get permission() {
    return this.$store.state.permission
  }
  private toRoute() {
    this.$router.push({name: 'clientdailyAdd'})
  }
  @Watch(`tab`) private tabValue(val: any, oldVal: any) {
    // sessionStorage.setItem('tab', val)
    this.pageJson = {
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  }
  private async getSellinfo() {
    if (this.tab === '工作') {
      const data: any = {
        category: this.searchInfo.category,
        customerLevel: this.searchInfo.level,
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        startAt: this.searchInfo.timeValue[0] || '',
        endAt: this.searchInfo.timeValue[1] || '',
        mechanism: this.searchInfo.mechanism,
      }
      const res: any = await client.getClientByperson(data)
      this.tableData = res.data.data.records
      this.pageJson.total = res.data.data.total
    } else if (this.tab === '请假') {
      daily.getLeaveperson({
        endTime: this.searchInfo.timeValue[1] || '',
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        startTime: this.searchInfo.timeValue[0] || '',
      }).then((res: any) => {
        this.leaveData = res.data.data.records
        this.pageJson.total = res.data.data.total
      })
    }
  }
  // 根据id查看详情（编辑）
  private toDetail( info: any, type: any) {
    if (type === 'edit') {
      if (this.tab === '工作') {
        this.$router.push({ name: 'clientdailyAdd', query: { id: info.row.id, operation: 'edit', type: '工作' }})
      } else {
        this.$router.push({ name: 'clientdailyAdd', query: { id: info.row.id, operation: 'edit', type: '请假' }})
      }
    } else {
        if (this.$store.state.permission.includes('prm1411') ) {
            if (this.tab === '工作') {
                this.$router.push({name: 'clientdailyAdd', query: {id: info.id, operation: 'detail', type: '工作'}})
            } else {
                this.$router.push({name: 'clientdailyAdd', query: {id: info.id, operation: 'detail', type: '请假'}})
            }
        }
    }
  }
  // 删除
  private async deleteDetail1(id: any) {
    if (this.tab === '工作') {
      client.deleteClientDaily(`id=${id}`).then((res) => {
        if ( res.data.success ) {
          this.$message.success(`删除成功`)
          this.pageJson.currentPage = 1;
          this.getSellinfo()
        } else {
          this.$message.error(`${res.data.msg}`)
        }
      })
    } else if (this.tab === '请假') {
      const res: any = await daily.deletePersonleave(`id=${id}`)
      if (res.data.success) {
        this.$message.success('删除成功!')
        this.pageJson.currentPage = 1;
        this.getSellinfo()
      } else {
        this.$message({
          message: res.data.msg,
          type: 'error',
        })
      }
    }
  }
  private deleteDetail(id: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.deleteDetail1(id)
    })
  }
  // 导出
  private async exportSell() {
    if (this.tab === '工作') {
      const data: any = {
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        startAt: this.searchInfo.timeValue[0],
        endAt: this.searchInfo.timeValue[1],
        mechanism: this.searchInfo.mechanism,
        category: this.searchInfo.category,
      }
      let res1: any
      const res: any = await client.exportDailyByperson(data)
      res1 = res.data
      const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob); // 创建下载的链接
      downloadElement.href = href;
      downloadElement.download = `直销日报-${this.searchInfo.timeValue[0]}-${this.searchInfo.timeValue[1]}.xls`; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    }
  }
  // tab切换
  private clickTab(val: any) {
    this.tab = val.label
    if (this.tab === '工作') {
        this.searchInfo.timeValue = []
    } else {
        this.searchInfo.timeValue = obj1.getNowtime()
    }
    this.getSellinfo()
  }
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
    this.getSellinfo()
  }
  private changePage(val: any) {
    this.pageJson.pageSize = parseInt(val, 10) * 10
    this.pageJson.currentPage = 1
    this.getSellinfo()
  }
  // 序号
  private indexMethod(index: number) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1
  }
  private indexMethod1(index: number) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1
  }
  private async changeState(row: any) {
      row.state = 'COMMIT'
      const data = {
          ...row,
          id: row.id,
      }
      const res: any = await daily.updateleavePerson(JSON.parse(JSON.stringify(data)))
      if (res.data.success) {
          this.$message({
              message: '提交成功',
              type: 'success',
          })
          this.$router.push({name: 'clientList'})
      } else {
          this.$message({
              message: res.data.msg,
              type: 'error',
          })
      }
  }
  private mounted() {
    // this.searchInfo.timeValue = obj1.getNowtime()
    this.getSellinfo()
  }
}
</script>

<style lang="less" scoped>
main {
  /deep/ .el-date-editor .el-range-separator,
  .el-input__icon {
    height: 32px;
  }
  /deep/ .el-input__icon {
    line-height: 26px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .searchBox {
    width: 224px !important;
    height: 32px;
  }
  .search_title {
    flex-shrink: 0;
    font-size: 14px;
    color: rgba(96, 98, 102, 1);
    line-height: 32px;
    margin: 0 12px 0 20px;
  }
  .pagination_box {
    margin-top: 20px;
  }
  .word {
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(102,102,102,1);
    line-height:19px;
    margin-right:5px;
  }
}
</style>
 