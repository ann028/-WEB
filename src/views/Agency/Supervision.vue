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
              <button class="btn primary_btn">查询</button>
              <img src="../../assets/img/project/chevrons-down-orange.png" :class="[isShow ? 'transformGo' : 'transform']" @click="isShow = !isShow" style="width: 20px; height: 20px; margin: auto 0;">
            </section>
          </section>
        </section>
        <table class="events-list" style="width: 100%;">
          <thead class="flex events-head" style="width: 100%;">
            <tr ><el-checkbox v-model="checked"></el-checkbox></tr>
            <tr class="flex1">序号</tr>
            <tr class="flex1">事项</tr>
            <tr class="flex1">提醒时间 / 最后期限</tr>
            <tr class="flex2">所需材料</tr>
            <tr class="flex1">状态</tr>
            <tr class="flex1">操作</tr>
          </thead>
          <div>
            <tbody class="events-list-id flex">
              <tr>北京**国有投资有限公司</tr>
              <tr class="ml20">16债券01</tr>
              <tr class="ml20">150001</tr>
            </tbody>
          </div>
          <div>
            <tbody class="events-list flex" style="width: 100%;">
              <tr><el-checkbox v-model="checked"></el-checkbox></tr>
              <tr class="flex1">1</tr>
              <tr class="flex1">2019年披露</tr>
              <tr class="flex1">01-20 / 02-10</tr>
              <tr class="flex2">挂网文件需求.docx</tr>
              <tr class="flex1">待确认</tr>
              <tr class="flex1 center">
                <button class="btn primary_plain_btn" style="margin-left: 0;">确认</button>
                <button class="btn primary_btn">作废</button>
              </tr>
            </tbody>
          </div>
        </table>
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
  }
})
export default class Supervision extends Vue {
  private tabName: any = ['代办事项-督导']
  private tableData: any = [{

  }]
}
</script>
<style lang="less" scoped>
main{
  .events-list{
    font-size: 14px;
    color: rgba(76,76,78,1);
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
    }
  }
}
</style>