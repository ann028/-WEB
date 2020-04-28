<template>
    <div id="leaveDetail">
      <section class="container">
        <Step :stepName="message" :isView="isView"></Step>
        <section class="context">
          <section class="flex text">
            <section >
              <span class="text0">员工姓名：</span>
              <span class="text1">{{userInfo.user.name}}</span>
            </section>
            <section>
              <span class="text0">部门：</span>
              <span class="text1">{{userInfo.user.departmentName}}</span>
            </section>
          </section>
          <section class="text">
             <span class="text0">日报类型：</span>
              <span class="text1">{{$route.query.type}}</span>
          </section>
          <section class="text flex" >
            <span class="text0">日报内容：</span>
            <div class="textCox">
              <section class="cross_center">
                <span class="text0">
                <span class="mark">*</span>
                    日期：</span>
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="personInfo.timeValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeValue"
                  :clearable="false"
                  class="line">
                </el-date-picker>
              </section>
              <section>
                <span class="text0">
                  请假天数：</span>
                <span class="text1">{{personInfo.day}}</span>
              </section>
              <!-- <section class="flex">
                  <span class="text0">
                    <span class="mark">*</span>
                    请假类型：</span>
                  <span class="text1">{{personInfo.type}}</span>
              </section> -->
              <section class="flex">
                <span class="text0">
                    <span class="mark">*</span>请假类型：</span>
                    <div >
                      <span class="text1">{{personInfo.type}}</span>
                    </div>
              </section>
              <section class="flex">
                <span class="text0">
                    <span class="mark">*</span>请假事由：</span>
                    <div class="workTxt">
                      <textarea v-model="personInfo.reason" readonly="readonly"  style="width:100%;min-height:97%"></textarea>
                    </div>
              </section>
            </div>
          </section>

        </section>
      </section>
    </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue} from 'vue-property-decorator';
  import { daily } from '@/api/index'
  import Step from '@/components/Step.vue';
  import * as Factory from '@/factory/index'
  @Component({
    components: {
      Step
    },
   
  })
  export default class Detail extends Vue {
    public message = ['日常管理','日报','个人表','详情'];
    private isView = true
    public personInfo={
      timeValue:[],
      type:0
    }
    private leaveOptions: any = Factory.leaveOption()
    public get userInfo(){
      return this.$store.state.userInfo
    }
      // 查询个人请假单
    private async getLeaveinfo(id: any){
      let res:any = await daily.getEditleave(`id=${id}`)
      this.personInfo = res.data.data
      let arr:any = []
      arr[0] = res.data.data.startTime
      arr[1] = res.data.data.endTime
      this.personInfo.timeValue = arr
      for(var i=0,len = this.leaveOptions.length;i<len;i++){
        if(res.data.data.type === this.leaveOptions[i].value){
          this.personInfo.type = this.leaveOptions[i].label
        }
      }
    }
    // 修改时间
    private changeValue(val:any){
      this.personInfo.timeValue = val
    }
     mounted() {
      if(this.$route.query.id){
        let id:any = this.$route.query.id
        this.getLeaveinfo(id)
      }
     }
  }
</script>
<style lang="less" >
#leaveDetail{
  /deep/ .el-input__icon{
    line-height: 26px;
  }
  /deep/ .el-date-editor .el-range-separator{
    line-height: 26px;
  }
.el-date-editor.el-input,
  .el-input__inner,
  .el-select{
    width:224px!important;
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
            .workTxt{
              width:80%;
              // flex-grow: 1;
              min-height: 240px;
              margin:20px 0 0 0;
              // padding: 0 20px 0px 20px;
              // box-sizing: border-box;
              word-wrap: break-word;
              word-break:break-all;
              overflow: hidden;
            }
          }
        }
        .text0{
          display:inline-block;
          width:92px;
          color:rgba(49,50,51,1);
          font-size: 16px;
          margin-right:32px;
          text-align:right;
          flex-shrink: 0;
        }
        .text1{
          display:inline-block;
          width:200px;
          color:rgba(96,98,102,1);
          font-size: 16px;
        }
        .success{
          color:rgba(87,146,252,1);
        }
      }
    }
}

</style>