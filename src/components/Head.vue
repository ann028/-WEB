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
          <div class="popover" >
            <section @click="toPersonCenter" class="popoverItem" style="height: 30px; line-height: 30px;">
              <i class="el-icon-s-tools" style="font-size: 14px;"></i>
              <span  style="margin-left: 10px; font-size: 14px; cursor: pointer;">个人中心</span>
            </section>
            <section class="popoverItem" style="height: 30px; line-height: 30px;">
              <i class="el-icon-s-tools" style="font-size: 14px;"></i>
              <span @click="doLogout" style="margin-left: 10px; font-size: 14px; cursor: pointer;">退出登录</span>
            </section>
          </div>
        </section>
        <img :class="['icon_micro icon_transform']" src="../assets/img/head/arrow_down.png" alt="avatar" >
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
@Component
export default class Head extends Vue {
  @Prop(String) public readonly loginName!: string;
  public async doLogout() {
    this.$emit('doLogout');
  }
  private toPersonCenter() {
    this.$router.push({name: 'personCenter'})
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
    &:hover .icon_transform {
      transform: rotate(-180deg);
      transition: all .5s;
    }
  }
  .icon_transform{
    transition: all .5s;
  }
  .popover {
    display: none;
    // display: block;
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
  .popoverItem:hover{
      background: #FFF9F3;
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