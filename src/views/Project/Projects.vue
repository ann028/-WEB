<template>
  <main class="content">
    <!-- <div> -->
      <!-- <section class="header">项目管理</section> -->
      <Breadcrumb :tabName = 'tabName'></Breadcrumb>
      <div class="bg flex1" style="padding: 24px; box-sizing: border-box;">
        <section class="searchBox main_space">
          <section class="left">
            <section  class="flex">
              <el-input v-model="searchInfo.name" placeholder="债券代码/简称/发行人" class="input_width"></el-input>
              <section style="margin-left: 10px;">
                <span class="search_title">地区</span>
                <el-select v-model="searchInfo.province" placeholder="请选择" class="search_width">
                  <el-option
                    v-for="item in search_province"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </section>
              <section style="margin-left: 10px;">
                <span class="search_title">上市场所</span>
                <el-select v-model="searchInfo.listedPlace" placeholder="请选择" class="search_width">
                  <el-option
                    v-for="item in search_listedPlace"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </section>
              <button class="btn primary_btn" @click="onSearchButtonClick">查询</button>
              <img src="../../assets/img/project/chevrons-down-orange.png" :class="[isShow ? 'transformGo' : 'transform']" @click="isShow = !isShow" style="width: 20px; height: 20px; margin: auto 0;">
            </section>
            <transition name="bounce">
              <section v-if="isShow">
                <div class="flex" style="margin-top: 17px">
                  <section>
                    <span class="search_title"  style="margin-left: 0;">债券类型</span>
                    <el-select v-model="searchInfo.deptType" placeholder="请选择" class="search_width">
                      <el-option
                        v-for="item in search_deptType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </section>
                  <section>
                    <span class="search_title">项目负责人</span>
                    <el-select v-model="searchInfo.leader" placeholder="请选择" class="search_width">
                      <el-option
                        v-for="item in search_leader"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </section>
                  <section>
                    <span class="search_title" >兑付年</span>
                    <el-date-picker
                      v-model="searchInfo.payDayBegin"
                      type="year"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      class="search_width">
                    </el-date-picker>
                    <span>~</span>
                    <el-date-picker
                      v-model="searchInfo.payDayEnd"
                      type="year"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      class="search_width">
                    </el-date-picker>
                  </section>
                </div>
                <div class="flex" style="margin-top: 17px">
                  <section>
                    <span class="search_title"  style="margin-left: 0;">受托管理人</span>
                    <el-select v-model="searchInfo.manager" placeholder="请选择" class="search_width">
                      <el-option
                        v-for="item in search_managerType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </section>
                  <section>
                    <span class="search_title">担保机构</span>
                    <el-select v-model="searchInfo.guaranteeCompany" placeholder="请选择" class="search_width">
                      <el-option
                        v-for="item in search_guaranteeCompany"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </section>
                  <section>
                    <span class="search_title" >起息日</span>
                    <el-date-picker
                      v-model="searchInfo.valueDateBegin"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      class="search_width">
                    </el-date-picker>
                    <span>~</span>
                    <el-date-picker
                      v-model="searchInfo.valueDateEnd"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      class="search_width">
                    </el-date-picker>
                  </section>
                </div>
                <div class="flex" style="justify-content: flex-end; margin-top: 17px;">
                  <!-- <section>
                    <span class="search_title"  style="margin-left: 0;"></span>
                    <el-select v-model="value" placeholder="请选择" class="search_width">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </section> -->
                  <!-- <section>
                    <span class="search_title">债券类型</span>
                    <el-select v-model="value" placeholder="请选择" class="search_width">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </section> -->
                  <section>
                    <span class="search_title" >期限</span>
                    <el-input-number v-model="searchInfo.timeLimitBegin" :controls='false' :min="1" class="search_width"></el-input-number>
                    <span>~</span>
                    <el-input-number v-model="searchInfo.timeLimitEnd" :controls='false' :min="1" class="search_width"></el-input-number>
                  </section>
                </div>
              </section>
            </transition>
          </section>
          <section class="flex right">
            <button @click="doAddProject" class="btn primary_btn">新增</button>
             <!-- :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
               :on-exceed="handleExceed" -->
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :show-file-list="false">
              <button class="btn primary_btn">导入</button>
            </el-upload>
            <button class="btn primary_btn">导出</button>
          </section>
        </section>
        <el-table
          :data="tableData"
          style="width: 100%; height: auto; margin-top: 26px;"
          :header-cell-style="{background:'#FFF9F3'}">
          <el-table-column
            type="index"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            label="简称代码"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
              <div style="color: #F88200">{{scope.row.code}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="direct"
            label="地区发行人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="place"
            label="上市场所"
            align="center">
          </el-table-column>
          <el-table-column
            prop="matters"
            label="关联事项"
            align="center">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="项目负责人"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200">
            <template slot-scope="scope">
              <div class="flex">
                <!-- <el-button  class="border_btn">编辑</el-button> -->
                <button class="btn primary_plain_btn" @click="onEditButtonClick">编辑</button>
                <button class="btn primary_btn" >到期</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 20px auto;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageJson.currentPage"
            :page-size="pageJson.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageJson.total">
          </el-pagination>
        </div>
      </div>
    <!-- </div> -->

  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb.vue'
import * as Factory from '@/factory/index'

@Component({
  components: {
    Breadcrumb,
  },
})
export default class Projects extends Vue {
  private isShow: boolean = false
  private tabName: any = ['项目管理']
  private search_province: any[] = []
  private search_listedPlace: any[] = Factory.search_listedPlace()
  private search_deptType: any[] = Factory.search_deptType()
  private search_managerType: any[] = Factory.search_managerType()
  private search_leader: any[] = []
  private search_guaranteeCompany: any[] = []
  private searchInfo: any = {
    name: '',
    province: '',
    listedPlace: '',
    deptType: '',
    leader: '',
    payDayBegin: '',
    payDayEnd: '',
    manager: '',
    guaranteeCompany: '',
    valueDateBegin: '',
    valueDateEnd: '',
    timeLimitBegin: undefined,
    timeLimitEnd: undefined,
  }
  private pageJson: any = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }
  private tableData: any[] = [
    {
      name: '19天风01',
      code: 150001,
      direct: '湖北省武汉市天风证券',
      place: '上交所',
      matters: '（1）发行人募集资金…（2）发行人募集资金…',
      leader: '李天风',
    }, {
      name: '19天风01',
      code: 150001,
      direct: '湖北省武汉市天风证券',
      place: '上交所',
      matters: '（1）发行人募集资金…（2）发行人募集资金…',
      leader: '李天风',
    }, {
      name: '19天风01',
      code: 150001,
      direct: '湖北省武汉市天风证券',
      place: '上交所',
      matters: '（1）发行人募集资金…（2）发行人募集资金…',
      leader: '李天风',
    }, {
      name: '19天风01',
      code: 150001,
      direct: '湖北省武汉市天风证券',
      place: '上交所',
      matters: '（1）发行人募集资金…（2）发行人募集资金…',
      leader: '李天风',
    }, {
      name: '19天风01',
      code: 150001,
      direct: '湖北省武汉市天风证券',
      place: '上交所',
      matters: '（1）发行人募集资金…（2）发行人募集资金…',
      leader: '李天风',
    }, {
      name: '19天风01',
      code: 150001,
      direct: '湖北省武汉市天风证券',
      place: '上交所',
      matters: '（1）发行人募集资金…（2）发行人募集资金…',
      leader: '李天风',
    },
  ]
  private doAddProject() {
    this.$router.push({
      name: 'addProject',
    })
  }
  private handleSizeChange(val: any) {
    console.log(val)
  }
  private handleCurrentChange(val: any) {
    console.log(val)
  }
  private onSearchButtonClick() {
    console.log(this.searchInfo)
  }
  private onEditButtonClick() {
    this.$router.push({
      name: 'addProject',
      query: {
        id: '1',
      }
    })
  }
}
</script>
<style lang="less" scoped>
main{
  .header{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #FFF9F3;
    font-size:16px;
    font-weight:bold;
    color:rgba(76,76,78,1);
  }
  .searchBox{
    margin-top: 20px;
  }
  // .btn{
  //   background: #F88200;
  //   color: #ffffff;
  //   height: 24px;
  //   width:69px;
  //   border: none;
  //   padding: 0;
  // }
  // .bounce-enter-active {
  //   animation: bounce-in 0s;
  // }
  // .bounce-leave-active {
  //   animation: bounce-in 0s reverse;
  // }
  .bounce-enter{
    opacity: 1;
    transform: translateY(-30px)
  }

  .bounce-enter-active, .bounce-leave-active{
    transition: all .5s
  }
  
  .bounce-leave-to{
    opacity: 0;
    transform: translateY(-30px)
  }
  // .bounce-enter-active {
  //   transition: all .3s ease;
  // }
  // .bounce-leave-active {
  //   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  // }
  // .bounce-enter, .bounce-leave-to
  // /* .slide-fade-leave-active for below version 2.1.8 */ {
  //   transform: translateX(10px);
  //   opacity: 0;
  // }
  .transform{
    transition: all .5s;
  }
  .transformGo{
    transform: rotate(-180deg);
    transition: all .5s;
  }
  /deep/.el-table__body tr:hover > td{
      background-color:#FFF9F3 !important;
  }
}
</style>
