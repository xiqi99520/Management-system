<template>
  <el-dialog
    title="分配运营经理"
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
      <!-- 分配客户 -->
      <el-form-item label="分配" prop="acceptorId">
        <el-select v-model="form.acceptorId" filterable placeholder="请选择运营经理" style="width:100%;">
          <el-option
            v-for="(acceptor, index) in acceptorData"
            :key="index"
            :label="acceptor.username"
            :value="String(acceptor.userId)">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitAcceptorForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { assignAcceptor } from '../../../../service/getData'
export default {
  name: 'deny-dialog',
  props: ['show', 'id', 'acceptorData'],
  data () {
    return {
      visible: this.show,           // 显示对话框
      loading: false,               // 显示加载中
      code: 'ASSIGN_ACCEPTOR',      // 对话框特征码
      form: {                       // 表单数据
        acceptorId: '',
        applyId: this.id
      },
      rules: {                      // 表单验证规则
        acceptorId: [
          { required: true, message: '请选择受理专员', trigger: 'blur' }
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
    submitAcceptorForm (formName) {           // 表单条件检测、提交、错误处理
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let type, message, title
          this.loading = true
          assignAcceptor(this.form)
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
      this.$emit('on-close', this.code, refresh)
    }
  }
}
</script>
