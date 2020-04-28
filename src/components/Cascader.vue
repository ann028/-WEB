<template>
  <main class="cross_center main_space">
    <!-- {{categoryA}} -->
    <section style="position:relative">
      <div @click.stop="changeShow">
        <input type="text" v-model="category" disabled  class="input_style ll" style="font-size: 14px">
      </div>
      <ul class="ul_style" v-if="isShow">
        <li v-for="(item, index ) in infoList"  :key="index" @click.stop="showItem(item)" :class="['liStyle',item.label === category1?'liStyle1':'']">{{item.label}}</li>
        <li v-if="addCate1" style="margin-bottom: 10px" @click.stop="">
          <input type="text" class="custom_style" v-model="addCategory" placeholder="自定义输入">
          <span @click.stop="submit" style="cursor: pointer">确定</span>
        </li>
      </ul>
      <ul  class="ul_style1" v-if="isShow&&childrenList.length">
        <li v-for="(item,index) in childrenList" :key="index" @click.stop="showItem2(item)" :class="['liStyle',item.label === category2?'liStyle1':'']"> {{item.label}}</li>
        <li v-if="addCate2" style="margin-bottom: 10px">
          <input type="text" class="custom_style" v-model="addCategory1" placeholder="自定义输入">
          <span @click.stop="submitSon" style="cursor: pointer">确定</span>
        </li>
      </ul>
    </section>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
@Component
export default class Cascader  extends Vue {
  @Prop(Array) private readonly departList!: any[]
  @Prop({default: true}) private readonly addCate1?: boolean
  @Prop({default: false}) private readonly addCate2?: boolean
  @Prop({}) private readonly categoryA!: ''
  @Prop({}) private readonly categoryB!: ''
  private isShow: boolean = false
  private infoList: any[] = this.departList || []
  private childrenList: any = []
  private category: any = ''
  private category1: any =  ''
  private category2: any = ''
  private addCategory: any = ''
  private addCategory1: any = ''
  private changeShow() {
    this.isShow = !this.isShow
  }
  @Watch('category1') private categorytt(val: any, old: any) {
    if (this.childrenList.length > 0) {
      if (this.category2) {
        this.$emit('category1', this.category1, this.category2)
      }
    } else {
      this.$emit('category1', this.category1, this.category2)
    }
  }
  @Watch('categoryA') private categoryll(val: any, old: any) {
    if ( this.categoryB ) {
      this.category = this.categoryA + '-' +  this.categoryB
    } else {
      this.category = this.categoryA
    }
  }
  @Watch('departList') private depart(val: any, old: any) {
    this.infoList = val
  }
  private showItem(item: any) {
    this.category1 = ''
    this.category2 = ''
    this.childrenList = []
    if (item.childrenList && item.childrenList.length) {
      this.category1 = item.label
      this.childrenList = item.childrenList
    } else {
      this.category1 = item.label
      this.category = item.label
      this.isShow = false
      this.$emit('category1', this.category1, this.category2)
    }
  }
  private showItem2(item: any) {
    this.category2 = item.label
    for (let i = 0, len = this.infoList.length; i < len; i++) {
      if (this.infoList[i].childrenList && this.infoList[i].childrenList.length) {
        for (let j = 0, len1 = this.infoList[i].childrenList.length; j < len1; j++) {
          if (item.label === this.infoList[i].childrenList[j].label) {
            this.category1 = this.infoList[i].label
          }
        }
      }
    }
    this.category =  this.category1 + '-' + this.category2
    this.isShow = false
    this.$emit('category1', this.category1, this.category2)
  }
  private submit() {
    this.category1 = this.addCategory
    this.category = this.category1
    this.addCategory = ''
    this.isShow = false
  }
  private submitSon() {
    this.category2 = this.addCategory1
    this.category = this.category1 + '-' + this.category2
    this.addCategory1 = ''
    this.isShow = false
  }
  private created() {
     if ( this.categoryB ) {
      this.category = this.categoryA + '-' +  this.categoryB
    } else {
      this.category = this.categoryA
    }
  }
}
</script>

<style lang="less" scoped>
main{
  font-size: 14px;
ul, li{
  list-style: none;
  padding: 0;
  margin: 0;
}
ul > li {
  height:40px;
  padding-left: 20px;
  box-sizing: border-box
}
input::-webkit-input-placeholder{
  color:#C0C4CC;
}
.input_style{
  width:224px;
  height:32px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(228,231,237,1);
  line-height: 50px;
  position: relative;
  flex-shrink: 0;
  padding-left: 15px;
  box-sizing: border-box;
  color:#606266;
}
 .ul_style{
    width: 224px;
    min-height: 200px;
    max-height: 200px;
    background: #fff;
    margin-top:32px;
    position: absolute;
    top: 20px;
    // left:0;
    z-index:9999;
    box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
    overflow-y: scroll;
    font-size:  14px;
  }
//   .ul_style::-webkit-scrollbar {
//     display: none;
// }
  .ul_style1{
    width: 224px;
    min-height:200px;
    max-height: 200px;
    background: #fff;
    margin-top:32px;
    position: absolute;
    top: 20px;
    left:224px;
    z-index:9999;
    box-shadow:0px 2px 10px 0px rgba(153,153,153,0.2);
    overflow-y: scroll;
  }
  .custom_style{
    width:140px;
    height: 20px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(228,231,237,1);
    margin-right: 10px
  }
}
.liStyle1{
  color: #5792FC;
  background: #F8FAFE
}
.liStyle:hover{
  color: #5792FC;
  background: #F8FAFE
}
</style>