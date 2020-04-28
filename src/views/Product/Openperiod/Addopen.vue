<template>
  <main class="container">
    <Step :stepName = 'message' :isView = 'isView' :imgUrl = 'imgUrl'></Step>
    <section class="mt20">
      <section class="flex">
        <section class="flex addOpen">
          <section class="flex" v-if="$route.query.info * 1 === 2">
            <span  class="text_title">
              <span class="mark">*</span>
              上一开放退出期</span>
            <div id="date">
              <el-date-picker
                v-model="addInfo.lastExitPeriod"
                type="date"
                placeholder="选择日期"
                class="text_input" 
                disabled
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </section>
          <section class="flex" v-else>
            <span  class="text_title">
              <span class="mark">*</span>
              募集期</span>
            <div id="date2">
              <el-date-picker
                v-model="addInfo.raise"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                class="text_input" style="margin-top: 9px">
              </el-date-picker>
            </div>
          </section>
        </section>
        <section class="flex addOpen">
          <section class="flex" v-if="$route.query.info * 1 === 2">
            <span  class="text_title">
              <span class="mark">*</span>
              开放参与期</span>
              <div id="date2">
                <el-date-picker
                  v-model="addInfo.raise"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  class="text_input" style="margin-top: 9px">
                </el-date-picker>
              </div>
          </section>
          <section class="flex" v-else>
            <span  class="text_title">
              <span class="mark">*</span>
              成立日期</span>
            <div id="date">
              <el-date-picker
                v-model="addInfo.createAt"
                type="date"
                disabled
                placeholder="选择日期"
                class="text_input" 
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </section>
        </section>
      </section>
      <section class="flex">
        <section class="flex addOpen">
          <section class="flex" v-if="$route.query.info * 1 === 2">
            <span  class="text_title">
              <span class="mark">*</span>
              规模(亿元)</span>
            <el-input v-model="addInfo.scale" placeholder="请输入内容" class="text_input"></el-input>
          </section>
          <section class="flex" v-else>
            <span  class="text_title">
              <span class="mark">*</span>
              成立规模(亿元)</span>
            <el-input v-model="addInfo.scale" disabled placeholder="请输入内容" class="text_input"></el-input>
          </section>
          <!-- <span v-if="$route.query.info.productOpenPeriodInfos && $route.query.info.productOpenPeriodInfos.length > 0" class="text_title">规模</span>
          <span v-else class="text_title">成立规模</span>
          <el-input v-model="input" placeholder="请输入内容" class="text_input"></el-input> -->
        </section>
        <section class="flex addOpen">
          <span class="text_title">
            <span class="mark">*</span>
            封闭期(天)</span>
          <el-input v-model="addInfo.closePeriod" placeholder="请输入内容" class="text_input"></el-input>
        </section>
      </section>
      <section class="flex">
        <section class="flex addOpen">
          <span class="text_title">
            <span class="mark">*</span>
            客户收益率(%)</span>
          <el-input v-model="addInfo.returnRate" maxlength="50" placeholder="请输入内容" class="text_input"></el-input>
        </section>
        <section class="flex addOpen">
          <span class="text_title">
            <span class="mark">*</span>
            代销渠道</span>
          <el-input v-model="addInfo.channel" maxlength="50" placeholder="请输入内容" class="text_input"></el-input>
        </section>
      </section>
      <section class="flex">
        <section class="flex addOpen">
          <span class="text_title">
            <span class="mark">*</span>本次开放退出期</span>
          <!-- <el-input v-model="addInfo.exitPeriod" placeholder="请输入内容" class="text_input"></el-input> -->
            <div id="date">
              <el-date-picker
                v-model="addInfo.exitPeriod"
                type="date"
                placeholder="选择日期"
                class="text_input" 
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
        </section>
      </section>
      <section class="flex">
        <section class="flex addOpen">
          <span class="text_title">备注</span>
        </section>
        <textarea name="" id=""  class="contxt" v-model="addInfo.remarks"></textarea>
      </section>
    </section>
    <div  style="width:436px;margin:auto;display:flex;justify-content:space-around;margin-top:40px">
      <button class="btn btn_primary" @click="submitInfo">保存</button>
      <button class="btn btn_info_plain_disabled" @click="$router.push({name: 'openperiod'})">取消</button>
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Prop, Watch, Component} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { product } from '../../../api'
@Component({
  components: {
    Step,
  },
})
export default class Addopen extends Vue {
  private message: any = ['开放期', '开放周期表', '开放期']
  private isView: boolean = true
  private imgUrl: any = require('../../../assets/img/head/product.png')
  private nowStage: number = 0
  private addInfo: any = {
    lastExitPeriod: '',
    raise: [],
    raiseStartAt: '',
    raiseEndAt: '',
    createAt: '',
    scale: '',
    closePeriod: '',
    returnRate: '',
    channel: '',
    exitPeriod: '',
    remarks: '',
  }
  @Watch('addInfo.createAt') private createAt(val: any, old: any) {
    if (this.nowStage === 1) {
      if (this.addInfo.createAt && this.addInfo.exitPeriod) {
        const start: any = Date.parse(this.addInfo.createAt)
        const end: any = Date.parse(this.addInfo.exitPeriod)
        let dateSpan: any = start - end
        dateSpan = Math.abs(dateSpan)
        const day: any = Math.floor(dateSpan / (24 * 3600 * 1000));
        this.addInfo.closePeriod = day + 1
      }
    }
  }
  @Watch('addInfo.exitPeriod') private exitPeriod(val: any, old: any) {
    if (this.nowStage === 1) {
      if (this.addInfo.createAt && this.addInfo.exitPeriod) {
        const start: any = Date.parse(this.addInfo.createAt)
        const end: any = Date.parse(this.addInfo.exitPeriod)
        let dateSpan: any = start - end
        dateSpan = Math.abs(dateSpan)
        const day: any = Math.floor(dateSpan / (24 * 3600 * 1000));
        this.addInfo.closePeriod = day + 1
      }
    } else if (this.nowStage === 2) {
      if (this.addInfo.exitPeriod && this.addInfo.raise.length > 0) {
        const start: any = Date.parse(this.addInfo.exitPeriod)
        const end: any = Date.parse(this.addInfo.raise[1])
        let dateSpan: any = start - end
        dateSpan = Math.abs(dateSpan)
        const day: any = Math.floor(dateSpan / (24 * 3600 * 1000));
        this.addInfo.closePeriod = day + 1
      }
    }
  }
  @Watch('addInfo.raise') private raise(val: any, old: any) {
    this.addInfo.raiseStartAt = val[0]
    this.addInfo.raiseEndAt = val[1]
    if (this.nowStage === 2) {
      if (this.addInfo.exitPeriod && this.addInfo.raise.length > 0) {
        const start: any = Date.parse(this.addInfo.exitPeriod)
        const end: any = Date.parse(this.addInfo.raise[1])
        let dateSpan: any = start - end
        dateSpan = Math.abs(dateSpan)
        const day: any = Math.floor(dateSpan / (24 * 3600 * 1000));
        this.addInfo.closePeriod = day + 1
      }
    }
  }
  private async submitInfo() {
    if (!this.addInfo.closePeriod || !this.addInfo.returnRate || !this.addInfo.channel || !this.addInfo.exitPeriod) {
        this.$message.warning(`请将必填项填写完整`)
        return false
    } else if (this.addInfo.returnRate) {
      const reg: any = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/
      if (!reg.test(this.addInfo.returnRate)) {
        this.$message.warning(`客户收益率请填写整数和小数点后最多4位小数`)
        return false
      }
    }
    if (this.nowStage === 1) {
      if (!this.addInfo.createAt || !this.addInfo.scale || this.addInfo.raise.length === 0) {
        this.$message.warning(`请将必填项填写完整`)
        return false
      } else if (this.addInfo.scale) {
        const reg: any = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/
        if (!reg.test(this.addInfo.scale)) {
          this.$message.warning(`规模请填写整数和小数点后最多4位小数`)
          return false
        }
      }
    } else if (this.nowStage === 2) {
      if (!this.addInfo.lastExitPeriod || this.addInfo.raise.length === 0 || !this.addInfo.scale) {
        this.$message.warning(`请将必填项填写完整`)
        return false
      } else if (this.addInfo.scale) {
        const reg: any = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/
        if (!reg.test(this.addInfo.scale)) {
          this.$message.warning(`规模请填写整数和小数点后最多4位小数`)
          return false
        }
      }
    }
    if (this.$route.query.id) {
      const  data = {
        ...this.addInfo,
        periodId: this.$route.query.id,
      }
      const res: any = await product.addOpeninfo(data)
      if (res.data.success) {
        this.$message.success(`新增成功`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    } else {
      const data = {
        ...this.addInfo,
      }
      const res: any = await product.updateOpeninfo(data)
      if (res.data.success) {
        this.$message.success(`更新成功`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    }
    this.$router.push({name: 'openperiod'})
  }
  // 获取上一开放退出期
  private async getLasttime(id: any) {
    const res: any = await product.getLasttime(`id=${id}`)
    if (res.data.data) {
      this.addInfo.lastExitPeriod = res.data.data
    }
  }
  private mounted() {
    let obj: any = {}
    obj = this.$route.query.info
    if (obj * 1 === 2) {
      this.nowStage = 2
    } else if (obj * 1 === 1) {
      this.nowStage = 1
      const creatInfo: any = this.$route.query.obj
      if (this.$route.query.id) {
        this.addInfo.createAt = creatInfo.createAt
        this.addInfo.scale = creatInfo.scale
      }
    }
    if (this.$route.query.id && this.$route.query.info) {
      this.getLasttime(this.$route.query.id)
    } else {
      this.addInfo = this.$route.query.periodinfo
      this.addInfo.raise = [this.addInfo.raiseStartAt, this.addInfo.raiseEndAt]
    }
  }
}
</script>
<style lang="less" scoped>
#date2{
   /deep/ .el-date-editor .el-range-separator,.el-input__icon{
    height:32px
  }
  /deep/ .el-input__icon{
  line-height: 26px;
  }
}
#date{
  /deep/ .el-input__icon{
  line-height: 50px;
  }
}
.mt20{
  margin-top: 20px;
}
.addOpen{
    line-height: 50px;
    font-size: 16px;
  .text_title{
    width: 126px;
    text-align: right;
    margin-right: 20px;
    font-size:16px;
    color:rgba(49,50,51,1);
  }
  .text_input{
    width: 224px !important;
    font-size: 14px;
  }
}
.contxt{
  width: 70%;
  min-height: 120px;
  overflow-y: scroll;
  margin-top: 20px;
}
</style>