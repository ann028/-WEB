<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="UnderwriterForm" :rules="rules" ref="UnderwriterForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="主承销商" prop="underwriterName">
          <el-input v-model="UnderwriterForm.underwriterName"></el-input>
        </el-form-item>
        <el-form-item label="副主承销商" prop="viceUnderwriterName">
          <el-input v-model="UnderwriterForm.viceUnderwriterName"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="承销方式" prop="underwritingMode">
          <el-select v-model="UnderwriterForm.underwritingMode" placeholder="请选择活动区域">
            <el-option v-for="item in underwritingMode" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Factory from '@/factory/index'

@Component
export default class BondInfo extends Vue {
  private underwritingMode: any[] = Factory.underwritingMode()
  private UnderwriterForm: any = {
    underwriterName: '',
    viceUnderwriterName: '',
    underwritingMode: '',
  }
  private rules: any = {
    underwriterName: [
      { required: true, message: '请输入主承销商', trigger: 'blur' },
    ],
    viceUnderwriterName: [
      { required: true, message: '请输入副主承销商', trigger: 'blur' },
    ],
    underwritingMode: [
      { required: true, message: '请选择承销方式', trigger: 'change' },
    ],
  }
}
</script>
<style lang="less" scoped>

</style>