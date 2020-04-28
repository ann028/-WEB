<template>
  <main class="center">
    <section class="content col">
      <section class="top flex">
        {{titleText}}
        <img src="../../assets/img/close.png" @click="hide">
      </section>
      <section class="info center col flex1">
        <section class="info_item cross_center">
          <span class="item_name flex1">部门名称</span>
          <el-input class="item_value" v-model="departmentInfo.name"></el-input>
        </section>
      </section>
      <section class="bottom flex center" v-if="modalType !== 'detail'">
        <section class="btns">
          <button class="bottom_btn" @click="save">保存</button>
          <button class="bottom_btn" @click="hide">取消</button>
        </section>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class DeparmentModal extends Vue {
  @Prop()private readonly modalType!: string
  @Prop()private departmentInfo?: any
  private titleText = '部门'
  public hide() {
    this.$emit('hide');
  }
  public save() {
    this.$emit('save', this.departmentInfo)
  }
  private created() {
    switch (this.modalType) {
      case 'add':
        this.titleText = '新增部门'
        break;
      case 'edit':
        this.titleText = '编辑部门'
        break;
      default:
        break;
    }
  }
}
</script>

<style lang="less" scoped>
main{
  width: 100%;
  height: 100%;
  color:rgba(49,50,51,1);
  .content{
    width: 55%;
    min-height: 40%;
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
    .info{
      padding: 20px;
      .info_item{
        font-size: 14px;
        width: 400px;
        margin-bottom: 15px;
        .item_name{
          text-align: end;
        }
        .item_value{
          width: 80%;
          margin-left: 10px;
        }
        .department_children{
          flex-flow: row wrap;
          .department_item{
            border-radius: 8px;
            border: 1px solid #409EFF;
            color: #409EFF;
            padding: 5px;
            margin-right: 5px;
            i{
              cursor: pointer;
              margin-left: 3px;
              &:hover{
                color: red;
              }
            }
          }
        }
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
  }
}
</style>