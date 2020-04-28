<template>
  <div id="detailAdd">
    <main class="container">
      <Step :stepName = "message" :isView = "isView" :imgUrl = "imgUrl"></Step>
      <section style="margin-top: 10px">
        <section class="flex text">
          <span class="searchTxt">产品信息：</span>
          <div class="conTxt">
            <section class="flex " style="margin-top: 10px">
                <section class="flex text">
                  <span class="searchTxt">
                    <span class="mark">*</span>
                    产品代码</span>
                  <span v-if="isShow" class="inputStyle">{{productInfo.productCode}}</span>
                  <!-- <el-input v-else v-model="productInfo.productCode" placeholder="请输入内容" maxlength="50" class="inputStyle"></el-input> -->
                  <el-select v-else v-model="productInfo.productCode" placeholder="请选择" filterable @change="changeCode"  class="inputStyle isRow">
                    <el-option
                      v-for="item in codeList"
                      :key="item.id"
                      :label="item.code"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </section>
                <section class="flex text">
                  <span class="searchTxt">
                    <span class="mark">*</span>
                    产品名称</span>
                  <span v-if="isShow" class="inputStyle">{{productInfo.productName}}</span>
                  <!-- <el-input v-else v-model="productInfo.productName" placeholder="请输入内容" maxlength="50" class="inputStyle"></el-input> -->
                  <el-select v-else v-model="productInfo.productName" placeholder="请选择" filterable  @change="changeCode"  class="inputStyle isRow">
                    <el-option
                      v-for="item in codeList"
                      :key="item.id"
                      :label="item.productName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </section>
            </section>
            <section class="flex  text">
              <span class="searchTxt">
                产品系列</span>
              <span v-if="isShow" class="inputStyle">{{productInfo.productSeries}}</span>
              <el-input v-else v-model="productInfo.productSeries" placeholder="根据产品代码自动匹配" maxlength="50" disabled class="inputStyle"></el-input>
              <div style="margin-left: 5px;">
                  <el-tooltip class="item" effect="dark" content="取自 [ 产品基本属性表 ]" placement="top-start">
                    <i class="el-icon-question" style="color: #999;"></i>
                  </el-tooltip>
                <!-- <i class="el-icon-question" style="color: red"></i> -->
              </div>
              <!-- <el-select v-else v-model="productInfo.productSeries" placeholder="请选择" filterable @change="changeCode" disabled class="inputStyle isRow">
                <el-option
                  v-for="item in codeList"
                  :key="item.id"
                  :label="item.series"
                  :value="item.id">
                </el-option>
              </el-select> -->
            </section>
          </div>
        </section>
          <section class="flex text" style="line-height: 32px;margin:20px 0 10px;z-index:10">
                        <span class="searchTxt" >
                          <span class="mark">*</span>
                          销售时间</span>
                          <div v-if="isShow">
                            <span  class="inputStyle">{{productInfo.startDate}}</span>
                            <span  style="margin: 0 5px">至</span>
                            <span  class="inputStyle">{{productInfo.startDate}}</span>
                          </div>
                          <div v-else>
                              <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="productInfo.startDate"
                                type="date"
                                placeholder="开始日期"
                                class="inputStyle date">
                              </el-date-picker>
                              <span  style="margin: 0 5px">至</span>
                              <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="productInfo.endDate"
                                type="date"
                                placeholder="结束日期"
                                class="inputStyle date">
                              </el-date-picker>
                          </div>
                      </section>
        <section class="flex text">
          <span class="searchTxt">
            <span class="mark">*</span>
            标签</span>
          <span v-if="isShow" class="inputStyle">{{productInfo.label === 'FIRST_SUBSCRIBE'? '首发认购' :productInfo.label === 'NO_TASK'?'无销售任务':'有销售任务'}}</span>
          <el-select v-else v-model="productInfo.label" placeholder="请选择" class="inputStyle isRow">
            <el-option  value="FIRST_SUBSCRIBE" label="首发认购"></el-option>
            <el-option  value="HAVE_TASK" label="有销售任务"></el-option>
            <el-option  value="NO_TASK" label="无销售任务"></el-option>
          </el-select>
        </section>
        <section class="btnBox" v-if="$route.query.type === 'edit' || !$route.query.id">
          <button class="btn btn_primary" @click="addSaledetail">保存</button>
          <button class="btn btn_info_plain_disabled" @click="$router.push({name: 'saledetail'})">取消</button>
        </section>
        <div class="detailAdd_line" ></div>
        <section class="flex text ">
          <span class="searchTxt">销售记录：</span>
          <div class="conTxt" style=" position: relative">
            <el-table
              :data="tableData"
              :header-cell-style="{background:'#F5F6FA'}"
              :span-method="tableCellMethod"
              :cell-class-name="addClass"
              @row-click="viewInfo"
              border 
              style="width: 100%">
              <el-table-column
                prop="index"
                label="序号"
                width="55"
                align="center">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="销售人员"
                align="center">
              </el-table-column>
              <el-table-column
                prop="branch"
                label="分行"
                align="center">
              </el-table-column>
              <el-table-column
                prop="originalSize"
                label="原规模（万元）"
                align="center">
              </el-table-column>
              <el-table-column
                prop="target"
                label="指标（万元）"
                align="center">
              </el-table-column>
              <el-table-column
                label="指标占比"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.indicatorsOf? scope.row.indicatorsOf + '%' : ''}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="redemptions"
                label="赎回量（万元）"
                align="center">
              </el-table-column>
              <el-table-column
                prop="subscriptions"
                label="申购量（万元）"
                align="center">
              </el-table-column>
              <el-table-column
                prop="nowSize"
                label="现规模（万元）"
                align="center">
              </el-table-column>
              <el-table-column
                label="完成率"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.percentageComplete || scope.row.percentageComplete === 0 ? scope.row.percentageComplete + '%' : ''}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="120">
                <template slot-scope="scope" v-if="scope.row.id ">
                      <div class="main-around">
                        <span style="cursor: pointer;color:#5792FC;" @click.stop="viewInfo(scope.row, 'edit')">
                        <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                      编辑</span>
                      <span style="cursor: pointer;color:#5792FC;" @click.stop="delInfo(scope.row.id)">
                        <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                      删除</span>
                      </div>
                  </template>
              </el-table-column>
            </el-table>
            <img src="../../assets/img/add.png" alt="" v-if="!$router.query && addId && permission.includes('prm8111') || $route.query.id && permission.includes('prm8111')" @click="addSaleinfo" style="width: 32px;height: 32px;position: absolute;top:15px;right:-40px;cursor: pointer">
          </div>
        </section>
      </section>
      <Salerecord 
        class="modal"
        v-if="isAdd"
        :saleInfo = "saleRecord"
        :productInfo = "productInfo"
        :isRadio = "isRadio"
        :addId = "addId"
        :targetTotal = 'targetTotal'
        :isSonshow = "isSonshow"
        @hide="hidemodel"></Salerecord>
    </main>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch  } from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import Salerecord from '@/components/product/Salerecord.vue'
import { product, user } from '../../api'
@Component({
  components: {
    Step,
    Salerecord,
  },
})
export default class DetailAdd extends Vue {
  private message: any = ['产品管理', '销售管理', '销售明细', '新增']
  private imgUrl: any = require('../../assets/img/head/product.png')
  private isView: boolean = true
  private tableData: any[] = []
  private isAdd: boolean = false
  private isShow: boolean = false
  private productInfo: any = {
    productId: '',
    productCode: '',
    productName: '',
    productSeries: '',
    label: '',
    startDate: '',
    endDate: '',
  }
  private addId: any = ''
  private saleRecord: any = {}
  private infoList: any[] = []
  private isRadio: any = 0
  private isSonshow: boolean = true
  private targetTotal: number = 1
  private codeList: any[] = []
  private spanArr: any[] = []
  private position: number = 0
  public get permission() {
    return this.$store.state.permission
  }
  // 新增/保存
  private async addSaledetail() {
    if (!this.productInfo.productCode || !this.productInfo.productName ||  !this.productInfo.label) {
      this.$message.warning(`请将必填项填写完整`)
      return false
    }
    if (!this.productInfo.startDate || !this.productInfo.endDate) {
      this.$message.warning(`请将必填项填写完整`)
      return false
    }
    if (new Date(this.productInfo.endDate).getTime() < new Date(this.productInfo.startDate).getTime()) {
      this.$message.warning(`开始时间大于结束时间,请重新选择`)
      return false
    }
    const data = {
      ...this.productInfo,
      subList: this.tableData,
    }
    if (!this.addId) {
      const res: any = await product.addSaledetailInfo(data)
      // this.addId = res.data
      if (res.data.success) {
        this.$message.success(`新增成功`)
        this.$router.push({name: 'saledetail'})
      } else {
        this.$message.error(`${res.data.msg}`)
      }
      this.addId = res.data.data
    } else {
      const res: any = await product.updateSaledetailInfo(data)
      if (res.data.success) {
        this.$message.success('更新成功')
        this.$router.push({name: 'saledetail'})
      } else {
        this.$message.error(`${res.data.msg}`)
      }
    }
  }
  // 根据id查询
  private async getSalebyId(id: any) {
    let saleInfo: any[] = []
    const res: any = await product.getSaledetailByid(`id=${id}`)
    this.productInfo = res.data.data.detail
    saleInfo = res.data.data.infoList
    this.infoList = res.data.data.infoList
    this.tableData = []
    let m: number = 1
    if (saleInfo !== undefined) {
      for (let i = 0, len = saleInfo.length; i < len; i++) {
          if (saleInfo[i].salesDetailInfos && saleInfo[i].salesDetailInfos.length >= 0) {
            for (let j = 0, len1 = saleInfo[i].salesDetailInfos.length; j < len1; j++) {
              if (saleInfo[i].userName !== '小计' && saleInfo[i].userName !== '合计' && saleInfo[i].userName !== '总行') {
                let obj: any = {}
                obj = {
                  index: m   ,
                  userName: saleInfo[i].userName,
                  id: saleInfo[i].salesDetailInfos[j].id,
                  branch: saleInfo[i].salesDetailInfos[j].branch,
                  originalSize: saleInfo[i].salesDetailInfos[j].originalSize,
                  target: saleInfo[i].salesDetailInfos[j].target,
                  indicatorsOf: saleInfo[i].salesDetailInfos[j].indicatorsOf,
                  redemptions: saleInfo[i].salesDetailInfos[j].redemptions,
                  subscriptions: saleInfo[i].salesDetailInfos[j].subscriptions,
                  nowSize: saleInfo[i].salesDetailInfos[j].nowSize,
                  userId: saleInfo[i].salesDetailInfos[j].userId,
                  percentageComplete: saleInfo[i].salesDetailInfos[j].percentageComplete,
                }
                // if (saleInfo[i].userName !== saleInfo[i + 1].userName) {
                //   m = m + 1
                // }
                this.tableData.push(obj)
              } else {
                let obj: any = {}
                obj = {
                  userName: saleInfo[i].userName,
                  id: saleInfo[i].salesDetailInfos[j].id,
                  branch: saleInfo[i].salesDetailInfos[j].branch,
                  originalSize: saleInfo[i].salesDetailInfos[j].originalSize,
                  target: saleInfo[i].salesDetailInfos[j].target,
                  indicatorsOf: saleInfo[i].salesDetailInfos[j].indicatorsOf,
                  redemptions: saleInfo[i].salesDetailInfos[j].redemptions,
                  subscriptions: saleInfo[i].salesDetailInfos[j].subscriptions,
                  nowSize: saleInfo[i].salesDetailInfos[j].nowSize,
                  userId: saleInfo[i].salesDetailInfos[j].userId,
                  percentageComplete: saleInfo[i].salesDetailInfos[j].percentageComplete,
                }
                this.tableData.push(obj)
              }
            }
          } else {
            let obj: any = {}
            obj = {
              userName: saleInfo[i].userName,
            }
            this.tableData.push(obj)
          }
          if (i + 1 <= saleInfo.length - 1 ) {
            if (saleInfo[i].userName !== saleInfo[i + 1 ].userName &&
            saleInfo[i].userName !== '合计' && saleInfo[i].userName !== '小计' && saleInfo[i].userName !== '总行') {
              m = m + 1
            }
          }
      }
    }
    if (this.tableData.length > 0) {
      this.targetTotal = this.tableData[this.tableData.length - 1].target
    } else {
      this.targetTotal = 1
    }
    this.rowspan()
  }
  // 查看销售记录
  private viewInfo(row: any, type: any) {
    if (this.tableData.length > 0) {
      this.targetTotal = this.tableData[this.tableData.length - 1].target
    } else {
      this.targetTotal = 1
    }
    this.targetTotal = this.targetTotal - row.target === 0 ? 1 : this.targetTotal - row.target
    if (row.userName === '总行') {
      this.isRadio = 2
      this.isAdd = true
    } else if (row.userName === '小计' || row.userName === '合计') {
      this.isAdd = false
    } else {
      this.isRadio = 1
      this.isAdd = true
    }
    if (type === 'edit') {
      this.isSonshow = true
    } else {
      this.isSonshow = false
    }
    this.saleRecord = row
    // this.isAdd = true
  }
  // 删除销售记录
  private async delInfo1(id: any) {
    const res: any = await product.delSaleson(`id=${id}`)
    if (res.data.success) {
      this.$message.success(`删除成功`)
    } else {
      this.$message.error(`${res.data.msg}`)
    }
    this.getSalebyId(this.addId)
  }
  private delInfo(id: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.delInfo1(id)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
  }
  // 添加销售记录
  private addSaleinfo() {
    if (this.infoList === undefined || this.infoList.length === 0) {
      this.isAdd = true
      this.isRadio = 0
    } else {
      const arr: any[] = []
      for (let i = 0, len = this.infoList.length; i < len; i++) {
        arr.push(this.infoList[i].salesDetailInfos.length)
      }
      const isExit: number = arr.indexOf(0)
      if (isExit === -1) {
        this.isAdd = true
        this.isRadio = 1
      } else {
        this.isAdd = true
        this.isRadio = 0
      }
    }
    // }
    // this.isAdd = true
    // this.isRadio = 0
    this.saleRecord = {}
    this.isSonshow = true
  }
  // 隐藏弹框
  private hidemodel() {
    this.isAdd = false
    this.getSalebyId(this.addId)
  }
  // 查看产品代码
  private async getProductcode() {
    const res: any = await product.findAllproduct()
    this.codeList = res.data.data
  }
  // 产品代码变化时
  private async changeCode(val: any) {
    const productName = this.codeList.filter((item: any) => {
      if (item.id  === val) {
        return item
      }
    })
    this.productInfo.productId = productName[0].id
    this.productInfo.productCode = productName[0].code
    this.productInfo.productName = productName[0].productName
    this.productInfo.productSeries = productName[0].series
  }
  private tableCellMethod(row: any) {  // 表格合并行
    if (this.tableData.length > 1) {
      if ( row.rowIndex === this.tableData.length - 1 || row.row.userName === '小计') {
        if ( row.columnIndex === 0) {
          return [ 0, 0]
        } else if (row.columnIndex === 1) {
          return [1, 3]
        } else if (row.columnIndex === 2) {
          return [0, 0]
        }
      }
      if (row.columnIndex === 0 || row.columnIndex === 1) {
        const row1 = this.spanArr[row.rowIndex];
        const col1 = row1 > 0 ? 1 : 0;
        return {
          rowspan: row1,
          colspan: col1,
        }
      }
    }
    // if(row.columnIndex === 1){
    //   const _row = this.spanArr[row.rowIndex];
    //   const _col = _row>0 ? 1 : 0;
    //   return {
    //     rowspan: _row,
    //     colspan: _col
    //   }
    // }
  }
   // 行合并
  private rowspan() {
    this.spanArr = []
    this.position = 0
    this.tableData.forEach((item, index) => {
      if ( index === 0) {
        this.spanArr.push(1);
        this.position = 0;
      } else {
        if (this.tableData[index].userName ===  this.tableData[index - 1].userName
        && this.tableData[index].departmentName !== '') {
          this.spanArr[this.position] += 1;
          this.spanArr.push(0);
        } else {
          this.spanArr.push(1);
          this.position = index;
        }
      }
    })
    this.position = 0
  }
  private addClass(row: any) {
    if (row.row.userName === '小计') {
       if ( row.columnIndex === 1) {
         return 'tableCellHight'
       } else {
        return 'tableCell'
       }
    }
    if (row.row.userName === '合计') {
      if ( row.columnIndex === 1) {
        return `tableTotalHight`
      } else {
        return 'tableTotal'
      }
    }
  }
  private mounted() {
    this.addId = this.$route.query.id
    switch (this.$route.query.type) {
      case 'edit':
        this.message = ['产品管理', '销售管理', '销售明细', '编辑']
        this.getSalebyId(this.$route.query.id)
        break;
      case 'detail':
        this.message = ['产品管理', '销售管理', '销售明细', '详情']
        this.getSalebyId(this.$route.query.id)
        this.isShow = true
        break;
      default:
        this.message = ['产品管理', '销售管理', '销售明细', '新增']
    }
    this.getProductcode()
  }
  private beforeRouteLeave(to: any, from: any, next: any) {
    if ( to.name === 'saledetail') {
      next()
    } else {
      sessionStorage.removeItem('starttime')
      sessionStorage.removeItem('endtime')
      next()
    }
  }
}
</script>
<style lang="less" >
#detailAdd{
  .container{
    .date .el-input__icon{
      line-height: 32px;
    }
    .isRow .el-input__icon{
      height: 50px;
      line-height: 50px;
    }
  zoom: 1;
  .mt20{
    margin-top: 20px;
  }
  .inputStyle{
    width: 224px !important;
    font-size: 14px;
  }
  .text{
    line-height: 50px;
    font-size: 16px;
    .searchTxt{
      width: 100px;
      text-align: right;
      margin-right: 20px;
      font-size:16px;
      color:rgba(49,50,51,1);
    }
  }
  .conTxt{
    width:80%;
    height:auto;
    background:rgba(245,247,250,1);
    border-radius:4px;
    margin-top: 25px
  }
  .btnBox{
    width:436px;
    margin:auto;
    display:flex;
    justify-content:space-around;
    margin-top: 40px
  }
  .detailAdd_line{
    width: 100%;
    height:1px;
    background:rgba(228,231,237,1);
    margin-top: 30px;
  }
  .el-table tr{
    background: none;
    .tableCell{
      background: #FFFAEB !important
    }
    .tableCellHight{
      background: #FFD159;
      color: #fff;
    }
    .tableTotal{
      background: #F8FAFE;
    }
    .tableTotalHight{
      background: #5792FC;
      color: #ffff;
    }
  }
  
}
}


</style>