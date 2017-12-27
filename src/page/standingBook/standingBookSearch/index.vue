<template>
  <div>
    <h1 class="title">台账查询</h1>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="formSearch" class="form">
      <el-form-item label="查询条件">
        <el-input class="search-input" v-model="formSearch.input"></el-input>
      </el-form-item>
      <el-form-item label="放款状态">
        <el-select v-model="formSearch.state" placeholder="资金项目名称">
          <el-option label="已放款" value=""></el-option>
          <el-option label="待放款" value=""></el-option>
          <el-option label="取消放款" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期望放款时间">
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
          @click="searchSubmit"
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
        label="合同期限">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="产品编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phoneNo"
        label="业务机构">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="放款状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="实际放款时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="应还款日期">
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
import {
  getstandingBook
} from '../../../service/getData'
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
      formSearch: {               // 查询客户经理配置项
        input: '',
        state: '',
        dateRange: ''
      },
      keydownSubmit: keydownSubmit
    }
  },
  // components: {
  //   managerDialog
  // },
  beforeMount () {
    this.doGetStandingBook()
  },
  mounted () {
    keydownSubmit(this.searchSubmit)
  },
  methods: {
    handleCurrentPageChange (currentPage) {       // 切换页面重新加载远程数据
      return this.doGetStandingBook(this.formSearch.input, this.formSearch.city, this.pageSize * (currentPage - 1))
    },
    searchSubmit () {               // form 表单提交
      this.doGetStandingBook(this.formSearch.input, this.formSearch.city)
        .then(() => {
        })
    },
    doGetStandingBook (input = '', state = '', dateRange = '', offset = 0) {    // 查询、过滤数据
      return getstandingBook(input, state, dateRange, offset)
        .then(resp => {
          if (resp.success) {
            this.data = resp.data.content
            this.total = resp.data.total
          } else {
            throw (new Error(resp.message))
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: err.message,
            duration: 0
          })
        })
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    },
    closeDialog (update, refresh) {      // 关闭对话框, 刷新数据
      if (update) {
        this.showUpdateManager = false
      } else {
        this.showNewManager = false
      }

      if (refresh) {
        this.searchSubmit()
      }
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
