<template>
  <main>
    <!-- {{roleId}} -->
     <el-table
      :data="roleList"
      style="width: 100%">
      <el-table-column
        label="模块"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
          <div v-if="scope.row.childList.length">
            <div v-for="(item,index) in scope.row.childList" :key="index">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="权限">
      </el-table-column>
    </el-table>
  </main>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import treeTable from '@/components/treeTableAuthor/index.vue'

@Component({
  components: {
    treeTable,
  },
})
export default class RoleSetting extends Vue {
  @Prop() private readonly roleId!: any
  private roleList: any = [
    {
      id: 1,
      keyCode: "prm1000",
      parentCode: "0",
      name: "待办事项",
      childList: [
        {
          id: 9,
          keyCode: "prm1110",
          parentCode: "prm1100",
          name: "督导",
          childList: [
            {
              id: 14,
              keyCode: "prm1111",
              parentCode: "prm1110",
              name: "首页",
              childList: [],
              type: 2,
              url: "/daily/daily/findByPersonal",
              selected: true,
              built: false,
            },
            {
              id: 15,
              keyCode: "prm1112",
              parentCode: "prm1110",
              name: "查看详情",
              childList: [],
              type: 2,
              url: "/daily/daily/findById",
              selected: true,
              built: false,
            },
          ],
          type: 1,
          url: "/daily/daily/findByPersonal",
          selected: true,
          built: false,
        },
        {
          id: 10,
          keyCode: "prm1120",
          parentCode: "prm1100",
          name: "项目负责人",
          childList: [
            {
              id: 20,
              keyCode: "prm1121",
              parentCode: "prm1120",
              name: "首页",
              childList: [],
              type: 2,
              url: "/daily/daily/findByDepartment",
              selected: true,
              built: false,
            },
            {
              id: 21,
              keyCode: "prm1122",
              parentCode: "prm1120",
              name: "查看详情",
              childList: [],
              type: 2,
              url: "/daily/daily/findById",
              selected: true,
              built: false,
            },
            {
              id: 22,
              keyCode: "prm1123",
              parentCode: "prm1120",
              name: "编辑",
              childList: [],
              type: 2,
              url: "/daily/daily/update",
              selected: true,
              built: false,
            },
          ],
          type: 1,
          url: "/daily/daily/findByDepartment",
          selected: true,
          built: false,
        },
      ],
    },
  ]
  private ergodicTree(tree: object[], callback: any = () => {}, props = {id: 'id', childList: 'childList'}) {
    function ergodicTree(tree: object[], depth: number = 0) {
      const treeLength = tree.length;
      for (let i = 0; i < treeLength; i++) {
        const node: any = tree[i];
        // const idPath: any[] = parentIdPath ? [...parentIdPath, node[props.id]] : [node[props.id]];
        const deep: number = depth + 1;
        // node._idPath = idPath;
        node.deep = deep;
        callback(node);
        if (node[props.childList] && node[props.childList] instanceof Array) {
          ergodicTree(node[props.childList],  deep)
        }
      }
    }

    ergodicTree(tree);
    console.log('ergodic', tree)
    return tree;
  }
  private created() {
     this.ergodicTree(this.roleList)
  }
}
</script>
<style lang="less" scoped>

</style>