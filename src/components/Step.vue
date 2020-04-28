<template>
  <div class="Step" style="width: 100%;display:flex;justify-content:space-between;margin-top: 20px">
    <div class="title" style="display:flex">
      <div style="height:100%;margin-right:10px">
        <img :src="imgUrl" alt="" style="width:19px">
      </div>
      <span v-for="(item,index) in stepName" :key="index">
        <span :class="{activeItem:index+1==stepName.length}" >{{item}}</span>
        <span  v-if="index+1!=stepName.length">/</span>
      </span>
    </div>
    <div >
      <button v-if='isExportpdf' class="btn btn_warning btn_con" @click="getPdf" style="margin-right: 10px">导出pdf</button>
      <!-- <button v-if='isExportpdf' class="btn btn_warning btn_con" @click="getWord" style="margin-right: 10px">导出word</button> -->
      <button v-if="isView" class="btn btn_succ_plain btn_con" @click="btnClick" >返回</button>
    </div>
  </div>
    
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
@Component({})
export default class Step extends Vue {
  public message = 'hello';
  @Prop()public stepName!: any;
  @Prop({default: require('../assets/img/activity.png')})private readonly imgUrl ?: string
  @Prop({default: false})private readonly isView ?: boolean
  @Prop({default: ''})private readonly toName ?: string
  @Prop({default: false})private readonly isExportpdf ?: boolean
  private btnClick() {
    if (this.toName) {
      this.$router.push({name: `${this.toName}`})
    } else {
      window.history.go(-1)
    }
  }
  // 导出
  private getWord() {
    const mainRight: HTMLInputElement = document.querySelector('#pdfDom') as HTMLInputElement;
    // console.log(mainRight.innerHTML)
  }
}
</script>
<style lang="less" scoped>
.Step{
  width: 100%;
  // padding: 0 40px;
  // box-sizing: border-box;
  margin: 20px 0 0 0 !important;
 .title{
   padding: 10px;
   box-sizing: border-box;
  //  border-bottom: 2px solid rgba(245,247,250,1);
   span{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(96,98,102,1);
    line-height:21px;
    margin-right:5px;
    .activeItem{
      color:rgba(87,146,252,1)
    }
   
   }
 }
 .btn_con{
   width:76px;
   height:32px
 }
}
</style>
