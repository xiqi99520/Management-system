<template>
  <el-dialog
    title="审核不通过"
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
      <!-- 审核原因 -->
      <el-form-item label="审核原因" prop="reason">
        <!--<el-select v-model="form.reason" filterable placeholder="请选择原因" style="width:100%;" class="zy">-->
          <!--<el-option-->
            <!--v-for="(reason, index) in reasons"-->
            <!--:key="index"-->
            <!--:label="reason"-->
            <!--:value="reason">-->
          <!--</el-option>-->
        <!--</el-select>-->

        <el-select v-model="form.reason" filterable placeholder="请选择原因" style="width:100%;" class="zy">
          <el-option
            v-for="(option, index) in options.auditReason"
            :key="index"
            :label="option.value"
            :value="option.value">
          </el-option>
        </el-select>


      </el-form-item>
      <!-- 补充说明 -->
      <el-form-item label="补充说明">
        <el-input
          placeholder="请输入说明"
          type="text"
          :maxlength="50"
          auto-complete="off"
          v-model="form.notes">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitDenyForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { auditApplyRefuse, getDict } from '../../../../service/getData'
export default {
  name: 'deny-dialog',
  props: ['show', 'id'],
  data () {
    return {
      visible: this.show,           // 显示对话框
      loading: false,               // 显示加载中
      code: 'APPLY_AUDIT_DENY',     // 对话框特征码
      options: {},
      reasons: '',
      form: {                       // 表单数据
        reason: '',
        notes: '',
        applyId: this.id
      },
      rules: {                      // 表单验证规则
        reason: [
          { required: true, message: '请选择原因', trigger: 'blur' }
        ]
      }
    }
  },
  beforeMount () {
    getDict(['auditReason'])
      .then(resp => {
        if (resp.success) {
          this.options = resp.data
        }
      })
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
    submitDenyForm (formName) {           // 表单条件检测、提交、错误处理
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let type, message, title
          this.loading = true
          auditApplyRefuse(this.form)
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
