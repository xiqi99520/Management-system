<template>
  <div>
    <!-- 预拨申请 -->
    <el-dialog
      :title="title"
      :visible.sync="Show"
      @close="Close"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      width="46%">
      <div>
        <el-row>
          <el-col :span="12"><div>您已勾选的放款申请总额为：</div></el-col>
          <el-col :span="12"><div><span :model="totalNumber">1,000,000</span> 元</div></el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="12"><div>差额：</div></el-col>
          <el-col :span="12"><div><span>+1,000,000</span> 元</div></el-col>
        </el-row>
      </div>
      <p>备注：在下面金额输入后出来，红正绿负，正说明下面的金额较大</p>
      <el-form
        :model="form"
        :rules="rules"
        status-icon
        label-position="right"
        label-width="80px"
        ref="form">
        <!-- 预拨申请金额 -->
        <el-form-item label="请输入预拨申请金额：" prop="total">
          <el-input
            placeholder="请输入内容"
            type="text"
            auto-complete="off"
            v-model="form.total">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Show = false">取 消</el-button>
        <el-button type="primary" @click="submitUserInfoForm('form')">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog
      title="确认提交?"
      :visible.sync="showReset"
      v-loading="resetLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      width="30%">
       <div>
        <el-row>
          <el-col :span="12"><div>您已勾选的放款申请总额为：</div></el-col>
          <el-col :span="12"><div><span :model="totalNumber"></span> 元</div></el-col>
        </el-row>
      </div>
       <div>
        <el-row>
          <el-col :span="12"><div>您填写的预拨差额为： </div></el-col>
          <el-col :span="12"><div><span :model="form.total">+1,000,000</span> 元</div></el-col>
        </el-row>
      </div>
       <div>
        <el-row>
          <el-col :span="12"><div>您最终申请的预拨金额为：</div></el-col>
          <el-col :span="12"><div><span>1,000,000</span> 元</div></el-col>
        </el-row>
      </div>
      <p>备注：这里差额为红正绿负，正数说明填写的预拨申请金额大于勾选的放款申请金额</p>
      <p>注意：当日提交申请后不可再一次提交。是否确认提交？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReset = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { valiData } from '../../../../util/utils'
// import {
//   doNewUser,
//   doUpdateUser
// } from '../../../../service/getData'
export default {
  name: 'predialingDialog',
  props: ['title', 'show'],
  data () {
    return {
      loading: false,                        // 用户信息对话框加载中
      Show: this.show,                       // 显示用户信息对话框
      showReset: false,                      // 显示确认提交对话框
      resetLoading: false,                   // 确认提交对话框加载中
      form: {                                // 表单数据
        total: 0
      },
      totalNumber: 0,
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
    // submitUserInfoForm (formName) {               // 表单条件检测、提交、错误处理
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.form.rolelist.map(name => {  // 添加用户到表单中
    //         this.roles.map(role => {
    //           if (role.roleName === name) {
    //             this.form.role.push(role)
    //           }
    //         })
    //       })
    //       let type, message, title
    //       this.loading = true
    //       if (this.update) {
    //         doUpdateUser(this.form)
    //           .then(resp => {
    //             if (resp.success) {
    //               type = 'success'
    //               title = '成功'
    //             } else {
    //               title = '失败'
    //               type = 'error'
    //             }
    //             message = resp.message
    //           })
    //           .catch(err => {                   // 错误处理
    //             title = '失败'
    //             type = 'error'
    //             message = err.message
    //             console.log(err)
    //           })
    //           .then(() => {                     // 最后的用户通知
    //             if (type === 'success') {
    //               this.showNewUser = false
    //             }
    //             this.loading = false
    //             this.$notify({
    //               title,
    //               message,
    //               type
    //             })
    //             this.Close(true)
    //           })
    //       } else {                                // 新增用户信息表单
    //         doNewUser(this.form)
    //           .then(resp => {
    //             if (resp.success) {
    //               type = 'success'
    //               title = '成功'
    //             } else {
    //               title = '失败'
    //               type = 'error'
    //             }
    //             message = resp.message
    //           })
    //           .catch(err => {                   // 错误处理
    //             title = '失败'
    //             type = 'error'
    //             message = err.message
    //             console.log(err)
    //           })
    //           .then(() => {                     // 最后的用户通知
    //             if (type === 'success') {
    //               this.showNewUser = false
    //             }
    //             this.loading = false
    //             this.$notify({
    //               title,
    //               message,
    //               type
    //             })
    //             this.Close(true)
    //           })
    //       }
    //     }
    //   })
    // },
    Close (refresh = false) {                     // 用户信息模态框隐藏
      this.$emit('on-close', this.update, refresh)
      this.$refs['form'].clearValidate()
    }
  },
  watch: {
    show (value) {                                // 监控显示用户信息对话框
      this.Show = value
      if (value === true) {
        this.totalNumber = this.form.total
      }
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
// .userdialog {
//   margin-top: 8px;
//   text-align: left;
// }

// .userdialog-form {
//   .el-input__inner {
//     color: #a7a7a7;
//   }
//   .title-align {
//     text-align: left;
//   }
// }

// .user-tag {
//   margin-right: 10px;
// }
</style>
