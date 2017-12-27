<template>
  <div>
    <!-- 标题 -->
    <h2>退款申请</h2>
    <!-- 表格搜索 -->
    <el-form :inline="true" :model="form">
      <el-form-item label="查询条件">
        <el-input
          placeholder="姓名/合同编号/申请提交人"
          :model="form.input">
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in stateOptions"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" title="搜索"></el-button>
      </el-form-item>
      <el-form-item class="table-btn-ctl">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialog.show = true">发起退款申请</el-button>
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
        prop=""
        label="合同编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="客户姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请时其他暂收款金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请退款金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请提交人">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="审核意见">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
      </el-table-column>
      <template slot-scope="scope">
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentPageChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalPage"
      class="pagination">
    </el-pagination>
    <!-- 弹窗 -->
    <refund-application-dialog :data="dialog" @on-close="handleClose"></refund-application-dialog>
  </div>
</template>
<script>
import {
  pickerOptions,
  initSelectOptions,
  formatter
} from '@/util/utils'
// import { listRefund } from '@/service/getData'
import refundApplicationDialog from './children/dialog'
export default {
  name: 'refundApplication', // 退款申请
  components: {
    refundApplicationDialog
  },
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      data: [], // 表格数据
      selects: ['refundApplication'], // 下拉框搜索值
      stateOptions: [{ name: '全部', value: '' }],
      form: { // 搜索表格
        input: '',
        dateRange: '',
        state: ''
      },
      dialog: {
        show: false
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  created () {
    initSelectOptions(this.selects, this.form)
      .then(resp => {
        this.form = resp
      })
  },
  methods: {
    handleCurrentPageChange () { },
    handleClose (refresh) {
      this.dialog.show = false
    }
  }
}
</script>
<style lang="less" scoped>

</style>
