<template>
  <div class="productExhibition">
    <main class="container">
      <Step :stepName = 'message' :imgUrl = 'imgUrl'></Step>
      <section class="flex main_space ">
        <section class=" flex  mt20">
          <section class="flex isRow">
            <span class="searchTitle"  style="margin-left: 0">产品类型</span>
            <el-cascader
            v-model="searchInfo.productType"
            :options="productTypeOption"
            clearable
            class="searchBox"
            @change="changeType"
            :props="{ checkStrictly: true }"
            style="line-height:30px"></el-cascader>
          </section>
          <section class="flex clear">
            <span class="searchTitle">产品</span>
            <el-input v-model="searchInfo.code" class="searchBox" maxlength="50" clearable @keyup.enter.native='searchProduct'  placeholder="产品代码/产品名称"></el-input>
          </section>
          <button class="btn btn_primary ml20" style="width:76px;height:32px" @click="searchProduct" v-if="permission.includes('prm8411')">查询</button>
        </section>
        <section class="flex">
          <button class="btn btn_warning mt20 " style="width:76px;height:32px;"  @click="exportInfo" v-if="permission.includes('prm8412')">
            <img src="../../assets/img/output.png" alt="" style="width:16px;height:16px">
            导出
          </button>
          <!-- <button class="btn btn_primary ml20 mt20" style="width:76px;height:32px;">
            <img src="../../assets/img/addition.png" alt="" style="width:16px;height:16px">
            新增
          </button> -->
        </section>
      </section>
      <section class="mt20">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'#F5F6FA'}"
          @row-click="viewInfo">
          <el-table-column 
            label="序号"
            type="index"
            :index="indexMethod"
            align="center">
          </el-table-column>
          <el-table-column
            prop="code"
            align="center"
            label="产品代码">
          </el-table-column>
          <el-table-column
            prop="prodName"
            align="center"
            label="产品简称">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="产品类型">
            <!-- <template slot-scope="scope">
              <span>{{scope.row.prodType}}-{{scope.row.prodType1}}-{{scope.row.prodType2}}</span>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="setDate"
            align="center"
            label="成立日期">
            <template slot-scope="scope">
              <span>{{scope.row.setDate.split(' ')[0]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="净值日期">
            <template slot-scope="scope">
                <span>{{scope.row.initDate ? scope.row.initDate : '-'}}</span>
                <!-- <span>{{changeTime(scope.row.initDate)}}</span> -->
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="单位净值">
            <template slot-scope="scope">
                <span>{{scope.row.enSz ? scope.row.enSz : '-'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="累计单位净值">
            <template slot-scope="scope">
              <span>{{scope.row.enTotalNav ? scope.row.enTotalNav : '-'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="份额">
            <template slot-scope="scope">
                <span>{{scope.row.lsl ? scope.row.lsl : '-'}}</span>
                <!-- <span>{{changeTime(scope.row.initDate)}}</span> -->
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="资产净值(亿元)">
            <template slot-scope="scope">
              <span>{{scope.row.enZcJZ ? (scope.row.enZcJZ / 100000000).toFixed(2) : '-'}}</span>
            </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="投资经理">
            <template slot-scope="scope">
              <span>{{scope.row.manager ? scope.row.manager : '-'}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="address"
            align="center"
            label="年化收益率">
          </el-table-column> -->
        </el-table>
      </section>
      <div class="main_space mt20 pageJsonBox">
        <section>
          <span class="word">共<span style="color:#5792FC">{{pageJson.total}}</span>条</span>
          <el-select v-model="pageValue" placeholder="10条/页" style="width:101px;height:28px" @change="changePage(pageValue)">
            <el-option value="1" label="10条/页"></el-option>
            <el-option value="2" label="20条/页"></el-option>
            <el-option value="3" label="30条/页"></el-option>
          </el-select>
        </section>
        <section>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageJson.currentPage"
              :page-size="pageJson.pageSize"
              layout="prev, pager, next, jumper"
              :total="pageJson.total">
          </el-pagination>
        </section>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
import Step from '@/components/Step.vue'
import { productData } from '@/api/index';
@Component({
  components: {
    Step,
  },
})
export default class ProductExhibition extends Vue {
  private message: any = ['产品管理', '产品资料', '列表']
  private imgUrl: any = require('../../assets/img/head/product.png')
  private tableData: any = [
    // {id: 1, name: '11', setDate: '2019-20-10 23:09:90'},
  ]
  // 三级
  private prodtype3: any[] = [
    {
      value: 'A',
      label: '股票类',
    },
    {
      value: 'B',
      label: '固定收益类',
    },
    {
      value: 'C',
      label: '货币类',
    },
    {
      value: 'D',
      label: '混合类',
    },
    {
      value: 'E',
      label: '商品及金融衍生品类',
    },
  ]
   // 二级
  private prodtype2: any[] = [
    {
      value: 'B',
      label: '大集合',
      children: this.prodtype3,
    },
    {
      value: 'A',
      label: '小集合',
      children: this.prodtype3,
    },
  ]
  private productTypeOption: any = [
    {
      value: 'A',
      label: '集合',
      children: this.prodtype2,
    },
    {
      value: 'B',
      label: '定向主动',
    },
    {
      value: 'C',
      label: '定向通道',
    },
    {
      value: 'D',
      label: '专项',
    },
  ]
  private searchInfo: any = {
    productType: [],
    code: sessionStorage.getItem('code') || '',
  }
  private pageValue: any = '1'
  private pageJson: any = {
    total: 0,
    pageSize: sessionStorage.getItem('pageSize') || 10,
    currentPage: sessionStorage.getItem('currentPage') || 1,
  }
  // @Watch ('searchInfo.productType') private productType(val: any, oldVal: any) {
  //   sessionStorage.setItem('productType', `${this.searchInfo.productType.toString()}`)
  // }
  @Watch('searchInfo.code') private code(val: any, oldVal: any) {
    sessionStorage.setItem('code', `${this.searchInfo.code}`)
  }
  @Watch('pageJson.pageSize') private pageSize(val: any, old: any) {
    sessionStorage.setItem('pageSize', `${this.pageJson.pageSize}`)
  }
  @Watch('pageJson.currentPage') private currentPage(val: any, old: any) {
    sessionStorage.setItem('currentPage', `${this.pageJson.currentPage}`)
  }
  private get permission() {
    return this.$store.state.permission
  }
  // 获取产品资料列表
  private async getInfolist() {
    const data1 = sessionStorage.getItem('productType') || ''
    const data2 = data1.split(',')
    this.searchInfo.productType = data2
    const current: any = sessionStorage.getItem('currentPage') || 1
    this.pageJson.currentPage = current * 1
    this.pageJson.pageSize = sessionStorage.getItem('pageSize') || 10
    const data = {
      pageNum: sessionStorage.getItem('currentPage') || this.pageJson.currentPage,
      pageSize: sessionStorage.getItem('pageSize') || this.pageJson.pageSize,
      param: sessionStorage.getItem('code') || '',
      productType: data2[0] ? data2[0] : '',
      productType1: data2[1] ? data2[1] : '',
      productType2: data2[2] ? data2[2] : '',
    }
    const res: any = await productData.findProductInfoList(data)
    for (let i = 0, len = res.data.data.records.length; i < len; i++) {
      let name = ''
      if (res.data.data.records[i].prodType === 'A') {
        name = '集合'
        if (res.data.data.records[i].prodType1 === 'B') {
          name += '-大集合'
        } else if (res.data.data.records[i].prodType1 === 'A') {
          name += '-小集合'
        }
        if (res.data.data.records[i].prodType2 === 'A') {
          name += '-股票类'
        } else if (res.data.data.records[i].prodType2 === 'B') {
          name += '-固定收益类'
        } else if (res.data.data.records[i].prodType2 === 'C') {
          name +=  '-货币类'
        } else if (res.data.data.records[i].prodType2 === 'D') {
          name += '-混合类'
        } else if (res.data.data.records[i].prodType2 === 'E') {
          name += '-商品及金融衍生品类'
        }
      } else if (res.data.data.records[i].prodType === 'B') {
        name = '定向主动'
      }  else if (res.data.data.records[i].prodType === 'C') {
        name = '定向通道'
      }  else if (res.data.data.records[i].prodType === 'D') {
        name = '专项'
      }
      res.data.data.records[i].name = name
    }
    // this.tableData = res.data.data.records
    // this.pageJson.total = res.data.data.total
    // for ( let i = 0, len = res.data.data.records.length; i < len; i++) {
      //   let productTypeName: any = ''
      //   for (let j = 0, lenj = this.productTypeOption.length; j < lenj; j++) {
      //     if (res.data.data.records[i].prodType
      //     && res.data.data.records[i].prodType === this.productTypeOption[j].value ) {
      //       if (this.productTypeOption[j].children && this.productTypeOption[j].children.length > 0) {
      //         for (let m = 0, lenm = this.productTypeOption[j].children.length; m < lenm; m++) {
      //           if (res.data.data.records[i].prodType1
      //           && res.data.data.records[i].prodType1 === this.productTypeOption[j].children[m].value) {
      //             if (this.productTypeOption[j].children[m].children
      //               && this.productTypeOption[j].children[m].children.length > 0) {
      //               for (let n = 0, lenn = this.productTypeOption[j].children[m].children.length; n < lenn; n++) {
      //                 if (res.data.data.records[i].prodType2 &&
      // res.data.data.records[i].prodType2 === this.productTypeOption[j].children[m].children[n].value) {
      //                   productTypeName = this.productTypeOption[j].label
      //                   + '/' +
      //                   this.productTypeOption[j].children[m].label
      //                   + '/' +
      //                   this.productTypeOption[j].children[m].children[n].label
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       } else {
      //         productTypeName = this.productTypeOption[j].label
      //       }
      //     }
      //   }
      //   res.data.data.records[i].productTypeName = productTypeName
    // }
    this.tableData = res.data.data.records
    this.pageJson.total = res.data.data.total
  }
  // 查询按钮
  private searchProduct() {
    this.pageJson.currentPage = sessionStorage.getItem('currentPage') || 1
    this.getInfolist()
  }
  // 产品类型改变
  private changeType(val: any) {
    // this.searchInfo.productType = val
    sessionStorage.setItem('productType', `${val.toString()}`)
    // this.pageJson.currentPage = 1
    sessionStorage.setItem('currentPage', `1`)
    this.searchProduct()
  }
  // 查看详情
  private viewInfo(row: any) {
    // this.$router.push({name: 'fundDetail', query: {id: row.id}})
    const {href} = this.$router.resolve({
      path: `fundDetail`,
      query: {id: row.id},
    })
    window.open(href, '_blank')
  }
  // 导出
  private async exportInfo() {
    const data = {
      pageNum: this.pageJson.currentPage,
      pageSize: this.pageJson.pageSize,
      param: this.searchInfo.code,
      productType: this.searchInfo.productType[0] ? this.searchInfo.productType[0] : '',
      productType1: this.searchInfo.productType[1] ? this.searchInfo.productType[1] : '',
      productType2: this.searchInfo.productType[2] ? this.searchInfo.productType[2] : '',
    }
    const res: any = await productData.exportProductInfo(data)
    const res1 = res.data
    const blob = new Blob([res1], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `产品资料.xls`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
  // 改变每页条数
  private changePage(val: any) {
    this.pageJson.currentPage = 1;
    this.pageJson.pageSize = parseInt(val, 10) * 10;
    this.getInfolist()
  }
  // 修改当前页码
  private handleCurrentChange(val: any) {
    this.pageJson.currentPage = val
    this.getInfolist()
  }
  private indexMethod(index: any) {
    return index + 1 + (this.pageJson.currentPage - 1) * this.pageJson.pageSize;
  }
  // 转化时间格式
  // private changeTime(value: any) {
    //   let result: any = ''
    //   if (value) {
    //     for (let i = 0, len = value.length; i < len; i++) {
    //       if ((i + 1) % 2 === 0) {
    //         value.splice(i, 0, '-')
    //       }
    //     }
    //     result = value.substring(0, value.length)
    //   } else {
    //     result = '-'
    //   }
    //   return result
  // }
  private created() {
    this.getInfolist()
  }
  private beforeRouteLeave(to: any, from: any, next: any) {
    if (to.name !== 'fundDetail') {
      sessionStorage.removeItem('productType')
      sessionStorage.removeItem('code')
      sessionStorage.removeItem('pageSize')
      sessionStorage.removeItem('currentPage')
      next()
    } else {
      next()
    }
  }
}
</script>
<style lang="less" >
.productExhibition{
  main{
    .isRow{
      .el-input__icon{
        line-height: 32px;
      }
    }
    .clear{
      .el-input__icon{
        line-height: 26px;
      }
    }
    .searchBox{
      height: 32px;
      width: 224px !important;
    }
    .searchTitle{
      flex-shrink: 0;
      font-size: 14px;
      color:rgba(96,98,102,1);
      line-height:32px;
      margin:0 12px 0 20px
    }
    .pageJsonBox{
      .el-input__icon{
        line-height: 30px;
      }
      .word{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(102,102,102,1);
        line-height:19px;
        margin-right:5px;
      }
    }
  }
}
</style>