<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="UnderwriterForm" :rules="rules" ref="UnderwriterForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="主承销商" prop="name">
          <el-input v-model="UnderwriterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="副主承销商" prop="name1">
          <el-input v-model="UnderwriterForm.name1"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="承销方式" prop="region">
          <el-select v-model="UnderwriterForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class BondInfo extends Vue {
  private UnderwriterForm: any = {
    name: '',
    name1: '',
    region: '',
  }
  private rules: any = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    name1: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' },
    ],
  }
}
</script>
<style lang="less" scoped>

</style>