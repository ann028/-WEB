<template>
  <main class="container">
    <Step :stepName = 'message' :imgUrl = 'imgUrl'></Step>
    <section class="flex main_space" style="flex-wrap: wrap">
      <section class="flex mt20" >
          <section class="flex">
            <span class="searchTitle" style="margin-left: 0">产品</span>
            <el-input v-model="searchInfo.nameOrCode" clearable  class="searchBox shareManage" maxlength="100" placeholder="产品代码/产品名称"></el-input>
          </section>
          <section class="flex">
            <span class="searchTitle">证券代码</span>
            <el-input v-model="searchInfo.stackCode" clearable  class="searchBox shareManage" maxlength="100" placeholder="请输入证券代码"></el-input>
          </section>
          <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="getStackcode">查询</button>
      </section>
      <section class="flex">
        <button class="btn btn_warning mt20 " style="width:76px;height:32px;" @click="exportInfo" v-if="permission.includes('prm8324')">
          <img src="../../../assets/img/output.png" alt="" style="width:16px;height:16px">
          导出</button>
        <button class="btn btn_primary ml20 mt20" style="width:76px;height:32px;" @click="$router.push({name: 'tableadd'})" v-if="permission.includes('prm8321')">
          <img src="../../../assets/img/addition.png" alt="" style="width:16px;height:16px">
          新增</button>
      </section>
    </section>
    <section class="mt20">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#F5F6FA'}"
        @row-click= "viewInfo">
        <el-table-column
          type="index"
          label="序号"
          :index="indexMethod"
          align="center">
        </el-table-column>
        <el-table-column
          prop="code"
          label="券商产品代码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="产品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stackCode"
          label="交易所证券代码"
          align="center">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            width="200"
            v-if="permission.includes('prm8322') || permission.includes('prm8323')">
            <template slot-scope="scope" >
                    <div class="main-around">
                      <span style="cursor: pointer;color:#5792FC;" @click.stop="viewInfo(scope.row, 'edit')" v-if="permission.includes('prm8322')">
                      <img src="../../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                    编辑</span>
                    <span style="cursor: pointer;color:#5792FC;" @click.stop="deleteInfo(scope.row)" v-if="permission.includes('prm8323')">
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
import { product } from '../../../api/index'
import Step from '@/components/Step.vue'
@Component({
  components: {
    Step,
  },
})
export default class ProductTable extends Vue {
  private message: any = ['产品管理', '份额转让管理', '产品基本属性表']
  private imgUrl: any = require('../../../assets/img/head/product.png')
  private searchInfo: any = {
    nameOrCode: '',
    stackCode: '',
  }
  private pageValue: any = '1'
  private pageJson: any = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }
  private tableData: any[] = []
  private get permission() {
    return this.$store.state.permission
  }
  // 查询证券代码（All）
  private async getStackcode() {
    const data = {
      ...this.searchInfo,
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
    }
    const res: any = await product.getStackcode(data)
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  // 查看详情
  private viewInfo(row: any, type: any) {
    if (type === 'edit') {
      this.$router.push({name: 'tableadd', query: {id: row.id, type: 'edit'}})
    } else {
      this.$router.push({name: 'tableadd', query: {id: row.id, type: 'detail'}})
    }
  }
  // 删除
  private async deleteInfo1(row: any) {
    const res: any = await product.delStackcodeByid(`${row.id}`)
    if (res.data.success) {
      this.$message.success('删除成功!')
    } else {
      this.$message.error(`${res.data.msg}`)
    }
    this.getStackcode()
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
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
    }
    const res: any = await product.exportStackcode(data)
    const res1 = res.data
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `产品/证券代码.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  // 修改当前页
  private changePage(val: any) {
    this.pageValue = val
    this.pageJson.pageSize = parseInt(val, 10) * 10
    this.getStackcode()
  }
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
    this.getStackcode()
  }
  private indexMethod(index: any) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1
  }
  private mounted() {
    this.getStackcode()
  }
}
</script>
<style lang="less" scoped>
main{
  .shareManage{
    
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