<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding: 10px 0;">
    <section class="textInfo flex">
      <span class="textTitle"><span style="color: #f88200; margin-right: 4px;">*</span>项目负责人</span>
      <span class="textCon flex1">add</span>
    </section>
    <section class="textInfo cross_center">
      <span class="textTitle"><span style="color: #f88200; margin-right: 4px;">*</span>发行对接人</span>
      <!-- <span class="textCon flex1">add</span> -->
      <button class="btn primary_btn">新增</button>
    </section>
    <section class="textInfo flex">
      <span class="textTitle"></span>
      <div class="textCon flex1">
       <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
    </section>
    <section class="textInfo cross_center">
      <span class="textTitle"><span style="color: #f88200; margin-right: 4px;">*</span>监管银行负责人</span>
      <!-- <span class="textCon flex1">add</span> -->
      <button class="btn primary_btn" style="float: right;">新增</button>
    </section>
    <section class="textInfo flex">
      <span class="textTitle"></span>
      <div class="textCon flex1">
       <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class PersonSetting extends Vue {
  private personSettingForm: any = {
    nameLists: [],
    tableData: [],
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
.textInfo{
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  .textTitle{
    display: inline-block;
    width: 200px;
    margin-right: 12px;
    text-align: right;
  }
  .textCon{
    padding-right: 24px;
    box-sizing: border-box;
  }
}
</style>