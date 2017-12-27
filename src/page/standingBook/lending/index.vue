<template>
  <div>
    <h1 class="title">待放款</h1>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="formSearch" class="form">
      <el-form-item label="查询条件">
        <el-input class="search-input" v-model="formSearch.input"></el-input>
      </el-form-item>
      <el-form-item label="当前状态">
        <el-select v-model="formSearch.state" placeholder="当前状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待放款" value=""></el-option>
          <el-option label="代付放款待复审" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="风控终审通过时间">
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
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          title="搜索">
        </el-button>
      </el-form-item>
    </el-form>
    <!-- table 表格 -->
    <el-table
      :data="data"
      stripe
      border
      highlight-current-row
      @row-click="handleRowClick"
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
        label="主借款人姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="合同金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="放款账号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="合同期限">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phoneNo"
        label="产品编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="期望放款时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="风控终审通过时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="风控终审人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="当前状态">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDetail = true" title="查看预拨申请详情">查看详情</el-button>
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
    <!-- 查看详情对话框 -->
    <!-- <manager-dialog
      :show="showNewManager"
      :id="id"
      @on-close="closeDialog"></manager-dialog> -->
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import managerDialog from './children/dialog'
export default {
  name: 'predialing-manager',
  // computed: {
  //   ...mapState(['btns', 'userInfo'])
  // },
  data () {
    return {
      areaData: [],
      showDetail: false,      // 显示预拨申请详情对话框
      // btnLoading: false,          // 加载服务器数据中
      btnDisabled: true,          // 编辑客户经理按钮禁用
      total: 0,                   // 数据总条数
      currentPage: 1,             // 默认页面
      pageSize: 15,               // 每页数据条数
      data: [],                   // 预拨申请数据
      formSearch: {               // 查询客户经理配置项
        input: '',
        state: '',
        dateRange: ''
      }
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    },
    handleRowClick (currentRow, oldCurrentRow) {  // 点击表格解禁修改按钮
      this.btnDisabled = false
      this.selectRow = currentRow
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
