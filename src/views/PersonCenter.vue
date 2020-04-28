<template>
  <main class="container">
    <Step :stepName = 'message' :imgUrl='imgUrl'></Step>
    <div class="content">
      <section class="flex text1">
        <section class="text">
          <span  class="texTit">姓名:</span>
          <span class="textCon">{{personInfo.name}}</span>
        </section>
         <section class="text">
          <span class="texTit">部门:</span>
          <span class="textCon">{{personInfo.departmentName}}</span>
        </section>
      </section>
      <section class="flex text1">
        <section class="text">
          <span  class="texTit">账号:</span>
          <span class="textCon">{{personInfo.loginName}}</span>
        </section>
         <section class="text ">
          <span  class="texTit">密码:</span>
          <span class="textCon">xxxxxx
            <button @click="modify" class="btn btn_succ_plain modify">修改</button>
          </span>
        </section>
      </section>
      <section class="flex text1">
        <section class="text">
          <span  class="texTit">手机:</span>
          <el-input v-model="personInfo.mobile" v-if='isEdit' class="textCon" placeholder="请输入内容"></el-input>
          <span v-else class="textCon">{{personInfo.mobile}}</span>
        </section>
         <section class="text ">
          <span  class="texTit">邮箱:</span>
          <el-input v-if='isEdit' v-model="personInfo.email" class="textCon" placeholder="请输入内容"></el-input>
           <span v-else class="textCon">{{personInfo.email}}</span>
        </section>
      </section>
      <section class="flex text1">
        <section class="text">
          <span  class="texTit">性别:</span>
          <el-select  v-if='isEdit' v-model="personInfo.gender" class="textCon" placeholder="请选择">
            <el-option value="MALE" label="男"></el-option>
            <el-option value="FEMALE" label="女"></el-option>
            <el-option value="UNKNOWN" label="未知"></el-option>
          </el-select>
          <span v-else class="textCon">{{personInfo.gender=='MALE'?'男':'女'}}</span>
        </section>
         <section class="text ">
          <span  class="texTit">入职时间:</span>
          <span class="textCon">{{personInfo.entryAt}}</span>
        </section>
      </section>
      <section class="flex text1">
        <section class="text">
          <span  class="texTit">生日:</span>
           <el-date-picker
            v-model="personInfo.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            class="textCon">
          </el-date-picker>
          <!-- <el-input  v-model="personInfo.birthday" class="textCon" placeholder="请输入内容"></el-input> -->
          <!-- <sspan v class="textCon">{{personInfo.birthday}}</sspan> -->
        </section>
      </section>
    </div>
    <div class="btnBox" v-if='isEdit'>
         <button  class="btn btn_primary" @click="submit">保存</button>
        <!-- <button    class="btn btn_info_plain_disabled">取消</button> -->
    </div>
    <!-- 原密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="436px"
      center
      @close="cancle">
      <div v-if='passEdit'>
        <section class=" passBox">
          <span class="passTit">原密码</span>
          <el-input  v-model="passwordInfo.OriginalPass"   class="passCon" placeholder="请输入原密码"></el-input>
        </section>
        <section class=" passBox"  v-if='showCaptcha'>
          <img :src="captchaUrl" class="img_captcha" @click="getCaptchaUrl" />
          <el-input class="passCon" v-model="passwordInfo.captcha"  placeholder="请输入验证码"></el-input>
        </section>
      </div>
      <div v-else>
        <section class=" passBox">
          <span class="passTit">新密码</span>
          <el-input  v-model="passwordInfo.NewPass"  class="passCon" placeholder="6~12位的字母加数字"></el-input>
        </section>
        <section class=" passBox">
          <span class="passTit">确认密码</span>
          <el-input  v-model="passwordInfo.ConfirmPass"   class="passCon" placeholder="请确认新密码"></el-input>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
        <button v-if='passEdit'  @click="nextStep" class="btn btn_primary">下一步</button>
        <button v-if='!passEdit'  @click="submitPass" class="btn btn_primary">保存</button>
        <button v-if='!passEdit'   @click="cancle" class="btn btn_info_plain_disabled">取消</button>
      </span>
    </el-dialog>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import Step from '@/components/Step.vue';
import { user } from '@/api/index'
@Component({
  components: {
    Step,
  },
})
export default class Login extends Vue {
  private message = ['个人中心']
  private imgUrl = require('../assets/img/user.png')
  private isEdit = true
  private passEdit = true
  private personInfo: any = {}
  private passwordInfo = {
      OriginalPass: '',
      NewPass: '',
      ConfirmPass: '',
      captcha: '',
  }
  private dialogVisible = false
  private captchaUrl = '';
  private captchaToken = '';
  private showCaptcha = false;
  // 验证码
  public async getCaptchaUrl() {
    const res: any = await user.getCaptcha();
    if (res.status === 200) {
      this.captchaToken = res.headers.token;
      this.captchaUrl = `data:image/png;base64,${window.btoa(new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ))}`;
    }
  }
  private modify() {
    this.dialogVisible = true
  }
  // 获取用户基本信息
  private async getUserinfo() {
    const res: any = await user.userInfo()
    this.personInfo = {
      ...res.data.data,
    }
  }
  // 点击下一步
  private async nextStep() {
    if (!this.passwordInfo.OriginalPass) {
      this.$message.error(`请填写原密码`)
      return false
    }
    const res: any = await user.userLogin({
      loginName: this.personInfo.loginName,
      password: this.passwordInfo.OriginalPass,
      captcha: this.passwordInfo.captcha || '',
    })
    const {code , msg , data} = res.data
    if ( code === 0 ) {
      this.$store.dispatch('saveUser', {
        userId: data.userId,
        token: data.token,
      });
      this.passEdit = false
    } else {
      this.$message.error(`${msg}`)
      if ( res.data.code === 105 ) {
        this.showCaptcha = true;
      }
    }
  }
  // 重置密码
  private async submitPass() {
    if (this.passwordInfo.NewPass === '' || this.passwordInfo.ConfirmPass === '') {
      this.$message.warning(`请填写完整`)
      return false
    }
    if (this.passwordInfo.NewPass) {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if ( !(reg.test(this.passwordInfo.NewPass))) {
        this.$message.error('密码格式有误，密码由6-12位数字字母组合')
        return false;
      }
    }
    if (this.passwordInfo.ConfirmPass !== this.passwordInfo.NewPass) {
      this.$message.warning(`两次密码输入不一致，请重新确认`)
      return false
    }
    const res: any = await user.resetPassword({
      ...this.personInfo,
      oldPassword: this.passwordInfo.OriginalPass,
      password: this.passwordInfo.NewPass,
    })
    const { code, msg, success } = res.data
    if (success) {
      this.$message.success(`密码修改成功`)
      this.dialogVisible = false
      this.passEdit = true
    } else {
      this.$message.error(`${msg}`)
    }
  }
  // 保存按钮
  private async submit() {
    if (this.personInfo.mobile) {
      if (!(/^1[3456789]\d{9}$/.test(this.personInfo.mobile))) {
        this.$message.error("手机号码有误,请重填");
        return false;
      }
    }
    if (this.personInfo.email) {
      const re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
      if (!(re.test(this.personInfo.email))) {
        this.$message.error(`邮箱格式有误,请重新填写`)
        return false;
      }
    }
    const res: any = await user.addOrUpdateUser(this.personInfo)
    const { code, data, msg, success } = res.data
    if (success ) {
      this.$message.success(`编辑成功`)
    } else {
      this.$message.error(`${msg}`)
    }
  }
  // 取消弹框
  private cancle() {
    this.dialogVisible = false;
    this.passEdit = true;
    this.passwordInfo = {
      OriginalPass: '',
      NewPass: '',
      ConfirmPass: '',
      captcha: '',
    }
  }
  private mounted() {
    this.getUserinfo()
    this.getCaptchaUrl();
  }
}
</script>

<style lang="less" scoped>
.el-dialog .el-dialog--center .el-dialog__header{
  border-bottom: 1px solid #EAEAEA;
}
main{
  /deep/ .el-input__icon{
    line-height: 32px;
  }
  .content{
    // padding:0 30px;
    // box-sizing: border-box;
    .text1{
      justify-content: flex-start;
      .text{
        margin: 10px 0;
        line-height: 30px;
        font-size: 16px;
        .textCon{
          display:inline-block;
          width: 224px !important;
          margin-right: 112px;
          .modify{
            margin-left: 20px
          }
        }
        .texTit{
          display: inline-block;
          width: 70px;
          text-align: right;
          margin-right:20px;
        }
       
      }
    }
  }
  .btnBox{
    width:264px;
    margin:20px auto 0;
    display:flex;
    justify-content: space-around;
     .btn-primary{
          background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(192,196,204,1);
      color: rgba(192,196,204,1)
      }
  }
  .passBox{
    // display: flex;
    // justify-content:space-between;
    .passTit{
      display:inline-block;
      width:110px;
      line-height: 40px;
      font-size:16px;
      color:rgba(49,50,51,1);
      text-align: right;
      margin-right: 20px;
      flex-shrink: 0;
      line-height: 40px;
    }
    .passCon{
      width: 224px !important;
      line-height: 40px;
    }
    .img_captcha{
      cursor: pointer;
      width: 80px;
      height: 36px;
      margin-right: 20px;
    }
  }
  .dialog-footer{
      display: flex;
      justify-content: space-around
    }
  .btn-primary1{
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(192,196,204,1);
    color: rgba(192,196,204,1)
    }
}
</style>
 