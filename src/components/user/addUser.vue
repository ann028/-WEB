<template>
  <main class="center">
    <section  class="addUser">
      <!-- <div> -->
      <section class="main_space" style="border-bottom: 1px solid #EDEBE9; padding-bottom: 10px;">
        <span>添加用户</span>
        <span style="font-size: 20px; cursor: pointer;" @click="hide">×</span>
      </section>
      <section class="add_title mt20">
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
                <el-button type="text" @click="addUser(scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <section class="right selected_person">
          <span style="font-weight: bold;">已选用户</span>
          <div class="selected_personList">
            <div class="selected_item" v-for="(item, index) in selectedUser" :key="index">
              <span style="color: #F88200; line-height: 32px; text-align: center;">{{item.depart}}-{{item.name}}</span>
              <div class="closeIcon" @click="delUser(index)">×</div>
            </div>
          </div>
        </section>
      </section>
      <!-- </div> -->
      <span slot="footer" class="dialog-footer main_center">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button  @click="hide" style="margin-left: 90px;" >取消</el-button>
      </span>
    </section>
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class AddUser extends Vue {
  private searchUserName: any = ''
  private userList: any = [
    {
      id: 2,
      name: 'zs',
      phone: '15735182769',
    },
  ]
  private selectedUser: any = [
    {
      id: 1,
      depart: '债券1部',
      name: '利泰南风',
    },
  ]
  private hide() {
    this.$emit('hide')
  }
  private save() {
    this.$emit('save')
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
}
</script>
<style lang="less" scoped>
main{
  width: 100%;
  height: 100%;
  color:rgba(49,50,51,1);
  .addUser{
    width: 1000px;
    height: 400px;
    // min-width: 1000px;
    // max-height: 500px;
    // width: 70%;
    // height: 70%;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    padding: 20px;
    box-sizing: border-box;
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
        min-height: 200px;
        background: #FFFCF9;
        padding: 16px;
        box-sizing: border-box;
        overflow-y: scroll;
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
}
</style>