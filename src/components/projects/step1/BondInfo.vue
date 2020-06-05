<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="right" label-width="200px" class="demo-ruleForm" >
      <section class="flex" style="margin-top: 20px;">
        <el-form-item label="债券简称" prop="shortname">
          <el-input v-model="ruleForm.shortname" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="债券全称" prop="name">
          <el-input v-model="ruleForm.name" maxlength="120"></el-input>
        </el-form-item>
      </section>
      <section class="flex"  style="position: relative;">
        <el-form-item label="债券代码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="30"></el-input>
        </el-form-item>
        <div style="margin-left: 5px; position: absolute;  left: 364px; top: 10px;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">双市场企业债用英文逗号隔开，<br/>先交易所后银行间</div>
              <img src="../../../assets/img/project/icon-help-circle.png" alt="" style="width: 20px; height: 20px;">
            </el-tooltip>
        </div>
        <el-form-item label="债券类型" prop="deptType">
          <el-select v-model="ruleForm.deptType" placeholder="请选择债券类型">
            <el-option v-for="item in deptType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="利率类型" prop="rateType">
          <el-select v-model="ruleForm.rateType" placeholder="请选择利率类型">
            <el-option v-for="item in rateType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市场所" prop="listedPlace">
          <el-select v-model="ruleForm.listedPlace" placeholder="请选择上市场所">
            <el-option v-for="item in listedPlace" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="是否跨市场" prop="crossMarket">
          <el-select v-model="ruleForm.crossMarket" placeholder="请选择是否跨市场">
            <el-option label="YN01-是" value="YN01-是"></el-option>
            <el-option label="YN02-否" value="YN02-否"></el-option>
            <el-option label="0000-信息缺失" value="0000-信息缺失"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市日期" prop="dropListedDate">
          <el-select v-model="ruleForm.dropListedDate" style="width: 30px; margin-right: 5px;">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
          <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width: 130px;"></el-date-picker> -->
          <el-date-picker
            v-if="ruleForm.dropListedDate === '1'"
            v-model="ruleForm.listedDate"
            type="year"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="search_width">
          </el-date-picker>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债券受托管理人/债权代理人" prop="bondManager">
          <el-input v-model="ruleForm.bondManager" maxlength="100"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="票面金额" prop="currentPeriodAmount">
          <el-input-number v-model="ruleForm.currentPeriodAmount" :precision="2" :step="0.1" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label="票面利率（%）" prop="rate">
          <el-input-number v-model="ruleForm.rate" :precision="2" :step="0.1" :controls="false"></el-input-number>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="余额（亿元）" prop="balance">
          <el-input-number v-model="ruleForm.balance" :precision="2" :step="0.1" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label="本金偿还方式" prop="repayMode">
          <el-select v-model="ruleForm.repayMode" placeholder="请选择本金偿还方式">
            <el-option
              v-for="item in repayMode"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="付息方式" prop="interestPayMode">
          <el-select v-model="ruleForm.interestPayMode" placeholder="请选择付息方式">
            <el-option
              v-for="item in interestPayMode"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付息频率" prop="payFrequency">
          <el-select v-model="ruleForm.payFrequency" placeholder="请选择付息频率">
            <el-option label="年付" value="1"></el-option>
            <el-option label="季付" value="0"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="期限（年）" prop="timeLimit">
          <el-input-number v-model="ruleForm.timeLimit" :controls="false" min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="特殊期限（年）" prop="specialTimeLimit">
          <el-input-number v-model="ruleForm.specialTimeLimit" :controls="false" min="1"></el-input-number>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="起息日期" prop="valueDate" class="tag">
          <el-date-picker v-model="ruleForm.valueDate" type="date" placeholder="选择日期" style="width: 167px;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="兑付日期" prop="payDay">
          <el-date-picker v-model="ruleForm.payDay" type="date" placeholder="选择日期" style="width: 167px;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="选择权" prop="optionType">
          <el-select v-model="ruleForm.optionType" placeholder="请选择选择权">
            <el-option  v-for="item in optionType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行权期" prop="exerciseSchedule">
          <el-input v-model="ruleForm.exerciseSchedule" maxlength="100"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="票面利率调整公告日" prop="rateAdjudtDate" label-width="200px" class="tag">
          <el-date-picker v-model="ruleForm.rateAdjudtDate" type="date" placeholder="选择日期" style="width: 167px;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="回售登记天数" prop="backSaleDay" class="tag">
          <el-input-number v-model="ruleForm.backSaleDay" :controls="false" min="1"></el-input-number>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="偿保划款日" prop="transferDay" class="tag">
          <el-date-picker v-model="ruleForm.transferDay" type="date" placeholder="选择日期" style="width: 167px;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <div  class="cross_center" style="margin-left: 5px; height: 40px;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">T-x</div>
              <img src="../../../assets/img/project/icon-guid.png" alt="" style="width: 16px; height: 16px;">
            </el-tooltip>
        </div>
        <el-form-item label="偿保划款日(兑付年)" prop="transferDayByYear" class="tag">
          <el-input v-model="ruleForm.transferDayByYear" maxlength="30"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="抵押资产跟踪评估报告最晚出具日" prop="reportLatestDay" class="tag">
          <el-date-picker v-model="ruleForm.reportLatestDay" type="date" placeholder="选择日期" style="width: 167px;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <div class="cross_center" style="margin-left: 5px; height: 80px;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">T+x或基准日+x</div>
              <img src="../../../assets/img/project/icon-guid.png" alt="" style="width: 16px; height: 16px;">
            </el-tooltip>
        </div>
      </section>
      <section class="flex">
        <el-form-item label="票面利率调整上限（%）" prop="rateHigh">
          <el-input-number v-model="ruleForm.rateHigh" :controls="false" min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="票面利率调整下限（%）" prop="rateLow">
          <el-input-number v-model="ruleForm.rateLow" :controls="false" min="1"></el-input-number>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="内含特殊条款" prop="specialTerm">
          <el-input v-model="ruleForm.specialTerm" maxlength="300"></el-input>
        </el-form-item>
        <el-form-item label="特殊条款类别" prop="specailTermType">
          <el-select v-model="ruleForm.specailTermType" placeholder="请选择特殊条款类别">
            <el-option v-for="item in specailTermType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="批文额度" prop="documentAmount">
          <el-input v-model="ruleForm.documentAmount" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="初始换股价格（元）" prop="stockExchangePrice">
          <el-input-number v-model="ruleForm.stockExchangePrice" :precision="2" :step="0.1" :controls="false"></el-input-number>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="初始换股比例（%）" prop="stockExchangeRatio">
          <el-input-number v-model="ruleForm.stockExchangeRatio" :precision="2" :step="0.1" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label="转股标的股票代码" prop="stockExchangeCode">
          <el-input v-model="ruleForm.stockExchangeCode" maxlength="30"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="换股期间" prop="stockExchangeEnd">
          <el-date-picker v-model="ruleForm.stockExchangeBegin" type="year" value-format="yyyy-MM-dd" placeholder="选择日期" class="search_width"></el-date-picker>
          <span>至</span>
          <el-date-picker v-model="ruleForm.stockExchangeEnd" type="year" value-format="yyyy-MM-dd" placeholder="选择日期" class="search_width"></el-date-picker>
        </el-form-item>
      </section>
      <section class="flex">
        <!-- <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" :rows="5"  placeholder="请输入内容" v-model="ruleForm.desc"></el-input>
        </el-form-item> -->
        <el-form-item label="回售条款" prop="backSaleTerm">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.backSaleTerm" style="width: 223px;" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="赎回条款" prop="ransomTerm" label-width="144px">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.ransomTerm" style="width: 223px;" maxlength="30"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="可交换股票条款" prop="exchangeStockTerm">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.exchangeStockTerm" style="width: 223px;" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="减记条款" prop="writeDownTerm" label-width="144px">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.writeDownTerm" style="width: 223px;" maxlength="30"></el-input>
        </el-form-item>
      </section>
    </el-form>
    <scroll-to-top></scroll-to-top>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import ScrollToTop from '@/components/ScrollToTop.vue'
import * as Factory from '@/factory/index'
@Component({
  components: {
    ScrollToTop,
  },
})
export default class BondInfo extends Vue {
  private right: any = ''
  private deptType: any[] = Factory.search_deptType()
  private rateType: any[] = Factory.search_rateType()
  private listedPlace: any[] = Factory.search_listedPlace()
  private repayMode: any[] = Factory.repayMode()
  private interestPayMode: any[] = Factory.interestPayMode()
  private optionType: any[] = Factory.optionType()
  private specailTermType: any[] = Factory.specailTermType()
  private ruleForm: any = {
    shortname: '',
    name: '',
    code: '',
    deptType: '',
    rateType: '',
    listedPlace: '',
    crossMarket: '',
    dropListedDate: '1',
    listedDate: '',
    bondManager: '',
    currentPeriodAmount: undefined,
    rate: undefined,
    balance: undefined,
    repayMode: '',
    interestPayMode: '',
    payFrequency: '',
    timeLimit: undefined,
    specialTimeLimit: undefined,
    valueDate: '',
    payDay: '',
    optionType: '',
    exerciseSchedule: '',
    rateAdjudtDate: '',
    backSaleDay: undefined,
    transferDay: '',
    transferDayByYear: '',
    reportLatestDay: '',
    rateHigh: undefined,
    rateLow: undefined,
    specialTerm: '',
    specailTermType: '',
    documentAmount: '',
    stockExchangePrice: undefined,
    stockExchangeRatio: undefined,
    stockExchangeCode: '',
    stockExchangeBegin: '',
    stockExchangeEnd: '',
    backSaleTerm: '',
    ransomTerm: '',
    exchangeStockTerm: '',
    writeDownTerm: '',
  }
  private rules: any = {
    shortname: [
      {required: true, message: '请输入债券简称', trigger: 'blur'},
    ],
    name: [
      { required: true, message: '请输入债券全称', trigger: 'blur' },
    ],
    code: [
      { required: true, message: '请输入债券代码', trigger: 'blur' },
    ],
    deptType: [
      { required: true, message: '请选择债券类型', trigger: 'change'},
    ],
    rateType: [
      { required: true, message: '请选择利率类型', trigger: 'change'},
    ],
    listedPlace: [
      { required: true, message: '请选择上市场所', trigger: 'change'},
    ],
    crossMarket: [
      { required: true, message: '请选择是否跨市场', trigger: 'change'},
    ],
    listedDate: [
      { required: true, message: '请选择上市日期', trigger: 'change'},
    ],
    bondManager: [
      { required: true, message: '请输入债券受托管理人', trigger: 'blur' },
    ],
    currentPeriodAmount: [
      { required: true, message: '请输入票面金额', trigger: 'blur' },
    ],
    rate: [
      { required: true, message: '请输入票面利率', trigger: 'blur' },
    ],
    balance: [
      { required: true, message: '请输入余额', trigger: 'blur' },
    ],
    repayMode: [
      { required: true, message: '请选择本金偿还方式', trigger: 'change' },
    ],
    interestPayMode: [
      { required: true, message: '请选择付息方式', trigger: 'change' },
    ],
    payFrequency: [
      { required: true, message: '请选择付息频率', trigger: 'change' },
    ],
    timeLimit: [
      { required: true, message: '请输入期限', trigger: 'blur' },
    ],
    specialTimeLimit: [
      { required: true, message: '请输入特殊期限', trigger: 'blur' },
    ],
    valueDate: [
      { required: true, message: '请选择起息日期', trigger: 'change' },
    ],
    payDay: [
      { required: true, message: '请选择兑付日期', trigger: 'change' },
    ],
    optionType: [
      { required: true, message: '请选择选择权', trigger: 'change' },
    ],
    exerciseSchedule: [
      { required: true, message: '请输入行权期', trigger: 'blur' },
    ],
    rateAdjudtDate: [
      { required: true, message: '请选择票面利率调整公告日', trigger: 'change' },
    ],
    backSaleDay: [
      { required: true, message: '请输入回售登记天数', trigger: 'blur' },
    ],
    transferDay: [
      { required: true, message: '请选择偿保划款日', trigger: 'change' },
    ],
    transferDayByYear: [
      { required: true, message: '请输入偿保划款日(兑付年)', trigger: 'change' },
    ],
    reportLatestDay: [
      { required: true, message: '请选择抵押资产跟踪评估报告最晚出具日', trigger: 'change' },
    ],
    rateHigh: [
      { required: true, message: '请输入票面利率调整上限', trigger: 'blur' },
    ],
    rateLow: [
      { required: true, message: '请输入票面利率调整下限', trigger: 'blur' },
    ],
    specialTerm: [
      { required: true, message: '请输入内含特殊条款', trigger: 'blur' },
    ],
    specailTermType: [
      { required: true, message: '请选择特殊条款类别', trigger: 'change' },
    ],
    documentAmount: [
      { required: true, message: '请输入批文额度', trigger: 'blur' },
    ],
    stockExchangePrice: [
      { required: true, message: '请输入初始换股价格', trigger: 'blur' },
    ],
    stockExchangeRatio: [
      { required: true, message: '请输入初始换股比例', trigger: 'blur' },
    ],
    stockExchangeCode: [
      { required: true, message: '请输入转股标的股票代码', trigger: 'blur' },
    ],
    stockExchangeBegin: [
      { required: true, message: '请选择换股起始日期', trigger: 'change' },
    ],
    stockExchangeEnd: [
      { required: true, message: '请选择换股结束日期', trigger: 'change' },
    ],
    backSaleTerm: [
      { required: true, message: '请输入回售条款', trigger: 'blur' },
    ],
    ransomTerm: [
      { required: true, message: '请输入赎回条款', trigger: 'blur' },
    ],
    exchangeStockTerm: [
      { required: true, message: '请输入可交换股票条款', trigger: 'blur' },
    ],
    writeDownTerm: [
      { required: true, message: '请输入减记条款', trigger: 'blur' },
    ],
  }
}

</script>
<style lang="less" scoped>
main{
  .el-form-item__label {
    color: #F88200 !important;
  }
}
</style>