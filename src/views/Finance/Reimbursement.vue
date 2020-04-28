<template>
  <main class="container">
    <Step :stepName = 'message' :imgUrl = 'imgUrl'></Step>
    <section class="mt20 main_space">
      <section class="flex">
         <el-date-picker
          v-model="timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          style="width: 224px">
        </el-date-picker>
        <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="staticReimByperson">查询</button>
      </section>
      <button class="btn btn_warning " style="width:76px;height:32px;" v-if="permission.includes('prm7121')" @click="exportInfo">
        <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
        导出
      </button>
    </section>
    <section class="mt20">
      <el-table :data="tableData" ref="tableData" :span-method="tableCellMethod" :cell-class-name="addClass" :header-cell-class-name="addHeader"  >
        <el-table-column label="部门" prop="departmentName" align="center"></el-table-column>
        <el-table-column label="费用发生人" prop="userName" align="center"></el-table-column>
        <el-table-column v-for='item in typeList' :label="item.label" :prop='item.prop' :width='item.width' :key="item.id" align="center">
          <el-table-column v-if='item.children.length>0' v-for="item1 in item.children"
          :label="item1.label" :prop='item1.value
' :width='item1.width' :key="item1.value" align="center">
          <el-table-column v-if='item1.children.length>0' v-for="item2 in item1.children"
          :label="item2.label" :prop='item2.value
' :width='item2.width' :key="item2.value" align="center">
          </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="合计" prop="sunAmount" align="center"></el-table-column>
      </el-table>
    </section>
  </main>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator';
import Step from '@/components/Step.vue'
import { finance, user } from '../../api';
@Component({
  components: {
    Step,
  },
})
export default class Reimbursement extends Vue {
  private message: any = ['财务管理', '财务报销', '报销汇总']
  private imgUrl = require('../../assets/img/head/finance.png')
  private timeValue: any[] = []
  private typeList: any[] = []
  private typeList1: any[] = []
  private tableData: any[] = []
  private spanArr: any[] = []
  private position: number = 0
  // public $refs!: {
  //   tableData: HTMLFormElement,
  // }
  private get permission() {
    return this.$store.state.permission
  }
  // 查询费用类别
  private async getCosttype() {
    // this.typeList = []
    let nodeList = []
    const type: string = 'REIMBURSEMENT'
    const res: any = await user.getCosttype(`type=${type}`)
    nodeList = res.data.data
    this.typeList1 = nodeList
    const brr = this.getList(nodeList)
    this.typeList = brr
  }
  // 回调函数
  private getList(list: any) {
    const arr: any[] = []
    for ( let i = 0, len = list.length; i < len; i++) {
      if (list[i].child.length) {
        arr.push({
          label: list[i].name,
          value: list[i].id.toString(),
          children: this.getList(list[i].child),
        })
      } else {
        arr.push({
          label: list[i].name,
          value: list[i].id.toString(),
        })
      }
    }
    return arr
  }
  // 查询个人报销单汇总
  private async staticReimByperson() {
    // console.log('this.$refs', this.$refs['tableData'].doLayout())
    // this.$refs[`tableData`].doLayout()
    let res: any
    if (this.$store.state.permission.includes('prm7122')) {
      res = await finance.staticReimBydepart(`startTime=${this.timeValue[0]}&&endTime=${this.timeValue[1]}`)
    } else {
      res = await finance.staticReimByperson(`startTime=${this.timeValue[0]}&&endTime=${this.timeValue[1]}`)
    }
    let obj: any = {}
    this.tableData = []
    for ( let j = 0, len = res.data.data.length; j < len; j++) {
      for (let i = 0, len1 = res.data.data[j].reiStatisticsUserVos.length; i < len1; i++) {
        obj = {
          departmentName: res.data.data[j].departmentName,
          userName: res.data.data[j].reiStatisticsUserVos[i].userName,
          sunAmount: res.data.data[j].reiStatisticsUserVos[i].sunAmount,
        };
        for (let m = 0, len2 = res.data.data[j].reiStatisticsUserVos[i].reiStatisticsAmountVos.length; m < len2; m++) {
          const data = res.data.data[j].reiStatisticsUserVos[i].reiStatisticsAmountVos[m].type
          obj[data] = res.data.data[j].reiStatisticsUserVos[i].reiStatisticsAmountVos[m].amount
        }
        this.tableData.push(obj)
      }
    }
    this.rowspan()
  }
   private tableCellMethod(row: any) {  // 表格合并行
    if (this.tableData.length > 1) {
      if ( row.rowIndex === this.tableData.length - 1) {
        if ( row.columnIndex === 0) {
          return [ 1, 2]
        } else if (row.columnIndex === 1) {
          return [0, 0]
        }
      }
      if (row.columnIndex === 0) {
        const row1 = this.spanArr[row.rowIndex];
        const col1 = row1 > 0 ? 1 : 0;
        return {
          rowspan: row1,
          colspan: col1,
        }
      }
    }
    // if(row.columnIndex === 1){
    //   const _row = this.spanArr[row.rowIndex];
    //   const _col = _row>0 ? 1 : 0;
    //   return {
    //     rowspan: _row,
    //     colspan: _col
    //   }
    // }
  }
  // 行合并
  private rowspan() {
    this.position = 0
    this.spanArr = []
    this.tableData.forEach((item, index) => {
      if ( index === 0) {
        this.spanArr.push(1);
        this.position = 0;
      } else {
        if (this.tableData[index].departmentName === this.tableData[index - 1].departmentName
        && this.tableData[index].departmentName !== '') {
          this.spanArr[this.position] += 1;
          this.spanArr.push(0);
        } else {
          this.spanArr.push(1);
          this.position = index;
        }
      }
    })
  }
  private addClass(row: any) {
    if (row.column.label === '合计') {
        return 'tableCell'
    }
    if (row.row.userName === '小计') {
      if (row.rowIndex === this.tableData.length - 1) {
        if (row.columnIndex === 0) {
          return 'tableTotalHight'
        } else {
          return 'tableTotal'
        }
      } else {
        if (row.columnIndex === 1) {
          return `tableCellHight`
        } else {
          return 'tableCell'
        }
      }
    }
    if (row.row.departmentName === '合计') {
      if ( row.columnIndex === 0) {
        return `tableTotalHight`
      } else {
        return 'tableTotal'
      }
    }
  }
  private addHeader(row: any) {
    if (row.column.label === '合计') {
      return 'tableCellHight'
    }
  }
  // 导出
  private async exportInfo() {
    let res1: any
    if (this.$store.state.permission.includes('prm7122')) {
      const res: any = await finance.exportReim(`endTime=${this.timeValue[1]}&&startTime=${this.timeValue[0]}&&isDepartMent=true`)
      res1 = res.data
    } else {
      const res: any = await finance.exportReim(`endTime=${this.timeValue[1]}&&startTime=${this.timeValue[0]}&&isDepartMent=false`)
      res1 = res.data
    }
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `报销汇总-${this.timeValue[0]}-${this.timeValue[1]}`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  private getNowtime() {
    const date = new Date()
    const dateTime  = date.getTime();
    const dateDay = date.getDay();
    const end = new Date(dateTime)
    const year = end.getFullYear();   // '2019'
    const month = end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);  // '04'
    const da = '01'
    const beg = new Date(end.getFullYear(), end.getMonth() + 1, 0)

    const year1 = beg.getFullYear();   // '2019'
    const month1 = beg.getMonth() + 1 < 10 ? '0' + (beg.getMonth() + 1) : (beg.getMonth() + 1);  // '04'
    const da1 = beg.getDate() < 10 ? '0' + beg.getDate() : beg.getDate();  // '12'
    const beg1 = `${year}-${month}-${da}`
    const end1 = `${year1}-${month1}-${da1}`
    let dat: any = [];
    dat = [beg1, end1]; // 将值设置给插件绑定的数据
    this.timeValue = dat;
  }
  //
  private mounted() {
    this.getNowtime()
    this.getCosttype()
    this.rowspan()
    this.staticReimByperson()
  }
}
</script>
<style lang="less" >
main{
  .mt20{
    margin-top: 20px;
  }
   /deep/ .el-date-editor .el-range-separator,.el-input__icon{
    height:32px
  }
  /deep/ .el-input__icon{
  line-height: 28px;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td.tableCellHight{
    background-color: #FFD159;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td.tableTotalHight{
    background-color: #5792FC;
  }
  .el-table th, .el-table tr{
    background: none;
    .tableCell{
      background: #FFFAEB !important;
    }
    .tableCellHight{
      background: #FFD159;
      color: #fff;
    }
    .tableTotal{
      background: #F8FAFE;
    }
    .tableTotalHight{
      background: #5792FC;
      color: #ffff;
    }
  }
}
</style>