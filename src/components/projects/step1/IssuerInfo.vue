<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="IssuerForm" :rules="rules" ref="IssuerForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="名称" prop="companyName">
          <el-select v-model="IssuerForm.companyName" filterable allow-create default-first-option placeholder="请选择">
            <el-option v-for="item in companyNameList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-select v-model="IssuerForm.region" placeholder="请选择地区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="企业规模" prop="industryScale">
          <el-select v-model="IssuerForm.industryScale" placeholder="请选择企业规模">
            <el-option v-for="item in industryScale" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市公司股票代码" prop="stockCode">
          <el-input v-model="IssuerForm.stockCode" placeholder="请输入上市公司股票代码" maxlength="30"></el-input>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债券全称发行人个数" prop="companyCount">
          <el-input v-model="IssuerForm.companyCount" placeholder="请输入债券全称发行人个数" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="行业（门类）" prop="industryType">
          <el-select v-model="IssuerForm.industryType" placeholder="请选择">
           <el-option v-for="item in industryType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="行业（大类）" prop="industryBigType">
          <el-select v-model="IssuerForm.industryBigType" placeholder="请选择">
            <el-option v-for="item in industryBigType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国民经济部门（一级）" prop="economicDepartment">
          <el-select v-model="IssuerForm.economicDepartment" placeholder="请选择">
            <el-option v-for="item in economicDepartment" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="国民经济部门（明细）" prop="economicDepartmentDetail">
          <el-select v-model="IssuerForm.economicDepartmentDetail" placeholder="请选择">
            <el-option v-for="item in economicDepartmentDetail" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经济成分" prop="economicSector">
          <el-select v-model="IssuerForm.economicSector" placeholder="请选择">
            <el-option v-for="item in economicSector" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
  private economicSector: any[] = Factory.economicSector()
  private industryScale: any[] = Factory.industryScale()
  private industryType: any[] = []
  private industryBigType: any[] = []
  private economicDepartment: any[] = []
  private economicDepartmentDetail: any[] = []
  private companyNameList: any[] = []
  private IssuerForm: any = {
    companyName: '',
    region: '',
    industryScale: '',
    stockCode: '',
    companyCount: '',
    industryType: '',
    industryBigType: '',
    economicDepartment: '',
    economicDepartmentDetail: '',
    economicSector: '',
  }
  private rules: any = {
    companyName: [
      { required: true, message: '请输入名称', trigger: 'change'},
    ],
    region: [
      { required: true, message: '请选择地区', trigger: 'change'},
    ],
    industryScale: [
      { required: true, message: '请选择企业规模', trigger: 'change'},
    ],
    stockCode: [
      { required: true, message: '请输入上市公司股票代码', trigger: 'blur'},
    ],
    companyCount: [
      { required: true, message: '请输入债券全称发行人个数', trigger: 'blur'},
    ],
    industryType: [
      { required: true, message: '请选择行业（门类）', trigger: 'change'},
    ],
    industryBigType: [
      { required: true, message: '请选择行业（大类）', trigger: 'change'},
    ],
    economicDepartment: [
      { required: true, message: '请选择国民经济部门（一级）', trigger: 'change'},
    ],
    economicDepartmentDetail: [
      { required: true, message: '请选择国民经济部门（明细）', trigger: 'change'},
    ],
    economicSector: [
      { required: true, message: '请选择经济成分', trigger: 'change'},
    ],
  }
}
</script>
<style lang="less" scoped>

</style>