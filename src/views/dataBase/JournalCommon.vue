<template>
  <main class="container">
      <Step :stepName="message" :imgUrl="imgUrl"></Step>
      <section class="searchBox flex" style="flex-wrap:wrap;margin-top:0">
        <el-input
          placeholder="输入文件名"
          clearable
          v-model="searchVo.title"
          class="inputLine mt20">
        </el-input>
        <section class="flex mt20">
          <span class="spanLine">账号姓名</span>
          <el-input v-model="searchVo.userName" placeholder="请输入内容" clearable class="inputLine"></el-input>
        </section>
        <section class="flex mt20">
          <span class="spanLine">操作类型</span>
          <!-- <el-input v-model="searchVo.type" placeholder="请输入内容" class="inputLine"></el-input> -->
          <el-select v-model="searchVo.type" clearable placeholder="请选择" class="inputLine">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <!-- <el-date-picker
          v-model="searchVo.timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="inputLine mt20" >
        </el-date-picker> -->
         <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchVo.timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          class="inputLine mt20">
        </el-date-picker>
        <button class="btn btn_primary mt20" style="width: 76px;height:32px;" @click="searchLog">查询</button>
      </section>
      <section class="mt20">
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#F5F6FA'}"
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="45">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            :index="indexMethod"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            label="文件名称">
            <template slot-scope="scope">
              <div style="display:flex;margin-left:20px" class="cross_center">
                <div v-if="scope.row.fileType === 'FILE'" style="">
                  <!-- {{scope.row.title.split('.')[scope.row.title.split('.').length-1]}} -->
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'docx'|| scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'doc' || scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'txt'" src="../../assets/img/databank/wpsList.png" alt="" style="width: 24px;height: 24px" >
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'xls'|| scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'xlsx'" src="../../assets/img/databank/excelList.png" alt="" style="width: 24px;height: 24px" >
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'pdf'" src="../../assets/img/databank/pdfList.png" alt="" style="width: 24px;height: 24px" >
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'ppt' || scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'pptx'" src="../../assets/img/databank/pptList.png" alt="" style="width: 24px;height: 24px" > 
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'png' || scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'jpg'||scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'jpeg'" src="../../assets/img/databank/pngList.png" alt="" style="width: 24px;height: 24px" >
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'zip' || scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'rar'" src="../../assets/img/databank/zipList.png" alt="" style="width: 24px;height: 24px" >
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'mp3' || scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'wma'||scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'flac'|| scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'm4a'" src="../../assets/img/databank/audioList.png" alt="" style="width: 24px;height: 24px" >
                  <img v-if="scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'mp4' ||  scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'avi'|| scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'rm'||  scope.row.title.split('.')[scope.row.title.split('.').length-1] === 'rmvb'" src="../../assets/img/databank/videoList.png" alt="" style="width: 24px;height: 24px" >
                </div>
                <img v-else src="../../assets/img/databank/fileS.png" alt="" style="width: 24px;height: 24px" >
                <span style="line-height:30px;margin-left:10px">{{scope.row.title}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="operationType"
            align="center"
            label="操作类型">
            <template slot-scope="scope">
                <span v-if="scope.row.operationType === 'CREATE'">新建</span>
                <span v-else-if="scope.row.operationType === 'DEL'">删除</span>
                <span v-else-if="scope.row.operationType === 'REN'">重命名</span>
                <span v-else-if="scope.row.operationType === 'MOVE'">移动</span>
                <span v-else-if="scope.row.operationType === 'UPLOAD'">上传</span>
                <span v-else-if="scope.row.operationType === 'DOWNLOAD'">下载</span>
                <span v-else-if="scope.row.operationType === 'RESTORE'">还原</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="operationTime"
            align="center"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="userName"
            align="center"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="remark"
            align="center"
            label="备注">
          </el-table-column>
        </el-table>
      </section>
      <div class="main_space pagination_box">
        <section>
          <span class="word">共<span style="color:#5792FC">{{pageJson.total}}</span>条</span>
          <el-select v-model="pageValue" placeholder="10条/页" style="width:101px;height:28px" @change="changePage(pageValue)">
            <el-option value="5" label="50条/页"></el-option>
            <el-option value="10" label="100条/页"></el-option>
            <el-option value="50" label="500条/页"></el-option>
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
<script lang="ts" >
  import { Component, Prop, Vue} from 'vue-property-decorator';
  import Step from '@/components/Step.vue';
  import { dataBase } from '@/api/index';
  @Component({
    components: {
      Step,
    },
  })
  export default class JournalCommon extends Vue {
    private message: any[] = []
    private imgUrl = require('../../assets/img/head/data.png')
    private tableData: any[] = []
    private pageValue = '5'
    private searchVo = {
      title: '',
      userName: '',
      type: '',
      timeValue: [],
    }
    private pageJson = {
      pageSize: 50,
      currentPage: 1,
      total: 0,
    }
    private options = [
      {label: '新建', value: 'CREATE'},
      {label: '删除', value: 'DEL'},
      {label: '重命名', value: 'REN'},
      // {label: '移动', value: 'MOVE'},
      {label: '上传', value: 'UPLOAD'},
      {label: '下载', value: 'DOWNLOAD'},
      {label: '还原', value: 'RESTORE'},
    ]
    // 获取日志文件
    private async getCommonLog() {
      let data = {
        endTime: this.searchVo.timeValue[1] ||'' ,
        pageNum: this.pageJson.currentPage,
        pageSize: this.pageJson.pageSize,
        startTime: this.searchVo.timeValue[0] || '' ,
        title: this.searchVo.title ,
        type: this.searchVo.type || null ,
        userName: this.searchVo.userName ,
      }
      let res: any = await dataBase.getLog(JSON.stringify(data))
      this.pageJson.total = res.data.data.total;
      this.tableData = res.data.data.records
    }
    // 查询
    private searchLog() {
      this.getCommonLog()
    }
    // 修改当前页
    private changePage(val: any) {
      this.pageJson.currentPage = 1;
      this.pageJson.pageSize = parseInt(val) * 10;
      this.getCommonLog()
    }
    private handleCurrentChange( val: any) {
      this.pageJson.currentPage = val
      this.getCommonLog()
    }
    private indexMethod(index: any) {
      return index + 1 + (this.pageJson.currentPage - 1) * this.pageJson.pageSize;
    }
    // 设置当前时间
    private nowTime() {
      const date = new Date();
      const dateTime  = date.getTime();
      const dateDay = date.getDay();
      let end = new Date(dateTime)
      let beg = new Date(dateTime )
      const year = beg.getFullYear();   // '2019'
      const month = beg.getMonth() + 1 < 10 ? '0' + (beg.getMonth() + 1) : (beg.getMonth() + 1);  // '04'
      const da = beg.getDate() < 10 ? '0' + beg.getDate() :beg.getDate();  // '12'
      const year1 = end.getFullYear();   // '2019'
      const month1 = end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);  // '04'
      const da1 = end.getDate() < 10 ? '0' + end.getDate() :end.getDate();  // '12'
      const beg1 = `${year}-${month}-${da}`
      const end1 = `${year1}-${month1}-${da1}`
      let dat: any = [];
      dat = [beg1, end1]; // 将值设置给插件绑定的数据
      this.searchVo.timeValue = dat;
    }
    private mounted() {
        this.message = [ '公共资料库' , '日志' ]
        this.nowTime()
        this.getCommonLog()
    }
  }
</script>

<style lang="less" scoped>
.container{
    /deep/.el-date-editor .el-range-separator,.el-input__icon{
      height:32px
    }
    /deep/.el-input__icon{
      line-height: 26px;
    }
    .mt20{
      margin-top:20px;
    }
    .searchBox{
      margin-top: 20px;
      .spanLine {
        flex-shrink:0;
        font-size:14px;
        color:rgba(96,98,102,1);
        margin:0 20px;
        line-height:32px
      }
      .inputLine{
        height: 32px;
        margin-right: 20px;
        width: 224px !important;
      }
    }
    .pagination_box{
      margin-top: 20px;
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