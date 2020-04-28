<template>
  <main class="container">
    <Step 
      :stepName = 'message'
      :imgUrl = 'imgUrl'
    ></Step>
    <section class="contentBox">
      <!-- 左 -->
      <section class="leftContent">
        <section class="main_space cross_center">
          <span class="title">待选指标</span>
          <!-- <i class="el-icon-refresh" style="color:rgba(87,146,252,1);font-size: 20px"></i> -->
        </section>
        <section class="target">
          <div>
            <el-tree
              :data="compareDimensions"
              show-checkbox
              ref="indexTreeRef"
              @check-change="handleCompareChange"
              node-key="id">
            </el-tree>
          </div>
        </section>
        <section class="main_space" style="display: flex; flex-direction: column">
          <p class="title">选择产品</p>
          <!-- <el-input placeholder="请选择产品" v-model="searchProduct" @keyup.enter.native="onSearchProduct"  style="margin-bottom: 20px">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input> -->
          <el-select
            v-model="searchProduct1"
            filterable
            remote
            multiple
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="onSearchProduct1"
            @change="onChangeProductSelect"
            :loading="loading"
            style="margin-bottom: 10px">
            <el-option
              v-for="item in products"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </section>
        <!-- <section class="range">
          <el-tree
            :data="products"
            show-checkbox
            ref="productTreeRef"
            @check-change="handleProductChange"
            node-key="id">
          </el-tree>
        </section> -->
        <section class="range">
          <el-tree
            :data="selectedProducts"
            show-checkbox
            ref="productTreeRef"
            @check-change="handleProductChange"
            node-key="id">
          </el-tree>
        </section>
        <div style="display: flex; flex-direction: row-reverse;" >
          <button class="btn btn_primary" style="height: 32px; margin-top: 10px" @click="doDeleteProducts">删除</button>
        </div>
      </section>
      <!-- 右 -->
      <section class="rightContent">
        <div style="display: flex; flex-direction: row-reverse">
          <button class="btn btn_primary" style="height: 32px" @click="doCompareProducts" v-if="permission.includes('prm8431')">执行比较</button>
        </div>
        <div class="content">
          <div v-if="selectedDimensions.includes('BASIC_DATA')">
            <section class="setting_name cross_center mt20 ">基本信息</section>
            <el-table
              :data="compareProducts"
              :header-cell-style="{background:'#F5F6FA'}"
              style="width: 100%">
              <el-table-column
                prop="prodName"
                label="产品名称"
                align="center">
              </el-table-column>
              <el-table-column
                label="产品成立日"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.setDate.split(' ')[0]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="产品类型"
                width="120"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.prodTypeCn}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="产品规模（亿）"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.enZcJZ ? (scope.row.enZcJZ/100000000).toFixed(2) : 0}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="enSz"
                label="单位净值"
                align="center">
              </el-table-column>
              <el-table-column
                prop="manager"
                label="投资经理"
                align="center">
              </el-table-column>
            </el-table>
          </div>
          <div class="flex" style="flex-wrap: wrap">
            <div style="width: 50%" v-if="selectedDimensions.includes('SCALE')">
              <section class="setting_name cross_center mt20 ">规模</section>
              <div class="chartsContent">
                <div ref="scaleProduct" class="scaleProduct" style="width: 100%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 50%" v-if="selectedDimensions.includes('SCALE_CHANGE')">
              <section class="setting_name cross_center mt20 ">规模变动</section>
              <div class="chartsContent">
                <div ref="scaleChangeProduct" class="scaleChangeProduct" style="width: 100%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 50%" v-if="selectedDimensions.includes('NET_VALUE_TREND')">
              <section class="setting_name cross_center mt20 ">净值走势</section>
              <div class="chartsContent">
                <div ref="netValueTrend" class="netValueTrend" style="width: 100%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 50%" v-if="selectedDimensions.includes('ANNUAL_RETURNS')">
              <section class="setting_name cross_center mt20 ">年度回报</section>
              <div class="chartsContent">
                <div ref="annualReturns" class="annualReturns" style="width: 100%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 50%" v-if="selectedDimensions.includes('ASSET_ALLOCATION')">
              <section class="setting_name cross_center mt20 ">资产配置</section>
              <div class="chartsContent">
                <!-- <div ref="holderStructure" class="holderStructure" style="width: 100%; height: 100%"></div> -->
                <div ref="assetAllocation" class="assetAllocation" style="width: 100%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 50%" v-if="selectedDimensions.includes('HOLDER_STRUCTURE')">
              <section class="setting_name cross_center mt20 ">持有人结构</section>
              <div class="chartsContent">
                <div ref="holderStructure" class="holderStructure" style="width: 100%; height: 100%"></div>
                <!-- <div ref="assetAllocation" class="assetAllocation" style="width: 100%; height: 100%"></div> -->
              </div>
            </div> 
         
          </div>
          <div style="width: 100%; flex-shrink: 0;" v-if="selectedDimensions.includes('HEAVILY_LOADED_STOCK')">
            <section class="setting_name cross_center mt20 ">重仓股票</section>
            <!-- <div class="chartsContent"> -->
              <!-- <div ref="annualReturns2" class="annualReturns2" style="width: 100%; height: 100%"></div> -->
              <el-table
                :data="heavilyLoadedStock"
                class="mt20"
                :header-cell-style="{background:'#F5F6FA'}">
                <el-table-column
                  v-if="oneHeader.length"
                  v-for='(item, key) of oneHeader'
                  :key="item"
                  :index="key"
                  :label="item"
                  align="center">
                    <el-table-column
                      :prop="`stockName${key+1}`"
                      label="证券名称"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      :prop="`zqdm${key+1}`"
                      label="证券代码"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      :prop="`jzb${key+1}`"
                      label="占净值比"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      :prop="`ccsz${key+1}`"
                      label="持仓市值"
                      align="center">
                    </el-table-column>
                </el-table-column>
              </el-table>
            <!-- </div> -->
          </div>
          <div style="width: 100%; flex-shrink: 0;" v-if="selectedDimensions.includes('HEAVILY_LOADED_BONDS')">
            <section class="setting_name cross_center mt20 ">重仓债券</section>
            <!-- <div class="chartsContent"> -->
              <!-- <div ref="netValueTrend1" class="netValueTrend1" style="width: 100%; height: 100%"></div> -->
              <el-table
                :data="heavilyLoadedBonds"
                class="mt20"
                :header-cell-style="{background:'#F5F6FA'}">
                <el-table-column
                  v-if="oneHeader1.length"
                  v-for='(item, key) of oneHeader1'
                  :key="item"
                  :index="key"
                  :label="item"
                  align="center">
                    <el-table-column
                      :prop="`stockName${key+1}`"
                      label="证券名称"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      :prop="`zqdm${key+1}`"
                      label="证券代码"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      :prop="`jzb${key+1}`"
                      label="占净值比"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      :prop="`ccsz${key+1}`"
                      label="持仓市值"
                      align="center">
                    </el-table-column>
                </el-table-column>
              </el-table>
            <!-- </div> -->
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { outProduct } from '@/api/index'
import * as echarts from 'echarts'

@Component({
  components: {
    Step,
  },
})
export default class ProductScreen extends Vue {
  private message: any = ['产品管理', '产品资料', '比较']
  private imgUrl: any = require('../../assets/img/head/product.png')
  private compareDimensions: any = []
  private searchProduct: any = ''
  private searchProduct1: any = []
  private selectedProducts: any[] = []
  private loading: boolean = false
  private products: any = []
  private compareProducts: any = []
  private selectedCompareDimensions: any = []
  private selectedDimensions: any = []
  private selectedProduct: any = []

  private scalesXaix: any = []
  private scalesYaix: any = []

  private scaleChangeLegend: any[] = []
  private scaleChangeXaix: any[] = []
  private scaleChangeYaix: any[] = []

  private netValueTrendLegend: any[] = []
  private netValueTrendXaix: any[] = []
  private netValueTrendYaix: any[] = []

  private annualReturnsLegend: any[] = []
  private annualReturnsXaix: any[] = []
  private annualReturnsYaix: any[] = []

  private assetAllocationLegend: any[] = []
  private assetAllocationXaix: any[] = []
  private assetAllocationYaix: any[] = []

  private holderStructureLegend: any[] = []
  private holderStructureXaix: any[] = []
  private holderStructureYaix: any[] = []

  private heavilyLoadedStock: any = []
  private heavilyLoadedBonds: any[] = []

  private oneHeader: any = []
  private oneHeader1: any = []

  private get permission() {
    return this.$store.state.permission
  }

  private created() {
    this.getCompareDimension()
  }
  private doDeleteProducts() {
    if (this.selectedProduct.length) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        for (let j = 0; j < this.selectedProduct.length; j++) {
          if ( this.selectedProducts[i].value === this.selectedProduct[j]) {
            this.selectedProducts.splice(i, 1)
          }
        }
      }
    } else {
      this.$message.warning('请选择要删除的产品')
    }
  }
  private async getCompareDimension() {
    const res: any = await outProduct.getCompareDimension()
    const compareDimensions = res.data.data
    for (const i of Object.keys(compareDimensions) ) {
      this.compareDimensions.push({
        label: compareDimensions[i],
        value: i,
      })
    }
  }
  private onSearchProduct() {
    const searchInfo = {
      param: this.searchProduct,
    }
    outProduct.findProductInfoNoPageList(searchInfo).then((res: any) => {
      const products: any = res.data.data
      this.products = products.map((item: any) => {
        return {
          label: item.code + '-' + item.prodName,
          value: item.lfundId,
        }
      })
    })
  }

  private onSearchProduct1(keyword: any) {
    this.products = []
    const searchInfo = {
      param: keyword,
    }
    outProduct.findProductInfoNoPageList(searchInfo).then((res: any) => {
      const products: any = res.data.data
      this.products = products.map((item: any) => {
        return {
          label: item.code + '-' + item.prodName,
          value: item.lfundId,
        }
      })
    })
  }
  private onChangeProductSelect(val: any) {
    if (this.selectedProducts.length < 5) {
      // this.selectedProducts.push(val[0])
      if (this.selectedProducts.length) {
        let sum = 0
        this.selectedProducts.forEach((item) => {
          if (item.value !== val[0].value) {
            sum++
          }
       })
        if (sum === this.selectedProducts.length) {
          this.selectedProducts.push(val[0])
        } else {
          this.$message.warning('当前项已存在!')
        }
      } else {
        this.selectedProducts.push(val[0])
      }
    } else {
      this.$message.warning(`最多可选5个产品`)
    }
    this.searchProduct1 = []
  }
  private handleCompareChange(data: any, checked: any) {
    const tree: any = this.$refs.indexTreeRef
    const selectNode = tree.getCheckedNodes()
    if (selectNode.length < 1) {
      this.$message.error('至少选择一个维度')
    } else {
      this.selectedCompareDimensions = selectNode.map((item: any) => item.value)
    }
  }
  private handleProductChange(data: any, checked: any) {
    const tree: any = this.$refs.productTreeRef
    const selectNode = tree.getCheckedNodes()
    // if (selectNode.length < 1) {
    //   this.$message.error('至少选择一种产品')
    // } else {
    this.selectedProduct = selectNode.map((item: any) => item.value)
    // }
  }
  private doCompareProducts() {
    if (this.selectedProducts.length && this.selectedCompareDimensions.length) {
      const productInfo = {
        compareDimension: this.selectedCompareDimensions,
        // idList: this.selectedProduct,
        idList: this.selectedProducts.map((item: any) => item.value),
      }
      outProduct.exeProductCompare(productInfo).then((res: any) => {
        this.selectedDimensions = this.selectedCompareDimensions

        this.compareProducts = res.data.data.basicData

        const scales = res.data.data.scale
        this.scalesXaix = []
        this.scalesYaix = []
        if (scales[0]) {
          this.scalesXaix = scales.map((item: any) => {
            return item.prodName
          })
          const data = []
          for (let i = 0; i < scales.length; i++) {
            data.push(scales[i].enZcJZ ? (scales[i].enZcJZ / 100000000).toFixed(2) : 0)
            // this.scalesYaix.push({
            //   name: scales[i].prodName,
            //   data: [scales[i].enZcJZ ? (scales[i].enZcJZ / 100000000).toFixed(2) : 0],
            //   type: 'bar',
            //   barWidth: '30px',
            //   itemStyle: {
            //     normal: {
            //       color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            //           offset: 0,
            //           color: "#5AD8A6", // 0% 处的颜色
            //       }, {
            //           offset: 1,
            //           color: "#BBFFE4", // 100% 处的颜色
            //       }], false),
            //     },
            //   },
            // })
          }
          for (let i = 0; i < scales.length; i++) {
            this.scalesYaix = {
              name: scales[i].prodName,
              data: data,
              type: 'bar',
              // barWidth: '30px',
            }
          }
        }
        const scaleChange = res.data.data.scaleChange
        this.scaleChangeLegend = []
        this.scaleChangeXaix = []
        this.scaleChangeYaix = []
        for (const i of Object.keys(scaleChange)) {
          this.scaleChangeLegend.push(i)
          this.scaleChangeXaix = scaleChange[i].initDates
          this.scaleChangeYaix.push({
            name: i,
            data: scaleChange[i].values,
            type: 'line',
            stack: '总量',
            // symbolSize: 0, // 标记点的大小
          })
        }

        const netValueTrend = res.data.data.netValueTrend
        this.netValueTrendLegend = []
        this.netValueTrendXaix = []
        this.netValueTrendYaix = []
        for (const i of Object.keys(netValueTrend)) {
          this.netValueTrendLegend.push(i)
          this.netValueTrendXaix = netValueTrend[i].initDates
          this.netValueTrendYaix.push({
            name: i,
            data: netValueTrend[i].values,
            type: 'line',
            stack: '总量',
            // symbolSize: 0, // 标记点的大小
          })
        }

        const annualReturns = res.data.data.annualReturns
        this.annualReturnsLegend = []
        this.annualReturnsXaix = []
        this.annualReturnsYaix = []
        for (const i of Object.keys(annualReturns)) {
          this.annualReturnsLegend.push(i)
          this.annualReturnsXaix = annualReturns[i].initDates
          this.annualReturnsYaix.push({
            name: i,
            data: annualReturns[i].values,
            type: 'bar',
          })
        }

        const holderStructure = res.data.data.holderStructure
        this.holderStructureLegend = []
        this.holderStructureXaix = []
        this.holderStructureYaix = []
        for (const i of Object.keys(holderStructure)) {
          this.holderStructureLegend.push(i)
          this.holderStructureXaix = holderStructure[i].initDates
          this.holderStructureYaix.push({
            name: i,
            data: holderStructure[i].values,
            type: 'bar',
            stack: '资产',
          })
        }

        const assetAllocation = res.data.data.assetAllocation
        this.assetAllocationLegend = []
        this.assetAllocationXaix = []
        this.assetAllocationYaix = []
        for (const i of Object.keys(assetAllocation)) {
          this.assetAllocationLegend.push(i)
          this.assetAllocationXaix = assetAllocation[i].initDates
          this.assetAllocationYaix.push({
            name: i,
            data: assetAllocation[i].values,
            type: 'bar',
            stack: '资产',
          })
        }

        // 股票
        this.oneHeader = []
        let temp = 0
        for (const key of Object.keys(res.data.data.heavilyLoadedStock)) {
          this.oneHeader.push(key)
          temp += 1
        }
        const tableData: any[] = [];
        const stockTemp = 0;
        for (const key of Object.keys(res.data.data.heavilyLoadedStock)) {
          temp += 1;
          if (res.data.data.heavilyLoadedStock[key].length > tableData.length) {
            for (let j = tableData.length; j < res.data.data.heavilyLoadedStock[key].length; j++) {
              tableData[j] = {};
            }
          }
          for (let i = 0; i < res.data.data.heavilyLoadedStock[key].length; i++) {
            const item = res.data.data.heavilyLoadedStock[key][i];
            const stockNameProp = 'stockName' + stockTemp;
            const zqdmProp = 'zqdm' + stockTemp;
            const jzbProp = 'jzb' + stockTemp;
            const ccszProp = 'ccsz' + stockTemp;
            tableData[i][stockNameProp] = item.stockName;
            tableData[i][zqdmProp] = item.zqdm;
            tableData[i][jzbProp] = item.jzb;
            tableData[i][ccszProp] = item.ccsz;
          }
        }
        this.heavilyLoadedStock = tableData

        // 债券
        this.oneHeader1 = []
        let temp1 = 0
        for (const key of Object.keys(res.data.data.heavilyLoadedBonds)) {
          this.oneHeader1.push(key)
          temp1 += 1
        }
        const tableData1: any[] = [];
        let bondsTemp = 0;
        for (const key of Object.keys(res.data.data.heavilyLoadedBonds)) {
          bondsTemp += 1;
          if (res.data.data.heavilyLoadedBonds[key].length > tableData1.length) {
            for (let j = tableData1.length; j < res.data.data.heavilyLoadedBonds[key].length; j++) {
              tableData1[j] = {};
            }
          }
          for (let i = 0; i < res.data.data.heavilyLoadedBonds[key].length; i++) {
            const item = res.data.data.heavilyLoadedBonds[key][i];
            const stockNameProp = 'stockName' + bondsTemp;
            const zqdmProp = 'zqdm' + bondsTemp;
            const jzbProp = 'jzb' + bondsTemp;
            const ccszProp = 'ccsz' + bondsTemp;
            tableData1[i][stockNameProp] = item.stockName;
            tableData1[i][zqdmProp] = item.zqdm;
            tableData1[i][jzbProp] = item.jzb;
            tableData1[i][ccszProp] = item.ccsz;
          }
        }
        this.heavilyLoadedBonds = tableData1

        if (this.scalesXaix.length) {
          this.$nextTick(() => {
            this.drawScale()
          })
        }
        if (this.scaleChangeXaix.length) {
          this.$nextTick(() => {
            this.drawScaleChange()
          })
        }
        if (this.annualReturnsXaix.length) {
          this.$nextTick(() => {
            this.drawAnnualReturns()
          })
        }
        if (this.netValueTrendXaix.length) {
          this.$nextTick(() => {
            this.drawNetValueTrend()
          })
        }
        if (this.assetAllocationXaix.length) {
          this.$nextTick(() => {
            this.drawAssetAllocation()
          })
        }
        if (this.holderStructureXaix.length) {
          this.$nextTick(() => {
            this.drawHolderStructure()
          })
        }
      })
    }
  }
   // 规模
  private drawScale() {
    // 基于准备好的dom，初始化echarts实例
    const myChart: any = echarts.init(this.$refs.scaleProduct as HTMLCanvasElement)
    // 绘制图表
    myChart.setOption({
      // legend: {
      //   type: 'plain',
      //   data: this.scalesXaix,
      // },
      tooltip: {
        trigger: 'axis',
        formatter: `资产净值</br>{b} : {c}亿元`,
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        data: this.scalesXaix,
        axisLabel: {
          interval: 0,
        },
      },
      yAxis: {
        name: '资产净值(亿元)',
        type: 'value',
      },
      series: this.scalesYaix,
      color: ['#5792FC', '#5AD8A6', '#FFD159', '#EB7E65', '#83D0EF', '#9B87FF'],
    })
    window.addEventListener("resize", () => {
      myChart.resize()
    });
  }
  // 规模变动
  private drawScaleChange() {
    const myChart: any = echarts.init(this.$refs.scaleChangeProduct as HTMLCanvasElement)
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: this.scaleChangeLegend,
        top: 20,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.scaleChangeXaix,
      },
      yAxis: {
        type: 'value',
      },
      series: this.scaleChangeYaix,
      color: ['#5792FC', '#5AD8A6', '#FFD159', '#EB7E65', '#83D0EF', '#9B87FF'],
    })
    window.addEventListener("resize", () => {
      myChart.resize()
    });
  }
  // 净值走势
  private drawNetValueTrend() {
    const myChart: any = echarts.init(this.$refs.netValueTrend as HTMLCanvasElement)
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: this.netValueTrendLegend,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.netValueTrendXaix,
      },
      yAxis: {
        type: 'value',
      },
      series: this.netValueTrendYaix,
      color: ['#5792FC', '#5AD8A6'],
    })
    window.addEventListener("resize", () => {
      myChart.resize()
    });
  }
  // 年度回报
  private drawAnnualReturns() {
    const myChart: any = echarts.init(this.$refs.annualReturns as HTMLCanvasElement)
    myChart.setOption({
      legend: {
        type: 'plain',
        data: this.annualReturnsLegend,
        top: 20,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: (params: any) => {
          if (!params) {return false };
          let str = params[0].axisValue;
          for (const i of Object.keys(params)) {
            str =
              str +
              '</br>' +
              params[i].seriesName +
              '：' +
              parseFloat(params[i].value).toFixed(2) +
              '%';
          }
          return str;
        },
      },
      xAxis: {
        data: this.annualReturnsXaix,
      },
      yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (value: any) => {
              return value + '%'
            },
          },
      },
      series: this.annualReturnsYaix,
      color: ['#5792FC', '#5AD8A6', '#FFD159', '#EB7E65', '#83D0EF', '#9B87FF'],
    })
    // setTimeout(() => {
    //   window.onresize = () => {
    //     myChart.resize();
    //   }
    // }, 200)
    window.addEventListener("resize", () => {
      myChart.resize()
    });
  }
  // 资产配置
  private drawAssetAllocation() {
    const myChart: any = echarts.init(this.$refs.assetAllocation as HTMLCanvasElement)
    myChart.setOption({
      // legend: {
      //   type: 'plain',
      //   top: 20,
      // },
      legend: {
        type: 'plain',
        data: this.assetAllocationLegend,
        // data: [],
        top: 20,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
        },
        // formatter: (params: any) => {
          // if (!params) {return false };
          // let str = params[0].axisValue;
          // for (const i of Object.keys(params)) {
          //   str =
          //     str +
          //     '</br>' +
          //     params[i].seriesName +
          //     '：' +
          //     parseFloat(params[i].value).toFixed(2) +
          //     '%';
          // }
          // return str;
        // },
      },
      grid: {
        bottom: 80,
        // x: 40,
        // x2: 100,
        // y2: 80,
      },
      xAxis: {
        type: 'category',
        data: this.assetAllocationXaix,
        axisLabel: {
          interval: 0,
          // rotate: 40,
          // formatter:function(value: any, index: any)
          // {
          //   if (index % 2 != 0) {
          //     return '\n\n' + value;
          //   }
          //   else {
          //     return value;
          //   }
          // }
        },
      },
      yAxis: {
        type: 'value',
        // axisLabel: {
        //   formatter: (value: any) => {
        //     return value.toFixed(2) + '%'
        //   },
        // },
      },
      series: this.assetAllocationYaix,
      color: ['#5792FC', '#5AD8A6', '#FFD159', '#EB7E65', '#83D0EF', '#9B87FF'],
    })
    window.addEventListener("resize", () => {
      myChart.resize()
    });
  }
  // 持有人结构
  private drawHolderStructure() {
    const myChart: any = echarts.init(this.$refs.holderStructure as HTMLCanvasElement)
    myChart.setOption({
      legend: {
        data: this.holderStructureLegend,
        top: 20,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: (params: any) => {
          if (!params) {return false };
          let str = params[0].axisValue;
          for (const i of Object.keys(params)) {
            str =
              str +
              '</br>' +
              params[i].seriesName +
              '：' +
              parseFloat(params[i].value).toFixed(2) +
              '%';
          }
          return str;
        },
      },
      grid: {
        bottom: 80,
      },
      xAxis: {
        type: 'category',
        data: this.holderStructureXaix,
        axisLabel: {
          interval: 0,
          // rotate: 40,
          // formatter:function(value: any, index: any)
          // {
          //   if (index % 2 != 0) {
          //     return '\n\n' + value;
          //   }
          //   else {
          //     return value;
          //   }
          // }
        },
      },
      yAxis: {
        type: 'value',
        // axisLabel: {
        //   formatter: (value: any) => {
        //     return value.toFixed(2) + '%'
        //   },
        // },
      },
      series: this.holderStructureYaix,
      color: ['#5792FC', '#5AD8A6', '#FFD159', '#EB7E65', '#83D0EF', '#9B87FF'],
    })
    window.addEventListener("resize", () => {
      myChart.resize()
    });
  }
}
</script>
<style lang="less" scoped>
main{
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
        height: 300px;
        background: #F5F6FA;
        overflow-y: scroll;
        padding: 20px 0;
        .el-tree {
          background-color: transparent;
        }
      }
      .range{
        height: 300px;
        background: #F5F6FA;
        overflow-y: scroll;
        .el-tree {
          background-color: transparent;
        }
      }
    }
    .rightContent{
      // flex-grow: 1;
      // flex-shrink: 0;
      // margin-left: 20px;
      width: calc(100% - 240px);
      padding: 0 20px;
      box-sizing: border-box;
      .content{
        .setting_name{
          font-size:16px;
          color:rgba(49,50,51,1);
          margin-bottom: 20px;
          &::before{
            content: '';
            margin-right: 12px;
            width:4px;
            height:24px;
            background:rgba(114,159,236,1);
            border-radius:100px;
          }
        }
        .chartsContent{
          width: 96%;
          height: 400px;
          // height: 20%;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
          border-radius:8px;
        }
      }
    }
  }
}
</style>