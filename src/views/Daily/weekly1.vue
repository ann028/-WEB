<template>
  <main class="container">
    <Step :stepName="message"></Step>
    <div class="flex" style="justify-content:space-between">
      <section class="flex">
        <!-- <el-date-picker
          v-model="timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="changeTime"
          clearable = 'true'
          style="width:224px;margin-right:20px">
        </el-date-picker> -->
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          @change = 'changeTime'
           :clearable="false"
          style="width:224px;line-height:40px;margin-top:18px">
        </el-date-picker>
        <span style="line-height:32px;margin:20px 10px 0 10px;">至</span>
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="结束日期"
           @change = 'changeTime'
          value-format="yyyy-MM-dd"
           :clearable="false"
          style="width:224px;margin:18px 20px 0 0;line-height:40px;">
        </el-date-picker>
        <button class="btn btn_primary mt20" style="width:76px;height:32px" @click="getperson">查询</button>
      </section>
      <section class="mt20">
        <button @click="reCalculate"  class="btn btn_succ " style="width:78px;height:32px;margin-right:10px">
            重新统计
        </button>
         <button v-if="permission.includes('prm1212')" @click="exportInfo" class="btn btn_warning " style="width:78px;height:32px">
            <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
           导出</button>
      </section>
    </div>
    <div style="margin-top:20px;width:100%">
      <table class="table">
        <thead>
          <th style='width:5%'>序号</th>
          <th style='width:10%'>员工姓名</th>
          <th style='width:10%'>部门</th>
          <th style='width:10%'>沟通方式</th>
          <th style='width:5%'>次数</th>
          <th style='width:15%'>机构名称</th>
          <th style='width:15%'>工作进展</th>
          <th style='width:15%'>工作内容</th>
          <th style='width:15%'>详情</th>
        </thead>
        <tbody>
          <template v-for="item in tableData" >
            <template v-for="(item1,index1) in item.weeklyDailyChildren">
                <tr v-for='(m,i) in item1.dailyChildVoList' :key="m">
                  <td v-if='index1==0&&i==0' :rowspan='item.index'>{{i+1}}</td>
                  <td v-if='index1==0&&i==0' :rowspan='item.index'>{{item.userName}}</td>
                  <td v-if='index1==0&&i==0' :rowspan='item.index'>{{item.departmentName}}</td>
                  <td v-if="i==0" :rowspan='item1.communicateNum === 0?1:item1.communicateNum'>
                    <span v-if='item1.communicateType  === 1'>面访</span>
                    <span v-if='item1.communicateType  === 2'>线上</span>
                    <span v-if='item1.communicateType  === 3'>公司内部</span>
                  </td>
                   <td v-if="i==0" :rowspan='item1.communicateNum === 0?1:item1.communicateNum'>{{item1.communicateNum}}</td>
                  <td >{{m.mechanism}}</td>
                  <td>{{m.workProgress}}</td>
                  <td>{{m.content.length>10?m.content.slice(0,10)+'...':m.content}}</td>
                  <td :class='[item1.communicateNum != 0?"viewInfo":""]' @click="item1.communicateNum != 0?viewInfo(m, m.dailyId):''" >
                    <img v-if="item1.communicateNum != 0" src="../../assets/img/viewInfo.png" style="width:16px;">
                    <span v-if="item1.communicateNum != 0" style="margin-left:5px;color:#5792FC">查看</span>
                  </td>
                </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
  import Step from '@/components/Step.vue';
  import { daily } from '@/api/index'
  @Component({
    components: {
      Step,
    },
  })
export default class weekly1 extends Vue{
  private message = ['日常管理','周报','个人表']
  private timeValue = []
  private startTime = ''
  private endTime = ''
  private reTime = ''
  private tableData = [
    // {
    //   userName:'李天一',
    //   departmentName:'渠道销售部',
    //   index:5,
    //   weeklyDailyChildren:[
    //     {
    //       communicateNum:2,
    //       communicateType:'面访',
    //       dailyStandard:'10',
    //       isStandard:'0',
    //       dailyChildVoList:[{
    //         content:'内容',
    //         dailyId:'1',
    //         mechanism:'xx机构',
    //         workProgress:'完成'
    //       },{
    //         content:'内容',
    //         dailyId:'2',
    //         mechanism:'xx机构',
    //         workProgress:'完成'
    //       }]
    //     }, {
    //       communicateNum: 2,
    //       communicateType: '线上',
    //       dailyStandard: '10',
    //       isStandard: '0',
    //       dailyChildVoList: [{
    //         content: '内容',
    //         dailyId: '1',
    //         mechanism: 'xx机构',
    //         workProgress: '完成',
    //       }, {
    //         content: '内容',
    //         dailyId: '1',
    //         mechanism: 'xx机构',
    //         workProgress: '完成',
    //       }],
    //     }, {
    //       communicateNum:1,
    //       communicateType:'公司内部',
    //       dailyStandard:'10',
    //       isStandard:'0',
    //       dailyChildVoList:[{
    //         content:'内容',
    //         dailyId:'1',
    //         mechanism:'xx机构',
    //         workProgress:'完成'
    //       }]
    //     }
    //   ]
    // },{
    //   userName:'李天',
    //   departmentName:'渠道销售部',
    //   index:1,
    //   weeklyDailyChildren:[{
    //     communicateNum:1,
    //       communicateType:'面访',
    //       dailyStandard:'10',
    //       isStandard:'0',
    //       dailyChildVoList:[{
    //          content:'内容',
    //         dailyId:'1',
    //         mechanism:'xx机构',
    //         workProgress:'完成'
    //       }]
    //   }]
    // }
     
  ]
  private tableData1 = []
  private async  getperson() {
    let res:any = await daily.getweeklyPerson({
      endTime: this.endTime,
      startTime: this.startTime,
    })
    let data:any = res.data.data
    let index:any=0
    let obj:any ={}
    for(var i=0;i<data.length;i++){
      obj.name = data[i].userName
      obj.depart = data[i].departmentName
      for(var j =0;j<data[i].weeklyDailyChildren.length;j++){
        for(var n=0;n<data[i].weeklyDailyChildren[j].dailyChildVoList.length;n++){
            index+=1
        }
      }
      obj.index= index
      data[i]['index'] = index
    }
    this.tableData = data
  }
  public get permission() {
    return this.$store.state.permission
  }
  // 获取当前时间
 private getnowTime(){
    const date = new Date();
    const dateTime  = date.getTime();
    const dateDay = date.getDay();
    let i = dateDay === 0?1:0;
    let end = new Date(dateTime - (dateDay + 7*i)*24*60*60*1000)
    let beg = new Date(dateTime -(dateDay + (7 * i) +6)*24*60*60*1000)
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
    this.reTime = re1
}
// 改变时间
private changeTime(val:any){
    // this.timeValue = val
    const date = new Date(val);
    const dateTime  = date.getTime();
    const dateDay = date.getDay();
    let end = new Date(dateTime + (7 -dateDay )*24*60*60*1000)
    let beg = new Date(dateTime - (dateDay - 1)*24*60*60*1000)
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
    const re1 = `${year1}-${month1}-${da2}`
    let dat: any = [];
    dat = [beg1, end1]; // 将值设置给插件绑定的数据
    this.timeValue = dat;
    this.startTime = beg1;
    this.endTime = end1;
    this.reTime = re1

}
// 导出个人周报
private async exportInfo(){
  let res: any
  res = await daily.exportPerson({
    endTime: this.endTime,
    startTime: this.startTime,
  })
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
// 
private async reCalculate() {
  let res: any = await daily.reCalcula(`date=${this.reTime}`)
  if(res.data.code === 0) {
    this.getperson() //获取周报个人表
  }else {
    this.$message.error(`${res.data.msg}`)
  }
}
// 路由跳转
private viewInfo(m: any, id: any){
    // this.$router.push({ name: 'clientdailyAdd', query: { id: id, operation: 'detail', type: '工作' }})
  if (m.type === 2) {
    this.$router.push({ name: 'clientdailyAdd', query: { id: m.parentId, operation: 'detail', type: '工作' }})
  } else if (m.type === 1) {
    this.$router.push({name:'detail',query:{id:id,type:'工作',work:'week'}})
  }
}
  
  
  created() {
    this.getnowTime()
    this.getperson() //获取周报个人表
  }

}
</script>
<style lang="less" scoped>
/deep/.el-input__icon{
  height:32px;
  line-height: 40px;
}
.container{
  .table{
    width:100%;
    border-collapse:collapse;
    border-spacing:0;
    text-align: center;
    font-size:14px;
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
    }
    .viewInfo{
      cursor: pointer;
    }
  }
}
</style>