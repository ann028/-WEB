<template>
  <main>
   <div class="toBack">
     back
   </div>
  </main>
</template>
// <script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
@Component({
  components: {

  }
})
export default class ScrollToTop extends Vue {
  private mounted(){
    console.log('111111111', window)
    window.addEventListener('scroll', this.scrollToTop, true)
  }
  private scrollToTop() {
　　var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
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