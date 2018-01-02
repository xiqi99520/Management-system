<template>
  <div>
    <h1 class="title">减免管理</h1>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="form" class="form">
      <el-form-item label="查询条件">
        <el-input class="search-input" v-model="form.input" placeholder="姓名/合同编号/申请编号" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state">
          <el-option label="全部" value=""></el-option>
          <el-option label="待审核" value=""></el-option>
          <el-option label="审核通过" value=""></el-option>
          <el-option label="审核拒绝" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="放款时间">
        <el-date-picker
          v-model="form.dateRange"
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
          title="发起减免">
          发起减免
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
        label="可减免总金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="申请减免金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="申请提交人">
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
        label="风控审核意见">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="财务审核意见">
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
          <el-button type="primary" size="small" title="通过">通过</el-button>
          <el-button type="primary" size="small" title="拒绝">拒绝</el-button>
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
// import managerDialog from './children/dialog'
export default {
  name: 'standingBook-manager',
  // computed: {
  //   ...mapState(['btns', 'userInfo'])
  // },
  data () {
    return {
      // btnLoading: false,          // 加载服务器数据中
      total: 0,                   // 数据总条数
      currentPage: 1,             // 默认页面
      pageSize: 15,               // 每页数据条数
      data: [],                   // 台账数据
      dateRange: null,
      form: {               // 查询客户经理配置项
        input: '',
        day: '',
        dateRange: ''
      }
    }
  },
  methods: {
    // handleCurrentPageChange (currentPage) {       // 切换页面重新加载远程数据
    //   return this.doGetStandingBook(this.formSearch.input, this.formSearch.city, this.pageSize * (currentPage - 1))
    // },
    // searchSubmit () {               // form 表单提交
    //   this.doGetStandingBook(this.formSearch.input, this.formSearch.city)
    //     .then(() => {
    //     })
    // },
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
