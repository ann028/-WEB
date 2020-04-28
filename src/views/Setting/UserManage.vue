<template>
  <main class="container col">
      <Step :stepName='message'></Step>
      <section class="flex1 flex">
        <section class="leftBox col">
            <section class="flex" >
              <el-tooltip class="item" effect="dark" content="添加子节点" v-if="permission.includes('prm2102')" placement="top-start">
                <el-button @click="handleDeparmentOperation('add')" class="btn dotBox" style="position:relative">
                  <img src="../../assets/img/addDot.png" style="width:24px;height:24px;position:absolute;left:8px;top:4px">
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑节点" v-if="permission.includes('prm2104')"  placement="top-start">
                <el-button @click="handleDeparmentOperation('edit')" class="btn dotBox" style="position:relative" >
                  <img src="../../assets/img/editDot.png" style="width:20px;height:20px;position:absolute;left:11px;top:4px">
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除节点" v-if="permission.includes('prm2103')" placement="top-start">
                <el-button @click="handleDeparmentOperation('del')" class="btn dotBox"  style="position:relative" >
                  <img src="../../assets/img/deleteDot.png" style="width:24px;height:24px;position:absolute;left:8px;top:4px">
                </el-button>
              </el-tooltip>  
            </section> 
            <section class="tree_box flex1">
              <el-tree
                :data="deparmentTree"
                node-key="id"
                default-expand-all
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
              </el-tree>
            </section>
        </section>
        <section class="right_box" style="flex-grow:1">
            <div style="margin-top:20px;display:flex;justify-content:space-between">
              <section class="flex">
                <section class=" m0" style="display:flex">
                  <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">账号姓名</span>
                  <el-input v-model="searchName" placeholder="请输入内容" class="line" style="margin-right:10px"></el-input>
                </section>
              <button class="btn btn_primary" style="width:76px;height:32px;" @click="searchUser()">查询</button>
              </section>
              <section class="flex">
                <button class="btn btn_primary" style="width:106px;height:32px;margin-right:20px" 
                @click="showDetailModal(null, 'add')" v-if="permission.includes('prm2105')">
                  <img src="../../assets/img/addition.png" alt="" style="width:16px;height:16px">
                  添加用户</button>
                <button 
                v-if="permission.includes('prm2107')"
                @click="delUsers" class="btn btn_succ center" style="width:78px;height:32px;margin-right:20px">
                  <img src="../../assets/img/icon_trash.png" style="width:16px;height:16px;margin-right:5px;">
                  删除
                </button>
                <button 
                v-if="permission.includes('prm2106')"
                class="btn btn_warning" style="width:106px;height:32px;"
                @click="setDepart">
                  设置部门
                </button>
              </section>
            </div>
            <div class="user_list">
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
                  <el-table-column label="操作" align="center" width="120"
                  v-if="permission.includes('prm2106') || permission.includes('prm2107')"
                  >
                    <template slot-scope="scope">
                      <div class="flex main_space">
                        <!-- <span style="cursor: pointer;color:#5792FC"
                        v-if="permission.includes('prm2106')"
                        @click.stop="showDetailModal(scope.row, 'edit')" class="flex">
                          <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                          编辑
                        </span>
                        <span style="cursor: pointer;color:#5792FC;"
                        v-if="permission.includes('prm2107')"
                        @click.stop="delUser(scope.row)" class="flex">
                          <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                          删除
                        </span> -->
                        <span  @click.stop="showDetailModal(scope.row, 'edit')" v-if="permission.includes('prm2106')"  style="color:#5792FC;cursor: pointer;margin-right: 5px">
                          <img src="../../assets/img/editor.png" alt="">
                          编辑
                        </span>
                        <span @click.stop="delUser(scope.row)"  v-if="permission.includes('prm2107')"  style="color:#5792FC;cursor: pointer">
                          <img src="../../assets/img/trash.png" alt="">
                          删除
                        </span>
                      </div>
                    </template>
                  </el-table-column>
              </el-table>
            </div>
        </section>
      </section>
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
    <el-dialog title="选择部门" :visible.sync="departmentDialogVisible">
      <el-select 
        v-model="departmentDialog.label" 
        clearable placeholder="请选择部门"
        class='cross_center'>
          <el-option 
          :value="departmentDialog.meta.id" 
          style="height: auto; padding: 0;">
            <el-tree 
            :data="deparmentTree" 
            node-key="id"
            highlight-current 
            @node-click="dialogDeparmentClick"></el-tree>
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="departmentDialogVisible = false, searchUser()">取 消</el-button>
          <el-button type="primary" @click="handleSetUserDepartment">确 定</el-button>
        </div>
    </el-dialog>
    <UserManageModal
    class="modal"
    :modalType="userModalType"
    :userInfo="userInfo"
    :deparmentTree="deparmentTree"
    :selectedNode = "selectedNode"
    v-if="userModalVisible"
    @hide="hideModal"
    @save="addOrUpdateUser"
    ></UserManageModal>
    <DeparmentModal
    class="modal"
    @hide="hideModal"
    @save="addOrUpdateDeparment"
    v-if="deparmentModalVisible"
    :modalType="departmentModalType"
    :departmentInfo="departmentInfo"
    ></DeparmentModal>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import Step from '@/components/Step.vue';
import UserManageModal from '@/components/user/UserManageModal.vue';
import DeparmentModal from '@/components/user/DeparmentModal.vue';
import { user, department } from '@/api';
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
  components: {
    Step,
    UserManageModal,
    DeparmentModal,
  },
})
export default class UserManage extends Vue {
  private message = ['账户设置', '用户管理'];
  private departmentDialog = {
    label: '',
    meta: {
      id: NaN,
    },
  };
  private searchName = '';
  private userList = [];
  private selectedUser = [];
  private pageValue = '1';
  private userModalType = '';
  private departmentModalType = '';
  private userInfo = {};
  private departmentInfo = {};
  private currentUserList = [];
  private departmentDialogVisible = false;
  private userModalVisible = false;
  private deparmentModalVisible = false;
  private selectedNode: ItreeNode = {
    label: '',
    meta: {
      id: NaN,
    },
  };
  private deparmentTree: any[] = [];
  // 分页相关数据
  private pageJson = {
    total: this.userList.length,
    currentPage: 0,
    pageSize: 10,
  };
  private dialogVisible = false;
  public created() {
    this.searchUser()
  }
  public async searchUser(departmentId?: number) {
    if (!departmentId) {
      this.createDepartmentTree()
    }
    const searchParam = {
      name: this.searchName,
      pageNo: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
    }
    let res: any
    if (departmentId) {
      res = await user.searchUserList({
        ...searchParam,
        departmentId,
      });
    } else {
      res = await user.searchUserList({
        ...searchParam,
      });
    }
    res = res.data;
    const { code, data, success} = res;
    if (success) {
      this.currentUserList = data.records;
      this.pageJson.total = data.total;
    }
  }
  public showDetailModal(row: any = {}, type: string) {
    switch (type) {
      case 'edit':
        this.userModalType = 'edit';
        break;
      case 'add':
        this.userModalType = 'add';
        break;
      default:
        this.userModalType = 'detail';
        break;
    }
    this.userModalVisible = true;
    this.userInfo = row;
  }
  public hideModal() {
    this.userModalVisible = false;
    this.deparmentModalVisible = false
  }
  public async createDepartmentTree() {
    let res: any = await department.findAll()
    const list: ItreeNode[] = []
    res = res.data
    if (res.code === 0) {
      const { id, keyCode, name, parentCode, childList = [], selected } = res.data
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
  public async addOrUpdateUser(userAccountInfo: any) {
    if (userAccountInfo.password !== '●●●●●●') {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if (!reg.test(userAccountInfo.password)) {
        this.$message.error(`密码由6~12为数字字母组合`)
        return false
      }
    }
    const res: any = await user.addOrUpdateUser(userAccountInfo)
    const {code, msg = ''} = res.data
    if (code === 0) {
      this.$message.success('操作成功')
      this.userModalVisible = false
      this.searchUser()
    } else {
      this.$message.error(`操作失败`)
    }
  }
  public async delUser(row: any) {
    let res: any = await user.delUser(row.id)
    res = res.data
    if (res.code === 0) {
      this.$message.success('删除成功')
      this.searchUser()
    } else {
      this.$message.error(`操作失败，${res.msg}`)
    }
  }
  public async delUsers() {
    if (this.selectedUser.length) {
      const delUsers = this.selectedUser.map(async (ele: any) => {
        return user.delUser(ele.id)
      })
      const res: any[] = await Promise.all(delUsers)
      if (res.every((ele: any) => {
        return ele.data.code === 0
      })) {
        this.$message.success('批量操作成功')
        this.searchUser()
      } else {
        this.$message.error('操作失败')
      }
    } else {
      this.$message.warning(`请选择要删除的用户`)
      return false
    }
  }
  public async addOrUpdateDeparment(departmentInfoParam: any) {
    if (departmentInfoParam.name === '') {
      this.$message.warning(`请将部门名称填写完整`)
      return false
    } else {
      let res: any
      if (departmentInfoParam.id) {
        res = await department.addOrUpdate(departmentInfoParam)
      } else {
        const data = {
          keyCode: '',
          name: departmentInfoParam.name,
          parentCode: this.selectedNode.meta.keyCode,
        }
        res = await department.addOrUpdate(data)
      }
      // const res: any = await department.addOrUpdate(departmentInfoParam)
      const {code, msg = ''} = res.data
      if (code === 0) {
        this.$message.success('操作成功')
        this.createDepartmentTree()
        this.searchUser(departmentInfoParam.id)
        this.hideModal()
        this.selectedNode.meta.id = NaN
        this.selectedNode.label = ''
      } else {
        this.$message.error(`${msg},操作失败`)
      }
    }
  }
  public async delDeparment() {
    let res: any = await department.del(this.selectedNode.meta.id)
    res = res.data
    const {code, msg = '删除成功'} = res
    if (code === 0) {
      this.$message.success('删除成功')
      this.searchUser()
      this.selectedNode.label = ''
      this.selectedNode.meta.id = NaN
    } else {
      this.$message.error(`${msg}`)
    }
  }
  public async findDepartment() {
    if (this.selectedNode.meta.id) {
      const res: any = await department.findById(this.selectedNode.meta.id)
      const {code, data, msg = '获取成功'} = res.data
      if (code === 0) {
        this.departmentInfo = data
      } else {
        this.$message.error(`获取部门信息失败`)
        this.deparmentModalVisible = false
      }
      this.deparmentModalVisible = true
    } else {
      this.$message.warning(`请选择要编辑的节点`)
      return false
    }
  }
  private handleDeparmentOperation(type: string) {
    switch (type) {
      case 'add':
        this.departmentModalType = 'add'
        if (this.selectedNode.label === '') {
          this.$message.warning(`请先选择上级部门`)
          return false
        } else {
          this.deparmentModalVisible = true
        }
        this.departmentInfo = {}
        break
      case 'edit':
        this.departmentModalType = 'edit'
        this.findDepartment()
        // this.deparmentModalVisible = true
        break
      case 'del':
        if (this.selectedNode.label && this.selectedNode.meta.id) {
          this.$confirm(
          `此操作将删除部门： ${this.selectedNode.label} ，是否继续？`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            this.delDeparment()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          })
        } else {
          this.$message.warning(`请选择要删除的节点`)
          return false
        }
        break
    }
  }
  // 设置部门
  private setDepart() {
    const userIds = this.selectedUser.map((ele: any) => {
      return ele.id
    })
    if  (userIds.length === 0) {
      this.$message.warning(`请先选择用户`)
      return false;
    } else {
      this.departmentDialogVisible = true
      this.departmentDialog.label = ''
      this.departmentDialog.meta.id = NaN
      this.createDepartmentTree()
    }
  }
  private async handleSetUserDepartment() {
    const departmentId = this.departmentDialog.meta.id
    const userIds = this.selectedUser.map((ele: any) => {
      return ele.id
    })
    if (departmentId) {
      const res: any = await user.setUserDepartment(departmentId, userIds)
      const { code, data, msg = '成功' } = res.data
      if (code === 0) {
        this.$message.success('设置部门成功')
        this.departmentDialogVisible = false
        this.searchUser()
      } else {
        this.$message.error(`设置部门失败`)
      }
    } else {
      this.$message.warning(`请选择部门`)
      return false
    }
  }
  private handleNodeClick(data: any) {
    this.selectedNode = data
    this.pageJson.currentPage = 1
    this.searchUser(data.meta.id)
  }
  private dialogDeparmentClick(data: any) {
    this.departmentDialog = data
  }
  private handleSelectionChange(val: any) {
    this.selectedUser = val
  }
  private handleCurrentChange(page: number) {
    Vue.set(this.pageJson, 'currentPage', page)
    this.searchUser(this.selectedNode.meta.id ? this.selectedNode.meta.id : 0)
  }
  private changePageValue(val: number) {
    Vue.set(this.pageJson, 'currentPage', 1)
    Vue.set(this.pageJson, 'pageSize', val * 10)
    this.searchUser()
  }
  private indexMethod(index: any) {
    return index + 1 + (this.pageJson.currentPage - 1) * this.pageJson.pageSize ;
  }
  private get permission() {
    return this.$store.state.permission
  }
}
</script>
<style lang="less" scoped>
main{
  min-height: 100%;
  /deep/.cross_center .el-input__icon{
    line-height: 32px;
  }
  /deep/.el-tree-node__content{
    width: 100%;
  }
  /deep/.el-tree-node>.el-tree-node__children{
    overflow: visible;
    background-color: transparent;
  }
  .leftBox{
    width:200px;
    .dotBox{
      width:32px;
      height:32px;
      background:rgba(96,98,102,1);
      border-radius:4px;
      margin:24px 0  20px 20px;
    }
    .tree_box{
      width: 100%;
      overflow-x:scroll;
    }
    .tree_box,
    .tree_box .el-tree{
      background-color: rgba(245,246,250,1);
    }
  }
  .user_list{
    padding:0 20px;
    box-sizing: border-box;
    margin-top:20px;
  }
}
</style>