<template>
  <main  class="container" style="padding: 0">
    <Step :stepName = 'message' 
      :imgUrl = 'imgUrl'
      :isExportpdf = 'isExportpdf'
      :isView = 'isView' style="margin:20px 20px 0 20px;">
    </Step>
    <section id="pdfDom"  style="padding: 0 10px 0 0; box-sizing: border-box">
    <!-- 标题 -->
    <section class="flex main_space cross_center paddingStyle title" style="">
      <section class="titleName">{{productBaseInfo.prodName}}——{{productBaseInfo.code}}</section>
      <section class="flex">
        <section>
          <section class="titlePosition">
            <p style="font-size: 20px">单位净值</p>
            <p style="font-size: 18px">{{productBaseInfo.enSz ? productBaseInfo.enSz : '-'}}</p>
          </section>
        </section>
        <span style="margin: auto 20px;font-size: 20px">|</span>
        <section class="titlePosition">
          <p style="font-size: 20px">净值日期</p>
          <p style="font-size: 18px">{{productBaseInfo.initDate ? productBaseInfo.initDate : '-'}}</p>
        </section>
      </section>
    </section>
    <!-- 基本信息 -->
    <section class="paddingStyle">
      <section class="setting_name cross_center mt20">基本信息</section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">成立日期</span>
          <span class="txtContent txtStyle">{{productBaseInfo.setDate ? productBaseInfo.setDate.split(' ')[0] : '-'}}</span>
        </section>
        <section class="flex text">
          <span class="txtTitle">产品规模</span>
          <!-- <span class="txtContent">{{productBaseInfo.enZcJZ ? productBaseInfo.enZcJZ + '(元)' : '-'}}</span> -->
          <span class="txtContent">{{thousandDivision(productBaseInfo.enZcJZ)}}</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">到期日</span>
          <span class="txtContent txtStyle">{{productBaseInfo.endDate ? productBaseInfo.endDate.split(' ')[0] : '-'}}</span>
        </section>
        <section class="flex text">
          <span class="txtTitle">投资经理</span>
          <span class="txtContent">{{productBaseInfo.manager ? productBaseInfo.manager : '-'}}</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">存续期</span>
          <span class="txtContent txtStyle">{{productBaseInfo.timeLimit ? productBaseInfo.timeLimit : '-'}}</span>
        </section>
        <section class="flex text">
          <span class="txtTitle">托管人</span>
          <span class="txtContent" style="width: auto">{{productBaseInfo.trusteeShip ? productBaseInfo.trusteeShip : '-'}}</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">成立规模</span>
          <span class="txtContent txtStyle">{{thousandDivision(productBaseInfo.initShare)}}</span>
          <!-- <span class="txtContent txtStyle">{{productBaseInfo.initShare ? productBaseInfo.initShare + '(元)' : '-'}}</span> -->
        </section>
        <section class="flex text">
          <span class="txtTitle">单位净值</span>
          <span class="txtContent">{{productBaseInfo.enSz ? productBaseInfo.enSz : '-'}}</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">累计单位净值</span>
          <span class="txtContent txtStyle">{{productBaseInfo.enTotalNav ? productBaseInfo.enTotalNav : '-'}}</span>
        </section>
        <section class="flex text">
          <span class="txtTitle">份额</span>
          <span class="txtContent">{{productBaseInfo.lsl ? productBaseInfo.lsl : '-'}}</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">资产净值</span>
          <span class="txtContent txtStyle">{{productBaseInfo.enZcJZ ? productBaseInfo.enZcJZ : '-'}}</span>
        </section>
      </section>
    </section>
    <!-- 投资目标 -->
    <section class="paddingStyle text">
      <section class="setting_name cross_center mt20 ">投资范围</section>
      <p class="txtContent" style="width: auto;margin:0 12px;">
        {{productBaseInfo.investScope}}
      </p>
    </section>
    <!-- 购买信息 -->
    <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">购买信息</section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">起购金额</span>
          <!-- <span class="txtContent txtStyle">{{productBaseInfo.miniNvest ? productBaseInfo.miniNvest : '-'}}</span> -->
          <span class="txtContent txtStyle">{{thousandDivision(productBaseInfo.miniNvest)}}</span>
        </section>
        <section class="flex text">
          <span class="txtTitle">托管费率</span>
          <span class="txtContent">{{productBaseInfo.trstRatio ? productBaseInfo.trstRatio + '%' : '-'}}</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle">管理费率</span>
          <span class="txtContent txtStyle">{{productBaseInfo.mgmtRatio ? productBaseInfo.mgmtRatio + '%' : '-'}}</span>
        </section>
        <section class="flex text">
          <span class="txtTitle">开放日说明</span>
          <span class="txtContent" style="width: auto">{{productBaseInfo.openTime ? productBaseInfo.openTime : '-'}}</span>
        </section>
      </section>
    </section>
    <!-- 业绩表现 -->
    <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">业绩表现</section>
      <div class="chartsBox" >
        <div class="chartsContent">
          <div ref="achievement" class="achievement" style="width: 100%; height: 100%;"></div>
        </div>
        <!-- <el-table
          :data="achievementData"
          style="width: 100%"
          class="mt20"
          :header-cell-style="{background:'#F5F6FA'}">
          <el-table-column
            label="YTD"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.ytd + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="3月"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.threeMonth + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="6月"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.sixMonth + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="1年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.oneYear + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="2年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.twoYear + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="3年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.threeYear + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="thisDay"
            label="成立以来回报"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.thisDay + '%'}}</span>
            </template>
          </el-table-column>
        </el-table> -->
      </div>
    </section>
    <!-- 申赎信息 -->
    <!-- <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">申赎信息</section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle1">申购状态</span>
          <span class="txtContent txtStyle1">xxx</span>
        </section>
        <section class="flex text">
          <span class="txtTitle1">赎回状态</span>
          <span class="txtContent">集合-小集合-混合型</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle1">最低申购金额</span>
          <span class="txtContent txtStyle1">xxx</span>
        </section>
        <section class="flex text">
          <span class="txtTitle1">申购费率</span>
          <span class="txtContent">xxx</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle1">赎回费率</span>
          <span class="txtContent txtStyle1">xxx</span>
        </section>
        <section class="flex text">
          <span class="txtTitle1">管理费率</span>
          <span class="txtContent">xxx</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex text">
          <span class="txtTitle1">托管费率</span>
          <span class="txtContent txtStyle1">xxx</span>
        </section>
        <section class="flex text">
          <span class="txtTitle1">销售服务费率</span>
          <span class="txtContent">xxx</span>
        </section>
      </section>
    </section> -->
    <!-- 年度回报 -->
    <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">年度回报</section>
      <div class="chartsBox" >
        <div class="chartsContent">
          <div ref="annualReturns" class="annualReturns" style="width: 100%; height: 100%"></div>
        </div>
        <!-- <el-table
          :data="annualReturnsData"
          style="width: 100%"
          class="mt20"
          :header-cell-style="{background:'#F5F6FA'}">
          <el-table-column
            label="1年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.year1 + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="2年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.year2 + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="3年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.year3 + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="4年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.year4 + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="5年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.year5 + '%'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="6年"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.year6 + '%'}}</span>
            </template>
          </el-table-column>
        </el-table> -->
      </div>
    </section>
    <!-- 历史规模变化 -->
    <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">历史规模变化</section>
       <div  class="chartsBox">
        <div class="chartsContent">
          <div ref="historyScale" class="historyScale" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </section>
    <!-- 资产配置 -->
    <section style="display: flex">
      <section style="width: 50%">
        <section class="paddingStyle" >
          <section class="setting_name cross_center mt20 ">资产配置</section>
          <div class="chartsBox" >
            <div class="chartsContent" style="display: flex">
              <div ref="assetAllocation" class="assetAllocation" style="width:100%; height: 100%"></div>
              <!-- <div style="width:50%; height: 100%">
                <table>
                  <thead>
                    <th>名称</th>
                    <th>占总值比</th>
                    <th>较上期</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
            </div>
          </div>
        </section>
      </section>
      <!-- <section style="width: 50%">
        <section class="paddingStyle">
          <section class="setting_name cross_center mt20 ">重仓债券</section>
            <el-table
              :data="bondData"
              class="mt20"
              :header-cell-style="{background:'#F5F6FA'}">
              <el-table-column
                prop="date"
                label="日期"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                align="center">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                align="center">
              </el-table-column>
            </el-table>
        </section>
      </section> -->
    </section>
    <!-- 持有债券及持有股票信息 -->
    <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">持有债券及持有股票信息</section>
      <div class="flex main_space" style="width: 98%">
        <section style="width: 40%">
          <span style="color:rgba(49,50,51,1);">重仓债券</span>
            <el-table
              :data="bondData"
              class="mt20"
              :header-cell-style="{background:'#F5F6FA'}">
              <el-table-column
                prop="stockName"
                label="证券名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="zqdm"
                label="证券代码"
                align="center">
              </el-table-column>
              <el-table-column
                prop="jzb"
                label="占净值比"
                align="center">
              </el-table-column>
              <!-- <el-table-column
                prop="zf"
                label="近三个月涨幅"
                align="center">
              </el-table-column> -->
              <!-- <el-table-column
                label="类型"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.type === 'GP'? '股票' : '债券'}}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="ccsz"
                label="持仓市值"
                align="center">
              </el-table-column>
            </el-table>
        </section>
        <section  style="width: 40%">
           <span style="color:rgba(49,50,51,1);">重仓股票</span>
           <el-table
              :data="shareData"
              class="mt20"
              :header-cell-style="{background:'#F5F6FA'}">
              <el-table-column
                prop="stockName"
                label="证券名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="zqdm"
                label="证券代码"
                align="center">
              </el-table-column>
              <el-table-column
                prop="jzb"
                label="占净值比"
                align="center">
              </el-table-column>
              <!-- <el-table-column
                prop="zf"
                label="近三个月涨幅"
                align="center">
              </el-table-column> -->
              <!-- <el-table-column
                label="类型"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.type === 'GP'? '股票' : '债券'}}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="ccsz"
                label="持仓市值"
                align="center">
              </el-table-column>
            </el-table>
        </section>
       </div>
    </section> 
    <!-- 历年资产配置 -->
    <section class="paddingStyle" style="margin-bottom: 20px">
      <section class="setting_name cross_center mt20 ">历年资产配置</section>
      <div class="chartsBox" >
        <div class="chartsContent" >
          <div ref="historyAssets" class="historyAssets" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </section>
    </section>
  </main>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as echarts from 'echarts'
import Step from '@/components/Step.vue'
import { productData } from '@/api/index';
@Component({
  components: {
    Step,
  },
})
export default class FundDetail extends Vue {
  private message: any = ['产品管理', '产品资料', '列表', '详情']
  private imgUrl: any = require('../../assets/img/head/product.png')
  private isExportpdf: boolean = true // 导出pdf
  private isView: boolean = false // 返回
  private productBaseInfo: any = {} // 产品基本信息
  private achievementData: any[] = [] // 业绩表现表格数据
  private annualReturnsData: any[] = [] // 年度回报表格数据
  private bondData: any[] = [] // 重仓债券表格数据
  private shareData: any[] = [] // 重仓股票表格数据
  private achievement: any = {
    legendData: [ '系列1'],
    seriesData: [
      {
        name: '系列1',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  }
  // 查询产品信息
  private async getProductList(id: any) {
    const res: any = await productData.getProductInfo(`id=${id}`)
    if (res.data.success) {
      this.productBaseInfo = res.data.data
      this.achievementData = this.productBaseInfo.performanceTableVo ? [this.productBaseInfo.performanceTableVo] : []
      this.annualReturnsData =
      this.productBaseInfo.yearPerformanceTableVo ? [this.productBaseInfo.yearPerformanceTableVo] : []
      // this.bondData = this.productBaseInfo.heavilyBondsVoList ? [this.productBaseInfo.heavilyBondsVoList] : []
      const data = this.productBaseInfo.heavilyBondsVoList ? this.productBaseInfo.heavilyBondsVoList : []
      if (data.length > 0) {
        for (let i = 0, len = data.length; i < len; i++) {
          if (data[i].type === 'GP') {
            this.shareData.push(data[i])
          } else if (data[i].type === 'ZQ') {
            this.bondData.push(data[i])
          }
        }
      } else {
        this.bondData = []
        this.shareData = []
      }
      this.drawAchievement() // 业绩表现
      this.drawAnnualreturns() // 年度回报
      this.drawHistoryscale()  // 历史规模变化
      this.drawAssetallocation()  // 资产配置
      this.drawHistoryassets() // 历史资产配置
    }
  }
  // 业绩表现
  private drawAchievement() {
    const charts: any = echarts.init(this.$refs.achievement as HTMLCanvasElement)
    charts.setOption({
      legend: {
        data: [`${this.productBaseInfo.prodName}`],
        // right: 20,
        top: 15,
      },
      // grid: {
      //   top: 30,
      // },
      tooltip: {
        trigger: 'axis',
        // backgroundColor: 'rgba(255,255,255,0.6)',
        // borderColor: '#333333',
        // padding: 10,
        // textStyle: {
        //   color: '#333333',
        // },
        formatter: `{a}</br>{b}:{c}%`,
      },
      xAxis: {
        // name: '成立日期~净值日期',
        name: '',
        nameLocation: 'middle',
        nameGap: 35,
        boundaryGap: ['20%', '20%'],
        // data: [],
        data: this.productBaseInfo.performanceVo ? this.productBaseInfo.performanceVo.initDates : [],
      },
      yAxis: {
        // name: '每日的[成立以来回报]',
        name: '',
        nameLocation: 'middle',
        nameGap: 35,
        type: 'value',
        axisLabel: {
          formatter: (value: any) => {
            return value + '%'
          },
        },
      },
      series: [
        {
          name: `${this.productBaseInfo.prodName}`,
          // data: [],
          data: this.productBaseInfo.performanceVo ? this.productBaseInfo.performanceVo.values : [],
          type: 'line',
          symbolSize: 0, // 标记点的大小
        },
      ],
      color: ['#5792FC', '#5AD8A6'],
    })
  }
  // 年度回报
  private drawAnnualreturns() {
    const annualcharts: any = echarts.init(this.$refs.annualReturns as HTMLCanvasElement)
    annualcharts.setOption({
      legend: {
        type: 'plain',
        // data: ['测试1', '测试2'],
        data: [],
        top: 20,
      },
      tooltip: {
        trigger: 'axis',
        formatter: `{a}</br>{b} : {c}%`,
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: this.productBaseInfo.yearPerformanceVo ? this.productBaseInfo.yearPerformanceVo.initDates : [],
      },
      yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (value: any) => {
              return value + '%'
            },
          },
      },
      series: [
        {
          name: `${this.productBaseInfo.prodName}`,
          // data: [120, 200, 150, 80, 70, 110, 130],
          data: this.productBaseInfo.yearPerformanceVo ? this.productBaseInfo.yearPerformanceVo.values : [],
          type: 'bar',
          itemStyle: {
            normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: "#5792FC", // 0% 处的颜色
                  }, {
                      offset: 1,
                      color: "#C0D4FF", // 100% 处的颜色
                  }], false),
              },
          },
        },
        // {
        //   name: '系列2',
        //   data: [10, 20, 15, 180, 170, 10, 30],
        //   type: 'bar',
        //   itemStyle: {
        //     normal: {
        //           color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        //               offset: 0,
        //               color: "#5AD8A6", // 0% 处的颜色
        //           }, {
        //               offset: 1,
        //               color: "#BBFFE4", // 100% 处的颜色
        //           }], false),
        //       },
        //   },
        // },
      ],
    })
  }
  // 历史规模变化
  private drawHistoryscale() {
    const historycharts: any = echarts.init(this.$refs.historyScale as HTMLCanvasElement)
    historycharts.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        data: this.productBaseInfo.historyScaleVo ? this.productBaseInfo.historyScaleVo.initDates : [],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: any) => {
            return (value / 100000000).toFixed(1) + '亿'
          },
        },
      },
      series: [
        {
          type: 'bar',
          data: this.productBaseInfo.historyScaleVo ? this.productBaseInfo.historyScaleVo.values : [],
          barWidth: 30,
          itemStyle: {
            normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: "#5792FC", // 0% 处的颜色
                  }, {
                      offset: 1,
                      color: "#C0D4FF", // 100% 处的颜色
                  }], false),
              },
          },
        },
      ],
    })
  }
  // 资产配置
  private drawAssetallocation() {
    const assetcharts: any = echarts.init(this.$refs.assetAllocation as HTMLCanvasElement)
    assetcharts.setOption({
      legend: {
        orient: 'vertical',
        top: `25%`,
        left: `60%`,
        itemGap: 20,
        data: ['股票', '债券', '基金', '权证', '现金', '其他资产'],
      },
      tooltip: {
        trigger: 'item',
        formatter: `{b} : {c}({d}%)`,
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius : '55%',
          center: ['30%', '50%'],
          data: [
            {
              name: '股票',
              value: this.productBaseInfo.assetAllocationVo ? this.productBaseInfo.assetAllocationVo.gp : 0,
            },
            {
              name: '债券',
              value: this.productBaseInfo.assetAllocationVo ? this.productBaseInfo.assetAllocationVo.zq : 0,
              },
            {
              name: '基金',
              value: this.productBaseInfo.assetAllocationVo ? this.productBaseInfo.assetAllocationVo.jj : 0,
            },
            {
              name: '权证',
              value: this.productBaseInfo.assetAllocationVo ? this.productBaseInfo.assetAllocationVo.qz : 0,
            },
            {
              name: '现金',
              value: this.productBaseInfo.assetAllocationVo ? this.productBaseInfo.assetAllocationVo.xj : 0,
            },
            {
              name: '其他资产',
              value: this.productBaseInfo.assetAllocationVo ? this.productBaseInfo.assetAllocationVo.qt : 0,
            },
          ],
          label: {
            position: 'inside',
          },
          labelLine: {
            show: false,
          },
          minShowLabelAngle: true,
        },
      ],
      // minShowLabelsAngle: 0,
      color: ['#5792FC', '#5AD8A6', '#FFD159', '#EB7E65', '#83D0EF', '#9B87FF'],
    })
  }
  // 历史资产配置
  private drawHistoryassets() {
    const historyAssetsCharts: any = echarts.init(this.$refs.historyAssets as HTMLCanvasElement)
    historyAssetsCharts.setOption({
      legend: {
        type: 'plain',
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
        type: 'category',
        // data: ["2017Q1", "2017Q2", "2017Q3", "2017Q4", "2018Q1", "2018Q2", "2018Q3", "2018Q4", "2019Q1", "2019Q2"],
        data: this.productBaseInfo.historyAssetAllocationVo ? this.productBaseInfo.historyAssetAllocationVo.dates : [],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: any) => {
            return value.toFixed(2) + '%'
          },
        },
      },
      series: [
        {
          name: '股票',
          barWidth: 30,
          type: 'bar',
          // data: ["0", "0", "0", "0", "30240242.48", "543000", "2466200", "0", "0", "0"],
          data: this.productBaseInfo.historyAssetAllocationVo ? this.productBaseInfo.historyAssetAllocationVo.gps : [],
          stack: '证券',
        },
        {
          name: '债券',
          type: 'bar',
          // data: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
          data: this.productBaseInfo.historyAssetAllocationVo ? this.productBaseInfo.historyAssetAllocationVo.zqs : [],
          stack: '证券',
        },
        {
          name: '基金',
          type: 'bar',
          // data: ["40190624.07", "42410743.11", "42764355.02", "44175344.23", "200.01", "0", "0", "0", "0", "0"],
          data: this.productBaseInfo.historyAssetAllocationVo ? this.productBaseInfo.historyAssetAllocationVo.jjs : [],
          stack: '证券',
        },
        {
          name: '权证',
          type: 'bar',
          // data: ["40190624.07", "42410743.11", "42764355.02", "44175344.23", "200.01", "0", "0", "0", "0", "0"],
          data: this.productBaseInfo.historyAssetAllocationVo ? this.productBaseInfo.historyAssetAllocationVo.qzs : [],
          stack: '证券',
        },
        {
          name: '现金',
          type: 'bar',
          //  data: ["40190624.07", "42410743.11", "42764355.02", "44175344.23", "200.01", "0", "0", "0", "0", "0"],
          data: this.productBaseInfo.historyAssetAllocationVo ? this.productBaseInfo.historyAssetAllocationVo.xjs : [],
          stack: '证券',
        },
        {
          name: '其他资产',
          type: 'bar',
          // data: ["40190624.07", "42410743.11", "42764355.02", "44175344.23", "200.01", "0", "0", "0", "0", "0"],
          data: this.productBaseInfo.historyAssetAllocationVo ? this.productBaseInfo.historyAssetAllocationVo.qts : [],
          stack: '证券' ,
        },
      ],
      color: ['#5792FC', '#5AD8A6', '#FFD159', '#EB7E65', '#83D0EF', '#9B87FF'],
    })

  }
  // 千分位划分
  private thousandDivision(val: any) {
    if (!val) {
      return '-'
    } else {
      let num1 = val.toFixed(2) + ''
      let result = ''
      if (num1.split('.')[0]) {
        for ( let i = 0; i < Math.floor(num1.length - ( 1 + i)) / 3; i++) {
          num1 = num1.substring(0, num1.length - ( 4 * i + 3)) + ',' + num1.substring( num1.length - ( 4 * i + 3))
        }
        // result = num1.substring(1)
        if (num1[0] === ',') {
          num1 = num1.substr(1, num1.length - 1)
        }
        if (num1[0] === '-' && num1[1] === ',') {
          num1 = '-' + num1.substr(2, num1.length - 1)
        }
        result = num1.split('.')[0].substr(0, num1.split('.')[0].length - 1) + '.' + num1.split('.')[1]
      }
      return  result
      // for ( let i = 0; i < Math.floor(num1.length - ( 1 + i)) / 3; i++) {
      //   num1 = num1.substring(0, num1.length - ( 4 * i + 3)) + ',' + num1.substring( num1.length - ( 4 * i + 3))
      // }
      // if (num1[0] === ',') {
      //   num1 = num1.substr(1, num1.length - 1)
      // }
      // return num1
    }
  }
  private mounted() {
    this.$store.dispatch('changeM', {head: false, aside: false})
    this.getProductList(this.$route.query.id)
    // this.drawAchievement() // 业绩表现
    // this.drawAnnualreturns() // 年度回报
    // this.drawHistoryscale()  // 历史规模变化
    // this.drawAssetallocation()  // 资产配置
    // this.drawHistoryassets() // 历史资产配置
    const charts: any = echarts.init(this.$refs.achievement as HTMLCanvasElement)
    const annualcharts: any = echarts.init(this.$refs.annualReturns as HTMLCanvasElement)
    const historycharts: any = echarts.init(this.$refs.historyScale as HTMLCanvasElement)
    const assetcharts: any = echarts.init(this.$refs.assetAllocation as HTMLCanvasElement)
    const historyAssetsCharts: any = echarts.init(this.$refs.historyAssets as HTMLCanvasElement)
    window.onresize = () => {
      charts.resize()
      annualcharts.resize()
      historycharts.resize()
      assetcharts.resize()
      historyAssetsCharts.resize()
    }
  }
}
</script>
<style lang="less" scoped>
main{
    width: 100%;
    height: 100%;
    padding: 0 40px !important;
  box-sizing: border-box;
  .paddingStyle{
    padding: 0 20px ;
    box-sizing: border-box;
  }
  .title{
    color:#ffffff;
    background-image: url('../../assets/img/head/productDetail.png');
    background-size: cover;
    .titleName{
      font-size: 22px;
      font-weight: 600;
    }
    .titlePosition{
      text-align: center;
    }
  }
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
  .text{
    font-size:16px;
    line-height: 30px;
    .txtTitle{
      color:rgba(49,50,51,1);
      margin:0 10px 0 12px;
      width: 100px;
      text-align:right;
    }
    .txtTitle1{
      color:rgba(49,50,51,1);
      margin:0 10px 0 12px;
      width: 100px;
      text-align:right;
    }
    .txtContent{
      width: 200px;
      color:rgba(96,98,102,1);
    }
    .txtStyle{
      margin-right: 200px;
    }
    .txtStyle1{
      margin-right: 170px;
    }
  }
  .chartsBox{
    padding: 0 0 0 12px;
    box-sizing: border-box;
    .chartsContent{
      width: 98%;
      height: 440px;
      // height: 20%;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
      border-radius:8px;
    }
  }
}
</style>
<!--投资经理信息表  -->
    <!-- <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">投资经理信息表</section>
      <el-table
        :data="tableData"
        style="box-sizing:border-box"
        class="mt20"
        :header-cell-style="{background:'#F5F6FA'}">
        <el-table-column
          prop="date"
          label="基金经理"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="任职日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="离职日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="任职总回报"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="任职年化回报"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="同类排名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="任职年化回报"
          align="center">
        </el-table-column>
      </el-table>
    </section> -->
    <!-- 行业配置 -->
    <!-- <section class="paddingStyle">
      <section class="setting_name cross_center mt20 ">行业配置</section>
      <el-table
        :data="tableData"
        style="width: 100%;"
        class="mt20"
        :header-cell-style="{background:'#F5F6FA'}">
        <el-table-column
          prop="date"
          label="行业名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="占净值比"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="较上期"
          align="center">
        </el-table-column>
      </el-table>
    </section> -->