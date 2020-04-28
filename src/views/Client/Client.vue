<template>
  <main class="container">
    <Step :stepName="message" :imgUrl="imgUrl"></Step>
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap">
      <section class="flex" style="flex-wrap:wrap">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchInfo.timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="searchBox mt20"
        ></el-date-picker>
        <section class="flex mt20" style="flex-shrink:0">
          <span class="search_title">机构名称</span>
          <el-input v-model="searchInfo.mechanism" clearable placeholder="请输入内容"></el-input>
        </section>
        <section class="flex mt20">
          <span class="search_title" style="flex-shrink:0">机构类别</span>
          <el-input v-model="searchInfo.category" clearable placeholder="请输入内容"></el-input>
        </section>
        <button
          class="btn btn_primary ml20 mt20"
          style="width:76px;height:32px"
          @click="getSellinfo"
        >查询</button>
      </section>
      <section class="flex">
        <button
          class="btn btn_warning mt20"
          style="width:76px;height:32px;"
          @click.stop="exportSell"
          v-if="permission.includes('prm6005')"
        >
          <img src="../../assets/img/output.png" alt style="width:16px;height:16px" />
          导出
        </button>
        <button
          class="btn btn_primary ml20 mt20"
          style="width:76px;height:32px;"
          @click.stop="toRoute"
          v-if="permission.includes('prm6001')"
        >
          <img src="../../assets/img/addition.png" alt style="width:16px;height:16px" />
          新增
        </button>
      </section>
    </div>
    <div style="margin-top: 20px">
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#F5F6FA'}"
        style="width: 100%"
        @row-click="toDetail"
      >
        <el-table-column type="index" label="序号" width="50" :index="indexMethod" align="center"></el-table-column>
        <el-table-column prop="latestCommunicationAt" label="最新沟通时间" align="center"></el-table-column>
        <el-table-column prop="mechanism" label="机构名称" align="center"></el-table-column>
        <el-table-column label="机构类别" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.category1}}</span>
            <span v-if="scope.row.category2">-{{scope.row.category2}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mechanismGrade" label="机构评级" align="center"></el-table-column>
        <el-table-column prop="label" label="标签" align="center"></el-table-column>
        <el-table-column prop="userName" label="创建人" align="center"></el-table-column>
        <el-table-column label="操作" align="center" class="main_center">
          <template slot-scope="scope">
            <span
              @click.stop="toDetail(scope, 'edit')"
              v-if="permission.includes('prm6002')"
              style="color:#5792FC;cursor: pointer;margin-right: 5px"
            >
              <img src="../../assets/img/editor.png" alt />
              编辑
            </span>
            <span
              @click.stop="deleteDetail(scope.row.id)"
              v-if="permission.includes('prm6004')"
              style="color:#5792FC;cursor: pointer"
            >
              <img src="../../assets/img/trash.png" alt />
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
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
import { Component, Prop, Vue} from 'vue-property-decorator';
import { client } from '@/api/index'
import Step from '@/components/Step.vue'
@Component({
  components: {
    Step,
  },
})
export default class Client extends Vue {
  private message = ['直销客户']
  private imgUrl = require('../../assets/img/head/client.png')
  private tableData: [] = []
  private searchInfo: any = {
    timeValue: [],
    mechanism: '',
    category: '',
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
    this.$router.push({name: 'clientAdd'})
  }
  // 查询个人直销单
  private async getPersonsell() {
    const data: any = {
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      startAt: this.searchInfo.timeValue[0],
      endAt: this.searchInfo.timeValue[1],
      mechanism: this.searchInfo.mechanism,
      category: this.searchInfo.category,
    }
    const res: any = await client.getSellbyperson(data)
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  // 查看部门直销单
  private async getDepartsell() {
    const data: any = {
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      startAt: this.searchInfo.timeValue[0],
      endAt: this.searchInfo.timeValue[1],
      mechanism: this.searchInfo.mechanism,
      category: this.searchInfo.category,
    }
    const res: any = await client.getSellbydepart(data)
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  // 查询（是否显示部门数据）
  private getSellinfo() {
    if (this.$store.state.permission.includes('prm6006')) {
      this.getDepartsell()
    } else {
      this.getPersonsell()
    }
  }
  // 根据id查看详情（编辑）
  private toDetail( info: any, type: any) {
    if (type === 'edit') {
      this.$router.push({ name: 'clientAdd', query: { id: info.row.id, type: 'edit' }})
    } else {
      if (this.$store.state.permission.includes('prm6003')) {
        this.$router.push({name: 'clientAdd', query: {id: info.id}})
      }
    }
  }
  // 删除
  private async deleteDetail1(id: any) {
    const res: any = await client.delSell(`id=${id}`)
    const {code, success, msg} = res.data
    if ( success ) {
      this.$message.success(`删除成功`)
      this.getSellinfo()
    } else {
      this.$message.error(`${msg}`)
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
    const data: any = {
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      startAt: this.searchInfo.timeValue[0],
      endAt: this.searchInfo.timeValue[1],
      mechanism: this.searchInfo.mechanism,
      category: this.searchInfo.category,
    }
    let res1: any
    if (this.$store.state.permission.includes('prm6006')) {
      const res: any = await client.exportBydepart(data)
      res1 = res.data
    } else {
      const res: any = await client.exportByperson(data)
      res1 = res.data
    }
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `直销客户-${this.searchInfo.timeValue[0]}-${this.searchInfo.timeValue[1]}.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  private getNowtime() {
    const date = new Date()
    const dateTime = date.getTime();
    const end = new Date(dateTime)
    const beg = new Date(dateTime - 30 * 24 * 60 * 60 * 1000)
    const year = beg.getFullYear();
    const month = beg.getMonth() + 1 < 10 ? '0' + ( beg.getMonth() + 1) : ( beg.getMonth() + 1 )
    const da = beg.getDate() < 10 ? '0' + beg.getDate() : beg.getDate()
    const year1 = end.getFullYear();
    const month1 = end.getMonth() + 1 < 10 ? '0' + ( end.getMonth() + 1) : ( end.getMonth() + 1 )
    const da1 = end.getDate() < 10 ? '0' + end.getDate() : end.getDate()
    const beg1 = `${year}-${month}-${da}`
    const end1 = `${year1}-${month1}-${da1}`
    let dat: any = [];
    dat = [beg1, end1]; // 将值设置给插件绑定的数据
    this.searchInfo.timeValue = dat;
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
  private indexMethod(index: number) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1
  }
  private mounted() {
    // this.getNowtime()
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
  .word {
    margin-right: 5px;
  }
  .pagination_box {
    margin-top: 20px;
  }
}
</style>
 