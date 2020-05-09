<template>
  <main class="col menu">
     <el-menu
      :default-active="defaultMenu"
      class="el-menu-vertical-demo"
      active-text-color="#FF8C00"
      router>
      <el-menu-item index="/index" @click="toRoute('index')">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/projects" @click="toRoute('project')">
        <i class="el-icon-menu"></i>
        <span slot="title">项目管理</span>
      </el-menu-item>
    </el-menu>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
@Component
export default class Aside extends Vue {
  public toRoute(name: string) {
    if ( this.$route.name !== name) {
      this.$router.push({name});
    }
  }
  public get permission() {
    const list: any[] = this.$store.state.permission
    const dailyManagePermission: string = 'prm1'
    const userManagePermission: string = 'prm2'
    const systemSettingPermission: string = 'prm3'
    const conferencePermission: string = 'prm5'
    const clientPermission: string = 'prm6'
    const financePermission: string = 'prm7'
    const productPermission: string = 'prm8'
    const showMenuList: any = {}
    const parentMenu = (menuPermission: string = '', menuName: string) => {
      if (list.some((ele: any) => ele.includes(menuPermission))) {
        showMenuList[menuName] = true
      } else {
        showMenuList[menuName] = false
      }
    }
    parentMenu(dailyManagePermission, 'daily')
    parentMenu(userManagePermission, 'user')
    parentMenu(systemSettingPermission, 'setting')
    parentMenu(conferencePermission, 'conference')
    parentMenu(clientPermission, 'client')
    parentMenu(financePermission, 'finance')
    parentMenu(productPermission, 'product')
    return {
      list,
      showMenuList,
    }
  }
  private showSub(permissionList: any[]) {
    const list: any[] = []
    list.push(...permissionList)
    return list.some((ele: any) => {
      return this.permission.list.includes(ele)
    })
  }
  private created() {
    console.log(this.$route)
  }

  get defaultMenu() {
    if (this.$route.matched && this.$route.matched.length > 2) {
      return '/' + this.$route.matched[1].path.split('/')[1]
    } else {
      return this.$route.path + ''
    }
  }
}
</script>

<style lang="less" scoped>
main{
  background:rgba(255,255,255,1);
  max-height: calc(100vh - 70px);
  overflow-y: scroll;
  .el-menu{
    width: 200px;
    border-right: none;
  }
  .sub1{
    margin-left: 12px;
    font-size:14px;
    color:rgba(96,98,102,1);
  }
  .sub3{
    padding-left: 85px !important;
    &:hover{
      background:rgba(248,250,254,1);
    }
  }
}
.is-active{
  background:rgba(248,250,254,1);
 
}
.menu::-webkit-scrollbar{
  display: none;
}
.el-menu-item {
  border-left: 4px solid transparent;
}
/deep/.el-menu-item.is-active{
  border-left:4px solid #FF8C00;
  // color:#4C4C4E !important;
}
</style>
  <!-- <img v-if="$route.path === '/index'" src="../assets/img/aside/icon-home.png" alt="" style="width: 17px; height: 17px; margin-right: 12px;"> -->
        <!-- <img v-else src="../assets/img/aside/icon-folder.png" alt="" style="width: 17px; height: 17px; margin-right: 12px;"> -->