<template>
  <main class="center clientProgress">
    <section class="col add_content">
			<!-- {{progressRow}} -->
      <!-- {{isEdit}} -->
      <section class="add_head main_space">
        <section style="display: flex;align-items:center">
          <span>调研进度</span>
          <!-- <img src="../../assets/img/databank/file.png" alt="" style="width: 24px;height:24px;margin-right: 20px"> -->
          <!-- {{selectObj['folderName']}} -->
        </section>
        <img src="../../assets/img/close.png" @click="hide">
      </section>
      <section class="add_mid flex1 dateIcon">
        <section class="flex text date" >
          <span class="text_title">
            <span class="mark">*</span>
            日期：</span>
          <span v-if="!isEdit">{{progressInfo.dailyAt}}</span>
          <el-date-picker
            v-else
            v-model="progressInfo.dailyAt"
            type="date"
            placeholder="日期"
            value-format="yyyy-MM-dd"
            :clearable="false"
            style="width:224px;line-height: 40px; margin: 6px 0">
          </el-date-picker>
          <!-- <el-input v-else v-model="progressInfo.timeValue" placeholder="请输入内容" clearable  class="inputLine"></el-input> -->
        </section>
        <section class="flex text">
          <span class="text_title">
            <span class="mark">*</span>
            工作进展：</span>
            <span v-if="!isEdit">{{progressInfo.workProgress}}</span>
            <el-select v-else v-model="progressInfo.workProgress" placeholder="请选择" class="inputLine">
              <el-option label="首次推荐" value="首次推荐"></el-option>
              <el-option label="产品准入" value="产品准入"></el-option>
              <el-option label="机构准入" value="机构准入"></el-option>
            </el-select>
        </section>
        <section class="flex text">
          <span class="text_title">
            <span class="mark">*</span>
            内容：</span>
            <textarea v-if="!isEdit"  v-model="progressInfo.content" id="" readonly style="width: 60%; min-height: 200px;margin-top: 20px"></textarea>
            <textarea  v-else v-model="progressInfo.content" id="" style="width: 60%; min-height: 200px;margin-top: 20px"></textarea>
        </section>
        <section class="flex text">
          <span class="text_title ">
            <span class="mark">*</span>沟通方式：
          </span>
          <span v-if='!isEdit'>{{communicationWay}}</span>
          <table v-else cellspacing="0" width="50%" height="150" class="table_style">
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
      </section>
      <section v-if='isEdit' class="add_foot flex center">
        <section class="btns">
          <button class="btn btn_info_plain" @click="save('draft')">暂存</button>
          <button class="btn btn_succ" @click="save('commit')" >提交</button>
          <button class="btn btn_info_plain_disabled" @click="hide">取消</button>
        </section>
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import {Vue, Prop, Component, Watch} from 'vue-property-decorator'
@Component
export default class ClientProgress extends Vue {
@Prop({}) private readonly progressRow!: {}
@Prop({default: false}) private readonly isEdit!: boolean
  private progressInfo: any = {
    dailyAt: '',
    workProgress: '',
    content: '',
  }
  private insideRadio: any = 1
  private interviewRadio1: any = NaN
  private onlineRadio: any = NaN
  private communicationWay: any = ''
  // 监听选项框值的变化，清空其余选项组
  @Watch('onlineRadio')  private online(val: any, old: any) {
    if (val !== '') {
      let aa: any = this.interviewRadio1
      let bb: any = this.insideRadio
      aa = ''
      bb = ''
      this.interviewRadio1 = aa
      this.insideRadio = bb
    }
  }
  @Watch('interviewRadio1')  private interview(val: any, old: any) {
    if (val !== '') {
      let aa: any = this.onlineRadio
      let bb: any = this.insideRadio
      aa = ''
      bb = ''
      this.onlineRadio = aa
      this.insideRadio = bb
    }
  }
  @Watch('insideRadio')  private inside(val: any, old: any) {
    if (val !== '') {
      let aa: any = this.interviewRadio1
      let bb: any = this.onlineRadio
      aa = ''
      bb = ''
      this.interviewRadio1 = aa
      this.onlineRadio = bb
    }
  }
  private hide() {
    this.$emit('hideProgress')
  }
  private save(type: any) {
    this.$emit('saveProgress', type, this.progressInfo, this.interviewRadio1, this.onlineRadio, this.insideRadio)
  }
  private created() {
    this.progressInfo = this.progressRow
    if ( this.progressInfo.communicate1 === 1 ) {
      if ( this.progressInfo.communicate2 === 1 ) {
          if (this.progressInfo.communicate3 === 1) {
              this.interviewRadio1 = 1
              this.communicationWay = '面访-培训-内部'
          } else if (this.progressInfo.communicate3 === 2) {
              this.interviewRadio1 = 2
              this.communicationWay = '面访-培训-外部'
          }
      } else if ( this.progressInfo.communicate2 === 2) {
          if (this.progressInfo.communicate3 === 1) {
              this.interviewRadio1 = 3
              this.communicationWay = '面访-沟通-沟通'
          } else if (this.progressInfo.communicate3 === 2) {
              this.interviewRadio1 = 4
              this.communicationWay = '面访-沟通-外部'
          }
      }
    } else if (this.progressInfo.communicate1 === 2) {
        if (this.progressInfo.communicate2 === 1) {
          if (this.progressInfo.communicate3 === 1) {
            this.onlineRadio = 1;
            this.communicationWay = '线上-培训-培训'
          } else if (this.progressInfo.communicate3 === 2) {
            this.onlineRadio = 2;
            this.communicationWay = '线上-培训-外部'
          }
        } else if (this.progressInfo.communicate2 === 2) {
          if (this.progressInfo.communicate3 === 1) {
              if (this.progressInfo.communicate4 === 1) {
                // let aa:any = this.onlineRadio
                // aa =3
                this.onlineRadio = 3;
                this.communicationWay = '线上-沟通-内部微信'
              } else if (this.progressInfo.communicate4 === 2) {
                this.onlineRadio = 4;
                this.communicationWay = '线上-沟通-内部电话'
              }
            } else if (this.progressInfo.communicate3 === 2) {
              if (this.progressInfo.communicate4 === 1) {
                this.onlineRadio = 5;
                this.communicationWay = '线上-沟通-外部电话'
              } else if (this.progressInfo.communicate4 === 2) {
                this.onlineRadio = 6;
                this.communicationWay = '线上-沟通-外部电话'
              }
            }
        }
    } else if (this.progressInfo.communicate1 === 3) {
      this.insideRadio = 1;
      this.communicationWay = '公司内部'
    }
  }
}
</script>
<style lang="less" scoped>
    /deep/ .date .el-input__icon {
        line-height: 40px;
    }
  main{
    width: 100%;
    height: 100%;
    color:rgba(49,50,51,1);
    .add_content{
      min-width: 600px;
      width: 60%;
      max-height: 90%;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
      border-radius:4px;
      .add_head{
        padding: 20px;
        border-bottom: 1px solid rgba(234,234,234,1);
        img{
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      .add_mid {
        color:rgba(96,98,102,1);
        box-sizing: border-box;
        padding: 20px;
        overflow-y: scroll;
        .text{
          line-height: 50px;
          .text_title{
            width: 100px;
            font-size:16px;
            text-align: right;
            color:rgba(49,50,51,1);
            margin-right: 20px;
          }
          .inputLine{
            width: 224px !important;
          }
          .tr_style{
            text-align: center
          }
          .table_style{
            margin-top:20px;
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
      .add_foot{
        height: 80px;
        border-top: 1px solid rgba(234,234,234,1);
        .btns{
          margin:20px 0;
          font-size:14px;
          width: 360px;
          display: flex;
          justify-content: space-between;
          // .bottom_btn{
          //   border-radius:4px;
          //   padding: 10px 32px;
          //   background: transparent;
          //   border:0;
          //   outline: none;
          //   cursor: pointer;
          // }
          // .bottom_btn:nth-child(1){
          //   color:rgba(255,255,255,1);
          //   background:rgba(87,146,252,1);
          //   border:1px solid rgba(87,146,252,1);
          // }
          // .bottom_btn:nth-child(2){
          //   margin-left: 80px;
          //   color:rgba(144,147,153,1);
          //   background:rgba(255,255,255,1);
          //   border:1px solid rgba(192,196,204,1);
          // }
        }
      }
    }
  }
</style>