<template>
  <div>
    <!-- 标题 -->
    <h3 class="main-content-title">退款入账</h3>
    <!-- 表格搜索 -->
    <el-form :inline="true" :model="form">
      <el-form-item label="查询条件">
        <el-input
          placeholder="姓名/合同编号/申请提交人"
          :model="form.input">
        </el-input>
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
        <el-button type="primary" icon="el-icon-search" @click="handleSubmit" title="搜索"></el-button>
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
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="合同编号">
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
        label="性别">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="申请退款时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="getTabelData"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalPage"
      class="pagination">
    </el-pagination>
    <!-- 弹窗 -->
    <refunds-credited-dialog :data="dialog" @on-close="handleClose"></refunds-credited-dialog>
    <!-- 退款入账确认 -->
    <transition name="el-zoom-in-center">
      <!-- <refunds-credited-confirm v-show="confirm.show"></refunds-credited-confirm> -->
    </transition>
  </div>
</template>
<script>
import {
  pickerOptions,
  formatter,
  initTable
} from '@/util/utils'
import { listRefund } from '@/service/getData'
import refundsCreditedDialog from './children/dialog'
import refundsCreditedConfirm from './children/confirm'
export default {
  name: 'refundsCredited', // 退款申请
  components: {
    refundsCreditedDialog,
    refundsCreditedConfirm
  },
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      dateRange: null,
      data: [], // 表格数据
      form: { // 搜索表格
        input: '',
        startDate: null,
        endDate: null,
        count: true
      },
      dialog: {
        show: false
      },
      confirm: {
        show: false
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  created () {
    this.getTabelData()
  },
  methods: {
    getTabelData () {
      initTable(listRefund, this)
    },
    handleCurrentPageChange () { },
    handleSubmit () {
      // 打开新页面
      // window.open('#/systemMgmt/customerMgmt?index=0')
      this.confirm.show = true
    },
    handleClose (refresh) {
      this.dialog.show = false
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/public";
</style>
