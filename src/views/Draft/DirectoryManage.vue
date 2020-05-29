<template>
  <main class="content">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <div class="bg flex1 flex" style="padding: 24px; box-sizing: border-box;">
      <section class="left draftTree" style="">
        <section>
          <img src="../../assets/img/draft/add.png" alt="" style="cursor: pointer;">
          <img src="../../assets/img/draft/trash (1).png" alt="" style="margin-left: 24px; cursor: pointer;">
          <img src="../../assets/img/draft/edit-fill.png" alt="" style="margin-left: 24px; cursor: pointer;">
        </section>
        <div class="flex1" style="background: #FFF9F3; margin-top: 24px;">
          <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
            <span  class="title_node" slot-scope="{ node }">
              <span :title="node.label">{{node.label}}</span>
            </span>
          </el-tree>
        </div>
      </section>
      <section class="right relationEvent flex1 ml20">
        <div class="main_space">
          <span style="font-size: 14px;">关联事项</span>
          <button class="btn primary_btn">新增</button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#FFF9F3'}"
          class="mt20">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="事项类型">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="事项名称">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <div slot-scope="scope">
              <button class="btn primary_plain_btn" style="margin-left: 0;">删除</button>
            </div>
          </el-table-column>
        </el-table>
      </section>
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
export default class DirectoryManage extends Vue {
  private tabName: any = ['底稿管理', '目录管理']
  private tableData: any = [
    {
      name: '发行人',
    },
  ]
  private treeData: any = [
    {
      label: '一级 1',
      id: 1,
      children: [
        {
          label: '一级1-1',
          id: 2,
        },
      ],
    },
    {
      label: '二级 2',
      id: 3,
    },
  ]
  private handleNodeClick(data: any) {
    console.log(data)
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-tree{
  background: #FFF9F3;
}
/deep/.el-table__body tr:hover > td{
  background-color:#FFF9F3 !important;
}
main{
  .draftTree{
    width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
}
</style>