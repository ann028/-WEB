<template>
  <main class="container">
    <Step :stepName = 'message' :isView = 'iview' :imgUrl = "imgUrl"></Step>
    <section class="mt20">
      <section class="flex">
        <section class="flex textBox">
          <span class="text_title">费用发生人：</span>
          <span class="text_cont" v-if="$route.query.id" style="margin-right: 100px"> {{reimbursementInfo.userName}}</span>
          <span class="text_cont" v-else style="margin-right: 160px"> {{userInfo.user.name}}</span>
        </section>
        <section class="flex textBox">
          <span class="text_title">部门：</span>
          <span class="text_cont" v-if="$route.query.id">{{reimbursementInfo.departmentName}}</span>
          <span class="text_cont" v-else>{{userInfo.user.departmentName}}</span>
        </section>
      </section>
      <section class="flex textBox">
        <span class="text_title">
          <span class="mark">*</span>
          类型：</span>
        <el-radio-group v-if="!$route.query.id" v-model="radio" class="text_cont" style="margin-top:6px;height:44px">
          <el-radio :label="1">报销</el-radio>
          <el-radio :label="2">预算</el-radio>
        </el-radio-group>
        <el-radio-group v-if="$route.query.id && radio === 1" v-model="radio" class="text_cont" style="margin-top:6px;height:44px">
          <el-radio :label="1">报销</el-radio>
        </el-radio-group>
        <el-radio-group v-if="$route.query.id && radio === 2" v-model="radio" class="text_cont" style="margin-top:6px;height:44px">
          <el-radio :label="2">预算</el-radio>
        </el-radio-group>
      </section>
      <section v-if="radio === 1">
        <section class="flex textBox">
          <span class="text_title">内容：</span>
          <div class="content">
              <section class="content1 mt20">
                  <section class="flex textBox date" >
                    <span class="text_title">
                      <span class="mark">*</span>
                      日期</span>
                    <span v-if="isShow" class="text_cont1">{{reimbursementInfo.expenseDate.split(' ')[0]}}</span>
                    <el-date-picker
                      v-else
                      v-model="reimbursementInfo.expenseDate"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期"
                      style="width: 224px;line-height:40px;margin-top:6px">
                    </el-date-picker>
                    <span  style="font-size:14px;color:rgba(144,147,153,1);margin-left: 20px">备注：与财务系统提交日期一致</span>
                  </section>
                  <section class="flex textBox">
                      <span  class="text_title">
                        <span class="mark">*</span>
                        报销单号</span>
                        <span v-if="isShow" class="text_cont1">{{reimbursementInfo.orderId}}</span>
                      <el-input v-else v-model="reimbursementInfo.orderId" placeholder="与财务系统一致的单据号" style="width: 224px"></el-input>
                  </section>
              </section>
              <section class="content2 mt20" v-for="(item,index) in reimbursement" :key="index">
                <section class="flex">
                  <section class="flex textBox isRow">
                    <span class="text_title">
                      <span class="mark">*</span>
                      费用类别</span>
                      <span  v-if="isShow" class="text_cont1">{{reimbursementInfo.typeNames}}</span>
                    <el-cascader
                      v-else
                      v-model="item.types"
                      :options="typeList"
                      style="width: 224px; line-height: 30px; margin: 10px 0"></el-cascader>
                  </section>
                  <section class="flex textBox">
                      <span class="text_title">
                        <span class="mark">*</span>
                        金额</span>
                      <span v-if="isShow" class="text_cont1">{{item.amount}}</span>
                      <el-input v-else v-model="item.amount" placeholder="请输入内容"  @input="changeInput(item.amount, index)"  style="width: 224px"></el-input>
                  </section>
                  <section class="flex cross_center" style="margin-left: 16px">
                    <img src="../../assets/img/add.png" alt="" v-if="!$route.query.way " @click="addContent"  style="width: 24px; height: 24px;cursor:pointer">
                    <img src="../../assets/img/databank/delButton.png" v-if="!$route.query.way && index != 0" @click="delContent(index)" alt="" style="cursor: pointer">
                  </section>
                </section>
                <section class="flex textBox">
                    <span class="text_title">具体说明</span>
                    <section class="mt20" style="flex-grow: 1;min-height: 120px">
                      <textarea v-if="isShow" readonly v-model="item.reason" style="width: 90%; height:100%; border:1px solid rgba(228,231,237,1);"></textarea>
                      <textarea v-else v-model="item.reason" style="width: 90%; height:100%; border:1px solid rgba(228,231,237,1);"></textarea>
                    </section>
                </section>
              </section>
              <section v-if="!$route.query.id" class="content3 mt20">
                <section class="flex textBox" style="padding-top: 10px;box-sizing:border-box">
                  <span class="text_title">合计</span>
                  <span v-if="isShow" class="text_cont1">{{reimbursementInfo.sumAmount}}</span>
                  <!-- <el-input v-model="reimbursementInfo.amount" v-else-if="$route.query.id" placeholder="请输入内容" style="width: 224px"></el-input> -->
                  <el-input v-else v-model="reimbursementInfo.sumAmount" disabled  placeholder="请输入内容"  style="width: 224px"></el-input>
                </section>
              </section>
          </div>
        </section>
      </section>
      <section v-if="radio === 2">
        <section class="flex textBox">
          <span class="text_title">内容：</span>
          <div class="content">
            <section class="content1 mt20" style="height: 72px">
              <section class="flex textBox date" >
                <span class="text_title">
                  <span class="mark">*</span>
                  月份</span>
                  <span v-if="isShow" class="text_cont1">{{reimbursementInfo.rmonth}}</span>
                <el-date-picker
                  v-else
                  v-model="reimbursementInfo.rmonth"
                  value-format="yyyy-MM"
                  type="month"
                  placeholder="选择月"
                  style="width: 224px;line-height:40px;margin-top:6px">
                </el-date-picker>
              </section>
            </section>
            <section class="content2 mt20" v-for="(item,index) in reimbursement" :key="index">
              <section class="flex">
                <section class="flex textBox isRow">
                  <span class="text_title">
                    <span class="mark">*</span>
                    费用类别</span>
                    <span v-if="isShow" class="text_cont1">{{item.typeNames}}</span>
                   <el-cascader
                    v-else
                    v-model="item.types"
                    :options="typeList"
                    style="width: 224px;line-height: 30px;margin: 10px 0"></el-cascader>
                </section>
                <section class="flex textBox">
                    <span class="text_title">
                      <span class="mark">*</span>
                      金额</span>
                    <span v-if="isShow" class="text_cont1" >{{item.amount}}</span>
                    <!-- <el-input-number v-else v-model="item.amount"  :min="1" :max="1000000" style="width: 224px;line-height: 30px;margin: 10px 0"></el-input-number> -->
                    <el-input v-else v-model="item.amount"  clearable  placeholder="请输入内容"  @input="changeInput(item.amount, index)" style="width: 224px;"></el-input>
                </section>
                <section class="flex cross_center" style="margin-left: 16px">
                  <img src="../../assets/img/add.png" alt="" @click="addContent" v-if="$route.query.type && $route.query.id || !$route.query.type && !$route.query.id"   style="width: 24px; height: 24px;cursor:pointer">
                  <img src="../../assets/img/databank/delButton.png" @click="delContent(index)" v-if="$route.query.type && $route.query.id && index !== 0 || !$route.query.type && !$route.query.id && index !== 0"   alt="" style="cursor: pointer">
                </section>
              </section>
              <section class="flex textBox">
                  <span class="text_title">具体说明</span>
                  <section class="mt20" style="flex-grow: 1;min-height: 120px">
                    <textarea v-if="isShow" readonly v-model="item.reason" style="width: 90%; height:100%; border:1px solid rgba(228,231,237,1);"></textarea>
                    <textarea v-else v-model="item.reason" style="width: 90%; height:100%; border:1px solid rgba(228,231,237,1);"></textarea>
                  </section>
              </section>
            </section>
            <section  class="content3 mt20">
              <section class="flex textBox" style="padding-top: 10px;box-sizing:border-box">
                <span class="text_title">合计</span>
                 <span v-if="isShow" class="text_cont1" >{{reimbursementInfo.sumAmount}}</span>
                <el-input v-else v-model="reimbursementInfo.sumAmount" disabled  placeholder="请输入内容" style="width: 224px"></el-input>
              </section>
            </section>
          </div>
         </section>
      </section>
      <section class="btnBox" v-if="!isShow">
        <button class="btn btn_primary" @click="submitInfo"  >保存</button>
        <button class="btn btn_info_plain_disabled" @click="cancleInfo">取消</button>
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import {Prop, Component, Vue, Watch} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import { finance, user } from '@/api/index'
@Component({
  components: {
    Step,
  },
})
export default class FinanceAdd extends  Vue {
  private message = ['财务管理', '财务报销', '预算报销表', '新增']
  private imgUrl = require('../../assets/img/head/finance.png')
  private iview: boolean = true
  private radio = 1
  private reimbursementInfo = {
    expenseDate: '',
    orderId: '',
    sumAmount: 1,
    rmonth: '',
    userName: '',
    departmentName: '',
  }
  private reimbursement = [
    {
      types: [],
      amount: 1,
      reason: '',
      parentDepartmentId: '',
      type: '',
    },
  ]
  private amountChange: any = ''
  private amountChangeindex: any = ''
  // 费用leibie
  private typeList: any[] = [
    // {
    //   value: '报销',
    //   label: '报销',
    //   children: [
    //     {
    //       label: '日常营销费',
    //       value: '日常营销费',
    //     },
    //     {
    //       label: '产品销售费',
    //       value: '产品销售费',
    //       children: [
    //         {
    //           label: '首发及持续营销',
    //           value: '首发及持续营销',
    //         },
    //         {
    //           label: '售后服务费用',
    //           value: '售后服务费用',
    //         },
    //       ],
    //     },
    //     {
    //       label: '会议培训费',
    //       value: '会议培训费',
    //     },
    //     {
    //       label: '差旅费',
    //       value: '差旅费',
    //     },
    //     {
    //       label: '其他营销费',
    //       value: '其他营销费',
    //     },
    //   ],
    // },
    // {
    //   label: '对外支付',
    //   value: '对外支付',
    //   children: [
    //     {
    //       label: '培训费',
    //       value: '培训费',
    //     },
    //     {
    //       label: '客户维护费',
    //       value: '客户维护费',
    //     },
    //     {
    //       label: '行政服务费',
    //       value: '行政服务费',
    //     },
    //   ],
    // },
  ]
  private isShow: boolean = false
  private total: number = 0
  private get userInfo() {
    return this.$store.state.userInfo
  }
  @Watch('radio') private radioMethods(val: any, oldVal: any) {
    this.reimbursementInfo = {
      rmonth: '',
      expenseDate: '',
      orderId: '',
      sumAmount: 1,
      userName: '',
      departmentName: '',
    }
    this.reimbursement = [
      {
        types: [],
        amount: 1,
        reason: '',
        parentDepartmentId: '',
        type: '',
      },
    ]
    this.getCosttype()
  }
  // 根据id查看
  private async getInfoByid(id: any) {
    if (this.radio === 1) {
      this.getCosttype()
      const res: any = await finance.getReimByid(`id=${id}`)
      this.reimbursementInfo = res.data.data
      this.reimbursement[0].types = res.data.data.typeIds
      this.reimbursement[0].amount = res.data.data.amount
      this.reimbursement[0].reason = res.data.data.reason
      this.reimbursement[0].parentDepartmentId = res.data.data.parentDepartmentId
    } else if (this.radio === 2) {
      this.getCosttype()
      const res: any = await finance.getBudByid(`id=${id}`)
      this.reimbursementInfo = res.data.data
      this.reimbursement = res.data.data.budgetInfoVos
    }
  }
  // 提交
  private async submitInfo() {
    for ( let i = 0, len = this.reimbursement.length; i < len; i++) {
      if (this.reimbursement[i].types.length === 0) {
        this.$message.warning(`请将必填项填写完整！`)
        return false
      }
      if (!this.reimbursement[i].amount) {
        this.$message.warning(`请将必填项填写完整！`)
        return false
      } else {
        const reg = /^\d+(\.\d{0,2})?$/
        const data: any = this.reimbursement[i].amount
        if (!reg.test(data)) {
          this.$message.warning(`金额请输入整数或小数点后两位小数`)
          return false
        }
      }
      if (this.reimbursement[i].types.length) {
        this.reimbursement[i].type = this.reimbursement[i].types[this.reimbursement[i].types.length - 1]
      }
    }
    if ( this.radio === 1) {
      if (!this.reimbursementInfo.expenseDate) {
        this.$message.warning(`请将必填项填写完整！`)
        return false
      }
      if (!this.reimbursementInfo. orderId) {
        this.$message.warning(`请将必填项填写完整！`)
        return false
      }
      if (!this.$route.query.id) {
        if (this.reimbursementInfo.sumAmount) {
          this.total = 0
          for (let i = 0, len = this.reimbursement.length; i < len; i++) {
            this.total += this.reimbursement[i].amount * 1
          }
          if ( this.reimbursementInfo.sumAmount  !== this.total) {
              this.$message.warning(`合计与分项和存在误差`)
              return false
          }
        }
        const data = {
          ...this.reimbursementInfo,
          reimbursementChildAddVos: this.reimbursement,
        }
        const res: any = await finance.addReim(data)
        if (res.data.success) {
          this.$message.success(`新增报销单成功！`)
        } else {
          this.$message.error(`${res.data.msg}`)
        }
        this.$router.push({name: 'finance'})
      } else {
        if (this.reimbursementInfo.sumAmount) {
          this.total = 0
          if ( this.reimbursementInfo.sumAmount * 1 !== this.reimbursement[0].amount * 1) {
              this.$message.warning(`合计与分项和存在误差`)
              return false
          }
        }
        const data = {
          amount: this.reimbursement[0].amount,
          expenseDate: this.reimbursementInfo.expenseDate,
          id: this.$route.query.id,
          orderId: this.reimbursementInfo.orderId,
          parentDepartmentId: this.reimbursement[0].parentDepartmentId,
          reason: this.reimbursement[0].reason,
          type: this.reimbursement[0].type,
        }
        const res: any = await finance.updateReim(data)
        if ( res.data.success) {
          this.$message.success(`修改报销单成功！`)
        } else {
          this.$message.error(`${res.data.msg}`)
        }
        this.$router.push({name: 'finance'})
      }
    } else if (this.radio === 2) {
      this.reimbursementInfo.sumAmount = this.reimbursementInfo.sumAmount
      if (!this.reimbursementInfo.rmonth) {
        this.$message.warning(`请将必填项填写完整！`)
        return false
      }
      if (this.reimbursementInfo.sumAmount) {
        this.total = 0
        for (let i = 0, len = this.reimbursement.length; i < len; i++) {
          this.total += this.reimbursement[i].amount * 1
        }
        if ( this.reimbursementInfo.sumAmount  !== this.total) {
            this.$message.warning(`合计与分项和存在误差`)
            return false
        }
      }
      if (!this.$route.query.id) {
        const data = {
          ...this.reimbursementInfo,
          budgetAddChildVos: this.reimbursement,
        }
        const res: any = await finance.addBud(data)
        if (res.data.success) {
          this.$message.success(`新增预算单成功！`)
        } else {
          this.$message.error(`${res.data.msg}`)
        }
        this.$router.push({name: 'finance'})
      } else {
        const data = {
          ...this.reimbursementInfo,
          budgetInfoVos: this.reimbursement,
        }
        const res: any = await finance.updateBud(data)
        if (res.data.success) {
          this.$message.success(`预算单修改成功!`)
        } else {
          this.$message.error(`${res.data.msg}`)
        }
        this.$router.push({name: 'finance'})
      }
    }
  }
  // 取消返回上一级
  private cancleInfo() {
    this.$router.push({name: 'finance'})
  }
  // 查询费用类别
  private async getCosttype() {
    // this.typeList = []
    let nodeList = []
    if (this.radio === 1) {
      const type: string = 'REIMBURSEMENT'
      const res: any = await user.getCosttype(`type=${type}`)
      nodeList = res.data.data
    } else if (this.radio === 2) {
      const type: string = 'BUDGET'
      const res: any = await user.getCosttype(`type=${type}`)
      nodeList = res.data.data
    }
    // const setChildren = (nodeList1: any) => {
      //     nodeList = nodeList1.map((node: any) => {
      //       let nodeChildren: any[] = []
      //       if (node.child) {
      //         nodeChildren = setChildren(node.child)
      //       }
      //       return {
      //         label: node.name,
      //         value: node.id,
      //         children: nodeChildren,
      //       }
      //     });
      //     return nodeList
      // }
    // this.typeList = setChildren(nodeList)
    const brr = this.getList(nodeList)
    this.typeList = brr
  }
  // 回调函数
  private getList(list: any) {
    const arr: any[] = []
    for ( let i = 0, len = list.length; i < len; i++) {
      if (list[i].child.length) {
        arr.push({
          label: list[i].name,
          value: list[i].id,
          children: this.getList(list[i].child),
        })
      } else {
        arr.push({
          label: list[i].name,
          value: list[i].id,
        })
      }
    }
    return arr
  }
  // 增加内容区
  private addContent() {
    this.reimbursement.push({
      types: [],
      amount: 1,
      reason: '',
      parentDepartmentId: '',
      type: '',
    })
    let total: number = 0
    for (let i = 0, len = this.reimbursement.length; i < len; i++) {
      total += this.reimbursement[i].amount * 1
    }
    this.reimbursementInfo.sumAmount = total
  }
  // 删除内容区
  private delContent(index: any) {
    let total: any = this.reimbursementInfo.sumAmount
    for (let i = 0, len = this.reimbursement.length; i < len; i++) {
      if (i === index) {
        total -= this.reimbursement[i].amount * 1
      }
    }
    this.reimbursementInfo.sumAmount = total
    this.reimbursement.splice(index, 1)
  }
  // 监听金额
  private changeInput(value: any, index: any) {
    let total: number = 0
    for (let i = 0, len = this.reimbursement.length; i < len; i++) {
      total += this.reimbursement[i].amount * 1
    }
    this.reimbursementInfo.sumAmount = total
  }
  private mounted() {
    this.getCosttype()
    const id = this.$route.query.id
    const isShow = this.$route.query.type
    const radio = this.$route.query.way
    if (id && !isShow) {
      this.isShow = true
      this.message = ['财务管理', '财务报销', '预算报销表', '详情']
    } else if (id && isShow) {
      this.message = ['财务管理', '财务报销', '预算报销表', '编辑']
    }
    if (radio === '1') {
      this.radio = 1
    } else if (radio === '2') {
      this.radio = 2
    }
    if (id) {
      this.getInfoByid(id)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .date .el-input__icon{
line-height: 40px;
}
/deep/ .isRow .el-input__icon{
line-height: 32px;
}
.el-input-number__increase{
  height: 30px;
  line-height: 32px;
  margin: 8px 0;
}
main{
  .el-radio-group{
    line-height: 50px;
  }
  .mt20{
    margin-top: 20px;
  }
  .inputStyle{
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
    .text_cont{
      // width:594px;
      height:50px;
      border-radius:4px;
    }
    .text_cont1{
      width: 224px;
      display: inline-block;
      color:rgba(96,98,102,1);
      font-size: 14px;
    }
    .content{
      flex-grow: 1;
      min-height: 300px;
      // background: rgba(245,247,250,1)
      .content1{
        width: 90%;
        height: 124px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        padding-top: 10px;
        box-sizing: border-box
      }
      .content2{
        width: 90%;
        height:230px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        padding-top: 10px;
        box-sizing: border-box
      }
      .content3{
        width: 90%;
        height:75px;
        background:rgba(245,247,250,1);
        border-radius:4px;
      }
    }
  }
  .btnBox{
    width:436px;
    margin:auto;
    display:flex;
    justify-content:space-around;
    margin-top: 40px
  }
}
</style>