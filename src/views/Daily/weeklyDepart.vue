<template>
  <main class="container">
      <Step :stepName='message'></Step>
      <div  style="display:flex;justify-content:space-between;flex-wrap:wrap">
        <section class="flex">
          <!-- <el-date-picker
            v-model="timeValue"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
             @change="value"
            clearable = 'true'
            class="line">
          </el-date-picker> -->
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            @change = 'changeTime'
             :clearable="false"
            class="line"
            style="line-height:40px;margin-top:18px">
          </el-date-picker>
          <span style="line-height:32px;margin:20px 10px 0 10px">至</span>
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="结束日期"
            @change = 'changeTime'
            value-format="yyyy-MM-dd"
             :clearable="false"
            class="line"
            style="line-height:40px;margin-top:18px">
          </el-date-picker>
          <section class=" m0 flex  mt20">
            <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">员工姓名</span>
            <el-input v-model="userName" clearable placeholder="请输入内容" class="line"></el-input>
          </section>
          <!-- <section class="flex m0">
            <span style="flex-shrink:0;font-size:14px;color:rgba(96,98,102,1);margin:0 20px;line-height:28px">部门</span>
            <el-select v-model="departValue" placeholder="请选择" class="text1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </section> -->
        <button class="btn btn_primary  mt20" style="width:76px;height:32px;margin-left:20px" @click="isRole">查询</button>
        </section>
        <section class="flex mt20">
          <button v-if="permission.includes('prm1222')" class="btn btn_primary" @click="editWork" style="width:76px;height:32px;margin-right:10px">
            <img src="../../assets/img/edit.png" alt="" style="width:16px;height:16px">
          编辑</button>
          
          <button v-if="permission.includes('prm1224')"  @click="exportInfo" class="btn btn_warning" style="width:76px;height:32px;margin-right:10px">
            <img src="../../assets/img/send2.png" alt="" style="width:16px;height:16px;">
            导出</button>
          <button @click="reCalculation" class="btn btn_succ" style="width:78px;height:32px;margin-right:10px">
              重新统计
          </button>
          <!-- <el-button type="primary">新增</el-button> -->
        </section>
      </div>  
      <div style="margin-top:27px;width:100%" >
      <table class="table">
        <thead>
          <th>序号</th>
          <th >员工姓名</th>
          <th >部门</th>
          <th >沟通方式</th>
          <th >次数</th>
          <th >机构名称</th>
          <th >工作进展</th>
          <th >工作内容</th>
          <th >是否达标</th>
          <th >达标线</th>
          <!-- <th style='width:10%'>详情</th> -->
        </thead>
        <tbody>
          <template v-for="(item,k) in tableData" >
            <template v-for="(item1,index1) in item.weeklyDailyChildren">
                <tr v-for='(m,i) in item1.dailyChildVoList' :key="m">
                  <td v-if='index1==0&&i==0' :rowspan='item.index'>{{k+1}}</td>
                  <td v-if='index1==0&&i==0' :rowspan='item.index'>{{item.userName}}</td>
                  <td v-if='index1==0&&i==0' :rowspan='item.index'>{{item.departmentName}}</td>
                  <td v-if="i==0" :rowspan='item1.communicateNum !=0?item1.communicateNum:1'>
                    <span v-if='item1.communicateType  === 1'>面访</span>
                    <span v-if='item1.communicateType  === 2'>线上</span>
                    <span v-if='item1.communicateType  === 3'>公司内部</span>
                  </td>
                   <td v-if="i==0" :rowspan='item1.communicateNum !=0?item1.communicateNum:1'>{{item1.communicateNum}}</td>
                  <td >
                    <input v-if="isEdit&&m.mechanism!='-'&&m.type===1" maxlength="100" class="editInput" type="text" v-model="m.mechanism">
                    <span v-else>{{m.mechanism}}</span>
                  </td>
                  <td>
                    <input v-if="isEdit&&m.mechanism!='-'&&m.type===1" class="editInput editInput1" type="text" v-model="m.workProgress">
                    <span v-else>{{m.workProgress}}</span>
                  </td>
                  <td>
                    <div  @mouseenter="mouseMigration(m.dailyId)" @mouseleave="mouseRemoval(m.dailyId)">
                        <template >
                         {{m.content.length>5?m.content.slice(0,5)+'...':m.content}}
                        </template>
                    </div>
                     <div class="dpop" v-if="m.isDialog"  title="弹框" >
                        <template>
                            {{m.content}}
                            <!-- {{m.isDialog}} -->
                        </template>
                    </div>
                  </td>
                  <td v-if="i==0" :rowspan='item1.communicateNum !=0?item1.communicateNum:1'>
                    <span v-if='item1.isStandard === 1' >达标</span>
                    <span v-else-if='item1.isStandard === 2' class="noLine">未达标</span>
                    <span v-else-if='item1.isStandard  === 3' >不参与达标</span>
                    <!-- <span v-else>-</span> -->
                  </td>
                  <td v-if="i==0" :rowspan='item1.communicateNum !=0?item1.communicateNum:1'>{{item1.dailyStandard === 0?'-':item1.dailyStandard}}</td>
                  <!-- <td class="viewInfo" @click="viewInfo(m.dailyId)">
                    <img src="../../assets/img/viewInfo.png" style="width:20px;">
                    <span></span>
                    <span style="margin-left:5px;color:#5792FC">查看</span>
                  </td> -->
                </tr>
            </template>
          </template>
          <tr >
             <td :rowspan="3" :colspan="3">合计</td>  
             <td>面访</td> 
             <td>{{communicateNum1}}</td> 
             <td :colspan="5"></td>
          </tr>
          <tr >
            <td>线上</td> 
            <td>{{communicateNum2}}</td> 
             <td :colspan="5"></td>
          </tr>
          <tr >
             <td>公司内部</td> 
             <td>{{communicateNum3}}</td>
              <td :colspan="5"></td>  
          </tr>
        </tbody>
      </table>
      </div>
       <div  v-if="isEdit" style="display:flex;justify-content:center;margin-top:40px">
          <el-button @click="saveInfo" type="primary" style="margin-right:80px">保存</el-button>
          <el-button @click="isEdit = false,isRole()" >取消</el-button>
        </div>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import Step from '@/components/Step.vue';
import { daily } from '../../api';
import * as Factory from '@/factory/index'

@Component({
    components: {
      Step,
    },
  })
export default class weeklyDepart extends  Vue {
  private message = ['日常管理', '周报', '部门表'];
  private userName = '';
  private isEdit = false;
  private timeValue:any[] = []
  private startTime = '';
  private endTime = '';
  private reTime = ''; //统计时间
  private tableData = [];
  private allValue = []
  private communicateNum1:number = 0
  private communicateNum2:number = 0
  private communicateNum3:number = 0
  private isDialog = false
  //
  private options: any = Factory.workProgressOption()
  // 部门数据
  private async getdepart() {
    let res:any = await daily.getweeklyDepart({
      endTime: this.endTime,
      startTime: this.startTime,
      userName: this.userName
    })
    let data:any = res.data.data
    let index:any=0
    let obj:any ={}
    let communicateNum1:number = 0
    let communicateNum2:number = 0
    let communicateNum3:number = 0
    for(var i=0;i<data.length;i++){
      obj.name = data[i].userName
      obj.depart = data[i].departmentName
      for(var j =0;j<data[i].weeklyDailyChildren.length;j++){
        if(data[i].weeklyDailyChildren[j].communicateType === 1){
             communicateNum1 += data[i].weeklyDailyChildren[j].communicateNum
        }else if(data[i].weeklyDailyChildren[j].communicateType === 2){
            communicateNum2 += data[i].weeklyDailyChildren[j].communicateNum
        }else if(data[i].weeklyDailyChildren[j].communicateType === 3){
            communicateNum3 += data[i].weeklyDailyChildren[j].communicateNum
        }
        for(var n=0;n<data[i].weeklyDailyChildren[j].dailyChildVoList.length;n++){
            data[i].weeklyDailyChildren[j].dailyChildVoList[n]['isDialog'] = false
            index+=1
        }
      }
      obj.index= index
      data[i]['index'] = index
      index = 0
    }
    this.communicateNum1 = communicateNum1
    this.communicateNum2 = communicateNum2
    this.communicateNum3 = communicateNum3
    this.tableData = data
  } 
  // 个人数据
  private async getdepartp() {
    let res:any = await daily.getweeklyDepartP({
      endTime: this.endTime,
      startTime: this.startTime,
      userName: this.userName
    })
    let data:any = res.data.data
    let index:any=0
    let obj:any ={}
    let communicateNum1:number = 0
    let communicateNum2:number = 0
    let communicateNum3:number = 0
    for(var i=0;i<data.length;i++){
      obj.name = data[i].userName
      obj.depart = data[i].departmentName
      for(var j =0;j<data[i].weeklyDailyChildren.length;j++){
        if(data[i].weeklyDailyChildren[j].communicateType === 1){
             communicateNum1 += data[i].weeklyDailyChildren[j].communicateNum
        }else if(data[i].weeklyDailyChildren[j].communicateType === 2){
            communicateNum2 += data[i].weeklyDailyChildren[j].communicateNum
        }else if(data[i].weeklyDailyChildren[j].communicateType === 3){
            communicateNum3 += data[i].weeklyDailyChildren[j].communicateNum
        }
        for(var n=0;n<data[i].weeklyDailyChildren[j].dailyChildVoList.length;n++){
            data[i].weeklyDailyChildren[j].dailyChildVoList[n]['isDialog'] = false
            index+=1
        }
      }
      obj.index= index
      data[i]['index'] = index
      index = 0
    }
    this.communicateNum1 = communicateNum1
    this.communicateNum2 = communicateNum2
    this.communicateNum3 = communicateNum3
    this.tableData = data
  }
  public get permission() {
    return this.$store.state.permission
  }
  // 时间选择器改变时触发
  private changeTime(val: any){
    // this.timeValue = val
    const date = new Date(val);
    const dateTime  = date.getTime();
    const dateDay = date.getDay();
    let end = new Date(dateTime + (7 - dateDay)*24*60*60*1000)
    let beg = new Date(dateTime - (dateDay -1)*24*60*60*1000)
    let re = new Date(dateTime + (8 -dateDay )*24*60*60*1000)
    const year = beg.getFullYear();   // '2019'
    const month = beg.getMonth() + 1 < 10 ? '0' + (beg.getMonth() + 1) : (beg.getMonth() + 1);  // '04'
    const da = beg.getDate() < 10 ? '0' + beg.getDate() :beg.getDate();  // '12'
    const year1 = end.getFullYear();   // '2019'
    const month1 = end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);  // '04'
    const da1 = end.getDate() < 10 ? '0' + end.getDate() :end.getDate();  // '12'
      const da2 = re.getDate() < 10 ? '0' + re.getDate() :re.getDate();  // '12'
    const beg1 = `${year}-${month}-${da}`
    const end1 = `${year1}-${month1}-${da1}`
     const end2 = `${year1}-${month1}-${da2}`
     const re1 = `${year1}-${month1}-${da2}`
    let dat: any = [];
    dat = [beg1, end1]; // 将值设置给插件绑定的数据
    this.timeValue = dat;
    this.startTime = beg1;
    this.endTime = end1;
    this.reTime = re1;
  }
  // 工作进展下拉
  // private changeWorkprogress(val:any){
    //   let arr:any = this.options
    //   for(var i=0,len =arr.lenght;i<len;i++){
    //       if(val === arr[i].value){

    //       }
    //   }
  // }
  // 提交修改
  private async saveInfo() {
    let arr:any[] = []
    let data:any = this.tableData
    for(var i=0,len=data.length;i<len;i++){
      for(var j=0,lenj = data[i].weeklyDailyChildren.length;j<lenj;j++){
        for(var m =0,lenm = data[i].weeklyDailyChildren[j].dailyChildVoList.length;m<lenm;m++){
          if(data[i].weeklyDailyChildren[j].dailyChildVoList[m].dailyId){
            arr.push({
              id:data[i].weeklyDailyChildren[j].dailyChildVoList[m].dailyId,
              mechanism: data[i].weeklyDailyChildren[j].dailyChildVoList[m].mechanism,
              workProgress:data[i].weeklyDailyChildren[j].dailyChildVoList[m].workProgress
            })
          }
          
        }
      }
    }
    let res:any = await daily.updateDepart(arr)
    const { success} = res.data;
    if(success){
      this.$message.success('编辑成功!')
      this.isEdit = false
      this.isRole()
    }else{
      this.$message.error(`${res.data.msg}`)
    }
  }
  // 周报-部门表-导出
  private async exportInfo() {
    let res: any
    if( this.$store.state.permission.includes('prm1223') ) {
      res = await daily.exportDepart({
        endTime: this.endTime,
        startTime: this.startTime,
      })
    }else {
      res = await daily.exportDepartP({
        endTime: this.endTime,
        startTime: this.startTime,
      })
    }
    let res1 = res.data
    var blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `周报-${this.startTime}-${this.endTime}.xls`; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
  // 获取时间
  private nowTime() {
    const date = new Date();
    const dateTime  = date.getTime();
    const dateDay = date.getDay();
    let i = dateDay === 0?1:0;
    let end = new Date(dateTime - (dateDay + 7 * i)*24*60*60*1000)
    let beg = new Date(dateTime - (dateDay + (7 * i)+ 6)*24*60*60*1000)
    let re = new Date(dateTime - (dateDay + 7*i)*24*60*60*1000 + 24*60*60*1000)
    const year = beg.getFullYear();   // '2019'
    const month = beg.getMonth() + 1 < 10 ? '0' + (beg.getMonth() + 1) : (beg.getMonth() + 1);  // '04'
    const da = beg.getDate() < 10 ? '0' + beg.getDate() :beg.getDate();  // '12'
    const year1 = end.getFullYear();   // '2019'
    const month1 = end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);  // '04'
    const da1 = end.getDate() < 10 ? '0' + end.getDate() :end.getDate();  // '12'
    const da2 = re.getDate() < 10 ? '0' + re.getDate() :re.getDate();  // '12'
    const beg1 = `${year}-${month}-${da}`
    const end1 = `${year1}-${month1}-${da1}`
    const re1 = `${year1}-${month1}-${da2}`
    let dat: any = [];
    dat = [beg1, end1]; // 将值设置给插件绑定的数据
    this.timeValue = dat;
    this.startTime = beg1;
    this.endTime = end1;
    this.reTime = re1;
  }
  // 鼠标移入显示
  private mouseMigration(dailyId: any) {
    const data:any = this.tableData
    if ( dailyId != undefined) {
      for(var i=0;i<data.length;i++){
        for(var j =0;j<data[i].weeklyDailyChildren.length;j++){
            for(var n=0;n<data[i].weeklyDailyChildren[j].dailyChildVoList.length;n++){
              if (data[i].weeklyDailyChildren[j].dailyChildVoList[n]['dailyId'] === dailyId) {
                if(data[i].weeklyDailyChildren[j].dailyChildVoList[n]['content'].length > 5) {
                  this.$set(data[i].weeklyDailyChildren[j].dailyChildVoList[n] ,'isDialog', true)
                }
                // data[i].weeklyDailyChildren[j].dailyChildVoList[n]['isDialog'] = true
              }
            }
          }
      }
    }
  }
  private mouseRemoval(dailyId: any) {
     const data:any = this.tableData
     if (dailyId != undefined) {
      for(var i=0;i<data.length;i++){
        for(var j =0;j<data[i].weeklyDailyChildren.length;j++){
            for(var n=0;n<data[i].weeklyDailyChildren[j].dailyChildVoList.length;n++){
              if (data[i].weeklyDailyChildren[j].dailyChildVoList[n]['dailyId'] === dailyId) {
                this.$set(data[i].weeklyDailyChildren[j].dailyChildVoList[n] ,'isDialog', false)
              }
            }
          }
      }
     }
  }
  // 编辑
  private editWork() {
    if(this.tableData.length > 0) {
      this.isEdit=true
    }else {
      this.$message.warning('没有可编辑项！')
    }
  }
  // 权限判断
  private isRole() {
    if(this.$store.state.permission.includes('prm1223')) {
      this.getdepart()
    } else {
      this.getdepartp()
    }
  }
  // 重新统计
private async reCalculation() {
  let res: any = await daily.reCalcula(`date=${this.reTime}`)
  if(res.data.code === 0) {
     this.isRole() //获取周报个人表
  }else {
    this.$message.error(`${res.data.msg}`)
  }
}
  public mounted() {
    this.nowTime()
    this.isRole()
  }


}
</script>
<style lang="less" scoped>
/deep/.el-input__icon{
  height:32px;
  line-height: 40px;  
}
  .container{
    .mt20{
      margin-top:20px
    }
    .line{
      width:224px !important;
    }
    .table{
      width:100%;
      border-collapse:collapse;
      border-spacing:0;
      text-align: center;
      font-size:15px;
      color:rgba(96,98,102,1);
      thead{
        background:#F5F6FA;
        line-height:50px;
        color:#909399;
      }
      td{
        word-break: break-all; /*允许在字内换行,即单词可分*/
        word-wrap:break-word;/*允许长单词或URL地址换行*/
        border-right:1px solid #EAEAEA;
        border-bottom:1px solid #EAEAEA; 
        line-height: 40px;
        position: relative;
      }
      .noLine{
        color: #F88200;
      }
      .editInput{
        width: 196px;
        border:1px solid rgba(234,234,234,1);
        padding: 5px 20px;
        box-sizing: border-box;
      }
      .editInput1{
        width: 116px;
      }
      .viewInfo{
        cursor: pointer;
      }
      .dpop{
        position: absolute;
        border: 2px solid #F5F7FA;
        z-index: 999;
        background: #ffff;
        top: 40px;
        right: 80px;
        padding: 20px;
        box-sizing: border-box;
        width: 400px;
        border-radius: 10px;
        border-bottom-right-radius:0;
        box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
      }
    }
  }
</style>