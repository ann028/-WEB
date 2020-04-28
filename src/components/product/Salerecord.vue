<template>
  <main class="center">
    <section class="content col">
      <section class="top flex">
        <span v-if="isSonshow && salerecordInfo.id">销售记录 / 编辑</span>
        <span v-if="isSonshow && !salerecordInfo.id">销售记录 / 新增</span>
        <span v-if="!isSonshow">销售记录 / 查看</span>
        <img src="../../assets/img/close.png" @click="hide">
      </section>
      <section class="info">
        <section class="flex main_space">
          <div>
            <span ><span class="mark">*</span>销售方式：</span>
            <el-radio-group v-model="radio" v-if="isRadio === 0"  >
              <el-radio :label="1">人员</el-radio>
              <el-radio :label="2">总行</el-radio>
            </el-radio-group>
            <el-radio-group v-model="radio" v-if="isRadio === 1" >
              <el-radio :label="1">人员</el-radio>
            </el-radio-group>
            <el-radio-group v-model="radio" v-if="isRadio === 2" >
              <el-radio :label="2">总行</el-radio>
            </el-radio-group>
          </div>
          <div>
            <el-tooltip class="item" effect="dark"  placement="left-start">
                <div slot="content">
                  <p>指标占比：指标/合计指标</p>
                  <p>现规模：原规模-赎回量+申购量</p>
                  <p>完成率：现规模/指标</p>
                </div>
                <i class="el-icon-question" style="color: #999;"></i>
            </el-tooltip>
          </div>
        </section>
        <div class="conTxt1  mt20">
          <section v-if="radio === 1">
            <section class="flex" style="flex-wrap: wrap">
              <section class="flex text">
                <span class="text_title">
                  <span class="mark">*</span>
                  销售人员</span>
                <span v-if="!isSonshow" class="text_input">{{salerecordInfo.userName}}</span>
                <el-select v-else v-model="salerecordInfo.userId" clearable filterable @change="changeSaleperson1"  placeholder="请选择" class="text_input isRow">
                  <el-option
                    v-for="item in userList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </section>
              <section class="flex text">
                <span class="text_title" style="flex-shrink: 0">
                  <span class="mark">*</span>
                  分行</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.branch}}</span>
                <!-- <el-input v-else v-model="salerecordInfo.branch" placeholder="请输入内容" maxlength="50" class="text_input"></el-input> -->
                <Cascader
                v-else
                :categoryA = 'salerecordInfo.branch'
                :departList = "branchList"
                @category1 = "getBranch"
                ref="branch">
                </Cascader>
              </section>
            </section>
            <section class="flex" style="flex-wrap: wrap">
              <section v-if="productInfo.label != 'FIRST_SUBSCRIBE'" class="flex text">
                <span class="text_title">
                  <span class="mark">*</span>
                  原规模（万元）</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.originalSize}}</span>
                  <!-- <el-input-number v-else v-model="salerecordInfo.originalSize"  :controls = 'false' class="text_input number_input"></el-input-number> -->
                <el-input v-else v-model="salerecordInfo.originalSize" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
              </section>
              <section v-if="productInfo.label != 'NO_TASK'" class="flex text">
                <span class="text_title">
                  <span class="mark">*</span>
                  指标（万元）</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.target}}</span>
                  <!-- <el-input-number v-else v-model="salerecordInfo.target"  :controls = 'false' class="text_input number_input"></el-input-number> -->
                <el-input v-else v-model="salerecordInfo.target" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
              </section>
            </section>
            <section class="flex" style="flex-wrap: wrap">
              <section v-if="productInfo.label != 'NO_TASK'" class="flex text">
                <span class="text_title">指标占比</span>
                <span v-if="!isSonshow" class="text_input">{{salerecordInfo.indicatorsOf}}%</span>
                <!-- <el-input-number v-else v-model="salerecordInfo.indicatorsOf"  :controls = 'false' class="text_input number_input" style="margin-right: 0">
                  </el-input-number>
                   <span style="margin-right: 5px">%</span> -->
                <el-input  v-else disabled class="text_input" placeholder="自动计算" v-model="salerecordInfo.indicatorsOf" style="margin-top:9px">
                  <template slot="append">%</template>
                </el-input>
              </section>
              <section v-if="productInfo.label != 'FIRST_SUBSCRIBE'" class="flex text">
                <span class="text_title">
                  <span class="mark">*</span>
                  赎回量（万元）</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.redemptions}}</span>
                  <!-- <el-input-number v-else v-model="salerecordInfo.redemptions"  :controls = 'false' class="text_input number_input"></el-input-number> -->
                <el-input v-else  v-model="salerecordInfo.redemptions" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
              </section>
            </section>
            <section class="flex" style="flex-wrap: wrap">
              <section class="flex text">
                <span class="text_title">
                  <span class="mark">*</span>
                  申购量（万元）</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.subscriptions}}</span>
                  <!-- <el-input-number v-else v-model="salerecordInfo.subscriptions"  :controls = 'false' class="text_input number_input"></el-input-number> -->
                <el-input v-else v-model="salerecordInfo.subscriptions" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
              </section>
              <section class="flex text">
                <span class="text_title">现规模（万元）</span>
                <span v-if="!isSonshow" class="text_input">{{salerecordInfo.nowSize}}</span>
                <!-- <el-input-number v-else v-model="salerecordInfo.nowSize"  :controls = 'false' class="text_input number_input"></el-input-number> -->
                <el-input v-else v-model="salerecordInfo.nowSize" placeholder="自动计算" disabled class="text_input"></el-input>
              </section>
            </section>
            <section class="flex" v-if="productInfo.label != 'NO_TASK'">
              <section class="flex text">
                <span class="text_title">完成率</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.percentageComplete}}%</span>
                  <!-- <el-input-number v-else v-model="salerecordInfo.percentageComplete"  :controls = 'false' class="text_input number_input" style="margin-right: 0">
                  </el-input-number> -->
                   <!-- <span style="margin-right: 18px">%</span> -->
                  <el-input  v-else disabled class="text_input" placeholder="自动计算" v-model="salerecordInfo.percentageComplete" style="margin-top:9px">
                    <template slot="append">%</template>
                  </el-input>
              </section>
            </section>
          </section>
          <section  v-if="radio === 2">
            <section class="flex" style="flex-wrap: wrap">
              <section v-if="productInfo.label != 'FIRST_SUBSCRIBE'" class="flex text">
                <span class="text_title">
                  <span class="mark">*</span>
                  赎回量（万元）</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.redemptions}}</span>
                <el-input v-else v-model="salerecordInfo.redemptions" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
              </section>
              <section class="flex text">
                <span class="text_title">
                  <span class="mark">*</span>
                  申购量（万元）</span>
                  <span v-if="!isSonshow" class="text_input">{{salerecordInfo.subscriptions}}</span>
                <el-input v-else v-model="salerecordInfo.subscriptions" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
              </section>
            </section>
            <section class="flex">
              <section class="flex text">
                <span class="text_title">现规模（万元）</span>
                <span v-if="!isSonshow" class="text_input">{{salerecordInfo.nowSize}}</span>
                <el-input v-else v-model="salerecordInfo.nowSize" placeholder="请输入内容" disabled class="text_input"></el-input>
              </section>
            </section>
          </section>
        </div>
      </section>
      <section class="bottom flex center" >
        <section class="btns" v-if="!isSonshow">
          <button class="bottom_btn" @click="hide">返回</button>
        </section>
        <section class="btns" v-else>
          <button class="bottom_btn" @click="submitInfo">保存</button>
          <button class="bottom_btn" @click="hide">取消</button>
        </section>
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import {  Vue, Prop, Watch, Component} from 'vue-property-decorator'
import Cascader from '@/components/Cascader.vue'
import { user, product } from '../../api'
@Component({
  components: {
    Cascader,
  },
})
export default class Salerecord extends Vue {
  @Prop({}) public readonly saleInfo!: any
  @Prop({}) public readonly productInfo!: any
  @Prop({default: 1}) private readonly isRadio!: number
  @Prop() private readonly addId!: number
  @Prop({default: true}) private readonly isSonshow!: boolean
  @Prop({}) private readonly targetTotal!: number
  private radio: number = 1
  private input: any = ''
  private value: any = ''
  private userList: any[] = []
  private salerecordInfo: any = {
    userId: '',
    branch: '',
    originalSize: '',
    target: '',
    indicatorsOf: '',
    redemptions: '',
    subscriptions: '',
    nowSize: '',
    percentageComplete: '',
  }
  private nowValue: number = NaN
  private branchList: any[] = []
  @Watch('radio') private changeradio() {
    if (!this.salerecordInfo.id) {
      this.salerecordInfo = {}
    }
  }
  // // 原规模
  @Watch('salerecordInfo.originalSize') private originalSize(val: any, old: any) {
    if (this.productInfo.label === 'FIRST_SUBSCRIBE') {
      if (this.salerecordInfo.subscriptions) {
        this.salerecordInfo.nowSize =  this.salerecordInfo.subscriptions * 1
      }
      if (this.salerecordInfo.nowSize && this.salerecordInfo.target) {
        this.salerecordInfo.percentageComplete =
      ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
      }
    } else {
      if (this.radio === 1) {
        if (this.salerecordInfo.originalSize  &&
        this.salerecordInfo.redemptions || this.salerecordInfo.redemptions === 0 && this.salerecordInfo.subscriptions ||
        this.salerecordInfo.subscriptions === 0 &&  this.salerecordInfo.originalSize !== 'NaN') {
          this.salerecordInfo.nowSize =
          ((this.salerecordInfo.originalSize * 1 -
          this.salerecordInfo.redemptions * 1 + this.salerecordInfo.subscriptions * 1)).toFixed(2)
        }
        if (this.productInfo.label === 'HAVE_TASK') {
          if (this.salerecordInfo.nowSize && this.salerecordInfo.target &&  this.salerecordInfo.nowSize !== 'NaN') {
            this.salerecordInfo.percentageComplete =
            ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
          }
        }
      } else {
        if (this.salerecordInfo.redemptions  && this.salerecordInfo.subscriptions ) {
          this.salerecordInfo.nowSize =
          (0 - this.salerecordInfo.redemptions * 1 + this.salerecordInfo.subscriptions * 1).toFixed(2)
        }
      }
    }
  }
  // 赎回量（万元）
  @Watch('salerecordInfo.redemptions') private redemptions(val: any, old: any) {
    if (this.productInfo.label === 'FIRST_SUBSCRIBE') {
      if (this.salerecordInfo.subscriptions) {
        this.salerecordInfo.nowSize =  this.salerecordInfo.subscriptions * 1
      }
      if (this.salerecordInfo.nowSize && this.salerecordInfo.target) {
        this.salerecordInfo.percentageComplete =
      ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
      }
    } else {
        if (this.radio === 1) {
          if (this.salerecordInfo.originalSize || this.salerecordInfo.originalSize === 0 &&
            this.salerecordInfo.redemptions || this.salerecordInfo.redemptions === 0  &&
            this.salerecordInfo.subscriptions ||  this.salerecordInfo.subscriptions === 0) {
              this.salerecordInfo.nowSize =
              (this.salerecordInfo.originalSize * 1 -
              this.salerecordInfo.redemptions * 1 + this.salerecordInfo.subscriptions * 1).toFixed(2)
          }
          if (this.productInfo.label === 'HAVE_TASK') {
            if (this.salerecordInfo.nowSize && this.salerecordInfo.target &&  this.salerecordInfo.nowSize !== 'NaN') {
              this.salerecordInfo.percentageComplete =
              ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
            }
          }
        } else {
          if (this.salerecordInfo.redemptions.toString()  && this.salerecordInfo.subscriptions.toString()) {
            this.salerecordInfo.nowSize =
            (0 - this.salerecordInfo.redemptions * 1 + this.salerecordInfo.subscriptions * 1).toFixed(2)
          }
        }
    }
  }
  // 申购量（万元）
  @Watch('salerecordInfo.subscriptions') private subscriptions(val: any, old: any) {
    if (this.productInfo.label === 'FIRST_SUBSCRIBE') {
      if (this.salerecordInfo.subscriptions) {
        this.salerecordInfo.nowSize =  this.salerecordInfo.subscriptions * 1
      }
      if (this.salerecordInfo.nowSize && this.salerecordInfo.target ||
      this.salerecordInfo.nowSize === 0 && this.salerecordInfo.target) {
        this.salerecordInfo.percentageComplete =
      ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
      }
    } else {
      if (this.radio === 1) {
        const value =
        this.salerecordInfo.originalSize && this.salerecordInfo.redemptions && this.salerecordInfo.subscriptions
        if (value || value === 0) {
          this.salerecordInfo.nowSize =
          (this.salerecordInfo.originalSize * 1 -
          this.salerecordInfo.redemptions * 1 + this.salerecordInfo.subscriptions * 1).toFixed(2)
        }
        if (this.productInfo.label === 'HAVE_TASK') {
          if (this.salerecordInfo.nowSize && this.salerecordInfo.target &&  this.salerecordInfo.nowSize !== 'NaN') {
            this.salerecordInfo.percentageComplete =
            ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
          }
        }
      } else {
        if (this.salerecordInfo.redemptions  && this.salerecordInfo.subscriptions ) {
          this.salerecordInfo.nowSize =
          (0 - this.salerecordInfo.redemptions * 1 + this.salerecordInfo.subscriptions * 1).toFixed(2)
        }
      }
    }
  }
  // 现规模
  @Watch('salerecordInfo.nowSize') private nowSize(val: any, old: any) {
    if (this.salerecordInfo.nowSize && this.salerecordInfo.target &&  this.salerecordInfo.nowSize !== 'NaN' ) {
      this.salerecordInfo.percentageComplete =
     ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
    }
    // if (this.salerecordInfo.nowSize === 'NaN') {
    //   this.salerecordInfo.nowSize = ''
    // }
  }
  // 完成率
  @Watch('salerecordInfo.target') private target(val: any, old: any) {
    if (this.productInfo.label === 'HAVE_TASK' || this.productInfo.label === 'FIRST_SUBSCRIBE') {
      if (this.salerecordInfo.nowSize || this.salerecordInfo.nowSize === 0
      && this.salerecordInfo.target &&  this.salerecordInfo.nowSize !== 'NaN') {
        this.salerecordInfo.percentageComplete =
      ((this.salerecordInfo.nowSize * 1 / (this.salerecordInfo.target * 1)) * 100).toFixed(2)
      }
    }
    // console.log(this.salerecordInfo)
    if (this.targetTotal === 1) {
      this.salerecordInfo.indicatorsOf = (this.salerecordInfo.target * 1 /
      (this.salerecordInfo.target * 1) * 100).toFixed(2)
    } else {
      this.salerecordInfo.indicatorsOf = (this.salerecordInfo.target * 1 /
      (this.targetTotal * 1 + this.salerecordInfo.target * 1) * 100).toFixed(2)
    }
  }
  // 指标占比
  @Watch('salerecordInfo.indicatorsOf') private indicatorsOf(val: any, oldVal: any) {
    if (val === 'NaN') {
      this.salerecordInfo.indicatorsOf = ''
    }
  }
  private hide() {
    this.$emit('hide');
  }
  // 获取销售列表
  // private async getUserlist() {
    //   const userParams = {
    //     name: '',
    //     pageNo: 1,
    //     pageSize: 100000,
    //   }
    //   const res: any = await user.searchUserList({
    //     ...userParams,
    //   })
    //   this.userList = res.data.data.records.map((item: any) => {
    //     return {
    //       label: item.name,
    //       value: item.id,
    //     }
    //   })
  // }
  private async getUserlist() {
    const res: any = await product.getSaleperson(`type='SALES_RECORD'`)
    // console.log('jieguo', res.data)
    this.userList = res.data.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
    const arr: any[] = []
    for ( let i = 0, len = this.userList.length; i < len; i++) {
      arr.push(this.userList[i].value)
    }
    if (this.salerecordInfo.indicatorsOf) {
      if (arr.indexOf(this.salerecordInfo.userId) === -1) {
        this.userList.push({
          label: this.salerecordInfo.userName,
          value: this.salerecordInfo.userId,
        })
      }
    }
  }
  // 保存/更新
  private async submitInfo() {
    if (this.radio === 1) {
      if (!this.salerecordInfo.userId || !this.salerecordInfo.branch) {
        this.$message.warning(`请将必填项填写完整`)
        return false
      }
      if (this.productInfo.label === 'FIRST_SUBSCRIBE') {
        const reg = /^([\+ \-]?)(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
        if (!reg.test(this.salerecordInfo.target)) {
          this.$message.warning(`'指标'请填写非零整数或小数点后两位小数`)
          return false
        }
        if (!this.salerecordInfo.target || !(this.salerecordInfo.subscriptions === 0 ?
        this.salerecordInfo.subscriptions + '' : this.salerecordInfo.subscriptions)) {
          this.$message.warning(`请将必填项填写完整`)
          return false
        } else {
          // const reg = /^([\+ \-]?)(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          // if (!reg.test(this.salerecordInfo.target)) {
          //   this.$message.warning(`'指标'请填写非零整数或小数点后两位小数`)
          //   return false
          // }
          const reg1 = /^([\+ \-]?)(([1-9][0-9]*)|0|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          if (!reg1.test(this.salerecordInfo.subscriptions)) {
            this.$message.warning(`请填写整数或小数点后两位小数`)
            return false
          }
        }
      } else if (this.productInfo.label === 'NO_TASK') {
        if (!(this.salerecordInfo.originalSize) || !(this.salerecordInfo.redemptions) ||
        !this.salerecordInfo.subscriptions || !this.salerecordInfo.nowSize ) {
          this.$message.warning(`请将必填项填写完整`)
          return false
        } else {
          if ( this.salerecordInfo.percentageComplete === 'NaN' || this.salerecordInfo.indicatorsOf === 'NaN') {
            this.salerecordInfo.percentageComplete = ''
            this.salerecordInfo.indicatorsOf = ''
          }
          const reg = /^([\+ \-]?)(([1-9][0-9]*)|0|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          if (!reg.test(this.salerecordInfo.originalSize) || !reg.test(this.salerecordInfo.redemptions)
          || !reg.test(this.salerecordInfo.subscriptions) || !reg.test(this.salerecordInfo.nowSize)) {
            this.$message.warning(`请填写整数或小数点后两位小数`)
            return false
          }
        }
      } else {
        const reg1 = /^([\+ \-]?)(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
        if (!reg1.test(this.salerecordInfo.target)) {
          this.$message.warning(`'指标'请填写非零整数或小数点后两位小数`)
          return false
        }
        if (!(this.salerecordInfo.originalSize !== 0 || NaN ?
        this.salerecordInfo.originalSize : this.salerecordInfo.originalSize + '') ||
        !(this.salerecordInfo.subscriptions !== 0 || NaN ?
        this.salerecordInfo.subscriptions : this.salerecordInfo.subscriptions + '')
        || !(this.salerecordInfo.redemptions !== 0 || NaN ?
        this.salerecordInfo.redemptions : this.salerecordInfo.redemptions + '')
        || !(this.salerecordInfo.nowSize !== 0 || NaN ?
        this.salerecordInfo.nowSize : this.salerecordInfo.nowSize + '')) {
        this.$message.warning(`请将必填项填写完整`)
        return false
        } else {
          if ( this.salerecordInfo.percentageComplete === 'NaN' || this.salerecordInfo.indicatorsOf === 'NaN') {
            this.salerecordInfo.percentageComplete = ''
            this.salerecordInfo.indicatorsOf = ''
          }
          const reg = /^([\+ \-]?)(([1-9][0-9]*)|0|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          if (!reg.test(this.salerecordInfo.originalSize)
          || !reg.test(this.salerecordInfo.redemptions) || !reg.test(this.salerecordInfo.subscriptions)
          || !reg.test(this.salerecordInfo.nowSize)) {
            this.$message.warning(`请填写整数或小数点后两位小数`)
            return false
          }
          // const reg1 = /^([\+ \-]?)(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          // console.log(reg1.test(this.salerecordInfo.target))
          // if (!reg1.test(this.salerecordInfo.target)) {
          //   this.$message.warning(`'指标'请填写非零整数或小数点后两位小数`)
          //   return false
          // }
        }
      }
    } else {
      if (this.productInfo.label === 'FIRST_SUBSCRIBE') {
        if (!(this.salerecordInfo.nowSize + '') || !(this.salerecordInfo.subscriptions + '')) {
          this.$message.warning(`请将必填项填写完整`)
          return false
        } else {
          if (this.salerecordInfo.percentageComplete === 'NaN' || this.salerecordInfo.indicatorsOf === 'NaN') {
            this.salerecordInfo.percentageComplete = ''
            this.salerecordInfo.indicatorsOf = ''
          }
          const reg = /^([\+ \-]?)(([1-9][0-9]*)|0|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          if (!reg.test(this.salerecordInfo.nowSize) || !reg.test(this.salerecordInfo.subscriptions)) {
            this.$message.warning(`请填写整数或小数点后两位小数`)
            return false
          }
        }
      } else {
        if (!(this.salerecordInfo.redemptions + '') || !(this.salerecordInfo.subscriptions + '')) {
          this.$message.warning(`请将必填项填写完整`)
          return false
        } else {
          if (this.salerecordInfo.percentageComplete === 'NaN' || this.salerecordInfo.indicatorsOf === 'NaN') {
            this.salerecordInfo.percentageComplete = ''
            this.salerecordInfo.indicatorsOf = ''
          }
          const reg = /^([\+ \-]?)(([1-9][0-9]*)|0|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
          if ( !reg.test(this.salerecordInfo.subscriptions)
          || !reg.test(this.salerecordInfo.redemptions)) {
            this.$message.warning(`请填写整数或小数点后两位小数`)
            return false
          }
        }
      }
    }
    const data = {
      ...this.salerecordInfo,
      mode: this.radio === 1 ? 'USER' : 'HEAD_OFFICE',
      detailId: this.addId * 1,
    }
    if (this.salerecordInfo.id) {
      const res: any = await product.addSaleson(data)
      if (res.data.success) {
        this.$message.success(`修改成功`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.$emit('hide')
    } else {
      const res: any = await product.addSaleson(data)
      if (res.data.success) {
        this.$message.success(`新增成功`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.$emit('hide')
    }
  }
  // 改变销售人员
  private async changeSaleperson(val: any) {
    const res: any = await product.getBranch(`series=${this.productInfo.productSeries}&&userId=${val}`)
    // this.branchList = res.data.data
    const arr: any = []
    for (let i = 0, len = res.data.data.length; i < len; i++) {
      arr.push({
        label: res.data.data[i],
        value: res.data.data[i],
      })
    }
    this.branchList = arr
  }
  private changeSaleperson1(val: any) {
    this.changeSaleperson(val)
    const userName = this.userList.filter((item: any) => {
      if (item.value === val) {
        return item.label
      }
    })
    this.salerecordInfo.branch = ''
    this.salerecordInfo.userName = userName[0].label
  }
  private getBranch(a: any, b: any) {
    this.salerecordInfo.branch = a
  }
  private mounted() {
    this.getUserlist()
    this.salerecordInfo = this.saleInfo
    if (this.isRadio === 1) {
      this.radio = 1
    } else if (this.isRadio === 2) {
      this.radio = 2
    }
    if (this.salerecordInfo.userId) {
      this.changeSaleperson(this.salerecordInfo.userId)
    }
    document.addEventListener('click', (e) => {
      const el: any = e
      const el1: any = this.$refs.branch
      if (el !== 'undefined') {
        if (el.target.className !== 'custom_style') {
          if (el1) {
            el1.isShow = false;
          }
        }
      }
    })
  }
}
</script>
<style lang="less" scoped>
main{
  width: 100%;
  height: 100%;
  color:rgba(49,50,51,1);
  .content{
    width: 70%;
    min-height: 400px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    .top{
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      border-bottom: 1px solid rgba(234,234,234,1);
      img{
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
    .info{
      padding: 20px;
      .text{
        font-size: 16px;
        line-height: 50px;
        .text_title{
          width: 140px;
          text-align: right;
          margin-right: 20px;
          font-size:16px;
          color:rgba(49,50,51,1);
        }
        .text_input{
          font-size: 14px;
          width: 224px !important;
          margin-right: 18px
        }
        .number_input{
          margin-top: 9px;
        }
      }
      .conTxt1{
        width:100%;
        min-height:280px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        padding-top: 20px;
        box-sizing: border-box;
      }
    }
    .bottom{
      height: 120px;
      border-top: 1px solid rgba(234,234,234,1);
      .btns{
        font-size:14px;
        .bottom_btn{
          border-radius:4px;
          padding: 10px 32px;
          cursor: pointer;
        }
        .bottom_btn:nth-child(1){
          color:rgba(255,255,255,1);
          background:rgba(87,146,252,1);
          border:1px solid rgba(87,146,252,1);
        }
        .bottom_btn:nth-child(2){
          margin-left: 80px;
          color:rgba(144,147,153,1);
          background:rgba(255,255,255,1);
          border:1px solid rgba(192,196,204,1);
        }
      }
    }
  }
}
</style>