<template>
  <main class="content">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <div class="bg flex1" style="padding: 24px; box-sizing: border-box;">
      <section class="flex">
        <el-input v-model="searchInfo.name" placeholder="账号姓名" class="input_width"></el-input>
        <section class="flex">
          <span class="search_title">角色</span>
          <el-input v-model="searchInfo.role" placeholder="角色" class="input_width ml10"></el-input>
        </section>
        <button class="btn primary_btn" @click="onSearchButtonClick">查询</button>
      </section>
      <el-table
        :data="userData"
        style="width: 100%; height: auto; margin-top: 26px;"
        ref="multipleTable"
        :header-cell-style="{background:'#FFF9F3'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          prop="direct"
          label="账号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="matters"
          label="手机"
          align="center">
        </el-table-column>
        <el-table-column
          prop="place"
          label="邮箱"
          align="center">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="角色"
          align="center">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="创建时间"
          align="center">
        </el-table-column>
      </el-table>
      <div style="margin: 20px auto;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageJson.currentPage"
          :page-size="pageJson.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageJson.total">
        </el-pagination>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb.vue'

@Component({
  components: {
    Breadcrumb,
  },
})
export default class UserManage extends Vue {
  private tabName = ['账户管理', '用户管理']
  private searchInfo: any = {
    name: '',
    role: '',
  }
  private userData: any = []
  private pageJson: any = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
  }
  private onSearchButtonClick() {
    console.log('search')
  }
  private handleSelectionChange(val: any) {
    console.log(val)
  }
  private handleSizeChange(val: any) {
    console.log(val)
  }
  private handleCurrentChange(val: any) {
    console.log(val)
  }
}
</script>
<style lang="less" scoped>

</style>