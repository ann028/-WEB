<template>
  <main class="container">
    <Step :stepName = 'message' :isView = 'isView' :imgUrl = "imgUrl"></Step>
    <section class="mt20">
      <section class="flex  " style="flex-wrap: wrap">
        <section class="flex addProductText ">
          <span class="text_title">
            <span class="mark">*</span>
            产品代码</span>
          <!-- <el-input v-model="input" placeholder="请输入内容" class="text_input"></el-input> -->
          <el-select v-model="addProductinfo.code" filterable placeholder="请选择" class="text_input" @change="changeCode">
            <el-option
              v-for="item in codeList"
              :key="item.id"
              :label="item.code"
              :value="item.id">
            </el-option>
          </el-select>
        </section>
        <section class="flex addProductText">
          <span class="text_title">
            <span class="mark">*</span>
            产品名称</span>
          <!-- <el-input v-model="input" placeholder="请输入内容" class="text_input"></el-input> -->
          <el-select v-model="addProductinfo.productName" filterable placeholder="请选择" class="text_input" @change="changeCode">
            <el-option
              v-for="item in codeList"
              :key="item.id"
              :label="item.productName"
              :value="item.id">
            </el-option>
          </el-select>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex addProductText ">
          <span class="text_title">成立时间</span>
          <el-date-picker
            v-model="addProductinfo.createAt"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            class="text_input">
          </el-date-picker>
          <!-- <el-input v-model="input" placeholder="请输入内容" class="text_input"></el-input> -->
        </section>
        <section class="flex addProductText">
          <span class="text_title">
            产品系列</span>
          <el-input v-model="addProductinfo.productseries" placeholder="根据产品代码自动匹配" disabled class="text_input" maxlength="50"></el-input>
          <!-- <el-select v-model="addProductinfo.productseries" placeholder="请选择" class="text_input" @change="changeCode">
            <el-option
              v-for="item in codeList"
              :key="item.id"
              :label="item.series"
              :value="item.id">
            </el-option>
          </el-select> -->
        </section>
      </section>
      <section class="flex  " style="flex-wrap: wrap">
        <section class="flex addProductText">
          <span class="text_title">
            <span class="mark">*</span>
            投资主办</span>
          <el-input v-model="addProductinfo.person" placeholder="请输入内容" class="text_input" maxlength="50"></el-input>
        </section>
        <section class="flex addProductText">
          <span class="text_title">成立规模</span>
          <!-- <el-input  v-model="addProductinfo.scale" placeholder="请输入内容" maxlength="50" class="text_input" style="margin: 9px 0">
            <template slot="append">亿元</template>
          </el-input> -->
          <el-input v-model="addProductinfo.scale" placeholder="请输入内容" class="text_input" maxlength="50"></el-input>(亿元)
        </section>
      </section>
    </section>
    <div  style="width:436px;margin:auto;display:flex;justify-content:space-around;margin-top:40px">
      <button class="btn btn_primary" @click="submitProductinfo">保存</button>
      <button class="btn btn_info_plain_disabled" @click="$router.push({name: 'openperiod'})">取消</button>
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { product } from '../../../api'
@Component({
  components: {
    Step,
  },
})
export default class Addproduct extends Vue {
  private message: any = ['开放期', '开放周期表', '产品']
  private isView: boolean = true
  private imgUrl: any = require('../../../assets/img/head/product.png')
  private addProductinfo: any = {
    code: '',
    productName: '',
    createAt: '',
    productseries: '',
    productId: '',
    person: '',
    scale: '',
  }
  private codeList: any[] = []
  // 获取产品代码
  private async getCodelist() {
    const res: any = await product.findAllproduct()
    this.codeList = res.data.data
  }
  // select改变
  private changeCode(val: any) {
    const code = this.codeList.filter((item: any) => {
      if (item.id  === val) {
        return item
      }
    })
    // // this.$set(this.addProductinfo, 'productId', code[0].id)
    this.addProductinfo.productId = code[0].id
    this.addProductinfo.code = code[0].code
    this.addProductinfo.productName = code[0].productName
    this.addProductinfo.productseries = code[0].series
  }
  // 保存
  private async submitProductinfo() {
    if (!this.addProductinfo.code || !this.addProductinfo.productName
    || !this.addProductinfo.person) {
        this.$message.warning(`请将必填项填写完整`)
        return false
    }
    if (this.addProductinfo.scale) {
      const reg: any =  /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/
      if (!reg.test(this.addProductinfo.scale)) {
        this.$message.warning(`规模请填写整数和小数点后最多4位小数`)
        return false
      }
    }
    if (this.$route.query.id) {
      const data = {
        ...this.addProductinfo,
        // id: this.$route.query.id,
        // person: this.addProductinfo.person,
        // productId: this.addProductinfo.productId,
        // scale: this.addProductinfo.scale,
      }
      const res: any = await product.updateProduct(data)
      if (res.data.success) {
        this.$message.success(`修改成功`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    } else {
      const data = {
        ...this.addProductinfo,
        // person: this.addProductinfo.person,
        // productId: this.addProductinfo.productId,
        // scale: this.addProductinfo.scale,
      }
      const res: any = await product.addProduct(data)
      if (res.data.success) {
        this.$message.success(`新增成功`)
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    }
    this.$router.push({name: 'openperiod'})
  }
  // 根据id查询
  private  async getInfobyid(id: any) {
    const res1: any = await product.findAllproduct()
    if (res1.data.success) {
      this.codeList = res1.data.data
      // product.getProductbyId(`id=${id}`).then((res) => {
      //   this.addProductinfo = res.data.data
      //   for (let i = 0, len = this.codeList.length; i < len; i++) {
      //     if (this.codeList[i].id === res.data.data.productId ) {
      //       this.addProductinfo.productId = this.codeList[i].id
      //       this.addProductinfo.code = this.codeList[i].code
      //       this.addProductinfo.productName = this.codeList[i].productName
      //       this.addProductinfo.productseries = this.codeList[i].series
      //     }
      //   }
      // })
    }
  }
  private async getInfoById(id: any) {
    product.getProductbyId(`id=${id}`).then((res) => {
      this.addProductinfo = res.data.data
      // this.addProductinfo.code = res.data.data.code
      this.addProductinfo.productName = res.data.data.name
      this.addProductinfo.productseries = res.data.data.series
      for (let i = 0, len = this.codeList.length; i < len; i++) {
        if (this.codeList[i].id === res.data.data.productId ) {
          this.addProductinfo.productId = res.data.data.id
          // this.addProductinfo.code = res.data.data.code
          // this.addProductinfo.productName = res.data.data.name
          // this.addProductinfo.productseries = res.data.data.series
        }
      }
    })
  }
  private mounted() {
    this.getCodelist()
    switch (this.$route.query.type) {
      case 'edit':
        this.message = ['开放期', '开放周期表', '产品编辑']
        this.getInfobyid(this.$route.query.id)
        this.getInfoById(this.$route.query.id)
        break;
      case 'detail':
        this.message = ['开放期', '开放周期表', '产品详情']
        this.getInfobyid(this.$route.query.id)
        this.getInfoById(this.$route.query.id)
        break;
      default:
        this.message = ['开放期', '开放周期表', '产品新增']
    }
  }
}
</script>
<style lang="less" scoped>
// .isRow{
//   /deep/ .el-input__icon{
//     height: 50px;
//     line-height: 50px;
//   }
// }
// .date{
//   /deep/ .el-input__icon{
//     line-height: 50px;
//   }
// }
/deep/ .el-input__icon{
  line-height: 32px;
}
main{
  .addProductText{
    line-height: 50px;
    font-size: 16px;
    .text_title{
      width: 100px;
      text-align: right;
      margin-right: 20px;
      font-size:16px;
      color:rgba(49,50,51,1);
    }
    .text_input{
      width: 224px !important;
      font-size: 14px;
      line-height: 32px;
      margin: 9px 0;
    }
  }
}
</style>