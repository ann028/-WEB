<template>
  <div  style="background: #ffffff;">
    <div>
      <el-form :model="childItemForm" size="mini" :rules="childItemRules" ref="childItemForm" label-width="120px" class="demo-ruleForm" style=" ">
        <div v-for="(item, index) in childItemForm.childItemDetail" :key="index" style=" background: #FFFCF9; margin-bottom: 20px; padding: 10px 0; box-sizing: border-box; position: relative;">
          <el-form-item label="名称" :prop="'childItemDetail.'+ index +'.name'" :rules="childItemRules.name" class="mt20">
            <el-input v-model="item.name" size="mini" class="input_width"/>
          </el-form-item>
          <el-form-item label="最后期限" :prop="'childItemDetail.'+ index +'.lastTime'" :rules="childItemRules.lastTime" style="position: relative;">
            <el-input v-model="item.lastTime" class="input_width"/>
            <div style="position: absolute; top: 3px; left: 140px;">
              <el-popover
                placement="right-start"
                width="240"
                trigger="hover">
                <div>
                  <p>通过引用项目中的元素,配置目标时间</p>
                  <p>元素：</p>
                  <div class="ml20">
                    <p style="color: blue;">· T: 付息日</p>
                    <p style="color: blue;">· G: 偿保划款日(Guarantee)</p>
                    <p style="color: blue;">· N: 票面利用率调整公告日</p>
                    <p style="color: blue;">· n: 回售登记天数</p>
                    <p>· M: 月</p>
                    <p>· D: 工作日</p>
                    <p>· d: 自然日</p>
                  </div>
                  <p>例如: </p>
                  <p class="ml20">· T-2: 代表付息日前两个工作日(纯数字代表工作日天数)</p>
                  <p class="ml20">· T-2M-7d: 代表付息日前(2个月+7天)</p>
                </div>
                <img slot="reference" src="../../assets/img/project/icon-guid.png" alt="" >
              </el-popover>
            </div>
          </el-form-item>
          <el-form-item label="频率" :prop="'childItemDetail.'+ index +'.frequencyInterval'" :rules="childItemRules.frequencyInterval">
            <span style="color: #606266;">《最后期限》前</span>
            <el-input v-model="item.frequencyStart" size="mini"  style="margin: auto 10px; width: 57px;"/>
            <span style="color: #606266;">个工作日，每隔</span>
            <el-input v-model="item.frequencyInterval" size="mini" style="margin: auto 10px; width: 57px;"/>
            <span style="color: #606266;">个工作日</span>
          </el-form-item>
          <el-form-item label="事项内容" :prop="'childItemDetail.'+ index +'.content'" :rules="childItemRules.content" style="position: relative;">
            <!-- <el-input v-model="item.phone" size="mini" class="input_width"/> -->
            <!-- <div id="editor1"  style="width: 700px; margin-top: 40px;"></div> -->
            <Editor :index ="index" :userList="childItemForm.childItemDetail" @change="changeValue"></Editor>
            <div style="position: absolute; top: 35px; left: 730px;">
              <el-popover
                placement="right-start"
                width="200"
                trigger="hover">
                <div>
                  <p>通过<span style="color: red">{ }</span>引用项目中的元素，例如{债券简称}</p>
                  <p>可引用元素如下：</p>
                  <div class="ml20">
                    <p>· 债券简称</p>
                    <p>· 抵押资产跟踪评估报告最晚出具日</p>
                    <p>· 付息日</p>
                  </div>
                  
                </div>
                <!-- <el-button >hover 激活</el-button> -->
                <img src="../../assets/img/project/icon-guid.png" alt="" slot="reference">
              </el-popover>
            </div>
          </el-form-item>
          <el-form-item label="适用条件" :prop="'childItemDetail.'+ index +'.conditions'" :rules="childItemRules.conditions">
            <el-checkbox v-model="item.conditions"></el-checkbox>
          </el-form-item>
          <div v-if="item.conditions">
            <el-form-item label="地区" :prop="'childItemDetail.'+ index +'.district'" :rules="childItemRules.district" label-width="160px">
              <el-checkbox v-model="item.isShowDistrict"></el-checkbox>
              <el-select v-if="item.isShowDistrict"  v-model="item.district"  class="input_width ml20" placeholder="选择省">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易所" :prop="'childItemDetail.'+ index +'.isShowExchange'" :rules="childItemRules.isShowExchange" label-width="160px">
              <el-checkbox v-model="item.isShowExchange"></el-checkbox>
              <el-select  v-if="item.isShowExchange" v-model="item.exchange"  class="input_width ml20" placeholder="选择省">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年度" :prop="'childItemDetail.'+ index +'.annual'" :rules="childItemRules.annual" label-width="160px">
              <el-checkbox v-model="item.isShowAnnual"></el-checkbox>
              <el-select v-if="item.isShowAnnual" v-model="item.annual" class="input_width ml20" placeholder="选择省">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          
          <div class="btn primary_btn" v-if="index > 0" @click="onDeleteButton(index)" style="position: absolute; top: 24px; right: 80px; text-align: center; line-height: 24px;">删除</div>
        </div>
      </el-form>
    </div>
    <button @click="add" class="btn primary_btn">增加</button>
    <ScrollToTop></ScrollToTop>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Validation from '../../validate/validation'
import Editor from './wangEditor.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

@Component({
  components: {
    Editor,
    ScrollToTop,
  },
})
export default class BasicInfo extends Vue {
  private childItemRules = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur'}],
    lastTime: [{ required: true, message: '请输入最后期限', trigger: 'blur'}],
    frequencyStart: [{required: true, message: '请输入时间', trigger: 'blur'}],
    frequencyInterval: [{required: true, message: '请输入时间间隔', trigger: 'blur'}],
    content: [{ required: true, validator: Validation.validateEmpty, trigger: 'blur'}],
    conditions: [{required: true}],
    // district: [{ required: true, message: '请选择地区', trigger: 'change'}],
    isShowDistrict: [{required: true}],
    // exchange: [{ required: true, message: '请选择地区', trigger: 'change'}],
    isShowExchange: [{required: true}],
    // annual: [{ required: true, message: '请选择地区', trigger: 'change'}],
    isShowAnnual: [{required: true}],
  }
  private childItemForm = {
    childItemDetail: [{
        name: '',
        lastTime: '',
        frequencyStart: '',
        frequencyInterval: '',
        content: '',
        conditions: false,
        isShowDistrict: false,
        district: '',
        isShowExchange: false,
        exchange: '',
        isShowAnnual: false,
        annual: '',
    }],
  }
  private add() {
    this.childItemForm.childItemDetail.push({
      name: '',
      lastTime: '',
      frequencyStart: '',
      frequencyInterval: '',
      content: '',
      conditions: false,
      isShowDistrict: false,
      district: '',
      isShowExchange: false,
      exchange: '',
      isShowAnnual: false,
      annual: '',
    })
  }
  private onDeleteButton(index: any) {
    console.log(index)
    this.childItemForm.childItemDetail.splice(index, 1)
  }
  private changeValue(val: any, index: any) {
    console.log(val, index)
    this.childItemForm.childItemDetail[index].content = val
    const childItemValidate: any = this.$refs.childItemForm
    childItemValidate.validateField('childItemDetail.' + index + '.content')
  }
};
</script>
<style lang="less" scoped>

</style>