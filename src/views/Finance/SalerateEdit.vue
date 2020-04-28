<template>
  <main class="container">
    <Step :stepName = 'message' :isView = 'isView' :imgUrl = "imgUrl"></Step>
    <section class="mt20">
        <section class="flex textBox">
          <section class="flex">
            <span class="text_title">
              <span class="mark">*</span>
              机构名称</span>
            <el-input v-if="isEdit" v-model="addInfo.mechanism" placeholder="请输入内容" maxlength="100" class="searchBox"></el-input>
            <span v-else class="searchBox">{{addInfo.mechanism}}</span>
          </section>
        </section>
        <section class="flex textBox">
          <section class="flex">
            <span class="text_title">
              <span class="mark">*</span>
              产品名称</span>
            <el-input v-if="isEdit" v-model="addInfo.productName" placeholder="请输入内容" maxlength="100" class="searchBox"></el-input>
            <span v-else class="searchBox">{{addInfo.productName}}</span>
          </section>
          <section class="flex">
            <span class="text_title">产品代码</span>
            <el-input v-if="isEdit" v-model="addInfo.productCode" placeholder="请输入内容" maxlength="50" class="searchBox"></el-input>
            <span v-else class="searchBox">{{addInfo.productCode}}</span>
          </section>
        </section>
        <section class="flex textBox">
          <section class="flex">
            <span class="text_title">
              <span class="mark">*</span>
              客户维护费率</span>
            <el-input v-if="isEdit" v-model="addInfo.maintenanceFee" placeholder="请输入内容" maxlength="50" class="searchBox" style="margin: 9px 0">
              <template slot="append">%</template>
            </el-input>
            <span v-else class="searchBox">{{addInfo.maintenanceFee}}%</span>
          </section>
          <section class="flex">
            <span class="text_title">超额业绩分成</span>
            <el-input v-if="isEdit" v-model="addInfo.excessPerformanceSharing" placeholder="请输入内容" maxlength="50" class="searchBox" style="margin: 9px 0">
              <template slot="append">%</template>
            </el-input>
            <span v-else  class="searchBox" >{{addInfo.excessPerformanceSharing}}%</span>
          </section>
        </section>
    </section>
    <section v-if="isEdit" style="margin-top: 40px">
      <div  style="width:436px;margin:auto;display:flex;justify-content:space-around">
        <button class="btn btn_primary"  @click="submitInfo">保存</button>
        <button class="btn btn_info_plain_disabled" @click="$router.push({name:'salerate'})">取消</button>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { finance } from '../../api'
@Component({
  components: {
    Step,
  },
})
export default class SalerateEdit extends Vue {
  private message = ['财务管理', '销售费率', '新增']
  private imgUrl = require('../../assets/img/head/finance.png')
  private isView: boolean = true
  private addInfo: any = {
    mechanism: '',
    productName: '',
    productCode: '',
    maintenanceFee: '',
    excessPerformanceSharing: '',
  }
  private isEdit: boolean = true // 是否可编辑
  private async submitInfo() {
    if (!this.addInfo.mechanism || !this.addInfo.productName || !this.addInfo.maintenanceFee) {
      this.$message.warning(`请将必填项填写完整`)
      return false
    }
    const reg = /^(\d|[1-9]\d|100)(\.\d{1,2})?$/;
    if (!reg.test(this.addInfo.maintenanceFee)) {
      this.$message.warning(`'客户维护费率'需输入1~100以内数字或小数点后两位小数`)
      return false
    }
    if (this.addInfo.excessPerformanceSharing) {
      if (!reg.test(this.addInfo.excessPerformanceSharing)) {
        this.$message.warning(`'超额业绩分成'需输入1~100以内数字或小数点后两位小数`)
        return false
      }
    }
    // const data = {
    //   ...this.addInfo,
    // }
    if (this.$route.query.id) {
      const data = {
        ...this.addInfo,
      }
      const res: any = await finance.updataSaleInfo(data)
      if (res.data.success) {
        this.$message.success(`修改成功！`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.$router.push({name: 'salerate'})
    } else {
      const data = {
        mechanism: this.addInfo.mechanism,
        productName: this.addInfo.productName,
        productCode: this.addInfo.productCode,
        maintenanceFee: this.addInfo.maintenanceFee * 1 || null,
        excessPerformanceSharing: this.addInfo.excessPerformanceSharing * 1 || null,
      }
      const res: any = await finance.addSaleInfo(data)
      if (res.data.success) {
        this.$message.success(`添加成功！`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.$router.push({name: 'salerate'})
    }
  }
  private async getInfobyId(id: any) {
    const res: any = await finance.getInfoById(`id=${id}`)
    this.addInfo = res.data.data
  }
  private mounted() {
    if (this.$route.query.id && this.$route.query.type === 'edit') {
      this.message =  ['财务管理', '销售费率', '编辑']
      this.getInfobyId(this.$route.query.id)
    } else if (this.$route.query.id && this.$route.query.type === 'detail') {
      this.message =  ['财务管理', '销售费率', '查看']
      this.getInfobyId(this.$route.query.id)
      this.isEdit = false
    } else {
      this.message =  ['财务管理', '销售费率', '新增']
    }
  }
}
</script>
<style lang="less" scoped>
main{
  .mt20{
    margin-top: 20px;
  }
  .searchBox{
    font-size: 14px;
    width: 224px !important;
  }
  .textBox{
    line-height: 50px;
    font-size:  16px;
    .text_title{
      width: 120px;
      text-align: right;
      margin-right: 20px;
      font-size:16px;
      color:rgba(49,50,51,1);
    }
  }
}
</style>