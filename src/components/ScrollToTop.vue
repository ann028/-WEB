<template>
  <main>
   <div class="toBack">
     <el-backtop target=".content" :right="400">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
        }"
      >
      <i class="el-icon-caret-top"></i>
    </div>
     </el-backtop>
   </div>
  </main>
</template>
// <script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
@Component({
  components: {

  },
})
export default class ScrollToTop extends Vue {
  private mounted() {
    window.addEventListener('scroll', this.scrollToTop, true)
  }
  private scrollToTop() {
    const scrolltop =   window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    console.log(scrolltop)
  }
}
</script>
<style lang="less" scoped>
.toBack{
  position: fixed;
  bottom: 50px;
  right: 360px;
}
</style>