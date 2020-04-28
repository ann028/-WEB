<template>
  <div id="openperiod">
    <main class="container">
      <Step :stepName = 'message' :imgUrl = 'imgUrl'></Step>
      <section class=" flex main_space" style="flex-wrap: wrap">
        <section class="mt20 left flex">
          <section class="flex openperiodText">
            <span class="text_title" style="margin-left: 0">产品</span>
            <el-input v-model="searchInfo.codeOrName" clearable  placeholder="产品代码/名称" maxlength="100" class="text_input"></el-input>
          </section>
          <section class="flex openperiodText" >
            <span class="text_title" >产品系列</span>
            <el-input v-model="searchInfo.series" clearable  placeholder="产品系列" maxlength="100" class="text_input"></el-input>
          </section>
          <button class="btn btn_primary" style="width: 76px; height: 32px; margin-left:10px" @click="getOpenperiod">查询</button>
        </section>
        <section class="right mt20" style="display: flex;flex-wrap:nowrap">
          <button class="btn btn_warning" style="width: 76px; height: 32px;margin-right:10px" @click="exportOpenperiod" v-if="permission.includes('prm8214')">
            <img src="../../../assets/img/output.png" alt="" style="width: 16px; height: 16px">
            导出</button>
          <button class="btn btn_primary" style="width: 106px; height: 32px;margin-right:10px" @click="addProduct" v-if="permission.includes('prm8211')">
            <img src="../../../assets/img/addition.png" alt="" style="width: 16px; height: 16px">
            新增产品</button>
          <button class="btn btn_succ" style="width: 120px; height: 32px" @click="addOpenperiod" v-if="permission.includes('prm8211')">
            <img src="../../../assets/img/addition.png" alt="" style="width: 16px; height: 16px">
            新增开放期</button>
        </section>
      </section>
      <section class="mt20 tableBox">
        <el-table 
        :data="tableData" 
        :header-cell-style="{background:'#F5F6FA'}"
        @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="序号"
            prop="index"
            fixed
            align="center">
          </el-table-column>
          <el-table-column
              label="产品代码"
              prop="code"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              label="产品名称"
              prop="name"
              fixed
              align="center">
            </el-table-column>
          <el-table-column 
            label="产品基本情况"
            align="center">
            <el-table-column
              label="成立时间"
              prop="createAt"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              label="产品系列"
              prop="series"
              align="center">
            </el-table-column>
            <el-table-column
              label="投资主办"
              prop="person"
              align="center">
            </el-table-column>
            <el-table-column
              label="成立规模（亿元）"
              prop="scale"
              align="center">
            </el-table-column>
            <el-table-column
              label="产品状态"
              prop="state"
              align="center">
              <template slot-scope='scope'>
                <span v-if="scope.row.state === 'CLOSE'">封闭期</span>
                <span v-if="scope.row.state === 'DRAFT'">未成立</span>
                <span v-if="scope.row.state === 'NO_OPEN'">未开放</span>
                <span v-if="scope.row.state === 'OPENING'">开放中</span>
                <span v-if="scope.row.state === 'EXPIRE'">已到期</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="120">
              <template slot-scope="scope">
                    <!-- v-if="!item.stage || item.stage && scope.row.productOpenPeriodInfos && scope.row.productOpenPeriodInfos.length && item.stage <= scope.row.productOpenPeriodInfos.length" -->
                    <div class="main-around">
                      <span
                        style="cursor: pointer;color:#5792FC;"
                        @click.stop="editInfo(scope.row, '产品基本情况')"
                        v-if="permission.includes('prm8212')">
                        <img src="../../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                      编辑</span>
                      <span
                        style="cursor: pointer;color:#5792FC"
                        @click.stop="deleteInfo(scope.row, '产品基本情况')"
                        v-if="permission.includes('prm8213')">
                      <img src="../../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                      删除</span>
                      
                    </div>
                    <!-- <el-button  type="text" size="small" @click.stop="editInfo(scope.row, item)">编辑</el-button> -->
                    <!-- <el-button type="text" size="small" @click.stop="deleteInfo(scope.row, item)">删除</el-button> -->
                  </template>
            </el-table-column>
          </el-table-column>
          <el-table-column 
            v-for="(item, index) in tableColumn" :key="index"
            :label= "item.label"
            :prop="item.value"
            align="center">
              <el-table-column 
                v-if='item.children.length>0 && item1.value !== "" && item1.label !== "备注"'
                v-for="(item1, index1) in item.children" :key="index1"
                :label="item1.label"
                :prop="item1.value"
                :width="item1.label === '募集期'|| item1.label === '开放参与期' ||
                item1.label === '成立日期' || item1.label === '本次开放退出期' || item1.label === '上一开放退出期'? 110 : ''"
                align="center">
              </el-table-column>
              <el-table-column 
                v-if='item.children.length>0 && item1.value !== "" && item1.label === "备注"'
                v-for="(item1, index1) in item.children" :key="index1"
                :label="item1.label"
                :prop="item1.value"
                :show-overflow-tooltip="true"
                align="center">
              </el-table-column>
              <el-table-column 
                v-if='item.children.length>0 && item1.value === "" '
                v-for="(item1, index1) in item.children" :key="index1"
                :label="item1.label"
                width="120"
                align="center">
                <template slot-scope="scope" v-if="scope.row.productOpenPeriodInfos && scope.row.productOpenPeriodInfos.length &&scope.row.stageArr.includes(item.stage)">
                  <!-- v-if="!item.stage || item.stage && scope.row.productOpenPeriodInfos && scope.row.productOpenPeriodInfos.length && item.stage <= scope.row.productOpenPeriodInfos.length" -->
                  <div class="main-around">
                    <span
                      style="cursor: pointer;color:#5792FC;"
                      @click.stop="editInfo(scope.row, item)"
                      v-if="permission.includes('prm8212')">
                      <img src="../../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                    编辑</span>
                    <span
                      style="cursor: pointer;color:#5792FC"
                      @click.stop="deleteInfo(scope.row, item)"
                      v-if="permission.includes('prm8213')">
                    <img src="../../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                    删除</span>
                    
                  </div>
                  <!-- <el-button  type="text" size="small" @click.stop="editInfo(scope.row, item)">编辑</el-button> -->
                  <!-- <el-button type="text" size="small" @click.stop="deleteInfo(scope.row, item)">删除</el-button> -->
                </template>
              </el-table-column>
          </el-table-column>
        </el-table>
      </section>
    </main>
  </div>
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
export default class Openperiod  extends Vue {
  private message: any = ['产品管理', '开放期', '开放周期表']
  private imgUrl = require('../../../assets/img/head/product.png')
  private searchInfo: any = {
    series: '',
    codeOrName: '',
  }
  private tableData: any[] = []
  private originTableData: any[] = []
  private tableColumn: any[] = [
    // {
    //   label: '序号',
    //   value: 'index',
    // },
    // {
    //   label: '产品基本情况',
    //   value: 'id',
    //   children: [
    //     {
    //       label: '产品代码',
    //       value: 'code',
    //       fixed: true,
    //     },
    //     {
    //       label: '产品名称',
    //       value: 'name',
    //     },
    //     {
    //       label: '成立时间',
    //       value: 'createAt',
    //     },
    //     {
    //       label: '产品系列',
    //       value: 'series',
    //     },
    //     {
    //       label: '投资主办',
    //       value: 'person',
    //     },
    //     {
    //       label: '成立规模（亿元）',
    //       value: 'scale',
    //     },
    //     {
    //       label: '产品状态',
    //       value: 'state',
    //     },
    //     {
    //       label: '操作',
    //       value: '',
    //     },
    //   ],
    // },
  ]
  private selectionInfo: any = {}
  private get permission() {
    return this.$store.state.permission
  }
  private addProduct() {
    this.$router.push({name: 'addproduct'})
  }
  private addOpenperiod() {
    let info: any = []
    if (!Array.isArray(this.selectionInfo)) {
      this.$message.warning(`请选择要添加开放期的产品`)
      return false
    } else if (this.selectionInfo.length === 1) {
      const arr: any = this.selectionInfo[0]
      if (arr.scale === '' || !arr.createAt || arr.createAt && arr.createAt === '') {
        this.$message.warning(`请先完善产品基本信息`)
        return false
      }
      info = this.selectionInfo[0]
    } else {
      this.$message.warning(`请选择一个产品添加`)
      return false
    }
    let nowStage: any = ''
    if (info.productOpenPeriodInfos && info.productOpenPeriodInfos.length > 0) {
      nowStage = 2
    } else {
      nowStage = 1
    }
    this.$router.push({name: 'addopenperiod', query: {id: info.id, info: nowStage,
    obj: nowStage === 1 ? this.selectionInfo[0] : ''}})
  }
  // 查询开放周期
  private async getOpenperiod() {
    const res: any = await product.getAllopenperiod({
      // productSearchVo: {
        ...this.searchInfo,
      // },
    })
    this.originTableData = res.data.data.records
    // this.tableData = res.data.data.records
    let Max: number = 0
    const arr: any[] = []
    let number1: number = 0
    const stageArr: any[] = []
    for ( let i = 0, len = res.data.data.records.length; i < len; i++) {
      let  obj: any = {}
      number1 = number1 + 1
      obj = {
        index: number1,
      }
      for (const n of Object.keys(res.data.data.records[i])) {
        obj[n] = res.data.data.records[i][n]
      }
      if (res.data.data.records[i].productOpenPeriodInfos &&
      res.data.data.records[i].productOpenPeriodInfos.length > 0) {
        obj.stageArr = []
        for (let j = 0, lenj = res.data.data.records[i].productOpenPeriodInfos.length; j < lenj; j++) {
          if (res.data.data.records[i].productOpenPeriodInfos.length > Max) {
            Max = res.data.data.records[i].productOpenPeriodInfos.length
          }
          const data = res.data.data.records[i].productOpenPeriodInfos[j].stage
          // for (const key of Object.keys(res.data.data.records[i].productOpenPeriodInfos[j])) {
          //   const k in res.data.data.records[i].productOpenPeriodInfos[j]
          // }
          for (const k of Object.keys(res.data.data.records[i].productOpenPeriodInfos[j])) {
            if (k === 'raiseStartAt' || k === 'raiseEndAt') {
              obj[k + data] = res.data.data.records[i].productOpenPeriodInfos[j].raiseStartAt
              + '~' + res.data.data.records[i].productOpenPeriodInfos[j].raiseEndAt
            } else if (k === 'state') {
              switch (res.data.data.records[i].productOpenPeriodInfos[j].state) {
                case 'DRAFT':
                  obj[k + data] = '未成立'
                  break;
                case 'CLOSE':
                  obj[k + data] = '封闭期'
                  break;
                case 'NO_OPEN':
                  obj[k + data] = '未开放'
                  break;
                case 'OPENING':
                  obj[k + data] = '开放中'
                  break;
                case 'EXPIRE ':
                  obj[k + data] = '已过期'
                  break;
              }
            } else {
              obj[k + data] = res.data.data.records[i].productOpenPeriodInfos[j][k]
            }
            obj.stageArr.push(res.data.data.records[i].productOpenPeriodInfos[j].stage)
          }
          // arr.push(obj)
          // res.data.data.records[i].productOpenPeriodInfos[j] = obj
        }
        // arr.push(obj)
      }
      arr.push(obj)
    }
    for (let i = 1, len = Max; i <= len; i++) {
      if (i === 1) {
        this.tableColumn.push({
          stage: i,
          label: `第${i}期`,
          value: 'in',
          children: [
            {
              label: '募集期',
              value: `raiseStartAt${i}`,
            },
            {
              label: '成立日期',
              value: `createAt${i}`,
            },
            {
              label: '成立规模',
              value: `scale${i}`,
            },
            {
              label: '封闭期',
              value: `closePeriod${i}`,
            },
            {
              label: '客户收益率',
              value: `returnRate${i}`,
            },
            {
              label: '代销渠道',
              value: `channel${i}`,
            },
            {
              label: '本次开放退出期',
              value: `exitPeriod${i}`,
            },
            {
              label: '产品状态',
              value: `state${i}`,
            },
            {
              label: '备注',
              value: `remarks${i}`,
            },
            {
              label: '操作',
              value: '',
            },
          ],
        })
      } else if (i > 1) {
         this.tableColumn.push({
          stage: i,
          label: `第${i}期`,
          value: 'in',
          children: [
            {
              label: '上一开放退出期',
              value: `lastExitPeriod${i}`,
            },
            {
              label: '开放参与期',
              value: `raiseEndAt${i}`,
            },
            {
              label: '规模',
              value: `scale${i}`,
            },
            {
              label: '封闭期',
              value: `closePeriod${i}`,
            },
            {
              label: '客户收益率',
              value: `returnRate${i}`,
            },
            {
              label: '代销渠道',
              value: `channel${i}`,
            },
            {
              label: '本次开放退出期',
              value: `exitPeriod${i}`,
            },
            {
              label: '产品状态',
              value: `state${i}`,
            },
            {
              label: '备注',
              value: `remarks${i}`,
            },
            {
              label: '操作',
              value: '',
            },
          ],
        })
      }
    }
    this.tableData = arr
  }
  // 点击编辑
  private async editInfo(row: any, item: any) {
    if (item === '产品基本情况') {
      this.$router.push({name: 'addproduct', query: {id: row.id, type: 'edit'}})
    } else {
      const stage: number = item.label.replace(/[^0-9]/ig, "");
      let obj: any = {}
      for (let i = 0, len = this.originTableData.length; i < len; i++) {
        if (this.originTableData[i].id === row.id) {
          for (let j = 0, lenj = this.originTableData[i].productOpenPeriodInfos.length; j < lenj; j++	) {
            if (this.originTableData[i].productOpenPeriodInfos[j].stage === stage * 1) {
              obj = this.originTableData[i].productOpenPeriodInfos[j]
            }
          }
        }
      }
      this.$router.push({name: 'addopenperiod', query: { periodinfo: obj, info: stage > 1 ? '2' : '1', type: 'edit'}})
    }
  }
  // 编辑删除
  private async deleteInfo1(row: any, item: any) {
    if (item === '产品基本情况') {
      const res: any = await product.deleteProduct(`id=${row.id}`)
      if (res.data.success) {
        this.$message.success(`删除成功`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.getOpenperiod()
    } else {
      const stage: number = item.label.replace(/[^0-9]/ig, "");
      for (let i = 0, len = this.originTableData.length; i < len; i++) {
        if (this.originTableData[i].id === row.id) {
          for (let j = 0, lenj = this.originTableData[i].productOpenPeriodInfos.length; j < lenj; j++	) {
            if (this.originTableData[i].productOpenPeriodInfos[j].stage === stage * 1) {
              const res: any =
              await product.deleteOpeninfo(`id=${this.originTableData[i].productOpenPeriodInfos[j].id}`)
              if (res.data.success) {
                this.$message.success(`删除成功`)
                this.getOpenperiod()
              } else {
                this.$message.error(`${res.data.msg}`)
              }
            }
          }
        }
      }
    }
  }
  private deleteInfo(row: any, item: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.deleteInfo1(row, item)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
  }
  // 选项改变
  private handleSelectionChange(val: any) {
    this.selectionInfo = val
  }
  // private handleCurrentChange(val: any) {
  //   this.selectionInfo = val
  // }
  // 导出开放期
  private async exportOpenperiod() {
    const data: any = {
      codeOrName: this.searchInfo.codeOrName,
      series: this.searchInfo.series,
    }
    const res: any = await product.exportOpenperiod(data)
    const res1 = res.data
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `开放周期表.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  private mounted() {
    this.getOpenperiod()
  }
}
</script>
<style lang="less" >
#openperiod{
  main{
    //   .is-group .el-table_1_column_1{
    //   width: 0;
    //   border: 0;
    //   // background: red;
    //   // z-index: 999;
    // }
    // .has-gutter{
    //   background: red !important
    // }
      /deep/ .el-input__icon{
      line-height: 32px;
      }
    .mt20{
      margin-top: 20px;
    }
    .openperiodText{
      .text_title{
        flex-shrink: 0;
        font-size: 14px;
        color:rgba(96,98,102,1);
        line-height:32px;
        margin:0 12px 0 20px
      }
      .text_input{
        height: 32px;
        width: 224px !important;
      }
    }
    .tableBox{
      min-width: 30%;
      // overflow-x: scroll;
    }
    .el-table th.el-table-column--selection:nth-child(1)> .cell{
      display: none
    }
  }
}
</style>