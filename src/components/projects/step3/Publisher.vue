<template>
  <main>
    <el-table
      :data="publisherData"
      style="width: 100%"
      class="mt20"
      ref="multipleTable"
      :header-cell-style="{background:'#FFF9F3'}">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="简称代码">
      </el-table-column>
      <el-table-column
        prop="address"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="所需材料">
      </el-table-column>
      <!-- type="selection" -->
       <!-- :render-header= "renderHeaderTable" -->
      <el-table-column
        label-class-name="DisabledSelection"
        align="center"
        width="100">
        <template slot="header" slot-scope="scope">
          <el-checkbox v-model="checkedAll" @change="doCheckedAll">关联</el-checkbox>
          <el-popover
            placement="right"
            width="100"
            trigger="hover">
            <div>
              <p>根据以下的适用条件，自动关联模板</p>
              <p>·地区:{{name}}</p>
              <p>·交易所：{{name}}</p>
            </div>
            <img src="../../../assets/img/project/icon-help-circle.png" alt="" class="icon_micro" slot="reference" style="position: absolute;top:0">
          </el-popover>
        </template>
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
@Component({
  components: {

  },
})
export default class PublisherItem extends Vue {
  private name: any = '江苏'
  private checkedAll: boolean = false
  private publisherData: any = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      checked: true,
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      checked: false,
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      checked: true,
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      checked: true,
    },
  ]
  private doCheckedAll() {
    this.checkedAll = this.checkedAll
    for (const i of this.publisherData) {
      i.checked = this.checkedAll
    }
  }
  @Watch('publisherData', {deep: true})
    private table(val: any, oldVal: any) {
    const arr = val.filter((item: any) => item.checked === true)
    if (arr.length === this.publisherData.length) {
      this.checkedAll = true
    } else {
      this.checkedAll = false
    }
  }
  private renderHeaderTable(h: any, column: any) {
    console.log(h, column)
    const label = [
      '根据以下的适用条件，自动关联模板',
      `·地区：${this.name}`,
      `·交易所：${this.name}`,
    ]
    // return [
    //   h('span', {}, '关联')
    // ]
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
          h('span', {class: 'el-icon-question', style: "color: #f88200; font-size: 20px;", slot: "reference"}),
        ],
      ),
    ]
  }
}
</script>
<style lang="less" scoped>
/deep/.el-table__body tr:hover>td {
  background-color: #FFF9F3 !important;
}
.el-table /deep/.DisabledSelection{
  position: relative;
}
//  .el-table /deep/.DisabledSelection .cell .el-checkbox__inner{
//     margin-left: -30px;
//     position:relative;
//   }
//   .el-table /deep/.DisabledSelection .cell:before{
//     content: "关联";
//     position: absolute;
//     right: 27px;
//   }
</style>