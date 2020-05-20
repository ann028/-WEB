<template>
  <div  style="background: #ffffff;">
    <div>
      <el-form :model="childItemForm" size="mini" :rules="childItemRules" ref="childItemForm" label-width="120px" class="demo-ruleForm" style=" ">
        <div v-for="(item, index) in childItemForm.userList" :key="index" style=" background: #FFFCF9; margin-bottom: 20px; padding: 10px 0; box-sizing: border-box; position: relative;">
          <el-form-item label="名称" :prop="'userList.'+ index +'.username'" :rules="childItemRules.username" class="mt20">
            <el-input v-model="item.username" size="mini" class="input_width"/>
          </el-form-item>
          <el-form-item label="最后期限" :prop="'userList.'+ index +'.password'" :rules="childItemRules.password">
            <el-input v-model="item.password" type="password" class="input_width"/>
            <div style="display: inline-block; " class="cross_center">
              <img src="../../assets/img/project/icon-guid.png" alt="" >
            </div>
          </el-form-item>
          <el-form-item label="频率" :prop="'userList.'+ index +'.phone'" :rules="childItemRules.phone">
            <span style="color: #606266;">《最后期限》前</span>
            <el-input v-model="item.phone" size="mini"  style="margin: auto 10px; width: 57px;"/>
            <span style="color: #606266;">个工作日，每隔</span>
            <el-input v-model="item.phone" size="mini" style="margin: auto 10px; width: 57px;"/>
            <span style="color: #606266;">个工作日</span>
          </el-form-item>
          <el-form-item label="事项内容" :prop="'userList.'+ index +'.content'" :rules="childItemRules.content">
            <!-- <el-input v-model="item.phone" size="mini" class="input_width"/> -->
            <!-- <div id="editor1"  style="width: 700px; margin-top: 40px;"></div> -->
            <Editor :index ="index" :userList="childItemForm.userList" @change="changeValue"></Editor>
          </el-form-item>
          <el-form-item label="适用条件" :prop="'userList.'+ index +'.conditions'" :rules="childItemRules.conditions">
            <el-checkbox v-model="item.conditions"></el-checkbox>
          </el-form-item>
          <div v-if="item.conditions">
            <el-form-item label="地区" :prop="'userList.'+ index +'.district'" :rules="childItemRules.district" label-width="160px">
              <el-checkbox v-model="item.isShowDistrict"></el-checkbox>
              <el-select v-if="item.isShowDistrict"  v-model="item.district"  class="input_width ml20" placeholder="选择省">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易所" :prop="'userList.'+ index +'.isShowExchange'" :rules="childItemRules.isShowExchange" label-width="160px">
              <el-checkbox v-model="item.isShowExchange"></el-checkbox>
              <el-select  v-if="item.isShowExchange" v-model="item.exchange"  class="input_width ml20" placeholder="选择省">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年度" :prop="'userList.'+ index +'.annual'" :rules="childItemRules.annual" label-width="160px">
              <el-checkbox v-model="item.isShowAnnual"></el-checkbox>
              <el-select v-if="item.isShowAnnual" v-model="item.annual" class="input_width ml20" placeholder="选择省">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          
          <div class="btn primary_btn" v-if="index > 0" @click="onDeleteButton(index)" style="position: absolute; top: 24px; right: 80px; text-align: center; line-height: 24px;">删除</div>
        </div>
      </el-form>
    </div>
    <button @click="add" class="btn primary_btn">增加</button>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Validation from '../../validate/validation'
import Editor from './wangEditor.vue'

@Component({
  components: {
    Editor,
  },
})
export default class BasicInfo extends Vue {
  private childItemRules = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur'}],
    phone: [{ required: true, message: '请输入账号手机号', trigger: 'blur'}],
    username: [{ required: true, message: '请输入账号名称', trigger: 'blur'}],
    password: [{ required: true, message: '请输入密码', trigger: 'blur'}],
    content: [{ required: true, validator: Validation.validateEmpty, trigger: 'blur'}],
    conditions: [{required: true}],
    // district: [{ required: true, message: '请选择地区', trigger: 'change'}],
    isShowDistrict: [{required: true}],
    // exchange: [{ required: true, message: '请选择地区', trigger: 'change'}],
    isShowExchange: [{required: true}],
    // annual: [{ required: true, message: '请选择地区', trigger: 'change'}],
    isShowAnnual: [{required: true}],
  }
  private childItemForm = {
    name: '',
    userList: [{
        phone: '1',
        username: '',
        password: '',
        content: '',
        conditions: false,
        isShowDistrict: false,
        district: '',
        isShowExchange: false,
        exchange: '',
        isShowAnnual: false,
        annual: '',
    }],
  }
  private add() {
    this.childItemForm.userList.push({
      phone: '',
      username: '',
      password: '',
      content: '',
      conditions: false,
      isShowDistrict: false,
      district: '',
      isShowExchange: false,
      exchange: '',
      isShowAnnual: false,
      annual: '',
    })
  }
  private onDeleteButton(index: any) {
    console.log(index)
    this.childItemForm.userList.splice(index, 1)
  }
  private changeValue(val: any, index: any) {
    console.log(val, index)
    this.childItemForm.userList[index].content = val
    const childItemValidate: any = this.$refs.childItemForm
    childItemValidate.validateField('userList.' + index + '.content')
  }
};
</script>