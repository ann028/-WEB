<template>
    <main class="container" >
      <!-- :toName = 'toName' -->
        <Step :stepName = "message" :isView = "isView"  :imgUrl = "imgUrl" ></Step>
        <section class="context">
          <section class="flex text">
            <section  class="flex">
              <span class="text0">员工姓名：</span>
              <span class="text1" v-if='$route.query.id'>{{clientInfo.userName}}</span>
              <span class="text1" v-else>{{userInfo.user.name}}</span>
            </section>
            <section  class="flex">
              <span class="text0">部门：</span>
              <span class="text1" v-if='$route.query.id'>{{clientInfo.departName}}</span>
              <span class="text1" v-else>{{userInfo.user.departmentName}}</span>
            </section>
          </section>
          <section class="text ">
              <span class="text0">
                <span class="mark">*</span>
                日报类型：</span>
               <el-radio-group v-model="radio" v-if="!$route.query.id">
                  <el-radio :label="1" >工作</el-radio>
                  <el-radio :label="2" >请假</el-radio>
                </el-radio-group>
                <el-radio-group v-model="radio" v-if='$route.query.id && $route.query.type === "工作"'>
                  <el-radio :label="1" >工作</el-radio>
                </el-radio-group>
                <el-radio-group v-model="radio" v-if='$route.query.id && $route.query.type === "请假"'>
                  <el-radio :label="2" >请假</el-radio>
                </el-radio-group>
          </section>
          <section class="text flex" v-if='radio === 1'>
            <span class="text0" style="flex-shrink: 0">日报内容：</span>
            <div class="textCox">
              <section >
                <section class="flex text" >
                    <span class="text_title" >客户信息：</span>
                    <div class="text_con" style="margin-top:25px">
                      <section class="flex" style="flex-wrap:wrap">
                          <section class="flex" style="margin-right: 30px">
                            <span class="con_title">
                              <span class="mark">*</span>
                              机构名称</span>
                            <span v-if="!isEdit " class="inputLine">{{clientInfo.mechanism}}</span>
                            <el-input v-else v-model="clientInfo.mechanism" clearable  class="inputLine"></el-input>
                          </section>
                          <section class="flex">
                            <span class="con_title">
                              <span class="mark">*</span>
                              机构类别</span>
                              <span v-if="!isEdit" class="inputLine">
                                  <span>{{clientInfo.mechanismCategory}}</span>
                                  <!-- <span v-if="clientInfo.category2">-{{clientInfo.category2}}</span> -->
                              </span>
                            <Cascader 
                              v-else
                              :departList = "mechanismCategory"
                              class="inputLine text"
                              :categoryA = 'clientInfo.mechanismCategory'
                              @category1 = "getMechanismCategory"
                              ref="category">
                            </Cascader>
                          </section>
                      </section>
                      <section class="flex" style="flex-wrap:wrap">
                          <section class="flex" style="margin-right:30px">
                            <span class="con_title" >
                              机构部门</span>
                              <span v-if="!isEdit" class="inputLine">{{clientInfo.mechanismDept}}</span>
                            <!-- <el-input v-model="clientInfo.mechanismGrade" placeholder="请输入内容" class="inputLine" maxlength="50"></el-input> -->
                            <Cascader 
                              v-else
                              :departList = "mechanismDepart"
                              :categoryA = 'clientInfo.mechanismDept'
                              @category1 = "getMechanismDept"
                              class="inputLine text"
                              ref="category">
                            </Cascader>
                          </section>
                          <section class="flex" >
                            <span class="con_title" >
                             二级部门</span>
                              <span v-if="!isEdit"  class="inputLine">{{clientInfo.secondSector}}</span>
                            <Cascader 
                              v-else
                              :departList = "secondDepart"
                              :categoryA = 'clientInfo.secondSector'
                              @category1 = "getSecondSector"
                              class="inputLine text"
                              ref="category">
                            </Cascader>
                          </section>
                      </section>
                      <section class="flex" style="flex-wrap:wrap">
                          <section class="flex"  style="margin-right: 30px">
                            <span class="con_title">
                              联系人</span>
                              <span v-if="!isEdit" class="inputLine">{{clientInfo.contacts}}</span>
                            <el-input v-else  v-model="clientInfo.contacts"  class="inputLine" maxlength="50"></el-input>
                          </section>
                          <section class="flex" style="">
                            <span class="con_title" >
                              职位</span>
                              <span v-if="!isEdit"  class="inputLine">{{clientInfo.position}}</span>
                              <!-- <el-input  v-model="clientInfo.gradeAt" placeholder="请输入职位" class="inputLine" maxlength="50"></el-input> -->
                              <Cascader 
                                v-else
                                :departList = "workList"
                                :categoryA = 'clientInfo.position'
                                @category1 = "getPosition"
                                class="inputLine text"
                                ref="category">
                              </Cascader>
                          </section>
                      </section>
                      <section class="flex" style="flex-wrap: wrap">
                          <section class="flex" style="margin-right: 30px">
                            <span class="con_title">
                              <span class="mark">*</span>
                              客户级别</span>
                              <span v-if="!isEdit && clientInfo.customerLevel==='1'" class="inputLine">一级</span>
                              <span v-else-if="!isEdit && clientInfo.customerLevel==='2'" class="inputLine">二级</span>
                              <span v-else-if="!isEdit && clientInfo.customerLevel==='3'" class="inputLine">三级</span>
                              <el-select v-else v-model="clientInfo.customerLevel" placeholder=""  class="inputLine">
                                <el-option label="一级" value="1"></el-option>
                                <el-option label="二级" value="2"></el-option>
                                <el-option label="三级" value="3"></el-option>
                              </el-select>
                          </section>
                          <section class="flex">
                            <span class="con_title">
                              <span class="mark">*</span>
                              业务级别</span>
                              <span v-if="!isEdit" class="inputLine">{{clientInfo.typeOfBusiness}}</span>
                              <el-select v-else  v-model="clientInfo.typeOfBusiness" placeholder=""  class="inputLine">
                                <el-option label="直销" value="直销"></el-option>
                                <el-option label="代销" value="代销"></el-option>
                              </el-select>
                          </section>
                      </section>
                      <section v-if='isEdit'  class="btnBox main_space" >
                        <button class="btn btn_primary" @click="saveClientinfo">保存</button>
                        <button class="btn btn_info_plain_disabled" @click="$router.go(-1)">取消</button>
                      </section>
                    </div>
                </section>
                <section class="flex ">
                  <section class="flex">
                    <span class="text_title" style="display: inline-block; width: 100px">参与人:</span>
                    <div v-if='this.$route.query.id || this.dailyId'>
                      <button v-if="this.$route.query.id && this.$route.query.operation === 'detail'" class="btn btn_succ" style="height: 30px; width: 80px;margin-top: 10px;" @click="dialogVisiable = true">去查看</button>
                      <button v-else  class="btn btn_succ" style="height: 30px; width: 80px;margin-top: 10px;" @click="dialogVisiable = true">去设置</button>
                    </div>
                  </section>
                </section>
                <section>
                  <div class="line"></div>
                </section>
                <section class="text flex" style="margin-top:40px;line-height:0">
                    <span style="flex-shrink: 0">项目记录：</span>
                    <div class="text_con text_con1">
                        <el-table
                          :data="tableData"
                          style="width: 100%"
                          :header-cell-style="{background:'#F5F6FA'}"
                          @row-click="editProgress">
                          <el-table-column
                            prop="dailyAt"
                            label="日期"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            prop="workProgress"
                            label="工作进展"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            prop="content"
                            label="内容"
                            align="center"
                            :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                              <span>{{scope.row.content}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="proType"
                            label="沟通方式"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            prop="state"
                            label="状态"
                            align="center">
                              <template slot-scope="scope">
                                  <span>{{scope.row.state === 'DRAFT'? '暂存': '提交'}}</span>
                              </template>
                          </el-table-column>
                          <el-table-column
                            prop="dailyAt"
                            label="提交时间"
                            align="center">
                          </el-table-column>
                          <el-table-column
                            label="创建人"
                            align="center"
                            prop="userName">
                          </el-table-column>
                          <el-table-column v-if='isEdit'   label="操作" align="center" width="200px" >
                            <template slot-scope="scope"  >
                                <div class="main-around">
                                    <span
                                  style="cursor: pointer;color:#5792FC;"
                                    @click.stop="editProgress(scope.row, 'edit')"
                                >
                                  <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                                编辑</span>
                                    <span
                                            style="cursor: pointer;color:#5792FC;"
                                            @click.stop="updateProgress(scope.row)"
                                            v-if="scope.row.state === 'DRAFT'"
                                    >
                                  <img src="../../assets/img/editor.png" alt="" style="width:13px;height:13px">
                                提交</span>
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
                        <img v-if='isEdit && (this.$route.query.id || this.dailyId)' src="../../assets/img/add.png" alt="" class="con_img" @click="progressRow = {}, prodressVisiable = true">
                    </div>
                </section>
              </section>
            </div>
          </section>
          <section class="text flex" v-if='radio === 2'>
            <span class="text0">日报内容：</span>
            <div class="textCox">
              <section class="date">
                <span class="text0">
                <span class="mark">*</span>
                    日期：</span>
                <el-date-picker
                  v-if="isEdit"
                  v-model="clientInfo.startTime"
                  type="date"
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  @change = 'changeTime'
                  :clearable="false"
                  style="width:224px;line-height: 40px; margin: 6px 0">
                </el-date-picker>
                <el-date-picker
                  v-else
                  v-model="clientInfo.startTime"
                  type="date"
                  readonly
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  @change = 'changeTime'
                  :clearable="false"
                  style="width:224px;line-height: 40px; margin: 6px 0">
                </el-date-picker>
                <span style="margin:0 5px">至</span>
                <el-date-picker
                  v-if="isEdit"
                  v-model="clientInfo.endTime"
                  type="date"
                  placeholder="结束日期"
                  @change = 'changeTime1'
                  value-format="yyyy-MM-dd"
                  :clearable="false"
                  style="width:224px;line-height: 40px; margin: 6px 0">
                </el-date-picker>
                <el-date-picker
                  v-else
                  readonly
                  v-model="clientInfo.endTime"
                  type="date"
                  placeholder="结束日期"
                  @change = 'changeTime1'
                  value-format="yyyy-MM-dd"
                  :clearable="false"
                  style="width:224px;line-height: 40px; margin: 6px 0">
                </el-date-picker>
              </section>
              <section class="flex">
                  <span class="text0">
                      请假天数：</span>
                      <el-input v-model="clientInfo.day" :disabled="true" placeholder="请假天数（自动计算）" class="text1"></el-input>
                  </section>
              <section  class="flex ">
                  <span class="text0">
                    <span class="mark">*</span>
                      请假类型：</span>
                      <span v-if='!isEdit'>{{clientInfo.type}}</span>
                      <el-select v-else v-model="clientInfo.type" placeholder="请选择" class="text1">
                        <el-option
                          v-for="item in leaveOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
              </section>
              <section class="flex">
                <span class="text0">
                    <span class="mark">*</span>请假事由：</span>
                <div class="workTxt">
                  <textarea v-if='isEdit' :maxlength="200"  v-model="clientInfo.reason" name="" id="" cols="50" rows="10" style="width:100%"></textarea>
                  <textarea v-else readonly :maxlength="200"  v-model="clientInfo.reason" name="" id="" cols="50" rows="10" style="width:100%"></textarea>
                </div>
              </section>
            </div>
          </section>
              <div v-if='radio === 2' style="width:436px;margin:20px auto;display:flex;justify-content:space-around">
                <button :class="['btn btn_info_plain']"  @click="addPerson('draft')">暂存</button>
                <button :class="['btn btn_succ_plain']" style="font-size: 16px" @click="addPerson('commit')">提交</button>
                <button class="btn btn_info_plain_disabled" @click="$router.go(-1)">取消</button>
              </div>
            </section>
        <Setting
          class="modal"
          v-if="dialogVisiable"
          :deparmentTree="deparmentTree"
          :dailyId="dailyId"
          @hide="hide"
          @save="save"
        ></Setting>
        <Progress
          class="modal"
          v-if="prodressVisiable"
          :progressRow="progressRow"
          :isEdit="isEdit"
          @hideProgress="hide1"
          @saveProgress="save1"
        >
        </Progress>
    </main>
</template>>
<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator'
import Step from '@/components/Step.vue'
import Cascader from '@/components/Cascader.vue'
import Setting from './ClientSetting.vue'
import Progress from './ClientProgress.vue'
import { department, client, daily } from '@/api/index'
import {obj1} from '@/utils/util'
import * as Factory from '@/factory/index'
interface ItreeNode {
    label: string;
    meta: {
      id: number,
      keyCode?: string,
      parentCode?: string,
      selected?: boolean,
    };
    children?: any[];
  }
@Component({
    components: {
        Step,
        Cascader,
        Setting,
        Progress,
    },
})
export default class ClientAdd  extends Vue {
  private message: any = ['直销日报', '新增']
  private imgUrl = require('../../assets/img/head/client.png')
  private isView: boolean = true
  // private toName: string = 'clientList'
  private isEdit: boolean = false
  private dailyId: any = ''
  private selectInfo: any = []
  private clientInfo: any = {
    userName: '',
    departName: '',
    mechanism: '',
    category1: '',
    category2: '',
    mechanismCategory: '',
    mechanismDept: '',
    contacts: '',
    createAt: '',
    customerLevel: '',
    position: '',
    secondSector: '',
    typeOfBusiness: '',
    startTime: '',
    endTime: '',
    day: 1,
    type: '',
    reason: '',
  }
  // private leaveInfo: any = {
    //   startTime: '',
    //   endTime: '',
    //   day: '',
    //   type: '',
    //   reason: '',
  // }
  private tableData: any = []
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
  private mechanismCategory: any[] = [
    {
      label: '银行',
      value: 1,
    },
    {
      label: '保险',
      value: 2,
    },
    {
      label: '券商',
      value: 3,
    },
    {
      label: '信托',
      value: 4,
    },
    {
      label: '财务公司',
      value: 6,
    },
    {
      label: '私募',
      value: 7,
    },
    {
      label: '上市公司',
      value: 8,
    },
    {
      label: '未上市企业',
      value: 9,
    },
  ]
  private mechanismDepart: any[] = [
    {
      label: '资产管理部',
      value: 1,
    },
    {
      label: '金融市场部',
      value: 2,
    },
    {
      label: '金融同业部',
      value: 3,
    },
    {
      label: '零售业务部',
      value: 4,
    },
    {
      label: '私人银行部',
      value: 6,
    },
    {
      label: '财富管理部',
      value: 7,
    },
    {
      label: '投资银行部',
      value: 8,
    },
    {
      label: '自营',
      value: 9,
    },
  ]
  private secondDepart: any[] = [
    {
      label: '固收',
      value: 1,
    },
    {
      label: '权益',
      value: 2,
    },
    {
      label: '委外',
      value: 3,
    },
    {
      label: '组合管理',
      value: 4,
    },
    {
      label: '另类投资',
      value: 6,
    },
  ]
  private workList: any[] = [
    {
      label: '董事长',
      value: 1,
    },
    {
      label: '总经理',
      value: 2,
    },
    {
      label: '副总经理',
      value: 3,
    },
    {
      label: '总监',
      value: 4,
    },
    {
      label: '处长',
      value: 5,
    },
    {
      label: '副处',
      value: 6,
    },
    {
      label: '投资主管',
      value: 7,
    },
    {
      label: '投资经理',
      value: 8,
    },
    {
      label: '高级经理',
      value: 9,
    },
  ]
  private leaveOptions: any = Factory.leaveOption()
  private radio: any = 1
  private dialogVisiable: boolean = false
  private prodressVisiable: boolean = false
  private deparmentTree: any[] = []
  private progressRow: any = {}
  private dailyType: string = ''
  private get userInfo() {
    return this.$store.state.userInfo
  }
  private saveClientinfo() {
      if (!this.clientInfo.mechanism || !this.clientInfo.mechanismCategory
          || !this.clientInfo.customerLevel || !this.clientInfo.typeOfBusiness) {
          this.$message.warning('请将必填项填写完整！')
          return false
      }
      if (!this.$route.query.id) {
      const data: any = {
        contacts: this.clientInfo.contacts,
        customerLevel: this.clientInfo.customerLevel,
        departName: this.$store.state.userInfo.user.departmentName,
        departmentId: this.$store.state.userInfo.user.departmentId,
        mechanism: this.clientInfo.mechanism,
        mechanismCategory: this.clientInfo.mechanismCategory,
        mechanismDept: this.clientInfo.mechanismDept,
        position: this.clientInfo.position,
        secondSector: this.clientInfo.secondSector,
        typeOfBusiness: this.clientInfo.typeOfBusiness,
        userId: this.$store.state.userInfo.user.id,
        userName: this.$store.state.userInfo.user.name,
        //
        parentDepartmentId: 1,
        workProgress: '',
      }
      client.addClientDailyInfo(data).then((res) => {
        if (res.data.success) {
          this.dailyId = res.data.data
          this.dailyType = '工作'
        }
      })
    } else {
      const data: any = {
        contacts: this.clientInfo.contacts,
        customerLevel: this.clientInfo.customerLevel,
        departName: this.$store.state.userInfo.user.departmentName,
        departmentId: this.$store.state.userInfo.user.departmentId,
        mechanism: this.clientInfo.mechanism,
        mechanismCategory: this.clientInfo.mechanismCategory,
        mechanismDept: this.clientInfo.mechanismDept,
        position: this.clientInfo.position,
        secondSector: this.clientInfo.secondSector,
        typeOfBusiness: this.clientInfo.typeOfBusiness,
        userId: this.$store.state.userInfo.user.id,
        userName: this.$store.state.userInfo.user.name,
        id: this.clientInfo.id,
        parentDepartmentId: 1,
        workProgress: '',
      }
      client.upClientDailyInfo(data).then((res) => {
        if (res.data.success) {
          this.$message.success(`修改成功!`)
          return false
        }
      })
    }
  }
  // 根据id查看详情
  private async viewClientinfo(id: any) {
    if (this.$route.query.type === '请假') {
      this.radio = 2
      const res: any = await daily.getEditleave(`id=${id}`)
      const startTime = JSON.stringify(res.data.data.startTime)
      const endTime = JSON.stringify(res.data.data.endTime)
      this.clientInfo = res.data.data
      this.clientInfo.timeValue = [
        startTime,
        endTime,
      ]
    } else if (this.$route.query.type === '工作' ? this.$route.query.type === '工作' : this.dailyType) {
      this.radio = 1
      const res: any = await client.findById(`id=${id}`)
      this.clientInfo = res.data.data
      // this.tableData =  res.data.data.directInvestigationList
      const data =  res.data.data.directInvestigationList
      if (data.length) {
            for (let i = 0; i < data.length; i++) {
                if ( data[i].communicate1 === 1 ) {
                    if ( data[i].communicate2 === 1 ) {
                        if (data[i].communicate3 === 1) {
                            data[i].proType = '面访-培训-内部'
                        } else if (data[i].communicate3 === 2) {
                            data[i].proType = '面访-培训-外部'
                        }
                    } else if ( data[i].communicate2 === 2) {
                        if (data[i].communicate3 === 1) {
                            data[i].proType = '面访-沟通-沟通'
                        } else if (data[i].communicate3 === 2) {
                            data[i].proType = '面访-沟通-外部'
                        }
                    }
                } else if (data[i].communicate1 === 2) {
                    if (data[i].communicate2 === 1) {
                        if (data[i].communicate3 === 1) {
                            data[i].proType = '线上-培训-培训'
                        } else if (data[i].communicate3 === 2) {
                            data[i].proType = '线上-培训-外部'
                        }
                    } else if (data[i].communicate2 === 2) {
                        if (data[i].communicate3 === 1) {
                            if (data[i].communicate4 === 1) {
                                data[i].proType = '线上-沟通-内部微信'
                            } else if (data[i].communicate4 === 2) {
                                data[i].proType = '线上-沟通-内部电话'
                            }
                        } else if (data[i].communicate3 === 2) {
                            if (data[i].communicate4 === 1) {
                                data[i].proType = '线上-沟通-外部电话'
                            } else if (data[i].communicate4 === 2) {
                                data[i].proType = '线上-沟通-外部电话'
                            }
                        }
                    }
                } else if (data[i].communicate1 === 3) {
                    data[i].proType = '公司内部'
                }
                this.tableData = data
            }
      } else {
          this.tableData = [];
      }
    }
  }
  // 销售记录查看详情
  private editProgress(row: any, type: any) {
    this.progressRow = row
    this.prodressVisiable = true
  }
  // 时间选择器
  private changeTime(val: any) {
    this.clientInfo.startTime = val
    this.clientInfo.endTime = val
    const start: any = Date.parse(val)
    const end: any = Date.parse(val)
    let dateSpan: any = start - end
    dateSpan = Math.abs(dateSpan)
    let day: any = this.clientInfo.day
    day = Math.floor(dateSpan / (24 * 3600 * 1000));
    this.clientInfo.day = day + 1
  }
  private changeTime1(val: any) {
    const start: any = Date.parse(this.clientInfo.startTime)
    const end: any = Date.parse(val)
    let dateSpan: any = start - end
    if (dateSpan <= 0) {
      dateSpan = Math.abs(dateSpan)
      let day: any = this.clientInfo.day
      day = Math.floor(dateSpan / (24 * 3600 * 1000));
      this.clientInfo.day = day + 1
    } else {
      this.$message.error(`开始时间大于结束时间`)
      this.clientInfo.endTime = this.clientInfo.startTime
      return false
    }
  }
  // 获取部门树
  private async departtree() {
      let res: any = await department.findAll()
      const list: ItreeNode[] = []
      res = res.data
      if (res.code === 0) {
        const { id, keyCode, name, parentCode, childList = [], selected } = res.data
        let children: any = []
        const setChildren = (nodeList: any) => {
          nodeList = nodeList.map((node: any) => {
            let nodeChildren: any[] = []
            if (node.childList) {
              nodeChildren = setChildren(node.childList)
            }
            return {
              label: node.name,
              children: nodeChildren,
              meta: {
                id: node.id,
                keyCode: node.keyCode,
                parentCode: node.parentCode,
                selected: node.selected,
              },
            }
          });
          return nodeList
        }
        children = setChildren(childList)
        list.splice(0, 1, {
          label: name,
          children,
          meta: {
            id,
            keyCode,
            parentCode,
            selected,
          },
        })
      } else {
        this.$message.error(`获取部门数据失败，${res.msg}`)
      }
      this.deparmentTree = list
    }
  private hide() {
    this.dialogVisiable = false
  }
  private save(a: any) {
    if (a.length === 0) {
      this.$message.success(`请选择要添加的用户`)
      return false
    } else {
      if (this.$route.query.id || this.dailyId) {
        const dailyId = this.$route.query.id ? this.$route.query.id : this.dailyId
        const arr: any = []
        for (const item of a) {
          const objItem = {
            dailyId,
            userId: item.id,
          }
          arr.push(objItem)
        }
        client.addParticipant(arr).then((res) => {
          if (res.data.success) {
            this.$message.success(`添加成功`)
            this.dialogVisiable = false
          } else {
            this.$message.error(`res.data.msg`)
            return false
          }
        })
      }
    }
  }
  private hide1() {
    this.prodressVisiable = false
  }
  private save1(a: any, b: any, c: any, d: any, e: any) {
    const interviewRadio1 = c
    const onlineRadio = d
    const insideRadio = e
    if ( interviewRadio1 === 1 ) {
        const arr: any = [1, 1, 1, 0]
        this.selectInfo = arr
      } else if ( interviewRadio1 === 2 ) {
        const arr: any = [1, 1, 2, 0]
        this.selectInfo = arr
      } else if ( interviewRadio1 === 3 ) {
        const arr: any = [1, 2, 1, 0]
        this.selectInfo = arr
      } else if ( interviewRadio1 === 4 ) {
        const arr: any = [1, 2, 2, 0]
        this.selectInfo = arr
      } else if ( onlineRadio === 1 ) {
        const arr: any = [2, 1, 1, 0]
        this.selectInfo = arr
      } else if ( onlineRadio === 2 ) {
        const arr: any = [2, 1, 2, 0]
        this.selectInfo = arr
      } else if ( onlineRadio === 3 ) {
        const arr: any = [2, 2, 1, 1]
        this.selectInfo = arr
      } else if ( onlineRadio === 4 ) {
        const arr: any = [2, 2, 1, 2]
        this.selectInfo = arr
      } else if ( onlineRadio === 5 ) {
        const arr: any = [2, 2, 2, 1]
        this.selectInfo = arr
      } else if ( onlineRadio === 6 ) {
        const arr: any = [2, 2, 2, 2]
        this.selectInfo = arr
      } else if ( insideRadio === 1 ) {
        const arr: any = [3, 1, 0, 0]
        this.selectInfo = arr
    }
    const communicate1 = 'communicate1'
    const communicate2 = 'communicate2'
    const communicate3 = 'communicate3'
    const communicate4 = 'communicate4'
    const statistics = 'statistics'
    const userId = 'userId'
    const dailyId = 'dailyId'
    b[communicate1] = this.selectInfo[0]
    b[communicate2] = this.selectInfo[1]
    b[communicate3] = this.selectInfo[2]
    b[communicate4] = this.selectInfo[3]
    b[statistics] = 'NO'
    if (!b.dailyAt || !b.workProgress || !b.content) {
        this.$message.warning(`请将必填项填写完整`)
        return false
    }
    b[userId] = this.$store.state.userInfo.user.id
    b[dailyId] = this.$route.query.id ? this.$route.query.id : this.dailyId
    if (a === 'draft') {
      const state = 'state'
      b[state] = 'DRAFT'
    } else {
      const state = 'state'
      b[state] = 'COMMIT'
    }
    if (this.progressRow.id) {
      const id = 'id'
      b[id] = this.progressRow.id
      client.updateInfo(b).then((res) => {
        if (res.data.success) {
          this.$message.success(`修改成功`)
          this.viewClientinfo(this.$route.query.id ? this.$route.query.id : this.dailyId)
        } else {
          this.$message.error(`${res.data.msg}`)
          this.viewClientinfo(this.$route.query.id ? this.$route.query.id : this.dailyId)
        }
        this.prodressVisiable = false
      })
    } else {
      client.addInfo(b).then((res) => {
        if (res.data.success) {
          this.$message.success(`新增成功`)
          this.viewClientinfo(this.$route.query.id ? this.$route.query.id : this.dailyId)
        } else {
            this.$message.error(`${res.data.msg}`)
            return false
        }
        this.prodressVisiable = false
      })
    }
  }
  private getMechanismCategory(a: any, b: any) {
    this.clientInfo.mechanismCategory = a
  }
  private getMechanismDept(a: any, b: any) {
    this.clientInfo.mechanismDept = a
  }
  private getSecondSector(a: any, b: any) {
    this.clientInfo.secondSector = a
  }
  private getPosition(a: any, b: any) {
    this.clientInfo.position = a
  }
 // 新增请假单
  private async addPerson(state: any) {
    const start: any = Date.parse(this.clientInfo.startTime)
    const end: any = Date.parse(this.clientInfo.endTime)
    let dateSpan: any = start - end
    dateSpan = Math.abs(dateSpan)
    let day: any = this.clientInfo.day
    day = Math.floor(dateSpan / (24 * 3600 * 1000));
    this.clientInfo.day = day + 1
    if (this.$route.query.id) {
      const data: any = {
        day: this.clientInfo.day,
        endTime: this.clientInfo.endTime,
        id: this.$route.query.id || '',
        reason: this.clientInfo.reason,
        startTime: this.clientInfo.startTime,
        state: state === 'commit' ? 'COMMIT' : 'DRAFT',
        type: this.clientInfo.type,
      }
      const res: any = await daily.updateleavePerson(JSON.parse(JSON.stringify(data)))
      if (res.data.success) {
        this.$message({
          message: '编辑成功',
          type: 'success',
        })
        this.$router.push({name: 'clientList'})
      } else {
        this.$message({
          message: res.data.msg,
          type: 'error',
        })
      }
    } else {
      const data: any = {
        day: this.clientInfo.day,
        endTime: this.clientInfo.endTime,
        // id: this.$route.query.userId||'',
        reason: this.clientInfo.reason,
        startTime: this.clientInfo.startTime,
        state: state === 'commit' ? "COMMIT" : 'DRAFT',
        type: this.clientInfo.type,
      }
      const res: any = await daily.addleavePerson(JSON.parse(JSON.stringify(data)))
      if (res.data.success) {
        this.$message({
          message: '添加成功',
          type: 'success',
        })
        this.$router.push({name: 'clientList'})
      } else {
        this.$message({
          message: res.data.msg,
          type: 'error',
        })
      }
    }
  }
  // 删除调研进度
  private  deleProgress(row: any) {
      this.$confirm('此操作将永久删除该项目记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
      }).then(() => {
          client.deleteInfo(`id=${row.id}`).then((res) => {
              if (res.data.success) {
                  this.$message({
                      type: 'success',
                      message: '删除成功!',
                  });
                  this.viewClientinfo(this.$route.query.id || this.dailyId)
              }
          })
      }).catch(() => {
          this.$message({
              type: 'info',
              message: '已取消删除',
          });
      });
  }
  // 提交项目进度
  private  updateProgress(row: any) {
    const obj = JSON.parse(JSON.stringify(row));
    obj.state = 'COMMIT'
    client.updateInfo(obj).then((res: any) => {
      if (res.data.success) {
        this.viewClientinfo(this.$route.query.id)
      } else {
        this.$message.error(`${res.data.msg}`)
        this.viewClientinfo(this.$route.query.id)
      }
    })
  }
  private mounted() {
    this.departtree()
    this.clientInfo.startTime = obj1.getFirst()[1]
    this.clientInfo.endTime = obj1.getFirst()[1]
    switch (this.$route.query.operation) {
      case 'edit':
        this.message = ['直销日报', '编辑']
        this.viewClientinfo(this.$route.query.id)
        this.isEdit = true
        break;
      case 'detail':
        this.message = ['直销日报', ' 详情']
        this.viewClientinfo(this.$route.query.id)
        break;
      default:
        this.message = ['直销日报', '新增']
        this.isEdit = true
    }
  }
 }
</script>
<style lang="less" scoped>
main{
   /deep/ .el-input__icon {
    line-height: 32px;
  }
  /deep/ .date .el-input__icon {
    line-height: 40px;
  }
  tr{
    height: 44px;
  }
  .inputLine{
    width: 224px !important;
    font-size: 14px;
    color: #4E4E4E;
  }
  .text{
    line-height: 50px;
    .text_title{
      font-size:16px;
      color:rgba(49,50,51,1);
      flex-shrink: 0;
    }
    .text_con{
      width: 90%;
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
  .context{
    padding:20px;
    box-sizing: border-box;
    .text{
      line-height: 50px;
      font-size: 16px;
      .textCox{
        flex-grow:1;
        min-height: 360px;
        margin:20px 0 0 0px;
        background:rgba(245,247,250,1);
        border-radius:4px;
        padding: 24px 40px;
        box-sizing: border-box;
        .workTxt{
          width:80%;
          // flex-grow: 1;
          min-height: 240px;
          margin:20px 0 0 0px;
          padding: 0 20px 0px 0px;
          box-sizing: border-box;
          word-wrap: break-word;
          word-break:break-all;
          overflow: hidden;
        }
      }
      .text0{
        display:inline-block;
        width:94px;
        color:rgba(49,50,51,1);
        font-size: 16px;
        margin-right:32px;
        text-align:right;
      }
      .text1{
        display:inline-block;
        width:224px !important;
        margin-right:30px;
        // color:rgba(96,98,102,1);
        // font-size: 16px;
      }
    }
  }
}
</style>