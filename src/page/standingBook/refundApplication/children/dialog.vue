<template>
  <!-- 用户信息 -->
  <el-dialog
    :title="data.title"
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
      label-position="right"
      :label-width="width"
      ref="form">
      <!-- 新增专有 -->
      <template v-if="type === 'initiate'">
        <!-- 借款编号 -->
        <el-form-item label="借款编号" prop="contractId">
          <el-input
            placeholder="请输入借款编号"
            type="text"
            auto-complete="off"
            v-model="form.contractId">
            <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>

        <!-- 客户姓名 -->
        <el-form-item label="客户姓名" prop="name">
          <el-input
            v-if="type === 'initiate'"
            readonly
            type="text"
            auto-complete="off"
            v-model="form.name">
          </el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input
            readonly
            type="text"
            auto-complete="off"
            v-model="form.phone">
          </el-input>
        </el-form-item>

        <!-- 当前其他暂收款金额 -->
        <el-form-item label="当前其他暂收款金额">
          {{form.applyMoney}}
        </el-form-item>
        <!-- 申请退款金额 -->
        <el-form-item label="申请退款金额" prop="remainMoney">
          <el-input
            type="text"
            auto-complete="off"
            placeholder="请输入申请退款金额"
            v-model="form.remainMoney">
          </el-input>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="remark">
          <el-input
            type="text"
            auto-complete="off"
            placeholder="请输入备注，限制50字以内"
            :maxlength="50"
            v-model="form.remark">
          </el-input>
        </el-form-item>
      </template>
      <template v-else>
        <!-- 借款编号 -->
        <el-form-item label="借款编号">
          {{table.contractCode}}
        </el-form-item>

        <!-- 客户姓名 -->
        <el-form-item label="客户姓名">
          {{table.name}}
        </el-form-item>

        <!-- 申请退款金额 -->
        <el-form-item label="客户姓名">
          <span>{{table.applyMoney}}</span>
        </el-form-item>

        <!-- 审核意见 -->
        <el-form-item label="审核意见" prop="auditReason">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.auditReason"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          退款审核通过后，可在退款入账的待退款列表中查询该退款单子。是否确认审核通过？
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button v-if="type === 'initiate'" type="primary" @click="handleSubmit">保 存</el-button>
      <el-button v-else-if="type === 'pass'" type="primary" @click="handleSubmit">审核通过</el-button>
      <el-button v-else type="primary" @click="handleSubmit">审核拒绝</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { valiData } from '@/util/utils'
export default {
  name: 'refundApplicationDialog',
  props: ['data'],
  data () {
    let type
    let width = '80px'
    if (this.data.title === '发起退款申请') {
      type = 'initiate'
      width = '150px'
    } else if (this.data.title === '退款审核通过') {
      type = 'pass'
    } else {
      type = 'deny'
    }
    return {
      show: false,  // 显示弹窗
      loading: false, // 加载中
      type,
      width,
      table: {},
      form: { // 表单数据
        contractId: '',
        name: '',
        phone: '',
        applyMoney: '',
        remainMoney: '',
        remark: '',
        auditReason: ''
      },
      rules: {  // 规则检测
        contractId: [
          { required: true, message: '请输入借款编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '客户姓名不能为空', trigger: 'blur' }
        ],
        remainMoney: [
          { required: true, message: '请输入退款金额', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        auditorRemark: [
          { required: true, message: '请输入审核意见', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    data: {
      handler (value) {
        this.table = value.data
        this.show = value.show
      },
      deep: true
    }
  },
  methods: {
    handleClose (refresh = false) {
      this.loading = false
      this.$refs.form.resetFields()
      this.$emit('on-close', this.type, refresh)
    },
    handleSubmit () {
      this.$refs.form.validate(success => {
        if (success) {
          this.loading = true
          let title, message, type
          if (this.type === 'initiate') { // 新增
          } else { // 拒绝
            this.form.uuid = this.table.refundApplyId
          }
          this.data.submit(this.form)
            .then(resp => {
              if (resp.success) {
                type = 'success'
                title = '成功'
              } else {
                type = 'error'
                title = '失败'
              }
              message = resp.message
            })
            .catch(err => {
              type = 'error'
              title = '失败'
              message = err.response.data
            })
            .then(() => {
              this.$notify({
                title,
                message,
                type
              })
              this.handleClose(true)
            })
        }
      })
    }
  }
}
</script>
