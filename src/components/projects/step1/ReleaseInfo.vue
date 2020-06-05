<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="RelaseForm" :rules="rules" ref="RelaseForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="发行规模（亿元）" prop="scale">
          <el-input-number v-model="ruleForm.scale" :precision="2" :step="0.1" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label="发行价格（元）" prop="price">
          <el-input-number v-model="ruleForm.price" :precision="2" :step="0.1" :controls="false"></el-input-number>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="发行方式" prop="publishType">
          <el-select v-model="RelaseForm.publishType" placeholder="请选择">
            <el-option v-for="item in publishType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发行定价方式" prop="fixPriceType">
          <el-select v-model="RelaseForm.fixPriceType" placeholder="请选择">
            <el-option v-for="item in fixPriceType" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
  private publishType: any[] = Factory.publishType()
  private fixPriceType: any[] = Factory.fixPriceType()
  private RelaseForm: any = {
    scale: '',
    price: '',
    publishType: '',
    fixPriceType: '',
  }
  private rules: any = {
    scale: [
      { required: true, message: '请输入发行规模', trigger: 'blur'},
    ],
    price: [
      { required: true, message: '请输入发行价格', trigger: 'blur' },
    ],
    publishType: [
      { required: true, message: '请选择发行方式', trigger: 'change' },
    ],
    fixPriceType: [
      { required: true, message: '请选择发行定价方式', trigger: 'change' },
    ],
  }
}
</script>
<style lang="less" scoped>

</style>