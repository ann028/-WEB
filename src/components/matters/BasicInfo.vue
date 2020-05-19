<template>
  <div style=" padding-top: 10px;">
    <el-form :model="basicInfoForm" :rules="basicInfoRules" ref="basicInfoForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类" prop="category" class="mt20">
        <el-select v-model="basicInfoForm.category"  class="input_width" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="basicInfoForm.name" class="input_width"></el-input>
      </el-form-item>
      <el-form-item label="简称" prop="shortName">
        <el-input v-model="basicInfoForm.shortName" class="input_width"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="explain">
        <!-- <el-input v-model="basicInfoForm.explain" class="input_width"></el-input> -->
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="basicInfoForm.explain" style="width: 233px;"></el-input>
      </el-form-item>
      <el-form-item label="子事项" prop="childItems">
        <!-- <el-input v-model="basicInfoForm.childItems" class="input_width"></el-input> -->
        <!-- <div>
          <img src="../../assets/img/project/icon-help-circle.png" alt="" class="icon_micro">
        </div> -->
        <div class="flex">
          <el-checkbox v-model="basicInfoForm.childItems"></el-checkbox>
          <el-popover
            placement="right-end"
            width="200"
            trigger="hover"
            class="cross_center">
            <p>开启后，循环提醒遵从子事项，如：[最后期限]、[提醒频率]。</p>
             <img slot="reference" src="../../assets/img/project/icon-help-circle.png" alt="" class="icon_micro">
          </el-popover>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class BasicInfo extends Vue {
  private basicInfoForm: any = {
    category: '',
    name: '',
    shortName: '',
    explain: '',
    childItems: false,
  }
  private basicInfoRules: any = {
    category: [
      { required: true, message: '请输入活动名称', trigger: 'change' },
    ],
    name: [
      {required: true, message: '请填写名称', trigger: 'blur'},
    ],
    shortName: [
      {required: true, message: '请填写名称', trigger: 'blur'},
    ],
    explain: [
      {required: true, message: '请填写说明', trigger: 'blur'},
    ],
    childItems: [
      {required: true},
    ],
  }
}
</script>