<template>
  <main class="center">
    <img class="logo_login" src="../assets/img/login/logo.png">
    <section class="login_info flex">
      <section class="col flex1">
        <section class="login_title">
          <!-- 登录 -->
          <!-- <img src="../assets/img/head/logo.png" alt=""> -->
        </section>
        <el-input class="login_ipt" v-model="userAccount.loginName" placeholder="请输入账号">
          <img class="ipt_icon" src="../assets/img/login/icon_user.png" slot="prefix">
        </el-input>
        <el-input class="login_ipt" show-password v-model="userAccount.password" @keyup.enter.native="login" placeholder="请输入密码" >
          <img class="ipt_icon" src="../assets/img/login/icon_pwd.png" slot="prefix" >
        </el-input>
        <section class="cross_center login_ipt" v-if="showCaptcha">
          <img :src="captchaUrl" class="img_captcha" @click="getCaptchaUrl" />
          <el-input class="ml20 flex1" v-model="userAccount.captcha" placeholder="请输入验证码" ></el-input>
        </section>
        <section class="login_bottom flex">
          <button class="login_btn" @click="login" type="success">登录</button>
        </section>
      </section>
      <img class="log_pic" src="../assets/img/login/pic.png">
      <img src="../assets/img/head/logo.png" alt="" style="position: absolute;bottom:20px;right:20px;width: 100px">
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import { user } from '@/api/index';
@Component
export default class Login extends Vue {
  private showCaptcha = false;
  private captchaUrl = '';
  private captchaToken = '';
  private userAccount = {};
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
  public to(name: string) {
    this.$router.push({
      name,
    });
  }
  public async login() {
    const res: any = await user.userLogin(this.userAccount, this.captchaToken);
    const { code, msg = '', data} = res.data
    if (code === 0) {
      this.$message.success('登录成功');
      this.$store.dispatch('saveUser', {
        userId: data.userId,
        token: data.token,
      });
      this.$router.push({name: 'home'});
    } else {
      this.$message.error(`登录失败,${msg}`);
      if (code === 105) {
        this.showCaptcha = true;
      }
    }
  }
  private created() {
    this.getCaptchaUrl();
    const msg: any = this.$route.query.msg
    if (msg) {
      this.$message.warning(msg)
    }
  }
}
</script>

<style lang="less" scoped>
main{
  width: 100vw;
  height: 100vh;
  background-color: #5792FC;
  background-image: url('../assets/img/login/bg.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  box-sizing: border-box;
  padding: 0 15%;
  .logo_login{
    width: 500px;
    position: absolute;
    object-fit: contain;
    top: 20px;//44
    left: 52px;
  }
  .login_info{
    background: #fff;
    padding: 30px 30px 30px;//65 30 50
    border-radius: 12px;
    margin-top: 140px;
    position: relative;
    .login_title{
      font-size:40px;
      color:rgba(87,146,252,1);
      margin-bottom: 40px;
    }
    .login_ipt{
      width: 100%;
      margin-bottom: 40px;
      .ipt_icon{
        width: 24px;
        height: 24px;
      }
    }
    button {
      margin: 0;
      padding: 0;
      outline: none;
      border: 1px solid transparent;
    }
   .login_input{
      width: 100%;
      height:48px;
      background:rgba(245,246,250,1);
      border-radius:8px;
      margin-bottom: 40px;
      line-height: 48px;
      padding:0 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center
   }
   .login_input>img{
     width: 24px;
     height: 24px;
     margin-right: 8px;
   }
    .img_captcha{
      cursor: pointer;
      width: 110px;
      height: 36px;
      margin-left: 4px;
    }
    .btn_success{
      width: 100%;
      height:48px;
      background:linear-gradient(270deg,rgba(144,196,254,1) 0%,rgba(87,146,252,1) 100%);
      box-shadow:0px 0px 11px 0px rgba(248,130,0,0.12);
      border-radius:24px;
      color: #fff;
      cursor: pointer;
    }
    .log_pic{
      object-fit: contain;
      width: 50%;
      margin-left: 88px;
    }
    .login_btn{
      width: 100%;
      border: 0;
      height:48px;
      background:linear-gradient(270deg,rgba(144,196,254,1) 0%,rgba(87,146,252,1) 100%);
      box-shadow:0px 0px 11px 0px rgba(248,130,0,0.12);
      border-radius:24px;
      font-size:20px;
      color:rgba(255,255,255,1);
    }
  }
}
</style>
 