<template>
  <div>
    <!-- 标题 -->
    <h3 class="main-content-title">退款申请</h3>
    <!-- 表格搜索 -->
    <el-form :inline="true">
      <el-form-item label="查询条件">
        <el-input
          clearable
          placeholder="姓名/合同编号/申请提交人"
          v-model="form.input">
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.refundApplication"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="formatter.dateRangeChange(dateRange, form)">
          </el-date-picker>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" title="搜索" @click="getTableData"></el-button>
      </el-form-item>
      <el-form-item class="table-btn-ctl">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="initiate.show = true">发起退款申请</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="data"
      highlight-current-row>
      <el-table-column
        align="center"
        label="序号">
        <template slot-scope="scope">
          <span>{{ formatter.serialNumber(scope.$index, pageSize, currentPage) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractCode"
        label="合同编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remainMoney"
        label="申请时其他暂收款金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyMoney"
        label="申请退款金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyName"
        label="申请提交人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyDate"
        label="申请时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="auditorRemark"
        label="审核意见">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        width="150px"
        label="操作">
        <template slot-scope="scope" v-if="scope.row.status === '待审核'">
          <el-button type="primary" size="mini" @click="handleShowDialog('pass', scope.row)">通过</el-button>
          <el-button type="primary" size="mini" @click="handleShowDialog('deny', scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="getTableData"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalPage"
      class="pagination">
    </el-pagination>
    <!-- 弹窗 -->
    <refund-application-dialog :data="initiate" @on-close="handleClose"></refund-application-dialog>
    <refund-application-dialog :data="pass" @on-close="handleClose"></refund-application-dialog>
    <refund-application-dialog :data="deny" @on-close="handleClose"></refund-application-dialog>
    <refund-application-tip :data="tip" @on-close="handleClose"></refund-application-tip>
  </div>
</template>
<script>
import {
  pickerOptions,
  initSelectOptions,
  formatter,
  initTable
} from '@/util/utils'
import {
  listRefund,
  addRefundApply,
  passRefund,
  refuseRefund
} from '@/service/getData'
import refundApplicationDialog from './children/dialog'
import refundApplicationTip from './children/tip'
export default {
  name: 'refundApplication', // 退款申请
  components: {
    refundApplicationDialog,
    refundApplicationTip
  },
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 0,     // 默认页面
      pageSize: 15,       // 每页数量
      dateRange: null,
      data: [], // 表格数据
      selects: ['refundApplication'], // 下拉框搜索值
      options: {
        refundApplication: [{ name: '全部', value: '' }]
      },
      form: { // 搜索表格
        input: '',
        startDate: '',
        endDate: '',
        state: ''
      },
      initiate: { // 发起对话框
        show: false,
        title: '发起退款申请',
        sunmit: addRefundApply
      },
      pass: { // 通过对话框
        show: false,
        title: '退款审核通过',
        submit: passRefund
      },
      deny: { // 拒绝对话框
        show: false,
        title: '退款审核拒绝',
        submit: refuseRefund
      },
      tip: {  // 提示对话框
        show: false,
        title: '提示',
        type: 'tip'
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  created () {
    initSelectOptions(this.selects, this.options)
      .then(() => {
        return this.getTableData()
      })
  },
  methods: {
    getTableData () {
      initTable(listRefund, this)
    },
    handleShowDialog (key, data) {
      // 其他暂收款金额不足退款申请金额
      if (key === 'pass' && data.remainMoney < data.applyMoney) {
        this.tip.show = true
        return
      }
      this[key].data = data
      this[key].show = true
    },
    handleClose (key, refresh) {
      this[key].data = []
      this[key].show = false
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/public.less";
</style>
