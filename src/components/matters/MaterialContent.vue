<template>
  <div style="padding: 10px 0; box-sizing: border-box;">
    <el-form :model="materialContentForm" :rules="materialContentRules" ref="materialContentForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="所需材料" prop="needData" class="mt20">
        <div>
          <input type="button" value="新增"  class="btn primary_btn" style="float: right; margin-bottom: 20px;">
          <!-- <table>
            <tbody>
              <tr>
                <td>1</td>
                <td>这是一个word文档，很长很长的名字的文件是什么样子的呢，大概就是这样的吧…</td>
                <td>下载</td>
                <td>删除…</td>
              </tr>
            </tbody>
          </table> -->
           <el-table
            :data="materialContentForm.needData"
            style="width: 100%">
             <el-table-column
              type="index"
              width="100">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name">
              <template slot-scope="scope">
                <div class="cross_center">
                  <img src="../../assets/img/matter/Microsoft-Excel.png" alt="" style="margin-right: 20px;">
                  <span>{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="100">
              <template slot-scope="scope">
                <div class="main_space">
                  <img src="../../assets/img/matter/download.png" alt="">
                  <img src="../../assets/img/matter/trash.png">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
       <el-form-item label="事项内容" prop="editor" style="position: relative;">
        <!-- <vue-editor></vue-editor> -->
        <!-- <div id="editor"  style="width: 700px; margin-top: 40px;"></div> -->
        <Editor v-bind:value = "materialContentForm.editor" @change="changeParent"></Editor>
        <div style="position: absolute; top: 30px; left: 730px;">
          <el-popover
            placement="right-start"
            width="200"
            trigger="hover">
            <div>
              <p>通过<span style="color: red">{ }</span>引用项目中的元素，例如{债券简称}</p>
              <p>可引用元素如下：</p>
              <p style="margin-left: 30px;">· 债券简称</p>
              <p style="margin-left: 30px;">· 付息日</p>
            </div>
            <!-- <el-button >hover 激活</el-button> -->
            <img src="../../assets/img/project/icon-guid.png" alt="" slot="reference">
          </el-popover>
         </div>
         
       </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Validation from '../../validate/validation'
import { VueEditor } from "vue2-editor";
import Editor from './wangEditor.vue'

@Component({
  components: {
    Editor,
  },
})
export default class BasicInfo extends Vue {
  private editorConfig: any = ''
  private materialContentForm: any = {
    needData: [
      {
        date: '1222',
        name: 'word文档',
      },
    ],
    editor: '',
  }
  private materialContentRules: any = {
    needData: {
      required: true, validator: Validation.validateMobile, trigger: 'change',
    },
    editor: {
      required: true, validator: Validation.validateEmpty, trigger: 'blur',
    },
  }

  private mounted() {
    // const E = require('wangeditor');
    // // 创建编辑器
    // const editor = new E('#editor');
    // // console.log('editor1', editor);
    // // this.editorConfig = editor;
    // editor.customConfig.uploadImgShowBase64 = true;  // 使用 base64 保存图片
    // // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    // editor.customConfig.showLinkImg = false;
    // editor.customConfig.customUploadVideo = true;
    // editor.customConfig.menus = [
    //     'head',
    //     'bold',
    //     'fontSize',  // 字号
    //     'fontName',  // 字体
    //     'italic',  // 斜体
    //     'underline',  // 下划线
    //     'strikeThrough',  // 删除线
    //     'foreColor',  // 文字颜色
    //     'backColor',  // 背景颜色
    //     'link',  // 插入链接
    //     'list',  // 列表
    //     'justify',  // 对齐方式
    //     'quote',  // 引用
    //     'emoticon',  // 表情
    //     'image',  // 插入图片
    //     'table',  // 表格
    //     // 'video',  // 插入视频
    //     'code',  // 插入代码
    //     'undo',  // 撤销
    //     'redo',  // 重复
    // ];
    // // const editor = new E('#editor');
    // editor.customConfig.onchange = (html: any) => {
    //   this.materialContentForm.editor = html
    //   const materialContentValidate: any = this.$refs.materialContentForm
    //   materialContentValidate.validateField('editor')
    // };

    // editor.create();
    // // editor.txt.html('')
  }

  private changeParent(val: any) {
    console.log(val, '========')
    this.materialContentForm.editor = val
    const materialContentValidate: any = this.$refs.materialContentForm
    materialContentValidate.validateField('editor')
  }
}
</script>
<style lang="less" scoped>
/deep/.has-gutter{
  display: none;
}
</style>