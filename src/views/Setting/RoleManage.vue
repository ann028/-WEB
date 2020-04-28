<template>
  <main class="container col" style="overflow-x: auto;">
      <Step :stepName='message' class="mb20"></Step>
      <section class="flex role_content">
        <section class="col">
          <section class="flex mb20">
            <el-tooltip class="item" effect="dark" content="添加角色" placement="top"
            v-if="permission.includes('prm2202')">
              <button @click="handleRoleOperation('add')" class="operation_btn center">
                <img src="../../assets/img/addUser.png">
              </button>
            </el-tooltip>
            <el-tooltip 
            v-if="permission.includes('prm2203')"
            class="item" effect="dark" content="删除角色" placement="top">
              <button @click="handleRoleOperation('del')" class="operation_btn center">
                <img src="../../assets/img/delUser.png">
              </button>
            </el-tooltip>
            <el-tooltip
            v-if="permission.includes('prm2204')"
            class="item" effect="dark" content="编辑角色" placement="top">
              <button @click="handleRoleOperation('edit')" class="operation_btn center">
                <img src="../../assets/img/editDot.png">
              </button>
            </el-tooltip>
          </section>
          <section class="tree_box pd20">
            <article class="role_item" :class="{role_selected : selectedRole.id === item.id}"
            v-for="(item, index) in roleList" :key="index" @click="handleRoleClick(item)">
              {{item.name}}
            </article>
          </section>
        </section>
        <section class="right_box ml20 flex1">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户列表" name="userList">
              <UserList ref="userList"
              :roleId="selectedRole.id"
              ></UserList>
            </el-tab-pane>
            <el-tab-pane label="权限维护" name="roleSetting" >
              <RoleSetting 
              @save="save" 
              :rolePermission="treeData"
              :roleId="selectedRole.id"></RoleSetting>
            </el-tab-pane>
          </el-tabs>
        </section>
      </section>
      <el-dialog :title="dialogTitle" :visible.sync="roleDialogVisible"
      width="40%" center>
        <article class="cross_center">
          <span>角色名称</span>
          <el-input class="ml20 flex1" v-model="selectedRole.name"></el-input>
        </article>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrUpdateRole">确 定</el-button>
        </div>
      </el-dialog>
  </main>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue} from 'vue-property-decorator';
import Step from '@/components/Step.vue';
import UserList from '@/views/Setting/UserList.vue'
import RoleSetting from '@/views/Setting/RoleSetting.vue'
import { role as roleApi } from '@/api'
interface IroleInfo {
  description ?: string;
  id ?: number,
  name : string,
  state ?: string
}

interface ItreeNode {
  label: string;
  meta: {
    built: boolean,
    id: number,
    keyCode: string,
    parentCode: string,
    type: number,
    selected: boolean,
  };
  children?: any[];
}
@Component({
    components: {
      Step,
      UserList,
      RoleSetting,
    },
  })
export default class RoleManage extends  Vue {
  public roleList = [];
  private message = ['账户设置', '角色管理'];
  private activeName = 'userList';
  private selectedRole = { id: NaN, name: ''};
  private dialogTitle = '';
  private roleDialogVisible = false;
  private treeData = []
  public async created() {
    this.getRoleList()
    this.findRolePermission()
  }
  public async getRoleList() {
    const res: any = await roleApi.findRoleList()
    const {code, data} = res.data
    if (code === 0) {
      this.roleList = data
      this.$message.success('角色列表获取成功')
    } else {
      this.$message.error(`获取角色列表失败${res.msg}`)
    }
  }
  public handleRoleClick(item: any) {
    if (this.selectedRole.id === item.id) {
      item = { id: NaN, name: ''}
    }
    this.selectedRole = JSON.parse(JSON.stringify(item))
    this.findRolePermission()
  }
  private async findRolePermission() {
    const res = await roleApi.findRolePermission(this.selectedRole.id)
    const { code, msg = '', data} = res.data
    let rolePermission: any
    if (code === 0) {
      rolePermission = data
    } else {
      this.$message.error('获取角色权限失败')
    }
    const list: ItreeNode[] = []
    const setTree = (nodeList: any) => {
      nodeList = nodeList.map((node: any) => {
        let nodeChildren: any[] = []
        if (node.childList.length) {
          nodeChildren = setTree(node.childList)
        }
        return {
          label: node.name,
          children: nodeChildren,
          id: node.id,
          built: node.built,
          keyCode: node.keyCode,
          parentCode: node.parentCode,
          type: node.type,
          url: node.url,
          selected: node.selected,
        }
      });
      return nodeList
    }
    this.treeData = setTree(rolePermission)
  }
  private handleRoleOperation(type: string) {
    switch (type) {
      case 'add':
        this.dialogTitle = '新增角色'
        this.selectedRole = { id: NaN, name: ''}
        this.roleDialogVisible = true
        break
      case 'edit':
        if (this.selectedRole.id) {
          this.dialogTitle = '修改角色'
          this.roleDialogVisible = true
        } else {
          this.$message.warning('请选择一个角色再点击编辑')
        }
        break
      case 'del':
        if (this.selectedRole.id) {
          this.$confirm(
            `此操作将删除角色：${this.selectedRole.name}`,
            '删除角色',
              {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
          })
          .then(() => {
            this.delRole(this.selectedRole.name)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          })
        } else {
          this.$message.warning('请选择一个角色再删除')
        }
        break
    }
  }
  private async addOrUpdateRole() {
    const res: any = await roleApi.addorUpdateRole(this.selectedRole)
    const { code, msg = ''} = res.data
    if (code === 0) {
      this.$message.success('操作成功')
      this.roleDialogVisible = false
      this.getRoleList()
    } else {
      this.$message.error(`操作失败`)
    }
  }
  private async delRole(roleName: string) {
    const res: any = await roleApi.delRole(this.selectedRole.id)
    const {code, msg = ''} = res.data
    if (code === 0) {
      this.$message.success(`成功删除角色：${roleName}`)
      this.selectedRole = { id: NaN, name: ''}
      this.getRoleList()
    } else {
      this.$message.error(`操作失败`)
    }
  }
  private async save(nodes: any) {
    if (!this.selectedRole.id) {
      this.$message.warning('请选择一个角色！')
    } else {
      const trees = nodes.map((ele: any) => {
        return {
          built: ele.built,
          childList: ele.children,
          id: ele.id,
          keyCode: ele.keyCode,
          parentCode: ele.parentCode,
          name: ele.label,
          type: ele.type,
          url: ele.url,
          selected: true,
        }
      })
      const res = await roleApi.addRolePermission({
        roleId: this.selectedRole.id,
        trees,
      })
      const { code, msg = '' } = res.data
      if (code === 0) {
        this.$message.success('权限设置成功！')
      } else {
        this.$message.error(`权限设置失败`)
      }
    }
  }
  private get permission() {
    return this.$store.state.permission
  }
}
</script>
<style lang="less" scoped>
main{
  .role_content{
    height: 100%;
    .operation_btn{
      cursor: pointer;
      margin-left: 16px;
      width:32px;
      height:32px;
      background:rgba(96,98,102,1);
      border-radius:4px;
      img{
        width:20px;
        height:20px;
      }
    }
    .operation_btn:nth-child(1){
      margin-left: 0;
    }
    .tree_box{
      width:250px;
      height:100%;
      background:rgba(245,246,250,1);
      box-sizing: border-box;
    }
    .role_item{
      background:rgba(248,250,254,1);
      border-radius:4px;
      border:1px solid rgba(87,146,252,1);
      cursor: pointer;
      width:100%;
      min-height:40px;
      box-sizing: border-box;
      margin-bottom: 10px;
      font-size: 14px;
      color:rgba(87,146,252,1);
      text-align: center;
      line-height: 40px;
      transition: .5s all;
    }
    .role_selected{
      color:rgba(255,255,255,1);
      background:rgba(87,146,252,1);
      border:1px solid rgba(87,146,252,1);
    }
    .right_box{
      // overflow-x: scroll;
    }
  }
}
.item {
  margin: 4px;
}
</style>>