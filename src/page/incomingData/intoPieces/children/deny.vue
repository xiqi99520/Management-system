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
        <el-select v-model="form.reason" filterable placeholder="请选择原因" style="width:100%;" class="zy">
          <el-option
            v-for="(reason, index) in reasons"
            :key="index"
            :label="reason"
            :value="reason">
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
import { auditApplyRefuse } from '../../../../service/getData'
export default {
  name: 'deny-dialog',
  props: ['show', 'id'],
  data () {
    return {
      visible: this.show,           // 显示对话框
      loading: false,               // 显示加载中
      code: 'APPLY_AUDIT_DENY',     // 对话框特征码
      reasons: [                    // 拒绝原因
        '房产性质不符---抵押物房产性质不符合准入标准',
        '房产位置不符---抵押物地理位置位于6环外，不符合我司要求',
        '房产位置偏远---抵押物位置偏远，近半年无成交记录',
        '信托风控审批不通过——借款人身份证信息命中渤海黑名单',
        '征信不达标---借款人及配偶征信逾期近24月内达到≥连5累30',
        '征信有逾期——借款人及配偶征信有当前逾期且未结清',
        '征信情况异常——借款人及配偶征信贷款或贷记卡账户存在异常状态（异常状态包括但不限于止付、呆账、核销、五级分类中关注以上）',
        '有担保／以资抵债——借款人及配偶征信最近24个月还款记录中出现担保人代还、以资抵债，或“特殊交易栏”、“信贷交易信息明细”出现担保人代还、以资抵债记录',
        '职业不符合准入——借款人及配偶从事职业为公安局、检察院、法院、军人、警察、律师、记者、同行、高危风险行业等',
        '失信／被执行——借款人及配偶在人法网和失信网查询有执行或者失信信息',
        '有执行诉讼——借款人及配偶在第三方数据中有执行中诉讼信息',
        '无结案证明——借款人及配偶在第三方数据中有已结案信息但无法提供结案证明等证明性文件',
        '资产负债不达标——本次贷款金额与之前负债总额与本次抵押物房产评估值比例大于100%且无法提供北京其他房产作为资产证明',
        '借款材料不真实——借款人及配偶提供不真实的借款材料',
        '房产情况不达标——抵押物目前为被占用状态或其他不易处置状态',
        '房产性质不符——抵押物实际用途与房产性质不符',
        '房产情况可疑——抵押物周围有可疑或异常情况',
        '配偶不同意——借款人和配偶有一方不同意本次借款行为',
        '其他原因——补充填写个案原因'
      ],
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
