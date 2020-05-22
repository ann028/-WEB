<template>
  <main>
    用户管理
    <!-- <tree-table :data="data" :columns="columns" border @getAuth="getAuth"></tree-table> -->
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import treeTable from '@/components/treeTableAuthor/index.vue'
@Component({
  components: {
    treeTable,
  },
})
export default class UserManage extends Vue {
  private columns:any = [
    {
      text: '菜单列表',
      value: 'description',
      width: 200,
      option: 'sonData1'
    },
    {
      text: '功能权限',
      value: 'sonData1',
      option: 'sonData1',
      act: 'act'
    }
  ]
  private data:any = [
    {
      type: 0,
      'checked': false,
      'id': '1',
      'description': '用户管理',
      isIndeterminate: false,
      checkAll: false,
      act: '全选',
      children: [
        {
          type: 1,
          id: 6,
          'description': '用户列表',
          'parentId': '-1',
          'checked': false,
          selectchecked: ['7'],
          checkAll: false,
          isIndeterminate: false,
          'sonData1': [
            {
              type: 2,
              'description': '用户新增',
              'parentId': '6',
              'checked': false,
              'id': '7'
            },
            {
              type: 2,
              'description': '用户修改',
              'parentId': '6',
              'checked': false,
              'id': '8'
            },
            {
              type: 2,
              'description': '用户删除',
              'parentId': '6',
              'checked': false,
              'id': '9'
            }
          ]
        },
        {
          type: 1,
          id: 13,
          'description': '角色列表',
          'parentId': '-1',
          'checked': false,
          selectchecked: ['10', '11', '12'],
          checkAll: false,
          isIndeterminate: false,
          'sonData1': [
            {
              type: 2,
              'description': '角色授权',
              'parentId': '6',
              'checked': false,
              'id': '10'
            },
            {
              type: 2,
              'description': '角色修改',
              'parentId': '6',
              'checked': false,
              'id': '11'
            },
            {
              type: 2,
              'description': '角色删除',
              'parentId': '6',
              'checked': false,
              'id': '12'
            }
          ]
        }
      ]
    },
    {
      type: 0,
      'checked': false,
      'id': '2',
      'description': '设备管理',
      isIndeterminate: false,
      checkAll: false,
      act: '全选',
      children: [
        {
          type: 1,
          id: 6,
          'description': '设备列表',
          'parentId': '-1',
          'checked': false,
          selectchecked: [],
          checkAll: false,
          isIndeterminate: false,
          'sonData1': [
            {
              type: 2,
              'description': '设备新增',
              'parentId': '6',
              'checked': false,
              'id': '17'
            },
            {
              type: 2,
              'description': '设备修改',
              'parentId': '6',
              'checked': false,
              'id': '18'
            },
            {
              type: 2,
              'description': '设备删除',
              'parentId': '6',
              'checked': false,
              'id': '19'
            }
          ]
        }
      ]
    }
  ]
  private getAuth (data: any) {
    let opt: any = []
    data.forEach((val: any) => {
      opt.push(val.id)
      if (val.children) {
        val.children.forEach((el: any) => {
          console.log(val.id)
          if (el.selectchecked.length) {
            opt.push(el.id)
            opt.push(el.selectchecked)
          }
        })
      }
    })
    console.log(data)
    opt = opt.join().split(',').filter((n: any) => { return n })
    console.log(opt)
  }
}
</script>
<style lang="less" scoped>

</style>