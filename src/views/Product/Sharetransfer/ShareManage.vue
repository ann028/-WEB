<template>
  <main class="container">
    <Step :stepName = 'message' :imgUrl = "imgUrl"></Step>
    <section class="flex main_space ">
      <section class="flex "  style="flex-wrap: wrap">
          <section class="shareManage mt20">
            <el-date-picker
              v-model="searchInfo.timeValue"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="searchBox "
              clearable>
            </el-date-picker>
          </section>
          <section class="flex mt20">
            <span class="searchTitle">产品</span>
            <el-input v-model="searchInfo.codeOrName" clearable  class="searchBox shareManage" maxlength="100" placeholder="产品代码/产品名称"></el-input>
          </section>
         
          <section class="flex mt20">
            <span class="searchTitle">转让者姓名</span>
            <el-input v-model="searchInfo.transfereename" clearable  class="searchBox shareManage" maxlength="100" placeholder="转让者姓名"></el-input>
          </section>
          <section class="flex mt20">
            <span class="searchTitle">受让者姓名</span>
            <el-input v-model="searchInfo.transferorname" clearable  class="searchBox shareManage" maxlength="100" placeholder="受让者姓名"></el-input>
          </section>
          <button class="btn btn_primary ml20 mt20" style="width:76px;height:32px" @click="getShareinfo">查询</button>
      </section>
      <section class="flex">
        <button class="btn btn_warning mt20 " style="width:76px;height:32px;" @click="exportInfo" v-if="permission.includes('prm8314')">
          <img src="../../../assets/img/output.png" alt="" style="width:16px;height:16px">
          导出</button>
        <button class="btn btn_primary ml20 mt20" style="width:76px;height:32px;" @click="$router.push({name: 'shareadd'})" v-if="permission.includes('prm8311')">
          <img src="../../../assets/img/addition.png" alt="" style="width:16px;height:16px">
          新增</button>
      </section>
    </section>
    <section class="mt20">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#F5F6FA'}"
        @row-click="viewInfo">
        <el-table-column
          type="index"
          label="序号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="transferorName"
          label="转让者姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="transfereeName"
          label="受让者姓名"
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
          prop="share"
          label="转让份额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="entrustPrice"
          label="委托价格"
          align="center">
        </el-table-column>
        <el-table-column
          prop="aggregateAmount"
          label="总金额"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          v-if="permission.includes('prm8312') || permission.includes('prm8313')">
           <template slot-scope="scope" >
                  <div class="main-around">
                    <span style="cursor: pointer;color:#5792FC;" @click.stop="viewInfo(scope.row, 'edit')" v-if="permission.includes('prm8312')">
                    <img src="../../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                  编辑</span>
                  <span style="cursor: pointer;color:#5792FC;" @click.stop="deleteInfo(scope.row)" v-if="permission.includes('prm8313')">
                    <img src="../../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                  删除</span>
                  </div>
              </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="mt20">
      <div class="main_space shareManage">
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
  </main>
</template>
<script lang="ts">
import {Vue, Prop, Watch, Component} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { product } from '../../../api'
@Component({
  components: {
    Step,
  },
})
export default class ShareManage extends Vue {
  private message: any = ['产品管理', '份额转让管理', '份额转让']
  private imgUrl: any = require('../../../assets/img/head/product.png')
  private searchInfo: any = {
    timeValue: [],
    codeOrName: '',
    transferorname: '',
    transfereename: '',
    startTime: '',
    endTime: '',
  }
  private tableData: any[] = []
  private pageValue: any = '1'
  private pageJson: any = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }
  private get permission() {
    return this.$store.state.permission
  }
  // 查询份额转让信息
  private async getShareinfo() {
    const data = {
      codeOrName: this.searchInfo.codeOrName,
      endTime: this.searchInfo.endTime,
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      startTime: this.searchInfo.startTime,
      transfereeName: this.searchInfo.transfereename,
      transferorName: this.searchInfo.transferorname,
    }
    const res: any = await product.getShareinfo(data)
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  // 编辑
  private viewInfo(row: any, type: any) {
    if (type === 'edit') {
      this.$router.push({name: 'shareadd', query: {id: row.id, type: 'edit'}})
    } else {
      this.$router.push({name: 'shareadd', query: {id: row.id, type: 'detail'}})
    }
  }
  // 删除
  private async deleteInfo1(row: any) {
    const res: any =  await product.deleteSharebyId(`id=${row.id}`)
    if (res.data.success) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
    } else {
      this.$message.error(`${res.data.msg}`)
    }
    this.getShareinfo()
  }
  private deleteInfo(row: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.deleteInfo1(row)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
  }
  // 导出
  private async exportInfo() {
    const data = {
      ...this.searchInfo,
    }
    const res: any = await product.exportShareinfo(data)
    const res1 = res.data
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `份额转让${this.searchInfo.startTime}-${this.searchInfo.endTime}.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  // 修改当前页
  private changePage(val: any) {
    this.pageJson.pageSize = parseInt(val, 10) * 10
  }
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
  }
  // 获取当前时间
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
    this.searchInfo.startTime = beg1;
    this.searchInfo.endTime = end1;
  }
  private mounted() {
    this.getNowtime()
    this.getShareinfo()
  }
}
</script>
<style lang="less" scoped>
main{
  .shareManage{
    /deep/ .el-date-editor .el-range-separator,.el-input__icon{
      height:32px
    }
    /deep/ .el-input__icon{
    line-height: 26px;
    }
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
</style>