<template>
  <main class="container">
      <Step :stepName='message' :imgUrl = "imgUrl"></Step>
      <div style="margin-top:20px;display:flex;justify-content:space-between">
        <section class="flex">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :clearable="false"
            class="searchBox">
          </el-date-picker>
          <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="conferenceInfo" >查询</button>
        </section>
        <section class="flex">
          <button class="btn btn_warning" style="width:76px;height:32px;" @click="exportInfo" v-if="permission.includes('prm5005')" >
            <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
            导出</button>
          <button class="btn btn_primary ml20" style="width:76px;height:32px;"  @click="toRoute()" v-if="permission.includes('prm5001')">
            <img src="../../assets/img/addition.png" alt="" style="width:16px;height:16px">
            新增</button>
        </section>
      </div>
      <div style="margin-top: 20px">
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#F5F6FA'}"
          @row-click="viewInfo"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width='50'
            :index="indexMethod"
            align="center">
          </el-table-column>
          <el-table-column
            prop="meetingType"
            label="会议/活动类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="meetingName"
            label="会议/活动名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="meetAt"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class="main_center">
            <template slot-scope="scope"  >
                <span @click.stop="toRoute(scope.row.id)" v-if="permission.includes('prm5002')" style="color:#5792FC;cursor: pointer;margin-right: 5px">
                  <img src="../../assets/img/editor.png" alt="">
                  编辑
                </span>
                <span @click.stop="deleteInfo(scope.row.id)" v-if="permission.includes('prm5004')"  style="color:#5792FC;cursor: pointer">
                  <img src="../../assets/img/trash.png" alt="">
                  删除
                </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main_space pagination_box">
        <section>
          <span class="word">共<span style="color:#5792FC">{{pageJson.total}}</span>条</span>
          <el-select v-model="pageValue" placeholder="10条/页" style="width:101px;height:28px" @change="changePage(pageValue)">
            <el-option value="1" label="10条/页"></el-option>
            <el-option value="2" label="20条/页"></el-option>
            <el-option value="3" label="30条/页"></el-option>
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
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { conference } from '@/api/index'
import Step from '@/components/Step.vue';
import { obj1 } from '@/utils/util.ts'
// import Edit from '../Daily/Edit.vue';
@Component({
  components: {
     Step,
  },
})
export default class Conferencr extends Vue {
  private message = ['会议活动']
  private imgUrl = require('../../assets/img/head/conference.png')
  private timeValue = []
  private tableData: [] = []
  private pageValue = '1'
  private pageJson: any = {
    pageSize: 1,
    currentPage: 1,
    total: 0,
  }
  private get permission() {
    return this.$store.state.permission
  }
  @Watch(`timeValue`) private time(val: any, oldVal: any) {
    sessionStorage.setItem('timeValue', val.toString())
  }
  // 查询
  private async conferenceInfo() {
    const timeValue: any = sessionStorage.getItem('timeValue')
    this.timeValue = timeValue ? timeValue.split(',') : this.timeValue
    const currentPage: any = sessionStorage.getItem('currentPage') || this.pageJson.currentPage
    this.pageJson.currentPage = currentPage * 1
    const pageSize: any = sessionStorage.getItem('pageSize') || '1'
    this.pageValue = pageSize
    this.pageJson.pageSize = pageSize * 10
    const res: any = await conference.getConference({
      startTime: this.timeValue[0],
      endTime: this.timeValue[1],
      pageNum: currentPage * 1,
      pageSize: this.pageJson.pageSize * 1,
    })
    this.pageJson.total = res.data.data.total
    this.tableData = res.data.data.records
  }
  // 新增
  private async toRoute(id: any) {
    const meetingId: any = id ? id : '';
    this.$router.push({name: 'conferenceEdit', query: { type: 'edit', infoId: meetingId}})
  }
  // 查看
  private  viewInfo( row: any) {
    if (this.$store.state.permission.includes('prm5003')) {
      this.$router.push({name: 'conferenceEdit', query: { type: 'detail', infoId: row.id}})
    }
  }
  // 删除
  private deleteInfo( id: any) {
    this.$confirm('此操作将永久删除该数据，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          conference.delConference(`id=${id}`).then((res: any) => {
            if (res.data.code === 0) {
              this.$message.success(`删除成功`)
              this.conferenceInfo()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
  }
  // 导出
  private async exportInfo() {
    const res: any = await conference.exportConference(`startTime=${this.timeValue[0]}&&endTime=${this.timeValue[1]}`)
    const res1 = res.data
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `会议活动-${this.timeValue[0]}-${this.timeValue[1]}.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  // 每页展示条数
  private changePage(pageValue: any) {
    sessionStorage.setItem('pageSize', pageValue)
    this.pageJson.currentPage = 1
    this.pageJson.pageSize = pageValue
    this.conferenceInfo()
  }
  // 修改当前页
  private handleCurrentChange(val: any) {
    sessionStorage.setItem('currentPage', val)
    this.pageJson.currentPage = val
    this.conferenceInfo()
  }
  private indexMethod(index: any) {
    return ( this.pageJson.currentPage - 1 ) * this.pageJson.pageSize + ( index + 1 )
  }
  private created() {
    this.timeValue = obj1.getNowtime()
    this.conferenceInfo()
  }
  private beforeRouteLeave(to: any, from: any, next: any) {
    if (to.name !== 'conferenceEdit') {
      sessionStorage.removeItem('timeValue')
      sessionStorage.removeItem('pageSize')
      sessionStorage.removeItem('currentPage')
      next()
    } else {
      next()
    }
  }
  // private activated() {
  //   // this.nowTime()
  //   this.conferenceInfo()
  // }
}
</script>

<style lang="less" scoped> 
main{
    /deep/.el-date-editor .el-range-separator,.el-input__icon{
      height:32px
    }
    /deep/.el-input__icon{
      line-height: 26px;
    }
    .searchBox{
      width: 224px !important;
      height: 32px;
    }
    .pagination_box{
      margin-top: 15px;
    }
    .word{
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(102,102,102,1);
      line-height:19px;
      margin-right:5px;
    }
}
</style>
 