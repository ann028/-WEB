<template>
  <main class="content">
    <!-- <div style="height: 100%"> -->
      <Breadcrumb :tabName = 'tabName'></Breadcrumb>
      <div class="bg flex1" style="padding: 24px; box-sizing: border-box;">
        <section class="searchBox main_space">
          <section class="left">
            <section  class="flex">
              <el-input v-model="searchInfo.name" placeholder="债券代码/简称/发行人" class="input_width"></el-input>
              <section style="margin-left: 10px;">
                <span class="search_title">地区</span>
                <el-select v-model="searchInfo.publisher" placeholder="请选择" class="search_width">
                  <el-option
                    v-for="item in regionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </section>
              <button class="btn primary_btn">查询</button>
            </section>
          </section>
        </section>
        <el-table
          :data="punlisherDate"
          style="width: 100%; height: auto; margin-top: 26px;"
          :header-cell-style="{background:'#FFF9F3'}">
          <el-table-column
            type="index"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            label="发行人"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
              <div style="color: #F88200">{{scope.row.code}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="direct"
            label="地区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="place"
            label="有效/到期项目"
            align="center">
          </el-table-column>
          <el-table-column
            prop="matters"
            label="关联事项"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <div class="flex main_center">
                <button class="btn primary_btn" style="margin-left: 0;">关联</button>
              </div>
            </template>
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
    <!-- </div> -->
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

export default class Publishers extends Vue {
  private tabName: any = ['发行人管理']
  private regionList: any = []
  private searchInfo: any = {
    name: '',
    publisher: '',
  }
  private punlisherDate: any = [{

  }]
  private pageJson: any = {
    pageSize: 0,
    currentPage: 1,
    total: 0,
  }
  private handleSizeChange(val: any) {
    console.log(val)
  }
  private handleCurrentChange(val: any) {
    console.log(val)
  }
}
</script>