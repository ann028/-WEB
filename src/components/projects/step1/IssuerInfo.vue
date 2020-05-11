<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="IssuerForm" :rules="rules" ref="IssuerForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="名称" prop="name">
          <el-select
            v-model="IssuerForm.name"
            filterable
            allow-create
            default-first-option
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="企业规模" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市公司股票代码" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债券全称发行人个数" prop="region">
         <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业（门类）" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="行业（大类）" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国民经济部门（一级）" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="国民经济部门（明细）" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经济成分" prop="region">
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
      { required: true, message: '请输入活动名称', trigger: 'blur'},
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change'},
    ],
  }
}
</script>
<style lang="less" scoped>

</style>