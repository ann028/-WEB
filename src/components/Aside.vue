<template>
  <main class="col">
    <!-- default-active="1" -->
     <!-- class="el-menu-vertical-demo"
      :default-active="onRouters"
      router -->
    <el-menu
      class="el-menu-vertical-demo"
      default-active="1">
      <el-submenu index="1" v-if="permission.showMenuList.daily">
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/daily.png">
          <span class="sub1">日常管理</span>
        </template>
        <el-submenu index="2" v-if="showSub(['prm1100', 'prm1110', 'prm1120'])">
          <template slot="title">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">日报</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" class="sub3" @click="toRoute('personal')" v-if="permission.list.includes('prm1110')">个人表</el-menu-item>
            <el-menu-item index="2-2" class="sub3" @click="toRoute('department')" v-if="permission.list.includes('prm1120')">部门表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" v-if="showSub(['prm1400', 'prm1410', 'prm1420'])">
          <template slot="title">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">直销日报</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" class="sub3" @click="toRoute('clientList')" v-if="permission.list.includes('prm1410')">个人表</el-menu-item>
            <el-menu-item index="5-2" class="sub3"  @click="toRoute('clientDepartList')" v-if="permission.list.includes('prm1420')">部门表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if="showSub(['prm1200', 'prm1210', 'prm1220', 'prm1230'])">
          <template slot="title">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">周报</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" class="sub3" @click="toRoute('weekPersonal')" v-if="permission.list.includes('prm1210')">个人表</el-menu-item>
            <el-menu-item index="3-2" class="sub3" @click="toRoute('weekDepart')" v-if="permission.list.includes('prm1220')">部门表</el-menu-item>
            <el-submenu index="3-3" v-if="permission.list.includes('prm1230')">
               <template slot="title">
                <span class="sub1">统计表</span>
              </template>
              <el-menu-item index="3-3-1" class="sub3" @click="toRoute('actualTable')">实际表</el-menu-item>
              <el-menu-item index="3-3-2" class="sub3" @click="toRoute('conversionTable')">折算表</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4-1" @click="toRoute('meeting')" v-if="permission.list.includes('prm1300')">
          <img class="icon_micro" src="../assets/img/aside/point.png">
          <span class="sub1">培训会议</span>
        </el-menu-item>
      </el-submenu>
      <!-- <el-menu-item index="9" @click="toRoute('conference')" v-if="permission.showMenuList.conference">
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/conference.png">
          <span class="sub1">会议活动</span>
        </template>
      </el-menu-item> -->
      <el-submenu index="10">
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/databank.png">
          <span class="sub1">资料库</span>
        </template>
        <el-submenu index="11" >
          <template slot="title">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">公共资料库</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="11-1" class="sub3" @click="toRoute('DatabankCommon')" >全部文件</el-menu-item>
            <el-menu-item index="11-2" class="sub3" @click="toRoute('JournalCommon')">日志</el-menu-item>
            <el-menu-item index="11-3" class="sub3" @click="toRoute('RecycleCommon')">回收站</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="12">
          <template slot="title">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">我的资料库</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="12-1" class="sub3" @click="toRoute('DatabankCommon1')" >全部文件</el-menu-item>
            <el-menu-item index="12-2" class="sub3" @click="toRoute('RecycleCommon1')">回收站</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-submenu>
      <el-submenu index="20" v-if="permission.showMenuList.user">
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/account.png">
          <span class="sub1">账户设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="20-1"  @click="toRoute('userManage')" v-if="permission.list.includes('prm2100')">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">用户管理</span>
          </el-menu-item>
          <el-menu-item index="20-2" @click="toRoute('roleManage')" v-if="permission.list.includes('prm2200')">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">角色管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="40" v-if="permission.showMenuList.finance">
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/finance.png">
          <span class="sub1">财务管理</span>
        </template>
        <el-submenu index="41" v-if="showSub(['prm7100', 'prm7110', 'prm7120', 'prm7130'])">
          <template slot="title">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">财务报销</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="41-1" @click="toRoute('finance')" v-if="permission.list.includes('prm7110')" class="sub3">预算报销表</el-menu-item>
            <el-menu-item index="41-2" @click="toRoute('reimbursement')" v-if="permission.list.includes('prm7120')" class="sub3">报销汇总</el-menu-item>
            <el-menu-item index="41-3" @click="toRoute('budget')" v-if="permission.list.includes('prm7130')" class="sub3">预算汇总</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item-group>
          <el-menu-item index="42" v-if="showSub(['prm7200'])" @click="toRoute('salerate')" >
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">销售费率</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     <!-- <el-menu-item index="25" @click="toRoute('client')" v-if="permission.showMenuList.client" >
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/client.png">
          <span class="sub1">直销客户</span>
        </template>
      </el-menu-item> -->
      <el-submenu index="26" v-if="permission.showMenuList.product">
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/product.png">
          <span class="sub1">产品管理</span>
        </template>
        <el-submenu index="27" v-if="permission.list.includes('prm8100')">
          <template slot="title">
            <img class="icon_micro" src="../assets/img/aside/point.png">
            <span class="sub1">销售管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="27-1" @click="toRoute('saledetail')" v-if="permission.list.includes('prm8110')" class="sub3">销售明细</el-menu-item>
            <el-menu-item index="27-2" @click="toRoute('salesummary')" v-if="permission.list.includes('prm8120')" class="sub3">销售汇总</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      <el-submenu index="28" v-if="permission.list.includes('prm8200')">
        <template slot="title">
          <img class="icon_micro" src="../assets/img/aside/point.png">
          <span class="sub1">开放期</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="28-1" @click="toRoute('openperiod')" v-if="permission.list.includes('prm8210')" class="sub3">开放周期表</el-menu-item>
          <el-menu-item index="28-2" @click="toRoute('nearopenperiod')" v-if="permission.list.includes('prm8220')" class="sub3">近期开放一览表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index='29' v-if="permission.list.includes('prm8300')">
        <template slot="title">
          <img class="icon_micro" src="../assets/img/aside/point.png">
          <span class="sub1">份额转让管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="29-1" @click="toRoute('sharemanage')" v-if="permission.list.includes('prm8310')" class="sub3">份额转让</el-menu-item>
          <el-menu-item index="29-2" @click="toRoute('producttable')" v-if="permission.list.includes('prm8320')" class="sub3">产品基本属性表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index='30' v-if="permission.list.includes('prm8400')">
        <template slot="title">
          <img class="icon_micro" src="../assets/img/aside/point.png">
          <span class="sub1">产品资料</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="30-1" @click="toRoute('productexhibition')" v-if="permission.list.includes('prm8410')" class="sub3">列表</el-menu-item>
          <el-menu-item index="30-2" @click="toRoute('productscreen')" v-if="permission.list.includes('prm8420')" class="sub3">筛选</el-menu-item>
          <el-menu-item index="30-3" @click="toRoute('productcompare')" v-if="permission.list.includes('prm8430')" class="sub3">比较</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </el-submenu>
      <el-menu-item index="41" @click="toRoute('setting')" v-if="permission.showMenuList.setting">
        <template slot="title">
          <img class="icon_small" src="../assets/img/aside/setting.png">
          <span class="sub1">系统设置</span>
        </template>
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
}
</script>

<style lang="less" scoped>
main{
  background:rgba(255,255,255,1);
  .el-menu{
    width: 220px;
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
</style>