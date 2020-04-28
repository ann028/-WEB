<template>
  <main class="center">
    <section class="col add_content">
      <section class="add_head main_space">
        <section style="display: flex;align-items:center">
          <span>参与人</span>
          <!-- <img src="../../assets/img/databank/file.png" alt="" style="width: 24px;height:24px;margin-right: 20px"> -->
          <!-- {{selectObj['folderName']}} -->
        </section>
        <img src="../../assets/img/close.png" @click="hide">
      </section>
      <section class="add_mid flex1 flex">
        <section class="col mr10 deparment_box">
          <section class="box_title cross_center" >部门树</section>
          <section class="col mr10 deparment_box" style="overflow:scroll;flex-grow:1;background:#f5f6fa">
            <!-- <section class="box_title cross_center" >部门树</section> -->
            <section class="tree_box flex1" style="background:#f5f6fa">
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
        </section>
        <section class="col mr10 user_list flex1" >
          <section class="cross_center">
            账号姓名
            <el-input class="ml10" style="width:224px;" v-model="searchName"></el-input>
            <button class="btn btn_primary ml10" style="width:76px;height:32px;" @click="searchUser()">查询</button>
          </section>
          <el-table
            class="mt20"
            :data="currentUserList"
            :header-cell-style="{background:'#F5F6FA'}"
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
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <span style="cursor: pointer;color:#5792FC;" @click.stop="addGroup(scope.row)">添加</span>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <section class="col selected_box">
          <section class="box_title cross_center">参与人</section>
          <section class="selected_list flex1 cross_center col">
            <section class="user_item mb10 center" v-for="(item, index) in selectedGroup" :key="index">
              {{item.departmentName}}-{{item.name}} 
              <section class="item_del center" @click="delGroup(index)">-</section>
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
          <button v-if="!this.$route.query.operation || this.$route.query.operation === 'edit'" class="bottom_btn" @click="save">保存</button>
          <button class="bottom_btn" @click="hide">取消</button>
        </section>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {user, client } from '@/api'
  @Component
  export default class ClientSetting extends Vue {
    @Prop(Array) public readonly deparmentTree!: any[]
    @Prop() public readonly dailyId!: any
    private userList = [];
    private currentUserList = [];
    private searchName: any = ''
    // 分页相关数据
    private pageJson = {
      total: this.userList.length,
      currentPage: 0,
      pageSize: 10,
    };
    private pageValue = '1';
    private selectedGroup: any[] = []
    public handleNodeClick(data: any) {
      if (data.meta.parentCode === '0') {
        data.meta.id = null
      }
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
      // children = setChildren(childList)
      // list.splice(0, 1, {
      //   label: name,
      //   children,
      //   meta: {
      //     id,
      //     keyCode,
      //     parentCode,
      //     selected,
      //   },
      // })
    }
    private changePageValue(page: string) {
      this.pageJson.pageSize = parseInt(page, 10) * 10
      this.pageJson.currentPage = 1
      this.searchUser()
    }
    private handleCurrentChange(page: number) {
      Vue.set(this.pageJson, 'currentPage', page)
      this.searchUser()
    }
    private indexMethod(index: any) {
      return index + 1 + (this.pageJson.currentPage - 1) * this.pageJson.pageSize;
    }
    private hide() {
      this.$emit('hide')
    }
    private save() {
      this.$emit('save', this.selectedGroup)
    }
    private created() {
      this.searchUser()
      this.getParticipantById(this.$route.query.id || this.dailyId)
    }
    private addGroup(row: any) {
      if (this.selectedGroup.every((ele: any) => {
        return ele.id !== row.id
      })) {
        this.selectedGroup.push(row)
      } else {
        this.$message.warning(`${row.name} 已经在已选用户中`)
      }
    }
    private delGroup(index: number) {
      this.selectedGroup.splice(index, 1)
    }
    private getParticipantById(id: any) {
      client.getParticipantById(`id=${id}`).then((res) => {
        if (res.data.success) {
          this.selectedGroup = res.data.data.data
        }
      })
    }
  }
</script>

<style lang="less" scoped>
main {
  /deep/.el-tree-node>.el-tree-node__children{
    overflow: visible;
    background-color: transparent;
  }
  width: 100%;
  height: 100%;
  color:rgba(49,50,51,1);
  .add_content{
    min-width: 1140px;
    width: 70%;
    max-height: 90%;
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
      min-height: 220px;
      overflow-y: scroll;
      // overflow: hidden;
      .deparment_box{
        width: 200px;
        .tree_box{
          width: 100%;
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
        overflow: scroll;
        .user_item{
          font-size:14px;
          color:rgba(255,255,255,1);
          width:172px;
          min-height:40px;
          background:rgba(87,146,252,1);
          border-radius:4px;
          position: relative;
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
        margin:20px 0;
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
    .el-table{
      overflow-y: scroll
    }
    // .el-table::-webkit-scrollbar {display:none}
    .selected_list::-webkit-scroll{
      display: none
    }
  }
}
</style>