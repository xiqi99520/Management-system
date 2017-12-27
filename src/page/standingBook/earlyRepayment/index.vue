<template>
  <div>
    <h1 class="title">代偿入账</h1>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="formSearch" class="form">
      <el-form-item label="查询条件">
        <el-input class="search-input" v-model="formSearch.input"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formSearch.state">
          <el-option label="已提交" value=""></el-option>
          <el-option label="已拒绝" value=""></el-option>
          <el-option label="生效中" value=""></el-option>
          <el-option label="已过期" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-date-picker
          v-model="formSearch.dateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划提前还本时间">
        <el-date-picker
          v-model="formSearch.dateRange01"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="searchSubmit"
          type="primary"
          icon="el-icon-search"
          title="搜索">
        </el-button>
      </el-form-item>
       <el-form-item>
        <el-button
          @click="searchSubmit"
          type="primary"
          title="新增提前还款申请">
          新增提前还款申请
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
        prop="username"
        label="合同编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operateNo"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="申请提前还款本金">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="申请其他暂收款抵扣金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="约定提前还款日期">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="操作人ID">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="申请时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="复核人ID">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="审批时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="审核意见">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" title="详情">详情</el-button>
          <el-button type="primary" title="审核">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentPageChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
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
import { keydownSubmit } from '@/util/utils'
// import managerDialog from './children/dialog'
export default {
  name: 'standingBook-manager',
  data () {
    return {
      // btnLoading: false,          // 加载服务器数据中
      total: 0,                   // 数据总条数
      currentPage: 1,             // 默认页面
      pageSize: 15,               // 每页数据条数
      data: [],                   // 台账数据
      formSearch: {               // 查询客户经理配置项
        input: '',
        day: '',
        dateRange: ''
      },
      keydownSubmit: keydownSubmit
    }
  },
  mounted () {
    keydownSubmit(this.searchSubmit)
  },
  methods: {
    handleCurrentPageChange (currentPage) {       // 切换页面重新加载远程数据
      return this.doGetgetOverdueList(this.formSearch.input, this.formSearch.city, this.pageSize * (currentPage - 1))
    },
    searchSubmit () {               // form 表单提交
      this.doGetgetOverdueList(this.formSearch.input, this.formSearch.city)
        .then(() => {
        })
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
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
