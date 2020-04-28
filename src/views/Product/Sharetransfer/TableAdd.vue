<template>
  <main class="container">
    <Step :stepName = 'message' :isView = "isView" :imgUrl = 'imgUrl'></Step>
    <section class="mt20">
      <section class="flex  " style="flex-wrap: wrap">
        <section class="flex tableAdd">
          <span class="text_title">
            <span class="mark">*</span>
            券商产品代码</span>
          <!-- <el-input v-model="addInfo.productCode" placeholder="请输入内容" maxlength="50" class="text_input"></el-input> -->
          <el-select v-if="isEdit" filterable v-model="addInfo.code" placeholder="请选择" class="text_input" @change="changeCode">
            <el-option
              v-for="item in codeList"
              :key="item.id"
              :label="item.code"
              :value="item.id">
            </el-option>
          </el-select>
          <span v-else class="text_input text_input1" >{{addInfo.code}}</span>
        </section>
        <section class="flex tableAdd">
          <span class="text_title">
            <span class="mark">*</span>
            产品名称</span>
          <!-- <el-input v-model="addInfo.product" placeholder="请输入内容" maxlength="100" class="text_input"></el-input> -->
          <el-select v-if="isEdit" filterable v-model="addInfo.productName" placeholder="请选择" class="text_input" @change="changeCode">
            <el-option
              v-for="item in codeList"
              :key="item.id"
              :label="item.productName"
              :value="item.id">
            </el-option>
          </el-select>
          <span v-else class="text_input text_input1" style="width: 300px !important;">{{addInfo.productName}}</span>
        </section>
      </section>
      <section class="flex " style="flex-wrap: wrap">
        <section class="flex tableAdd">
          <span class="text_title">
            产品系列</span>
          <el-input v-if='isEdit' v-model="addInfo.series" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
          <span v-else class="text_input text_input1">{{addInfo.series}}</span>
        </section>
        <section class="flex tableAdd">
          <span class="text_title">
            <span class="mark">*</span>
            交易所证券代码</span>
          <el-input v-if='isEdit' v-model="addInfo.stackCode" placeholder="请输入内容" maxlength="50" class="text_input"></el-input>
          <span v-else class="text_input text_input1">{{addInfo.stackCode}}</span>
        </section>
      </section>
    </section>
    <div v-if="isEdit"  style="width:436px;margin:auto;display:flex;justify-content:space-around;margin-top:40px">
      <button class="btn btn_primary" @click="submitInfo">保存</button>
      <button class="btn btn_info_plain_disabled" @click="$router.push({name: 'producttable'})">取消</button>
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
export default class TableAdd extends Vue {
  private message: any = ['产品管理', '份额转让', '产品/证券代码对应表', '新增']
  private imgUrl: any = require('../../../assets/img/head/product.png')
  private isView: boolean = true
  private addInfo: any = {
    code: '',
    productName: '',
    productId: '',
    stackCode: '',
    series: '',
  }
  private codeList: any[] = []
  private isEdit: boolean = true
  private get userInfo() {
    return this.$store.state.userInfo
  }
  // 保存
  private async submitInfo() {
    if (!this.addInfo.code || !this.addInfo.productName || !this.addInfo.stackCode) {
      this.$message.warning(`请将必填项填写完整!`)
      return false
    } else if (this.addInfo.stackCode) {
      const re =  /^[0-9a-zA-Z]*$/
      if (!re.test(this.addInfo.stackCode)) {
        this.$message.warning(`交易所证券代码只可输入英文、数字`)
        return false
      }
    }
    if (!this.$route.query.id) {
      const data = {
        // ...this.addInfo,
        productId: this.addInfo.productId,
        series: this.addInfo.series,
        stackCode: this.addInfo.stackCode,
        userId: this.$store.state.userInfo.userId * 1,
      }
      const res: any = await product.addStackcode(data)
      if (res.data.success) {
        this.$message.success(`新增成功!`)
        this.$router.push({name: 'producttable'})
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    } else {
      console.log('id', this.$route.query.id, this.addInfo.id)
      const data = {
        // ...this.addInfo,
        id: this.addInfo.id,
        productId: this.addInfo.productId,
        series: this.addInfo.series,
        stackCode: this.addInfo.stackCode,
        userId: this.$store.state.userInfo.userId,
      }
      console.log(data)
      const res: any = await product.updateStackcode(data)
      if (res.data.success) {
        this.$message.success(`更新成功!`)
        this.$router.push({name: 'producttable'})
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    }
    // this.$router.push({name: 'producttable'})
  }
  // 根据id查看详情
  private async getInfoByid(id: any) {
    const res: any = await product.getStackcodeByid(`id=${id}`)
    this.addInfo = res.data.data
    this.addInfo.productName = res.data.data.name
  }
  // 获取产品代码
  private async getCode() {
    const res: any = await product.findAllproduct()
    this.codeList = res.data.data
  }
  // 产品代码改变时
  private changeCode(val: any) {
    const arr = this.codeList.filter((item: any) => {
      if (item.id === val) {
        return item
      }
    })
    this.addInfo.productId = arr[0].id
    this.addInfo.code = arr[0].code
    this.addInfo.productName = arr[0].productName
    this.addInfo.series = arr[0].series
  }
  private mounted() {
    this.getCode()
    switch (this.$route.query.type) {
      case 'edit':
        this.message = ['产品管理', '份额转让管理', '产品基本属性表', '编辑']
        this.getInfoByid(this.$route.query.id)
        break;
      case 'detail':
        this.message = ['产品管理', '份额转让管理', '产品基本属性表', '详情']
        this.getInfoByid(this.$route.query.id)
        this.isEdit = false
        break;
      default:
        this.message = ['产品管理', '份额转让管理', '产品基本属性表', '新增']
    }
  }
}
</script>
<style lang="less" scoped>
main{
  /deep/ .el-input__icon{
    line-height: 50px;
    }
  .tableAdd{
      line-height: 50px;
      font-size: 16px;
    .text_title{
      width: 130px;
      text-align: right;
      margin-right: 20px;
      font-size:16px;
      color:rgba(49,50,51,1);
    }
    .text_input{
      width: 224px !important;
      font-size: 14px;
    }
    .text_input1{
      color:rgba(96,98,102,1)
    }
  }
}
</style>