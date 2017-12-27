<template>
  <div>
    <!-- 提前还款 -->
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
        <!-- 借款编号 -->
        <el-form-item label="借款编号" prop="username">
          <el-input
            placeholder="请输入借款编号"
            type="text"
            auto-complete="off"
            v-model="form.username">
          </el-input>
          <el-button type="primary" @click="showReset = true">搜索</el-button>
        </el-form-item>
        <el-form-item label="客户姓名" prop="username">
          <span>{{username}}</span>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <span>{{phone}}</span>
        </el-form-item>
        <el-form-item label="申请提前还款本金" prop="username">
          <el-input
            placeholder="请输入申请提前还款本金"
            type="text"
            auto-complete="off"
            v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item label="当前其他暂收款金额" prop="phone">
          当前其他暂收款金额<span>{{phone}}</span>元，是否将其他暂收抵扣提前还本(本金+利息)？
        </el-form-item>
        <el-form-item label="申请提前还款本金" prop="username">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="请输入用于抵扣提前还本的金额" prop="username">
          <el-input
            placeholder="请输入金额"
            type="text"
            auto-complete="off"
            v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item label="约定提前还款日期" prop="username">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="username">
          <el-input
            placeholder="请输入备注，限50字内"
            type="text"
            auto-complete="off"
            v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item label="审核意见" prop="username">
          <el-input
            placeholder="请输入审核意见"
            type="text"
            auto-complete="off"
            v-model="form.username">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserInfoForm('form')">确认提交</el-button>
        <el-button @click="Show = false">取 消</el-button>
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
