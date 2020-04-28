<template>
  <main class="container">
    <Step :stepName="message" :isView="isView"></Step>
    <section class="context">
      <section class="flex text">
        <section >
          <span class="text0">
            <span class="mark">*</span>
            培训时间：</span>
           <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="meetInfo.trainAt"
              type="date"
              placeholder="选择日期"
               :clearable="false"
              class="text1"
              style="line-height: 40px ">
            </el-date-picker>
        </section>
        <section style="position:relative" class="textxx">
          <span class="text0">
             <span class="mark">*</span>
             培训类型：</span>
              <input v-model="meetInfo.type" placeholder="请输入内容" @click="showList = !showList" class="text1 input_style show" >
              <div v-if='showList' class="dialog_style" >
                <section class="flex" style="padding:10px 10px;box-sizing:border-box">
                  <input v-model="object.input" placeholder="请输入内容"  @keyup.enter="addItem(object.input)"  class="text1 input_style show" >
                  <!-- <button class="btn .btn_info_plain_disabled" style="margin-left:-100px"> 确定</button> -->
                </section>
                <ul class="ulList">
                  <li v-for='(item,index) in type' :key="index" @click="addItem(item.label)" class="liStyle" style="padding-left:20px;box-sizing:border-box;font-size:14px;border-radius:6px">{{item.label}}</li>
                </ul>
              </div>
          <!-- <el-select v-model="meetInfo.type" @change="changeType" placeholder="请选择" class="text1">
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select> -->
        </section>
      </section>
      <section class="flex text">
        <section >
          <span class="text0">
             <span class="mark">*</span>
            培训主题：</span>
          <!-- <span class="text1">主题1</span> -->
          <el-input v-model="meetInfo.theme" maxlength="50" placeholder="请输入内容" class="text1"></el-input>
        </section>
        <section style="position:relative">
          <span class="text0">
             <span class="mark">*</span>
            培训方式：</span>
            <input v-model="meetInfo.mode" placeholder="请输入内容" @click="showmode = !showmode" class="text1 input_style mode" >
            <div v-if='showmode' class="dialog_style" >
              <section class="flex" style="padding:10px 10px;box-sizing:border-box">
                <input v-model="object.inputmode" placeholder="请输入内容"  @keyup.enter="addmode(object.inputmode)"  class="text1 input_style mode" >
                <!-- <button class="btn .btn_info_plain_disabled" style="margin-left:-100px"> 确定</button> -->
              </section>
              <ul class="ulList">
                <li v-for='(item,index) in mode' :key="index" @click="addmode(item.label)" class="liStyle" style="padding-left:20px;box-sizing:border-box;font-size:14px;border-radius:6px">{{item.label}}</li>
              </ul>
            </div>
          <!-- <el-select v-model="meetInfo.mode" @change="changeMode" placeholder="请选择" class="text1">
              <el-option
                v-for="item in mode"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select> -->
        </section>
      </section>
      <section class="flex text">
        <section >
          <span class="text0">出席机构：</span>
          <!-- <span class="text1">机构1</span> -->
          <el-input v-model="meetInfo.attendOrganizational" :maxlength="5" placeholder="请输入内容" class="text1"></el-input>
        </section>
        <section style="position:relative">
          <span class="text0" >出席机构类型：</span>
          <!-- <span class="text1">财务公司</span> -->
           <input v-model="meetInfo.attendType" placeholder="请输入内容" @click="showattendType = !showattendType" class="text1 input_style attendType" >
            <div v-if='showattendType' class="dialog_style" >
              <section class="flex" style="padding:10px 10px;box-sizing:border-box">
                <input v-model="object.inputattendType" placeholder="请输入内容"  @keyup.enter="addattendType(object.inputattendType)"  class="text1 input_style attendType" >
                <!-- <button class="btn .btn_info_plain_disabled" style="margin-left:-100px"> 确定</button> -->
              </section>
              <ul class="ulList">
                <li v-for='(item,index) in attendType' :key="index" @click="addattendType(item.label)" class="liStyle" style="padding-left:20px;box-sizing:border-box;font-size:14px;border-radius:6px">{{item.label}}</li>
              </ul>
            </div>
          <!-- <el-select v-model="meetInfo.attendType" @change="changeattendType" placeholder="请选择" class="text1">
              <el-option
                v-for="item in attendType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select> -->
        </section>
      </section>
      <section class="flex text">
        <span class="text0">
         培训情况：</span>
        <div class="workTxt" >
          <textarea v-model="meetInfo.content" name="" id="" maxlength="500" style="width:99%;min-height:97%"></textarea>
        </div>
      </section>
    </section>
    <div class="btnBox">
        <button   @click="submit" class="btn btn_primary">保存</button>
        <button   @click="$router.push({name:'meeting'})" class="btn btn_info_plain_disabled">取消</button>
        <!-- <el-button type="primary" class="btn" @click="submit">保存</el-button> -->
        <!-- <el-button type="info" class="btn btn-primary" @click="$router.push({name:'meeting'})" style="">取消</el-button> -->
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Prop, Vue} from 'vue-property-decorator';
  import Step from '@/components/Step.vue'
import { daily } from '../../api';
  @Component({
    components:{
      Step
    }
  })
  export default class MeetingEdit extends Vue {
    private message=['日常管理','培训会议','编辑']
    private isView = true
    private meetInfo={
      trainAt:'',
      type:'',
      theme:'',
      mode:'',
      attendOrganizational:'',
      attendType:'',
      content:''
    }
    private showList = false
    private showmode = false
    private showattendType = false
    // 出席机构类型
    private attendType=[{
        label: '财务公司',
        value: '1'
      },{
        label: '保险公司',
        value: '2'
      },{
        label: '银行',
        value: '3'
      },
    ]
    // 培训方式
    private mode=[
      {
        label: '微信',
        value: '1'
      },{
        label: '会议',
        value: '2'
      },{
        label: '座谈',
        value: '3'
      },{
        label: '电话会议',
        value: '4'
      },
    ]
    // 培训类型
    private type=[
      {
        label: '市场推介',
        value: '1'
      },{
        label: '产品研判',
        value: '2'
      },
    ]
    public object={
      input: '',
      inputmode: '',
      inputattendType: '',
    }
    private addItem(item:any) {
      this.meetInfo.type = item
      this.object.input = ''
      this.showList =!this.showList
    }
    private addmode(item:any) {
      this.meetInfo.mode = item
      this.object.inputmode = ''
      this.showmode =!this.showmode
    }
    private addattendType(item:any) {
      this.meetInfo.attendType = item
      this.object.inputattendType = ''
      this.showattendType =!this.showattendType
    }
    // 
  //  
    private changeType(val:any){
      for(var i=0;i<this.type.length;i++){
        if(this.type[i].value==val){
          this.meetInfo.type = this.type[i].label
        }
      }
    }
    
    private changeMode(val:any){
      for(var i=0;i<this.mode.length;i++){
        if(this.mode[i].value==val){
          this.meetInfo.mode = this.mode[i].label
        }
      }
    }
    private changeattendType(val:any){
      for(var i=0;i<this.attendType.length;i++){
        if(this.attendType[i].value==val){
          this.meetInfo.attendType = this.attendType[i].label
        }
      }
    }
    // 编辑--培训会议
    private async editMeet(id:any){
      let res:any = await daily.editmeetInfo(`id=${id}`)
      this.meetInfo = res.data.data
    }
    
    // 新增--培训会议
    private async  addMeetingInfo(){
      if(!this.meetInfo.mode||! this.meetInfo.theme||!this.meetInfo.trainAt||!this.meetInfo.type){
          this.$message.warning('请将必填项填写完整')
          return false
      }
      if(this.$route.query.id){
        let data:any = {
          attendOrganizational: this.meetInfo.attendOrganizational,
          attendType:  this.meetInfo.attendType,
          content:  this.meetInfo.content,
          // createAt:  this.meetInfo.trainAt,
          id: this.$route.query.id,
          mode:  this.meetInfo.mode,
          theme:  this.meetInfo.theme,
          trainAt:  this.meetInfo.trainAt,
          type:  this.meetInfo.type,
        }
        let res:any = await daily.updateMeeting(data)
        if(res.data.success){
          this.$message.success('编辑成功!')
        }else{
          this.$message.error(`${res.data.msg}`)
        }
        this.$router.push({name:'meeting'})
      }else{
        let data:any ={
          attendOrganizational: this.meetInfo.attendOrganizational,
          attendType:  this.meetInfo.attendType,
          content:  this.meetInfo.content,
          // createAt:  this.meetInfo.trainAt,
          // id: 0,
          mode:  this.meetInfo.mode,
          theme:  this.meetInfo.theme,
          trainAt:  this.meetInfo.trainAt,
          type:  this.meetInfo.type,
        }
        let res:any = await daily.addMeeting(data)
        // const { success } = res.data.success
        if(res.data.success){
          this.$message.success('新增成功!')
        }else{
          this.$message.error(`${res.data.msg}`)
        }
        this.$router.push({name:'meeting'})
      }
     
    }
    // 提交
    private submit(){
      this.addMeetingInfo()
    }
    mounted() {
      let id:any = this.$route.query.id
      if(this.$route.query.id){
        this.message=['日常管理','培训会议','编辑']
        this.editMeet(this.$route.query.id)
      }else{
        this.message=['日常管理','培训会议','新增']
      }
      document.addEventListener('click', (e)=> {
        const el: any = e
        if (el.target.className != 'text1 input_style show') {
            this.showList = false;
        }
         if (el.target.className != 'text1 input_style mode') {
            this.showmode = false;
        }
         if (el.target.className != 'text1 input_style attendType') {
            this.showattendType = false;
        }
      })
    }
  }

</script>

<style lang="less" scoped >
/deep/.el-input__icon{
  height:32px
}
main{
  .context{
      padding:20px 20px 20px 0;
      box-sizing: border-box;
      ul,li{
        list-style: none;
        padding:0;
        margin:0;
      }
      .text{
        line-height: 50px;
        font-size: 16px;
       }
      .text0{
        display:inline-block;
        width:114px;
        color:rgba(49,50,51,1);
        font-size: 16px;
        margin-right:32px;
        text-align:right;
        flex-shrink:0
      }
      .text1{
         display:inline-block;
        width:224px !important;
        margin-right:100px;
        // color:rgba(96,98,102,1);
        // font-size: 16px;
      }
      .textxx{
        line-height: 30px;
        margin: 10px 0;
      }
      .workTxt{
        width:80%;
        min-height:224px !important;
        margin:20px 0 0 0px;
        // padding: 0 20px 0px 20px;
        // box-sizing: border-box;
        word-wrap: break-word;
        word-break:break-all;
        overflow: hidden;
      }
      .input_style{
        width:224px !important;
        height:32px;
        border:1px solid rgba(228,231,237,1);
        border-radius: 4px;
        padding-left: 20px;
        box-sizing: border-box ;
        font-size:14px;
        // color: rgba(228,231,237,1);
      }
      input::-webkit-input-placeholder{
        color:#C0C4CC;
      }
      .dialog_style{
        position:absolute;
        left:145px;
        top:42px;
        z-index:999;
        background:#fff;
        border:1px solid rgba(228,231,237,1);
        width:224px !important;
      }
      .liStyle:hover{
        color: #5792FC;
        background: #F8FAFE
      }
     
  }
  .btnBox{
    width:264px;
    margin:auto;
    display:flex;
    justify-content: space-around;
     .btn-primary{
          background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(192,196,204,1);
      color: rgba(192,196,204,1)
      }
  }
  
}
</style>