<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding-top: 10px;">
    <el-form :model="GradeForm" :rules="rules" ref="GradeForm" label-width="200px" class="demo-ruleForm">
      <section class="flex">
        <el-form-item label="主体评级机构1" prop="ratingCompany1">
          <el-input v-model="GradeForm.ratingCompany1"></el-input>
        </el-form-item>
        <el-form-item label="主体评级1" prop="corporateRating1">
          <el-select v-model="GradeForm.corporateRating1" placeholder="请选择活动区域">
            <el-option v-for="item in corporateRating1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="主体评级机构2" prop="ratingCompany2">
          <el-input v-model="GradeForm.ratingCompany2"></el-input>
        </el-form-item>
        <el-form-item label="主体评级2" prop="corporateRating2">
          <el-select v-model="GradeForm.corporateRating2" placeholder="请选择活动区域">
            <el-option v-for="item in corporateRating2" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债项评级机构1" prop="bondRatingCompany1">
          <el-input v-model="GradeForm.bondRatingCompany1"></el-input>
        </el-form-item>
        <el-form-item label="债项评级1" prop="rating1">
          <el-select v-model="GradeForm.rating1" placeholder="请选择活动区域">
           <el-option v-for="item in rating1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="债项评级机构2" prop="bondRatingCompany2">
          <el-input v-model="GradeForm.bondRatingCompany2"></el-input>
        </el-form-item>
        <el-form-item label="债项评级2" prop="rating2">
          <el-select v-model="GradeForm.rating2" placeholder="请选择活动区域">
            <el-option v-for="item in rating2" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </section>
      <section class="flex">
        <el-form-item label="主体评级机构组织机构代码2" prop="corporateOrgCode2">
          <el-input v-model="GradeForm.corporateOrgCode2"></el-input>
        </el-form-item>
        <el-form-item label="债项评级机构组织机构代码2" prop="bondRatingOrgCode2">
          <el-input v-model="GradeForm.bondRatingOrgCode2"></el-input>
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
  private corporateRating1: any[] = Factory.corporateRating()
  private corporateRating2: any[] = Factory.corporateRating()
  private rating1: any[] = Factory.corporateRating()
  private rating2: any[] = Factory.corporateRating()

  private GradeForm: any = {
    ratingCompany1: '',
    corporateRating1: '',
    ratingCompany2: '',
    corporateRating2: '',
    bondRatingCompany1: '',
    rating1: '',
    bondRatingCompany2: '',
    rating2: '',
    corporateOrgCode2: '',
    bondRatingOrgCode2: '',
  }
  private rules: any = {
    ratingCompany1: [
      { required: true, message: '请输入主体评级机构1', trigger: 'blur' },
    ],
    corporateRating1: [
      { required: true, message: '请选择主体评级1', trigger: 'change' },
    ],
    bondRatingCompany1: [
      { required: true, message: '请输入债项评级机构1', trigger: 'blur' },
    ],
    rating1: [
      { required: true, message: '请选择债项评级2', trigger: 'change' },
    ],
  }
}
</script>
<style lang="less" scoped>

</style>