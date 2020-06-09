<template>
  <main class="content">
    <Breadcrumb :tabName = 'tabName'></Breadcrumb>
    <!-- <tree-table :data="data" :columns="columns" border @getAuth="getAuth"></tree-table> -->
    <div class="bg flex1 flex" style="padding: 24px; box-sizing: border-box;">
      <section class="roleList col" style="flex-shrink: 0;">
        <section>
          <el-tooltip class="item" effect="dark" content="添加角色" placement="top-start">
            <img src="../../assets/img/draft/add.png" @click="handleRoleOperation('add')" style="cursor: pointer;">
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除角色" placement="top-start">
            <img src="../../assets/img/draft/trash (1).png" @click="handleRoleOperation('del')" style="margin-left: 24px; cursor: pointer;">
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑角色" placement="top-start">
            <img src="../../assets/img/draft/edit-fill.png" @click="handleRoleOperation('edit')" style="margin-left: 24px; cursor: pointer;">
          </el-tooltip>
        </section>
         <!-- class="flex1" style="background: #FFF9F3; margin-top: 24px;" -->
        <div style="height: 100%; margin-top: 24px;">
          <article class="role_item" :class="{role_selected : selectedRole.id === item.id}" v-for="(item, index) in roleList" :key="index" @click="handleRoleClick(item)">
            {{item.roleName}}
          </article>
        </div>
      </section>
      <section class="flex1 ml20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="userList">
            <user-list :roleId = "selectedRole.id"></user-list>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="role">
            <role-setting :roleId = "selectedRole.id"></role-setting>
          </el-tab-pane>
        </el-tabs>
      </section>
    </div>
   
   <el-dialog
    :title="dialogTitle"
    :visible.sync="roleDialogVisible"
    width="30%">
    <el-input v-model="dialogName" placeholder="请输入内容" ></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="roleDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="roleDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import treeTable from '@/components/treeTableAuthor/index.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import UserList from './UserList.vue'
import RoleSetting from './RoleSetting.vue'

@Component({
  components: {
    treeTable,
    Breadcrumb,
    UserList,
    RoleSetting,
  },
})
export default class RoleManage extends Vue {
  //  private columns: any = [
  //   {
  //     text: '菜单列表',
  //     value: 'description',
  //     width: 200,
  //     option: 'sonData1',
  //   },
  //   {
  //     text: '功能权限',
  //     value: 'sonData1',
  //     option: 'sonData1',
  //     act: 'act',
  //   },
  // ]
  // private data: any = [
  //   {
  //     type: 0,
  //     'checked': false,
  //     'id': '1',
  //     'description': '用户管理',
  //     isIndeterminate: false,
  //     checkAll: false,
  //     act: '全选',
  //     children: [
  //       {
  //         type: 1,
  //         id: 6,
  //         'description': '用户列表',
  //         'parentId': '-1',
  //         'checked': false,
  //         selectchecked: ['7'],
  //         checkAll: false,
  //         isIndeterminate: false,
  //         'sonData1': [
  //           {
  //             type: 2,
  //             'description': '用户新增',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '7',
  //           },
  //           {
  //             type: 2,
  //             'description': '用户修改',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '8',
  //           },
  //           {
  //             type: 2,
  //             'description': '用户删除',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '9',
  //           }
  //         ]
  //       },
  //       {
  //         type: 1,
  //         id: 13,
  //         'description': '角色列表',
  //         'parentId': '-1',
  //         'checked': false,
  //         selectchecked: ['10', '11', '12'],
  //         checkAll: false,
  //         isIndeterminate: false,
  //         'sonData1': [
  //           {
  //             type: 2,
  //             'description': '角色授权',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '10',
  //           },
  //           {
  //             type: 2,
  //             'description': '角色修改',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '11',
  //           },
  //           {
  //             type: 2,
  //             'description': '角色删除',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '12',
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     type: 0,
  //     'checked': false,
  //     'id': '2',
  //     'description': '设备管理',
  //     isIndeterminate: false,
  //     checkAll: false,
  //     act: '全选',
  //     children: [
  //       {
  //         type: 1,
  //         id: 6,
  //         'description': '设备列表',
  //         'parentId': '-1',
  //         'checked': false,
  //         selectchecked: [],
  //         checkAll: false,
  //         isIndeterminate: false,
  //         'sonData1': [
  //           {
  //             type: 2,
  //             'description': '设备新增',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '17',
  //           },
  //           {
  //             type: 2,
  //             'description': '设备修改',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '18',
  //           },
  //           {
  //             type: 2,
  //             'description': '设备删除',
  //             'parentId': '6',
  //             'checked': false,
  //             'id': '19',
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]
  // private getAuth(data: any) {
  //   let opt: any = []
  //   data.forEach((val: any) => {
  //     opt.push(val.id)
  //     if (val.children) {
  //       val.children.forEach((el: any) => {
  //         console.log(val.id)
  //         if (el.selectchecked.length) {
  //           opt.push(el.id)
  //           opt.push(el.selectchecked)
  //         }
  //       })
  //     }
  //   })
  //   console.log(data)
  //   opt = opt.join().split(',').filter((n: any) => { return n })
  //   console.log(opt)
  // }
  private tabName: any = ['账户管理', '角色管理']
  private activeName = "userList"
  private selectedRole = { id: NaN, roleName: ''};
  private dialogTitle: string = ''
  private dialogName: string = ''
  private roleDialogVisible: boolean = false
  private handleClick(tab: any, event: any) {
    console.log(tab)
    this.activeName = tab.name
  }
  private roleList: any = [
    {
      id: 1,
      roleName: '默认角色',
    },
  ]
  private handleRoleClick(item: any) {
    console.log(item)
    if (item.id === this.selectedRole.id) {
      this.selectedRole = { id: NaN, roleName: ''}
    }
    this.selectedRole = JSON.parse(JSON.stringify(item))
  }
  private handleRoleOperation(type: string) {
    console.log(type)
    switch (type) {
      case 'add':
        this.dialogTitle = '添加角色';
        this.roleDialogVisible = true;
        this.selectedRole = { id: NaN, roleName: ''};
        this.dialogName = ''
        break;
      case 'edit':
        if (this.selectedRole.id) {
          this.dialogTitle = '编辑角色';
          // this.selectedRole = { id: NaN, roleName: ''};
          this.roleDialogVisible = true;
          this.dialogName = this.selectedRole.roleName;
        } else {
          this.$message.warning('请选择一个角色再进行编辑')
        }
        break;
      case 'del':
        this.dialogTitle = '删除角色'
        if (this.selectedRole.id) {
          this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
        } else {
          this.$message.warning(`请选择一个角色再进行删除`)
        }
        break;
    }
  }
}
</script>
<style lang="less" scoped>
main{
  .roleList{
    width: 200px;
    height: 100%;
  }
  .role_item{
    background:#FFF9F3;
    border-radius:4px;
    border:1px solid #F88200;
    cursor: pointer;
    width:100%;
    min-height:40px;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-size: 14px;
    color:#F88200;
    text-align: center;
    line-height: 40px;
    transition: .5s all;
  }
  .role_selected{
    color:rgba(255,255,255,1);
    background:#F88200;
    border:1px solid #F88200;
  }
  /deep/.el-dialog__body{
    padding: 10px 20px;
  }
}
</style>