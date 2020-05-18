<template>
  <div>
    <el-form :model="remindRulersForm" :rules="remindRules" ref="remindRulersForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="触发方式" prop="way" class="mt20">
        <div>
          <section>
            <el-radio v-model="remindRulersForm.way" label="1">固定时间</el-radio>
            <el-radio v-model="remindRulersForm.way" label="2">引用时间</el-radio>
          </section>
          <el-form-item  prop="timeList" v-if="remindRulersForm.way === '1'" >
            <div>
              <!-- <section v-if="remindRulersForm.way === '1'" > -->
                <section  class="cross_center" v-for="(item, index) in remindRulersForm.timeList" :key="index">
                  <section>
                    <span style="margin-right: 11px; color: #606266;">提醒期间</span>
                    <el-date-picker v-model="item.remindTime" type="date" placeholder="选择日期" class="input_width"></el-date-picker>
                  </section>
                  <section>
                    <span style="margin: 0 11px 0 32px; color: #606266;">最后期限</span>
                    <el-date-picker v-model="item.endTime" type="date" placeholder="选择日期" class="input_width"></el-date-picker>
                  </section>
                  <div style="width: 24px; height: 24px; background: #F88200; color: #ffffff; font-size: 20px; text-align: center; line-height: 24px; margin-left: 14px; cursor: pointer;">+</div>
                </section>
              <!-- </section> -->
              
            </div>
          </el-form-item>
         <el-form-item  prop="quote" v-if="remindRulersForm.way === '2'" >
            <section  v-if="remindRulersForm.way === '2'" >
              <section class="flex">
                <span style="margin-right: 11px; color: #606266;">提醒期间</span>
                <el-date-picker v-model="remindRulersForm.quote" type="date" placeholder="选择日期" class="input_width"></el-date-picker>
                <el-popover
                  placement="top-start"
                  width="240"
                  trigger="hover"
                  class="cross_center">
                  <div>
                    <p style="font-weight: bold;">通过引用项目中的时间，配置目标时间</p>
                    <section>
                      <p>元素：</p>
                      <section style="margin-left: 20px;">
                        <p>·T: 付息日</p>
                        <p>·M: 月</p>
                        <p>·D: 工作日</p>
                        <p>·d: 自然日</p>
                      </section>
                    </section>
                    <section>
                      <p>例如：</p>
                      <section style="margin-left: 20px;">
                        <p>·T-2，代表付息日前2个工作日（纯数字也代表工作日天数）</p>
                        <p>·T-2M-7d,代表付息日前（2个月+7天）</p>
                      </section>
                    </section>
                  </div>
                  <img slot="reference" src="../../assets/img/project/icon-guid.png" alt="" style="margin-left: 10px;">
                </el-popover>
                <!-- <div  >
                <img src="../../assets/img/project/icon-guid.png" alt="" style="margin-left: 10px;">
                </div> -->
              </section>
            </section>
         </el-form-item>
      
        </div>
      </el-form-item>
      <el-form-item label="督导确认" prop="confirm" class="mt20">
        <el-checkbox v-model="remindRulersForm.confirm"></el-checkbox>
      </el-form-item>
      <el-form-item label="提醒人员" prop="remind" class="mt20">
        <el-checkbox-group v-model="remindRulersForm.remind">
          <el-checkbox label="督导"></el-checkbox>
          <el-checkbox label="项目负责人"></el-checkbox>
          <el-checkbox label="发行对接人"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="子事项提醒人" prop="childRemind" class="mt20">
        <el-checkbox-group v-model="remindRulersForm.childRemind">
          <el-checkbox label="督导"></el-checkbox>
          <el-checkbox label="项目负责人"></el-checkbox>
          <el-checkbox label="发行对接人"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Validation from '../../validate/validation'

@Component
export default class BasicInfo extends Vue {
  private remindRulersForm: any = {
    way: '1',
    timeList: [
      {
        remindTime: '',
        endTime: '',
      }
    ],
    confirm: false,
    remind: [],
    childRemind: [],
    quote: '',
  }
  private remindRules: any = {
    way: [
      {required: true, message: '请选择', trigger: 'change'}
    ],
    confirm: [
      {required: true}
    ],
    remind: [
      { type: 'array', required: true, message: '请至少选择一个提醒人员', trigger: 'change' }
    ],
    childRemind: [
      { type: 'array', required: true, message: '请至少选择一个提醒人员', trigger: 'change' }
    ],
    quote: [
      {required: true, message: '请选择', trigger: 'change'}
    ],
    timeList: [
      { 
        type: 'array',
        required: true,
        validator: Validation.validateArray,
        trigger: 'change',
      }
    ]
  }
}
</script>