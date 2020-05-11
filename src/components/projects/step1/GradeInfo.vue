<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="GradeForm" :rules="rules" ref="GradeForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="主体评级机构1" prop="name">
          <el-input v-model="GradeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="主体评级1" prop="region">
          <el-select v-model="GradeForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="主体评级机构2" prop="region">
          <el-input v-model="GradeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="主体评级2" prop="region">
          <el-select v-model="GradeForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债项评级机构1" prop="region">
          <el-input v-model="GradeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="债项评级1" prop="region">
          <el-select v-model="GradeForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债项评级机构2" prop="region">
          <el-input v-model="GradeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="债项评级2" prop="region">
          <el-select v-model="GradeForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="主体评级机构组织机构代码2" prop="region">
          <el-input v-model="GradeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="债项评级机构组织机构代码2" prop="region">
          <el-input v-model="GradeForm.name"></el-input>
        </el-form-item>
      </section>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class BondInfo extends Vue {
  private GradeForm: any = {
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