<template>
  <!-- 用户信息 -->
  <el-dialog
    title="渤海对接文档审核提示"
    :visible.sync="show"
    @close="handleClose"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
    width="40%">
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      label-position="left"
      label-width="95px"
      ref="form">
      <!-- 内容 -->
      <el-form-item label-width="0">
        <p>请预览或下载对接文档后进行审核，若在计划上传时间前未审核，系统将自动把对应文档上传至渤海FTP系统。</p>
        <p>若文档审核过程中发现有误，请提交审核不通过按钮，并在审核意见中写明不通过原因，该文档将不会被上传至渤海FTP系统，审核不通过后请及时与技术人员联系，重新生成相应的对接文档。</p>
        <p>文档审核通过后，系统将把审核通过的文档传至渤海FTP系统</p>
      </el-form-item>
      <!-- 审核意见 -->
      <el-form-item label="审核意见：" prop="note">
        <el-input 
          type="textarea" 
          :autosize="{ minRows: 4}" 
          v-model="form.note"
          :maxlength="300">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">审核通过</el-button>
      <el-button type="primary" @click="handleSubmit">审核不通过</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'dockDocumentReviewDialog',
  props: ['data'],
  data () {
    return {
      show: false,  // 显示弹窗
      loading: false, // 加载中
      form: { // 表单数据
        note: ''
      },
      rules: {  // 规则检测
        note: [
          { required: true, message: '请填写意见', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    data: {
      handler (value) {
        this.show = value.show
      },
      deep: true
    }
  },
  methods: {
    handleClose (refresh = false) {
      this.$emit('on-close', refresh)
    },
    handleSubmit () {
      this.handleClose(true)
    }
  }
}
</script>
