<template>
  <main class="content">
    <div>
      <Breadcrumb :tabName = 'tabName'></Breadcrumb>
      <div class="bg" style="padding: 24px; box-sizing: border-box;">
        <section class="searchBox main_space">
          <section class="left">
            <section  class="flex">
              <el-input v-model="input" placeholder="债券代码/简称/发行人" class="input_width"></el-input>
              <section style="margin-left: 10px;">
                <span class="search_title">地区</span>
                <el-select v-model="value" placeholder="请选择" class="search_width">
                  <el-option
                    v-for="item in options"
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
            label="简称代码"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
              <div style="color: #F88200">{{scope.row.code}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="direct"
            label="地区发行人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="place"
            label="上市场所"
            align="center">
          </el-table-column>
          <el-table-column
            prop="matters"
            label="关联事项"
            align="center">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="项目负责人"
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
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
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

export default class Publishers extends Vue {
  private tabName: any = ['发行人管理']
  private punlisherDate: any = [{

  }]
}
</script>