<template>
  <div style="background: rgb(255, 252, 249); border-radius: 8px; padding: 10px 20px 10px 0px; box-sizing: border-box;">
    <el-form :model="materialContentForm" :rules="materialContentRules" ref="remindRulersForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="所需材料" prop="needData" class="mt20">
        <div>
          <input type="button" value="新增"  class="btn primary_btn" style="float: right; margin-bottom: 20px;">
          <table>
            <tbody>
              <tr>
                <td>1</td>
                <td>这是一个word文档，很长很长的名字的文件是什么样子的呢，大概就是这样的吧…</td>
                <td>下载</td>
                <td>删除…</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class BasicInfo extends Vue {
  private materialContentForm: any = {
    needData: []
  }
  private materialContentRules: any = {
    needData: {
      required: true, message: '请选择', trigger: 'change'
    }
  }
}
</script>