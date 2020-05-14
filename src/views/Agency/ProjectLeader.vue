<template>
  <main class="content">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <div class="bg flex1" style="padding: 24px; box-sizing: border-box;">
      <section class="searchBox main_space">
        <section class="left">
          <section  class="flex">
            <el-input v-model="input" placeholder="债券代码/简称/发行人" class="input_width"></el-input>
            <section style="margin-left: 10px;">
              <span class="search_title">事件类型</span>
              <el-select v-model="value" placeholder="发行人" class="search_width">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </section>
            <section style="margin-left: 10px;">
              <span class="search_title">事项</span>
              <el-input v-model="input" class="search_width"></el-input>
            </section>
            <button class="btn primary_btn" @click="doSearch">查询</button>
          
          </section>
        </section>
        <section class="right cross_center">
          <button class="btn primary_btn">重生</button>
          <!-- <img src="../../assets/img/project/icon-help-circle.png" alt="" class="icon_micro" style="margin-left: 8px;"> -->
          <div style="margin-left: 5px;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">重新生成"已作废"的事项</div>
              <img src="../../assets/img/project/icon-help-circle.png" alt="" class="icon_micro">
            </el-tooltip>
          </div>
        </section>
      </section>
      <div class="flex" style="margin-top: 28px;">
        <div :class="[tabActiveName === 'allEvent' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveTab('allEvent')">全部</div>
        <div :class="[tabActiveName === 'pendingEvent' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveTab('pendingEvent')">待处理</div>
        <div :class="[tabActiveName === 'reviewedEvent' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveTab('reviewedEvent')">待审核</div>
        <div :class="[tabActiveName === 'approvedEvent' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveTab('approvedEvent')">审核通过</div>
      </div>
      <table class="events-list" style="width: 100%; margin-top: 20px;">
        <thead class="flex events-head" style="width: 100%;">
          <tr ><el-checkbox v-model="checkedAll" @change="doCheckedAll(checkedAll)"></el-checkbox></tr>
          <tr class="flex1">序号</tr>
          <tr class="flex1">事项</tr>
          <tr class="flex1">提醒时间 / 最后期限</tr>
          <tr class="flex2">所需材料</tr>
          <tr class="flex1">状态</tr>
          <tr class="flex1">操作</tr>
        </thead>
        <div v-for="(item, index) in tableData" :key="index" style="height: 93px;">
          <div>
            <tbody class="events-list-id flex">
              <tr>{{item.compony}}</tr>
              <tr class="ml20">{{item.bond}}</tr>
              <tr class="ml20">{{item.code}}</tr>
            </tbody>
          </div>
          <div>
            <tbody class="events-list flex" style="width: 100%;">
              <tr><el-checkbox v-model="item.checked"></el-checkbox></tr>
              <tr class="flex1">{{item.index}}</tr>
              <tr class="flex1">{{item.event}}</tr>
              <tr class="flex1">{{item.time}}</tr>
              <tr class="flex2">{{item.doc}}</tr>
              <tr class="flex1">{{item.status}}</tr>
              <tr class="flex1 center">
                <button class="btn primary_plain_btn" style="margin-left: 0;">确认</button>
                <button class="btn primary_btn">作废</button>
              </tr>
            </tbody>
          </div>
        </div>
      </table>
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb.vue'

@Component({
  components: {
    Breadcrumb,
  },
})
export default class ProjectLeader extends Vue {
  private tabName: any = ['代办事项-督导']
  private checkedAll: boolean = false
  private tabActiveName: any = 'allEvent'
  private tableData: any = [
    {
      id: 122222222222,
      compony: '北京**国有投资有限公司',
      bond: '16债券01',
      code: '150001',
      index: 1,
      event: '2019年披露',
      time: '01-20 / 02-10',
      doc: '挂网文件需求.docx',
      status: '待确认',
      checked: false,
    },
    {
      id: 788888888888888,
      compony: '北京**国有投资有限公司',
      bond: '16债券01',
      code: '150001',
      index: 2,
      event: '2019年披露',
      time: '01-20 / 02-10',
      doc: '挂网文件需求.docx',
      status: '待确认',
      checked: false,
    },
  ]
  @Watch('tableData', {deep: true})
    private table(val: any, oldVal: any) {
    const arr = val.filter((item: any) => item.checked === true)
    if (arr.length === this.tableData.length) {
      this.checkedAll = true
    } else {
      this.checkedAll = false
    }
  }
  private doCheckedAll(checkedAll: any) {
    this.checkedAll = this.checkedAll
    for (const i of this.tableData) {
      console.log(i)
      i.checked = this.checkedAll
    }
  }
  private doSearch() {
    const arr = this.tableData.filter((item: any) => item.checked === true)
    const ids = arr.map((item: any) => {
      return item.id
    })
    console.log(ids)
  }

  private onChangeActiveTab(tabName: any) {
    this.tabActiveName = tabName
    if (tabName === 'allEvent') {
        this.tableData = [
          {
          id: 122222222222,
          compony: '北京**国有投资有限公司',
          bond: '16债券01',
          code: '150001',
          index: 1,
          event: '2019年披露',
          time: '01-20 / 02-10',
          doc: '挂网文件需求.docx',
          status: '待确认',
          checked: false,
        },
        {
          id: 788888888888888,
          compony: '北京**国有投资有限公司',
          bond: '16债券01',
          code: '150001',
          index: 2,
          event: '2019年披露',
          time: '01-20 / 02-10',
          doc: '挂网文件需求.docx',
          status: '待确认',
          checked: false,
        },
      ]
      } else if (tabName === 'pendingEvent') {
        this.tableData = [
          {
            id: 122222222222,
            compony: '北京**国有投资有限公司',
            bond: '16债券01',
            code: '150001',
            index: '待处理',
            event: '2019年披露',
            time: '01-20 / 02-10',
            doc: '挂网文件需求.docx',
            status: '待确认',
            checked: false,
          },
        ]
    } else if (tabName === 'reviewedEvent') {
        this.tableData = [
          {
            id: 122222222222,
            compony: '北京**国有投资有限公司',
            bond: '16债券01',
            code: '150001',
            index: '待审核',
            event: '2019年披露',
            time: '01-20 / 02-10',
            doc: '挂网文件需求.docx',
            status: '待确认',
            checked: false,
          },
        ]
    } else if (tabName === 'approvedEvent') {
        this.tableData = [
          {
            id: 122222222222,
            compony: '北京**国有投资有限公司',
            bond: '16债券01',
            code: '150001',
            index: '审核通过',
            event: '2019年披露',
            time: '01-20 / 02-10',
            doc: '挂网文件需求.docx',
            status: '待确认',
            checked: false,
          },
        ]
    }
  }
}
</script>
<style lang="less" scoped>
main{
  .events-list{
    font-size: 14px;
    color: rgba(76,76,78,1);
    height: 92px;
    .events-head {
      height: 58px;
      line-height: 58px;
      padding: 0 20px;
      box-sizing: border-box;
      text-align: center;
      background: #FFF9F3;
    }
    .events-list-id {
      width: 100%;
      height: 28px;
      background: rgba(248,130,0,1);
      font-size: 14px;
      font-weight: bold;
      color: rgba(255,255,255,1);
      line-height: 28px;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .events-list{
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid #EDEBE9;
    }
  }
  .step1Item{
    height: 30px;
    font-weight:bold;
    font-size: 14px;
    margin-right: 36px;
    cursor: pointer;
  }
  .step1ItemActive{
    color: #F88200;
    position: relative;
  }
  .step1ItemActive:after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 30px;
    height: 3px;
    background: #F88200;
    margin: 0 auto;
    border-radius: 4px;
  }
}
</style>