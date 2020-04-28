<template>
  <main class="container">
    <div id="shareAdd">
      <Step :stepName = 'message' :imgUrl = "imgUrl" :isView = 'isView' ></Step>
      <section class="shareAdd">
        <!-- 转让信息 -->
        <section class="flex ">
          <span class="text_title">转让信息</span>
          <section class="contxt">
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  日期</span>
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.transferDate"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.transferDate}}</span>
                <!-- <el-input v-model="input" placeholder="请输入内容" class="inputStyle"></el-input> -->
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  交易约定号</span>
                <el-input v-if='isEdit' v-model="addInfo.reservationNumber" maxlength="50" placeholder="请输入内容" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.reservationNumber}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  转让产品代码</span>
                <!-- <el-input v-model="addInfo.productCode" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <el-select v-if="isEdit" filterable v-model="addInfo.productCode" @change="changeCode" placeholder="请选择" class="inputStyle date">
                  <el-option
                    v-for="item in codeOption"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span v-else class="inputStyle">{{addInfo.productCode}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  转让产品名称</span>
                <!-- <el-input v-model="addInfo.productName" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <el-select v-if="isEdit" filterable  v-model="addInfo.productName" @change="changeCode" placeholder="请选择" class="inputStyle date">
                  <el-option
                    v-for="item in codeOption"
                    :key="item.id"
                    :label="item.productName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span v-else class="inputStyle">{{addInfo.productName}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  转让产品系列</span>
                <el-input v-if="isEdit" v-model="addInfo.productSeries" placeholder="根据产品代码自动匹配" class="inputStyle" disabled></el-input>
                <!-- <el-select v-if="isEdit" v-model="addInfo.productSeries" @change="changeCode" placeholder="请选择" class="inputStyle">
                  <el-option
                    v-for="item in codeOption"
                    :key="item.id"
                    :label="item.series"
                    :value="item.id">
                  </el-option>
                </el-select> -->
                <span v-else class="inputStyle">{{addInfo.productSeries}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>证券代码</span>
                  <el-input v-if='isEdit' v-model="addInfo.stockCode" maxlength="50" placeholder="根据产品代码自动匹配" class="inputStyle" disabled></el-input>
                  <span v-else class="inputStyle">{{addInfo.stockCode}}</span>
                <!-- <el-select v-model="addInfo.stockCode" placeholder="请选择" class="inputStyle">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span> 转让份额</span>
                  <el-input-number v-if='isEdit' v-model="addInfo.share"   :min="1" :precision="2" :controls='false' placeholder="请输入内容"  class="inputStyle"></el-input-number>
                <!-- <el-input v-if='isEdit' v-model="addInfo.share" maxlength="50" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <span v-else class="inputStyle">{{addInfo.share}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  委托价格</span>
                <el-input-number v-if='isEdit' v-model="addInfo.entrustPrice" :precision="2" :min="1" :controls='false' placeholder="请输入内容" class="inputStyle"></el-input-number>
                <!-- <el-input v-if='isEdit' v-model="addInfo.entrustPrice" maxlength="50" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <span v-else class="inputStyle">{{addInfo.entrustPrice}}</span>
              </section>
            </section>
            <section class="flex ">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>总金额</span>
                   <el-input-number v-if='isEdit' v-model="addInfo.aggregateAmount" :precision="2" :min="1" :controls='false' placeholder="请输入内容" class="inputStyle"></el-input-number>
                <!-- <el-input v-if='isEdit' v-model="addInfo.aggregateAmount" maxlength="50" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <span v-else class="inputStyle">{{addInfo.aggregateAmount}}</span>
              </section>
            </section>
          </section>
        </section>
        <!-- 负责人 -->
        <section class="flex mt20 flexWrap">
          <section class="flex">
            <span class="text_title">
              <span class="mark">*</span>
              负责人</span>
            <!-- <el-input v-model="addInfo.principal" placeholder="请输入内容" class="inputStyle"></el-input> -->
            <el-select v-if='isEdit' v-model="addInfo.principal" @change="changePerson"  placeholder="请选择" class="inputStyle date">
              <el-option
                v-for="item in personOption"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span v-else class="inputStyle">{{addInfo.principalName}}</span>
          </section>
          <section class="flex">
            <span class="text_title">
              <span class="mark">*</span>
              分行</span>
            <!-- <Cascader
            v-if='isEdit'
            :departList = branchOption
            :categoryA = 'addInfo.branch'
            @category1 = "getBranch"
            ref="branch"
            >
            </Cascader> -->
            <el-input v-if='isEdit' v-model="addInfo.branch" placeholder="请输入内容" class="inputStyle"></el-input>
            <span v-else class="inputStyle">{{addInfo.branch}}</span>
            <!-- <el-input v-model="addInfo.branch" placeholder="请输入内容" class="inputStyle"></el-input> -->
            <!-- <el-select v-model="addInfo.branch" placeholder="请选择" class="inputStyle">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </section>
        </section>
        <!-- 转让者 -->
        <section class="flex mt20">
          <span class="text_title">转让者</span>
          <section class="contxt">
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  基金账户</span>
                  <el-input v-if='isEdit' v-model="addInfo.transferor.fundAccount" placeholder="请输入内容" @change="onTransferorFundAccountChange" class="inputStyle"></el-input>
                  <span v-else class="inputStyle">{{addInfo.transferor.fundAccount}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  姓名</span>
                <el-input v-if='isEdit' v-model="addInfo.transferor.userName" placeholder="请输入内容" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.transferor.userName}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  身份证号</span>
                <el-input v-if='isEdit' v-model="addInfo.transferor.idNumber" placeholder="请输入内容" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.transferor.idNumber}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  已持有资管计划</span>
                <el-input v-if='isEdit' v-model="addInfo.transferor.haveAssetsManagement" placeholder="请输入内容" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.transferor.haveAssetsManagement}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>原持有份额</span>
                  <el-input-number v-if='isEdit' v-model="addInfo.transferor.originalShare" :precision="2" :min="1" :controls='false' placeholder="请输入内容" class="inputStyle"></el-input-number>
                <!-- <el-input v-if='isEdit' v-model="addInfo.transferor.originalShare" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <span v-else class="inputStyle">{{addInfo.transferor.originalShare}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>转让后剩余份额</span>
                  <el-input-number v-if='isEdit' v-model="addInfo.transferor.surplus" :precision="2" :min="1" :controls='false' placeholder="请输入内容" class="inputStyle"></el-input-number>
                <!-- <el-input v-if='isEdit' v-model="addInfo.transferor.surplus" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <span v-else class="inputStyle">{{addInfo.transferor.surplus}}</span>
              </section>
            </section>
          </section>
        </section>
        <!-- 受让者 -->
        <section class="flex mt20">
          <span class="text_title">受让者</span>
          <section class="contxt">
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  基金账户</span>
                <el-input v-if='isEdit' v-model="addInfo.transferee.fundAccount" placeholder="请输入内容" @change="onTransfereeFundAccountChange" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.transferee.fundAccount}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  姓名</span>
                <el-input v-if='isEdit' v-model="addInfo.transferee.userName" placeholder="请输入内容" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.transferee.userName}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  身份证号</span>
                <el-input v-if='isEdit' v-model="addInfo.transferee.idNumber" placeholder="请输入内容" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.transferee.idNumber}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>
                  已持有资管计划</span>
                <el-input v-if='isEdit' v-model="addInfo.transferee.haveAssetsManagement" placeholder="请输入内容" class="inputStyle"></el-input>
                <span v-else class="inputStyle">{{addInfo.transferee.haveAssetsManagement}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>原持有份额</span>
                <el-input-number v-if='isEdit' v-model="addInfo.transferee.originalShare" placeholder="请输入内容" :min="1"  :controls='false' class="inputStyle"></el-input-number>
                <!-- <el-input v-if='isEdit' v-model="addInfo.transferee.originalShare" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <span v-else class="inputStyle">{{addInfo.transferee.originalShare}}</span>
              </section>
              <section class="flex">
                <span class="text">
                  <span class="mark">*</span>转让后剩余份额</span>
                  <el-input-number v-if='isEdit' v-model="addInfo.transferee.surplus" :precision="2" :min="1" :controls='false' placeholder="请输入内容" class="inputStyle"></el-input-number>
                <!-- <el-input v-if='isEdit' v-model="addInfo.transferee.surplus" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <span v-else class="inputStyle">{{addInfo.transferee.surplus}}</span>
              </section>
            </section>
          </section>
        </section>
        <!-- 进展 -->
        <section class="flex mt20">
          <span class="text_title">进展</span>
          <section class="contxt">
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">材料入库</span>
                <!-- <el-input v-model="addInfo.transferee.fundAccount" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.MATERIAL_STORAGE"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.MATERIAL_STORAGE}}</span>
              </section>
              <section class="flex">
                <span class="text">提交运营</span>
                <!-- <el-input v-model="addInfo.transferee.userName" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.SUBMIT_OPERATIONS"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.SUBMIT_OPERATIONS}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">收到确认单</span>
                <!-- <el-input v-model="addInfo.transferee.idnumber" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.RECEIPT_OF_CONFIRMATION"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.RECEIPT_OF_CONFIRMATION}}</span>
              </section>
              <section class="flex">
                <!-- <span class="text" >客户已打款发起OA沟通</span> -->
                <div class="text">
                  <div style="line-height: 30px">客户已打款</div>
                  <div style="line-height: 30px">发起OA沟通</div>
                </div>
                <!-- <el-input v-model="addInfo.transferee.haveAssetsManagement" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.CUSTOMER_HAS_PAID"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.CUSTOMER_HAS_PAID}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <!-- <span class="text">款已出，等待交割单</span> -->
                <div class="text">
                  <div style="line-height: 30px">款已出，</div>
                  <div style="line-height: 30px">等待交割单</div>
                </div>
                <!-- <el-input v-model="addInfo.transferee.originalShare" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.WAIT_FOR_PAPERS"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.WAIT_FOR_PAPERS}}</span>
              </section>
              <section class="flex">
                <span class="text">收到交割单</span>
                <!-- <el-input v-model="addInfo.transferee.originalShare" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.RECEIPT_FOR_PAPERS"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.RECEIPT_FOR_PAPERS}}</span>
              </section>
            </section>
            <section class="flex flexWrap">
              <section class="flex">
                <span class="text">原件收到</span>
                <!-- <el-input v-model="addInfo.transferee.originalShare" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.ORIGINAL_RECEIPT"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.ORIGINAL_RECEIPT}}</span>
              </section>
              <section class="flex">
                <span class="text">原件寄出</span>
                <!-- <el-input v-model="addInfo.transferee.originalShare" placeholder="请输入内容" class="inputStyle"></el-input> -->
                <div class="date" v-if='isEdit'>
                  <el-date-picker
                    v-model="addInfo.progress.SENDTHE_ORIGINAL"
                    type="date"
                    placeholder="选择日期"
                    class="inputStyle"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
                <span v-else class="inputStyle">{{addInfo.progress.SENDTHE_ORIGINAL}}</span>
              </section>
            </section>
          </section>
        </section>
      </section>
      <div  style="width:436px;margin:auto;display:flex;justify-content:space-around;margin-top:40px">
        <button class="btn btn_primary" @click="submitInfo">保存</button>
        <button class="btn btn_info_plain_disabled" @click="$router.push({name: 'sharemanage'})">取消</button>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Prop, Watch, Component} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import Cascader from '../../../components/Cascader.vue'
import { product, outProduct } from '../../../api'
@Component({
  components: {
    Step,
    Cascader,
  },
})
export default class ShareAdd extends Vue {
  private message: any = ['产品管理', '份额转让管理', '份额转让', '新增']
  private imgUrl: any = require('../../../assets/img/head/product.png')
  private isView: boolean = true
  private codeOption: any[] = []
  private personOption: any[] = []
  private branchOption: any[] = []
  private isEdit: boolean = true
  private addInfo: any = {
    transferDate: '',
    reservationNumber: '',
    productId: '',
    productCode: '',
    productName: '',
    productSeries: '',
    stockCode: '',
    share: undefined,
    entrustPrice: undefined,
    aggregateAmount: undefined,
    principal: '',
    branch: '',
    transferor: {
      category: 'TRANSFEROR',
      fundAccount: '',
      userName: '',
      idNumber: '',
      haveAssetsManagement: '',
      surplus: undefined,
    },
    transferee: {
      category: 'TRANSFEREE',
      fundAccount: '',
      userName: '',
      idNumber: '',
      haveAssetsManagement: '',
      surplus: undefined,
    },
    progress: {
      MATERIAL_STORAGE: '',
      SUBMIT_OPERATIONS: '',
      RECEIPT_OF_CONFIRMATION: '',
      CUSTOMER_HAS_PAID: '',
      WAIT_FOR_PAPERS: '',
      RECEIPT_FOR_PAPERS: '',
      ORIGINAL_RECEIPT: '',
      SENDTHE_ORIGINAL: '',
    },
  }
  @Watch('addInfo.share') private share(val: any, old: any) {
    if (this.addInfo.entrustPrice) {
      this.addInfo.aggregateAmount = val * this.addInfo.entrustPrice
    }
    this.addInfo.transferor.surplus = this.addInfo.transferor.originalShare * 1 - val * 1
    this.addInfo.transferee.surplus = val * 1 + this.addInfo.transferee.originalShare * 1
    if (this.addInfo.transferee.surplus === 0 || !this.addInfo.transferee.surplus || !val) {
      this.addInfo.transferee.surplus = undefined
    }
    if (this.addInfo.transferor.surplus === 0 || !this.addInfo.transferor.surplus || !val) {
      this.addInfo.transferor.surplus = undefined
    }
  }
  @Watch('addInfo.entrustPrice') private entrustPrice(val: any, old: any) {
    if (this.addInfo.share) {
      this.addInfo.aggregateAmount = (val * this.addInfo.share).toFixed(2)
    }
  }
  @Watch('addInfo.transferor.originalShare') private originalShare(val: any, old: any) {
    if (this.addInfo.share) {
      this.addInfo.transferor.surplus = val * 1 - this.addInfo.share * 1
    }
    if (!val) {
       this.addInfo.transferor.surplus = undefined
    }
  }
  @Watch('addInfo.transferee.originalShare') private originalShare1(val: any, old: any) {
    if (this.addInfo.share) {
      this.addInfo.transferee.surplus = val * 1 + this.addInfo.share * 1
    }
    if (!val) {
       this.addInfo.transferee.surplus = undefined
    }
  }
  // 提交
  private async submitInfo() {
    if (!this.addInfo.transferDate || !this.addInfo.reservationNumber || !this.addInfo.productCode ||
     !this.addInfo.productName  || !this.addInfo.stockCode || !this.addInfo.share ||
     !this.addInfo.entrustPrice  || !this.addInfo.principal || !this.addInfo.branch) {
        this.$message.warning(`请将必填项填写完整`)
        return false
    } else {
      if (this.addInfo.share) {
        const reg: any =  /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/
        if (!reg.test(this.addInfo.share)) {
          this.$message.warning(`转让份额请填写整数和小数点后最多2位小数`)
          return false
        }
        if (!reg.test(this.addInfo.entrustPrice)) {
          this.$message.warning(`委托价格请填写整数和小数点后最多2位小数`)
          return false
        }
      }
    }
    if (!this.addInfo.transferor.fundAccount || !this.addInfo.transferor.userName || !this.addInfo.transferor.idNumber
      || !this.addInfo.transferor.haveAssetsManagement || !this.addInfo.transferee.originalShare) {
        this.$message.warning(`请将必填项填写完整`)
        return false
    } else {
      if (this.addInfo.transferee.originalShare) {
        const reg: any =  /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/
        if (!reg.test(this.addInfo.transferee.originalShare)) {
          this.$message.warning(`原持有份额请填写整数和小数点后最多2位小数`)
          return false
        }
      }
    }
    if (!this.addInfo.transferee.fundAccount || !this.addInfo.transferee.userName || !this.addInfo.transferee.idNumber
      || !this.addInfo.transferee.haveAssetsManagement || !this.addInfo.transferee.originalShare ) {
        this.$message.warning(`请将必填项填写完整`)
        return false
    } else {
      if (this.addInfo.transferee.originalShare) {
        const reg: any =  /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/
        if (!reg.test(this.addInfo.transferee.originalShare)) {
          this.$message.warning(`原持有份额请填写整数和小数点后最多2位小数`)
          return false
        }
      }
    }
    if (!this.$route.query.id) {
      const data: any = {
        ...this.addInfo,
      }
      const res: any = await product.addShareinfo(data)
      if (res.data.success) {
        this.$message.success(`新增成功!`)
        this.$router.push({name: 'sharemanage'})
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    } else {
      const data = {
        ...this.addInfo,
      }
      const res: any = await product.updateShareinfo(data)
      if (res.data.success) {
        this.$message.success(`更新成功!`)
        this.$router.push({name: 'sharemanage'})
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    }
  }
  // 根据id查看详情
  private async getShareinfobyId() {
    const res: any = await product.getSharebyId(`id=${this.$route.query.id}`)
    this.addInfo = res.data.data
  }
  // 产品代码改变时
  private changeCode(val: any) {
    const code = this.codeOption.filter((item: any) => {
      if (item.id === val) {
        return item
      }
    })
    this.addInfo.productId = code [0].id
    this.addInfo.productCode = code[0].code
    this.addInfo.productName = code[0].productName
    this.addInfo.productSeries = code[0].series
    this.addInfo.stockCode = code[0].stackCode
    if (!code[0].stackCode) {
      this.$message.warning(`该产品暂无证券代码，请前往'产品基本属性表'维护`)
    }
    if (this.addInfo.principal) {
      this.getBranch1(this.addInfo.productSeries, this.addInfo.principal)
    }
    if (this.addInfo.transferor.fundAccount) {
      this.getShareInfoByFundCountAndProductId(this.addInfo.transferor.fundAccount)
    }
    if (this.addInfo.transferee.fundAccount) {
      this.getShareInfoByFundCountAndProductId2(this.addInfo.transferee.fundAccount)
    }
    // this.getStackCode(val)
  }
  // 负责人改变时
  private changePerson(val: any) {
    if (this.addInfo.productSeries) {
      this.getBranch1(this.addInfo.productSeries, val)
    }
    this.addInfo.branch = ''
  }
  // 查询分行
  private async getBranch1(series: any, userId: any) {
    const res: any = await product.getBranch(`series=${series}&&userId=${userId}`)
    this.branchOption = []
    for (let i = 0, len = res.data.data.length; i < len; i++) {
      this.branchOption.push({
        label: res.data.data[i],
        value: res.data.data[i],
      })
    }
  }
  private getBranch(a: any, b: any) {
    this.addInfo.branch = a
  }
  // 查询产品代码
  private async getCode() {
    const res: any = await product.findAllproduct()
    this.codeOption = res.data.data
    // const data = {
    //   pageNum: 1,
    //   pageSize: 10000,
    // }
    // const res: any = await product.getStackcode(data)
    // this.codeOption = res.data.data.records
  }
  // 查询可选用户列表
  private async getpersonList() {
    const res: any = await product.getSaleperson(`type='SHARE_TRANSFER'`)
    this.personOption = res.data.data
  }
  // 获取用户最大交易额
  private async findMaxReservationNumber() {
    const res:  any = await product.findMaxReservationNumber()
    this.addInfo.reservationNumber = res.data.data
  }
  // 根据id查询证券交易码
  private async getStackCode(id: any) {
    const res: any = await product.getStackcodeByid(`id=${id}`)
    this.addInfo.stockCode  = ''
    this.addInfo.stockCode  = res.data.data.stackCode
  }
  // 基金账户改变时
  // 转让者
  private onTransferorFundAccountChange(val: any) {
    this.addInfo.transferor.userName = ''
    this.addInfo.transferor.idNumber = ''
    outProduct.findCustomerInfoByFundAccount(val).then((res: any) => {
      this.addInfo.transferor.userName = res.data.data.custName
      this.addInfo.transferor.idNumber = res.data.data.identityNo
    })
    this.getShareInfoByFundCountAndProductId(val)
  }
  // 受让者
  private onTransfereeFundAccountChange(val: any) {
    this.addInfo.transferee.userName = ''
    this.addInfo.transferee.idNumber = ''
    outProduct.findCustomerInfoByFundAccount(val).then((res: any) => {
      this.addInfo.transferee.userName = res.data.data.custName
      this.addInfo.transferee.idNumber = res.data.data.identityNo
    })
    this.getShareInfoByFundCountAndProductId2(val)
  }
  // 根据基金账户和产品code---转让者
  private getShareInfoByFundCountAndProductId(param: any) {
    outProduct.findSharesInfoByFundAccount(param).then((res: any) => {
      this.addInfo.transferor.originalShare = undefined
      this.addInfo.transferor.haveAssetsManagement = ''
      this.addInfo.transferor.surplus = undefined
      const Info = res.data.data
      if (this.addInfo.productCode) {
        const InfoFilter = Info.filter((item: any) => {
          return item.fundcode === this.addInfo.productCode
        })
        if (InfoFilter && InfoFilter.length) {
          const originalShare = InfoFilter && InfoFilter.length ? InfoFilter[0].remainshares : undefined
          this.$set(this.addInfo.transferor, 'originalShare', originalShare)
          if (this.addInfo.share) {
            this.addInfo.transferor.surplus = this.addInfo.transferor.originalShare * 1 - this.addInfo.share * 1
            this.$set(this.addInfo.transferor, 'surplus', this.addInfo.transferor.surplus)
          }
        }
      }
      let str = ''
      for (const i of Info) {
        str = str + i.fundcode + ','
      }
      this.addInfo.transferor.haveAssetsManagement = str.slice(0, -1)
    })
  }

  // 根据基金账户和产品code---受让者
  private getShareInfoByFundCountAndProductId2(param: any) {
    this.addInfo.transferee.originalShare = undefined
    this.addInfo.transferee.haveAssetsManagement = ''
    this.addInfo.transferee.surplus = undefined
    outProduct.findSharesInfoByFundAccount(param).then((res: any) => {
      const Info = res.data.data
      if (this.addInfo.productCode) {
        const InfoFilter = Info.filter((item: any) => {
          return item.fundcode === this.addInfo.productCode
        })
        if (InfoFilter && InfoFilter.length) {
          const originalShare = InfoFilter && InfoFilter.length ? InfoFilter[0].remainshares : undefined
          this.$set(this.addInfo.transferee, 'originalShare', originalShare)
          console.log(this.addInfo.share)
          if (this.addInfo.share) {
            this.addInfo.transferee.surplus = this.addInfo.transferee.originalShare * 1 + this.addInfo.share * 1
            this.$set(this.addInfo.transferee, 'surplus', this.addInfo.transferee.surplus)
          }
        }
      }
      let str = ''
      for (const i of Info) {
        str = str + i.fundcode + ','
      }
      this.addInfo.transferee.haveAssetsManagement = str.slice(0, -1)
    })
  }

  private mounted() {
    this.getCode()
    this.getpersonList()
    switch (this.$route.query.type) {
      case 'edit':
        this.message = ['产品管理', '份额转让管理', '份额转让', '编辑']
        this.getShareinfobyId()
        break;
      case 'detail':
        this.message = ['产品管理', '份额转让管理', '份额转让', '详情']
        this.getShareinfobyId()
        this.isEdit = false
        break;
      default:
        this.message = ['产品管理', '份额转让管理', '份额转让', '新增']
        this.findMaxReservationNumber()
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
  #shareAdd{
    .flexWrap{
      flex-wrap: wrap;
    }
    .mt20{
      margin-top: 20px
    }
    .date{
      /deep/ .el-input__icon{
      line-height: 32px;
      }
    }
    .shareAdd{
      font-size: 16px;
      line-height: 50px;
      .text_title{
        width: 100px;
        text-align: right;
        margin-right: 20px;
        color:rgba(49,50,51,1);
      }
      .contxt{
        width:80%;
        height:auto;
        background:rgba(245,247,250,1);
        border-radius:4px;
        margin-top: 25px
      }
      .text{
        width: 140px;
        text-align: right;
        margin-right: 20px;
        color:rgba(49,50,51,1);
      }
      .inputStyle{
        width: 224px !important;
        font-size: 14px;
        line-height: 32px;
        margin: 9px 0;
      }
    }
    /deep/.el-input-number .el-input__inner{
      text-align: left;
    }
  }
  
}
</style>