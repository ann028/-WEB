<template>
  <main class="content">
    <!-- <div> -->
      <!-- <section class="header">项目管理</section> -->
      <Breadcrumb :tabName = 'tabName'></Breadcrumb>
      <div class="bg flex1" style="padding: 24px; box-sizing: border-box;">
        <section class="searchBox main_space">
          <section class="left">
            <section  class="flex">
              <el-input v-model="input" placeholder="事项名称" class="input_width"></el-input>
              <button class="btn primary_btn">查询</button>
            </section>
          </section>
          <section class="flex right">
            <button @click="doAddMatters" class="btn primary_btn">新增</button>
          </section>
        </section>
        <div class="flex mt20">
          <div :class="[activeName === 'publisher' ? 'step1Item step1ItemActive flex' : 'step1Item flex']"  @click="onChangeActiveName('publisher')">
            <span>发行人</span>
          </div>
          <div :class="[activeName === 'project' ? 'step1Item step1ItemActive flex' : 'step1Item flex']"  @click="onChangeActiveName('project')">
            <span>项目</span>
          </div>
        </div>
        <el-table
          :data="publisherData"
          style="width: 100%; height: auto; margin-top: 26px;"
          ref="multipleTable"
          v-if="activeName === 'publisher'"
          :header-cell-style="{background:'#FFF9F3'}">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            label="事项名称"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="direct"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="place"
            label="所需材料"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200">
            <template slot-scope="scope">
              <div class="flex">
                <!-- <el-button  class="border_btn">编辑</el-button> -->
                <button class="btn primary_plain_btn">编辑</button>
                <button class="btn primary_btn" >删除</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="projectData"
          style="width: 100%; height: auto; margin-top: 26px;"
          ref="multipleTable"
          v-if="activeName === 'project'"
          :header-cell-style="{background:'#FFF9F3'}">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            label="事项名称"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="direct"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="place"
            label="所需材料"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200">
            <template slot-scope="scope">
              <div class="flex">
                <!-- <el-button  class="border_btn">编辑</el-button> -->
                <button class="btn primary_plain_btn">编辑</button>
                <button class="btn primary_btn" >删除</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 20px auto;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageJson.currentPage"
            :page-size="pageJson.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageJson.total">
          </el-pagination>
        </div>
      </div>
    <!-- </div> -->

  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb.vue'

@Component({
  components: {
    Breadcrumb,
  },
})
export default class Projects extends Vue {
  private isShow: boolean = false
  private tabName: any = ['事项模板']
  private activeName: any = 'publisher'
  private pageJson: any = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }
  private value: any = ''
  private options: any = []
  private input: any = ''
  private publisherData: any[] = [
    {
      name: '2019年披露',
      direct: '提醒：01-20  最后期限：02-10',
      place: '挂网文件要求.docx',
    }, {
      name: '2019年披露',
      direct: '提醒：01-20  最后期限：02-10',
      place: '上挂网文件要求.docx交所',
    },
  ]
  private projectData: any[] = [
    {
      name: '2019年披露',
      direct: '提醒：01-20  最后期限：02-10',
      place: '挂网文件要求.docx',
    },
  ]
  private doAddMatters() {
    this.$router.push({
      name: 'addMatters',
    })
  }
  private handleSizeChange(val: any) {
    console.log(val)
  }
  private handleCurrentChange(val: any) {
    console.log(val)
  }
  private onChangeActiveName(activeName: any) {
    this.activeName = activeName
  }
}
</script>
<style lang="less" scoped>
main{
  .header{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #FFF9F3;
    font-size:16px;
    font-weight:bold;
    color:rgba(76,76,78,1);
  }
  .searchBox{
    margin-top: 20px;
  }
  // .btn{
  //   background: #F88200;
  //   color: #ffffff;
  //   height: 24px;
  //   width:69px;
  //   border: none;
  //   padding: 0;
  // }
  /deep/.el-table__body tr:hover > td{
      background-color:#FFF9F3 !important;
  }
  .step1Item{
    height: 30px;
    font-weight:bold;
    font-size: 14px;
    margin-right: 36px;
    cursor: pointer;
  }
  .step1ItemActive{
    color: #F88200;
    position: relative;
  }
  .step1ItemActive:after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 30px;
    height: 3px;
    background: #F88200;
    margin: 0 auto;
    border-radius: 4px;
  }
}
</style>
