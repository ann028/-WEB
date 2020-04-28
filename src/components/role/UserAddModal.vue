<template>
  <main class="center">
    <section class="col add_content">
      <section class="add_head main_space">
        添加用户
        <img src="../../assets/img/close.png" @click="hide">
      </section>
      <section class="add_mid flex1 flex">
        <section class="col mr10 deparment_box">
          <section class="box_title cross_center">部门树</section>
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
        <section class="col mr10 user_list flex1">
          <section class="cross_center">
            账号姓名
            <el-input class="ml10" style="width:224px;" v-model="searchName"></el-input>
            <button class="btn btn_primary ml10" style="width:76px;height:32px;" @click="searchUser()">查询</button>
          </section>
          <el-table
            class="mt20"
            :data="currentUserList"
            :header-cell-style="{background:'#F5F6FA'}"
            @selection-change="handleSelectionChange"
            width="700">
            <el-table-column
              type="index"
              align="center"
              :index="indexMethod"
              width="50"
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <span style="cursor: pointer;color:#5792FC;"
                @click.stop="addUser(scope.row)">
                  <img src="../../assets/img/addteam1.png" style="width:16px;height:16px">
                  添加
                </span>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <section class="col selected_box">
          <section class="box_title cross_center">已选用户</section>
          <section class="selected_list flex1 cross_center col">
            <section class="user_item mb10 center" v-for="(item, index) in selectedUser" :key="index">
              {{item.departmentName}}-{{item.name}} 
              <section class="item_del center" @click="delUser(index)">-</section>
            </section>
          </section>
        </section>
      </section>
      <div class="main_space pagination_box">
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
      <section class="add_foot flex center">
        <section class="btns">
          <button class="bottom_btn" @click="save">保存</button>
          <button class="bottom_btn" @click="hide">取消</button>
        </section>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {user } from '@/api'
  @Component
  export default class UserAddModal extends Vue {
    @Prop(Array) private readonly deparmentTree!: any[]
    @Prop(Number) private readonly roleId!: number
    private selectedUser: any[] = []
    private searchName = ''
    private userList = [];
    private currentUserList = [];
    // 分页相关数据
    private pageJson = {
      total: this.userList.length,
      currentPage: 0,
      pageSize: 10,
    };
    private pageValue = '1';
    public hide() {
      this.$emit('hide');
    }
    public save() {
      this.$emit('save', this.selectedUser)
    }
    public handleNodeClick(data: any) {
      this.searchUser(data.meta.id)
    }
    public async searchUser(departmentId?: number) {
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
    private addUser(row: any) {
      if (this.selectedUser.every((ele: any) => {
        return ele.id !== row.id
      })) {
        this.selectedUser.push(row)
      } else {
        this.$message.warning(`${row.name} 已经在已选用户中`)
      }
    }
    private delUser(index: number) {
      this.selectedUser.splice(index, 1)
    }
    private indexMethod(index: any) {
      return index + 1 + (this.pageJson.currentPage - 1) * this.pageJson.pageSize;
    }
    private handleCurrentChange(page: number) {
      Vue.set(this.pageJson, 'currentPage', page)
      this.searchUser()
    }
    private async created() {
      this.searchUser()
      const res = await user.searchUserList({
        name: '',
        pageNo: 1,
        pageSize: 500,
        roleId: this.roleId,
      });
      const { code, data, msg = ''} = res.data;
      if (code === 0) {
        this.selectedUser = data.records;
      } else {
        this.$message.error(`已有成员获取失败`)
      }
    }
    private handleSelectionChange(val: any) {
      this.selectedUser = val
    }
  }
</script>

<style lang="less" scoped>
/deep/ .el-tree-node>.el-tree-node__children{
  overflow: visible;
  background-color: transparent;
}
main {
  width: 100%;
  height: 100%;
  color:rgba(49,50,51,1);
  .add_content{
    min-width: 1140px;
    width: 70%;
    height: 70%;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    .box_title{
      height: 32px;
      margin-bottom: 20px;
    }
    .add_head{
      padding: 20px;
      border-bottom: 1px solid rgba(234,234,234,1);
      img{
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
    .add_mid {
      color:rgba(96,98,102,1);
      box-sizing: border-box;
      padding: 20px;
      overflow-y: scroll;
      overflow: hidden;
      .deparment_box{
        width: 200px;
        .tree_box{
          width: 100%;
          overflow: scroll;
        }
        .tree_box,
        .tree_box .el-tree{
          background-color: rgba(245,246,250,1);
        }
        .el-tree{
          padding: 20px;
        }
      }
    }
    .pagination_box{
      padding: 0 20px 20px;
      box-sizing: border-box;
    }
    .selected_box{
      width: 212px;
      .selected_list{
        background:rgba(245,246,250,1);
        padding: 20px 0;
        overflow-y: scroll;
        .user_item{
          font-size:14px;
          color:rgba(255,255,255,1);
          width:172px;
          min-height:40px;
          background:rgba(87,146,252,1);
          border-radius:4px;
          position: relative;
          display: flex;
          flex-shrink: 0;
          word-break:break-all;
          padding: 10px;
          box-sizing: border-box;
          line-height: 20px;
          .item_del{
            cursor: pointer;
            position: absolute;
            right: -9px;
            box-sizing: border-box;
            padding: 0 2px 2px 0;
            border-radius: 50%;
            width:18px;
            height:18px;
            background:rgba(245,108,108,1);
          }
        }
      }
    }
    .add_foot{
      height: 80px;
      border-top: 1px solid rgba(234,234,234,1);
      .btns{
        font-size:14px;
        .bottom_btn{
          border-radius:4px;
          padding: 10px 32px;
          cursor: pointer;
        }
        .bottom_btn:nth-child(1){
          color:rgba(255,255,255,1);
          background:rgba(87,146,252,1);
          border:1px solid rgba(87,146,252,1);
        }
        .bottom_btn:nth-child(2){
          margin-left: 80px;
          color:rgba(144,147,153,1);
          background:rgba(255,255,255,1);
          border:1px solid rgba(192,196,204,1);
        }
      }
    }
  }
}
.el-table{
  overflow-y: scroll;
}
</style>