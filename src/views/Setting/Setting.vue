<template>
  <main class="container col">
    <Step :stepName="message" :imgUrl="imgUrl"></Step>
    <section class="col">
      <section class="setting_name cross_center" style="margin-top:20px">周报统计时间</section>
      <section class="setting_content">
        <span class="mr20">
          <span class="mark">*</span>每周一
        </span>
        <el-time-select
          v-model="weeklyTime.value"
          placeholder="选择时间"
          :picker-options="{
            start: '5:00',
            step: '00:05',
            end: '24:00'
          }"
          @change="changeTime"
          :clearable="false"
          class="setting_time mr20"
        ></el-time-select>
        <span class="setting_mark">备注：{{weeklyTime.des}}</span>
      </section>
    </section>
    <section class="col">
      <section class="setting_name cross_center" style="position: relative">
        周报达标值
        <div v-if="isWeeklyedit" class="icon1 addIcon1" @click="addItem">+</div>
        <img
          v-else
          @click="editWeekly"
          src="../../assets/img/editor.png"
          alt
          style="position: absolute;left:110px;top: 6px;cursor:pointer;"
        />
      </section>
      <!-- <section class="content flex" v-if="standArr.length === 0">
        <section class="flex">
          <span class="content_title">部门</span>
          <el-select v-model="addInfo.departmentId" placeholder="请选择" class="setting_time">
            <el-option
              v-for="item in departName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <section class="flex">
          <span class="content_title">平均每周面访次数
            <img src="../../assets/img/greater.png" alt="" class="greater">
          </span>
          <el-input v-model="addInfo.interviewTime"  placeholder="请输入内容" class="setting_time"></el-input>
        </section>
        <section class="flex">
          <span class="content_title">平均每周上线次数
            <img src="../../assets/img/greater.png" alt="" class="greater">
          </span>
          <el-input v-model="addInfo.onlineTime"  placeholder="请输入内容" class="setting_time"></el-input>
        </section>
          <div class="icon addIcon" @click="addItem" >+</div>
      </section>-->
      <section class="content flex" v-for="(item,index) in standArr" :key="index">
        <section class="flex">
          <span class="content_title">部门</span>
          <span v-if="!isWeeklyedit" class="setting_time">{{item.departName}}</span>
          <el-select
            v-else
            v-model="item.departmentId"
            @change="changeDepart"
            placeholder="请选择"
            class="setting_time"
          >
            <el-option
              v-for="item in departName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </section>
        <section class="flex">
          <span class="content_title">
            平均每周面访次数
            <img src="../../assets/img/greater.png" alt class="greater" />
          </span>
          <span v-if="!isWeeklyedit" class="setting_time">{{item.interviewTime}}</span>
          <!-- <el-input-number v-model="item.interviewTime"  :min="1" :max="10"></el-input-number> -->
          <el-input
            v-else
            v-model.number="item.interviewTime"
            placeholder="请输入内容"
            class="setting_time"
          ></el-input>
        </section>
        <section class="flex">
          <span class="content_title">
            平均每周线上沟通次数
            <img src="../../assets/img/greater.png" alt class="greater" />
          </span>
          <span v-if="!isWeeklyedit" class="setting_time">{{item.onlineTime}}</span>
          <!-- <el-input-number v-model="item.onlineTime"  :min="1" :max="10"></el-input-number> -->
          <el-input
            v-else
            v-model.number="item.onlineTime"
            placeholder="请输入内容"
            class="setting_time"
          ></el-input>
        </section>
        <!-- <div v-if='index === 0' class="icon addIcon" @click="addItem">+</div> -->
        <div v-if="isWeeklyedit" class="icon delIcon" @click="delItem(item.id,index)">-</div>
      </section>
    </section>
    <section v-if="standArr.length> 0 && isWeeklyedit" class="main_center">
      <button class="btn btn_primary" @click="Preservation">保存</button>
    </section>
    <section class="col">
      <section class="setting_name cross_center" style="position: relative">
        【销售记录/ 股份转让】可选部门人员
        <img
          v-if="!isSaleinfo"
          src="../../assets/img/editor.png"
          alt
          @click="isSaleinfo = true"
          style="position: absolute;left:298px;cursor:pointer;"
        />
      </section>
      <section class="content">
        <section class="flex">
          <span class="content_title">部门</span>
          <span v-if="!isSaleinfo" class="setting_time">{{saleInfo.departmentName}}</span>
          <el-select v-else v-model="saleInfo.departmentId" placeholder="请选择" class="setting_time">
            <el-option
              v-for="item in departName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </section>
      </section>
      <section v-if="isSaleinfo" class="main_center">
        <button class="btn btn_primary" @click="saveSaleInfo">保存</button>
      </section>
    </section>
    <section class="col">
      <section class="setting_name cross_center" style="margin-top:20px">产品近期开放标准</section>
      <section class="setting_content">
        '上一开放退出期'前
        <el-input-number
          v-model="openperiodTime.value"
          :controls="false"
          @change="changeOpenperiod"
          style="margin: 0 10px;width:60px"
        ></el-input-number>天，为近期要开放的产品
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Step from "@/components/Step.vue";
import { daily, user, product } from "../../api";
@Component({
  components: {
    Step,
  },
})
export default class Setting extends Vue {
  private message = ["系统设置"];
  private imgUrl = require("../../assets/img/icon_setting.png");
  private weeklyTime: any = {
    value: "",
    des: "",
  };
  private openperiodTime: any = {
    value: "",
    des: "",
  };
  private departName: any[] = [];
  private standArr: any[] = [];
  private addInfo = {
    departmentId: "",
    interviewTime: "",
    onlineTime: "",
  };
  private departmentId = "";
  private interviewTime = "";
  private onlineTime = "";
  private currentDepart = "";
  private isWeeklyedit: boolean = false;
  private get showHeader() {
    return this.$store.state.showHeader;
  }
  // 销售记录/股份
  private saleInfo: any = {
    departmentId: "",
    departmentName: "",
  };
  private isSaleinfo: boolean = false;
  // 获取系统时间
  private async getTime() {
    const res: any = await daily.getSystime();
    this.weeklyTime = res.data.data[0];
    this.openperiodTime = res.data.data[1] ? res.data.data[1] : {};
  }
  // 查询所有日报达标值
  private async findAllvalue() {
    const res: any = await daily.findStand();
    let stanArr1: any = [];
    stanArr1 = res.data.data;
    for (let i = 0, len = stanArr1.length; i < len; i++) {
      for (let j = 0, lenj = this.departName.length; j < lenj; j++) {
        if (this.departName[j].value === stanArr1[i].departmentId) {
          stanArr1[i].departName = this.departName[j].label;
        }
      }
    }
    this.standArr = stanArr1;
  }
  // 获取部门树
  private async getDeparttree() {
    const res: any = await daily.geDeptree();
    const res1: any = res.data.data.childList;
    const arr: any[] = [];
    for (let i = 0, len = res1.length; i < len; i++) {
      arr.push({
        label: res1[i].name,
        value: res1[i].id,
      });
    }
    this.departName = arr;
    this.findAllvalue();
    this.getSaleinfo();
  }
  // 添加达标值
  private async addItem() {
    this.standArr.push({
      departmentId: this.addInfo.departmentId,
      interviewTime: this.addInfo.interviewTime,
      onlineTime: this.addInfo.onlineTime,
    });
  }
  // 修改部门
  private changeDepart(val: any) {
    this.currentDepart = val;
  }
  // 删除达标值
  private async delItem1(id: any, i: any) {
    const res: any = await daily.deleteStand(`id=${id}`);
    const { code, msg, success } = res.data;
    if (success) {
      this.$message.success(`删除成功`);
      this.findAllvalue();
    } else {
      this.$message.error(`删除失败`);
    }
  }
  private delItem(id: any, i: any) {
    if (id) {
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delItem1(id, i);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    } else {
      this.standArr.splice(i, 1);
      if (this.standArr.length === 0) {
        this.isWeeklyedit = false;
      }
    }
  }
  // 编辑-保存
  private async Preservation() {
    if (this.standArr.length > 0) {
      for (let i = 0, len = this.standArr.length; i < len; i++) {
        if (
          !this.standArr[i].departmentId ||
          !this.standArr[i].interviewTime ||
          !this.standArr[i].onlineTime
        ) {
          this.$message.error(`存在未填写选项,请完善`);
          return false;
        }
      }
      for (let i = 0, len = this.standArr.length - 1; i < len; i++) {
        if (this.standArr[i].departmentId === this.currentDepart) {
          this.$message.warning(`部门周报达标值添加重复，请重新选择`);
          // this.standArr.splice(i , 1)
          return false;
        }
      }
      const res: any = await daily.addStand(this.standArr);
      const { code, msg, success } = res.data;
      if (success) {
        this.$message.success(`添加成功`);
        this.findAllvalue();
        this.isWeeklyedit = false;
      } else {
        this.$message.error(`${msg}`);
      }
    } else {
      if (
        this.addInfo.departmentId === "" ||
        this.addInfo.departmentId === "" ||
        this.addInfo.departmentId === ""
      ) {
        this.$message.warning("请填写完整！");
      } else {
        const arr: any[] = [];
        arr.push(this.addInfo);
        const res: any = await daily.addStand(arr);
        const { code, msg, success } = res.data;
        if (success) {
          this.$message.success(`添加成功`);
          this.findAllvalue();
          this.isWeeklyedit = false;
        } else {
          this.$message.error(`${msg}`);
        }
      }
    }
  }
  // 编辑按钮
  private editWeekly() {
    this.isWeeklyedit = true;
    if (this.standArr.length === 0) {
      this.addItem();
    }
  }
  // 查询销售记录
  private async getSaleinfo() {
    product.getSaledepart(`type=SALES_RECORD`).then((res) => {
      for (let i = 0, len = this.departName.length; i < len; i++) {
        if (res.data.data[0].departmentId === this.departName[i].value) {
          this.saleInfo.departmentId = this.departName[i].value;
          this.saleInfo.departmentName = this.departName[i].label;
        }
      }
    });
    // const res: any = await product.getSaledepart(`type='SALES_RECORD`)
    // for (let i = 0, len = this.departName.length; i < len; i++) {
    //   if (res.data.data[0].departmentId === this.departName[i].value) {
    //     this.saleInfo.departmentId = this.departName[i].value
    //     this.saleInfo.departmentName = this.departName[i].label
    //   }
    // }
  }
  // 保存销售记录
  private async saveSaleInfo() {
    const res: any = await product.assSalesetting({
      departmentIds: [this.saleInfo.departmentId],
      type: "SALES_RECORD",
    });
    if (res.data.success) {
      this.$message.success(`添加成功!`);
    } else {
      this.$message.error(`${res.data.msg}`);
    }
    this.getSaleinfo();
    this.isSaleinfo = false;
  }
  // 修改时间
  private changeTime(val: any) {
    daily.updateSystime(this.weeklyTime).then((res) => {
      if (res.data.success) {
        this.$message.success(`'周报统计时间'修改成功`);
        return false;
      } else {
        this.$message.warning(`${res.data.msg}`);
        return false;
      }
    });
  }
  // 修改开放期标准
  private changeOpenperiod(val: any) {
    daily.updateSystime(this.openperiodTime).then((res) => {
      if (res.data.success) {
        this.$message.success(`'近期开放标准'修改成功`);
        return false;
      } else {
        this.$message.warning(`${res.data.msg}`);
        return false;
      }
    });
  }
  private created() {
    this.getDeparttree();
    // this.findAllvalue()
    // this.getSaleinfo()
    this.getTime();
  }
}
</script>
<style lang="less" scoped>
main {
  // /deep/ .el-date-editor .el-range-separator,.el-input__icon{
  //   height:32px
  // }
  /deep/ .el-input__icon {
    height: auto;
    // line-height: 32px;
  }
  .setting_name {
    font-size: 16px;
    color: rgba(49, 50, 51, 1);
    margin-bottom: 25px;
    &::before {
      content: "";
      margin-right: 12px;
      width: 4px;
      height: 24px;
      background: rgba(114, 159, 236, 1);
      border-radius: 100px;
    }
  }
  .setting_time {
    width: 224px !important;
  }
  .setting_content {
    padding-left: 40px;
    margin-bottom: 25px;
    box-sizing: border-box;
    line-height: 32px;
    display: flex;
    justify-content: flex-start;

    .setting_mark {
      font-size: 14px;
      color: rgba(144, 147, 153, 1);
    }
  }
  .content {
    width: 90%;
    height: 72px;
    margin-left: 20px;
    padding: 0 40px;
    box-sizing: border-box;
    background: rgba(245, 247, 250, 1);
    box-shadow: 0px 2px 10px 0px rgba(153, 153, 153, 0.2);
    border-radius: 12px;
    line-height: 72px;
    margin-bottom: 20px;
    justify-content: space-between;
    font-size: 14px;
    position: relative;
    .content_title {
      margin-right: 10px;
      flex-shrink: 0;
    }
    .greater {
      width: 8px;
      height: 11px;
    }
    .icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      position: absolute;
      right: -13px;
      top: 25px;
      font-size: 25px;
      color: #ffffff;
      text-align: center;
      line-height: 22px;
      cursor: pointer;
    }
    .addIcon {
      background: rgba(87, 146, 252, 1);
    }
    .delIcon {
      background: rgba(245, 108, 108, 1);
    }
  }
  .icon1 {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    left: 105px;
    top: 1px;
    font-size: 25px;
    color: #ffffff;
    text-align: center;
    line-height: 22px;
    cursor: pointer;
  }
  .addIcon1 {
    background: rgba(87, 146, 252, 1);
  }
}
</style>