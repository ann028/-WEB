<template>
  <div style="background: #ffffff; padding: 10px 0; box-sizing: border-box;">
    <section class="searchBox main_space">
      <section class="left">
        <section  class="flex">
          <el-input v-model="input" placeholder="发行人" class="input_width"></el-input>
          <button class="btn primary_btn">查询</button>
          <img src="../../assets/img/project/chevrons-down-orange.png" :class="[isShow ? 'transformGo' : 'transform']" @click="isShow = !isShow" style="width: 20px; height: 20px; margin: auto 0;">
        </section>
      </section>
      <section class="flex right">
          <!-- :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
            :on-exceed="handleExceed" -->
          <div style="position: relative;" @mouseenter="onEnterUploadButton"  @mouseleave="onLeaveUploadButton">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :show-file-list="false">
              <button class="btn primary_btn"  style="margin-left: 0;">导入</button>
            
            </el-upload>
            <div v-if="isShowUploadButton" class="uploadButton" @click="onUploadButtonClick">
              下载模板
            </div>
        </div>
        <button class="btn primary_btn">关联</button>
        <button class="btn primary_btn">取消关联</button>
      </section>
    </section>
    <section class="mt20">
      <el-table
        :data="publisherData"
        :header-cell-style="{background:'#FFF9F3'}"
        ref="multipleTable"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="发行人">
        </el-table-column>
        <el-table-column
          width="100"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked">自动关联</el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="searchBox main_space" style="margin-top: 40px;">
      <section class="left">
        <section  class="flex">
          <el-input v-model="input" placeholder="发行人" class="input_width"></el-input>
          <button class="btn primary_btn">查询</button>
          <img src="../../assets/img/project/chevrons-down-orange.png" :class="[isShow ? 'transformGo' : 'transform']" @click="isShow = !isShow" style="width: 20px; height: 20px; margin: auto 0;">
        </section>
      </section>
      <section class="flex right">
          <!-- :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
            :on-exceed="handleExceed" -->
          <div style="position: relative;" @mouseenter="onEnterUploadButton"  @mouseleave="onLeaveUploadButton">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :show-file-list="false">
              <button class="btn primary_btn"  style="margin-left: 0;">导入</button>
            
            </el-upload>
            <div v-if="isShowUploadButton" class="uploadButton" @click="onUploadButtonClick">
              下载模板
            </div>
        </div>
        <button class="btn primary_btn">关联</button>
        <button class="btn primary_btn">取消关联</button>
      </section>
    </section>
    <section class="mt20">
      <el-table
        :data="projectData"
        ref="multipleTable"
        :header-cell-style="{background:'#FFF9F3'}"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="简称代码">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="地区发行人">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="上市场所">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="起息日">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="项目负责人">
        </el-table-column>
        <el-table-column
          width="100"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked">自动关联</el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class BasicInfo extends Vue {
  private isShow: boolean = false
  private isShowUploadButton: boolean = false
  private publisherData: any = [
    {
      publisher: '北京xx投资公司',
      checked: true,
    },
  ]
  private projectData: any = [
    {
      publisher: '北京xx投资公司',
      checked: true,
    },
  ]
  private onEnterUploadButton() {
    this.isShowUploadButton = !this.isShowUploadButton
  }
  private onLeaveUploadButton() {
    this.isShowUploadButton = !this.isShowUploadButton
  }
  private onUploadButtonClick() {
    console.log('click')
  }
}
</script>
<style lang="less" scoped>
.uploadButton{
  border: 1px solid #F88200;
  color: #F88200;
  font-size: 14px;
  height: 24px;
  width: 100%;
  line-height: 24px;
  position: absolute;
  top: 24px;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
}
.transform{
  transition: all .5s;
}
.transformGo{
  transform: rotate(-180deg);
  transition: all .5s;
}
</style>