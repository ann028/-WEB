<template>
  <div id="salesSummary">
    <main class="container">
      <Step :stepName = 'message' :imgUrl = "imgUrl"></Step>
      <section class="flex main_space mt20">
        <section class="flex">
          <el-date-picker
            v-model="timeValue"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 224px">
          </el-date-picker>
          <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="getInfo">查询</button>
        </section>
        <section>
          <button class="btn btn_warning" style="width:76px;height:32px;" @click="exportInfo" v-if="permission.includes('prm8122')">
              <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
              导出</button>
        </section>
      </section>
      <section class="mt20 flex main_space">
        <el-table
          :data="tableData"
          style="width: 100%"
          :span-method="tableCellMethod"
          @cell-mouse-enter="handleMouseEnter" 
          @cell-mouse-leave="handleMouseLeave" 
          :row-class-name="rowClassName" 
          :cell-class-name="addClass">
          <el-table-column
            prop="index"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="销售人员"
            align="center">
          </el-table-column>
          <el-table-column
            prop="items"
            label="考核项"
            align="center"
            :render-header="tableAction">
          </el-table-column>
          <el-table-column  v-for="(item, index) in tableTitle" :key="index" :label="item.label" :prop="item.value" align="center">
            <el-table-column  
          :render-header='labelHeader'   v-for="(item1, index) in item.children" :key="index" :prop="item1.value" :label="item1.label" align="center" >
            </el-table-column>
          </el-table-column>
        </el-table>
      </section>
    </main>
  </div>
  
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch  } from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { product } from '../../api'
@Component({
  components: {
    Step,
  },
})
export default class SalesSummary extends Vue {
  private message: any = ['产品管理', '销售管理', '销售汇总']
  private imgUrl: any = require('../../assets/img/head/product.png')
  private timeValue: any = []
  private tableData: any[] = []
  private tableTitle: any = []
  private personItems: any[] = [
    {
      name: '原规模（万元）',
      value: 'originalSize',
    },
    {
      name: '指标（万元）',
      value: 'target',
    },
    {
      name: '指标占比',
      value: 'indicatorsOf',
    },
    {
      name: '赎回量（万元）',
      value: 'redemptions',
    },
    {
      name: '赎回占比',
      value: 'redemptionsRatio',
    },
    {
      name: '申购量（万元）',
      value: 'subscriptions',
    },
    {
      name: '申购量占比',
      value: 'subscriptionsRatio',
    },
    {
      name: '现规模（万元）',
      value: 'nowSize',
    },
    {
      name: '规模占比',
      value: 'nowSizeRatio',
    },
     {
      name: '净申购量（万元）',
      value: 'netSubscriptions',
    },
     {
      name: '保有率',
      value: 'retentionRate',
    },
     {
      name: '完成率',
      value: 'percentageComplete',
    },
     {
      name: '参与度',
      value: 'participation',
    },
  ]
  private headOfficeItems: any[] = [
    {
      name: '赎回量（万元）',
      value: 'redemptions',
    },
    {
      name: '申购量（万元）',
      value: 'subscriptions',
    },
    {
      name: '现规模（万元）',
      value: 'nowSize',
    },
  ]
  private totalItems: any[] = [
    {
      name: '合计指标',
      value: 'target',
    },
    {
      name: '合计赎回量',
      value: 'redemptions',
    },
    {
      name: '合计申购量',
      value: 'subscriptions',
    },
    {
      name: '合计规模',
      value: 'nowSize',
    },
  ]
  private spanArr: any[] = []
  private position: number = 0
  private cellIndex: any = '-1'
  public get permission() {
    return this.$store.state.permission
  }
  private async getInfo() {
    const startTime: any = this.timeValue[0] ? this.timeValue[0] : ''
    const endTime: any = this.timeValue[1] ? this.timeValue[1] : ''
    const res: any = await product.saleStatics(`startTime=${this.timeValue[0] ? this.timeValue[0] : ''}&&endTime=${this.timeValue[1] ? this.timeValue[1] : ''}`)
    // const res: any = await product.saleStatics(`startTime=''&&endTime=''`)
    const titleArr: any[] = [
      {
        label: '首发认购',
        value: 'FIRST_SUBSCRIBE',
        children: [
          {
            label: res.data.data.projectNameMap.FIRST_SUBSCRIBE,
            value: 'First',
          },
          {
            label: '排名',
            value: 'paimingF',
          },
        ],
      },
      {
        label: '有销售任务',
        value: 'HAVE_TASK',
        children: [
          {
            label: res.data.data.projectNameMap.HAVE_TASK,
            value: 'HAVE_TASK',
          },
          {
            label: '排名',
            value: 'paimingH',
          },
        ],
      },
       {
        label: '无销售任务',
        value: 'NO_TASK',
        children: [
          {
            label: res.data.data.projectNameMap.NO_TASK,
            value: 'NO_TASK',
          },
          {
            label: '排名',
            value: 'paimingN',
          },
        ],
      },
    ]
    this.tableTitle = titleArr
    if (res.data.data.salesDetailVos.length > 0) {
      const data: any[] = res.data.data.salesDetailVos
      this.tableData = []
      let m: number = 0
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].userName === '总行' ) {
          let obj: any = {}
          for (let j = 0, lenj = this.headOfficeItems.length; j < lenj; j++) {
            obj = {
              userName: data[i].userName,
              items: this.headOfficeItems[j].name,
              First: data[i].results.FIRST_SUBSCRIBE ?
                data[i].results.FIRST_SUBSCRIBE[`${this.headOfficeItems[j].value}`] : '',
              paimingF: data[i].results.FIRST_SUBSCRIBE ? data[i].results.FIRST_SUBSCRIBE.index : '',
              HAVE_TASK: data[i].results.HAVE_TASK ? data[i].results.HAVE_TASK[`${this.headOfficeItems[j].value}`] : '',
              paimingH: data[i].results.HAVE_TASK ? data[i].results.HAVE_TASK.index : '',
              NO_TASK: data[i].results.NO_TASK ? data[i].results.NO_TASK[`${this.headOfficeItems[j].value}`] : '',
              paimingN: data[i].results.NO_TASK ? data[i].results.NO_TASK.index : '',
            }
            this.tableData.push(obj)
          }
        } else if (data[i].userName === '合计' ) {
          let obj: any = {}
          for (let j = 0, lenj = this.totalItems.length; j < lenj; j++) {
            obj = {
              userName: data[i].userName,
              items: this.totalItems[j].name,
              First: data[i].results.FIRST_SUBSCRIBE ?
                data[i].results.FIRST_SUBSCRIBE[`${this.totalItems[j].value}`] : '',
              paimingF: data[i].results.FIRST_SUBSCRIBE ? data[i].results.FIRST_SUBSCRIBE.index : '',
              HAVE_TASK: data[i].results.HAVE_TASK ? data[i].results.HAVE_TASK[`${this.totalItems[j].value}`] : '',
              paimingH: data[i].results.HAVE_TASK ? data[i].results.HAVE_TASK.index : '',
              NO_TASK: data[i].results.NO_TASK ? data[i].results.NO_TASK[`${this.totalItems[j].value}`] : '',
              paimingN: data[i].results.NO_TASK ? data[i].results.NO_TASK.index : '',
            }
            this.tableData.push(obj)
          }
        } else {
          let obj: any = {}
          const arr = ['indicatorsOf', 'redemptionsRatio', 'subscriptionsRatio', 'nowSizeRatio', 'retentionRate', 'percentageComplete']
          for (let j = 0, lenj = this.personItems.length; j < lenj; j++) {
            obj = {
              index: m + 1,
              userName: data[i].userName,
              items: this.personItems[j].name,
              First: data[i].results.FIRST_SUBSCRIBE ?
              arr.indexOf(this.personItems[j].value) !== -1 ?
              data[i].results.FIRST_SUBSCRIBE[`${this.personItems[j].value}`] ? data[i].results.FIRST_SUBSCRIBE[`${this.personItems[j].value}`] + '%' : '' : data[i].results.FIRST_SUBSCRIBE[`${this.personItems[j].value}`] : '',
              paimingF: data[i].results.FIRST_SUBSCRIBE ? data[i].results.FIRST_SUBSCRIBE.index : '',
              HAVE_TASK: data[i].results.HAVE_TASK ?
              arr.indexOf(this.personItems[j].value) !== -1 ?
              data[i].results.HAVE_TASK[`${this.personItems[j].value}`] ? data[i].results.HAVE_TASK[`${this.personItems[j].value}`] + '%' : data[i].results.HAVE_TASK[`${this.personItems[j].value}`] : data[i].results.HAVE_TASK[`${this.personItems[j].value}`] : '',
              paimingH: data[i].results.HAVE_TASK ? data[i].results.HAVE_TASK.index : '',
              NO_TASK: data[i].results.NO_TASK ?
              arr.indexOf(this.personItems[j].value) !== -1 ?
              data[i].results.NO_TASK[`${this.personItems[j].value}`] ? data[i].results.NO_TASK[`${this.personItems[j].value}`] + '%' : data[i].results.NO_TASK[`${this.personItems[j].value}`] : data[i].results.NO_TASK[`${this.personItems[j].value}`] : '',
              paimingN: data[i].results.NO_TASK ? data[i].results.NO_TASK.index : '',
            }
            this.tableData.push(obj)
          }
          m = m + 1
        }
        this.rowspan()
      }
      console.log(this.tableData)
    }
  }
  // 导出
  private async exportInfo() {
    if (this.timeValue.length > 0) {
      const res: any = await product.exportSalestatics(`startTime=${this.timeValue[0]}&&endTime=${this.timeValue[1]}`)
      const res1 = res.data
      const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob); // 创建下载的链接
      downloadElement.href = href;
      downloadElement.download = `销售汇总-${this.timeValue[0]}-${this.timeValue[1]}.xls`; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    }
  }
  private tableCellMethod(row: any) {  // 表格合并行
    if (this.tableData.length > 1) {
      if ( row.rowIndex === this.tableData.length - 4 ) {
        if ( row.columnIndex === 1) {
          return [ 4, 2]
        } else if (row.columnIndex === 0) {
          return [ 0, 0]
        }
      }
      if (row.columnIndex === 0 || row.columnIndex === 1 || row.columnIndex === 4
      || row.columnIndex === 6 || row.columnIndex === 8) {
        const row1 = this.spanArr[row.rowIndex];
        const col1 = row1 > 0 ? 1 : 0;
        return {
          rowspan: row1,
          colspan: col1,
        }
      }
    }
  }
  // 行合并
  private rowspan() {
    this.spanArr = []
    this.position = 0
    this.tableData.forEach((item, index) => {
      if ( index === 0) {
        this.spanArr.push(1);
        this.position = 0;
      } else {
        if (this.tableData[index].userName ===  this.tableData[index - 1].userName
        && this.tableData[index].departmentName !== '') {
          this.spanArr[this.position] += 1;
          this.spanArr.push(0);
        } else {
          this.spanArr.push(1);
          this.position = index;
        }
      }
    })
    this.position = 0
  }
  private addClass(row: any) {
    if (row.row.userName === '合计' ) {
      if (row.columnIndex === 1) {
        return 'tableTotalHight'
      } else {
        return 'tableTotal'
      }
    }
  }
  // 移入
  private handleMouseEnter(row: any, column: any, cell: any, event: any) {
    for (let i = 0, len = this.tableData.length; i < len; i++) {
      if (row.index === this.tableData[i].index) {
        this.cellIndex = row.index
      }
    }
  }
  //  移出
  private handleMouseLeave(row: any, column: any, cell: any, event: any) {
    this.cellIndex = -1
  }
  // 动态加载类名
  private rowClassName(row: any, rowIndex: any) {
    let r = -1;
    this.tableData.forEach((item) => {
      if (this.cellIndex === row.row.index) {
        r = rowIndex;
      }
    });
    if (rowIndex === r) {
      return 'hover-row';
    }
  }
  // render函数渲染表头
  private labelHeader(h: any, column: any, index: any) {
    if (column.column.label.length > 8) {
      const label = column.column.label.split(',')
      return h('el-popover',
        {
          props: {
            trigger: "hover",
            placement: 'bottom',
          },
        },
        [
          label.map((item: any) => {
            return h('p', {}, item)
          }),
          h('div', {style: {width: '100%'}, slot: "reference"}, column.column.label.slice(0, 8) + '...')],
      )
    } else {
      return h('div', {style: {width: '100%'}}, [column.column.label])
    }

    // if (column.column.label.length > 8) {
    //   return h('el-tooltip', {
    //     props: {
    //       content: column.column.label,
    //     },
    //   } ,
    //   [
    //     h('div', {style: {width: '100%'}}, [column.column.label.slice(0, 8) + '...']),
    //   ]);
    // } else {
    //   return h('div', {style: {width: '100%'}}, [column.column.label])
    // }
  }
  private tableAction(h: any, column: any, index: any) {
    const label = [
      '净申购量：申购量-赎回量',
      '指标占比：指标/合计指标*100%',
      '赎回占比：赎回量/合计赎回量*100%',
      '申购占比：申购量/合计申购量*100%',
      '规模占比：现规模/合计规模*100%',
      '保有率：现规模/原规模*100%',
      '完成率：现规模/指标*100%',
      '参与度：有销售数据的产品数量*所有产品数量，以分数展示，例如：4/5',
    ]
    return [column.column.label, h(
      'el-popover',
      {
        props: {
          trigger: "hover",
          placement: 'bottom',
        },
      },
      [
        label.map((item) => {
          return h('p', {}, item)
        }),
        h('span', {class: {'el-icon-question': true}, slot: "reference"}),
      ],
    ),
  ]
  }
  private async mounted() {
    this.getInfo()
  }
}
</script>
<style lang="less" scoped>
#salesSummary{
  main{
    /deep/ .el-date-editor .el-range-separator,.el-input__icon{
      height:32px
    }
    /deep/ .el-input__icon{
    line-height: 26px;
    }
    .el-table tr{
      background: none;
      .tableTotalHight{
        background: #5792FC;
        color: #ffff;
      }
      .tableTotal{
        background: #F8FAFE
      }
    }
    .el-table th div{
      white-space: wrap;
    }
    /deep/#el-popover-5776{
      background: rgba(0,0,0,0.8)
    }
  }
}

</style>