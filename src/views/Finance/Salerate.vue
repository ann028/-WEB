<template>
  <main class="container">
    <Step :stepName = 'message' :imgUrl = "imgUrl"></Step>
    <section class="mt20 main_space">
        <section class="flex">
            <section>
              <span class="searchTitle" style="margin-left: 0px">机构名称</span>
              <el-input v-model="searchInfo.mechanism" placeholder="请输入内容" class="searchBox" clearable></el-input>
            </section>
            <section>
              <span class="searchTitle">产品</span>
              <el-input v-model="searchInfo.product" placeholder="请输入产品代码或名称" class="searchBox" clearable ></el-input>
            </section>
            <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="getSaleinfo">查询</button>
        </section>
        <section class="flex">
          <button class="btn btn_primary" style="width:76px;height:32px;" @click="toRoute">
            <img src="../../assets/img/addition.png" alt="" style="width:16px;height:16px">
            新增</button>
        </section>
    </section>
    <section class="mt20">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#F5F6FA'}"
         @row-click="editInfo">
        <el-table-column
          type="index"
          align="center"
          label="序号"
          :index="indexMethod"
          width="55">
        </el-table-column>
        <el-table-column
          prop="mechanism"
          align="center"
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="productName"
          align="center"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="productCode"
          align="center"
          label="产品代码">
        </el-table-column>
        <el-table-column
          prop="maintenanceFee"
          align="center"
          label="客户维护费率">
        </el-table-column>
        <el-table-column
          prop="excessPerformanceSharing"
          align="center"
          label="超额业绩分成">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <div class="main-around">
              <span style="cursor: pointer;color:#5792FC;" @click.stop="editInfo(scope.row,'edit')">
                <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                编辑</span>
              <span style="cursor: pointer;color:#5792FC;" @click.stop="deleteInfo(scope.row.id)">
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
  </main>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import { finance } from '@/api/index'
import Step from '@/components/Step.vue'
@Component({
  components: {
    Step,
  },
})
export default class Salerate extends Vue {
  private message = ['财务管理', '销售费率']
  private imgUrl = require('../../assets/img/head/finance.png')
  private searchInfo: any = {
    mechanism: '',
    product: '',
  }
  private tableData: any[] = []
  private pageValue: any = '1'
  private pageJson: any = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }
  // 查询费率列表
  private async getSaleinfo() {
    const data = {
      ...this.searchInfo,
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
    }
    const res: any = await finance.getSaleinfo(data)
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  private toRoute() {
    this.$router.push({name: 'salerateEdit'})
  }
  private editInfo(id: any, state: any) {
    if (  state === 'edit' ) {
      this.$router.push({name: 'salerateEdit', query: {type: `${state}`, id: id.id}})
    } else {
       this.$router.push({name: 'salerateEdit', query: {type: `detail`, id: id.id}})
    }
  }
  private async deleteInfo1(id: any) {
    const res: any = await finance.deleteSaleInfo(`id=${id}`)
    if (res.data.success) {
      this.$message.success(`删除成功`)
    } else {
      this.$message.error(`${res.data.msg}`)
    }
    this.getSaleinfo()
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
  private indexMethod(index: any) {
    return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + ( index + 1 )
  }
  private changePage(val: any) {
    this.pageJson.pageSize = parseInt(val, 10) * 10
    this.pageJson.currentPage = 1
  }
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
  }
  private mounted() {
    this.getSaleinfo()
  }
}
</script>
<style lang="less" scoped>
main{
  /deep/ .el-input__icon{
    line-height: 32px;
  }
  .mt20{
    margin-top: 20px
  }
  .searchBox{
    width: 224px !important;
    height: 32px;
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