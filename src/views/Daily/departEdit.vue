<template>
    <div id="departEdit">
      <section class="container">
        <Step :stepName="message" :isView='isView'></Step>
        <section class="context">
          <section class="flex text">
            <section class="flex">
              <span class="text0">员工姓名：</span>
              <span class="text1" v-if='$route.query.userId'>{{departObject.userName}}</span>
              <span class="text1" v-else>{{userInfo.user.name}}</span>
            </section>
            <section class="flex">
              <span class="text0">部门：</span>
              <span class="text1" v-if='$route.query.userId'>{{departObject.departName}}</span>
              <span class="text1" v-else>{{userInfo.user.departmentName}}</span>
            </section>
          </section>
          <section class="text">
              <span class="text0">
                <span class="mark">*</span>
                日报类型：</span>
                <el-radio-group v-model="radio" v-if='!$route.query.userId'>
                  <el-radio :label="1" >工作</el-radio>
                  <el-radio :label="2" >请假</el-radio>
                </el-radio-group>
                <el-radio-group v-model="radio" v-if='$route.query.userId && $route.query.type === "1"'>
                  <el-radio :label="1" >工作</el-radio>
                </el-radio-group>
                <el-radio-group v-model="radio" v-if='$route.query.userId && $route.query.type === "2"'>
                  <el-radio :label="2" >请假</el-radio>
                </el-radio-group>
          </section>
          <!-- 工作 -->
          <section class="text flex" v-if='radio==1'>
            <span class="text0">日报内容：</span>
            <div class="textCox">
                <section class="textxx date1">
                  <span class="text0">
                  <span class="mark">*</span>
                    日期：</span>
                   <el-date-picker
                      v-model="departObject.dailyAt"
                      type="date"
                      placeholder="选择日期"
                      class="text1"
                      :clearable="false">
                    </el-date-picker>
                </section>
                <section class="flex">
                  <section>
                    <span class="text0">
                       <span class="mark">*</span>机构名称：</span>
                       <el-input v-model="departObject.mechanism" placeholder="xx公司xx分行" class="text1"></el-input>
                  </section>
                  <!-- <section style="display:flex"> -->
                    <!-- <span  class="text0" >
                       <span class="mark">*</span>机构部门：</span> -->
                       <!-- <el-select v-model="object.value" placeholder="请选择" class="text1">
                         <el-option>
                           <el-input v-model="object.input" placeholder="请输入内容" class="text1"></el-input>
                         </el-option>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select> -->
                      <!-- <div>
                        <ul>
                          <li style="width:224px;height:20px;line-height:20px">111</li>
                          <li style="width:224px;height:20px;line-height:20px">111</li>
                          <li style="width:224px;height:20px;line-height:20px">111</li>
                        </ul>
                      </div> -->
                  <!-- </section> -->
                  <section style="position:relative">
                    <span  class="text0" >
                      <span class="mark">*</span>机构部门：</span>
                      <input v-model="departObject.mechanismDept" placeholder="请输入内容" @click="changeShow" class="text1 input_style show" >
                      <div v-if='showList' class="dialog_style" style="">
                        <section class="flex" style="padding:10px 10px;box-sizing:border-box">
                          <input v-model="object.input" placeholder="请输入内容" @keyup.enter="onSubmit(object.input)"  class="text1 input_style show" >
                          <!-- <button class="btn .btn_info_plain_disabled" style="margin-left:-100px"> 确定</button> -->
                        </section>
                        <ul >
                          <li v-for='(item,index) in List' :key="index" @click="addItem(item.label)" class="liStyle" style="padding-left:20px;box-sizing:border-box;font-size:14px;border-radius:6px">{{item.label}}</li>
                        </ul>
                      </div>
                  </section>
                </section>
                <section class="flex">
                  <section>
                    <span class="text0">
                       联系人：</span>
                       <el-input v-model="departObject.contacts" placeholder="请输入内容" class="text1"></el-input>
                  </section>
                  <section>
                    <span  class="text0">
                       联系方式：</span>
                       <el-input v-model="departObject.contactsPhone" placeholder="请输入内容" class="text1"></el-input>
                  </section>
                </section>
                <section class="flex">
                  <span class="text0">
                     <span class="mark">*</span>工作内容：</span>
                  <div class="workTxt">
                    <textarea v-model="departObject.content" name="" id=""  style="width:100%;min-height:97%"></textarea>
                  </div>
                </section>
                <section class="text">
                  <span class="text0">
                  <span class="mark">*</span>
                    工作进展：</span>
                    <el-select v-model="departObject.workProgress" placeholder="请选择" class="text1">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </section>
                <section class="flex text">
                  <span class="text0">
                     <span class="mark">*</span>沟通方式：</span>
                    <table  cellspacing="0" width="50%" height="150" class="table_style">
                        <tr class="table_header">
                            <th colspan="2">面访</th>
                            <th colspan="2">线上</th>
                            <th>公司内部</th>
                        </tr>
                        <tr class="tr_style">
                            <td >培训</td><!--rowspan="2"纵向合并两个单元格-->
                            <td>沟通</td>
                            <td>培训</td>
                            <td>沟通</td>
                            <td>
                               <el-radio  v-model="insideRadio" :label="1">公司内部</el-radio>
                            </td>
                        </tr>
                        <tr class="tr_style">
                            <td >
                                <el-radio v-model="interviewRadio1" :label="1">内部</el-radio>
                            </td>
                            <td>
                              <el-radio v-model="interviewRadio1" :label="3">沟通</el-radio>
                            </td>
                            <td>
                              <el-radio v-model="onlineRadio" :label="1">培训</el-radio>
                            </td>
                            <td>
                              <el-radio v-model="onlineRadio"  :label="3">内部微信</el-radio>
                            </td>
                             <td ></td>
                        </tr>
                        <tr class="tr_style">
                            <td >
                                <el-radio v-model="interviewRadio1" :label="2">外部</el-radio>
                            </td>
                            <td>
                              <el-radio v-model="interviewRadio1" :label="4">外部</el-radio>
                            </td>
                            <td>
                              <el-radio  v-model="onlineRadio" :label="2">外部</el-radio>
                            </td>
                            <td>
                              <el-radio v-model="onlineRadio"  :label="4">内部电话</el-radio>
                            </td>
                             <td ></td>
                        </tr>
                        <tr class="tr_style">
                           
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              <el-radio v-model="onlineRadio" :label="5">外部微信</el-radio>
                            </td>
                            <td></td>

                        </tr>
                        <tr class="tr_style">
                            <td ></td>
                            <td></td>
                            <td></td>
                            <td>
                              <el-radio v-model="onlineRadio" :label="6">外部电话</el-radio>
                            </td>
                             <td ></td>
                        </tr>
                    </table>
                   <!-- <section  style="display:flex;justify-content:space-between">
                    <el-select v-model="object.value" placeholder="线上" class="text1" style="margin-right:20px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="object.value" placeholder="培训" class="text1" style="margin-right:20px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="object.value" placeholder="外部" class="text1" style="margin-right:20px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
                    <el-select v-model="object.value" placeholder="微信" class="text1" style="margin-right:20px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                   </section> -->
                </section>
            </div>
          </section>
          <!-- 请假 -->
          <section class="text flex" v-if='radio==2'>
            <span class="text0">日报内容：</span>
            <div class="textCox">
              <section class="textxx date1" >
                  <span class="text0">
                  <span class="mark">*</span>
                    日期：</span>
                   <!-- <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="departObject.timeValue"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="value"
                    class="line">
                  </el-date-picker> -->
                  <el-date-picker
                    v-model="departObject.startTime"
                    type="date"
                    placeholder="开始日期"
                    value-format="yyyy-MM-dd"
                    @change = 'changeTime'
                    :clearable="false"
                    style="width:224px;">
                  </el-date-picker>
                  <span style="margin:0 20px">至</span>
                  <el-date-picker
                    v-model="departObject.endTime"
                    type="date"
                    placeholder="结束日期"
                    @change = 'changeTime1'
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                    style="width:224px;margin-right:20px">
                  </el-date-picker>
              </section>
              <section>
                  <span class="text0">
                      请假天数：</span>
                      <el-input v-model="departObject.day" :disabled="true" placeholder="请输入内容" class="text1"></el-input>
              </section>
              <section>
                  <span class="text0">
                    <span class="mark">*</span>
                      请假类型：</span>
                      <el-select v-model="departObject.type" placeholder="请选择" class="text1">
                        <el-option
                          v-for="item in leaveOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
              </section>
              <section class="flex">
                <span class="text0">
                    <span class="mark">*</span>请假事由：</span>
                <div class="workTxt">
                  <textarea v-model="departObject.reason" name="" id="" cols="50" rows="10" style="width:100%"></textarea>
                </div>
              </section>
            </div>
          </section>
        </section>
        <div  style="width:436px;margin:auto;display:flex;justify-content:space-around">
          <button class="btn btn_primary" @click="submit">保存</button>
          <button class="btn btn_info_plain_disabled" @click="$router.push({name:'department'})">取消</button>
        </div>
          
      </section>
    </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import Step from '@/components/Step.vue';
  import { daily } from '../../api';
  import * as Factory from '@/factory/index'

  @Component({
    components: {
      Step
    },
  })
  export default class departEdit extends Vue {
    public message = ['日常管理','日报','部门表','编辑'];
    private isView = true;
    // let radio:string = 'work';
    public radio = 1;
    private options = [{
        value: '选项1',
        label: '公司内部'
      },{
        value: '选项2',
        label: '零售业务部'
      },
    ];
    public List=[
      {label: '公司内部',value: '1'},
      {label: '公司内部1',value: '2'},
      {label: '公司内部3',value: '3'},
      {label: '公司内部3',value: '3'},
    ]
    private leaveOptions: any = Factory.leaveOption()
    public departObject = {
      contacts: '',
      contactsPhone: '',
      content: '',
      dailyAt: '',
      mechanism: '',
      mechanismDept: '',
      workProgress: '',
      timeValue: [],
      day: '',
      type: '',
      reason: '',
      startTime: '',
      endTime: '',
    }
    public showList = false
    public object = {
      input:'',
      departinput:'',
    }
    public interviewRadio1 = NaN  //面访/培训
    public onlineRadio = NaN
    public insideRadio = NaN
    public selectInfo = []
    private onSubmit(item:any){
      this.List.push({
        label: item,
        value: '1'
      })
      this.object.input = ''
      this.object.departinput = item
      this.showList = !this.showList
    }
    private addItem(item:any) {
      this.object.departinput = item
      this.showList =! this.showList
    }
    // 
    public get userInfo() {
      return this.$store.state.userInfo
    }
    // 部门工作表
    private async getDepartinfo(userId:any){
      let res:any = await daily.getEditperson(`id=${userId}`)
      this.departObject = res.data.data
      if(res.data.data.communicate1==1){
        if(res.data.data.communicate2==1){
            if(res.data.data.communicate3==1){
                this.interviewRadio1=1
            }else if(res.data.data.communicate3==2){
                this.interviewRadio1=2
            }
        }else if(res.data.data.communicate2==2){
            if(res.data.data.communicate3==1){
                this.interviewRadio1=3
            }else if(res.data.data.communicate3==2){
                this.interviewRadio1=4
            }
        }

      }else if(res.data.data.communicate1==2){
          if(res.data.data.communicate2==2){
            if(res.data.data.communicate3==1){
              this.onlineRadio=1
            }else if(res.data.data.communicate3==2){
              this.onlineRadio=2
            }
          }else if(res.data.data.communicate2==1){
             if(res.data.data.communicate3==1){
                if(res.data.data.communicate4==1){
                  // let aa:any = this.onlineRadio
                  // aa =3
                  this.onlineRadio=3
                }else if(res.data.data.communicate4==2){
                  this.onlineRadio=4
                }
              }else if(res.data.data.communicate3==2){
                if(res.data.data.communicate4==1){
                  this.onlineRadio=5
                }else if(res.data.data.communicate4==2){
                  this.onlineRadio=6
                }
              }
          }

      }else if(res.data.data.communicate1==3){
        this.insideRadio = 1
      }
    }
    // 部门请假单

    // 编辑部门工作表
    private async addDepart() {
      if(this.interviewRadio1 === 1 ){
          let arr: any = [1,1,1,0]
          this.selectInfo = arr
        }else if(this.interviewRadio1 === 2 ){
          let arr: any = [1,1,2,0]
          this.selectInfo = arr
        }else if(this.onlineRadio === 1 ){
          let arr: any = [2,1,1,0]
          this.selectInfo = arr
        }else if(this.onlineRadio === 2 ){
          let arr: any = [2,1,2,0]
          this.selectInfo = arr
        }else if(this.onlineRadio === 3 ){
          let arr: any = [2,2,1,1]
          this.selectInfo = arr
        }else if(this.onlineRadio === 4 ){
          let arr: any = [2,2,1,2]
          this.selectInfo = arr
        }else if(this.onlineRadio === 5 ){
          let arr: any = [2,2,2,1]
          this.selectInfo = arr
        }else if(this.onlineRadio === 6 ){
          let arr: any = [2,2,2,2]
          this.selectInfo = arr
        }else if(this.insideRadio === 3 ){
          let arr: any = [3,1,0,0]
          this.selectInfo = arr
      }
      let data:any = {
        userId: window.sessionStorage.getItem('userId') || NaN,
        communicate1: this.selectInfo[0],
        communicate2: this.selectInfo[1],
        communicate3: this.selectInfo[2],
        communicate4:this.selectInfo[3],
        contacts: this.departObject.contacts,
        contactsPhone: this.departObject.contactsPhone,
        content: this.departObject.content,
        // createAt:this.departObject.createAt,
        dailyAt: this.departObject.dailyAt,
        // "departmentId": 0,
        id: this.$route.query.userId,
        mechanism: this.departObject.mechanism,
        mechanismDept: this.departObject.mechanismDept,
        state: "COMMIT",
        // "updateAt": "2019-09-12T02:32:25.898Z",
        workProgress: this.departObject.workProgress
      }
      let res:any = await daily.updatePerson(JSON.parse(JSON.stringify(data)))
      if (res.data.success) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(`{res.data.msg}`)
      }
      this.$router.push({name: 'department'})
    }
    // 编辑部门请假单
    private async addLeave() {
      let  data = {
        day: this.departObject.day,
        endTime: this.departObject.endTime,
        id: this.$route.query.userId,
        reason:  this.departObject.day,
        startTime:  this.departObject.startTime,
        state: "COMMIT",
        type: this.departObject.type,
        userId: window.sessionStorage.getItem('userId') || NaN,
      }
      let res:any = await daily.updateleavePerson(data)
      if(res.data.success){
        this.$message.success('修改成功!')
        this.$router.push({name:'department'})
      }else{
        this.$message.error(`${res.data.msg}`)
      }
    }
    //部门请假表
    private async getDepartleave(userId:any) {
      let res:any = await daily.getEditleave(`id=${userId}`)
      this.departObject = res.data.data

      let arr:any=[]
      arr[0] = res.data.data.startTime
      arr[1] = res.data.data.endTime
      this.departObject.timeValue = arr
      
      // let arr:any=[]
      // arr[0] = res.data.data.startTime
      // arr[1] = res.data.data.endTime
      // this.departObject.timeValue = arr
    }
    // // 时间选择器改变时触发
    // private value(val:any) {
      //   this.departObject.timeValue = val
      //   let start:any = Date.parse(val[0]) 
      //   let end:any = Date.parse(val[1])
      //   let dateSpan:any = start - end
      //   dateSpan = Math.abs(dateSpan)
      //   let day:any = this.departObject.day
      //    day = Math.floor(dateSpan / (24 * 3600 * 1000));
      //   this.departObject.day = day+1
    // }

    // // 时间选择器改变时触发
    private changeTime(val:any){
      // this.personInfo.timeValue = val
      this.departObject.startTime = val
      this.departObject.endTime = val
      let start:any =Date.parse(val) 
      let end:any = Date.parse(val)
      let dateSpan:any = start - end
      dateSpan = Math.abs(dateSpan)
      let day:any = this.departObject.day
       day = Math.floor(dateSpan / (24 * 3600 * 1000));
      this.departObject.day = day+1
    }
    private changeTime1(val: any){
      this.departObject.endTime = val
      let start:any =Date.parse(this.departObject.startTime) 
      let end:any = Date.parse(val)
      let dateSpan:any = start - end
      dateSpan = Math.abs(dateSpan)
      let day:any = this.departObject.day
       day = Math.floor(dateSpan / (24 * 3600 * 1000));
      this.departObject.day = day+1
    }
    // 提交
    private submit(){
      if(this.radio == 1){
        this.addDepart()
      }else if(this.radio == 2){
        this.addLeave()
      }
    }
    private changeShow(){
      this.showList = !this.showList
    }
    // 监听选项框值的变化，清空其余选项组
    @Watch('onlineRadio')  private online(val:any,old:any){
        if(val != ''){
          let aa:any = this.interviewRadio1
          let bb:any = this.insideRadio
          aa = ''
          bb = ''
          this.interviewRadio1 = aa
          this.insideRadio = bb
        }
    }
    @Watch('interviewRadio1')  private interview(val:any,old:any){
        if(val != ''){
          let aa:any = this.onlineRadio
          let bb:any = this.insideRadio
          aa = ''
          bb = ''
          this.onlineRadio = aa
          this.insideRadio = bb
        }
    }
    @Watch('insideRadio')  private inside(val:any,old:any){
        if(val != ''){
           let aa:any = this.interviewRadio1
          let bb:any = this.onlineRadio
          aa = ''
          bb = ''
          this.interviewRadio1 = aa
          this.onlineRadio = bb
        }
    }
    mounted() {
      if(this.$route.query.userId) {
        if(this.$route.query.type == '1') {
          this.radio =1
          this.getDepartinfo(this.$route.query.userId)
        }else if(this.$route.query.type == '2') {
          this.radio = 2
          this.getDepartleave(this.$route.query.userId)
        }
      }else{
         alert('111')
      }
      document.addEventListener('click', (e)=> {
        const el: any = e
        if (el.target.className != 'text1 input_style show') {
            this.showList = false;
        }
      })
    }
  }

</script>
<style lang="less" >
#departEdit{
.date1 .el-input__icon{
  line-height: 32px;
}
// .el-date-editor .el-range-separator,.el-input__icon{
//   height:32px
// }
// .el-tabs--border-card>.el-tabs__content{
//   padding: 0;
// }
// .el-input__inner{
//   height:28px
// }

// .el-select .el-input .el-select__caret{
//   line-height:28px
// }
// .el-select-dropdown__item{
//   padding-left: 20px;
// }
ul,li{
  list-style: none;
  padding:0;
  margin:0;
}
  .container{
    width: 100%;
    min-height: 200px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
    border-radius:12px;
    padding: 20px;
    box-sizing: border-box;
    .context{
      padding:20px;
      box-sizing: border-box;
      .text{
        line-height: 50px;
        font-size: 16px;
        .textCox{
          flex-grow:1;
          min-height: 360px;
          margin:20px 0 0 0px;
          background:rgba(245,247,250,1);
          border-radius:4px;
          padding: 24px 40px;
          box-sizing: border-box;
          .textxx{
            line-height: 30px;
            margin: 10px  0;
          }
          .workTxt{
            width:80%;
            // flex-grow: 1;
            min-height: 240px;
            margin:20px 0 0 0px;
            padding: 0 20px 0px 0px;
            box-sizing: border-box;
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
            left:126px;
            top:41px;
            z-index:999;
            background:#fff;
            border:1px solid rgba(228,231,237,1);
            // padding: 10px 30px;
            // box-sizing: border-box;
            width:224px;
          }
          .liStyle:hover{
            color: #5792FC;
            background: #F8FAFE
          }
          .tr_style{
            text-align: center
          }
          .table_style{
            margin-top:20px;
            // border:1px solid  #EAEAEA;
            .table_header{
                background:rgba(248,250,254,1);
               th{
                  border-bottom:1px solid  #EAEAEA;
                  border-right:1px solid  #EAEAEA;
                  color:rgba(78,78,78,1);
                }
            }
           
            td{
              border:1px solid  #EAEAEA;
              background: #fff
            }
          }
        }
      }
      .text0{
        display:inline-block;
        width:94px;
        color:rgba(49,50,51,1);
        font-size: 16px;
        margin-right:32px;
        text-align:right;
      }
      .text1{
         display:inline-block;
        width:224px !important;
        margin-right:30px;
        // color:rgba(96,98,102,1);
        // font-size: 16px;
      }
      .success{
        color:rgba(87,146,252,1);
      }
    }
   
  }
}
</style>
