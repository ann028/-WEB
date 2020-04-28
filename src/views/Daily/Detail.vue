<template>
    <div>
      <section class="container">
        <Step v-if='$route.query.work === "week"' :stepName="message1" :isView="isView"></Step>
        <Step v-else :stepName="message" :isView="isView"></Step>
        <section class="context">
          <section class="flex text">
            <section class="flex">
              <span class="text0">员工姓名:</span>
              <!-- <span class="text1">{{userInfo.user.name}}</span> -->
              <span class="text1" v-if='$route.query.id'>{{personInfo.userName}}</span>
              <span class="text1" v-else>{{userInfo.user.name}}</span>
            </section>
            <section  class="flex">
              <span class="text0">部门:</span>
              <!-- <span class="text1">{{personInfo.departName}}</span> -->
              <span class="text1" v-if='$route.query.id'>{{personInfo.departName}}</span>
              <span class="text1" v-else>{{userInfo.user.departmentName}}</span>
            </section>
          </section>
          <section class="text flex">
             <span class="text0">日报类型:</span>
              <span class="text1">{{$route.query.type}}</span>
          </section>
          <section class="flex text">
              <span class="text0" style="flex-shrink:0;margin-right:30px">日报内容:</span>
              <div class="textCox">
                  <section class="text flex">
                    <span class="text0">日期:</span>
                    <span class="text1">{{personInfo.dailyAt}}</span>
                  </section>
                  <section class="flex">
                    <section class="flex">
                      <span class="text0">机构名称:</span>
                      <span class="text1">{{personInfo.mechanism}}</span>
                    </section>
                    <section class="flex">
                      <span class="text0">机构部门:</span>
                      <span class="text1">{{personInfo.mechanismDept}}</span>
                    </section>
                  </section>
                  <section class="flex">
                    <section class="flex">
                      <span class="text0">联系人:</span>
                      <span class="text1">{{personInfo.contacts}}</span>
                    </section>
                    <section class="flex">
                      <span class="text0">联系方式:</span>
                      <span class="text1">{{personInfo.contactsPhone}}</span>
                    </section>
                  </section>
                  <section class="flex">
                    <span class="text0" style="flex-shrink:0">工作内容:</span>
                    <div class="workTxt">
                      <textarea v-model="personInfo.content" readonly="readonly"  style="width:100%;min-height:97%"></textarea>
                    </div>
                  </section>
                  <section class="text flex">
                    <span class="text0">工作进展:</span>
                    <span class="text1">{{personInfo.workProgress}}</span>
                  </section>
                  <section class="text flex">
                    <span class="text0">沟通方式:</span>
                    <span class="text1">{{talkWay}}</span>
                  </section>
              </div>
          </section>
          <section class="flex text">
              <span  class="text0">状态:</span>
              <span  class="text1 success" v-if='personInfo.state=="COMMIT"'>已提交</span>
              <span  class="text1" v-else>暂存</span>
          </section>
          <section class="flex text">
              <span  class="text0">提交时间:</span>
              <span  class="text1">{{personInfo.createAt ? personInfo.createAt : ''}}</span>
          </section>
        </section>
      </section>
    </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue} from 'vue-property-decorator';
  import { daily } from '@/api/index'
  import Step from '@/components/Step.vue';
  @Component({
    components: {
      Step
    },
  })
  export default class Detail extends Vue {
    public message = ['日常管理','日报','个人表','详情'];
    public message1 = ['日常管理','周报','个人表','详情'];
    private isView = true
    private talkWay=''
    public personInfo={
      dailyType:1
    }
    public get userInfo(){
      return this.$store.state.userInfo
    }
    public async getPersoninfo(id:any){
      let res:any = await daily.getEditperson(`id=${id}`)
      this.personInfo = res.data.data
      if(res.data.data.communicate1==1){
        if(res.data.data.communicate2==1){
            if(res.data.data.communicate3==1){
               this.talkWay = '面访-培训-内部'
            }else if(res.data.data.communicate3==2){
                this.talkWay = '面访-培训-外部'
            }
        }else if(res.data.data.communicate2==2){
            if(res.data.data.communicate3==1){
                this.talkWay = '面访-沟通-内部'
            }else if(res.data.data.communicate3==2){
               this.talkWay = '面访-沟通-外部'
            }
        }
      } else if (res.data.data.communicate1 == 3) {
      this.talkWay = '公司内部';
      } else if(res.data.data.communicate1 == 2){
        if(res.data.data.communicate2 == 1){
            if(res.data.data.communicate3 == 1){
              this.talkWay = '线上-培训-内部'
            }else if(res.data.data.communicate3 == 2){
              this.talkWay ='线上-培训-外部'
            }
        }else if(res.data.data.communicate2 == 2){
            if(res.data.data.communicate3 == 1){
                if(res.data.data.communicate4 == 1){
                    this.talkWay = '线上-沟通-内部微信'
                }else if(res.data.data.communicate4 == 2){
                    this.talkWay = '线上-沟通-内部电话'
                }
            }else if(res.data.data.communicate3 == 2){
                if(res.data.data.communicate4 == 1){
                    this.talkWay = '线上-沟通-外部微信'
                }else if(res.data.data.communicate4 == 2){
                    this.talkWay = '线上-沟通-外部电话'
                }
            }
        }
      }
  }
  public mounted() {
    const id: any = this.$route.query.id;
    if(this.$route.query.type === 'depart'){
      this.message = ['日常管理','周报','个人表','详情']
    }
    this.getPersoninfo(id);
  }
}
</script>
<style lang="less" scoped>
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
          margin:20px 0 0 0;
          background:rgba(245,247,250,1);
          border-radius:4px;
          padding: 24px 40px;
          box-sizing: border-box;
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
        }
      }
      .text0{
        display:inline-block;
        width:80px;
        color:rgba(49,50,51,1);
        font-size: 16px;
        margin-right:32px;
        text-align:right;
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
</style>
