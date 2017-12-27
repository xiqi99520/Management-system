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
        <el-select v-model="form.s1" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s1"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="是否成功">
        <el-select v-model="form.s2" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s2"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="资金项目">
        <el-select v-model="form.s3" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s3"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="记录来源">
        <el-select v-model="form.s4" placeholder="选择状态">
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
    </el-form>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="data"
      highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="资金项目名称"></el-form-item>
            <el-form-item label="流水方向"></el-form-item>
            <el-form-item label="账户类型"></el-form-item>
            <el-form-item label="账户开户行"></el-form-item>
            <el-form-item label="账户号"></el-form-item>
            <el-form-item label="往来资金账户类型"></el-form-item>
            <el-form-item label="往来资金账户名"></el-form-item>
            <el-form-item label="往来资金账户号"></el-form-item>
            <el-form-item label="备注"></el-form-item>
            <el-form-item label="操作人"></el-form-item>
            <el-form-item label="入账时间"></el-form-item>
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
        prop=""
        label="流水号">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="流水科目">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="流水时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
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
import { pickerOptions, formatter } from '@/util/utils'
export default {
  name: 'repayingWaterRecords', // 放还款流水记录查询
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
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
        dateRange: ''
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  methods: {
    handleCurrentPageChange () { },
    handleClose (refresh) {
    }
  }
}
</script>
<style lang="less" scoped>

</style>
