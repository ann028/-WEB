<template>
  <main v-if="roleId" >
    <el-tree
    :key="roleId"
    class="flex mt20"
    :data="rolePermission"
    ref="tree"
    show-checkbox
    node-key="id"
    :default-checked-keys="selectedPermissionId"
    ></el-tree>
    <section class="main_center mt20 mb20">
      <button class="bottom_btn" @click="save">保存权限设置</button>
    </section>
  </main>
  <main v-else>
    <h2>
      请在左侧选中一个角色
    </h2>
  </main>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import { role } from '@/api'
@Component
export default class RoleSetting extends Vue {
  @Prop(Array) private readonly rolePermission!: any[]
  @Prop() private readonly roleId!: any
  private selectedPermissionId: number[] = []
  private save() {
    this.$emit('save', this.getCheckedNodes())
  }
  private getCheckedNodes() {
    const tree: any = this.$refs.tree
    return tree.getCheckedNodes()
  }
  @Watch('rolePermission') private roleChange(val: number, oldVal: any) {
    const selectedPermission: any[] = []
    const setTree = (list: any) => {
      list.forEach((ele: any) => {
        if (ele.selected) {
          selectedPermission.push(ele)
        } else if (ele.children.length) {
          setTree(ele.children)
        }
      })
    }
    setTree(this.rolePermission)
    this.selectedPermissionId = selectedPermission.map((ele: any) => {
      return ele.id
    })
  }
}
</script>

<style lang="less" scoped>
main{
  // overflow-x: scroll;
  // padding-left:340px;
  // box-sizing: border-box;
  .bottom_btn{
    border-radius:4px;
    padding: 10px 32px;
    cursor: pointer;
    color:rgba(255,255,255,1);
    background:rgba(87,146,252,1);
    border:1px solid rgba(87,146,252,1);
  }
  h2{
    margin-left: 20%;
    color:#E6A23C;
  }
}
</style>