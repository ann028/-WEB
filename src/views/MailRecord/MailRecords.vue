<template>
  <main class="content">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <div class="bg flex1" style="padding: 24px; box-sizing: border-box;">
      <section class="flex">
        <el-input v-model="searchInfo.time" placeholder="时间区间" class="input_width"></el-input>
        <section style="margin-left: 10px; flex-shrink: 0;">
          <span class="search_title">状态</span>
          <el-select v-model="searchInfo.state" placeholder="请选择" class="search_width">
            <el-option label="成功" value="success"></el-option>
            <el-option label="失败" value="fail"></el-option>
          </el-select>
        </section>
        <section class="flex">
          <span class="search_title">主题</span>
          <el-input v-model="searchInfo.time" placeholder="主题" class="input_width ml10"></el-input>
        </section>
          <section class="flex">
          <span class="search_title">公司</span>
          <el-input v-model="searchInfo.time" placeholder="公司" class="input_width ml10"></el-input>
        </section>
        <section class="flex">
          <span class="search_title">姓名</span>
          <el-input v-model="searchInfo.time" placeholder="姓名" class="input_width ml10"></el-input>
        </section>
        <button class="btn primary_btn" @click="onSearchButtonClick">查询</button>
      </section>
      <el-table
        :data="recordData"
        style="width: 100%; height: auto; margin-top: 26px;"
        :header-cell-style="{background:'#FFF9F3'}">
        <el-table-column
          type="index"
          label="序号"
          align="center">
        </el-table-column>
        <el-table-column
          label="时间"
          align="center">
          <template slot-scope="scope">
            <div>{{scope.row.name}}</div>
            <div style="color: #F88200">{{scope.row.code}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="direct"
          label="主题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="place"
          label="身份"
          align="center">
        </el-table-column>
        <el-table-column
          prop="matters"
          label="公司"
          align="center">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="收件邮箱"
          align="center">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="投递状态"
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
export default class MailRecord extends Vue {
  private tabName: any = ['发信记录']
  private searchInfo: any = {
    time: '',
    state: '',
  }
  private pageJson: any = {
    total: 0,
    currentPage: 1,
    pageSize: 10
  }
  private recordData: any = []
  private handleSizeChange(val: any) {
    console.log(val)
  }
  private handleCurrentChange(val: any) {
    console.log(val)
  }
  private onSearchButtonClick() {
    console.log(this.searchInfo)
  }
}
</script>