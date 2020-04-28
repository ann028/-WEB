<template>
  <main class="container">
    <Step :stepName = 'message'  :imgUrl = 'imgUrl'></Step>
    <section class="contentBox">
      <!-- 左 -->
      <section class="leftContent">
        <section class="main_space cross_center">
          <span class="title">待选指标</span>
          <!-- <i class="el-icon-refresh" style="color:rgba(87,146,252,1);font-size: 20px"></i> -->
        </section>
        <section class="target">
          <el-tree
            :data="indexTree"
            :props="defaultProps"
            show-checkbox
            accordion
            ref="indexTreeRef"
            node-key="id"
            @check-change="handleIndexChange"
            class="index_tree"
          >
            <span class="title_node" slot-scope="{ node }">
              <span :title="node.label">{{node.label}}</span>
            </span>
          </el-tree>
        </section>
        <section class="main_space cross_center margin30">
          <span class="title">待选范围</span>
          <!-- <i class="el-icon-refresh" style="color:rgba(87,146,252,1);font-size: 20px"></i> -->
        </section>
        <section class="range">
          <el-tree
            :data="scopeTree"
            :props="defaultProps"
            show-checkbox
            check-strictly
            ref="rangeTreeRef"
            node-key="id"
            accordion
            @check-change="handleRangeChange"
            class="index_tree"
          >
            <span  class="title_node" slot-scope="{ node }">
                <span :title="node.label">{{node.label}}</span>
            </span>
          </el-tree>
        </section>
      </section>
      <!-- 中 -->
      <section class="centerContent">
        <section class="topset">
          <span class="title">条件列表</span>
          <button @click="deleteCondition" class="btn btn_primary">删除</button>
        </section>
        <section class="conditionTop">
          <el-table
            :data="tableData"
            :header-cell-style="{background:'#F5F6FA'}"
            ref="conditionTable"
            style="width: 100%"
            height='300'>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="55"
              align="center">
            </el-table-column>
            <el-table-column
              prop="nameCn"
              label="指标"
              align="center">
            </el-table-column>
            <el-table-column
              prop="paramDisplay"
              label="参数"
              align="center">
              <template v-if="scope.row.param" slot-scope="scope">
                <el-input v-model="scope.row.paramDisplay" placeholder="请输入内容" @focus="selectParam(scope.row)">{{scope.row.paramDisplay}}</el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="运算符"
              prop="operator"
              align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.operatorValue" placeholder="请选择" class="isRow">
                  <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              label="数值"
              align="center">
              <template v-if="scope.row.operatorValue !== '不限' " slot-scope="scope">
                <el-input v-model="scope.row.value" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              align="center">
            </el-table-column>
          </el-table>
        </section>
        <!-- <section class="flex" style="margin: 20px 0 10px 0">
          <span style="display: inline-block; width: 100px;line-height: 30px;">条件表达式</span>
          <el-input v-model="expression" placeholder=""></el-input>
        </section> -->
        <section class="main_space" style="margin: 35px 0 0 0">
          <span class="title"></span>
          <section class="flex">
            <button v-if="permission.includes('prm8421')" @click="conditionSelect" class="btn btn_primary" style="width: 106px; height: 32px;display: flex;align-items: center;justify-content: center">
              <img src="../../assets/img/product/screen.png" alt="" style="line-height: 32px;">
              执行筛选
            </button>
            <button v-if="permission.includes('prm8422')" @click="exportExcel" class="btn btn_warning" style="width: 135px; height: 32px;display: flex;align-items: center;justify-content: center; margin-left: 20px;">
              <img src="../../assets/img/product/exportExcel.png" alt="">
              导出筛选结果</button>
          </section>
        </section>
        <section class="conditionBottom">
          <span class="title">筛选结果</span>
          <el-table
            :data="selectTableData"
            :header-cell-style="{background:'#F5F6FA'}"
            style="width: 100%;"
            height="250"
            ref="dataTable"
            @sort-change="changeSort">
            <el-table-column
              type="index"
              label="序号"
              width="55"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="code"
              label="证券代码"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="prodName"
              label="证券简称"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              v-for="(col,index) in tableHead"
              :key="index"
              :label="col"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.dynamicData[col]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <div class="main_space pageJsonBox">
          <section>
            <span class="word">共<span style="color:#5792FC">{{pageJson.total}}</span>条</span>
          </section>
          <section>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageJson.currentPage"
              :page-size="pageJson.pageSize"
              layout="prev, pager, next, jumper"
              :total="pageJson.total">
            </el-pagination>
          </section>
        </div>
      </section>
    </section>
    <!-- 弹框 -->
    <Paramdialog
      class="modal"
      v-if="paramVisible"
      @hide='hideModal'
      @save='saveInfo'
      :rowInfo='rowInfo'
    >
    </Paramdialog>
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import Paramdialog from './Paramdialog.vue'
import { productData } from '@/api/index';
@Component({
  components: {
    Step,
    Paramdialog,
  },
})
export default class ProductScreen extends Vue {
  private message: any = ['产品管理', '产品资料', '筛选']
  private imgUrl: any = require('../../assets/img/head/product.png')
  private expression: any = ''
  private tableData: any[] = [
  ] // 条件列表
  private selectTableData: any[] = []
  private paramVisible: boolean = false
  private rowInfo: any = {}
  private indexTree: any[] = []
  private options = ['不限', '=', '>', '>=', '<', '<=', '!=', '包含', '不包含']
  private screeningScope: any[] = []
  private tableHead = []
  private scopeTree = [
    {
      nameCn: '集合',
      productType: 'A',
      id: 1,
      childNodes: [
        {
          nameCn: '大集合',
          productType1: 'B',
          fatherProductType: 'A',
          id: 5,
          childNodes: [
            {nameCn: '股票类', productType2: 'A', id: 7, fatherProductType1: 'B', fatherProductType: 'A'},
            {nameCn: '固定收益类', productType2: 'B', id: 8, fatherProductType1: 'B', fatherProductType: 'A'},
            {nameCn: '货币类', productType2: 'C', id: 9, fatherProductType1: 'B', fatherProductType: 'A'},
            {nameCn: '混合类', productType2: 'D', id: 10, fatherProductType1: 'B', fatherProductType: 'A'},
            {nameCn: '商品及金融衍生品类', productType2: 'E', id: 11, fatherProductType1: 'B', fatherProductType: 'A'},
          ],
        },
        {
          nameCn: '小集合',
          productType1: 'A',
          fatherProductType: 'A',
          id: 6,
          childNodes: [
            {nameCn: '股票类' , productType2: 'A', id: 12, fatherProductType1: 'A', fatherProductType: 'A'},
            {nameCn: '固定收益类', productType2: 'B', id: 13, fatherProductType1: 'A', fatherProductType: 'A'},
            {nameCn: '货币类', productType2: 'C', id: 14, fatherProductType1: 'A', fatherProductType: 'A'},
            {nameCn: '混合类', productType2: 'D', id: 15, fatherProductType1: 'A', fatherProductType: 'A'},
            {nameCn: '商品及金融衍生品类', productType2: 'E', id: 16, fatherProductType1: 'A', fatherProductType: 'A'},
          ],
        },
      ],
    },
    {
      nameCn: '定向主动',
      productType: 'B',
      id: 2,
    },
    {
      nameCn: '定向通道',
      productType: 'C',
      id: 3,
    },
    {
      nameCn: '专项',
      productType: 'D',
      id: 4,
    },
  ]
  private pageJson: any = {
    total: 0,
    pageSize: 10,
    currentPage: 1,
  }
  private get permission() {
    return this.$store.state.permission
  }
  // 修改当前页码
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
    this.conditionSelect()
  }
  private handleIndexChange(data: any, checked: boolean) {
    const tree: any = this.$refs.indexTreeRef;
    const selectNode = tree.getCheckedNodes();
    if (selectNode.length > 10) {
      this.$message.error('最多添加10个指标')
    } else {
      const idMap = this.tableData.map((id: any) => id.id);
      const selectId = selectNode.map((id: any) => id.id);
      this.tableData = this.tableData.filter((ele: any) => {
        return selectId.indexOf(ele.id) > -1
      })
      selectNode.forEach((item: any) => {
        if (!item.childNodes.length) {
          if (idMap.indexOf(item.id) < 0) {
            if (item.param) {
              let paramCopy;
              let paramDisplay;
              if (item.param === '_DATE_CONTROL_START|_DATE_CONTROL_END') {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                const day = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate();
                paramCopy = `${year - 1}-${month}-${day},${year}-${month}-${day}`
                this.tableData.push({
                  ...item,
                  paramValue: paramCopy,
                  paramDisplay: '最近一年',
                  operatorValue: '不限',
                })
              } else if (item.param === 'LATEST_TRADING_DAY|_DATE_CONTROL') {
                this.tableData.push({
                  ...item,
                  paramValue: 'LATEST_TRADING_DAY',
                  paramDisplay: '最新收盘日',
                  operatorValue: '不限',
                })
              } else if (item.param === 'THIS_YEAR|_TEXT_CONTROL') {
                const year = new Date().getFullYear();
                this.tableData.push({
                  ...item,
                  paramValue: year,
                  paramDisplay: year,
                  operatorValue: '不限',
                })
              } else {
                this.tableData.push({
                  ...item,
                  operatorValue: '不限',
                })
              }
            } else {
              this.tableData.push({
                ...item,
                operatorValue: '不限',
              })
            }
          }
        }
      });
    }
  }
  private handleRangeChange(data: any, checked: boolean) {
    const tree: any = this.$refs.rangeTreeRef;
    const selectNode = tree.getCheckedNodes();
    console.log(selectNode)
    this.screeningScope = []
    selectNode.forEach((item: any) => {
      if (item.productType) {
        this.screeningScope.push({
          productType: item.productType,
          productType1: '',
          productType2: '',
        })
      } else if (item.productType1) {
        this.screeningScope.push({
          productType: item.fatherProductType,
          productType1: item.productType1,
          productType2: '',
        })
      } else {
        this.screeningScope.push({
          productType: item.fatherProductType,
          productType1: item.fatherProductType1,
          productType2: item.productType2,
        })
      }
    });
  }
  private handleSelectionChange(val: any) {
    console.log(val)
  }
  private deleteCondition() {
    const table: any = this.$refs.conditionTable;
    const selectId = table.selection.map((item: any) => item.id);
    if (!selectId.length) {
      this.$message.warning(`请至少选择一项`)
    } else {
      this.tableData = this.tableData.filter((item: any) => {
        return selectId.indexOf(item.id) < 0
      })
      const tree: any = this.$refs.indexTreeRef;
      tree.setCheckedNodes(this.tableData)
    }
  }
  private exportExcel() {
    let flag = true;
    if (this.tableData.length) {
      for (let i = 0; i < this.tableData.length; i++) {
        if ((this.tableData[i].param && !this.tableData[i].paramValue) || (this.tableData[i].operatorValue !== '不限' && !this.tableData[i].value)) {
          this.$message.error('请填写完整表格数据');
          flag = false;
          return
        }
      }
    }
    if (flag) {
      productData.exportSelectList({
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        screeningScope: this.screeningScope,
        selectVoList: this.tableData,
      }).then((res: any) => {
        const blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = '筛选结果.xls'; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      })
    }
  }
  private conditionSelect() {
    let flag = true;
    if (this.tableData.length) {
      for (let i = 0; i < this.tableData.length; i++) {
        if ((this.tableData[i].param && !this.tableData[i].paramValue)  || (this.tableData[i].operatorValue !== '不限' && !this.tableData[i].value)) {
          this.$message.error('请填写完整表格数据');
          flag = false;
          return
        }
      }
    }
    if (flag) {
      productData.selectProductList({
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        screeningScope: this.screeningScope,
        selectVoList: this.tableData,
      }).then((res: any) => {
        if (res.data.success) {
          if (!res.data.data.records.length) {
            this.tableHead = []
          } else {
            this.selectTableData = res.data.data.records.map((item: any, index: number, arr: any) => {
              if (item.extCols && item.extCols.length) {
                this.tableHead = arr[0].extCols;
                item.dynamicData = {};
                item.extCols.forEach((ret: any, index: number) => {
                  item.dynamicData[ret] = item.extColValues[index]
                })
                return item;
              } else {
                return item
              }
            });
            const table: any = this.$refs.dataTable;
            setTimeout(() => {
                table.doLayout()
            }, 1200)
            console.log(this.selectTableData)
            this.pageJson.total = res.data.data.total
          }
        }
      })
    }
  }
  private selectParam(value: any) {
    console.log('11111111111', value)
    this.rowInfo = value
    this.paramVisible = true
  }
  private defaultProps = {
    children: 'childNodes',
    label: 'nameCn',
  }
  private async created() {
    productData.getOKProdIndexs().then((res: any) => {
      this.indexTree = res.data.data.childNodes
    })
  }
  private hideModal(arr: any) {
    this.paramVisible = false
  }
  private saveInfo(val: any) {
    this.tableData.forEach((item: any, index: number) => {
      if (item.id === val.id) {
        this.$set(this.tableData, index, {
          ...item,
          paramValue : val.paramValue,
          paramDisplay: val.paramDisplay,
        })
      }
    })
    console.log(this.tableData)
    this.paramVisible = false;
  }
  // 排序
  private changeSort(val: any) {
    console.log(val)
  }
}
</script>
<style lang="less" scoped>
/deep/ .isRow .el-input__icon{
  line-height: 32px;
}
main{
  width: 100%;
  max-height: 100%;
  .contentBox{
    display: flex;
    // flex-grow: 1;
    width: 100%;
    height: 100%;
    .leftContent{
      width: 240px;
      flex-shrink: 0;
      .title{
        display: inline-block;
        margin:20px 0  10px 0;
      }
      .target{
        height: 40%;
        background: #F5F6FA;
        overflow-y: scroll;
        .index_tree {
          background-color: #F5F6FA;
          .title_node {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .margin30 {
        margin-top: 30px;
      }
      .range{
        height: 40%;
        background: #F5F6FA;
        overflow-y: scroll;
        .index_tree {
          background-color: #F5F6FA;
        }
        .title_node {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .centerContent{
      flex-grow: 1;
      margin-left: 20px;
      .topset {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        align-items: center;
        button {
          height: 32px;
        }
      }
      .title{
        display: inline-block;
        margin:10px 0  10px 0;
      }
      .conditionTop{
        height: 40%;
        // overflow-y: scroll;
      }
      .conditionBottom{
        height: 40%;
        // overflow-y: scroll;
      }
    }
  }
}
</style>