<template>
  <!-- 用户信息 -->
  <el-dialog
    title="发起退款申请"
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
      label-width="150px"
      ref="form">
      <!-- 借款编号 -->
      <el-form-item label="借款编号" prop="no">
        <el-input
          placeholder="请输入借款编号"
          type="text"
          auto-complete="off"
          v-model="form.no">
        </el-input>
      </el-form-item>
      <!-- 客户姓名 -->
      <el-form-item label="客户姓名" prop="useranme">
        <el-input
          readonly
          type="text"
          auto-complete="off"
          v-model="form.useranme">
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
        {{data.money}}
      </el-form-item>
      <!-- 申请退款金额 -->
      <el-form-item label="申请退款金额" prop="money">
        <el-input
          type="text"
          auto-complete="off"
          placeholder="请输入申请退款金额"
          v-model="form.money">
        </el-input>
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="备注" prop="note">
        <el-input
          type="text"
          auto-complete="off"
          placeholder="请输入备注，限制50字以内"
          :maxlength="50"
          v-model="form.note">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { valiData } from '@/util/utils'
export default {
  name: 'refundApplicationDialog',
  props: ['data'],
  data () {
    return {
      show: false,  // 显示弹窗
      loading: false, // 加载中
      form: { // 表单数据
        no: '',
        useranme: '',
        phone: '',
        money: '',
        note: ''
      },
      rules: {  // 规则检测
        phoneNo: [
          { required: true, validator: valiData.phone, trigger: 'blur' }
        ],
        operateNo: [
          { required: true, validator: valiData.operateNo, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        orgName: [
          { type: 'number', required: true, message: '请选择支行', trigger: 'change' }
        ],
        organizationId: [
          { type: 'number', required: true, message: '请选择网点', trigger: 'change' }
        ],
        areaName: [
          { required: true, message: '请选择地区', trigger: 'change' }
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
