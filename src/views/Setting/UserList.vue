<template>
  <main class="col">
    <section class="cross_center main_space mb20">
      <section class="search flex">
        <article class="cross_center">账号姓名</article>
        <el-input v-model="searchName" placeholder="请输入内容" class="ml20"></el-input>
        <button class="btn btn_primary ml20" style="width:76px;height:32px;" @click="searchUser">查询</button>
      </section>
      <section class="btns flex">
        <button class="btn btn_primary center" style="width:106px;height:32px;margin-right:20px"
        @click="addUser" v-if="permission.includes('prm2205')">
          <img src="../../assets/img/addteam.png" style="width:16px;height:16px;margin-right: 4px;">
          添加用户
        </button>
        <button 
        @click="delRoleUsers" v-if="roleId && selectedUser.length && permission.includes('prm2206')"
        class="btn btn_succ center" style="width:78px;height:32px;">
          <img src="../../assets/img/deleteteam.png" style="width:16px;height:16px;margin-right: 4px;">
          移除
        </button>
      </section>
    </section>
    <el-table
      :data="currentUserList"
      :header-cell-style="{background:'#F5F6FA'}"
      @row-click="showDetailModal"
      @selection-change="handleSelectionChange"
      style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        align="center"
        :index="indexMethod"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="loginName"
        align="center"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        align="center"
        label="部门">
      </el-table-column>
      <el-table-column
        align="center"
        label="身份">
        <template slot-scope="scope">
          <span>{{scope.row.isLeader === 'YES' ? '领导' : '员工'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="角色">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.roles" :key="index">
            {{item}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px" v-if="permission.includes('prm2206')">
        <template slot-scope="scope">
          <span style="cursor: pointer;color:#5792FC;margin-right:31px;"
          @click.stop="delRoleUsers(scope.row)">
            <img src="../../assets/img/role_del_user.png" alt="" style="width:16px;height:16px">
            移除
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex" style="margin-top:15px;justify-content:space-between">
      <section class="cross_center">
        <span class="cross_center">共<span style="color:#5792FC">{{this.pageJson.total}}</span>条</span>
        <el-select v-model="pageValue" placeholder="10条/页" class="ml10" @change="changePageValue(pageValue)">
          <el-option value=1 label="10条/页"></el-option>
          <el-option value=2 label="20条/页"></el-option>
        </el-select>
      </section>
      <section>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageJson.currentPage"
        :page-size="pageJson.pageSize"
        layout="prev, pager, next, jumper"
        :total="pageJson.total">
        </el-pagination>
      </section>
    </div>
    <UserManageModal
    class="modal"
    :modalType="modalType"
    :userInfo="userInfo"
    v-if="detailModalVisible"
    @hide="hideModal"
    ></UserManageModal>
    <UserAddModal
    class="modal"
    v-if="addModalVisible"
    :deparmentTree="deparmentTree"
    :roleId="roleId"
    @searchUser="searchUser"
    @save="addRoleUser"
    @hide="hideModal"
    ></UserAddModal>
  </main>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {user, department, role} from '@/api'
import UserManageModal from '@/components/user/UserManageModal.vue';
import UserAddModal from '@/components/role/UserAddModal.vue';
interface ItreeNode {
  label: string;
  meta: {
    id: number,
    keyCode?: string,
    parentCode?: string,
    selected?: boolean,
  };
  children?: any[];
}
@Component({
  components: {UserManageModal, UserAddModal},
})
export default class UserList extends Vue {
  @Prop() private readonly roleId!: any
  private searchName = '';
  private userList = [];
  private roleName = '';
  private pageValue = '1';
  private modalType = '';
  private userInfo = {};
  private addModalVisible = false;
  private currentUserList = [];
  private detailModalVisible = false;
  private deparmentTree: any[] = [];
  private selectedUser: any[] = []
  private pageJson = {
    total: this.userList.length,
    currentPage: 0,
    pageSize: 10,
  };
  @Watch('roleId') private roleChange(val: any, oldVal: any) {
    this.searchUser()
  }
  private created() {
    this.createDepartmentTree()
  }
  private async searchUser() {
    const res = await user.searchUserList({
        name: this.searchName,
        pageNo: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        roleId: this.roleId,
      });
    const { code, data, msg = ''} = res.data;
    if (code === 0) {
      this.currentUserList = data.records;
      this.pageJson.total = data.total;
    } else {
      this.$message.error(`成员获取失败`)
    }
  }
  private showDetailModal(row: any = {}) {
    this.modalType = 'detail'
    this.userInfo = row;
    this.detailModalVisible = true;
  }
  private hideModal() {
    this.detailModalVisible = false;
    this.addModalVisible = false;
  }
  private addUser() {
    if (this.roleId) {
      this.addModalVisible = true
    } else {
      this.$message.error('请选择一个角色再添加用户')
    }
  }
  private async delRoleUsers(row: any) {
    let userIds: any[] = []
    if (row.id) {
      userIds.push(row.id)
    } else {
      userIds = this.selectedUser.map((ele: any) => {
        return ele.id
      })
    }
    const res = await role.delRoleUser(this.roleId, userIds)
    const { code, msg = ''} = res.data
    if (code === 0) {
      this.searchUser()
      this.$message.success('删除角色成员成功')
    } else {
      this.$message.error(`${this.roleName}角色删除用户失败`)
    }
  }
  private async addRoleUser(users: any[]) {
    const userIds = users.map((ele: any) => {
      return ele.id
    })
    const res = await role.addRoleUsers(this.roleId, userIds)
    const { code, msg = '' } = res.data
    if (code === 0) {
      this.addModalVisible = false
      this.$message.success(`${this.roleName}角色添加用户成功`)
      this.searchUser()
    } else {
      this.$message.error(`${this.roleName}角色添加用户失败`)
    }
  }
  private handleCurrentChange(page: number) {
    Vue.set(this.pageJson, 'currentPage', page)
    this.searchUser()
  }
  private changePageValue(val: number) {
    Vue.set(this.pageJson, 'currentPage', 1)
    Vue.set(this.pageJson, 'pageSize', val * 10)
    this.searchUser()
  }
  private indexMethod(index: any) {
    return index + 1 + (this.pageJson.currentPage - 1) * this.pageJson.pageSize;
  }
  private async createDepartmentTree() {
    let res: any = await department.findAll()
    const list: ItreeNode[] = []
    res = res.data
    if (res.code === 0) {
      const { id, keyCode, name, parentCode, childList, selected } = res.data
      let children: any = []
      const setChildren = (nodeList: any) => {
            nodeList = nodeList.map((node: any) => {
              let nodeChildren: any[] = []
              if (node.childList) {
                nodeChildren = setChildren(node.childList)
              }
              return {
                label: node.name,
                children: nodeChildren,
                meta: {
                  id: node.id,
                  keyCode: node.keyCode,
                  parentCode: node.parentCode,
                  selected: node.selected,
                },
              }
            });
            return nodeList
          }
      children = setChildren(childList)
      list.splice(0, 1, {
        label: name,
        children,
        meta: {
          id,
          keyCode,
          parentCode,
          selected,
        },
      })
    } else {
      this.$message.error(`获取部门数据失败`)
    }
    this.deparmentTree = list
  }
  private handleSelectionChange(val: any) {
    this.selectedUser = val
  }
  private get permission() {
    return this.$store.state.permission
  }
}
</script>

<style lang="less" scoped>
main{
  /deep/ .cross_center .el-input__icon{
    line-height: 32px;
  }
  .search article{
    white-space: nowrap;
    font-size:14px;
    color:rgba(96,98,102,1);
  }
}
</style>