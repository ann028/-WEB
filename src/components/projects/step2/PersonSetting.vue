<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding: 10px 0;">
    <section class="textInfo flex">
      <span class="textTitle"><span style="color: #f88200; margin-right: 4px;">*</span>项目负责人</span>
      <div class="textCon flex1">
        <div class="addBtn">+</div>
        <!-- <div class="textError">请添加项目负责人</div> -->
      </div>
    </section>
    <section class="textInfo cross_center">
      <span class="textTitle"><span style="color: #f88200; margin-right: 4px;">*</span>发行对接人</span>
      <div class="flex1 main_space">
        <span class="textCon flex1"></span>
        <button class="btn primary_btn" @click="publisherDialog = true" style="margin-right: 24px;">新增</button>
      </div>
    </section>
    <section class="textInfo flex">
      <span class="textTitle"></span>
      <div class="textCon flex1">
       <el-table
          :data="personSettingForm.publisherList"
          :header-cell-style="{background:'rgba(237,235,233,0.3)'}"
          style="width: 100%">
          <el-table-column
            prop="date"
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="手机">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="邮箱">
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <div class="main_space">
                <img src="../../../assets/img/project/edit.png" alt="" style="width: 20px; height: 20px; cursor: pointer;">
                <img src="../../../assets/img/project/trash-2.png" alt="" style="width: 20px; height: 20px; cursor: pointer;">
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <section class="textInfo cross_center">
      <span class="textTitle"><span style="color: #f88200; margin-right: 4px;">*</span>监管银行负责人</span>
      <div class="flex1 main_space" >
        <span class="textCon flex1"></span>
        <button class="btn primary_btn" @click="tableDataDialog = true" style="margin-right: 24px;">新增</button>
      </div>
    </section>
    <section class="textInfo flex">
      <span class="textTitle"></span>
      <div class="textCon flex1">
       <el-table
          :data="personSettingForm.tableData"
          :header-cell-style="{background:'rgba(237,235,233,0.3)'}"
          style="width: 100%">
          <el-table-column
            prop="date"
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="手机">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="邮箱">
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <div class="main_space">
                <img src="../../../assets/img/project/edit.png" alt="" style="width: 20px; height: 20px; cursor: pointer;">
                <img src="../../../assets/img/project/trash-2.png" alt="" style="width: 20px; height: 20px; cursor: pointer;">
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <!-- 弹框 -->
    <el-dialog
      title="发行对接人"
      :visible.sync="publisherDialog"
      width="400px">
      <div>
        <el-form :model="addPublisherForm" :rules="addPublisherRules" ref="addPublisherForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addPublisherForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="addPublisherForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addPublisherForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addPublisherForm.email"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('addPublisherForm')">立即创建</el-button>
            <el-button @click="resetForm('addPublisherForm')">重置</el-button>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publisherDialog = false">保存</el-button>
        <el-button @click="publisherDialog = false" style="margin-left: 90px;">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="监管银行负责人"
      :visible.sync="tableDataDialog"
      width="400px">
      <div>
        <el-form :model="addTableDataForm" :rules="addTableDataRules" ref="addTableDataForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addTableDataForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="addTableDataForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addTableDataForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addTableDataForm.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tableDataDialog = false">保存</el-button>
        <el-button @click="tableDataDialog = false" style="margin-left: 90px;">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class PersonSetting extends Vue {
  private personSettingForm: any = {
    leaderList: [],
    publisherList: [{
      date: 'ZS',
      name: '张三',
      address: '北京',
    }],
    tableData: [{
      date: 'ZS',
      name: '张三',
      address: '北京',
    }],
  }
  private addPublisherForm: any = {
    name: '',
    phone: '',
    mobile: '',
    email: '',
  }
  private addTableDataForm: any = {
    name: '',
    phone: '',
    mobile: '',
    email: '',
  }
  private publisherDialog: boolean = false
  private tableDataDialog: boolean = false
  private addPublisherRules: any = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
  }
  private addTableDataRules: any = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
  }
}
</script>
<style lang="less" scoped>
.textInfo{
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  margin-bottom: 22px;
  .textTitle{
    display: inline-block;
    width: 200px;
    margin-right: 12px;
    text-align: right;
  }
  .textCon{
    padding-right: 24px;
    box-sizing: border-box;
    position: relative;
  }
  .textError{
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
}
.addBtn{
  width: 20px;
  height: 20px;
  background: #f88200;
  color: #ffffff;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>