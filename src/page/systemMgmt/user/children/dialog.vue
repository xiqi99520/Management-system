<template>
  <div>
    <!-- 用户信息 -->
    <el-dialog
      :title="title"
      :visible.sync="Show"
      @close="Close"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      width="46%">
      <el-form
        :model="form"
        :rules="rules"
        status-icon
        label-position="right"
        label-width="80px"
        ref="form">
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input
            placeholder="请输入手机号"
            type="text"
            auto-complete="off"
            :maxlength="11"
            v-model="form.phone"
            :readonly="update">
          </el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            type="text"
            auto-complete="off"
            v-model="form.username">
          </el-input>
        </el-form-item>
        <!-- 修改用户专有 -->
        <!-- 重置密码 -->
        <el-form-item v-if="update" label="重置密码">
        <el-button type="primary" @click="showReset = true">重置密码</el-button>
        </el-form-item>
        <template v-else>
          <!-- 密码 -->
          <el-form-item label="密码" class="userdialog-form">
            <el-input
              type="text"
              auto-complete="off"
              readonly
              value="888888">
            </el-input>
            <el-alert
              :closable="false"
              title="默认初始密码为888888"
              description="用户首次登录后可修改为6-12位数字或字母的组合"
              type="info"
              class="title-align">
            </el-alert>
          </el-form-item>
        </template>
        <!-- 选择角色 -->
        <el-form-item label="选择角色">
          <el-transfer
            v-model="form.rolelist"
            :data="roles"
            :filterable="true"
            :titles="['全部角色', '已选角色']"
            :props="{
              key: 'roleName',
              label: 'roleName'
            }"
            class="userdialog">
          </el-transfer>
        </el-form-item>
        <el-form-item label="用户角色" style="text-align:left;" prop="rolelist">
          <el-tag class="user-tag" v-for="name in form.rolelist" :key="name">{{name}}</el-tag>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" style="width:100%;">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="锁定" value="锁定"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Show = false">取 消</el-button>
        <el-button type="primary" @click="submitUserInfoForm('form')">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog
      title="确认重置密码?"
      :visible.sync="showReset"
      v-loading="resetLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      width="30%">
      <span>密码将重置为默认密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReset = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { valiData } from '../../../../util/utils'
import {
  doNewUser,
  doUpdateUser,
  doRsetUserPwd
} from '../../../../service/getData'
export default {
  name: 'userDialog',
  props: ['title', 'show', 'userData', 'roles'],
  data () {
    return {
      loading: false,                        // 用户信息对话框加载中
      Show: this.show,                       // 显示用户信息对话框
      showReset: false,                      // 显示重置密码对话框
      resetLoading: false,                   // 重置密码对话框加载中
      update: this.title === '编辑用户信息',   // 当前为编辑用户信息
      notSelectRoles: ['普通客户', '客户经理'], // 不允许在对话框角色下拉菜单中出现的角色
      roleData: [],
      form: {                                // 表单数据
        role: [],
        rolelist: [],
        phone: '',
        username: '',
        roleId: '',
        state: '正常',
        roleName: '',
        userId: ''
      },
      rules: {                               // 用户信息数据有效性规则
        phone: [
          { required: true, validator: valiData.phone, trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        rolelist: [
          { type: 'array', required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitUserInfoForm (formName) {               // 表单条件检测、提交、错误处理
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.rolelist.map(name => {  // 添加用户到表单中
            this.roles.map(role => {
              if (role.roleName === name) {
                this.form.role.push(role)
              }
            })
          })
          let type, message, title
          this.loading = true
          if (this.update) {
            doUpdateUser(this.form)
              .then(resp => {
                if (resp.success) {
                  type = 'success'
                  title = '成功'
                } else {
                  title = '失败'
                  type = 'error'
                }
                message = resp.message
              })
              .catch(err => {                   // 错误处理
                title = '失败'
                type = 'error'
                message = err.message
                console.log(err)
              })
              .then(() => {                     // 最后的用户通知
                if (type === 'success') {
                  this.showNewUser = false
                }
                this.loading = false
                this.$notify({
                  title,
                  message,
                  type
                })
                this.Close(true)
              })
          } else {                                // 新增用户信息表单
            doNewUser(this.form)
              .then(resp => {
                if (resp.success) {
                  type = 'success'
                  title = '成功'
                } else {
                  title = '失败'
                  type = 'error'
                }
                message = resp.message
              })
              .catch(err => {                   // 错误处理
                title = '失败'
                type = 'error'
                message = err.message
                console.log(err)
              })
              .then(() => {                     // 最后的用户通知
                if (type === 'success') {
                  this.showNewUser = false
                }
                this.loading = false
                this.$notify({
                  title,
                  message,
                  type
                })
                this.Close(true)
              })
          }
        }
      })
    },
    Close (refresh = false) {                     // 用户信息模态框隐藏
      this.$emit('on-close', this.update, refresh)
      this.$refs['form'].clearValidate()
    },
    resetPassword () {
      let type, message, title
      this.resetLoading = true
      doRsetUserPwd(this.form.phone)
        .then(resp => {
          if (resp.success) {
            type = 'success'
            title = '成功'
          } else {
            title = '失败'
            type = 'error'
          }
          message = resp.message
        })
        .catch(err => {                   // 错误处理
          title = '失败'
          type = 'error'
          message = err.message
          console.log(err)
        })
        .then(() => {                     // 最后的用户通知
          if (type === 'success') {
            this.showNewUser = false
          }
          this.resetLoading = false
          this.$notify({
            title,
            message,
            type
          })
          this.showReset = false
          this.Close(true)
        })
    }
  },
  watch: {
    show (value) {                                // 监控显示用户信息对话框
      this.Show = value
    },
    userData: {
      handler (value) {                            // 初始化可编辑的用户信息
        this.form.role = []
        this.form.rolelist = []
        this.form.userId = value.userId
        this.form.username = value.username
        this.form.phone = value.phoneNo
        this.form.state = value.state
        this.form.operateNo = value.operateNo
        this.form.organizationId = value.organizationId
        value.authorities.map(role => {
          this.form.rolelist.push(role.name)
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.userdialog {
  margin-top: 8px;
  text-align: left;
}

.userdialog-form {
  .el-input__inner {
    color: #a7a7a7;
  }
  .title-align {
    text-align: left;
  }
}

.user-tag {
  margin-right: 10px;
}
</style>
