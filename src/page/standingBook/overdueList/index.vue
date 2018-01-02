<template>
  <div>
    <h1 class="title">逾期列表</h1>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="form" class="form">
      <el-form-item label="查询条件">
        <el-input class="search-input" v-model="form.input" placeholder="手机号/身份证/姓名/合同编号/申请编号" clearable></el-input>
      </el-form-item>
      <el-form-item label="逾期天数">
        <el-select v-model="form.day">
          <el-option label="全部" value=""></el-option>
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应还款日期">
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
        <el-button
          type="primary"
          icon="el-icon-search"
          title="搜索" @click="_getTableData">
        </el-button>
      </el-form-item>
    </el-form>
    <!-- table 表格 -->
    <el-table
      :data="data"
      stripe
      border
      ref="table"
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        :index="indexMethod"
        label="序号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractCode"
        label="合同编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="mainName"
        label="主借款人姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractMoney"
        label="合同金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractTerm"
        label="合同期限">
      </el-table-column>
      <el-table-column
        align="center"
        prop="productNo"
        label="产品编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyCity"
        label="申请城市">
      </el-table-column>
      <el-table-column
        align="center"
        prop="shouldRepayMoney"
        label="应还款总金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="shouldRepayDate"
        label="应还款日期">
      </el-table-column>
      <el-table-column
        align="center"
        prop="latestRepayTime"
        label="最后一次还款时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="overdueDays"
        label="逾期天数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="penaltyMoney"
        label="罚息">
      </el-table-column>
      <el-table-column
        align="center"
        prop="manageFee"
        label="逾期管理费">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" title="查看详情"></el-button>
        </template>
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
    <!-- 新增客户经理对话框 -->
    <!-- <manager-dialog
      title="新增客户经理"
      :show="showNewManager"
      :org-data="orgData"
      :city-data="areaData"
      @on-close="closeDialog"></manager-dialog> -->
    <!-- 新增客户经理对话框 -->
    <!-- <manager-dialog
      title="编辑客户经理"
      :show="showUpdateManager"
      :org-data="orgData"
      :manager-data="selectRow"
      :city-data="areaData"
      @on-close="closeDialog"></manager-dialog> -->
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import {
  pickerOptions,
  // initSelectOptions,
  formatter,
  initTable
} from '@/util/utils'
import {
  getOverdueList
} from '@/service/getData'
// import managerDialog from './children/dialog'
export default {
  name: 'overdueList-manager',
  // computed: {
  //   ...mapState(['btns', 'userInfo'])
  // },
  data () {
    return {
      // btnLoading: false,          // 加载服务器数据中
      totalPage: 0,               // 总页数
      currentPage: 1,             // 默认页面
      pageSize: 15,               // 每页数量
      data: [],                   // 台账数据
      dateRange: null,
      form: {               // 查询客户经理配置项
        input: '',
        day: '',
        startDate: '',
        endDate: ''
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  // mounted () {
  //   keydownSubmit(this.searchSubmit)
  // },
  created () {
    this._getTableData()
  },
  methods: {
    _getTableData () {
      initTable(getOverdueList, this)
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    },
    handleCurrentPageChange (currentPage) {       // 切换页面重新加载远程数据
      return this.doGetManagers(this.formSearch.input, this.formSearch.city, this.pageSize * (currentPage - 1))
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  text-align: left;
}

.table-btn-ctl {
  float: right;
}

.pagination {
  margin-top: 20px;
}

.title {
  text-align: left;
}
</style>
