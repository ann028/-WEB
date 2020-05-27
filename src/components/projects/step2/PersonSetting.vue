<template>
  <div style="background: #FFFCF9; border-radius: 8px; padding: 10px  20px 10px 0; box-sizing: border-box;">
    <el-form :model="personSettingForm" :rules="rules" ref="personSettingForm" :label-position="right" label-width="200px" class="demo-ruleForm" >
      <el-form-item label="项目负责人" prop="leaderList">
        <div>
          <div class="addBtn" @click="leaderDialog = true">+</div>
        </div>
      </el-form-item>
      <el-form-item label="发行对接人" prop="publisherList">
        <div>
          <input type="button" value="新增" @click="publisherDialog = true, addPublisherForm = {}" class="btn primary_btn" style="float: right; margin-bottom: 20px;">
          <el-table
            :data="personSettingForm.publisherList"
            :header-cell-style="{background:'rgba(237,235,233,0.3)'}"
            style="width: 100%">
            <el-table-column
              prop="name"
              align="center"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="phone"
              align="center"
              label="手机">
            </el-table-column>
            <el-table-column
              prop="mobile"
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
                  <img src="../../../assets/img/project/trash-2.png" @click="doDelPublisher(scope.$index)"  style="width: 20px; height: 20px; cursor: pointer;">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item label="监管银行负责人" prop="tableData">
        <div>
          <input type="button" value="新增" class="btn primary_btn" @click="tableDataDialog = true" style="float: right; margin-bottom: 20px;">
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
                  <img src="../../../assets/img/project/trash-2.png" style="width: 20px; height: 20px; cursor: pointer;">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
    </el-form>
    <!-- 弹框 -->
    <!-- 项目负责人 -->
    <el-dialog
      title="项目负责人"
      :visible.sync="leaderDialog"
      width="1000px">
      <div class="leaderDialog">
          <section>
            <el-input v-model="input" placeholder="账号姓名" class="input_width"></el-input>
            <button class="btn primary_btn">查询</button>
          </section>
          <section class="flex mt20">
            <section class="left leader_table">
              <el-table
                :data="leadersData"
                style="width: 100%"
                :header-cell-style="{background:'rgba(237, 235, 233, 0.3)'}"
                max-height="250"
                ref="multipleTable">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="index"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="账号">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  width="150"
                  label="手机">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" >添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </section>
            <section class="right selected_person">
              <span style="font-weight: bold;">已选用户</span>
              <div class="selected_personList">
                <div class="selected_item">
                  <span style="color: #F88200; line-height: 32px; text-align: center;">债券1部-利泰南风</span>
                  <div class="closeIcon">×</div>
                </div>
              </div>
            </section>
          </section>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="leaderDialog = false">保存</el-button>
        <el-button @click="leaderDialog = false" style="margin-left: 90px;">取 消</el-button>
      </span>
    </el-dialog>

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
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doAddPublisher">保存</el-button>
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
import * as Validation from '../../../validate/validation'
@Component
export default class PersonSetting extends Vue {
  private input: any = ''
  private right: any = ''
  private personSettingForm: any = {
    leaderList: [],
    publisherList: [],
    tableData: [{
      date: 'ZS',
      name: '张三',
      address: '北京',
    }],
  }
  private leadersData = [{
      index: 1,
      name: '张三',
      phone: '15735182768',
    }]
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
  private leaderDialog: boolean = false
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

  private ruleForm: any = {
    name: [],
    region: '',
    desc: '',
  }
  private rules: any = {
    leaderList: [
      {
        required: true,
        validator: Validation.validateMobile,
        trigger: 'change',
      },
    ],
    publisherList: [
      {
        required: true,
        validator: Validation.validateMobile,
        trigger: 'change',
      },
    ],
  }
  private doAdd() {
    console.log(11)
    this.personSettingForm.publisherList.push({
      date: '2020-01-09',
      name: '销售',
      address: '地址1',
    })
    this.personSettingForm.leaderList.push({
      date: '2020-01-09',
      name: '销售',
      address: '地址1',
    })
    const aa: any = this.$refs.personSettingForm
    aa.validateField('publisherList')
    const ab: any = this.$refs.personSettingForm
    ab.validateField('leaderList')
  }
  private doReduce() {
    console.log( this.ruleForm.name)
    this.personSettingForm.publisherList.splice(0, 1)
    const aa: any = this.$refs.personSettingForm
    aa.validateField('publisherList')
  }
  private doAddPublisher() {
    const addPublisherForm1: any = this.$refs.addPublisherForm
    addPublisherForm1.validate((valid: any) => {
      if (valid) {
        console.log(this.addPublisherForm)
        this.personSettingForm.publisherList.push(this.addPublisherForm)
        console.log('==========', this.personSettingForm.publisherList)
        this.publisherDialog = false
        const publisherValidate: any = this.$refs.personSettingForm
        publisherValidate.validateField('publisherList')
      } else {
        return false;
      }
    });
  }
  private doDelPublisher(index: any) {
    console.log(index)
    this.personSettingForm.publisherList.splice(index, 1)
  }
}
</script>
<style lang="less" scoped>
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
.leaderDialog{
  .leader_table{
    flex: 1;
    flex-shrink: 0;
  }
  .selected_person{
    width: 270px;
    margin-left: 20px;
    padding: 10px;
    box-sizing: border-box;
    .selected_personList{
      // margin-top: 10px;
      height: 400px;
      background: #FFFCF9;
      padding: 16px;
      box-sizing: border-box;
      // overflow-y: scroll;
      .selected_item{
        width: 150px;
        height: 32px;
        border: 1px solid #F88200;
        margin: 16px 16px 0;
        position: relative;
      }
    }
  }
  .closeIcon{
    width: 14px;
    height: 14px;
    background: #F88200;
    color: #ffffff;
    border-radius: 50%;
    text-align: center;
    line-height: 14px;
    position: absolute;
    top: 0;
    right: -20px;
    cursor: pointer;
  }
}
</style>