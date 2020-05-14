<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="right" label-width="200px" class="demo-ruleForm" >
      <section class="flex" style="margin-top: 20px;">
        <el-form-item label="债券简称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="债券全称" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex"  style="position: relative;">
        <el-form-item label="债券代码" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <div style="margin-left: 5px; position: absolute;  left: 364px; top: 10px;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">双市场企业债用英文逗号隔开，<br/>先交易所后银行间</div>
              <img src="../../../assets/img/project/icon-help-circle.png" alt="" style="width: 20px; height: 20px;">
            </el-tooltip>
        </div>
        <el-form-item label="债券类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="利率类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市场所" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="是否跨市场" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市日期" prop="region">
          <el-select v-model="ruleForm.region" style="width: 30px; margin-right: 5px;">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
          <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width: 130px;"></el-date-picker> -->
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债券受托管理人/债权代理人" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="票面金额" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="票面利率（%）" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="余额（亿元）" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本金偿还方式" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="付息方式" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付息频率" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="期限（年）" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特殊期限（年）" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="起息日期" prop="region" class="tag">
          <!-- <el-date-picker v-model="ruleForm.region" type="date" placeholder="选择日期" style="width: 167px;"></el-date-picker> -->
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兑付日期" prop="name">
          <!-- <el-date-picker v-model="ruleForm.region" type="date" placeholder="选择日期" style="width: 167px;"></el-date-picker> -->
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="选择权" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行权期" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="票面利率调整公告日" prop="region" label-width="200px" class="tag">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回售登记天数" prop="name" class="tag">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="偿保划款日" prop="region" class="tag">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <div  class="cross_center" style="margin-left: 5px; height: 40px;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">T-x</div>
              <img src="../../../assets/img/project/icon-guid.png" alt="" style="width: 16px; height: 16px;">
            </el-tooltip>
        </div>
        <el-form-item label="偿保划款日(兑付年)" prop="name" class="tag">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="抵押资产跟踪评估报告最晚出具日" prop="region" class="tag">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <div class="cross_center" style="margin-left: 5px; height: 80px;">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">T+x或基准日+x</div>
              <img src="../../../assets/img/project/icon-guid.png" alt="" style="width: 16px; height: 16px;">
            </el-tooltip>
        </div>
      </section>
      <section class="flex">
        <el-form-item label="票面利率调整上限（%）" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="票面利率调整下限（%）" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="内含特殊条款" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特殊条款类别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="批文额度" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="初始换股价格（元）" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="初始换股比例（%）" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转股标的股票代码" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="换股期间" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <!-- <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" :rows="5"  placeholder="请输入内容" v-model="ruleForm.desc"></el-input>
        </el-form-item> -->
        <el-form-item label="回售条款" prop="desc">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.desc" style="width: 223px;"></el-input>
        </el-form-item>
        <el-form-item label="赎回条款" prop="desc" label-width="144px">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.desc" style="width: 223px;"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="可交换股票条款" prop="desc">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.desc" style="width: 223px;"></el-input>
        </el-form-item>
        <el-form-item label="减记条款" prop="desc" label-width="144px">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.desc" style="width: 223px;"></el-input>
        </el-form-item>
      </section>
    </el-form>
    <scroll-to-top></scroll-to-top>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import ScrollToTop from '@/components/ScrollToTop.vue'
@Component({
  components: {
    ScrollToTop,
  },
})
export default class BondInfo extends Vue {
  private ruleForm: any = {
    name: '',
    region: '',
    desc: '',
  }
  private rules: any = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' },
    ],
    desc: [
      { required: true, message: '请输入文本', trigger: 'blur'},
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