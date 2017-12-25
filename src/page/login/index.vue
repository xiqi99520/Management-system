<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8" style="text-align:left;">
          <img src="../../assets/no_login_logo.png" alt="" class="no_login_logo">
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <span class="no_login_title">行联金服管理系统</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-col :span="6" :offset="9" class="login_div">
          <el-form :model="ruleForm" status-icon :rules="rules" size="middle" label-position="top" ref="ruleForm" label-width="100px" class="login_form">
            <el-form-item label="登录" class="login_form__label" prop="phone">
              <el-input
                placeholder="请输入手机号码"
                prefix-icon="el-icon-mobile-phone"
                auto-complete="off"
                :maxlength="11"
                v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-goods"
                auto-complete="off"
                v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="btnLoading" type="primary" @click="submitForm('ruleForm')" class="login_btn">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <user-contorl :show="show" :phone="ruleForm.phone" @on-close="handleClose"></user-contorl>
    </el-main>
  </el-container>
</template>

<script>
import {
  getMD5,
  Login
} from '@/service/getData'
import userContorl from '@/components/userContorl'
import { mapMutations } from 'vuex'
import { keydownSubmit } from '@/util/utils'
let md5 = require('md5')

export default {
  name: 'Login',
  data () {
    let phonePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      } else if (!(/^1[0-9]\d{9}$/.test(value))) {
        return callback(new Error('手机号码输入有误'))
      } else {
        return callback()
      }
    }
    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { validator: phonePass, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      keydownSubmit: keydownSubmit,
      btnLoading: false,
      show: false // 更改密码
    }
  },
  mounted () {
    keydownSubmit(this.submitForm, 'ruleForm')
  },
  components: {
    userContorl
  },
  methods: {
    ...mapMutations(['SET_USER_INFO']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          getMD5()
            .then(resp => { // 获取MD5加密码
              if (resp.success) {
                return md5(resp.data + md5(this.ruleForm.password))
              } else {
                throw new Error(resp.message)
              }
            })
            .then(password => { // 登录
              return Login(this.ruleForm.phone, password)
                .then(resp => {
                  if (resp.success) { // 登录成功
                    if (!resp.data.permissionTree.length || !resp.data.roles.length) {
                      console.error('用户权限/用户角色未拿到')
                      throw new Error('登录异常')
                    }
                    this.SET_USER_INFO(resp.data)
                    this.$router.push('/')
                  } else {
                    if (resp.message === 'INITIAL_PASSWORD') { // 当前用户需要改密码
                      this.show = true
                    } else {
                      throw new Error(resp.message)
                    }
                  }
                })
            })
            // .then(() => { // 获取登录后用户信息
            //   return getCurrentUser()
            //     .then(resp => {
            //       if (resp.success) {

            //       } else {
            //         throw new Error(resp.message)
            //       }
            //     })
            // })
            .catch(err => { // 异常处理
              console.log(err)
              this.$notify.error({
                title: '登录失败',
                message: err.message
              })
              this.btnLoading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose () {
      this.show = false
      this.btnLoading = false
      this.ruleForm.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.no_login_logo {
  width: 210px;
  height: 35px;
  vertical-align: middle;
}

.no_login_title {
  font-size: 22px;
  color: #219bde;
}

.el-main {
  background-color: #e9eef3;
  background-image: url("../../assets/no_login_bg.jpg");
  color: #333;
  text-align: left;
}

.login_div {
  background: transparent;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 85px;
}

.login_form {
  padding: 16px 36px;
  margin-top: 10px;
}

.login_btn {
  width: 100%;
}
</style>

<style>
.login_form__label .el-form-item__label {
  color: #fff;
  font-size: 19px;
}
</style>
