<template>
  <main class="container">
    <Step :stepName="message" :imgUrl="imgUrl"></Step>
    <section>
      <section class="search_box main_space">
        <section class="main_space">
          <el-input
            placeholder="请输入文件名称"
            clearable
            v-model="fileName"
            class="line"
            style="margin-right:20px">
          </el-input>
          <button class="btn btn_primary btn_data" @click="getHomefile">查询</button>
        </section>
        <section class="main_space">
          <section>
            <button class="btn btn_data btn_primary" @click="reduction">
            <img src="../../assets/img/databank/reduction.png" alt="" class="mr5">
              还原</button>
          </section>
          <section>
            <button class="btn btn_data btn_info_plain" @click="perDelete" style="width: 106px;height:32px">
              <img src="../../assets/img/databank/dele.png" alt="" class="mr5">永久删除</button>
          </section>
        </section>
      </section>
    </section>
    <section class="main_space">
      <section class="data_type flex mt20">
        <span style="line-height: 40px" class="mr20">文件类型</span>
        <section class="cross_center">
          <el-tooltip class="item" effect="dark" :content="item.type" placement="top-start" v-for="(item,i) in typeList" :key="i">
            <div :class="['typeBox',isSelect===i?'typeBox_selected':'']" @click="clickType(i)">
              <img :src="isSelect===i?item.urlSelect:item.url" alt="" style="width: 24px;height: 24px">
            </div>
          </el-tooltip>  
        </section>
      </section>
      <section class="data_type cross_center mt20">
        <el-tooltip class="item" effect="dark" content="图标" placement="top-start">
          <div :class="['typeBox',isPicture === 1?'typeBox_selected':'']" @click="changePicture(1)">
            <img v-if="isPicture === 1" src="../../assets/img/databank/icon_selected.png" alt="">
            <img v-else src="../../assets/img/databank/icon.png" alt="">
          </div>
        </el-tooltip>  
        <el-tooltip class="item" effect="dark" content="列表" placement="top-start">
          <div :class="['typeBox typeBox1',isPicture === 2?'typeBox_selected':'']" @click="changePicture(2)">
            <img v-if="isPicture === 2" src="../../assets/img/databank/list_selected.png" alt="">
            <img v-else src="../../assets/img/databank/list.png" alt="">
          </div>
        </el-tooltip>
      </section>
    </section>
    <section class="mt20">
      <section v-if="isPicture === 1">
        <div  class="contentBigbox">
          <div  v-for="(item,i) in currentData" :key="i" style="position: relative">
            <div  :class="['contentBox mr20',item.isSel?'contentBox1':'']" @click="isSelected(item)"  @mouseenter="toHover(item)" @mouseleave="toLeave(item)" >
              <div v-if="item.fileExt">
                <img  v-if="item.fileExt === '.txt'||item.fileExt === '.doc' ||item.fileExt === '.docx'" src="../../assets/img/databank/wpsList.png" alt="" class="fileName" style="width: 60px;height:60px">
                <img  v-if="item.fileExt === '.pdf'" src="../../assets/img/databank/pdfList.png" alt="" class="fileName" style="width: 60px;height:60px">
                <img  v-if="item.fileExt === '.ppt' || item.fileExt === '.pptx'" src="../../assets/img/databank/pptList.png" alt="" class="fileName" style="width: 60px;height:60px">
                <img  v-if="item.fileExt === '.xls'||item.fileExt === '.xlsx'||item.fileExt === '.xml'" src="../../assets/img/databank/excelList.png" alt="" class="fileName" style="width: 60px;height:60px">
                <img  v-if="item.fileExt === '.png'||item.fileExt === '.jpg'||item.fileExt === '.jpeg'" src="../../assets/img/databank/pngList.png" alt="" class="fileName" style="width: 60px;height:60px">
                <img  v-if="item.fileExt === '.zip' || item.fileExt === '.rar'" src="../../assets/img/databank/zipList.png" alt="" class="fileName" style="width: 60px;height:60px">
                <img  v-if="item.fileExt === '.mp3' || item.fileExt === '.wma' || item.fileExt === '.flac'|| item.fileExt === '.m4a'" src="../../assets/img/databank/audioList.png" alt="" class="fileName" style="width: 60px;height:60px">
                <img  v-if="item.fileExt === '.mp4' || item.fileExt === '.avi' || item.fileExt === '.rm' || item.fileExt === '.rmvb'" src="../../assets/img/databank/videoList.png" alt="" class="fileName" style="width: 60px;height:60px">
              </div>
              <img v-else src="../../assets/img/databank/file.png" alt="" class="fileName" style="width: 60px;height:60px">
              <span class="fileText"  style="margin-top:10px">{{item.folderName.length>15?item.folderName.slice(0,15)+'...':item.folderName}}</span>
            </div>
            <div v-if="item.isHover" class="elasticBox" >
                <section class="flex" style="line-height:30px">
                  <span style="flex-shrink:0;margin-right:10px">名称:</span>
                  <span style="">{{item.folderName}}</span>
                </section>
                <section class="flex" style="line-height:30px">
                  <span style="flex-shrink:0;margin-right:10px">类型:</span>
                  <span style="flex-shrink:0">{{item.type === 'FOLDER'?'文件夹':`${item.fileExt}文件`}}</span>
                </section>
            </div>
          </div>
        </div>
      </section>
      <!-- <section  v-if="isPicture === 2" >
        <div  class="contentBigbox" >
          <div  v-for="(item,i) in currentData" :key="i" style="width:25%">
            <div  :class="['listBox mr20',item.isSel?'listBox1':'']" @click="isSelected(item)" >
              <img src="../../assets/img/databank/file.png" alt="" class="fileName" style="width: 24px;height:24px">
              <span class="fileText" style="margin-left:10px">{{item.folderName.length>7?item.folderName.slice(0,7)+'...':item.folderName}}</span>
            </div>
          </div>
        </div>
      </section> -->
      <section  v-if="isPicture === 2" >
        <div  class="contentBigbox" >
           <div class="flex" style="width:100%;height:44px;line-height:50px;background:rgb(245, 246, 250);color:#4E4E4E;font-size:16px;border-bottom:1px solid rgba(234,234,234,1); font-size: 14px">
              <div style="width:40%;padding-left:20px;box-sizing:border-box">文件名</div>
              <div style="width:20%;">修改日期</div>
              <div style="width:10%;">创建人</div>
              <div style="width:10%;">文件类型</div>
              <div style="width:20%;text-align:center">大小</div>
           </div>
              <div  v-for="(item,i) in currentData" :key="i" style="width:100%"  >
                <div :class="['flex bigBox',item.isSel?'listBox1':'']" style="cursor: pointer;" @click="isSelected(item)" @mouseenter="toHover(item)" @mouseleave="toLeave(item)"  >
                  <div  :class="['listBox  ',item.isSel?'listBox1':'']" style="" >
                    <div v-if="item.fileExt">
                      <img  v-if="item.fileExt === '.txt'||item.fileExt === '.doc'||item.fileExt === '.docx'" src="../../assets/img/databank/wpsList.png" alt="" class="fileName" style="width: 24px;height:24px">
                      <img  v-if="item.fileExt === '.pdf'" src="../../assets/img/databank/pdfList.png" alt="" class="fileName" style="width: 24px;height:24px">
                      <img  v-if="item.fileExt === '.ppt' || item.fileExt === '.pptx'" src="../../assets/img/databank/pptList.png" alt="" class="fileName" style="width: 24px;height:24px">
                      <img  v-if="item.fileExt === '.xls'||item.fileExt === '.xlsx'||item.fileExt === '.xml'" src="../../assets/img/databank/excelList.png" alt="" class="fileName" style="width: 24px;height:24px">
                      <img  v-if="item.fileExt === '.png'||item.fileExt === '.jpg'||item.fileExt === '.jpeg'" src="../../assets/img/databank/pngList.png" alt="" class="fileName" style="width: 24px;height:24px">
                      <img  v-if="item.fileExt === '.zip' || item.fileExt === '.rar'" src="../../assets/img/databank/zipList.png" alt="" class="fileName" style="width: 24px;height:24px">
                      <img  v-if="item.fileExt === '.mp3' || item.fileExt === '.wma' || item.fileExt === '.flac'|| item.fileExt === '.m4a'" src="../../assets/img/databank/audioList.png" alt="" class="fileName" style="width: 24px;height:24px">
                      <img  v-if="item.fileExt === '.mp4' || item.fileExt === '.avi' || item.fileExt === '.rm' || item.fileExt === '.rmvb'" src="../../assets/img/databank/videoList.png" alt="" class="fileName" style="width: 24px;height:24px">
                    </div>
                    <img v-else src="../../assets/img/databank/file.png" alt="" class="fileName" style="width: 24px;height:24px">
                    <input v-focus v-if="item.isEdit"  v-model="item.folderName" style="margin:10px 0 0 10px;width: 100px" placeholder="请输入内容"  @blur="blurDot">
                    <span v-else class="fileText1" style="margin-left:10px;over-flow:hidden">{{item.folderName.length > 45?item.folderName.slice(0,45)+'...':item.folderName}}</span>
                  </div>
                  <div style="line-height:40px;width:20%">{{item.time}}</div>
                  <div style="line-height:40px;width:10%">{{item.createUser}}</div>
                  <div style="line-height:40px;width:10%">{{item.type === 'FOLDER'?'文件夹':item.fileExt+'文件'}}</div>
                  <div style="text-align:right;line-height:40px;width:20%;padding-right:20px;box-sizing:border-box">{{item.fileSize?calcuThound(item.type,item.fileSize):'' }}</div>
                  <!-- <div v-if="item.isHover" class="elasticBox" style="top:30px;left:100px" >
                    <section class="flex" style="line-height:30px">
                      <span style="flex-shrink:0">名称:</span>
                      <span style="flex-shrink:0">{{item.folderName}}</span>
                    </section>
                    <section class="flex" style="line-height:30px">
                      <span style="flex-shrink:0">类型:</span>
                      <span style="flex-shrink:0">{{item.type === 'FOLDER'?'文件夹':`${item.fileExt}文件`}}</span>
                    </section>
                  </div> -->
                </div>
              
              </div>
        </div>
      </section>
    </section>
  </main>
</template>
<script lang="ts" >
  import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import Step from '@/components/Step.vue'
  import { dataBase } from '@/api/index'
  @Component({
    components: {
      Step,
    },
  })
  export default class RecycleCommon extends Vue {
    private message: any[] = ['我的资料库' , '回收站']
    private imgUrl = require('../../assets/img/head/data.png')
    private isSelect = 0
    private typeList = [
      {url: require('../../assets/img/databank/list.png'), urlSelect:require('../../assets/img/databank/list_selected.png') , type: '全部'},
      {url: require('../../assets/img/databank/wps.png'), urlSelect: require('../../assets/img/databank/wps_selected.png'), type: 'word'},
      {url: require('../../assets/img/databank/excel.png'), urlSelect: require('../../assets/img/databank/excel_selected.png'), type: 'excel'},
      {url: require('../../assets/img/databank/ppt.png'), urlSelect: require('../../assets/img/databank/ppt_selected.png'), type: 'ppt'},
      {url: require('../../assets/img/databank/pdf.png'), urlSelect: require('../../assets/img/databank/pdf_selected.png'), type: 'pdf'},
      {url: require('../../assets/img/databank/zip.png'), urlSelect: require('../../assets/img/databank/zip_selected.png'), type: '压缩文件'},
      {url: require('../../assets/img/databank/picture.png'), urlSelect: require('../../assets/img/databank/picture_selected.png'), type: '图片'},
      {url: require('../../assets/img/databank/audio.png'), urlSelect: require('../../assets/img/databank/audio_selected.png'), type: '音频'},
      {url: require('../../assets/img/databank/video.png'), urlSelect: require('../../assets/img/databank/video_selected.png'), type: '视频'},
    ]
    private fileName = ''
    private fileExt: Array<any> = []
    private currentData: Array<any> = [] 
    private content: Array<any> = [] 
    private selectObj: Array<any> = [] //选中项
    private isPicture: number = 1 //列表与图表切换
    private openType: String = ''
    // 切换文件类型
    private clickType(i: any) {
      this.isSelect = i
    }
    @Watch ('isSelect') private selectWay(val: any, oldVal: any) {
      if (val === 0) {
        this.fileExt = []
        this.getHomefile()
      } else if ( val === 1) {
        this.fileExt = ['.doc','.docx','.txt']
        this.getHomefile()
      } else if ( val === 2) {
        this.fileExt = ['.xls','.xlsx']
        this.getHomefile()
      } else if ( val === 3) {
        this.fileExt = ['.ppt', '.pptx']
        this.getHomefile()
      } else if ( val === 4) {
        this.fileExt = ['.pdf']
        this.getHomefile()
      } else if ( val === 5) {
        this.fileExt = ['.zip','.rar']
        this.getHomefile()
      } else if ( val === 6) {
        this.fileExt = ['.png','.jpg','.jpeg']
        this.getHomefile()
      } else if ( val === 7) {
        this.fileExt = ['.mp3','.wma','.flac']
        this.getHomefile()
      } else if ( val === 8) {
        this.fileExt = ['.mp4','.avi','.rm','.rmvb']
        this.getHomefile()
      }
    }
    // public get userInfo () {
    //   return this.$store.state.userInfo
    // }
    // 查看文件
    private async getHomefile() {
      let res: any = await dataBase.getReducefile({
        fileName: this.fileName,
        fileExt: this.fileExt,
        openType: this.openType,
      })
      this.currentData = res.data.data
      for( var i = 0,len = this.currentData.length; i < len; i++) {
        this.currentData[i]['isEdit'] = false
        this.currentData[i]['isSel'] = false
        this.currentData[i]['isHover'] = false
      }
      this.content = this.currentData
    }
     // 列表展示页鼠标移入
    private async toHover(item: any) {
      for(let i = 0,len = this.currentData.length; i < len; i++) {
        if(item['id'] === this.currentData[i]['id'] &&  item['type'] === this.currentData[i]['type']) {
          Vue.set(this.currentData[i],'isHover',true)
        }
      }
      this.currentData.push()
    }
    // 列表展示页鼠标移出
    private async toLeave(item: any) {
      for(let i = 0,len = this.currentData.length; i < len; i++) {
        if(item['id'] === this.currentData[i]['id'] &&  item['type'] === this.currentData[i]['type']) {
          Vue.set(this.currentData[i],'isHover',false)
        }
      }
      this.currentData.push()
    }
    // 设置选中项
    private  isSelected(item: any) {
      for( var i = 0,len = this.currentData.length; i < len; i++) {
          if(item.id === this.currentData[i].id && item.type === this.currentData[i].type) {
            Vue.set(this.currentData[i], 'isSel',!this.currentData[i].isSel)
          }
          this.currentData.push()
      }
    }
    // 还原
    private async reduction() {
      this.selectObj = []
       for( var j = 0,len = this.currentData.length; j < len; j++) {
        if(this.currentData[j].isSel) {
          this.selectObj.push(this.currentData[j])
        }
      }
      if(this.selectObj.length) {
        let id: Array<any> = []
        for(let i =0, len = this.selectObj.length; i < len; i++ ) {
          id.push(this.selectObj[i].id)
        }
        let res: any = await dataBase.reduceFile(id)
        if(res.data.success) {
          this.$message.success('还原成功!')
          this.getHomefile()
          this.selectObj = []
        }else {
          this.$message.error(`${res.data.msg}`)
          this.selectObj = []
        }
      }else {
        this.$message.warning('请对要操作的文件进行选择！')
      }
    }
    // 永久删除
    private async perDelete() {
       this.selectObj = []
       for( var j = 0,len = this.currentData.length; j < len; j++) {
        if(this.currentData[j].isSel) {
          this.selectObj.push(this.currentData[j])
        }
      }
      if(this.selectObj.length) {
        let ids: Array<any> = []
        for(let i =0, len = this.selectObj.length; i < len; i++ ) {
          ids.push(this.selectObj[i].id)
        }
        let res: any = await dataBase.perDelefile(ids)
        if(res.data.success) {
          this.$message.success('删除成功!')
          this.getHomefile()
          this.selectObj = []
        }else {
          this.$message.error(`${res.data.msg}`)
          this.selectObj = []
        }
      }else {
        this.$message.warning('请对要操作的文件进行选择！')
      }
    }
    // 切换图标/列表
    private changePicture(index: number) {
      this.isPicture = index
    }
    private calcuThound(type: any, num: any) {
      // if(type != 'FOLDER') {
        //   let num1: any = num + ''
        //   let result = 0
        //   if( num1 ) {
        //     for( let i =0; i < Math.floor(num1.length - ( 1 + i))/3; i++) {
        //       num1 = num1.substring(0, num1.length - ( 4*i + 3)) + ',' + num1.substring( num1.length - ( 4*i + 3))
        //     }
        //     result = num1.substring(1)
        //   }
        //   return result + 'KB'
      // }
      if(type != 'FOLDER') {
        let num1: any = (num/1024).toFixed(2) + ''
        let result = ''
        if( num1.split('.')[0] ) {
          for( let i = 0; i < Math.floor(num1.length - ( 1 + i))/3; i++) {
            num1 = num1.substring(0, num1.length - ( 4*i + 3)) + ',' + num1.substring( num1.length - ( 4*i + 3))
          }
          // result = num1.substring(1)
          if(num1[0] === ',') {
            num1 = num1.substr(1, num1.length - 1)
          }
          result = num1.split('.')[0].substr(0, num1.split('.')[0].length -1) + '.' + num1.split('.')[1]
        }
        return result + 'KB'
      }
    }
    private mounted() {
      // this.getHomefile()
    }
    private beforeRouteEnter (to: any, from: any, next: any) {
      next( (vm: any) => {
        if( to.name === 'RecycleCommon1') {
          vm.message = [ '我的资料库' , '回收站' ]
          vm.openType = 'SECRET'
          vm.getHomefile()
        } else if ( to.name === 'RecycleCommon' ) {
          vm.message = [ '公共资料库' , '回收站' ]
          vm.openType = 'SHARE'
          vm.getHomefile()
        }
      })
    }
  }
</script>

<style lang="less" scoped>
 /deep/.el-input__icon{
    line-height: 26px;
  }
main{
  font-size: 14px;
  .mr5{
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  .search_box{
    margin-top: 20px;
    .line{
      width: 224px !important;
    }
    .btn_data{
      width:76px;
      height:32px;
      margin-left:20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .data_type{
    .typeBox{
      width:49px;
      height:40px;
      // border-radius:4px 0px 0px 4px;
      border:1px solid rgba(144,147,153,1);
      display: flex;
      justify-content: center;
      align-items: center
    }
    .typeBox:nth-of-type(1){
       border-radius:4px 0px 0px 4px;
       border-right:0
    }
    .typeBox:nth-of-type(3){
       border-left:0
    }
    .typeBox:nth-of-type(4){
       border-left:0;
       border-right:0
    }
    .typeBox:nth-of-type(9){
      border-radius: 0px 4px 4px 0;
      border-left: 0;
    }
    .typeBox:nth-last-of-type(3) {
      border-left:0;
      border-right: 0;
      // background: pink
    }
     .typeBox:nth-last-of-type(5) {
      border-right: 0;
    }
    .typeBox_selected{
      background:rgba(87,146,252,1);
      border:1px solid rgba(87,146,252,1);
    }
    .typeBox1{
      border-radius: 0px 4px 4px 0;
      border: 1px 0 ;
    }
  }
  .contentBigbox{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom:100px;
  }
  .contentBox{
    width:100px;
    // height:110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background:rgba(245,246,250,1);
    padding-top:10px;
    box-sizing: border-box
  }
  .contentBox:hover{
    background:rgba(245,246,250,1);
  }
  .contentBox1{
    background:rgba(245,246,250,1);
  }
  .fileText{
    display: block;
    // width: 100px;
    // height: 34px;
     text-align: center;
    // overflow: hidden;
    line-height: 34px;
    word-break:break-all;
  }
  .elasticBox{
    position: absolute;
    top:125px;
    right:-30px;
    // width:250px;
    // height:50px;
    border: 2px solid rgba(245,246,250,1);
    background:#fff;
    z-index: 9999;
    box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
    padding:20px 15px;
    box-sizing:border-box;
    min-height: 80px;
    font-size: 14px;
    // white-space:nowrap;
    width: 200px;
    // word-wrap: break-word;
    // word-break: normal;
    word-break:break-all;

  }
  .listBox{
    width:40%;
    height:40px;
    display: flex;
    // flex-direction: column;
    // justify-content: center;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .listBox1{
    background:rgba(245,246,250,1);
  }
  .bigBox{
     border-bottom: 1px solid rgba(234,234,234,1)
  }
  .bigBox:hover{
    background:rgba(245,246,250,1);
  }
}
</style>