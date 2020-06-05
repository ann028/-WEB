<template>
  <main>
    <!-- {{roleId}} -->
    <section class="main_space">
      <section>
        <el-input v-model="searchInfo.name" placeholder="账号姓名" class="input_width"></el-input>
        <button class="btn primary_btn" @click="onSearchButtonClick">查询</button>
      </section>
      <section class="flex">
        <section class="cross_center" style="cursor: pointer;">
          <span style="font-size: 14px;">添加用户</span>
          <img src="../../assets/img/user/user-plus.png" alt="" style="width: 16px; height: 16px;">
        </section>
        <section class="cross_center" style="margin-left: 34px; cursor: pointer;">
          <span style="font-size: 14px;">移除</span>
          <img src="../../assets/img/project/trash-2.png" alt="" style="width: 16px; height: 16px;">
        </section>
      </section>
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
          label="身份"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <span>移出</span>
          </template>
        </el-table-column>
      </el-table>
  </main>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component
export default class UserList extends Vue {
  @Prop() private readonly roleId!: any
  private searchInfo: any = {
    name: '',
  }
  private userData: any = [
    {
      name: 'zs',
    },
  ]
  private onSearchButtonClick() {
    console.log('chaxun')
  }
  private handleSelectionChange(val: any) {
    console.log(val)
  }
}
</script>
<style lang="less" scoped>

</style>