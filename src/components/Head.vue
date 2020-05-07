<template>
  <main class="cross_center main_space">
    <section class="flex" style="height: 100%">
      <section class="title cross_center" >
        <img class="title_img" src="../assets/img/head/title1.png" alt="title" >
      </section>
      <section class="title_name">债券存续期管理</section>
    </section>
    
    <section class="cross_center" style="height: 100%; margin-right: 11px;">
      <section class="user cross_center">
        <!-- <img class="icon_medium" src="../assets/img/head/avatar_female.png" alt="avatar"> -->
        <section>
          <div style="display: flex; align-items: center;">
            <img class="icon_medium" src="../assets/img/head/avatar_female.png" alt="avatar">
            <span class="user_name" style="margin-left: 6px;">李天风</span>
          </div>
          <div class="popover" style="line-height: 20px;">
            <section>
              <i class="el-icon-s-tools" style="font-size: 20px;"></i>
              <span @click="doLogout" style="margin-left: 10px; font-size: 16px; cursor: pointer;">退出登录</span>
            </section>
            <section>
              <i class="el-icon-s-tools" style="font-size: 20px;"></i>
              <span @click="doLogout" style="margin-left: 10px; font-size: 16px; cursor: pointer;">退出登录</span>
            </section>
          </div>
        </section>
        <img :class="['icon_micro', isTransform ? 'icon_transform' : '']" src="../assets/img/head/arrow_down.png" alt="avatar" @click="toTransformUserInfo">
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
@Component
export default class Head extends Vue {
  @Prop(String) public readonly loginName!: string;
  private isShow = false;
  private changeClass: boolean = false ;
  private isIcon: boolean = false
  private isTransform: boolean = false
  public async logout() {
    this.$emit('logout');
  }
  private changeShow() {
    this.isShow = true;
  }
  private hideShow() {
    this.isShow = false;
  }
  private enterIcon() {
    this.isIcon = true
  }
  private leaveIcon() {
    this.isIcon = false
  }
  private personInfo() {
    this.$router.push({name: 'PersonCenter'})
  }
  private toTransformUserInfo() {
    this.isTransform = !this.isTransform
    console.log(this.isTransform)
  }
}
</script>

<style lang="less" scoped>
main{
  // box-sizing: border-box;
  width:100%;
  height:100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
  // padding: 0 20px;
  .title{
    width: 200px;
    height: 100%;
    border-right: 1px solid #EDEBE9;
    .title_img{
      width: 144px;
      height: 57px;
      margin-left: 28px;
    } 
  }
  .title_name{
    font-size: 22px;
    font-weight: bold;
    color:rgba(76,76,78,1);
    line-height: 80px;
    margin-left: 37px;
  }
  .icon_medium{
    width:42px;
    height:42px;
  }
  .user {
    height: 100%;
    .user-info {
      // float: right;
      width: 60px;
      height: 60px;
      border-radius: 50px;
    }
    .user_name{
      font-size:14px;
      font-family:MicrosoftYaHeiUI;
      color:rgba(112,112,112,1);
      line-height:18px;
    }
   
    &:hover .popover {
      display: block;
    }
  }
  .popover {
    display: none;
    position: absolute;
    margin-right: 11px;
    top: 70px;
    right: 0;
    width: 178px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(203, 203, 212, 0.6);
    border-radius: 4px 0px 0px 0px;
    border: 1px solid rgba(227, 227, 227, 1);
    z-index: 10;
    cursor: default;
    padding: 10px;
  }
  .icon_transform{
    // transform:rotate(180deg);
    // -ms-transform:rotate(180deg); 	/* IE 9 */
    // -moz-transform:rotate(180deg); 	/* Firefox */
    // -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    // -o-transform:rotate(180deg); 	/* Opera */
    transform: translate(0,0) rotate(360deg);
  }
}
</style>