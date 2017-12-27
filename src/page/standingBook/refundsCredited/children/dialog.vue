<template>
  <!-- 用户信息 -->
  <el-dialog
    title="代付退款确认"
    :visible.sync="show"
    @close="handleClose"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
    width="60%">
    <h4>退款明细</h4>
     <!-- 表格 -->
    <el-table
      stripe
      border
      :data="data.table"
      highlight-current-row>
      <el-table-column
        align="center"
        prop=""
        label="姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="借款编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请产品">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请退款金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="退款账户开户行">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="退款账户号">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请退款时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="项目">
      </el-table-column>
    </el-table>
    <h4>退款确认</h4>
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      label-position="left"
      label-width="110px"
      ref="form">
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item label="退款代付机构：">
            <el-select
              style="width:100%;"
              :model="form.select">
              <el-option 
                v-for="(option, idx) in options"
                :key="idx"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="11">
          <el-form-item label="退款总金额："></el-form-item>
        </el-col>
      </el-form-item>
      <!-- 退款备注 -->
      <el-form-item label="退款备注">
        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.note"></el-input>
      </el-form-item>
      <el-form-item  label-width="0">
        <p>提示：为确保顺利退款，请您确认代付账户里的剩余资金是否充足。</p>
        <p>是否确认提交代付退款请求？</p>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { valiData } from '@/util/utils'
export default {
  name: 'refundsCreditedDialog',
  props: ['data'],
  data () {
    return {
      show: false,  // 显示弹窗
      loading: false, // 加载中
      options: [],
      form: { // 表单数据
        select: '',
        note: ''
      },
      rules: {  // 规则检测
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
