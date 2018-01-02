<template>
  <div>
    <!-- 标题 -->
    <h2>放还款流水记录查询</h2>
    <!-- 搜素框 -->
    <el-form :inline="true" :model="form">
      <el-form-item label="查询条件">
        <el-input
          placeholder="流水号/借款编号/操作人"
          :model="form.input">
        </el-input>
      </el-form-item>
      <el-form-item label="流水科目">
        <el-select v-model="form.fundsProjectId" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s1"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="是否成功">
        <el-select v-model="form.status" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s2"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="资金项目">
        <el-select v-model="form.busiSubject" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s3"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="记录来源">
        <el-select v-model="form.busiResource" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s4"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="流水时间">
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
    </el-form>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="data"
      highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" label-width="140px">
            <el-col :span="8">
              <el-form-item label="资金项目名称：">{{scope.row.fundsProjectName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流水来源：">{{scope.row.busiSource}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行联账户类型：">{{scope.row.accountType}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行联账户机构名称：">{{scope.row.acctOrg}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行联账户账号：">{{scope.row.accountNo}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否成功：">{{scope.row.status}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：">{{scope.row.contractCode}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户账户号：">{{scope.row.customerAccNo}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户姓名：">{{scope.row.customerName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作人：">{{scope.row.creator}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入账时间：">{{scope.row.createDate}}</el-form-item>
            </el-col>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="序号">
        <template slot-scope="scope">
          <span>{{ formatter.serialNumber(scope.$index, pageSize, currentPage) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="outBusiCode"
        label="流水号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busiSubject"
        label="流水科目">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busiDate"
        label="流水时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="money"
        label="流水金额">
      </el-table-column>
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
  </div>
</template>
<script>
import {
  pickerOptions,
  initSelectOptions,
  formatter,
  initTable
} from '@/util/utils'
import { getLendRepayBusiness } from '@/service/getData'
export default {
  name: 'repayingWaterRecords', // 放还款流水记录查询
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      dateRange: '',
      data: [], // 表格数据
      selects: ['s1', 's2', 's3', 's4'],
      options: {
        s1: [{ name: '全部', value: '' }],
        s2: [{ name: '全部', value: '' }],
        s3: [{ name: '全部', value: '' }],
        s4: [{ name: '全部', value: '' }]
      },
      form: { // 搜索表格
        input: '',
        fundsProjectId: '',
        status: '',
        busiSubject: '',
        busiResource: '',
        startDate: '',
        endDate: '',
        count: true
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  created () {
    initSelectOptions(this.selects, this.options)
      .then(resp => {
        this.options = resp
      })
      .then(() => {
        return this.getTableData()
      })
  },
  methods: {
    getTableData () {
      initTable(getLendRepayBusiness, this)
    },
    handleCurrentPageChange () { },
    handleClose (refresh) {
    }
  }
}
</script>
<style lang="less" scoped>

</style>
