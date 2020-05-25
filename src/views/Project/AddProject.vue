<template>
  <main class="content col flex1">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <div class="flex flex1">
      <section class="flex1 bg"  style="border-radius:8px; padding: 21px 24px; box-sizing: border-box;">
        <section class="flex" style="">
          <div :class="[activeTab === 'step1' ? 'step activeStep' : 'step']" @click="onChangeActiveTab('step1')">Step1: 维护基本信息</div>
          <div :class="[activeTab === 'step2' ? 'step activeStep' : 'step']" @click="onChangeActiveTab('step2')">Step2: 设置相关人员</div>
          <div :class="[activeTab === 'step3' ? 'step activeStep' : 'step']" @click="onChangeActiveTab('step3')">Step3: 关联模版</div>
        </section>
        <section style="margin-top: 24px;">
          <section v-show ="activeTab === 'step1'">
            <!-- <el-tabs v-model="step1ActiveName">
              <el-tab-pane label="债券信息" name="bondInfo" lazy>
                <keep-alive>
                  <bond-info ref="bondInfoCon"></bond-info>
                </keep-alive>
              </el-tab-pane>
              <el-tab-pane label="发行人信息" name="issuerInfo">
                <keep-alive>
                  <issuer-info ref="issuerInfoCon"></issuer-info>
                </keep-alive>
              </el-tab-pane>
              <el-tab-pane label="发行信息" name="releaseInfo">发行信息</el-tab-pane>
              <el-tab-pane label="承销商及承销信息" name="underwriterInfo">承销商及承销信息</el-tab-pane>
              <el-tab-pane label="评级信息" name="gradeInfo">评级信息</el-tab-pane>
              <el-tab-pane label="担保信息" name="guaranteeInfo">担保信息</el-tab-pane>
            </el-tabs> -->
            <div class="flex">
              <div :class="[step1ActiveName === 'bondInfo' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('bondInfo')">债券信息</div>
              <div :class="[step1ActiveName === 'issuerInfo' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('issuerInfo')">发行人信息</div>
              <div :class="[step1ActiveName === 'releaseInfo' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('releaseInfo')">发行信息</div>
              <div :class="[step1ActiveName === 'underwriterInfo' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('underwriterInfo')">承销商及承销信息</div>
              <div :class="[step1ActiveName === 'gradeInfo' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('gradeInfo')">评级信息</div>
              <div :class="[step1ActiveName === 'guaranteeInfo' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('guaranteeInfo')">担保信息</div>
            </div>
            <div style="margin-top: 26px;">
              <!-- <keep-alive> -->
                <bond-info  ref="bondInfoCon" v-show="step1ActiveName === 'bondInfo'"></bond-info>
                <issuer-info ref="issuerInfoCon" v-show="step1ActiveName === 'issuerInfo'" ></issuer-info>
                <release-info ref="releaseInfoCon" v-show="step1ActiveName === 'releaseInfo'"></release-info>
                <underwriter-info ref="underwriterInfoCon" v-show="step1ActiveName === 'underwriterInfo'"></underwriter-info>
                <grade-info ref="gradeInfoCon" v-show="step1ActiveName === 'gradeInfo'"></grade-info>
                <guarantee-info ref="guaranteeInfoCon" v-show="step1ActiveName === 'guaranteeInfo'"></guarantee-info>
              <!-- </keep-alive> -->

            </div>
          </section>
          <section v-show ="activeTab === 'step2'">
            <person-setting ref="personSetting"></person-setting>
          </section>
          <section v-show ="activeTab === 'step3'">
            <div class="flex">
              <div :class="[step3ActiveName === 'publisher' ? 'step1Item step1ItemActive flex' : 'step1Item flex']"  @click="onChangeActiveStep3Item('publisher')">
                <span>发行人</span>
                <div class="numberIcon">4</div>
              </div>
              <div :class="[step3ActiveName === 'project' ? 'step1Item step1ItemActive flex' : 'step1Item flex']"  @click="onChangeActiveStep3Item('project')">
                <span>项目</span>
                <div class="numberIcon">4</div>
              </div>
            </div>
            <publisher v-show="step3ActiveName === 'publisher'"></publisher>
            <project v-show="step3ActiveName === 'project'"></project>
          </section>
        </section>
        <div class="flex" style="width: 218px; margin: 28px auto;">
          <button class="btn primary_btn"  @click="submit('ruleForm')" style="margin-left: 0; height: 32px;">保存</button>
          <button class="btn primary_plain_btn" style="margin-left: 80px;  height: 32px;">取消</button>
        </div>
      </section>
      <section class="record bg"  style="border-radius:8px;">right</section>
    </div>
   
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// step1
import Breadcrumb from '@/components/Breadcrumb.vue'
import BondInfo from '@/components/projects/step1/BondInfo.vue'
import IssuerInfo from '@/components/projects/step1/IssuerInfo.vue'
import ReleaseInfo from '@/components/projects/step1/ReleaseInfo.vue'
import UnderwriterInfo from '@/components/projects/step1/UnderwriterInfo.vue'
import GradeInfo from '@/components/projects/step1/GradeInfo.vue'
import GuaranteeInfo from '@/components/projects/step1/GuaranteeInfo.vue'
// step2
import PersonSetting from '@/components/projects/step2/PersonSetting.vue'
// step3
import Publisher from '@/components/projects/step3/Publisher.vue'
import Project from '@/components/projects/step3/Project.vue'

@Component({
  components: {
    Breadcrumb,
    BondInfo,
    IssuerInfo,
    ReleaseInfo,
    UnderwriterInfo,
    GradeInfo,
    GuaranteeInfo,
    PersonSetting,
    Publisher,
    Project,
  },
})
export default class AddProject extends Vue {
  private tabName: any = ['项目管理', '新增']
  private activeTab: any = 'step1'
  // private step1ActiveName: any = 'bondInfo'
  private step1ActiveName: any = 'bondInfo'
  private step3ActiveName: any = 'publisher'
  private onChangeActiveTab(activeTab: any) {
    if (activeTab === 'step2') {
      this.submit()
      // this.activeTab = activeTab
    } else if ( activeTab === 'step3') {
      this.submitStep2()
      // this.activeTab = 'step3'
    } else {
      this.activeTab = activeTab
    }
  }
  private onChangeActiveStepItem(activeStepName: any) {
    this.step1ActiveName = activeStepName
  }
  private onChangeActiveStep3Item(activeStepName: any) {
    this.step3ActiveName = activeStepName
  }
  private submit() {
    const bonfInfoCon: any = this.$refs.bondInfoCon
    const BondInfo1: any = bonfInfoCon.$refs.ruleForm

    const issuerInfoCon: any = this.$refs.issuerInfoCon
    const issuerInfoCon1: any = issuerInfoCon.$refs.IssuerForm

    const releaseInfoCon: any = this.$refs.releaseInfoCon
    const releaseInfoCon1: any = releaseInfoCon.$refs.RelaseForm

    const underwriterInfoCon: any = this.$refs.underwriterInfoCon
    const underwriterInfoCon1: any = underwriterInfoCon.$refs.UnderwriterForm

    const gradeInfoCon: any = this.$refs.gradeInfoCon
    const gradeInfoCon1: any = gradeInfoCon.$refs.GradeForm

    const guaranteeInfoCon: any = this.$refs.guaranteeInfoCon
    const guaranteeInfoCon1: any = guaranteeInfoCon.$refs.GuaranteeForm

    console.log(guaranteeInfoCon1)
    const arr: any = []

    Promise.all([BondInfo1, issuerInfoCon1, releaseInfoCon1, underwriterInfoCon1, gradeInfoCon1, guaranteeInfoCon1].map(this.getFormPromise)).then((res) => {
      const validateResult = res.every((item) => !!item);
      console.log('====', res)
      if (validateResult) {
        console.log('两个表单都校验通过');
        this.activeTab = 'step2'
      } else {
        console.log('两个表单未校验通过');
      }
    })
  }
  private async getFormPromise(form: any) {
    return new Promise((resolve) => {
      form.validate((res: any) => {
        resolve(res);
      })
    })
  }
  private submitStep2() {
    const personSetting: any = this.$refs.personSetting
    const personSetting1: any = personSetting.$refs.personSettingForm

    console.log(personSetting1)

    Promise.all([personSetting1].map(this.getFormPromise)).then((res) => {
      const validateResult = res.every((item) => !!item);
      // console.log('====', res)
      // let  validateResult: any = []
      // console.log(personSetting.$data.ruleForm.name.length)
      // if (personSetting.$data.ruleForm.name.length === 0) {
      //   validateResult = [false]
      // } else {
      //   validateResult = [true]
      // }
      if (validateResult) {
        console.log('两个表单都校验通过');
        this.activeTab = 'step3'
      } else {
        console.log('两个表单未校验通过');
      }
    })
  }
}
</script>
<style lang="less" scoped>
main{
  /deep/ .el-tabs__item.is-active {
    font-weight: bold;
  }
  .step{
    width:154px;
    height:32px;
    background:#EDEBE9;
    border-radius:2px;
    margin-left: 4px;
    color: #707070;
    font-size:14px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }
  .step:first-of-type{
    margin-left: 0;
  }
  .activeStep{
    background:rgba(248,130,0,1);
    color: #ffffff;
  }
  .step1Item{
    height: 30px;
    font-weight:bold;
    font-size: 14px;
    margin-right: 36px;
    cursor: pointer;
  }
  .step1ItemActive{
    color: #F88200;
    position: relative;
  }
  .step1ItemActive:after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 56px;
    height: 3px;
    background: #F88200;
    margin: 0 auto;
    border-radius: 4px;
  }
  .record{
    width:293px;
    height:100%;
    background:rgba(255,255,255,1);
    margin-left: 14px;
    padding: 0 24px;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  .numberIcon {
    width: 16px;
    height: 16px;
    background: #F88200;
    color: #ffffff;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
  }
}
</style>