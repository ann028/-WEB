<template>
  <main class="content bg">
    <div>
      <section class="header">项目管理</section>
      <section class="searchBox main_space">
        <section class="left">
          <section  class="flex">
            <el-input v-model="input" placeholder="债券代码/简称/发行人" class="input_width"></el-input>
            <section style="margin-left: 10px;">
              <span class="search_title">地区</span>
              <el-select v-model="value" placeholder="请选择" class="search_width">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </section>
            <section style="margin-left: 10px;">
              <span class="search_title">上市场所</span>
              <el-select v-model="value" placeholder="请选择" class="search_width">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </section>
            <button class="btn primary_btn">查询</button>
            <img src="../../assets/img/project/chevrons-down-orange.png" :class="[isShow ? 'transformGo' : 'transform']" @click="isShow = !isShow" style="width: 20px; height: 20px; margin: auto 0;">
          </section>
          <transition name="bounce"  v-if="isShow">
            <section>
              <div class="flex" style="margin-top: 17px">
                <section>
                  <span class="search_title"  style="margin-left: 0;">债券类型</span>
                  <el-select v-model="value" placeholder="请选择" class="search_width">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </section>
                <section>
                  <span class="search_title">项目负责人</span>
                  <el-select v-model="value" placeholder="请选择" class="search_width">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </section>
                <section>
                  <span class="search_title" >兑换年</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    class="search_width">
                  </el-date-picker>
                  <span>~</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    class="search_width">
                  </el-date-picker>
                  <!-- <el-select v-model="value" placeholder="请选择" class="search_width">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                </section>
              </div>
              <div class="flex" style="margin-top: 17px">
                <section>
                  <span class="search_title"  style="margin-left: 0;">受托管理人</span>
                  <el-select v-model="value" placeholder="请选择" class="search_width">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </section>
                <section>
                  <span class="search_title">担保机构</span>
                  <el-select v-model="value" placeholder="请选择" class="search_width">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </section>
                <section>
                  <span class="search_title" >起息日</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    class="search_width">
                  </el-date-picker>
                  <span>~</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
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
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    class="search_width">
                  </el-date-picker>
                  <span>~</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    class="search_width">
                  </el-date-picker>
                </section>
              </div>
            </section>
          </transition>
        </section>
        <section class="flex right">
          <button @click="doAddProject" class="btn primary_btn">新增</button>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :show-file-list="false"
            :on-exceed="handleExceed">
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
              <button class="btn primary_plain_btn">编辑</button>
              <button class="btn primary_btn" >到期</button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px auto;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>

  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class Projects extends Vue {
  private isShow: boolean = false
  private tableData: Array<any> = [
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
  .bounce-enter-active {
    animation: bounce-in 0s;
  }
  .bounce-leave-active {
    animation: bounce-in 0s reverse;
  }
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
