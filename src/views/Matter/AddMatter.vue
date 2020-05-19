<template>
  <main class="content">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <div class="flex flex1">
      <div class="flex1 bg" style="border-radius:8px; padding: 21px 24px; box-sizing: border-box;">
        <div class="flex">
          <div :class="[activeTab === 'basicInfo' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('basicInfo')">基本信息</div>
          <div :class="[activeTab === 'remindRulers' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('remindRulers')">提醒规则</div>
          <div :class="[activeTab === 'materialContent' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('materialContent')">材料内容</div>
          <div :class="[activeTab === 'childItems' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('childItems')">子事项</div>
          <div :class="[activeTab === 'associated' ? 'step1Item step1ItemActive' : 'step1Item']" @click="onChangeActiveStepItem('associated')">关联</div>
        </div>
        <div style="margin-top: 26px; background: #FFFCF9;border-radius: 8px;">
          <section v-show="activeTab === 'basicInfo'">
            <basic-info ref="basicInfo"></basic-info>
          </section>
          <section v-show="activeTab === 'remindRulers'">
            <remind-rulers ref="remindRulers"></remind-rulers>
          </section>
          <section v-show="activeTab === 'materialContent'">
            <material-content ref="materialContent"></material-content>
          </section>
          <section v-show="activeTab === 'childItems'">
            <child-items></child-items>
          </section>
          <section v-show="activeTab === 'associated'">
            <associated></associated>
          </section>
        </div>
        <div class="flex" style="width: 218px; margin: 28px auto;">
          <button class="btn primary_btn"  @click="save('ruleForm')" style="margin-left: 0; height: 32px;">保存</button>
          <button class="btn primary_plain_btn" style="margin-left: 80px;  height: 32px;">取消</button>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb.vue'
import BasicInfo from '@/components/matters/BasicInfo.vue'
import RemindRulers from '@/components/matters/RemindRulers.vue'
import MaterialContent from '@/components/matters/MaterialContent.vue'
import ChildItems from '@/components/matters/ChildItems.vue'
import Associated from '@/components/matters/Associated.vue'

@Component({
  components: {
    Breadcrumb,
    BasicInfo,
    RemindRulers,
    MaterialContent,
    ChildItems,
    Associated,
  },
})
export default class AddMatters extends Vue {
  private tabName: any = ['事项模板', '新增']
  private activeTab: string = 'basicInfo'
  private onChangeActiveStepItem(activeTab: any) {
    this.activeTab = activeTab
  }
  private save() {
    const basicInfo: any = this.$refs.basicInfo
    const basicInfoCon: any = basicInfo.$refs.basicInfoForm

    const remindRulers: any = this.$refs.remindRulers
    const remindRulersCon: any = remindRulers.$refs.remindRulersForm

    const materialContent: any = this.$refs.materialContent
    const materialContentCon: any = materialContent.$refs.materialContentForm
    console.log(materialContentCon)

    Promise.all([basicInfoCon, remindRulersCon, materialContentCon].map(this.getFormPromise)).then(res => {
      const validateResult = res.every(item => !!item);
      console.log('====', res)
      if (validateResult) {
        console.log('两个表单都校验通过');
        this.activeTab = 'basicInfo'
      } else {
        console.log('两个表单未校验通过');
      }
    })
  }
  private getFormPromise(form: any) {
    return new Promise(resolve => {
      form.validate((res: any) => {
        resolve(res);
      })
    })
  }
}
</script>
<style lang="less" scoped>
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
    width: 100%;
    height: 3px;
    background: #F88200;
    margin: 0 auto;
    border-radius: 4px;
  }
</style>