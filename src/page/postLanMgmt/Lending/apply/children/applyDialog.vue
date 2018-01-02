<template>
  <el-dialog
    class="loanApplyDialog"
    width="25%"
    :visible.sync="show"
    @close="handleClose"
    v-loading="submitLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <div slot="title" class="title">
      {{data.title}}
    </div>
    <el-form class="detailForm" ref="form" :model="form" :rules="rules" label-position="left">
      <el-form-item>
        <table cellspacing="0" cellpadding="10">
          <tr>
            <td>借款人姓名</td>
            <td>{{table.name}}</td>
          </tr>
          <tr>
            <td>合同编号</td>
            <td>{{table.contractCode}}</td>
          </tr>
          <tr>
            <td>合同金额</td>
            <td>&yen;{{formatter.changeMoney(table.contractMoney, 1)}}</td>
          </tr>
          <tr>
            <td>大写金额</td>
            <td>{{formatter.convertCurrency(table.contractMoney, 1)}}</td>
          </tr>
          <!-- <tr>
            <td>产品名称</td>
            <td></td>
          </tr> -->
        </table>
      </el-form-item>
      <el-form-item :label="data.select" v-if="data.select" label-width="50%" prop="reason">
        <el-select v-model="form.reason" placeholder="请选择原因（必选）" style="width: 100%;">
          <el-option
            v-for="(option, index) in options.auditReason"
            :key="index"
            :label="option.value"
            :value="option.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="data.note">
        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.note"></el-input>
      </el-form-item>
    </el-form>
    <div style="color: red; text-align: left;"> {{data.desc}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">{{data.submitText}}</el-button>
      <el-button @click="handleClose(false)">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getDict
} from '@/service/getData'
import { formatter } from '@/util/utils'
export default {
  name: 'loanApplyDialog',
  data () {
    return {
      show: false,
      submitLoading: false,
      options: {},
      form: {
        applyId: this.table.applyId,
        contractId: this.table.contractId,
        note: '',
        reason: ''
      },
      rules: {
        reason: [
          { required: true, message: '请选择不通过理由', trigger: 'change' }
        ]
      },
      formatter: formatter
    }
  },
  props: ['data', 'table'],
  beforeMount () {
    getDict(['auditReason'])
      .then(resp => {
        if (resp.success) {
          this.options = resp.data
        }
      })
  },
  watch: {
    'data.show' (value) {
      this.show = value
    },
    table (value) {
      this.form.applyId = value.applyId
      this.form.contractId = value.contractId
    }
  },
  methods: {
    handleClose (refresh = false, detailClose = false) { // 完成后通知父组件
      this.show = false
      this.$emit('on-close', this.data.key, refresh, detailClose)
    },
    handleSubmit () { // 提交处理
      let type, message, title
      this.$refs.form.validate(success => {
        if (success) {
          this.data.sbumitFunc(this.form)
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
              message = err.response.data.message
            })
            .then(() => {
              this.$notify({
                title,
                message,
                type
              })
              if (type === 'success') {
                return this.handleClose(true, true, true)
              } else {
                return this.handleClose()
              }
            })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
.title {
  color: #2299dd;
  text-align: left;
  font-size: 18px;
}
</style>
<style lang="less">
.loanApplyDialog {
  .el-dialog__header {
    border-bottom: 1px solid #ddd;
  }
  .el-dialog__body {
    padding: 10px;
  }
}
</style>
