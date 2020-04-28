<template>
  <main class="container">
    <Step :stepName = 'message' :imgUrl = 'imgUrl'></Step>
    <section class="mt20 flex main_space">
      <section class="flex nearperiod">
        <section class="flex nearperiod">
          <span class="text_title" style="margin-left: 0">产品</span>
          <el-input v-model="searchInfo.codeOrName" clearable  maxlength="100" placeholder="产品代码或名称" class="text_input"></el-input>
        </section>
        <section class="flex nearperiod">
          <span class="text_title" >产品系列</span>
          <el-input v-model="searchInfo.series" maxlength="100" clearable  placeholder="请输入内容" class="text_input"></el-input>
        </section>
        <button class="btn btn_primary" style="width: 76px; height: 32px;margin-left:20px" @click="getNearperiod">查询</button>
      </section>
      <section class="flex">
        <button class="btn btn_warning" style="width: 76px; height: 32px;" @click="exportInfo" v-if="permission.includes('prm8224')">导出</button>
      </section>
    </section>
    <section class="mt20">
      <el-table 
        :data="tableData"
        :header-cell-style="{background:'#F5F6FA'}">
        <el-table-column 
          v-for="(item, index) in tableColumn"
          :key="index"
          :label="item.label"
          :prop="item.value"
          :fixed="item.fixed"
          align="center">
          <el-table-column 
            v-if="item.children && item.children.length"
            v-for="(item1, index1) in item.children"
            :key="index1"
            :label="item1.label"
            :prop="item1.value"
            :show-overflow-tooltip="item1.show"
            :width="item1.label === '开放参与期' ||
                item1.label === '成立日期' || item1.label === '本次开放退出期' || item1.label === '上一开放退出期'? 110 : ''"
            align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </section>
  </main>
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
export default class Nearopenperiod  extends Vue {
  private message: any = ['产品管理', '开放期', '近期开放一览表']
  private imgUrl: any = require('../../../assets/img/head/product.png')
  private searchInfo: any = {
    series: '',
    codeOrName: '',
  }
  private tableColumn: any[] = [
    {
      label: '产品代码',
      value: 'code',
      fixed: true,
    },
    {
      label: '产品名称',
      value: 'name',
      fixed: true,
    },
    {
      label: '产品状态',
      value: 'state',
      fixed: true,
    },
    {
      label: '当前封闭期',
      value: 'now',
      children: [
        {
          label: '上一开放退出期',
          value: 'lastExitPeriod1',
        },
        {
          label: '开放参与期',
          value: 'raiseEndAt1',
        },
        {
          label: '规模',
          value: 'scale1',
        },
        {
          label: '封闭期',
          value: 'closePeriod1',
        },
        {
          label: '客户收益率',
          value: 'returnRate1',
        },
        {
          label: '代销渠道',
          value: 'channel1',
        },
        {
          label: '本次开放退出期',
          value: 'exitPeriod1',
        },
        {
          label: '备注',
          value: 'remarks1',
          show: true,
        },
      ],
    },
    {
      label: '下次封闭期',
      value: 'next',
      children: [
        {
          label: '上一开放退出期',
          value: 'lastExitPeriod0',
        },
        {
          label: '开放参与期',
          value: 'raiseEndAt0',
        },
        {
          label: '规模',
          value: 'scale0',
        },
        {
          label: '封闭期',
          value: 'closePeriod0',
        },
        {
          label: '客户收益率',
          value: 'returnRate0',
        },
        {
          label: '代销渠道',
          value: 'channel0',
        },
        {
          label: '本次开放退出期',
          value: 'exitPeriod0',
        },
        {
          label: '备注',
          value: 'remarks0',
          show: true,
        },
      ],
    },
  ]
  private tableData: any[] = []
  private get permission() {
    return this.$store.state.permission
  }
  private async getNearperiod() {
    const res: any = await product.getNearfuture({
      ...this.searchInfo,
    })
    const arr: any[] = []
    for (let i = 0, len = res.data.data.records.length; i < len; i++) {
      let obj: any = {}
      obj = {
        code: res.data.data.records[i].code,
        name: res.data.data.records[i].name,
        state: res.data.data.records[i].state === 'CLOSE' ? '封闭期' : res.data.data.records[i].state === 'DRAFT' ? '未成立' :
        res.data.data.records[i].state === 'NO_OPEN' ? '未开放' : res.data.data.records[i].state === 'OPENING' ? '开放中'
        : res.data.data.records[i].state === 'EXPIRE' ? '已到期' : '',
      }
      for (let j = 0, lenj = res.data.data.records[i].productOpenPeriodInfos.length; j < lenj; j++) {
        for (const k of Object.keys(res.data.data.records[i].productOpenPeriodInfos[j])) {
          if (k === 'raiseEndAt' ) {
            obj[k + j] = res.data.data.records[i].productOpenPeriodInfos[j].raiseStartAt + '~' +
            res.data.data.records[i].productOpenPeriodInfos[j].raiseEndAt
          } else {
             obj[k + j] = res.data.data.records[i].productOpenPeriodInfos[j][k]
          }
        }
      }
      arr.push(obj)
    }
    this.tableData = arr
  }
  // 导出
  private async exportInfo() {
    const res: any = await product.exportNearfuture({
      ...this.searchInfo,
    })
    const res1 = res.data
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `近期开放一览表.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  private mounted() {
    this.getNearperiod()
  }
}
</script>
<style lang="less" scoped>
main{
   /deep/ .el-input__icon{
  line-height: 32px;
  }
  .mt20{
    margin-top: 20px;
  }
  .nearperiod{
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
  .el-table__fixed::before{
    display: none;
  }
}
</style>