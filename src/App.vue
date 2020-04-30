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
}
</style>
