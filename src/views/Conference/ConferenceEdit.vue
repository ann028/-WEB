<template>
  <main class="container">
      <Step :stepName = "message" :isView = 'isView' :imgUrl = "imgUrl"></Step>
      <section class="content">
        <section class="flex text">
          <span class="text_title">
            <span class="mark">*</span>
            会议/活动类型
          </span>
          <el-input v-if="type === 'edit'" class="text_word" maxlength="50" v-model="textInfo.meetingType" clearable placeholder="请输入内容"></el-input>
          <span v-else class="text_word" >{{textInfo.meetingType}}</span>
        </section>
        <section class="flex text">
          <span class="text_title">
            <span class="mark">*</span>
            会议/活动名称
          </span>
          <el-input v-if="type === 'edit'" class="text_word" maxlength="100" v-model="textInfo.meetingName" clearable placeholder="请输入内容"></el-input>
          <span v-else class="text_word">{{textInfo.meetingName}}</span>
        </section>
        <section class="flex text" >
          <span class="text_title">
            <span class="mark">*</span>
            时间
          </span>
          <el-date-picker
            v-model="textInfo.meetAt"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd hh:mm:ss"
            v-if="type === 'edit'"
            clearable
            style="width: 594px; line-height: 40px; margin: 5px 0">
          </el-date-picker>
          <span v-else class="text_word">{{textInfo.meetAt}}</span>
        </section>
        <section class="flex text">
          <span class="text_title">
           参与人员
          </span>
          <el-input v-if="type === 'edit'" class="text_word" maxlength="100" v-model="textInfo.joinPerson" clearable placeholder="请输入内容"></el-input>
          <span v-else class="text_word">{{textInfo.joinPerson}}</span>
        </section>
        <section class="flex text">
          <span class="text_title">
           内容
          </span>
          <textarea v-if="type === 'edit'" class="text_content" v-model="textInfo.content"></textarea>
          <textarea v-else class="text_content" readonly="readonly"  v-model="textInfo.content"></textarea>
        </section>
        <section class="flex text" v-if="type === 'detail'">
          <span class="text_title">
           创建人
          </span>
          <span  class="text_word">{{userInfo.user.name}}</span>
        </section>
      </section>
      <section class="btnBox main_space" v-if="type === 'edit'">
        <button class="btn btn_primary" @click="submit">保存</button>
        <button class="btn btn_info_plain_disabled" @click="cancleItem">取消</button>
      </section>
  </main>
</template>
<script lang="ts">
  import { Component, Prop, Vue} from 'vue-property-decorator';
  import { conference } from '@/api/index';
  import Step from '@/components/Step.vue';
  @Component({
    components: {
      Step,
    },
  })
  export default class ConferenceEdit extends Vue {
    private message: any = []
    private imgUrl = require('../../assets/img/head/conference.png')
    private isView: boolean = true
    private type: string = ''
    private textInfo: any =  {
        meetingType: '',
        meetingName: '',
        meetAt: '',
        joinPerson: '',
        content: '',
    }
    private get userInfo() {
      return this.$store.state.userInfo
    }
    // 根据id查询
    private async viewInfo( id: any) {
      const res: any = await conference.getInfobyid(`id=${id}`)
      this.textInfo = res.data.data
    }
    // 保存
    private async submit( ) {
      if (!this.textInfo.meetingType || !this.textInfo.meetingName || !this.textInfo.meetAt) {
        this.$message.warning('请将必填项填写完整！')
        return false
      }
      if (this.$route.query.infoId !== '') {
        const data = {
          id: this.$route.query.infoId,
          ...this.textInfo,
        }
        const res: any = await conference.updateConference(data)
        if (res.data.code === 0) {
           this.$router.push({name: 'conference'})
        }
      } else {
        const data: any = {
          ...this.textInfo,
        }
        const res: any = await conference.addConference(data)
        if ( res.data.code === 0) {
          this.$router.push({name: 'conference'})
        }
      }
    }
    // 取消
    private cancleItem() {
      this.$router.push({name: 'conference'})
    }
    private mounted() {
      if ( this.$route.query.type === 'edit' && this.$route.query.infoId !== '' ) {
        this.message = ['会议活动', '编辑']
        this.type = 'edit'
        this.viewInfo(this.$route.query.infoId)
      } else if (this.$route.query.type === 'edit' && this.$route.query.infoId === '') {
        this.message = ['会议活动', '新增']
        this.type = 'edit'
      } else {
        this.message = ['会议活动', '详情']
        this.type = 'detail'
        this.viewInfo(this.$route.query.infoId)
      }
    }
  }
</script>
<style lang="less" scoped>
main{
  /deep/ .el-input__icon{
  line-height: 40px;
  }
  .content{
    padding: 20px;
    box-sizing: border-box;
    .text{
      line-height: 50px;
      font-size:  16px;
      .text_title{
        width: 120px;
        text-align: right;
        margin-right: 20px;
        font-size:16px;
        color:rgba(49,50,51,1);
      }
      .text_word{
        width:594px;
        height:32px;
        border-radius:4px;
        // line-height: 32px;
      }
      .text_content{
        width: 80%;
        min-height: 200px;
        margin-top: 20px;
      }
    }
  }
  .btnBox{
    width: 264px;
    margin: 40px auto;
  }
}
</style>