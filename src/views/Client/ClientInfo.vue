<template>
 <!-- @click="changeShow" -->
    <main class="container" @click="changeShow">
        <Step :stepName = 'message' :isView = 'isView'  :imgUrl = "imgUrl"></Step>
        <section style="margin-top: 20px">
            <section class="flex flexWrap">
                <section class="flex text" style="line-height:30px;margin:10px 0">
                    <span class="text_title1" >
                        <span class="mark">*</span>
                        沟通时间</span>
                        <span v-if="isShow" class="text_content">{{addInfo.communicationAt}}</span>
                    <el-date-picker
                        v-else
                        v-model="addInfo.communicationAt"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        class="text_content">
                    </el-date-picker>
                </section>
                <section class="flex text" style="line-height:30px;margin:10px 0">
                    <span class="text_title1" >
                        <span class="mark">*</span>
                        面访</span>
                      <span v-if="isShow" class="text_content">{{addInfo.isVisit}}</span>
                    <el-select v-else  v-model="addInfo.isVisit" placeholder="请选择" class="text_content">
                        <el-option label='是' value="YES"></el-option>
                        <el-option label='否' value="NO"></el-option>
                    </el-select>
                </section>
            </section>
            <section class="flex flexWrap" >
                <section class="flex text">
                    <span class="text_title">
                        <span class="mark">*</span>合作状态
                    </span>
                    <span v-if="isShow" class="text_content">{{addInfo.cooperation1}}-{{addInfo.cooperation1}}</span>
                    <Cascader
                    v-else
                    :categoryA = 'addInfo.cooperation1'
                    :categoryB = 'addInfo.cooperation2'
                    :addCate1 = false
                    :addCate2 = true
                    :departList = "cooperationInfo"
                    @category1 = 'getCooperation'
                    ref="category">
                    </Cascader>
                </section>
            </section>
            <section class="flex flexWrap" >
                <section class="flex text">
                    <span class="text_title" >项目名称</span>
                    <span v-if="isShow" class="text_content">{{addInfo.projectName}}</span>
                    <el-input v-else  v-model="addInfo.projectName" maxlength="100" class="text_content" placeholder="请输入内容"></el-input>
                </section>
                <section class="flex text">
                    <span class="text_title">项目类型</span>
                    <span  v-if="isShow" class="text_content">{{addInfo.projectType}}</span>
                    <Cascader
                    v-else
                    :categoryA = 'addInfo.projectType'
                    @category1 = "progressType"
                    :departList = "typeInfo"
                    ref="category1"
                    ></Cascader>
                </section>
            </section>
            <section class="flex flexWrap"  >
                <section class="flex text">
                    <span class="text_title">项目进度</span>
                    <span v-if="isShow" class="text_content">{{addInfo.projectProgress}}</span>
                    <Cascader
                    v-else
                    :categoryA = "addInfo.projectProgress"
                    @category1 = "getProgress"
                    :departList = "progressInfo"
                    ref="category2"
                    ></Cascader>
                </section>
                <section class="flex text">
                    <span class="text_title">跟进人</span>
                    <span v-if="isShow" class="text_content">{{addInfo.followPerson}}</span>
                    <el-input v-else  v-model="addInfo.followPerson" class="text_content" placeholder="请输入内容"></el-input>
                </section>
            </section>
            <section class="flex text">
                <span class="text_title" style="flex-shrink:0">
                    <span class="mark">*</span>具体沟通进度
                </span>
                <textarea v-if="!isShow" class="text_textare text_textare1" v-model="addInfo.communicationRecord"></textarea>
                <textarea v-else  class="text_textare text_textare1"  readonly="readonly" v-model="addInfo.communicationRecord"></textarea>
            </section>
            <section class="flex text">
                <span class="text_title" style="flex-shrink:0">
                    备注
                </span>
                <textarea v-if="!isShow" class="text_textare text_textare2" v-model="addInfo.remarks"></textarea>
                <textarea v-else class="text_textare text_textare2" readonly="readonly" v-model="addInfo.remarks"></textarea>
            </section>
        </section>
        <section v-if="$route.query.type === 'edit' || !$route.query.type&&$route.query.infoId"  class="btnBox main_space">
          <button class="btn btn_primary" @click="submitProgress" >保存</button>
          <button class="btn btn_info_plain_disabled"   @click="cancleProgress">取消</button>
        </section>
         <!-- <section v-else  class="btnBox main_center">
          <button class="btn btn_primary" @click="submitProgress" >返回</button>
        </section> -->
    </main>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import Cascader from '@/components/Cascader.vue'
import {  client } from '@/api/index'
@Component({
    components: {
        Step,
        Cascader,
    },
})
export default class ClientInfo extends Vue {
  //  @Prop({default: {}}) private readonly tableInfo?: any
   private imgUrl = require('../../assets/img/head/client.png')
  private addInfo: any = {
    communicationAt: '',
    isVisit: '',
    cooperation1: '',
    cooperation2: '',
    projectName: '',
    projectType: '',
    projectProgress: '',
    followPerson: '',
    communicationRecord: '',
    remarks: '',
  }
   private isShow: boolean = false
   private isPush: boolean = true
   private tableData: any = []
  private cooperationInfo: any = [
    {
      label: '前期接洽',
      value: '1',
    },
    {
      label: '后期维护',
      value: '2',
    },
    {
      label: '业务对接',
      value: '3',
      childrenList: [
        {
          label: '大宗减持',
          value: '4',
        },
        {
          label: '集合计划',
          value: '5',
        },
        {
          label: '定向计划',
          value: '6',
        },
        {
          label: '定向增发',
          value: '7',
        },
        {
          label: '投资咨询',
          value: '8',
        },
        {
          label: 'ABS',
          value: '9',
        },
        {
          label: 'FOF/MOM',
          value: '10',
        },
      ],
    },
  ]
  private typeInfo: any = [
    {
      label: '权益',
      value: '1',
    },
    {
      label: '固收',
      value: '2',
    },
    {
      label: '混合',
      value: '3',
    },
    {
      label: '非标',
      value: '4',
    },
  ]
  private progressInfo: any = [
    {
      label: '报送',
      value: '1',
    },
    {
      label: '审批通过',
      value: '2',
    },
    {
      label: '审批失败',
      value: '3',
    },
    {
      label: '项目落地',
      value: '4',
    },
  ]
  private message: any = ['直销客户', '项目记录', '新增']
  private isView: boolean = true
  private clientInfo: any = {}
  // public $refs !: {
  //   category: HTMLFormElement,
  //   category1: HTMLFormElement,
  //   category2: HTMLFormElement,
  // }
  private sonIsShow: boolean = false
  private getCooperation(a: any, b: any) {
    this.addInfo.cooperation1 = a
    this.addInfo.cooperation2 = b
  }
  private progressType(a: any, b: any) {
    this.addInfo.projectType = a
  }
  private getProgress(a: any, b: any) {
    this.addInfo.projectProgress = a
  }
  private async submitProgress() {
    if ( this.addInfo.communicationAt && this.addInfo.isVisit
        && this.addInfo.cooperation1 && this.addInfo.communicationRecord) {
          let  infodata: any = {}
          if (this.$route.query.infoId) {
            if (this.$route.query.id) {
              infodata = {
                ...this.addInfo,
                infoId: this.$route.query.infoId,
              }
              const res: any = await client.updateSoninfo(infodata)
              if (res.data.success) {
                this.$message.success('修改成功')
              } else {
                this.$message.error(`${res.data.msg}`)
              }
              this.$router.push({name: 'clientAdd', query: {id: this.$route.query.infoId, type: 'edit'}})
            } else {
              infodata = {
                ...this.addInfo,
                infoId: this.$route.query.infoId,
              }
              const res: any = await client.addSoninfo(infodata)
              if (res.data.success) {
                this.$message.success('新增成功')
              } else {
                this.$message.error(`${res.data.msg}`)
              }
              // history.go(-1)
              this.$router.push({name: 'clientAdd', query: {id: this.$route.query.infoId, type: 'edit'}})
            }
          }
    } else {
      this.$message.warning(`请将必填项填写完整！`)
      return false
    }
  }
  private cancleProgress() {
    this.$router.push({name: 'clientAdd', query: {id: this.$route.query.infoId, type: 'edit'}})
  }
  private changeShow(el: any) {
      // this.$refs[`category`].isShow = false
      // this.$refs[`category1`].isShow = false
      // this.$refs[`category2`].isShow = false
      // this.$refs.test.isShow = false;
  }
  // 根据id查看详情
  private async viewClientinfo(id: any) {
    const res: any = await client.findsellById(`id=${id}`)
    this.tableData =  res.data.data.directSellingCustomerInfoList
    for (let i = 0, len = this.tableData.length; i < len; i++) {
      if (this.tableData[i].id === this.$route.query.id) {
        this.addInfo = this.tableData[i]
      }
    }
  }
  private mounted() {
    this.clientInfo = this.$route.query.clientInfo
    if ( this.$route.query.infoId) {
      this.viewClientinfo(this.$route.query.infoId)
      if (this.$route.query.id && this.$route.query.type === 'detail') {
        this.isShow = true
        this.message = ['直销客户', '项目记录', '详情']
      } else if (this.$route.query.id && this.$route.query.type === 'edit') {
        this.message = ['直销客户', '项目记录', '编辑']
      } else {
        this.message = ['直销客户', '项目记录', '新增']
      }
    }
    document.addEventListener('click', (e) => {
      const el: any = e
      const el1: any = this.$refs.category
      const el2: any = this.$refs.category1
      const el3: any = this.$refs.category2
      if (el !== 'undefined') {
        if (el.target.className !== 'custom_style') {
          el1.isShow = false
          el2.isShow = false
          el3.isShow = false
        }
      }
    })
  }
}
</script>
<style lang="less" scoped>
main{
   /deep/ .el-input__icon{
    line-height: 32px;
  }
  .flexWrap{
    display: flex;
    flex-wrap: wrap
  }
  .text{
      line-height: 50px;
      .text_title{
          display: inline-block;
          width:120px;
          line-height: 50px;
          text-align: right;
          margin-right: 20px;
      }
      .text_title1{
          display: inline-block;
          width:120px;
          line-height: 30px;
          text-align: right;
          margin-right: 20px;
          margin-top:10px 0;
      }
      .text_content{
        font-size: 14px;
        width:224px !important;
      }
      .text_textare{
          width:80%;
          margin-top:10px;
          border:1px solid rgba(228,231,237,1);
      }
      .text_textare1{
          height:280px;
          max-height: 280px;
      }
      .text_textare2{
          height:120px;
          max-height: 120px;
      }
  }
  .btnBox{
    width: 264px;
    margin: 40px auto;
  }
}
</style>