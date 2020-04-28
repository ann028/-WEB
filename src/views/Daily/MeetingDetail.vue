<template>
  <main class="container">
    <Step :stepName="message" :isView="isView"></Step>
    <section class="context">
      <section class="flex text">
        <section >
          <span class="text0">培训时间：</span>
          <span class="text1">{{info.trainAt}}</span>
        </section>
        <section>
          <span class="text0">培训类型：</span>
          <span class="text1">{{info.type}}</span>
        </section>
      </section>
      <section class="flex text">
        <section >
          <span class="text0">培训主题：</span>
          <span class="text1">{{info.theme}}</span>
        </section>
        <section>
          <span class="text0">培训方式：</span>
          <span class="text1">{{info.mode}}</span>
        </section>
      </section>
      <section class="flex text">
        <section >
          <span class="text0">出席机构：</span>
          <span class="text1">{{info.attendOrganizational}}</span>
        </section>
        <section>
          <span class="text0" >出席机构类型：</span>
          <span class="text1">{{info.attendType}}</span>
        </section>
      </section>
      <section class="flex text">
        <span class="text0">
         培训情况：</span>
         <!-- <span class="text1">{{info.content}}</span> -->
        <div class="workTxt">
            <textarea v-model="info.content" readonly="readonly"  style="width:90%;min-height:240px"></textarea>
        </div>
      </section>
    </section>
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
export default class MeetingDetail extends Vue {
  private message = ['日常管理', '培训会议', '详情'];
  private isView = true
  private info = {}
  private async getMeeting(id: any){
    let res: any = await daily.editmeetInfo(`id=${id}`)
    this.info = res.data.data
  }
  private created() {
    let id: any = this.$route.query.id
    this.getMeeting(this.$route.query.id)
  }
}
</script>

<style lang="less" scoped>
main{
  .context{
      padding:20px 20px 20px 0;
      box-sizing: border-box;
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
        flex-shrink: 0;
      }
      .text1{
         display:inline-block;
        width:224px;
        margin-right:100px;
        // color:rgba(96,98,102,1);
        // font-size: 16px;
      }
      .workTxt{
        width:90%;
        min-height: 240px;
        margin:20px 0 0 0px;
        // padding: 0 20px 0px 20px;
        // box-sizing: border-box;
        word-wrap: break-word;
        word-break:break-all;
        overflow: hidden;
      }
  }
  
}
</style>