<template>
  <el-dialog
    title="客户放弃"
    :visible.sync="visible"
    @close="Close"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
    width="40%">
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      label-position="right"
      label-width="110px"
      ref="form">
      <!-- 放弃原因 -->
      <el-form-item label="放弃原因" prop="reason">
        <el-input
          placeholder="请输入原因"
          type="text"
          :maxlength="50"
          auto-complete="off"
          v-model="form.reason">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitCancelForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { auditApplyCancel } from '../../../../service/getData'
export default {
  name: 'calcel-dialog',
  props: ['show', 'id'],
  data () {
    return {
      visible: this.show,           // 显示对话框
      loading: false,               // 显示加载中
      code: 'APPLY_CUSTOM_CANCEL',  // 对话框特征码
      form: {                       // 表单数据
        reason: '',
        applyId: this.id
      },
      rules: {                      // 表单验证规则
        reason: [
          { required: true, message: '请输入放弃原因', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    show (value) {                  // 监控显示状态
      this.visible = value
    },
    id (value) {
      this.form.applyId = value
    }
  },
  methods: {
    submitCancelForm (formName) {           // 表单条件检测、提交、错误处理
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let type, message, title
          this.loading = true
          auditApplyCancel(this.form)
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
              this.loading = false
              this.$notify({
                title,
                message,
                type
              })
              this.visible = false
              this.Close(true)
            })
        }
      })
    },
    Close (refresh = false) {       // 用户信息模态框隐藏
      this.form.reason = ''
      this.$emit('on-close', this.code, refresh)
    }
  }
}
</script>
