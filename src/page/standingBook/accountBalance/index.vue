<template>
  <div>
    <!-- 标题 -->
    <h2>账户余额查询</h2>
    <!-- 搜索框 -->
    <el-form :inline="true" :model="form">
      <el-form-item label="查询条件">
        <el-input
          placeholder="账户编号/账户名称"
          :model="form.input">
        </el-input>
      </el-form-item>
      <el-form-item label="账户所有权归属主体">
        <el-select v-model="form.accountType" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s1"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="账户所属资金项目">
        <el-select v-model="form.fundsProjectId" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.s2"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" title="搜索"></el-button>
      </el-form-item>
    </el-form>
    <p>提示：系统记录的账户余额均根据已录入系统的流水进行计算，因流水录入系统与实际发生存在时间差，因此系统查询出的余额有可能与实际的账户余额有差，请知悉。</p>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="data"
      highlight-current-row>
      <el-table-column
        align="center"
        prop="fundsAccoutId"
        label="账户编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="fundsAccountNo"
        label="账户号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="fundsProjectName"
        label="账户所属资金项目">
      </el-table-column>
      <el-table-column
        align="center"
        prop="accountType"
        label="账户类型">
      </el-table-column>
      <el-table-column
        align="center"
        prop="accountOrg"
        label="账户所有权主体">
      </el-table-column>
      <el-table-column
        align="center"
        prop="accountOwnerType"
        label="开具账户机构类型">
      </el-table-column>
      <el-table-column
        align="center"
        prop="accountOwnerName"
        label="开具账户机构名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="money"
        label="账户余额">
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
import { initSelectOptions, initTable } from '@/util/utils'
import { getAccountBalance } from '@/service/getData'
export default {
  name: 'accountBalance', // 账户余额查询
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      data: [], // 表格数据
      selects: ['s1', 's2'],
      form: { // 搜索表格
        input: '',
        accountType: '',
        fundsProjectId: ''
      },
      options: {
        s1: [{ name: '全部', value: '' }],
        s2: [{ name: '全部', value: '' }]
      }
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
      initTable(getAccountBalance, this)
    },
    handleCurrentPageChange () { },
    handleClose (refresh) {
    }
  }
}
</script>
<style lang="less" scoped>

</style>
