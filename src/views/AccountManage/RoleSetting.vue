<template>
  <main>
    {{roleId}}
    344444
  </main>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component
export default class RoleSetting extends Vue{
  @Prop() private readonly roleId!: any
}
</script>
<style lang="less" scoped>

</style>