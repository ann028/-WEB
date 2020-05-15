<template>
  <main>
    <section class="tab main_space">
      <section class="flex">
        <section v-for="(item, index) in tabName" :key="index" class="cross_center">
          <span :class="[tabName.length > 1 && index === 0? 'activeTabName' : 'tabName']">{{item}}</span>
          <img  v-if="index !== tabName.length - 1" src="../assets/img/head/icon-enter .png" alt="" style="width: 20px; height: 20px;">
        </section>
      </section>
      <section>
        <button v-if="tabName.length > 1" class="btn primary_btn" @click="$router.go(-1)">返回</button>
      </section>
    </section>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
@Component({})
export default class Step extends Vue {
  @Prop()public tabName!: any;
}
</script>
<style lang="less" scoped>
main{
  .tab{
    margin: 14px 0 20px 0;
  }
  .activeTabName{
    font-size:16px;
    font-weight:bold;
    color:rgba(248,130,0,1);
  }
  .tabName{
    font-size:16px;
    font-weight:bold;
    color:rgba(76,76,78,1);
    line-height:20px;
  }
}
  
</style>
