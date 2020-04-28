<template>
  <main class="col">
    <Head class="head"
    @logout="userLogout"
    :loginName="userInfo.user.loginName"
    v-if="showHead"
    ></Head>
    <section :class="[showAside? 'page_content flex' : '']">
      <Aside class="aside col" v-if="showAside"></Aside>
      <router-view class="router_view flex1 col"></router-view>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import Aside from '@/components/Aside.vue';
import Head from '@/components/Head.vue';
import { user, department } from '@/api/index';
@Component({
  components: {
    Aside,
    Head,
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
      this.$store.dispatch('logOut');
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
main{
  height: 100%;
  .head{
    width: 100%;
    z-index: 1;
  }
  .page_content{
    width: 100%;
    .aside{
      height: 100%;
      z-index: 2;
    }
    .aside::-webkit-scrollbar {
      display: none;
    }
    .router_view{
      max-width: calc(100vw - 240px);
      min-height: calc(100vh - 112px);
      background:rgba(245,247,250,1);
      box-sizing: border-box;
      padding: 20px;
      border-radius:12px;
    }
  }
}
</style>