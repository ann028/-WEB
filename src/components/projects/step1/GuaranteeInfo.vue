<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="GuaranteeForm" :rules="rules" ref="GuaranteeForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="担保机构1" prop="name">
          <el-input v-model="GuaranteeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="担保方式" prop="region">
          <el-select v-model="GuaranteeForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="担保机构2" prop="name">
          <el-input v-model="GuaranteeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="担保方式" prop="region">
          <el-select v-model="GuaranteeForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="担保机构组织机构代码2" prop="name">
          <el-input v-model="GuaranteeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="信用增级方式" prop="name">
          <el-input v-model="GuaranteeForm.name"></el-input>
        </el-form-item>
      </section>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class BondInfo extends Vue {
  private GuaranteeForm: any = {
    name: '',
    region: '',
  }
  private rules: any = {
    name: [
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