<template>
  <main>
    <!-- {{roleId}} -->
    <section class="main_space">
      <section>
        <el-input v-model="searchInfo.name" placeholder="姓名/账号" class="input_width"></el-input>
        <button class="btn primary_btn" @click="onSearchButtonClick">查询</button>
      </section>
      <section class="flex">
        <section class="cross_center" style="cursor: pointer;" @click="addUserDialog = true">
          <span style="font-size: 14px;">添加用户</span>
          <img src="../../assets/img/user/user-plus.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;">
        </section>
        <section class="cross_center" style="margin-left: 34px; cursor: pointer;">
          <span style="font-size: 14px;">移除</span>
          <img src="../../assets/img/project/trash-2.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;">
        </section>
      </section>
    </section>
    <el-table
      :data="userData"
      style="width: 100%; height: auto; margin-top: 26px;"
      ref="multipleTable"
      :header-cell-style="{background:'#FFF9F3'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        align="center">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        align="center">
      </el-table-column>
      <el-table-column
        prop="direct"
        label="账号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="matters"
        label="手机"
        align="center">
      </el-table-column>
      <el-table-column
        prop="place"
        label="邮箱"
        align="center">
      </el-table-column>
      <el-table-column
        prop="leader"
        label="身份"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <span>移出</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户弹框 -->
    <!-- <el-dialog
      title="添加用户"
      :visible.sync="addUserDialog"
      width="1000px">
      <div class="leaderDialog">
          <section>
            <el-input v-model="searchUserName" placeholder="账号姓名" class="input_width"></el-input>
            <button class="btn primary_btn">查询</button>
          </section>
          <section class="flex mt20">
            <section class="left leader_table">
              <el-table
                :data="userList"
                style="width: 100%"
                :header-cell-style="{background:'rgba(237, 235, 233, 0.3)'}"
                max-height="250"
                ref="multipleTable">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="index"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="账号">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  width="150"
                  label="手机">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" >添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </section>
            <section class="right selected_person">
              <span style="font-weight: bold;">已选用户</span>
              <div class="selected_personList">
                <div class="selected_item">
                  <span style="color: #F88200; line-height: 32px; text-align: center;">债券1部-利泰南风</span>
                  <div class="closeIcon">×</div>
                </div>
              </div>
            </section>
          </section>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="leaderDialog = false">保存</el-button>
        <el-button @click="leaderDialog = false" style="margin-left: 90px;">取 消</el-button>
      </span>
    </el-dialog> -->
    <add-user
    class="modal"
    v-if="addUserDialog"
    @hide="hideModal"
    @save="saveModal">
    </add-user>
  </main>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import addUser from '@/components/user/addUser.vue'

@Component({
  components: {
    addUser,
  },
})
export default class UserList extends Vue {
  @Prop() private readonly roleId!: any
  private searchInfo: any = {
    name: '',
  }
  private userData: any = [
    {
      name: 'zs',
    },
  ]
  private userList: any = []
  private addUserDialog: boolean = false
  private searchUserName: any = ''
  private onSearchButtonClick() {
    console.log('chaxun')
  }
  private handleSelectionChange(val: any) {
    console.log(val)
  }
  private hideModal() {
    this.addUserDialog = false;
  }
  private saveModal() {
    console.log('save')
  }
}
</script>
<style lang="less" scoped>
main{
  .leaderDialog{
    .leader_table{
      flex: 1;
      flex-shrink: 0;
    }
    .selected_person{
      width: 270px;
      margin-left: 20px;
      padding: 10px;
      box-sizing: border-box;
      .selected_personList{
        // margin-top: 10px;
        height: 400px;
        background: #FFFCF9;
        padding: 16px;
        box-sizing: border-box;
        // overflow-y: scroll;
        .selected_item{
          width: 150px;
          height: 32px;
          border: 1px solid #F88200;
          margin: 16px 16px 0;
          position: relative;
        }
      }
    }
    .closeIcon{
      width: 14px;
      height: 14px;
      background: #F88200;
      color: #ffffff;
      border-radius: 50%;
      text-align: center;
      line-height: 14px;
      position: absolute;
      top: 0;
      right: -20px;
      cursor: pointer;
    }
  }
  // .modal{
  //   z-index: 9;
  //   display: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  //   height: 100vh;
  //   background: rgba(0,0,0,0.3)
  // }
  .modal{
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .3);
}
}
</style>