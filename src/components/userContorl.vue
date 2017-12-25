<template>
    <!-- 重置密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="Show"
      width="40%"
      @close="handleClose">
      <el-form :model="form" :rules="rules" status-icon label-position="right" label-width="80px" ref="modifyPassword">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            placeholder="请输入密码"
            type="password"
            auto-complete="off"
            v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            placeholder="请输入密码"
            type="password"
            auto-complete="off"
            v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="RePassword">
          <el-input
            placeholder="请输入密码"
            type="password"
            auto-complete="off"
            v-model="form.RePassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import { changePwd, pchangePwd } from '../service/getData'
let md5 = require('md5')
export default {
  name: 'userContorl',
  props: ['show', 'id', 'phone'],
  data () {
    // 保存VUE实例
    const _this = this
    const checkNewPasswrod = function (rules, value, callback) {
      if (value === '') {
        return callback(new Error('请输入新密码'))
      } else {
        if (_this.form.RePassword !== '') {
          _this.$refs.modifyPassword.validateField('RePassword')
        }
        return callback()
      }
    }
    const checkRePassword = (rules, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== _this.form.newPassword) {
        return callback(new Error('两次输入密码不一致'))
      } else {
        return callback()
      }
    }
    return {
      Show: this.show,  // 显示
      form: { // 表单验证字段
        oldPassword: '',
        newPassword: '',
        RePassword: '',
        userId: this.id
      },
      rules: {  // 表单验证规则
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: checkNewPasswrod, trigger: 'blur' }
        ],
        RePassword: [
          { required: true, validator: checkRePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () { // 修改密码
      this.$refs.modifyPassword.validate((valid) => {
        if (valid) {
          let type, message, title
          if (this.id) {    // 登陆用户修改密码
            changePwd(this.form)
              .then(resp => {
                if (resp.success) {
                  type = 'success'
                  title = '成功'
                  message = '3s后请重新登录'
                } else {
                  title = '失败'
                  type = 'error'
                  message = resp.message
                }
              })
              .catch(err => {                   // 错误处理
                title = '失败'
                type = 'error'
                message = err.message
                console.log(err)
              })
              .then(() => {                     // 最后的用户通知
                this.$notify({
                  title,
                  message,
                  type
                })
                if (type === 'success') {
                  this.Close(true)
                } else {
                  this.Close()
                }
              })
          } else {  // 公共修改密码
            this.form.oldPassword = md5(this.form.oldPassword)
            this.form.newPassword = md5(this.form.newPassword)
            this.form.phoneNo = this.phone
            pchangePwd(this.form)
              .then(resp => {
                if (resp.success) {
                  type = 'success'
                  title = '成功'
                } else {
                  title = '失败'
                  type = 'error'
                  message = resp.message
                }
              })
              .catch(err => {
                title = '失败'
                type = 'error'
                message = err.message
                console.log(err)
              })
              .then(() => {
                this.$notify({
                  title,
                  message,
                  type
                })
                this.handleClose()
              })
          }
        } else {
          return false
        }
      })
    },
    handleClose (logout = false) {  // 通知父组件
      this.loading = false
      this.Show = false
      this.$emit('on-close', logout)
    }
  },
  watch: {
    show (value) {  // 更新显示状态
      this.Show = value
    }
  }
}
</script>
