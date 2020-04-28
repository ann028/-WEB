<template>
    <main class="container" >
        <Step :stepName = "message" :isView = "isView"  :imgUrl = "imgUrl" :toName = 'toName'></Step>
        <section  v-if="showView === 1">
          <section class="flex text" >
              <span class="text_title" >客户信息：</span>
              <div class="text_con" style="margin-top:25px">
                <section class="flex" style="flex-wrap:wrap">
                    <section class="flex" style="margin-right: 30px">
                      <span class="con_title">
                        <span class="mark">*</span>
                        机构名称</span>
                      <span v-if="!isShow " class="inputLine">{{clientInfo.mechanism}}</span>
                      <el-input v-else v-model="clientInfo.mechanism" placeholder="请输入内容" clearable  class="inputLine"></el-input>
                      <!-- <el-select v-else v-model="clientInfo.mechanism" placeholder="请选择" class="inputLine" clearable @change="changeMechan" >
                        <el-option
                          v-for="item in departmentTree"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select> -->
                    </section>
                    <section class="flex">
                      <span class="con_title">
                        <span class="mark">*</span>
                        机构类别</span>
                        <span  v-if="!isShow">
                            <span>{{clientInfo.category1}}</span>
                            <span v-if="clientInfo.category2">-{{clientInfo.category2}}</span>
                        </span>
                      <Cascader 
                       v-else
                        :categoryA = 'clientInfo.category1'
                        :categoryB = 'clientInfo.category2'
                        :departList = "departList"
                        @category1 = "getCategory1"
                        class="inputLine text"
                        ref="category">
                      </Cascader>
                    </section>
                </section>
                <section class="flex" style="line-height:30px;flex-wrap:wrap">
                    <section class="flex" style="margin:10px 30px 10px 0">
                      <span class="con_title">
                        机构评级</span>
                        <span v-if="!isShow" class="inputLine">{{clientInfo.mechanismGrade}}</span>
                      <el-input v-else v-model="clientInfo.mechanismGrade" placeholder="请输入内容" class="inputLine" maxlength="50"></el-input>
                    </section>
                    <section class="flex" style="margin:10px 0;z-index:10">
                      <span class="con_title" >
                        评级时间</span>
                        <span v-if="!isShow"  class="inputLine">{{clientInfo.gradeAt}}</span>
                      <el-date-picker
                        v-else
                        v-model="clientInfo.gradeAt"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        class="inputLine">
                      </el-date-picker>
                    </section>
                </section>
                <section class="flex">
                    <section class="flex">
                      <span class="con_title">
                        <span class="mark">*</span>
                        标签</span>
                        <span v-if="!isShow" class="inputLine">{{clientInfo.label}}</span>
                      <el-select v-else v-model="clientInfo.label" placeholder="请选择" class="inputLine">
                        <el-option label="重点" value="重点"></el-option>
                        <el-option label="普通" value="普通"></el-option>
                      </el-select>
                    </section>
                </section>
                 <section  class="btnBox main_space" v-if="showView === 1 && isShow ">
                  <button class="btn btn_primary" @click="submit">保存</button>
                  <button class="btn btn_info_plain_disabled" @click="toRoute">取消</button>
                </section>
              </div>
          </section>
          <section>
            <div class="line"></div>
          </section>
          <section class="text flex" style="margin-top:40px;line-height:0">
              <span>项目记录：</span>
              <div class="text_con text_con1">
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="{background:'#F5F6FA'}"
                    @row-click="editProgress">
                    <el-table-column
                      prop="communicationAt"
                      label="沟通时间"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      label="面访"
                      align="center">
                      <template slot-scope="scope">
                          <span>{{scope.row.isVisit === 'YES'? '是':'否'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="合作状态"
                      align="center">
                      <template slot-scope="scope">
                          <span>{{scope.row.cooperation2?scope.row.cooperation1 + '-' + scope.row.cooperation2 :scope.row.cooperation1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="projectName"
                      label="项目名称"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="projectType"
                      label="项目类型"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="followPerson"
                      label="跟进人"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="projectProgress"
                      label="项目进度"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      label="备注"
                      align="center"
                      :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{scope.row.remarks}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column  v-if="isShow"  label="操作" align="center" width="150px" >
                      <template slot-scope="scope"  >
                          <div class="main-around">
                              <span
                            style="cursor: pointer;color:#5792FC;"
                              @click.stop="editProgress(scope.row, 'edit')"
                          >
                            <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                          编辑</span>
                          <span
                            @click.stop="deleProgress(scope.row)"
                            style="cursor: pointer;color:#5792FC"
                          >
                          <img src="../../assets/img/trash.png" alt="" style="width:13px;height:13px">
                          删除</span>
                          </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <img  v-if="isShow && sonId " src="../../assets/img/add.png" alt="" class="con_img" @click="changeView">
              </div>
          </section>
        </section>
        <!-- <ClientInfo
          v-if="showView === 2"
          :tableInfo = "tableInfoid"
          @pregress="projectProgess"
          @hideenProgress="hideenProgress">
        </ClientInfo>   -->
    </main>
</template>>
<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
// import ClientInfo from './ClientInfo1.vue'
import Cascader from '@/components/Cascader.vue'
import { department, client } from '@/api/index'
// interface $refs {
//   category: HTMLFormElement,
// }
@Component({
    components: {
        Step,
        Cascader,
        // ClientInfo,
    },
})
export default class ClientAdd  extends Vue {
  private message: any = ['直销客户', '新增']
  private imgUrl = require('../../assets/img/head/client.png')
  private isView: boolean = true
  private toName: string = 'client'
  private showView: number = 1
  private clientInfo: any = {
    mechanism: '',
    category1: '',
    category2: '',
    mechanismGrade: '',
    createAt: '',
    label: '',
  }
  private tableData: any = []
  private tableInfoid: any = {}
  private isShow: boolean = false
  private departmentTree: any[] = []
  private departList: any = [
    {
      label: '银行',
      value:  1,
      childrenList: [
        {
          label: '国股行',
          value:  2,
        },
        {
          label: '城农商行',
          value:  3,
        },
      ],
    },
    {
      label: '财务公司',
      value:  4,
    },
    {
      label: '保险公司',
      value:  5,
    },
    {
      label: '券商',
      value:  6,
    },
    {
      label: '公募',
      value:  7,
    },
    {
      label: '私募',
      value:  8,
    },
  ]
  // public $refs !: {
  //   category: HTMLFormElement,
  // }
  private sonId: any = ''
  private toRoute() {
    this.$router.push({ name: 'client'})
  }
  private changeView() {
    if (this.$route.query.id ) {
      this.$router.push({name: 'clientInfo', query: {infoId: this.$route.query.id}})
    } else {
      // this.showView = 2
      this.$router.push({name: 'clientInfo', query: {infoId: this.sonId, clientInfo: this.clientInfo}})
    }
  }
  // 获取部门树
  private async getdepTree() {
    const res: any = await department.findAll()
    const arr: any[] = []
    for ( let i = 0, len = res.data.data.childList.length; i < len; i++) {
      arr.push({
        label: res.data.data.childList[i].name,
        value: res.data.data.childList[i].id,
      })
    }
    this.departmentTree = arr
  }
  private getCategory1(a: any, b: any) {
    this.clientInfo.category1 = a
    this.clientInfo.category2 = b
  }
  private async submit() {
    this.sonId = ''
    if ( !this.clientInfo.mechanism && !this.clientInfo.category1 && !this.clientInfo.label) {
      this.$message.warning(`请将必填项填写完整！`)
      return false
    }
    const data: any = {
      ...this.clientInfo,
      directSellingCustomerInfoList: this.tableData,
    }
    if (this.$route.query.id) {
      const res: any = await client.updateSell(data)
      const {code, msg, success} = res.data
      if (success) {
        this.$message.success(`修改成功`)
        this.$router.push({name: 'client'})
        // this.viewClientinfo(this.$route.query.id)
      } else {
        this.$message.error(`${msg}`)
      }
    } else {
      // const data: any = {
      //   ...this.clientInfo,
      //   directSellingCustomerInfoList: this.tableData,
      // }
      const res: any = await client.addSell(data)
      const {code, msg, success} = res.data
      if (success) {
        this.$message.success('添加成功')
        this.sonId = res.data.data
      }
    }
  }
  private editProgress(info: any, sonState: any) {
    const infoId: any = this.$route.query.id
    if ( info ) {
      if (sonState === 'edit') {
        this.$router.push({name: 'clientInfo', query: {infoId, id: info.id, type: 'edit'}})
      } else {
        this.$router.push({name: 'clientInfo', query: {infoId, id: info.id, type: 'detail'}})
      }
    }
  }
  // 根据id查看详情
  private async viewClientinfo(id: any) {
    const res: any = await client.findsellById(`id=${id}`)
    this.clientInfo = res.data.data
    this.tableData =  res.data.data.directSellingCustomerInfoList
  }
  // 删除
  private async  deleProgress1(info: any) {
    if (info.id) {
      const res: any = await client.delSoninfo(`id=${info.id}`)
      this.viewClientinfo(this.$route.query.id)
    }
  }
  private deleProgress(info: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.deleProgress1(info)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
  }
  // 机构名称选中值
  private changeMechan( val: any) {
    // const aa = this.departmentTree.filter( vall => vall.value === val)
    for (let i = 0, len = this.departmentTree.length; i < len; i++) {
      if ( val === this.departmentTree[i].value) {
        this.clientInfo.mechanism = this.departmentTree[i].label
      }
    }
  }
  private mounted() {
    if ( this.$route.query.id && this.$route.query.type || !this.$route.query.id && !this.$route.query.type ) {
        this.isShow = true
    }
    this.getdepTree()
    if (this.$route.query.id && this.$route.query.type) {
      this.message = ['直销客户', '编辑']
      this.viewClientinfo(this.$route.query.id)
      this.sonId = this.$route.query.id
    } else if (this.$route.query.id && !this.$route.query.type) {
      this.message = ['直销客户', '详情']
      this.viewClientinfo(this.$route.query.id)
      this.sonId = this.$route.query.id
    } else {
      this.message = ['直销客户', '新增']
      this.sonId = ''
    }
    document.addEventListener('click', (e) => {
      const el: any = e
      const el1: any = this.$refs.category
      if (el !== 'undefined') {
        if (el.target.className !== 'custom_style') {
          el1.isShow = false;
        }
      }
    })
  }
 }
</script>
<style lang="less" scoped>
main{
   /deep/ .el-input__icon {
    line-height: 32px;
  }
  tr{
    height: 44px;
  }
  .inputLine{
    width: 224px !important;
  }
  .text{
    line-height: 50px;
    .text_title{
      font-size:16px;
      color:rgba(49,50,51,1);
    }
    .text_con{
      width: 80%;
      height:auto;
      background:rgba(245,247,250,1);
      border-radius:4px;
      padding: 10px 0;
      box-sizing: border-box;
      .con_title{
        width: 100px;
        font-size:16px;
        text-align: right;
        font-size:16px;
        color:rgba(49,50,51,1);
        margin-right: 20px;
      }
    }
    .text_con1{
      height: auto;
      background: #ffff;
      padding: 0;
      box-sizing: border-box;
      position: relative;
    }
    .con_img{
      width: 32px;
      height: 32px;
      position: absolute;
      right: -40px;
      top:8px;
    }
  }
  .btnBox{
    width: 264px;
    margin: 20px auto;
  }
  .line{
    width: 100%;
    height: 1px;
    background:rgba(228,231,237,1);
    margin-top: 40px;
  }
}
</style>