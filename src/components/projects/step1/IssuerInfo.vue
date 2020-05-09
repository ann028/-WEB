<template>
  <div style="background: #FFFCF9; border-radius: 8px;">
    <el-form :model="IssuerForm" :rules="rules" ref="IssuerForm" label-width="120px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="IssuerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
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
  private IssuerForm: any = {
    name: '',
    region: '',
  }
  private rules: any = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
  }
}
</script>
<style lang="less" scoped>

</style>