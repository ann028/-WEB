<template>
  <main class="center">
    <section class="content col">
      <section class="top flex">
        <span></span>
        <img src="../../assets/img/close.png" @click="hide">
      </section>
      <section class="flex main_center" style="padding: 20px 0; box-sizing: border-box;">
        <div v-if="rowInfo.param === 'LATEST_TRADING_DAY|_DATE_CONTROL' " class="main_center">
          <section style="margin-right: 20px; line-height: 50px;">交易日期</section>
          <section>
            <el-radio-group v-model="radio" @change="changeRadio" class="radioBox">
              <el-radio :label="1" class="radioStyle">最新收盘日</el-radio>
              <el-radio :label="2" class="radioStyle">
                <el-date-picker
                  v-model="paramValue"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-radio>
            </el-radio-group>
          </section>
        </div>
        <div v-else-if="rowInfo.param === '_DATE_CONTROL_START|_DATE_CONTROL_END' " class="main_center">
          <section style="margin-right: 20px; line-height: 50px;">区间日期</section>
          <section>
            <el-radio-group v-model="radio" @change="changeRadio" class="radioBox">
              <el-radio :label="1" class="radioStyle">最近一年</el-radio>
              <el-radio :label="2" class="radioStyle">
                <el-date-picker
                  v-model="paramValue"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-radio>
            </el-radio-group>
          </section>
        </div>
        <div v-else-if="rowInfo.param === '_DATE_CONTROL_END' " class="main_center">
          <section style="margin-right: 20px; line-height: 50px;">截止交易日期</section>
          <section>
            <el-radio-group v-model="radio" @change="changeRadio" class="radioBox">
              <el-radio :label="1" class="radioStyle">最新收盘日</el-radio>
              <el-radio :label="2" class="radioStyle">
                <el-date-picker
                  v-model="paramValue"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-radio>
            </el-radio-group>
          </section>
        </div>
        <div v-else-if="rowInfo.param === 'THIS_YEAR|_TEXT_CONTROL' " class="case1 main_center">
          <section style="margin-right: 20px; line-height: 50px;">年度</section>
          <section>
            <el-radio-group v-model="radio" @change="changeRadio" class="radioBox">
              <el-date-picker
                v-model="paramValue"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </el-radio-group>
          </section>
        </div>
      </section>
      <section class="bottom flex center">
        <section class="btns">
          <button class="bottom_btn" @click="save">保存</button>
          <button class="bottom_btn" @click="hide">取消</button>
        </section>
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import {Vue, Watch, Component, Prop} from 'vue-property-decorator'
@Component
export default class Paramdialog extends Vue {
  @Prop() private rowInfo !: any
  private radio: any = 1
  private paramValue: any = ''
  private hide() {
    this.$emit('hide')
  }
  private save() {
    let paramCopy;
    let paramDisplay;
    if (this.rowInfo.param === 'LATEST_TRADING_DAY|_DATE_CONTROL') {
      if (this.radio === 1) {
        paramCopy = 'LATEST_TRADING_DAY',
        paramDisplay = '最新收盘日'
      } else {
        paramCopy = this.paramValue;
        paramDisplay = this.paramValue
      }
      this.$emit('save', {
        ...this.rowInfo,
        paramValue: paramCopy,
        paramDisplay: paramDisplay,
      })
    } else if (this.rowInfo.param === 'THIS_YEAR|_TEXT_CONTROL') {
      if (!this.paramValue) {
        this.$message.error(`请选择年度`)
      } else {
        paramCopy = this.paramValue.getFullYear();
        this.$emit('save', {
          ...this.rowInfo,
          paramValue: paramCopy,
          paramDisplay: paramCopy,
        })
      }
    } else if (this.rowInfo.param === '_DATE_CONTROL_END') {
      paramCopy = this.paramValue;
      this.$emit('save', {
        ...this.rowInfo,
        paramValue: paramCopy,
        paramDisplay: paramCopy,
      })
    } else if (this.rowInfo.param === '_DATE_CONTROL_START|_DATE_CONTROL_END') {
      if (this.radio === 1) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate();
        paramCopy = `${year - 1}-${month}-${day},${year}-${month}-${day}`
        this.$emit('save', {
          ...this.rowInfo,
          paramValue: paramCopy,
          paramDisplay: '最近一年',
        })
      } else {
        if (!this.paramValue) {
          this.$message.error(`请选择日期`)
        } else {
          paramCopy = this.paramValue.join(',')
          this.$emit('save', {
            ...this.rowInfo,
            paramValue: paramCopy,
            paramDisplay: paramCopy,
          })
        }
      }
    }
  }
  // 单选切换
  private changeRadio(val: any) {}
}
</script>
<style lang="less" scoped>
main {
  .content{
    width: 610px;
    // min-height: 50%;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    .top{
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      border-bottom: 1px solid rgba(234,234,234,1);
      img{
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
    .case1 {
      align-items: center;
    }
  }
  .bottom{
      height: 120px;
      border-top: 1px solid rgba(234,234,234,1);
      .btns{
        font-size:14px;
        .bottom_btn{
          border-radius:4px;
          padding: 10px 32px;
          cursor: pointer;
        }
        .bottom_btn:nth-child(1){
          color:rgba(255,255,255,1);
          background:rgba(87,146,252,1);
          border:1px solid rgba(87,146,252,1);
        }
        .bottom_btn:nth-child(2){
          margin-left: 80px;
          color:rgba(144,147,153,1);
          background:rgba(255,255,255,1);
          border:1px solid rgba(192,196,204,1);
        }
      }
  }
  .radioBox{
    .radioStyle{
      /deep/ .el-date-editor {
        height: 32px;
        line-height: 32px;
        .el-input__icon {
          line-height: 32px;
        }
      }
      display: block;
      line-height: 50px;
      // height: 50px;
      // /deep/.el-input__icon{
      //   // line-height: 50px;
      // }
    }
  }
}
</style>