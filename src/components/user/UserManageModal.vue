<template>
  <main class="center">
    <section class="content col">
      <section class="top flex">
        {{titleText}}
        <img src="../../assets/img/close.png" @click="hide">
      </section>
      <article class="info col">
        <el-form :model="userAccount" :rules="rules" ref="userAccountForm" label-width="100px">
        <section class="info_row flex">
          <section class="info_item">
            <section class="cross_center"  v-if="modalType === 'detail'">
              <section class="item_name">
                姓名
              </section>
              <section class="item_content">
                {{userInfo.name}}
              </section>
            </section>
            <el-form-item label="姓名" prop="name" v-else>
              <el-input  clearable v-model="userAccount.name"></el-input>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center" v-if="modalType === 'detail'">
              <section class="item_name">
                部门
              </section>
              <section class="item_content">
                {{userInfo.departmentName}}
              </section>
            </section>
            <el-form-item label="部门" prop="departmentName" v-else>  
              <el-select 
              v-model="userAccount.departmentName" 
              clearable placeholder="请选择部门">
                <el-option 
                :value="userAccount.departmentId" 
                style="height: auto; padding: 0;">
                  <el-tree 
                  :data="deparmentTree" 
                  node-key="id"
                  highlight-current 
                  @node-click="handleNodeClick"></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center" v-if="modalType === 'detail'">
              <section class="item_name">
                身份
              </section>
              <section class="item_content">
                {{userInfo.isLeader === 'YES' ? '领导' : '员工'}}
              </section>
            </section>
            <el-form-item label="身份" prop="isLeader" v-else>
              <el-select v-model="userAccount.isLeader">
                <el-option
                  v-for="item in isLeaderOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </section>
        </section>
        <section class="info_row flex">
          <section class="info_item">
            <section class="cross_center" v-if="modalType === 'detail'">
              <section class="item_name">
                账号
              </section>
              <section class="item_content">
                {{userInfo.loginName}}
              </section>
            </section>
            <el-form-item label="账号" prop="loginName" v-else>
              <el-input clearable v-model="userAccount.loginName"></el-input>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center" v-if="modalType === 'detail'">
              <section class="item_name">
                密码
              </section>
              <section class="item_content">
                ●●●●●●
              </section>
            </section>
            <el-form-item label="密码" prop="password" v-else>
              <el-input v-model="userAccount.password"  placeholder="6~12位的字母加数字"></el-input>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center"  v-if="modalType === 'detail'">
              <section class="item_name">
                手机
              </section>
              <section class="item_content">
                {{userInfo.mobile}}
              </section>
            </section>
            <el-form-item label="手机" prop="mobile" v-else>
              <el-input v-model="userAccount.mobile"></el-input>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center"  v-if="modalType === 'detail'">
              <section class="item_name">
                邮箱
              </section>
              <section class="item_content">
                {{userInfo.email}}
              </section>
            </section>
            <el-form-item label="邮箱" prop="email" v-else>
              <el-input v-model="userAccount.email"></el-input>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center"  v-if="modalType === 'detail'">
              <section class="item_name">
                性别
              </section>
              <section class="item_content">
                {{userInfo.gender === 'MALE' ? '男' : '女'}}
              </section>
            </section>
            <el-form-item label="性别" prop="gender" v-else>
              <el-select v-model="userAccount.gender">
                <el-option
                  v-for="item in gendersOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center" v-if="modalType === 'detail'">
              <section class="item_name">
                生日
              </section>
              <section class="item_content" >
                {{userInfo.birthday}}
              </section>
            </section>
            <el-form-item label="生日" prop="birthday" v-else>
              <el-date-picker
                v-model="userAccount.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </section>
          <section class="info_item">
            <section class="cross_center"  v-if="modalType === 'detail'">
              <section class="item_name">
                入职时间
              </section>
              <section class="item_content">
                {{userInfo.entryAt}}
              </section>
            </section>
            <el-form-item label="入职时间" prop="entryAt" v-else>
              <el-date-picker
                v-model="userAccount.entryAt"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </section>
        </section>
        </el-form>
      </article>
      <section class="bottom flex center" v-if="modalType !== 'detail'">
        <section class="btns">
          <button class="bottom_btn" @click="submitForm('userAccountForm')">保存</button>
          <button class="bottom_btn" @click="hide">取消</button>
        </section>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class UserManageModal extends Vue {
  @Prop(String) public readonly modalType!: string;
  @Prop(Object) public userInfo!: object
  @Prop(Array) public readonly deparmentTree!: any[]
  @Prop() public selectedNode !: object
  public titleText = '用户';
  public gendersOption = [
    {
      value: 'MALE',
      label: '男',
    },
    {
      value: 'FEMALE',
      label: '女',
    },
  ];
  public isLeaderOption = [
    {
      value: 'YES',
      label: '领导',
    },
    {
      value: 'NO',
      label: '员工',
    },
  ];
  public userAccount: any = {};
  public rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
    ],
    departmentName: [
      { required: true, message: '请选择部门', trigger: 'change' },
    ],
    isLeader: [
      { required: true, message: '请选择身份', trigger: 'change' },
    ],
    loginName: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    gender: [
      { required: true, message: '请选择性别', trigger: 'change' },
    ],
    entryAt: [
      { required: true, message: '请选择入职时间', trigger: 'change' },
    ],
  }
  public hide() {
    this.$emit('hide');
  }
  public submitForm(formName: string) {
    const form: any = this.$refs[formName]
    form.validate((valid: any) => {
      if (valid) {
        this.$emit('save', this.userAccount)
      } else {
        return false;
      }
    });
  }
  public handleNodeClick(data: any) {
    Vue.set(this.userAccount, 'departmentId', data.meta.id)
    Vue.set(this.userAccount, 'departmentName', data.label)
  }
  private created() {
    switch (this.modalType) {
      case 'detail':
        this.titleText = '用户详情';
        break;
      case 'edit':
        this.titleText = '编辑用户';
        this.userAccount = {
          ...this.userInfo,
          password: '●●●●●●',
        }
        break;
      case 'add':
        this.titleText = '新增用户';
        this.userAccount = {
          ...this.userInfo,
          isLeader: '',
        }
        const data: any = this.selectedNode
        // this.userAccount.departmentName = data.label
        // this.userAccount.departmentId = data.meta.id
        Vue.set(this.userAccount, 'departmentId', data.meta.id)
        Vue.set(this.userAccount, 'departmentName', data.label)
        break;
      default:
        break;
    }
  }
}
</script>

<style lang="less" scoped>
main{
  width: 100%;
  height: 100%;
  color:rgba(49,50,51,1);
  /deep/ .el-input__icon{
  line-height: 40px;
  }
  .content{
    width: 65%;
    min-height: 50%;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    .top{
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      border-bottom: 1px solid rgba(234,234,234,1);
      img{
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
    .info{
      padding: 20px;
      .info_row:nth-child(1){
        .info_item{
          width: 33.3%;
        }
      }
      .info_row:nth-child(2){
        padding-right: 33.3%;
        flex-wrap: wrap;
        .info_item{
          width: 50%;
        }
      }
      .info_item{
        margin-bottom: 20px;
        padding-right: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .item_name{
          width: 64px;
          text-align: end;
        }
        .item_content{
          font-size:14px;
          color:rgba(96,98,102,1);
          display: flex;
          align-items: center;
          flex: 1;
          height:32px;
          margin-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
    }
    .bottom{
      height: 120px;
      border-top: 1px solid rgba(234,234,234,1);
      .btns{
        font-size:14px;
        .bottom_btn{
          border-radius:4px;
          padding: 10px 32px;
          cursor: pointer;
        }
        .bottom_btn:nth-child(1){
          color:rgba(255,255,255,1);
          background:rgba(87,146,252,1);
          border:1px solid rgba(87,146,252,1);
        }
        .bottom_btn:nth-child(2){
          margin-left: 80px;
          color:rgba(144,147,153,1);
          background:rgba(255,255,255,1);
          border:1px solid rgba(192,196,204,1);
        }
      }
    }
  } 
}
</style>