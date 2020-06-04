<template>
  <main class="content">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <div class="bg flex1" style="padding: 24px; box-sizing: border-box;">
      <section class="searchBox main_space">
        <section class="left">
          <section  class="flex">
            <el-input v-model="searchInfo.name" placeholder="债券代码/简称/发行人" class="input_width"></el-input>
            <button class="btn primary_btn" @click="onSearchButtonClick">查询</button>
          </section>
        </section>
        <section class="flex right">
          <button  class="btn primary_btn" @click="onFileButtonClick">归档</button>
            <!-- :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
              :on-exceed="handleExceed" -->
            <!-- :headers="{ 'Token-Id':`${userInfo.userId}`,'Token':`${userInfo.token}`,'Platform':'PC'}" -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="true"
            accept=".xls,.xlsx"
            :on-success="onUploadSuccess"
            :show-file-list="false">
            <button class="btn primary_btn">上传</button>
          </el-upload>
          <!-- <el-upload
            class="upload-demo"
            ref="upload"
            action="/api/daily/trainMeet/importTrainMeet"
            :auto-upload="true"
            accept=".xls,.xlsx"
            :on-success="onupload"
            :headers="{ 'Token-Id':`${userInfo.userId}`,'Token':`${userInfo.token}`,'Platform':'PC'}"
            :show-file-list="false"
            style="position: relative">
           </el-upload> -->
          <button class="btn primary_btn" @click="onDownloadButtonClick">下载</button>
          <button class="btn primary_btn" @click="onDelButtonClick">删除</button>
        </section>
      </section>
      <div class="mt20">
        <div class="invoice-list">
          <!-- 表头的值,自己单独写的 -->
          <ul class="invoice-header">
            <li>
              <!-- <el-checkbox v-model="checked"></el-checkbox> -->
            </li>
            <li class="invoice-item">名称</li>
            <li class="invoice-item">操作人</li>
            <li class="invoice-item">操作时间</li>
          </ul>
          <el-tree
            :props="props"
            :data="tableData"
            show-checkbox
            default-expand-all
            ref="treeData"
            @check-change="handleCheckChange">
            <!-- 使用自定义,需要加slot-scope,返回两个值,node是当前节点指定的对象
            data是当前节点的数据 -->
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span class="table_info_node">
                <div class="table_info_item cross_center" :style="tableRowPaddingStyle(data.deep)">
                  <img src="../../assets/img/draft/openFile.png" alt="" style="margin-right: 10px;">
                  <span>{{data.labelName}}</span>
                </div>
                <span class="table_info_item">{{data.name}}</span>
                <span class="table_info_item">{{data.time}}</span>
                <!-- <span class="table_info_item"><el-button @click="toInvoiceDetail(data)">详情</el-button></span> -->
              </span>
            </div>
          </el-tree>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { arrayToTree } from '../../utils/array'
import { ergodicTree } from '../../utils/tree'


// tableData: [] // tree组件渲染的数据

@Component({
  components: {
    Breadcrumb,
  },
})
export default class ProjectDraft extends Vue {
  private tabName: any = ['底稿管理', '项目底稿']
  private searchInfo: any = {
    name: '',
  }
  private tableData: object[] = [];
  private props: any =  {
    label: 'labelName', // 需要指定的节点渲染对象属性
    children: 'labelChildren', // 指定的子级
  }
  private handleCheckChange(val: any) {
    const treeData: any = this.$refs.treeData
    const selected = treeData.getCheckedNodes(false, true)
    console.log('树形组件选中', selected)
  }
  // 通过每个节点的深度，设置行的缩进实现视觉上的层级效果
  private tableRowPaddingStyle(row: any) {
    return {
      'margin-left': `${(row - 1) * 24}px`,
    }
  }
  private onSearchButtonClick() {
    console.log('search')
  }
  private onFileButtonClick() {
    console.log('file')
  }
  private onDownloadButtonClick() {
    console.log('下载')
  }
  private onDelButtonClick() {
    console.log('删除')
  }
  private onUploadSuccess() {
    console.log('上传成功！')
  }
  private created() {
    this.tableData = [
      {
        id: 1,
        labelName: '年报',
        labelChildren: [
          {
            id: 11,
            labelName: '2019年报',
            labelChildren: [
              {
                id: 111,
                labelName: '天风证券-2019',
                name: '张三',
                time: '2020-9-09',
              },
              {
                id: 111,
                labelName: '天风证券23-2019',
                name: '张三',
                time: '2020-9-09',
              },
            ],
          },
        ],
      },
      {
        id: 1,
        labelName: '年报',
      }
    ]
    console.log(this.tableData)
    this.ergodicTree(this.tableData)
  }

  private ergodicTree(tree: object[], callback: any = () => {}, props = {id: 'id', labelChildren: 'labelChildren'}) {
    function ergodicTree(tree: object[], depth: number = 0) {
      const treeLength = tree.length;
      for (let i = 0; i < treeLength; i++) {
        const node: any = tree[i];
        // const idPath: any[] = parentIdPath ? [...parentIdPath, node[props.id]] : [node[props.id]];
        const deep: number = depth + 1;
        // node._idPath = idPath;
        node.deep = deep;
        callback(node);
        if (node[props.labelChildren] && node[props.labelChildren] instanceof Array) {
          ergodicTree(node[props.labelChildren],  deep)
        }
      }
    }

    ergodicTree(tree);
    console.log('ergodic', tree)
    return tree;
  }
}
</script>
<style lang="less" scoped>
  ul,li{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  /deep/ .el-tree-node{
    border-top: 1px solid #ebeef5;
  }
  /deep/ .el-tree-node__content{
    height: 46px;
    padding-left: 0 !important;
  }
  
  .invoice-list {
    border: 1px solid #ebeef5;
    margin-top: 10px;
    font-size: 14px;
    .invoice-header {
      background-color: #f8f8f9;
      display: flex;
      padding-left: 63px;
      // border-bottom: 1px solid #ebeef5;
      .invoice-item {
        padding: 10px;
        padding-right: 0;
        flex: 1;
        // border-left: 1px solid #ebeef5;
        padding-left: 10px;
      }
    }
    .el-tree-node__content {
      background: #f2f2f2;
      height: 40px;
    }
    .el-tree-node__children {
      .el-tree-node__content {
        background: #fff;
        border-bottom: 1px solid #ebeef5;
      }
    }
    .custom-tree-node {
      width: 100%;
      height: 100%;
      .total_info_box {
        background: #f2f2f2;
        line-height: 40px;
        span{
          float: left;
          font-size: 12px;
          margin: 0 15px;
          i{
            display: inline-block;
            margin-right: 3px;
          }
        }
      }
      .table_info_node {
        display: flex;
        height: 100%;
        .table_info_item {
          flex: 1;
          height: 100%;
          // border-left: 1px solid #ebeef5;
          padding-left: 24px;
          line-height: 40px;
        }
      }
    }
  }
</style>