<template>
  <div class="home col main" >
    <headerNav class="head" @doLogout="userLogout"></headerNav>
    <section class="flex page_content">
      <menuNav class="menu col" style="flex-shrink: 0;"></menuNav>
      <router-view class="router_view col"></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import menuNav from '@/components/Aside.vue';
import headerNav from '@/components/Head.vue';
import { user } from '@/api/index';
@Component({
  components: {
    menuNav,
    headerNav,
  },
})
export default class Home extends Vue {
  private get userInfo() {
    return this.$store.state.userInfo;
  }
  public userLogout() {
    this.$confirm('您将要退出登录', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
      // this.$store.dispatch('logOut');
    })
  }
  private get showHead() {
    return this.$store.state.isHeader
  }
  private get showAside() {
    return this.$store.state.isAside
  }
  private created() {
    this.$store.dispatch('getUserInfo');
    this.$store.dispatch('getUserPermission')
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-color: #FFF9F3;
  .head {
    height: 80px;
    width: 100%;
  }
  .page_content{
    width: 100%;
    height: 100%;
    height: calc(100vh - 80px);
    display: flex;
    .router_view{
      // margin: 14px;
      padding: 14px;
      box-sizing: border-box;
      flex: 1;
      width: 100%;
      overflow-y: auto;
    }
  }
}
// .home {
//   width: 100%;
//   height: 100vh;
//   background-color: #f4f4f6;
//   .head {
//     height: 60px;
//     width: 100%;
//   }
//   .page_content{
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     .router_view{
//       padding: 20px;
//       box-sizing: border-box;
//       flex: 1;
//       // overflow-y: auto;
//     }
//   }
// }
</style>