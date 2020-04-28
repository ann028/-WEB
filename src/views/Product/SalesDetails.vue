<template>
  <main class="container">
    <div id="salesDetails">
      <Step :stepName = 'message' :imgUrl = "imgUrl"></Step>
      <section class="flex main_space" style="flex-wrap: wrap">
        <section class="flex mt20" >
           <el-date-picker
              v-model="searchInfo.timeValue"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="searchBox"
              clearable>
            </el-date-picker>
            <section class="flex">
              <span class="searchTitle">产品系列</span>
              <el-input v-model="searchInfo.series" clearable class="searchBox" maxlength="100" placeholder="请输入内容"></el-input>
            </section>
            <section class="flex">
              <span class="searchTitle">产品</span>
              <el-input v-model="searchInfo.product" clearable  class="searchBox" maxlength="100" placeholder="产品代码/产品名称"></el-input>
            </section>
            <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="getSaledetailInfo">查询</button>
        </section>
        <section class="flex">
          <button class="btn btn_warning mt20 " style="width:76px;height:32px;"  @click="exportInfo" v-if="permission.includes('prm8114')">
            <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
            导出</button>
          <button class="btn btn_primary ml20 mt20" style="width:76px;height:32px;" @click="toRoute" v-if="permission.includes('prm8111')">
            <img src="../../assets/img/addition.png" alt="" style="width:16px;height:16px">
            新增</button>
        </section>
      </section>
      <section class="mt20">
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#F5F6FA'}"
          style="width: 100%"
          @row-click="viewSaleinfo">
          <el-table-column
            type="index"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productCode"
            label="产品代码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productSeries"
            label="产品系列"
            align="center">
          </el-table-column>
          <el-table-column
            label="销售日期"
            align="center"
            width="110">
            <template slot-scope="scope">
                <span>{{scope.row.startDate}}~{{scope.row.endDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            align="center">
            <template slot-scope="scope">
                <span>{{scope.row.label === 'FIRST_SUBSCRIBE'?'首发认购':scope.row.label === "HAVE_TASK"?"有销售任务":"无销售任务"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="subscriptions"
            label="申购量（万元）"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
            v-if="(permission.includes('prm8112') || permission.includes('prm8113'))">
            <template slot-scope="scope" >
                  <div class="main-around">
                    <span style="cursor: pointer;color:#5792FC;" @click.stop="viewSaleinfo(scope.row, 'edit')" v-if="permission.includes('prm8112')">
                    <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                  编辑</span>
                  <span style="cursor: pointer;color:#5792FC;" @click.stop="delSaleinfo(scope.row.id)" v-if="permission.includes('prm8113')">
                    <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                  删除</span>
                  </div>
              </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="mt20">
        <div class="main_space">
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
      </section>
    </div>
  </main>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { product } from '../../api'
@Component({
  components: {
    Step,
  },
})
export default class SaleDetails extends Vue {
  private message = ['产品管理', '销售管理', '销售明细']
  private imgUrl: any = require('../../assets/img/head/product.png')
  private searchInfo: any = {
    timeValue: sessionStorage.getItem('starttime') ? [sessionStorage.getItem('starttime'), sessionStorage.getItem('endtime')] : [],
    series: '',
    product: '',
  }
  private tableData: any[] = []
  private pageValue: any = '1'
  private pageJson: any = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }
  @Watch(`searchInfo.timeValue`) private timeValue(val: any, oldVal: any) {
      if (val === null) {
        sessionStorage.removeItem('starttime')
        sessionStorage.removeItem('endtime')
      }
  }
  public get permission() {
    return this.$store.state.permission
  }
  private toRoute() {
    this.$router.push({name: 'detailAdd'})
  }
  private viewSaleinfo(row: any, type: any) {
    if (this.$store.state.permission.includes('prm8115')) {
      if (type === 'edit') {
        this.$router.push({name: 'detailAdd', query: {id: row.id, type: 'edit'}})
      } else {
        this.$router.push({name: 'detailAdd', query: {id: row.id, type: 'detail'}})
      }
    }
  }
  // 查询
  private async getSaledetailInfo() {
    let data: any
    if (this.searchInfo.timeValue === null || this.searchInfo.timeValue.length === 0) {
      data = {
        endTime: '',
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        product: this.searchInfo.product,
        series: this.searchInfo.series,
        startTime: '',
      }
    } else {
      if (this.searchInfo.timeValue.length > 0) {
        sessionStorage.setItem('starttime', this.searchInfo.timeValue[0])
        sessionStorage.setItem('endtime', this.searchInfo.timeValue[1])
      }
      data = {
        endTime: this.searchInfo.timeValue[1],
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        product: this.searchInfo.product,
        series: this.searchInfo.series,
        startTime: this.searchInfo.timeValue[0],
      }
    }
    const res: any = await product.getSaledetailInfo(data)
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  // 删除
  private async delSaleinfo1(id: any) {
    const res: any = await product.delSaledetail(`id=${id}`)
    if (res.data.success) {
      this.$message.success(`删除成功`)
      this.getSaledetailInfo()
    } else {
      this.$message.error(`${res.data.msg}`)
    }
  }
  private async delSaleinfo(id: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.delSaleinfo1(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
  }
  // 导出
  private async exportInfo() {
    if (this.searchInfo.timeValue.length > 0) {
      const data = {
        endTime: this.searchInfo.timeValue[1],
        startTime: this.searchInfo.timeValue[0],
      }
      const res: any = await product.exportSaledetail(data)
      const res1 = res.data
      const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob); // 创建下载的链接
      downloadElement.href = href;
      downloadElement.download = `销售明细-${this.searchInfo.timeValue[0]}-${this.searchInfo.timeValue[1]}.xls`; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    }
  }
  // 改变每页显示条数
  private changePage(val: any) {
    this.pageJson.pageSize = parseInt(val, 10) * 10
    this.pageJson.currentPage = 1
    this.getSaledetailInfo()
  }
  // 改变当前页
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
    this.getSaledetailInfo()
  }
  private mounted() {
    this.getSaledetailInfo()
  }
  private beforeRouteLeave(to: any, from: any, next: any) {
    if ( to.name === 'detailAdd') {
      next()
    } else {
      sessionStorage.removeItem('starttime')
      sessionStorage.removeItem('endtime')
      next()
    }
  }
}
</script>
<style lang="less" >
main{
  #salesDetails{
    /deep/ .el-date-editor .el-range-separator,.el-input__icon{
      height:32px
    }
    /deep/ .el-input__icon{
    line-height: 32px;
    }
    /deep/.el-date-editor .el-range__close-icon{
      display: block !important
    }
    .mt20{
      margin-top: 20px;
    }
    .searchBox{
      height: 32px;
      width: 224px !important;
    }
    .searchTitle{
      flex-shrink: 0;
      font-size: 14px;
      color:rgba(96,98,102,1);
      line-height:32px;
      margin:0 12px 0 20px
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