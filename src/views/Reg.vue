<template>
  <main class="cross_center">
    <section class="reg_info">
      <el-input v-model="userAccount.loginName" placeholder="请输入用户名"></el-input>
      <el-input v-model="userAccount.name" placeholder="请输入昵称"></el-input>
      <el-input v-model="userAccount.password" placeholder="请输入密码"></el-input>
      <el-input v-model="userAccount.email" placeholder="请输入邮箱"></el-input>
      <el-input v-model="userAccount.gender" placeholder="请输入性别"></el-input>
      <el-input v-model="userAccount.mobile" placeholder="请输入手机号"></el-input>
      <el-input v-model="userAccount.departmentId" placeholder="请输入部门"></el-input>
      <el-input v-model="userAccount.isLeader" placeholder="是否领导"></el-input>
      <el-input v-model="userAccount.entryAt" placeholder="请输入入职时间"></el-input>
      <el-input v-model="userAccount.birth" placeholder="请输入生日"></el-input>
      <section class="info_bottom flex">
        <img :src="captchaUrl" class="img_captcha" @click="getCaptchaUrl" />
        <el-input v-model="userAccount.captcha" placeholder="请输入验证码"></el-input>
        <el-button @click="reg" type="success">注册</el-button>
        <el-button @click="to('login')" type="info">去登录</el-button>
      </section>   
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import { user } from '@/api/index';
@Component
export default class Login extends Vue {
  private captchaUrl = '';
  private userAccount = {};
  public async getCaptchaUrl() {
    const res: any = await user.getCaptcha();
    if (res.status === 200) {
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
  public async reg() {
    const userAccount = {
      ...this.userAccount,
      state: '1',
    };
    const res = await user.addOrUpdate(userAccount);
  }
  private created() {
    this.getCaptchaUrl();
  }
}
</script>

<style lang="less" scoped>
main{
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, .1);
  .reg_info{
    box-sizing: border-box;
    padding: 10px;
    width: 500px;
    margin: auto;
    background:rgba(245,247,250,1);
    border-radius:4px;
    .el-input{
      margin-bottom: 10px;
    }
    .el-button:last-child{
      margin-left: auto;
    }
    .img_captcha{
      cursor: pointer;
      width: 110px;
      height: 36px;
      margin-left: 4px;
    }
    .info_bottom > *{
      margin-right: 10px;
    }
    .info_bottom:last-child{
      margin-left: auto;
    }
  }
}
</style>
 