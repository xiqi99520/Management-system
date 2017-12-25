<template>
  <el-dialog
    title="客户跟进"
    :visible.sync="visible"
    @close="Close"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
    width="40%">
    <p>请您尽快跟进处理</p>
    <p>为我们的客户提供优质服务</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitFollowForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { acceptorHandle } from '../../../../service/getData'
export default {
  name: 'follow-dialog',
  props: ['show', 'id'],
  data () {
    return {
      visible: this.show,           // 显示对话框
      loading: false,               // 显示加载中
      code: 'APPLY_FOLLOW',     // 对话框特征码
      form: {                       // 表单数据
        applyId: this.id
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
    submitFollowForm () {           // 表单条件检测、提交、错误处理
      let type, message, title
      this.loading = true
      acceptorHandle(this.form)
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
    },
    Close (refresh = false) {       // 用户信息模态框隐藏
      this.$emit('on-close', this.code, refresh)
    }
  }
}
</script>
