<template>
  <main class="container">
    <Step :stepName='message'></Step>
    <div  style="margin-top: 20px;display: flex;justify-content: space-between;">
      <section class="flex">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchInfo.timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          class="line">
        </el-date-picker>
        <section class="m0">
          <span style="flex-shrink: 0;font-size: 14px;color: rgba(96,98,102,1);margin: 0 20px;line-height: 28px;">员工姓名</span>
          <el-input v-model="searchInfo.userName"  clearable placeholder="请输入内容" class="line"></el-input>
        </section>
        <!-- <section class="m0">
          <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">部门</span>
          <el-select v-model="departValue" placeholder="请选择" class="line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section> -->
       <button class="btn btn_primary" @click="search" style="width:76px; height:32px;">查询</button>
      </section>
      <section class="flex">
        <button v-if="permission.includes('prm1233')"  @click="exportInfo" class="btn btn_warning" style="width: 76px;height: 32px;">
          <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
          导出
        </button>
      </section>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#F5F6FA'}"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="员工姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="部门"
          align="center">
        </el-table-column>
        <el-table-column
          prop="workDay"
          label="工作日数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="workWeek"
          label="工作周数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="interviewTime"
          label="累计面访数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="interviewTimeAve"
          label="平均每周面访数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="onLionTime"
          label="累计线上沟通数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="onLionTimeAve"
          label="平均每周线上沟通数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </div>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import Step from '@/components/Step.vue';
import { daily } from '@/api/index';
import * as Factory from '@/factory/index'

@Component({
    components: {
      Step,
    },
  })
export default class actualTable extends  Vue {
  private message = ['日常管理', '周报', '统计表', '实际表'];
  private tableData = []
  private searchInfo = {
    timeValue: Factory.getFirstDay(),
    userName: '',
  }
  public get permission() {
    return this.$store.state.permission
  }
  //  查询
  private async search() {
    let res: any
    if (this.$store.state.permission.includes('prm1232')) {
      res = await daily.findActual({
        endTime: this.searchInfo.timeValue[1],
        startTime: this.searchInfo.timeValue[0],
        userName: this.searchInfo.userName
      })
    } else {
      res = await daily.findActualP({
        endTime: this.searchInfo.timeValue[1],
        startTime: this.searchInfo.timeValue[0],
        userName: this.searchInfo.userName
      })
    }
    
    this.tableData = res.data.data
  }
  // 导出
  private async exportInfo() {
    let res: any
    if (this.$store.state.permission.includes('prm1232')) {
      res = await daily.exportAct({
        endTime: this.searchInfo.timeValue[1],
        startTime: this.searchInfo.timeValue[0],
        userName: this.searchInfo.userName
      })
    } else {
      res = await daily.exportActP({
        endTime: this.searchInfo.timeValue[1],
        startTime: this.searchInfo.timeValue[0],
        userName: this.searchInfo.userName
      })
    }
    let res1 = res.data
    var blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `实际表-${this.searchInfo.timeValue[0]}-${this.searchInfo.timeValue[1]}.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  private created() {
    this.search()
  }

}
</script>
<style lang="less" scoped>
 /deep/ .el-date-editor .el-range-separator,.el-input__icon{
    height:32px
  }
  /deep/ .el-input__icon{
  line-height: 26px;
  }
.container{
  .line{
    width:224px !important;
  }
  .m0{
    margin-right:10px;
  }
  .content{
    margin-top: 20px;
  }
  .pagination_box{
    margin-top: 25px;
    .word{
      font-size: 14px;
      margin-right: 5px;
    }
  }
  
}
</style>