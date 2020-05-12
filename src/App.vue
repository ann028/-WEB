<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keepAlive'></router-view> -->
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>
<style lang="less">
// @import './assets/css/base.css';

#app {
  font-family:MicrosoftYaHei;
  font-size:16px;
  color:rgba(0,0,0,1);
  .el-input .el-input__suffix,.el-input__inner{
    height: 24px;
    // padding: 0 6px;
  }
  .el-input .el-input__inner, .el-select .el-input__inner{
    padding: 0 6px
  }
  .el-date-editor .el-input__inner{
    padding: 0 30px;
  }
  .el-input__icon{
    line-height: 24px
  }
  /deep/ .el-input__inner {
    &::placeholder {
      font-size: 12px;
    }
    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      font-size: 12px;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      font-size: 12px;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      font-size: 12px;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      font-size: 12px;
    }
  }
  // /deep/.el-button{
  //   // background: #F88200;
  //   // color: #ffffff;
  //   height: 24px;
  //   width:69px;
  //   border: none;
  //   padding: 0;
  //   margin-left: 24px;
  // }
  .el-table__header{
    width: 100% !important;
  }
  .el-table__body{
    width: 100% !important;
  }
  .el-form-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-dialog__footer{
    text-align: center;
  }
}
</style>
