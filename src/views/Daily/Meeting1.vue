<template>
  <main class="container">
    <div id="meeting">
      <Step :stepName="message"></Step>
      <div class="flex" style="margin:15px 0">
        <section class="flex">
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :clearable="false"
            class="line">
          </el-date-picker>
          <!-- <section class=" m0">
            <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">创建人</span>
            <el-input v-model="creator" maxlength="30" placeholder="请输入内容" class="line"></el-input>
          </section> -->
          <button class="btn btn_primary" style="width:76px;height:32px;margin-left:20px" @click="isRole">查询</button>
          <!-- <el-button type="primary">查询</el-button> -->
        </section>
        <section class="flex" >
          <section>
            <el-upload
            class="upload-demo"
            ref="upload"
            action="/api/daily/trainMeet/importTrainMeet"
            :auto-upload="true"
            accept=".xls,.xlsx"
            :on-success="onupload"
            :headers="{ 'Token-Id':`${userInfo.userId}`,'Token':`${userInfo.token}`,'Platform':'PC'}"
            :show-file-list="false"
            style="position: relative">
            <button v-if="permission.includes('prm1304')" class="btn btn_succ" slot="trigger"  size="small" type="primary" style="width:78px;height:32px;display:flex;justify-content:center">
              <img src="../../assets/img/send.png" alt="" style="width:14px;height:14px;margin-right:5px">导入
            </button>
            <!-- <div v-if=" permission.includes('prm1308')" @click="exportInfo" @mouseenter="changeShow" @mouseleave="changeShow1" class="dialog_upload"  >
              <span>下载模板</span>
            </div> -->
          </el-upload>
          </section>
          <section  class="uploadBox" style="position: relative"  @mouseenter="changeShow" @mouseleave="changeShow1">
            <button v-if=" permission.includes('prm1308')"   class="dialog_upload" >
              <span>导出</span>
            </button>
            <div class="exportBox" v-if="isShow" >
              <span @click="exportInfo">导出数据</span>
              <span @click="exportTemplate">导出模板</span>
            </div>
          </section>
          <button v-if="permission.includes('prm1305')" class="btn btn_primary" @click="$router.push({name:'mettingEdit'})" style="width:78px;height:32px;margin-left:20px">
            <img src="../../assets/img/addition.png" alt="" style="width:16px;height:16px">
            新增
            </button>
        </section>
      </div>
      <div>
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#F5F6FA'}"
          style="width: 100%"
          @row-click="viewInfo">
          <el-table-column
            type="selection"
            width="45"
            align="center">
          </el-table-column>
          <el-table-column
            type="index"
            width="50"
            label="序号"
            :index="indexMethod"
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="培训类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="trainAt"
            label="培训时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="theme"
            label="培训主题"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mode"
            label="培训方式"
            align="center">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="创建人"
            align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <span @click.stop="toRoute(scope.row.id)"
                  style="cursor: pointer;margin-right:31px;color:#5792FC" v-if="permission.includes('prm1306')"
                >
                <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                  <!-- <i class="el-icon-edit" style="color:#5792FC"></i> -->
                编辑</span>
                <span
                  style="cursor: pointer;color:#5792FC" @click.stop="deleteMeet(scope.row.id)" v-if="permission.includes('prm1307')"
                >
                <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                <!-- <i class="el-icon-delete" style="color:#5792FC" ></i> -->
                删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex isRow" style="margin-top:15px;justify-content:space-between">
          <section>
            <span class="word">共<span style="color:#5792FC">{{this.pageJson.total}}</span>条</span>
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
      </div>
    </div>
  </main>
</template>

<script lang="ts" >
  import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import Step from '@/components/Step.vue'
  import { daily } from '../../api';
  import { obj1 } from '@/utils/util'
  @Component({
    components:{
      Step
    }
  })
  export default class Meeting1 extends Vue {
    private message = ['日常管理','培训会议']
    private timeValue = ''
    private creator = ''
    private pageValue = '1'
    private tableData = []
    private currentTabledata = []
      // 分页相关数据
    private pageJson: any = {
      total: this.tableData.length,
      currentPage: 1,
      pageSize: parseInt(this.pageValue) * 10,

    }
    private isShow: boolean = false;
    @Watch(`timeValue`) private changeTime(val: any, oldVal: any) {
      sessionStorage.setItem('timeValue', val.toString())
    }
    private changeShow(){
      this.isShow = true
    }
    private changeShow1(){
      this.isShow = false
    }
    public get permission() {
      return this.$store.state.permission
    }
    private get userInfo() {
      return this.$store.state.userInfo;
    }
    // 导入成功
    private onupload(response: any, file: any, fileList: any) {
      if (response.success){
        this.$message.success(`上传成功！`)
      } else {
        this.$message.error(`${response.msg}`)
      }
      this.isRole()
    }
    // 当前页改变
    private handleCurrentChange(val: any){
      sessionStorage.setItem('currentPage', val)
      this.pageJson.currentPage = val
      this.isRole()
        // let arr:any = this.tableData.slice((this.pageJson.currentPage-1)*this.pageJson.pageSize,(this.pageJson.currentPage*this.pageJson.pageSize))
        // this.currentTabledata = arr
    }
    // 修改每页 条数
    private changePage(val: any){
      this.pageJson.currentPage =1
      this.pageJson.pageSize=parseInt(val)*10
      this.isRole()
    }
    // 路由跳转
    private toRoute(id: any){
      this.$router.push({name:'mettingEdit',query:{id: id}})
    }
    // 培训会议个人表(个人)
    private async getMeet(){
      let res:any = await daily.getMeetinginfo({
        endTime: this.timeValue[1],
        startTime: this.timeValue[0],
        pageNum:this.pageJson.currentPage,
        pageSize:this.pageJson.pageSize
      })
      // let index:number =0
      // let count:number = 0
      // for(var i=0,len = res.data.data.records.length;i<len;i++){
      //     let pageNum:number= this.pageJson.currentPage
      //     let pageSize:number = this.pageJson.pageSize
      //     count+=1
      //     index = (pageNum - 1)*pageSize+count
      //     res.data.data.records[i]['index'] = index
      // }
      this.tableData = res.data.data.records
      this.pageJson.total = res.data.data.total
    }
    // 培训会议个人表(部门)
    private async getMeetP(){
      let res:any = await daily.getMeetinginfoP({
        endTime: this.timeValue[1],
        startTime: this.timeValue[0],
        pageNum:this.pageJson.currentPage,
        pageSize:this.pageJson.pageSize
      })
      // let index:number =0
      // let count:number = 0
      // for(var i=0,len = res.data.data.records.length;i<len;i++){
      //     let pageNum:number= this.pageJson.currentPage
      //     let pageSize:number = this.pageJson.pageSize
      //     count+=1
      //     index = (pageNum - 1)*pageSize+count
      //     res.data.data.records[i]['index'] = index
      // }
      this.tableData = res.data.data.records
      this.pageJson.total = res.data.data.total
    }
    // 删除---培训会议
    private async deleteMeet1(id: any){
      let res: any
      if(this.$store.state.permission.includes('prm1303')) {
        res = await daily.deletemeetInfo(`id=${id}`)
      }else {
        res = await daily.deletemeetInfoP(`id=${id}`)
      }
      if(res.data.success){
        this.$message.success('删除成功!')
        this.isRole()
      }else{
        this.$message.error(`${res.data.msg}`)
      }
    }
    private deleteMeet(id: any){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMeet1(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      })
    }
    // 查看详情
    private async viewInfo(row: any) {
      if( this.$store.state.permission.includes('prm1302')) {
        this.$router.push({name:'mettingDetail',query:{id:row.id}})
      } else {
        this.$message.error('暂无查看详情权限')
      }
      
    }
    // 导出
    private async exportInfo() {
      let res: any;
      if(this.$store.state.permission.includes('prm1303')) {
        res = await daily.exportMeet({
          endTime: this.timeValue[1],
          pageNum: this.pageJson.currentPage,
          pageSize: this.pageJson.pageSize,
          startTime: this.timeValue[0],
        })
      }else {
        res = await daily.exportMeetP({
          endTime: this.timeValue[1],
          pageNum: this.pageJson.currentPage,
          pageSize: this.pageJson.pageSize,
          startTime: this.timeValue[0],
        })
      }
      let res1 = res.data
      var blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
      var downloadElement = document.createElement('a');
      var href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = `培训会议-${this.timeValue[0]}-${this.timeValue[1]}.xls`; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
    }
    // 导出模板
    private async exportTemplate() {
      let res: any = await daily.exportTemplate()
      let res1 = res.data
      var blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
      var downloadElement = document.createElement('a');
      var href = window.URL.createObjectURL(blob); // 创建下载的链接
      downloadElement.href = href;
      downloadElement.download = `培训会议模板.xls`; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    }
    // 判断权限
    private isRole() {
      let time: any = sessionStorage.getItem('timeValue') || this.timeValue.toString()
      this.timeValue = time.split(',')
      let current: any = sessionStorage.getItem('currentPage')
      this.pageJson.currentPage = current * 1 || 1
      if(this.$store.state.permission.includes('prm1303')) {
        this.getMeet()
      }else {
        this.getMeetP()
      }
    }
    // 序号
    private indexMethod(index: any) {
      return (this.pageJson.currentPage - 1) * this.pageJson.pageSize + index + 1 
    }
    private created() {
      // this.getnowTime()
      this.timeValue = obj1.getFirst()
      this.isRole()
    }
    private beforeRouteLeave(to: any, from: any, next: any) {
      if (to.name === 'mettingDetail' || to.name ==='mettingEdit') {
        next()
      }else {
        sessionStorage.removeItem('timeValue')
        sessionStorage.removeItem('currentPage')
        next()
      }
    }
  }

// }
</script>

<style lang="less" >
main{
  #meeting{
    .el-date-editor .el-range-separator,.el-input__icon{
      height:32px
    }
    .flex{
      justify-content: space-between;
      // margin:15px 0 0px 0;
    }
    .isRow .el-input__icon{
      line-height: 32px;
    }
    thead{
      background: #F5F6FA;
    }
    .selectBox{
      width:85px;
      height:28px;
      border-radius:3px;
      border:1px solid rgba(220,223,230,1);
      color:rgba(102,102,102,1);
      margin-left:5px
    }
    .line{
      width:224px !important
    }
    .uploadBox{
      .dialog_upload{
        width: 76px;
        height: 32px;
        z-index: 999;
        // position:absolute;
        // top:28px;
        // left:0;
        border:1px solid #8EC29A;
        // border-top:0;
        box-sizing: border-box;
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        font-size:14px;
        color:rgba(142,194,154,1);
        cursor: pointer;
        margin-left: 20px;
        background: #fff;
        
      }
      .exportBox{
          width: 110px;
          position: absolute;
          top:35px;
          z-index: 1000;
          background: #ffffff;
          box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
          border-radius:12px;
        }
        .exportBox span{
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 10px 20px;
          box-sizing: border-box;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
        }
        .exportBox span:hover{
          background: #F5F6FA;
        }
    }
   
    .word{
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(102,102,102,1);
      line-height:19px;
      margin-right:5px;
    }
  }
}
</style>