<template>
  <main class="cross_center main_space">
    <section class="cross_center" >
      <!-- <img class="title_img" src="../assets/img/head/title.png" alt="title" > -->
    </section>
    <!-- <section class="user_info cross_center">
       <img class="icon_medium" src="../assets/img/head/miniprogram.png" alt="link" >
      <section style="display: flex; align-items: center;">
        <img class="icon_medium" src="../assets/img/head/miniprogram.png" alt="link" @mouseenter="enterIcon" @mouseleave="leaveIcon">
        <section class="Icon" v-if="isIcon" >
          <img src="../assets/img/head/xiaochengxu.jpg" alt="" style="width: 200px;margin-left: 20px;">
        </section>
      </section>
      <section class="cross_center" @mouseenter="changeShow" @mouseleave="hideShow" >
        <img class="icon_medium" src="../assets/img/head/avatar_female.png" alt="avatar">
        <section  >
          <section class="user_name">{{loginName}}</section>
            <div class="infoDialog" v-if='isShow' @mouseenter="changeShow"  @mouseleave="hideShow" >
                <section class="infoItem" @click="personInfo">
                  <img src="../assets/img/mine_fill.png" alt="" style="width:24px;height:24px;margin:0">
                  <span class="infoWord">个人中心</span>
                </section>
                <section class="infoItem" @click="logout">
                  <img src="../assets/img/logout.png" alt=""  style="width:24px;height:24px;margin:0">
                  <span class="infoWord" style="color:#606266">退出登录</span>
                </section>
            </div>
        </section>
        <img class="icon_micro" src="../assets/img/arrow_down.png" alt="avatar">
      </section>
    </section> -->
   
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
  // private toRoute() {
  //   this.changeClass = false;
  //   this.$router.push({name: 'DatabankCommon'})
  // }
  // private toRoutemy() {
  //   this.changeClass = true;
  //   this.$router.push({name: 'DatabankCommon1'})
  // }
}
</script>

<style lang="less" scoped>
main{
  box-sizing: border-box;
  width:100%;
  height:100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
  padding: 0 20px;
  .title_img{
    width: 332px;
    height: 67px;
  }
  .user_info{
      position: relative;
    .user_name{
      font-size:14px;
      color:rgba(96,98,102,1);
    }
    img:nth-child(1){
      margin-right: 24px;
    }
    img:nth-child(2){
      margin-right: 8px;
    }
    img:nth-child(3){
      margin-left: 8px;
    }
    .infoDialog{
      width:224px;
      height:88px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 8px 0px rgba(153,153,153,0.2);
      position: absolute;
      top:40px;
      right: 0;
      // margin: 15px 20px;
      padding-top:10px;
      box-sizing: border-box;
      .infoItem{
        width:100%;
        height:34px;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0px 20px;
        box-sizing: border-box;
      }
      .infoItem:hover{
        background: rgba(248,250,254,1)
      }
      .infoWord{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(87,146,252,1);
        margin-left: 12px;
      }
    }
    
    
  }
  .title_word{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(96,98,102,1);
    margin: 0 20px;
    cursor: pointer;
    .title_height{
      color:rgba(87,146,252,1);
      border-bottom: 1px solid rgba(87,146,252,1);
    }
    .diviLine{
      margin: 0 20px;
      color: rgba(87,146,252,1);
    }
  }
  .Icon{
    position: absolute;
    top: 45px;
    right: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 220px;
    background: #ffffff;
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
  }
}
</style>