<template>
    <div>
      <section class="container">
        <Step :stepName="message" :isView="isView"></Step>
        <section class="context">
          <section class="flex text">
            <section  class="flex">
              <span class="text0">员工姓名：</span>
              <span class="text1" v-if='$route.query.type'>{{personInfo.userName}}</span>
              <!-- <span class="text1" v-else>{{userInfo.user.name}}</span> -->
            </section>
            <section  class="flex">
              <span class="text0">部门：</span>
              <span class="text1" v-if='$route.query.type'>{{personInfo.departName}}</span>
              <!-- <span class="text1" v-else>{{userInfo.user.departmentName}}</span> -->
            </section>
          </section>
          <section class="text ">
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
            <span class="text0" style="flex-shrink: 0">日报内容：</span>
            <div class="textCox">
                <section class="text flex">
                  <span class="text0">
                  <span class="mark">*</span>
                    日期：</span>
                   <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="personInfo.dailyAt"
                      type="date"
                      placeholder="选择日期"
                      class="text1"
                      :clearable="false"
                      style="line-height: 40px; margin: 6px 0;">
                    </el-date-picker>
                </section>
                <section class="flex">
                  <section>
                    <span class="text0">
                      <span class="mark">*</span>机构名称：</span>
                      <el-input :maxlength="100" v-model="personInfo.mechanism"  placeholder="xx银行xx分行" class="text1"></el-input>
                  </section>
                  <section class="cross_center" style="position: relative">
                    <span  class="text0" ><span class="mark">*</span>机构部门：</span>
                    <input v-model="personInfo.mechanismDept" placeholder="请选择" @click="changeShow" class="text1 input_style show" >
                    <div v-if='showList' class="dialog_style">
                      <section class="flex main_center" style="padding: 10px 10px;box-sizing: border-box;">
                        <input v-model="object.input" placeholder="自定义添加" @keyup.enter="addItem(object.input)" class="text1 input_style show" style="width: 150px;padding-left: 10px;box-sizing: border-box;">
                        <button @click="addItem(object.input)" class="confirmButton">确定</button>
                      </section>
                      <ul class="ulList">
                        <li v-for='(item,index) in List' :key="index" @click="addItem(item.label)" class="liStyle" style="padding-left: 20px;box-sizing: border-box;font-size: 14px;border-radius: 6px">{{item.label}}</li>
                      </ul>
                    </div>
                  </section>
                </section>
                <section class="flex">
                  <section class="flex">
                    <span class="text0">联系人：</span>
                    <el-input :maxlength="30" v-model="personInfo.contacts" placeholder="请输入内容" class="text1"></el-input>
                  </section>
                  <section class="flex">
                    <span  class="text0">联系方式：</span>
                    <el-input :maxlength="30" v-model="personInfo.contactsPhone" placeholder="请输入内容" class="text1"></el-input>
                  </section>
                </section>
                <section class="flex">
                  <span class="text0 flex"><span class="mark">*</span>工作内容：</span>
                  <div class="workTxt">
                    <textarea name="" id="" v-model="personInfo.content"  onKeyUp="if(personInfo.content.length > 5000) {personInfo.content = personInfo.content.substr(0,5000)}"  style="width: 100%;min-height: 97%;"></textarea>
                  </div>
                </section>
                <section class="text cross_center" style="position: relative;">
                  <span class="text0">
                  <span class="mark">*</span>工作进展：</span>
                  <input v-model="personInfo.workProgress" placeholder="请选择" @click="changework" class="text1 input_style work" >
                  <div v-if='showwork' class="dialog_style">
                    <section class="flex" style="padding: 10px 10px;box-sizing: border-box;">
                      <input v-model="workObject.input"  placeholder="自定义添加"  @keyup.enter="addWork(workObject.input)"  class="text1 input_style work" style="width: 150px;padding-left: 10px;box-sizing: border-box;">
                      <button class="confirmButton"  @click="addWork(workObject.input)">确定</button>
                    </section>
                    <ul class="ulList">
                      <li v-for='(item,index) in options' :key="index" @click="addWork(item.label)" class="liStyle" style="padding-left: 20px;box-sizing: border-box;font-size: 14px;border-radius: 6px;">{{item.label}}</li>
                    </ul>
                  </div>
                </section>
                <section class="flex text">
                  <span class="text0"><span class="mark">*</span>沟通方式：</span>
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
                </section>
            </div>
          </section>
          <!-- 请假 -->
          <section class="text flex" v-if='radio === 2'>
            <span class="text0">日报内容：</span>
            <div class="textCox">
              <section >
                <span class="text0"><span class="mark">*</span>日期：</span>
                <el-date-picker
                  v-model="personInfo.startTime"
                  type="date"
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  @change = 'changeTime'
                  :clearable="false"
                  style="width: 224px;line-height: 40px; margin: 6px 0">
                </el-date-picker>
                <span style="margin:0 5px;">至</span>
                <el-date-picker
                  v-model="personInfo.endTime"
                  type="date"
                  placeholder="结束日期"
                  @change = 'changeTime1'
                  value-format="yyyy-MM-dd"
                  :clearable="false"
                  style="width: 224px;line-height: 40px; margin: 6px 0;">
                </el-date-picker>
              </section>
              <section class="flex">
                <span class="text0">请假天数：</span>
                <el-input v-model="personInfo.day" :disabled="true" placeholder="请假天数（自动计算）" class="text1"></el-input>
              </section>
              <section  class="flex ">
                <span class="text0"><span class="mark">*</span>请假类型：</span>
                <el-select v-model="personInfo.type" placeholder="请选择" class="text1">
                  <el-option
                    v-for="item in leaveOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </section>
              <section class="flex">
                <span class="text0"><span class="mark">*</span>请假事由：</span>
                <div class="workTxt">
                  <textarea :maxlength="200"  v-model="personInfo.reason" name="" id="" cols="50" rows="10" style="width:100%"></textarea>
                </div>
              </section>
            </div>
          </section>
          <section v-if='radio === 1' class="text flex" style="color: red;">备注：请假期间无需提交日报</section>
        </section>
        <div  style="width: 436px;margin: auto;display: flex;justify-content: space-around;">
          <button :class="['btn btn_primary_plain_disabled',isActive?'btn_primary_plain':'']"   @click="addPerson('draft')">暂存</button>
          <button :class="['btn btn_succ_plain_disabled',isActive?'btn_succ_plain':'']"  @click="addPerson('commit')">提交</button>
          <button class="btn btn_info_plain_disabled" @click="$router.push({name:'personal'})">取消</button>
        </div>
      </section>
    </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import Step from '@/components/Step.vue';
  import { daily } from '@/api/index'
  import * as Factory from '@/factory/index'

  @Component({
    components: {
      Step
    },
  })
  export default class Edit extends Vue {
    public message = ['日常管理','日报','个人表','编辑'];
    private isView = true
    public radio = 1; // 工作/请假
    public interviewRadio1 = 1  // 面访/培训
    public onlineRadio = NaN
    public insideRadio = NaN
    private leaveOptions: any = Factory.leaveOption()
    public object = {
      input:'',
      departinput:'',
    }
    public isActive = false
    public get userInfo () {
      return this.$store.state.userInfo
    }
    // 个人数据展示
    public personInfo:any = {
      contacts: '',
      content: '',
      contactsPhone: '',
      dailyAt: '',
      mechanism: '',
      mechanismDept: '',
      workProgress: '',
      timeValue: [],
      day: '1',
      type: '',
      reason: '',
      startTime: '',
      endTime: '',
      departmentName: '',
    }
    private workProgress = ''
    private selectInfo = []
    private workObject = {
      input: '',
    }
    public showList = false
    public showwork = false
    private options: any = Factory.workProgressOption()
    private List: any = Factory.mechanismOption()
    private changeShow() {
      this.showList = !this.showList
    }
    private changework() {
      this.showwork = !this.showwork
    }
    private addItem(item: any) {
      this.personInfo.mechanismDept = item
      // this.object.departinput = ''
      this.object.input = ''
      this.showList = !this.showList
    }
    private addWork(item: any) {
      this.personInfo.workProgress = item
      // this.object.departinput = ''
      this.workObject.input = ''
      this.showwork = !this.showwork
    }
   
    // 机构名称
    @Watch('personInfo.mechanism') private mechanism(val: any, old: any){
      if(this.personInfo.mechanism!=''&&this.personInfo. mechanismDept!=''&& this.personInfo.content!=''&&this.personInfo.workProgress!=''&&(this.interviewRadio1!=NaN||this.onlineRadio!=NaN||this.insideRadio!=NaN)){
          this.isActive = true
      }else{
        this.isActive = false
      }
    }
    //机构部门
    @Watch('personInfo.mechanismDept') private mechanismDept(val: any, old: any){
      if(this.personInfo.mechanism!=''&&this.personInfo. mechanismDept!=''&& this.personInfo.content!=''&&this.personInfo.workProgress!=''&&(this.interviewRadio1!=NaN||this.onlineRadio!=NaN||this.insideRadio!=NaN)){
          this.isActive = true
      }else{
        this.isActive = false
      }
    }
    // @Watch('object.input') private cuscomInput(val: any,old: any) {
    //   this.personInfo.mechanismDept = val
    // }
    // 工作内容
    @Watch('personInfo.content') private content(val: any, old: any){
      if(this.personInfo.mechanism!=''&&this.personInfo. mechanismDept!=''&& this.personInfo.content!=''&&this.personInfo.workProgress!=''&&(this.interviewRadio1!=NaN||this.onlineRadio!=NaN||this.insideRadio!=NaN)){
          this.isActive = true
      }else{
        this.isActive = false
      }
    }
    // 工作进展
    @Watch('personInfo.workProgress') private work(val: any, old: any){
      if(this.personInfo.mechanism!=''&&this.personInfo. mechanismDept!=''&& this.personInfo.content!=''&&this.personInfo.workProgress!=''&&(this.interviewRadio1!=NaN||this.onlineRadio!=NaN||this.insideRadio!=NaN)){
          this.isActive = true
      }else{
        this.isActive = false
      }
    }
    // 请假类型
    @Watch('personInfo.type') private Type(val: any, old: any){
      if(this.personInfo.type!=''&&this.personInfo.reason !=''){
        this.isActive = true
      }else{
        this.isActive = false
      }
    }
    // 请假事由
    @Watch('personInfo.reason') private Reason(val: any, old: any){
      if(this.personInfo.type!=''&&this.personInfo.reason !=''){
        this.isActive = true
      }else{
        this.isActive = false
      }
    }
    // 监测单选按钮状态转换
    @Watch('radio') private Radio(val: any, old: any){
      this.isActive = false
    }
    // 监听选项框值的变化，清空其余选项组
    @Watch('onlineRadio')  private online(val: any,old: any){
        if(val!=''){
          let aa:any =this.interviewRadio1
          let bb:any = this.insideRadio
          aa =''
          bb=''
          this.interviewRadio1 = aa
          this.insideRadio = bb
        }
    }
    @Watch('interviewRadio1')  private interview(val: any,old: any){
        if(val!=''){
          let aa:any =this.onlineRadio
          let bb:any = this.insideRadio
          aa =''
          bb=''
          this.onlineRadio = aa
          this.insideRadio = bb
        }
    }
    @Watch('insideRadio')  private inside(val: any,old: any){
        if(val!=''){
           let aa:any =this.interviewRadio1
          let bb:any = this.onlineRadio
          aa =''
          bb=''
          this.interviewRadio1 = aa
          this.onlineRadio = bb
        }
    }
    // 根据userId查看个人信息
    public async getPerson(userId: any) {
      let res:any = await daily.getEditperson(`id=${userId}`)
      this.personInfo = res.data.data
      if ( res.data.data.communicate1 == 1 ) {
        if ( res.data.data.communicate2 == 1 ) {
            if (res.data.data.communicate3 == 1) {
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
      } else if (res.data.data.communicate1 == 2) {
          if (res.data.data.communicate2 == 1) {
            if (res.data.data.communicate3 == 1) {
              this.onlineRadio = 1;
            } else if (res.data.data.communicate3 == 2) {
              this.onlineRadio = 2;
            }
          } else if (res.data.data.communicate2 == 2) {
            if (res.data.data.communicate3 == 1) {
                if (res.data.data.communicate4 == 1) {
                  // let aa:any = this.onlineRadio
                  // aa =3
                  this.onlineRadio = 3;
                } else if (res.data.data.communicate4 == 2) {
                  this.onlineRadio = 4;
                } 
              } else if (res.data.data.communicate3 == 2) {
                if (res.data.data.communicate4 == 1) {
                  this.onlineRadio = 5;
                } else if (res.data.data.communicate4 == 2) {
                  this.onlineRadio = 6;
                }
              }
          }
      } else if (res.data.data.communicate1 == 3) {
        this.insideRadio = 1;
      }
    }
    // 新增个人日报
    public async addPerson(state: any) {
      if (!this.isActive) {
        this.$message.warning('请将必填项填写完整')
        return false
      }
      if (this.interviewRadio1 === 1 ) {
        let arr: any = [1,1,1,0]
        this.selectInfo = arr
      } else if (this.interviewRadio1 === 2 ) {
        let arr: any = [1,1,2,0]
        this.selectInfo = arr
      } else if (this.interviewRadio1 === 3 ) {
        let arr: any = [1,2,1,0]
        this.selectInfo = arr
      } else if (this.interviewRadio1 === 4 ) {
        let arr: any = [1,2,2,0]
        this.selectInfo = arr
      } else if (this.onlineRadio === 1 ) {
        let arr: any = [2,1,1,0]
        this.selectInfo = arr
      } else if (this.onlineRadio === 2 ) {
        let arr: any = [2,1,2,0]
        this.selectInfo = arr
      } else if (this.onlineRadio === 3 ) {
        let arr: any = [2,2,1,1]
        this.selectInfo = arr
      } else if (this.onlineRadio === 4 ) {
        let arr: any = [2,2,1,2]
        this.selectInfo = arr
      } else if (this.onlineRadio === 5 ) {
        let arr: any = [2,2,2,1]
        this.selectInfo = arr
      } else if (this.onlineRadio === 6 ) {
        let arr: any = [2,2,2,2]
        this.selectInfo = arr
      } else if (this.insideRadio === 1 ) {
        let arr: any = [3,1,0,0]
        this.selectInfo = arr
      }
      if (this.personInfo.contactsPhone) {
        var phone = this.personInfo.contactsPhone;
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
          this.$message.error('手机号码有误，请重填')
          return false; 
        } 
      }
      if (this.radio === 1) {
        if (this.$route.query.userId && !this.$route.query.operation) {
          let data: any = {
            userId: window.sessionStorage.getItem('userId') || NaN,
            communicate1: this.selectInfo[0],
            communicate2: this.selectInfo[1],
            communicate3: this.selectInfo[2],
            communicate4:this.selectInfo[3],
            contacts: this.personInfo.contacts,
            contactsPhone: this.personInfo.contactsPhone,
            content: this.personInfo.content,
            dailyAt: this.personInfo.dailyAt,
            id: this.$route.query.userId,
            mechanism: this.personInfo.mechanism,
            mechanismDept: this.personInfo.mechanismDept,
            state: state ==='commit' ? 'COMMIT' : 'DRAFT',
            workProgress: this.personInfo.workProgress
          }
          let res:any = await daily.updatePerson(JSON.parse(JSON.stringify(data)))
          if (res.data.success) {
            this.$message({
              message:'编辑成功',
              type:'success'
            })
            this.$router.push({name:'personal'})
          } else {
            this.$message({
              message:res.data.msg,
              type:'error'
            })
            // this.$router.push({name:'personal'})
          }
        } else {
          let data: any = {
            userId: window.sessionStorage.getItem('userId') || NaN,
            communicate1: this.selectInfo[0],
            communicate2: this.selectInfo[1],
            communicate3: this.selectInfo[2],
            communicate4:this.selectInfo[3],
            contacts: this.personInfo.contacts,
            contactsPhone: this.personInfo.contactsPhone,
            content: this.personInfo.content,
            dailyAt: this.personInfo.dailyAt,
            mechanism: this.personInfo.mechanism,
            mechanismDept: this.personInfo.mechanismDept,
            state: state ==='commit' ? 'COMMIT' : 'DRAFT',
            workProgress: this.personInfo.workProgress,
          }
          let res: any = await daily.addDailyperson(JSON.parse(JSON.stringify(data)))
          if (res.data.success) {
            this.$message({
              message:'添加成功',
              type:'success'
            })
            this.$router.push({name:'personal'})
          } else {
            this.$message({
              message:res.data.msg,
              type:'error'
            })
            // this.$router.push({name:'personal'})
          }
        }
      } else if (this.radio === 2) {
        let start: any =Date.parse(this.personInfo.startTime) 
        let end: any = Date.parse(this.personInfo.endTime)
        let dateSpan: any = start - end
        dateSpan = Math.abs(dateSpan)
        let day: any = this.personInfo.day
        day = Math.floor(dateSpan / (24 * 3600 * 1000));
        this.personInfo.day = day + 1
        if (this.$route.query.userId) {
          let data: any = {
            day: this.personInfo.day,
            endTime: this.personInfo.endTime,
            id: this.$route.query.userId || '',
            reason: this.personInfo.reason,
            startTime: this.personInfo.startTime,
            state: state === 'commit' ? 'COMMIT' : 'DRAFT',
            type: this.personInfo.type,
          }
          let res: any = await daily.updateleavePerson(JSON.parse(JSON.stringify(data)))
          if (res.data.success) {
            this.$message({
              message:'编辑成功',
              type:'success'
            })
            this.$router.push({name:'personal'})
          } else {
            this.$message({
              message:res.data.msg,
              type:'error'
            })
          }
        } else {
          let data: any = {
            day: this.personInfo.day,
            endTime: this.personInfo.endTime,
            reason: this.personInfo.reason,
            startTime: this.personInfo.startTime,
            state: state === 'commit' ? "COMMIT" : 'DRAFT',
            type: this.personInfo.type,
          }
          let res: any = await daily.addleavePerson(JSON.parse(JSON.stringify(data)))
          if (res.data.success) {
            this.$message({
              message:'添加成功',
              type:'success'
            })
            this.$router.push({name:'personal'})
          } else {
            this.$message({
              message:res.data.msg,
              type:'error'
            })
          }
        }
      }
    }
    // 根据userId查询个人请假信息
    private async getLeaveperson(userId: any) {
      let res: any = await daily.getEditleave(`id=${userId}`),
      startTime = JSON.stringify(res.data.data.startTime),
      endTime = JSON.stringify(res.data.data.endTime)
      this.personInfo = res.data.data
      this.personInfo.timeValue = [
        startTime,
        endTime
      ]
    }
    // // 时间选择器改变时触发
    private changeTime(val: any) {
      // this.personInfo.timeValue = val
      this.personInfo.startTime = val
      this.personInfo.endTime = val
      let start: any = Date.parse(val) 
      let end: any = Date.parse(val)
      let dateSpan: any = start - end
      dateSpan = Math.abs(dateSpan)
      let day: any = this.personInfo.day
       day = Math.floor(dateSpan / (24 * 3600 * 1000));
      this.personInfo.day = day + 1
    }
    private changeTime1(val: any) {
      this.personInfo.endTime = val
      let start: any = Date.parse(this.personInfo.startTime) 
      let end: any = Date.parse(val)
      let dateSpan:any = start - end
      dateSpan = Math.abs(dateSpan)
      let day: any = this.personInfo.day
       day = Math.floor(dateSpan / (24 * 3600 * 1000));
      this.personInfo.day = day + 1
    }
    // 获取当前时间
    private getNowtime() {
     const date = new Date();
      const year = date.getFullYear();   // '2019'
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);  // '04'
      const da = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  // '12'
      const end = `${year}-${month}-${da}`
      const beg = `${year}-${month}-01`
      let dat: any = [];
      dat = [end, end]; // 将值设置给插件绑定的数据
      this.personInfo.dailyAt = end;
      this.personInfo.timeValue = dat
      this.personInfo.startTime = end
      this.personInfo.endTime = end
    }
    // 
    private mounted() {
      if (this.$route.query.userId) {
        if (this.$route.query.type === '1') {
          this.radio = 1
          this.getPerson(this.$route.query.userId)
          if (this.$route.query.operation) {
            this.message = ['日常管理','日报','个人表','新增']
          }
        } else if (this.$route.query.type === '2') {
          this.radio = 2
          this.getLeaveperson(this.$route.query.userId)
        }
      } else {
        this.message = ['日常管理','日报','个人表','新增']
        this.getNowtime()
      }

      document.addEventListener('click', (e)=> {
        const el: any = e
        if (el.target.className !== 'text1 input_style show') {
          this.showList = false;
        }
        if (el.target.className !== 'text1 input_style work') {
          this.showwork = false;
        }
      })
    }
  }
</script>
<style lang="less" scoped>
 /deep/ .el-input__icon{
  line-height: 40px;
  }
.el-input__inner{
  height:32px
}
.el-scrollbar__view .el-select-dropdown__list .el-select-dropdown__item {
  padding-left:20px;
}
.el-input__icon .el-icon-date{
  line-height: 50px !important ;
}
.el-select-dropdown__item{
  padding-left: 20px;
}
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
            top:44px;
            z-index:999;
            background:#fff;
            border:1px solid rgba(228,231,237,1);
            // padding: 10px 30px;
            // box-sizing: border-box;
            width:224px !important;
            .confirmButton{
              width: 92px;
              border: 0; 
              outline: 0;
              background: transparent;
              margin-left:-32px;
              font-size: 14px;
              cursor: pointer;
            }
          }
          .liStyle{
            cursor: pointer;
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
        .ulList{
          max-height: 300px;
          overflow-y:scroll;
        }
        .ulList::-webkit-scrollbar{
          display: none
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
</style>
