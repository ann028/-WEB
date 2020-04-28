<template>
<!-- @click="clearSel" -->
  <main class="container" >
    <Step :stepName="message" :imgUrl="imgUrl"></Step>
    <section class="search_box main_space">
      <section class="main_space">
        <el-input
          placeholder="请输入文件名称"
          v-model="fileName"
          class="line"
          clearable
          :maxlength="30"
          style="margin-right:20px">
        </el-input>
        <button class="btn btn_primary btn_data"  @click.stop="searchList">查询</button>
      </section>
      <section class="main_space">
        <section v-if="isAdmin|| openType==='SECRET'||this.preData.length>0&&openType==='SHARE'&&oneObj['isGroup'] ">
          <button class="btn btn_data btn_primary" @click.stop="createFile">
          <img src="../../assets/img/databank/newCreat.png" alt=""  class="mr5">
            新建</button>
        </section>
         <!-- action="/api/cmdp/attachment/saveAttachment" -->
        <section  v-if="openType==='SHARE'&&oneObj['isGroup']||openType==='SECRET'&&preData.length === 0 &&selectObj['id'] ||openType==='SECRET'&&preData.length">
          <el-upload
            class="btn btn_data btn_succ"
            ref="upload"
            multiple
            action="/api/attachment/attachment/saveAttachment"
            accept=".doc,.docx,.xls,.xlsx,.ppt,.pdf,.png,.jpg,.jpeg,.zip,.pptx,.rar,.mp3,.wma,.flac,.mp4,.avi,.rm,.rmvb,.m4a"
            :auto-upload="true"
            :before-upload = 'beforeUpload'
            :on-success="successUpload"
            :on-change="uploadChange"
            :headers="{ 'Token-Id':`${userInfo.userId}`,'Token':`${userInfo.token}`,'Platform':'PC'}"
            :show-file-list="false">
            <button class="btn btn_succ" slot="trigger" size="small" type="primary" style="width:78px;height:32px;display:flex;justify-content:center;align-items:center" >
              <img src="../../assets/img/databank/upload.png" alt="" style="width:14px;height:14px;margin-right:5px">上传
            </button>
          </el-upload>
        </section>
        <section >
          <button class="btn btn_data btn_warning" @click.stop="downLoadfile">
            <img src="../../assets/img/databank/download.png" alt=""  class="mr5">下载</button>
        </section>
        <section v-if="openType==='SHARE'&&oneObj['isGroup']||openType==='SECRET'&&preData.length === 0 &&selectObj['id'] ||openType==='SECRET'&&preData.length">
          <button class="btn btn_data btn_info_plain" @click.stop="delFile">
            <img src="../../assets/img/databank/dele.png" alt=""  class="mr5">删除</button>
        </section>
        <section v-if="openType==='SHARE'&&oneObj['isGroup']||openType==='SECRET'&&preData.length === 0 &&selectObj['id'] ||openType==='SECRET'&&preData.length">
          <button class="btn btn_data btn_info_plain" style="width: 92px" @click.stop="rename(index)">
            <img src="../../assets/img/databank/rename.png" alt=""  class="mr5">重命名</button>
        </section>
        <section v-if="openType==='SHARE'&&preData.length === 0&&oneObj['addMember']">
          <button class="btn btn_data btn_info_plain" @click="settingUser" style="width: 106px;height:32px">
            <img src="../../assets/img/databank/setMember.png" alt=""  class="mr5">设置成员</button>
        </section>
      </section>
    </section>
    <section class="main_space">
      <section class="data_type flex mt20">
        <span style="line-height: 40px" class="mr20">文件类型</span>
        <section class="cross_center">
          <el-tooltip  effect="dark" :content="item.type" placement="top-start" v-for="(item,i) in typeList" :key="i">
            <div :class="['typeBox',isSelect===i?'typeBox_selected':'']" @click.stop="clickType(i)">
              <!-- {{item.url}} -->
              <img :src="isSelect===i?item.urlSelect:item.url" alt="" style="width: 24px;height: 24px">
            </div>
          </el-tooltip>  
        </section>
      </section>
      <section class="data_type cross_center mt20">
        <el-tooltip class="item" effect="dark" content="图标" placement="top-start">
          <div :class="['typeBox',isPicture === 1?'typeBox_selected':'']" @click.stop="changePicture(1)">
            <img v-if="isPicture === 1" src="../../assets/img/databank/icon_selected.png" alt="">
            <img v-else src="../../assets/img/databank/icon.png" alt="">
            <!-- <img :src="isPicture === 1?'../../assets/img/databank/list_selected.png':'../../assets/img/databank/list.png'" alt=""> -->
          </div>
        </el-tooltip> 
       <el-tooltip class="item" effect="dark" content="列表" placement="top-start">
        <div :class="['typeBox','typeBox1',isPicture === 2?'typeBox_selected':'']" @click.stop="changePicture(2)" >
          <img v-if="isPicture === 2" src="../../assets/img/databank/list_selected.png" alt="">
          <img v-else src="../../assets/img/databank/list.png" alt="">
        </div>
       </el-tooltip> 
      </section>
    </section>
    <section class="mt20">
      <!-- <button class="btn btn_succ" v-if="preData.length" @click="toBack()" style="width:76px;height:32px">←返回</button> -->
      <!-- <div v-if="preData.length" @click="toBack()" style="font-size:20px;color:rgba(87,146,252,1)">← 返回</div> -->
      <button v-if="preData.length" @click.stop="toBack()" class="btn1 btn_back" style="">← 返回</button>
      <section v-if="isPicture === 1" class="contentBigbox">
        <!-- <draggable v-model="currentData" :move="getdata" @update="datadragEnd" @end="end" class="contentBigbox"> -->
          <!-- <transition-group> -->
          <div  v-for="(item,i) in currentData" :key="i"   style="position: relative"   >
            <div :class="['contentBox mr20',item.isSel?'contentBox1':'']" @contextmenu.prevent = "rightClick(item, i)" @click.stop="isSelected(item,i)" @dblclick.stop="toNext(item)" @mouseenter="toHover(item)" @mouseleave="toLeave(item)" >
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
              <input v-focus v-if="item.isEdit"  v-model="item.folderName" style="margin-top:10px;width: 100px" placeholder="请输入内容"  @blur="blurDot">
              <span v-else class="fileText"  style="margin-top:10px"  >{{item.folderName.length>10?item.folderName.slice(0,10)+'...':item.folderName}}</span>
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
            <div v-if='item.isRight' class="rightBox" >
              <ul class="itemLi">
                <li  v-if="openType==='SHARE'&&oneObj['isGroup'] && selectObj['type'] === 'FOLDER'||openType==='SECRET'&&preData.length === 0 &&selectObj['id']&& selectObj['type'] === 'FOLDER' ||openType==='SECRET'&&preData.length && selectObj['type'] === 'FOLDER'" >
                  <el-upload
                    ref="upload"
                    multiple
                    action="/api/attachment/attachment/saveAttachment"
                    accept=".doc,.docx,.xls,.xlsx,.ppt,.pdf,.png,.jpg,.jpeg,.zip,.pptx,.rar,.mp3,.wma,.flac,.mp4,.avi,.rm,.rmvb,.m4a"
                    :auto-upload="true"
                    :before-upload = 'beforeUpload'
                    :on-success="successUpload"
                    :on-change="uploadChange"
                    :headers="{ 'Token-Id':`${userInfo.userId}`,'Token':`${userInfo.token}`,'Platform':'PC'}"
                    :show-file-list="false"
                    >上传
                    <!-- <button  slot="trigger" size="small" type="primary" style="width:78px;height:32px;display:flex;justify-content:center;align-items:center" >
                      <img src="../../assets/img/databank/upload.png" alt="" style="width:14px;height:14px;margin-right:5px">上传
                    </button> -->
                  </el-upload>
                </li>
                <li  @click.stop="downLoadfile">下载</li>
                <li @click.stop="delFile" v-if="openType==='SHARE'&&oneObj['isGroup']||openType==='SECRET'&&preData.length === 0 &&selectObj['id'] ||openType==='SECRET'&&preData.length">删除</li>
                <li @click.stop="rename(index)" v-if="openType==='SHARE'&&oneObj['isGroup']||openType==='SECRET'&&preData.length === 0 &&selectObj['id'] ||openType==='SECRET'&&preData.length">重命名</li>
                <li @click="settingUser" v-if="openType==='SHARE'&&preData.length === 0&&oneObj['addMember']">设置成员</li>
              </ul>
            </div>
          </div>
          <!-- </transition-group> -->
        <!-- </draggable> -->
      </section>
      <section  v-if="isPicture === 2" >
        <div  class="contentBigbox" >
          <div class="flex" style="width: 100%; height: 44px; line-height: 50px; background: rgb(245, 246, 250); color: #4E4E4E; font-size: 16px; border-bottom: 1px solid rgba(234,234,234,1); font-size: 14px">
            <div style="width:40%;padding-left:20px;box-sizing:border-box; position: relative">文件名
              <div style="display: flex; flex-direction: column; position: absolute; left: 66px; top: 14px;">
                <i :class="['el-icon-caret-top', isSort === 'folderNameAsc'? 'selectedColor' : 'unSelectedColor']"  style="margin-bottom: -6px;" @click="doAscColumn('folderName', 'asc')"></i>
                <i :class="['el-icon-caret-bottom', isSort === 'folderNameDesc' ? 'selectedColor' : 'unSelectedColor']" @click="doAscColumn('folderName', 'desc')"></i>
              </div>
            </div>
             <div style="width: 20%; position: relative;">修改日期
              <div style="display: flex; flex-direction: column; position: absolute; left: 60px; top: 14px;">
                <i :class="['el-icon-caret-top', isSort === 'timeAsc'? 'selectedColor' : 'unSelectedColor']"  style="margin-bottom: -6px" @click="doAscColumn('time', 'asc')"></i>
                <i :class="['el-icon-caret-bottom', isSort === 'timeDesc' ? 'selectedColor' : 'unSelectedColor']" @click="doAscColumn('time', 'desc')"></i>
              </div>
             </div>
             <div style="width: 10%; position: relative;">创建人
              <div style="display: flex; flex-direction: column; position: absolute; left: 44px; top: 14px;">
                <i :class="['el-icon-caret-top', isSort === 'createUserAsc'? 'selectedColor' : 'unSelectedColor']"  style="margin-bottom: -6px" @click="doAscColumn('createUser', 'asc')"></i>
                <i :class="['el-icon-caret-bottom', isSort === 'createUserDesc' ? 'selectedColor' : 'unSelectedColor']" @click="doAscColumn('createUser', 'desc')"></i>
              </div>
             </div>
            <div style="width:10%;">文件类型</div>
            <div style="width: 20%; text-align: center;">
              <div  style="width: 100px; position: relative;">
                <span>大小</span>
                <div style="display: flex; flex-direction: column; position: absolute; left: 66px; top: 14px;">
                  <i :class="['el-icon-caret-top', isSort === 'fileSizeAsc'? 'selectedColor' : 'unSelectedColor']"  style="margin-bottom: -6px" @click="doAscColumn('fileSize', 'asc')"></i>
                  <i :class="['el-icon-caret-bottom', isSort === 'fileSizeDesc' ? 'selectedColor' : 'unSelectedColor']" @click="doAscColumn('fileSize', 'desc')"></i>
                </div>
              </div>
            </div>
          </div>
          <div  v-for="(item,i) in currentData" :key="i" style="width:100%;position: relative">
            <div :class="['flex bigBox',item.isSel?'listBox1':'']" style="cursor: pointer;" @contextmenu.prevent = "rightClick(item, i)" @click.stop="isSelected(item)"  @dblclick.stop="toNext(item)">
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
              <div  style="line-height:44px;width:20%;">{{item.time}}</div>
              <div  style="line-height:44px;width:10%;">{{item.createUser}}</div>
              <div  style="line-height:44px;width:10%;">{{item.type === 'FOLDER'?'文件夹':item.fileExt+'文件'}}</div>
              <div  style="line-height:44px;width:20%;text-align:right;padding-right:20px;box-sizing:border-box">{{calcuThound(item.type,item.fileSize) }}</div>
              <div v-if="item.isHover" class="elasticBox" style="top:30px;left:100px" >
                <section class="flex" style="line-height:30px">
                  <span style="flex-shrink:0">名称:</span>
                  <span style="flex-shrink:0">{{item.folderName}}</span>
                </section>
                <section class="flex" style="line-height:30px">
                  <span style="flex-shrink:0">类型:</span>
                  <span style="flex-shrink:0">{{item.type === 'FOLDER'?'文件夹':`${item.fileExt}文件`}}</span>
                </section>
              </div>
              <div v-if='item.isRight' class="rightBox" style="position: absolute;top: 35px;right: 230px">
                <ul class="itemLi">
                  <li  v-if="openType==='SHARE'&&oneObj['isGroup'] && selectObj['type'] === 'FOLDER'||openType==='SECRET'&&preData.length === 0 &&selectObj['id']&& selectObj['type'] === 'FOLDER' ||openType==='SECRET'&&preData.length && selectObj['type'] === 'FOLDER'">
                    <el-upload
                      ref="upload"
                      multiple
                      action="/api/attachment/attachment/saveAttachment"
                      accept=".doc,.docx,.xls,.xlsx,.ppt,.pdf,.png,.jpg,.jpeg,.zip,.pptx,.rar,.mp3,.wma,.flac,.mp4,.avi,.rm,.rmvb,"
                      :auto-upload="true"
                      :before-upload = 'beforeUpload'
                      :on-success="successUpload"
                      :on-change="uploadChange"
                      :headers="{ 'Token-Id':`${userInfo.userId}`,'Token':`${userInfo.token}`,'Platform':'PC'}"
                      :show-file-list="false"
                      >上传
                    </el-upload>
                  </li>
                  <li  @click.stop="downLoadfile">下载</li>
                  <li @click.stop="delFile" v-if="openType==='SHARE'&&oneObj['isGroup']||openType==='SECRET'&&preData.length === 0 &&selectObj['id'] ||openType==='SECRET'&&preData.length">删除</li>
                  <li @click.stop="rename(index)" v-if="openType==='SHARE'&&oneObj['isGroup']||openType==='SECRET'&&preData.length === 0 &&selectObj['id'] ||openType==='SECRET'&&preData.length">重命名</li>
                  <li @click="settingUser" v-if="openType==='SHARE'&&preData.length === 0&&oneObj['addMember']">设置成员</li>
                </ul>
              </div>
            </div>
          
          </div>
        </div>
      </section>
    </section>
    <Depart class="modal" 
      :deparmentTree="deparmentTree" 
      :selectObj = "dialogName"
      :addUserlist = "addUserlist"
      v-if="dialogVisible"
      @hide="hideModal"
      @save="adduser">
    </Depart>
    <div class="modal1" v-if='loading'>
      <div class="loadingBox1">
        <i class="el-icon-loading loadingIcon"></i>
        <span class="textIcon"> 加载中...</span>
      </div>
    </div>
  </main>
</template>
<script lang="ts" >
  import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import draggable from 'vuedraggable';
  import Step from '@/components/Step.vue'
  import Depart from '@/views/dataBase/SettingDepart.vue'
  import { dataBase, department } from '@/api/index';
  import { Loading } from 'element-ui';
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
  Vue.directive('focus', {
      inserted: function(el, binding) {
          el.focus()
      }
  })
  @Component({
    components: {
      Step,
      Depart,
      draggable
    },
  })
  export default class DatabankCommon extends Vue {
    private message: any[] = []
    private imgUrl = require('../../assets/img/head/data.png')
    private fileName = '' // 文件名搜索
    private isSelect = 0
    private typeList = [
      {url: require( '../../assets/img/databank/menu.png'), urlSelect: require('../../assets/img/databank/menu_selected.png'), type: '全部'},
      {url: require('../../assets/img/databank/wps.png'), urlSelect: require('../../assets/img/databank/wps_selected.png'), type: 'word'},
      {url: require('../../assets/img/databank/excel.png'), urlSelect: require('../../assets/img/databank/excel_selected.png'), type: 'excel'},
      {url: require('../../assets/img/databank/ppt.png'), urlSelect: require('../../assets/img/databank/ppt_selected.png'), type: 'ppt'},
      {url: require('../../assets/img/databank/pdf.png'), urlSelect: require('../../assets/img/databank/pdf_selected.png'), type: 'pdf'},
      {url: require('../../assets/img/databank/zip.png'), urlSelect: require('../../assets/img/databank/zip_selected.png'), type: '压缩文件'},
      {url: require('../../assets/img/databank/picture.png'), urlSelect: require('../../assets/img/databank/picture_selected.png'), type: '图片'},
      {url: require('../../assets/img/databank/audio.png'), urlSelect: require('../../assets/img/databank/audio_selected.png'), type: '音频'},
      {url: require('../../assets/img/databank/video.png'), urlSelect: require('../../assets/img/databank/video_selected.png'), type: '视频'},
    ]
    private loading: boolean = false
    private dialogVisible = false
    private index: number = NaN
    private selectObj: any = {} //存储选中项
    private oneObj: any = {} //存储角色
    private addUserlist: any = {}
    private clickType(index: any) {
      this.isSelect = index
    }
    private deparmentTree: Array<any> = []
     private content: Array<any> = []
    private currentData: Array<any> = [] 
    private preData: Array<any> = []//存储上一级
    private parentCode:any = 0
    private isPicture: number = 1 //图标、列表切换
    private isRename: boolean = false //判断重命名/新增
    private selectedGroup: any[] = []
    private selectedMember: any[] = []
    private fileExt: any[] = [] //各类文件的文件名后缀
    private parantCode:number = 0 //存储父级文件夹id
    private parantCodeArray: Array<any> = []
    private openType: String = ''
    private timer: any = ''
    private uploadTime: any = '' //判断打包的计时器
    private isAdmin: boolean = false //判断是否是管理员
    private uploading: any //文件上传loading
    private dialogName: any = {} //‘设置成员’弹框标题
    private batchDownloadArr: any[]= [] // 批量下载数组
    private isSort: any = 'folderNameAsc'
    private isAsc: boolean = true
    private orderName: any = 'FILE_NAME'
    private toNextItem: any = {}
    @Watch ('isSelect') private selectWay(val: any, oldVal: any) {
      if (val === 0) {
        this.fileExt = []
        this.searchList()
      } else if ( val === 1) {
        this.fileExt = ['.doc','.docx','.txt']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      } else if ( val === 2) {
        this.fileExt = ['.xls','.xlsx','.xml']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      } else if ( val === 3) {
        this.fileExt = ['.ppt','.pptx']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      } else if ( val === 4) {
        this.fileExt = ['.pdf']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      } else if ( val === 5) {
        this.fileExt = ['.zip','.rar']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      } else if ( val === 6) {
        this.fileExt = ['.png','.jpg','.jpeg']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      } else if ( val === 7) {
        this.fileExt = ['.mp3','.wma','.flac','.m4a']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      } else if ( val === 8) {
        this.fileExt = ['.mp4','.avi','.rm','.rmvb']
        if (this.preData.length === 0) {
          this.currentData = []
        } else {
          this.searchList()
        }
      }
    }
    // 取消选中状态
    private clearSel() {
      for(let i =0,len = this.currentData.length; i< len;i++) {
        this.currentData[i].isSel = false
      }
      if(!this.preData.length) {
        this.oneObj = {}
      }
      this.selectObj = {}
      this.currentData.push()
    }
    private get userInfo() {
      return this.$store.state.userInfo;
    }
    // 上传文件之前
    private beforeUpload(file: any) {
      for(let i = 0,len = this.currentData.length; i < len; i++) {
        Vue.set(this.currentData[i],'isRight',false)
      }
      this.currentData.push()
      this.uploading = Loading.service({
        text: '上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
      });
      if(file) {
        if(this.preData.length === 0) {
          if (this.selectObj && this.selectObj.type === 'FOLDER') {

          }else {
            this.$message.warning(`请选择文件夹进行上传`)
            this.uploading.close()
            return false
          }
        }else if(this.preData.length > 0 && this.selectObj['type'] === 'FILE'){
          this.$message.warning(`请选择文件夹进行上传`)
          this.uploading.close()
          return false
        } 
      }
      // this.getFile(file)
    }
    private uploadChange(file: any,fileList: any) {
      // console.log('上传', file)
      // console.log('上传', fileList)
    }
    private async successUpload(response: any, file: any, fileList: any) {
      if(response.success) {
        // 清除this.selectObj缓存
        let flag = false
        for(let i = 0, len = this.currentData.length; i < len; i++) {
          if(this.selectObj['id'] === this.currentData[i]['id']) {
            flag = true
            break;
          }else {
            flag = false
          }
        }
        this.selectObj = flag?this.selectObj:{}
        let folderId: number = this.selectObj['id']?this.selectObj['id']:this.parantCode
        let res: any = await dataBase.uploadFile(`file=${response.data}&&folderId=${folderId}&&openType=${this.openType}`)
        if(res.data.code === 0) {
          this.uploading.close()
          this.$message.success(`${res.data.data.folderName}上传成功！`)
          if(!this.selectObj['id']) {
            let res1: any = await dataBase.getChildrenPage(`id=${folderId}&&asc=${this.isAsc}&&order=${this.orderName}`)
            if(this.preData.length === 0) {
              this.preData.push(this.currentData)
            }
            this.currentData = res1.data.data
            this.currentData.push()
          }
        }else {
          this.$message.warning(`${res.data.msg}`)
        }
      }
    }
    // /////////////////////////////
    // 上传获取id
    private async getFile( data: any) {
      console.log(data)
      let res: any = await dataBase.getFileId(data)
      console.log('获取Id',res.data)
    }
    // 查看文件夹
    // private async gethomeFile() {
    //   let res: any = await dataBase.getHomePage(`openType=${this.openType}`)
    //   this.isAdmin = res.data.data.addPaper ? res.data.data.addPaper : false
    //   this.currentData = res.data.data.list
    //   for( var i = 0,len = this.currentData.length; i < len; i++) {
    //     this.currentData[i]['isEdit'] = false
    //     this.currentData[i]['isSel'] = false
    //     this.currentData[i]['isHover'] = false
    //   }
    //   this.content = this.currentData
    // }
    private async gethomeFile(asc?: boolean, order?: string) {
      let Asc = asc? asc : true
      let pageInfo = {
        asc: asc? asc : asc=== false? false : true,
        openType: this.openType,
        order: order ? order : "FILE_NAME"
      }
      let res: any = await dataBase.getHomePage(pageInfo)
      this.isAdmin = res.data.data.addPaper ? res.data.data.addPaper : false
      this.currentData = res.data.data.list
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
    // 进入下一级
    private async toNext(item: any) {
      this.toNextItem = item
      this.selectObj = {}
      if(item.type === 'FOLDER') {
        let res: any = await dataBase.getFloderrole(`id=${item.id}`)
        this.oneObj = res.data.data
          if(this.oneObj['isGroup'] != undefined ) {
            this.selectObj = {} 
            this.parantCode = item.id
            this.parantCodeArray.push(this.parantCode)
            let res: any = await dataBase.getChildrenPage(`id=${item.id}&&asc=${this.isAsc}&&order=${this.orderName}`)
            this.preData.push(this.currentData)
            this.currentData = res.data.data
            this.currentData.push()
            this.content = res.data.data
            this.selectObj = {}
          }else {
            this.selectObj = {}
          }
      }
    }
    // 排序
     private async toNextSort(item: any, asc?: boolean, order?: string) {
      this.selectObj = {}
      if(item.type === 'FOLDER') {
        let res: any = await dataBase.getFloderrole(`id=${item.id}`)
        this.oneObj = res.data.data
          if(this.oneObj['isGroup'] != undefined ) {
            this.selectObj = {} 
            // this.parantCode = item.id
            // this.parantCodeArray.push(this.parantCode)
            let Asc = asc ? asc: asc=== false? false : true
            let res: any = await dataBase.getChildrenPage(`id=${item.id}&&asc=${Asc}&&order=${order}`)
            // this.preData.push(this.currentData)
            this.currentData = res.data.data
            this.currentData.push()
            this.content = res.data.data
            this.selectObj = {}
          }else {
            this.selectObj = {}
          }
      }
    }
    // 返回上一级
    private toBack() {
      this.parantCodeArray = this.parantCodeArray.slice(0, -1)
      this.parantCode = this.parantCodeArray[this.parantCodeArray.length - 1] || 0
      this.searchList()
      // if (this.parantCode !== 0) {
      //   this.toNextSort(this.toNextItem, this.isAsc, this.orderName)
      // } else {
      //   this.gethomeFile(this.isAsc, this.orderName)
      // }
      // this.content = this.preData[this.preData.length - 1]
      this.preData.splice(this.preData.length - 1, 1)
      for(let i = 0, len = this.content.length; i < len; i++) {
        this.content[i].isSel = false
      }
      this.currentData = this.content
      // this.parantCode = 0
      // this.parantCodeArray = this.parantCodeArray.slice(0, -1)
      // this.parantCode = this.parantCodeArray[this.parantCodeArray.length - 1] || 0
      this.selectObj = {}
      this.isSelect = 0
      if(this.preData.length === 0) {
        this.oneObj = {}
      }
      for(let i = 0,len = this.currentData.length; i < len; i++) {
        Vue.set(this.currentData[i],'isRight',false)
      }
      this.currentData.push()
    }
    // 设置选中状态
    private async isSelected(item: any,index: any) {
      clearTimeout(this.timer)
      this.selectObj = {}
      this.timer = setTimeout(() => {
        this.selectObj = item
        if(this.preData.length === 0 && this.fileExt.length === 0 && this.fileName === '') {
          // console.log('首级')
          this.userRole(item.id,index)
          for (let i =0,len = this.currentData.length; i< len;i++) {
            Vue.set(this.currentData[i],'isRight',false)
            // if(item.id === this.currentData[i].id && item.type === this.currentData[i].type) {
            //   Vue.set(this.currentData[i],'isRight',true)
            // }
          }
          this.currentData.push()
        }else {
          // console.log('次级')
          for(let i =0,len = this.currentData.length; i< len;i++) {
            if (this.currentData[i].type === 'FOLDER') {
              this.currentData[i].isSel = false
              this.currentData[i].isRight = false
              if(item.id === this.currentData[i].id && item.type === this.currentData[i].type) {
                Vue.set(this.currentData[i], 'isSel', true)
                // Vue.set(this.currentData[i],'isRight',true)
              }
            } else {
              // this.currentData[i].isSel = false
              this.currentData[i].isRight = false
              if(item.id === this.currentData[i].id && item.type === this.currentData[i].type) {
                Vue.set(this.currentData[i], 'isSel', !this.currentData[i].isSel)
                // Vue.set(this.currentData[i],'isRight',true)
              }
            }
          }
          this.currentData.push()
        }
      }, 300);
    }
    // 查看用户角色
    private async userRole(id: any, index: any) {
      let res: any = await dataBase.getFloderrole(`id=${id}`)
      this.oneObj = res.data.data
      for(let i =0, len = this.currentData.length; i< len; i++) {
        this.currentData[i].isSel = false
        if(id === this.currentData[i].id) {
          // this.currentData[i].isSel = true
          Vue.set(this.currentData[i], 'isSel', !this.currentData[i].isSel)
        }
      }
      this.currentData.push()
    }
    // 下载文件夹 --- 打包
    private async downLoadfile() {
      let flag = false
      this.batchDownloadArr = []
      for (let j = 0, lenj = this.currentData.length; j < lenj; j++) {
        Vue.set(this.currentData[j],'isRight',false)
        if (this.currentData[j].isSel) {
          this.batchDownloadArr.push(this.currentData[j])
        }
      }
      if (this.batchDownloadArr.length > 0) {
        for (let j = 0, lenj = this.batchDownloadArr.length; j < lenj; j++) {
          let batchDownloadItem: any = {}
          if(this.batchDownloadArr[j]['id'] ) {
            if(this.batchDownloadArr[j]['type'] === 'FOLDER'  ) {
              dataBase.packageFile(`sourceId=${this.batchDownloadArr[j]['id']}`).then(res=>{
                let filePath: any = res.data.data.filePath
                if(res.data.code === 0) {
                  let that = this
                  batchDownloadItem = this.batchDownloadArr[j]
                  this.loading = true
                  this.uploadTime = setInterval(function() {
                    that.isPackage(filePath, batchDownloadItem)
                  },1000)
                }else {
                  this.$message.error(`${res.data.msg}`)
                }
              })
            }else {
                let res: any = await dataBase.downloadFile(`id=${this.batchDownloadArr[j]['objId']}`)
                  let res1 = res.data
                  var blob = new Blob([res1], {type: 'application/octet-stream'})
                  var downloadElement = document.createElement('a');
                  var href = window.URL.createObjectURL(blob); //创建下载的链接
                  downloadElement.href = href;
                  downloadElement.download = `${this.batchDownloadArr[j]['folderName']}`; //下载后文件名
                  document.body.appendChild(downloadElement);
                  downloadElement.click(); //点击下载
                  document.body.removeChild(downloadElement); //下载完成移除元素
                  window.URL.revokeObjectURL(href); //释放掉blob对象
            }
          }else {
            this.$message.warning('请选择要下载的文件或文件夹!')
          }
        }
      } else {
        this.$message.warning(`选择要下载的目标文件`)
        return false
      }
      this.currentData.push()
    }
    // 判断是否打包完成
    private  isPackage(filePath: any, item: any) {
     dataBase.isPackage(`sourceId=${filePath}`).then(res=>{
      if(res.data.success) {
        if (res.data.data) {
          clearInterval(this.uploadTime)
          this.loading = false
           dataBase.downLoad(`uuId=${filePath}`).then(res=>{
          let res2 = res.data
          var blob = new Blob([res2], {type: 'application/zip'})
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = `${item['folderName']}`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
          })
        }else {
          console.log("filePath:",filePath)
        }
      } else {
        clearInterval(this.uploadTime)
        this.loading = false
      }
      })
    }
    // 重命名
    private async rename() {
      let flag = false
      for(let i = 0, len = this.currentData.length; i < len; i++) {
        if(this.selectObj['id'] === this.currentData[i]['id']&& this.selectObj['type'] === this.currentData[i]['type']) {
          flag = true
          break;
        }else {
          flag = false
        }
      }
      this.selectObj = flag?this.selectObj:{}
      if(this.selectObj['id'] != undefined) {
        this.isRename = true
        for(let i = 0, len = this.currentData.length; i < len; i++) {
            this.currentData[i].isSel = false
          if(this.selectObj['id'] === this.currentData[i].id && this.selectObj['type'] === this.currentData[i].type) {
            // this.currentData[i].isSel = true
            Vue.set(this.currentData[i], 'isSel', true)
            Vue.set(this.currentData[i], 'isEdit', true)
          }
        }
        this.currentData.push()
      } else {
        this.$message.warning('请选择要重命名的文件或文件夹')
      }
      for (let i = 0,len = this.currentData.length; i < len; i++) {
        Vue.set(this.currentData[i],'isRight',false)
      }
      this.currentData.push()
    }
    // 删除文件
    private async delFile() {
      this.batchDownloadArr = []
      for (let i = 0, len = this.currentData.length; i < len; i++) {
        if (this.currentData[i].isSel) {
          this.batchDownloadArr.push(this.currentData[i])
        }
      }
      if (this.batchDownloadArr.length > 0) {
        for (let j = 0, lenj = this.batchDownloadArr.length; j < lenj; j++) {
          this.selectObj = this.batchDownloadArr[j]
          let res: any = await dataBase.deleteFile(`cmdpType=${this.selectObj['type']}&&openType=${this.openType}&&Id=${this.selectObj['id']}`)
          if( res.data.success) {
            // this.$message.success(`${this.selectObj['folderName']}删除成功！`)
            if(this.preData.length !== 0) {
              let res: any = await dataBase.getChildrenPage(`id=${this.parantCode}&&asc=${this.isAsc}&&order=${this.orderName}`)
                // this.preData.push(this.currentData)
                this.currentData = res.data.data
                this.content = res.data.data
                this.selectObj = {}
                this.currentData.push()
            }else {
              this.selectObj = {}
              this.gethomeFile()
            }
          }else {
            this.$message.warning(`${res.data.msg}`)
          }
        }
      } else {
         this.$message.warning('请选择要删除的文件或文件夹')
      }
      // let flag = false
      // for(let i = 0, len = this.currentData.length; i < len; i++) {
      //   if(this.selectObj['id'] === this.currentData[i]['id']) {
      //     flag = true
      //     break;
      //   }else {
      //     flag = false
      //   }
      // }
      // this.selectObj = flag?this.selectObj:{}
      // if(this.selectObj['id'] != undefined) {
      //   // console.log(this.selectObj['id'])
      //   //  console.log(this.parantCode)
      //   let res: any = await dataBase.deleteFile(`cmdpType=${this.selectObj['type']}&&openType=${this.openType}&&Id=${this.selectObj['id']}`)
      //   if( res.data.success) {
      //     this.$message.success(`${this.selectObj['folderName']}删除成功！`)
      //     if(this.preData.length !== 0) {
      //       let res: any = await dataBase.getChildrenPage(`id=${this.parantCode}`)
      //         console.log(this.parantCode)
      //         // this.preData.push(this.currentData)
      //         this.currentData = res.data.data
      //         this.content = res.data.data
      //         this.selectObj = {}
      //         this.currentData.push()
      //     }else {
      //       this.selectObj = {}
      //       this.gethomeFile()
      //     }
      //   }else {
      //     this.$message.warning(`${res.data.msg}`)
      //   }
      // }else {
      //   this.$message.warning('请选择要删除的文件或文件夹')
      // }
      for(let i = 0,len = this.currentData.length; i < len; i++) {
        Vue.set(this.currentData[i],'isRight',false)
      }
      this.currentData.push()
    }
    // 新建文件夹
    private async createFile() {
      this.currentData.push({
        folderName: '新建文件夹',
        openType: this.openType,
        parentCode: this.parentCode,
        isEdit: true,
      })
      // let res: any = await dataBase.createFilefload({
      //   folderName: '新建文件夹',
      //   openType: "SHARE",
      //   parentCode: 0,
      // })
      // console.log('res1', res.data)
      // if(res.data.code === 0) {
      //   this.$message.success('新建成功！')
      // }else {
      //   this.$message.error(`${res.data.msg}`)
      // }
    }
    // 失去焦点---新增/修改
    private async blurDot() {
      this.content = this.currentData
      for(let i = 0, len = this.content.length; i < len; i++) {
        this.content[i].isEdit = false
        this.content[i].isSel = false
      }
      this.currentData = []
      this.currentData = this.content
      if(!this.isRename) {
          if(!this.preData.length) {
            var reg = /^[a-zA-Z0-9_\-\——\.\()\（）\u4e00-\u9fa5]+$/
            if (!reg.test(this.currentData[this.currentData.length - 1].folderName)) {
              this.$message.warning(`文件名只能包含下列字符：-  _  .  ()`)
              this.searchList()
              return false
            }
            let data = {
              folderName: this.currentData[this.currentData.length - 1].folderName,
              openType: this.openType,
              parentCode: this.parentCode,
            }
            let res: any = await dataBase.createFilefload({
              folderName: this.currentData[this.currentData.length - 1].folderName,
              openType: this.openType,
              parentCode: this.parentCode,
            })
            if(res.data.code === 0) {
              this.$message.success('新建成功！')
            }else {
              this.$message.error(`${res.data.msg}`)
            }
            this.gethomeFile()
            this.selectObj = {}
          } else {
            // console.log('子集新建',)
            // console.log(this.currentData)
            // console.log(this.content[this.content.length - 1].folderName)
            this.content = this.currentData
            var reg = /^[a-zA-Z0-9_\-\——\.\()\（）\u4e00-\u9fa5]+$/
            if (!reg.test(this.currentData[this.currentData.length - 1].folderName)) {
              this.$message.warning(`文件名只能包含下列字符：-  _  .  ()`)
              this.searchList()
              return false
            }
            let data = {
              folderName: this.content[this.content.length - 1].folderName,
              openType: this.openType,
              parentCode: this.parantCode,
            }
            console.log(data)
            let res: any = await dataBase.createFilefload(data)
            console.log('res', res.data)
            if(res.data.code === 0) {
              // this.toNext(this.parantCode)
              let res: any = await dataBase.getChildrenPage(`id=${this.parantCode}&&asc=${this.isAsc}&&order=${this.orderName}`)
              if(res.data.data.length) {
                this.currentData = res.data.data
                this.content = res.data.data
              }
            }else {
              this.$message.error(`${res.data.msg}`)
            }
            this.selectObj = {}
            let folderId: number = this.parantCode === 0?this.selectObj['id']:this.parantCode
            let res1: any = await dataBase.getChildrenPage(`id=${folderId}&&asc=${this.isAsc}&&order=${this.orderName}`)
            this.currentData = res1.data.data
            this.currentData.push()
          }
      }else {
        if (this.selectObj !== {}) {
          var reg = /^[a-zA-Z0-9_\-\——\.\()\（）\u4e00-\u9fa5]+$/
          if (!reg.test(this.selectObj['folderName'])) {
            this.$message.warning(`文件名只能包含下列字符：-  _  .  ()`)
            this.searchList()
            return false
          }
          let res: any = await dataBase.renameFile(`cmdpType=${this.selectObj['type']}&&openType=${this.openType}&&Id=${this.selectObj['id']}&&title=${this.selectObj['folderName']}`)
          if(res.data.code === 0) {
            this.$message.success('修改成功！')
            // this.content = this.currentData
            // this.currentData = []
            for(let i = 0, len = this.content.length; i < len; i++) {
              this.content[i].isEdit = false
              this.content[i].isSel = false
            }
            this.currentData = this.content
          
          }else {
            this.$message.error(`${res.data.msg}`)
          }
          this.searchList()
          // let res1: any = await dataBase.getChildrenPage(`id=${this.parantCode}`)
          // if(res1.data.data.length) {
          //   this.currentData = res1.data.data
          //   this.content = res1.data.data
          // }
          this.selectObj = {}
          this.isRename = false
          // this.gethomeFile()
        }
      }
    }
    // 设置部门成员
    private settingUser() {
      console.log(this.selectObj)
      this.dialogName = this.selectObj
      if(this.selectObj['id'] != undefined) {
        console.log(this.selectObj['id'])
        this.getUser(this.selectObj['id'])
        // this.dialogVisible = true
      }else {
        this.$message.warning('请选择')
      }
      for(let i = 0,len = this.currentData.length; i < len; i++) {
        Vue.set(this.currentData[i],'isRight',false)
      }
      this.currentData.push()
    }
    // 获取部门树
    private async departtree() {
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
        this.$message.error(`获取部门数据失败，${res.msg}`)
      }
      this.deparmentTree = list 
    }
    // 获取文件夹下的成员列表
    private async getUser(id: any) {
      console.log(this.selectObj)
      let res: any = await dataBase.getUserlist(`id=${id}`)
      if(res.data.code === 0) {
        console.log('成员',this.dialogName)
        this.dialogVisible = true
        this.addUserlist = res.data.data
      }
    }
    // 隐藏弹框
    private hideModal() {
      this.dialogVisible = false
      this.dialogName = {}
    }
    // 保存
    private  async adduser(a:any[],b:any[]) {
      this.selectedGroup = a
      this.selectedMember = b
      let arr: Array<any> =[]
      for(let i = 0, len = this.selectedGroup.length; i < len; i++ ) {
        let row = {
          folderId: this.dialogName['id'],
          role: "GROUP",
          userId: this.selectedGroup[i].id
        }
        arr.push(row)
      }
      for(let j = 0, len = this.selectedMember.length; j < len; j++ ) {
        let row = {
          folderId: this.dialogName['id'],
          role: "MEMBER",
          userId: this.selectedMember[j].id
        }
        arr.push(row)
      }
      let res: any = await dataBase.addUser(arr)
      console.log('添加',res.data)
      if(res.data.success) {
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      // for(let i = 0, len = this.content.length; i < len; i++) {
      //   Vue.set(this.content[i], 'isSel', false)
      // }
      // this.currentData = []
      this.currentData = this.content
      this.dialogVisible = false
      // this.selectObj = {}
    }
    // 切换图标、列表
    private changePicture(index: number) {
      this.isPicture = index
    }
    // 首页查询按钮
    private async  searchList() {
      if(this.fileExt.length === 0 && this.fileName === '') {
        // console.log(this.parantCode)
        if( this.parantCode === 0) {
          this.gethomeFile(this.isAsc, this.orderName)
        }else {
          // this.toNext(this.parantCode)
          let res: any = await dataBase.getChildrenPage(`id=${this.parantCode}&&asc=${this.isAsc}&&order=${this.orderName}`)
          if(res.data.data.length) {
            this.currentData = res.data.data
            this.content = res.data.data
          }
        }
      } else {
        let data = {}
         if( this.parantCode === 0) {
            data = {
              fileExt: this.fileExt,
              fileName: this.fileName,
              openType: this.openType,
              asc: this.isAsc,
              order: this.orderName,
            }
          }else {
            data = {
              paperId: this.parantCode,
              fileExt: this.fileExt,
              fileName: this.fileName,
              openType: this.openType,
              asc: this.isAsc,
              order: this.orderName,
            }
          }
        let res: any = await dataBase.searchHome(data)
        this.currentData = res.data.data
        this.content = res.data.data
      }
    }
    // 鼠标右键
    private rightClick(item: any, i: any) {
      console.log(item)
      this.selectObj = item
      if(this.preData.length === 0 && this.fileExt.length === 0 &&this.fileName === '') {
        console.log('首级')
        this.userRole(item.id,i)
        for (let i =0,len = this.currentData.length; i< len;i++) {
          Vue.set(this.currentData[i],'isRight',false)
          // Vue.set(this.currentData[i],'isSel',false)
          // if(item.id === this.currentData[i].id && item.type === this.currentData[i].type) {
          //   Vue.set(this.currentData[i],'isRight',true)
          // }
        }
        this.currentData.push()
      }
      // this.isSelected(item, i)
      for(let i = 0,len = this.currentData.length; i < len; i++) {
         Vue.set(this.currentData[i],'isRight',false)
        //  Vue.set(this.currentData[i],'isSel',false)
        if(item['id'] === this.currentData[i]['id'] &&  item['type'] === this.currentData[i]['type']) {
          Vue.set(this.currentData[i],'isSel',true)
          Vue.set(this.currentData[i],'isRight',true)
        }
      }
      this.currentData.push()
    }
    // 升序排列
    private  doAscColumn(name: any, type: any) {
      if (type === 'asc') {
        this.isAsc = true
        if (name === 'folderName') {
          this.isSort = 'folderNameAsc'
          this.orderName = 'FILE_NAME'
          this.searchList()
          // if (this.parantCode === 0) {
          //   this.gethomeFile(true, 'FILE_NAME')
          // } else {
          //   this.toNextSort(this.toNextItem, true, 'FILE_NAME')
          // }
        } else if (name === 'time') {
          this.isSort = 'timeAsc'
          this.orderName = 'Date'
          this.searchList()
        } else if (name === 'createUser') {
          this.isSort = 'createUserAsc'
          this.orderName = 'CREATE_USER'
          this.searchList()
        } else if (name === 'fileSize') {
          this.isSort = 'fileSizeAsc'
          this.orderName = 'SIZE'
          this.searchList()
        }
      } else {
         this.isAsc = false
        if (name === 'folderName') {
          this.isSort = 'folderNameDesc'
          this.orderName = 'FILE_NAME'
          this.searchList()
        } else if (name === 'time') {
          this.isSort = 'timeDesc'
          this.orderName = 'Date'
          this.searchList()
        } else if (name === 'createUser') {
          this.isSort = 'createUserDesc'
          this.orderName = 'CREATE_USER'
          this.searchList()
        } else if (name === 'fileSize') {
          this.isSort = 'fileSizeDesc'
          this.orderName = 'SIZE'
          this.searchList()
        }
      }
    }
    private mounted() {
      this.message = [ '公共资料库' , '全部文件' ]
      this.departtree()
      // this.gethomeFile()
      document.addEventListener('click',(e) => {
        const el: any = e
        if (el.target.className === 'container'|| el.target.className === '' || el.target.className === 'contentBigbox' || el.target.className === 'main_space'||el.target.className === 'search_box main_space' || el.target.className === 'mt20') {
          for(let i =0,len = this.currentData.length; i< len;i++) {
            this.currentData[i].isSel = false
            this.currentData[i].isRight = false
          }
          if(!this.preData.length) {
            this.oneObj = {}
          }
          this.selectObj = {}
          this.currentData.push()
        }
      })
    }
    private calcuThound(type: any, num: any) {
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
    private beforeRouteEnter (to: any, from: any, next: any) {
      next( (vm: any) => {
        if( to.name === 'DatabankCommon1') {
          vm.message = [ '我的资料库' , '全部文件' ]
          vm.openType = 'SECRET'
          vm.gethomeFile()
          vm.selectObj = {}
          vm.oneObj = {}
        } else if ( to.name === 'DatabankCommon' ) {
          vm.message = [ '公共资料库' , '全部文件' ]
          vm.openType = 'SHARE'
          vm.gethomeFile()
          vm.selectObj = {}
          vm.oneObj = {}
        }
      })
    }
  }
</script>

<style lang="less" scoped>
//  /deep/.el-date-editor .el-range-separator,.el-input__icon{
//     height:32px
//   }
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
       border-left:0;
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
    }
    .typeBox:nth-last-of-type(4) {
      border-left:0;
      // border-right: 0;
    }
    .typeBox1{
      border-radius: 0px 4px 4px 0;
      border: 1px 0 ;
    }
    .typeBox_selected{
      background:rgba(87,146,252,1);
      border:1px solid rgba(87,146,252,1);
    }
  }
  .el-dialog__footer{
    padding: 0;
    display: flex;
    text-align: center !important;
    border-top: 1px solid #F5F6FA !important;
  }
  .header_title{
    display: flex;
    align-items: center;
  }
  .content_title{
    line-height: 24px;
    color:rgba(49,50,51,1);
  }
  .contentBigbox{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-bottom:100px;
  }
  .contentBox{
    width:100px;
    // height:130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    // background:rgba(245,246,250,1);
    padding: 10px 0 0 0;
    box-sizing: border-box;
  }
  .contentBox:hover{
    background: rgba(245,246,250,1)
  }

  .contentBox1{
    background:rgba(245,246,250,1);
  }
  .fileText{
    display: block;
    width: 100%;
    height: auto;
    text-align: center;
    // overflow: hidden;
    line-height: 34px;
    word-break:break-all;
  }
  .listBox{
    width:40%;
    height:44px;
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
  // .fileText1{
  //   display: block;
  //   width: 100%;
  //   height: 34px;
  //   overflow: hidden;
  //   line-height: 34px;
  //   // word-break:break-all;
  // }
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
    word-break:break-all;

  }
  .rightBox{
    position: absolute;
    top: 20px;
    right:-55px;
    border: 2px solid rgba(245,246,250,1);
    background:#fff;
    z-index:8;
    box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
   
    .itemLi{
     box-sizing: border-box;
     margin-left: -40px;
      li{
         padding:0px 40px;
        box-sizing:border-box;
        line-height: 40px;
        list-style: none;
        cursor: pointer;
      }
      li:hover{
        color: #5792FC;
        background: #F8FAFE
      }
    }
  }
  .bigBox{
    border-bottom: 1px solid rgba(234,234,234,1)

  }
  .bigBox:hover{
     background:rgba(245,246,250,1);
  }
  .btn1{
    width: 64px;
    height: 32px;
  }
  .btn_back{
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(192,196,204,1);
    color: rgba(192,196,204,1)
  }
  .btn_back:hover{
    border:1px solid rgba(87,146,252,1);
    color:rgba(87,146,252,1);
    // background:rgba(87,146,252,1);
    // color: #ffff;
  }
  // .el-date-editor .el-range__close-icon{
  //   display: block !important;
  // }
  .modal1{
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
  }
  .loadingBox1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    color: #409EFF;
  }
  .loadingIcon{
    // width: 10px;
    // height: 10px;
    margin: 6px auto;
    // font-size: 20px;
    color: #5792FC;
  }
  .selectedColor{
    color: #5792Fc
  }
  .unSelectedColor {
    color: #999
  }
}
</style>