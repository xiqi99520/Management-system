<template>
  <div>
    <h1 class="title">预拨申请</h1>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="formSearch" class="form">
      <el-form-item label="查询条件">
        <el-input class="search-input" v-model="formSearch.input" placeholder="姓名/合同编号/申请编号"></el-input>
      </el-form-item>
      <el-form-item label="资金项目名称">
        <el-select v-model="formSearch.project" placeholder="资金项目名称">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(option, index) in areaData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formSearch.state" placeholder="状态">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(option, index) in areaData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请放款提交时间">
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
      <el-form-item label="期望放款时间">
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
    </el-form>
    <el-row>
      <el-col :span="12">
        <div>
          <p>温馨提示：1、为了及时、准确地提交预拨申请，预拨申请的可提交时间为每日14:00-16:30，请注意在可提交时间内提交预拨申请；</p>
          <p>2、每日只能提交一次预拨申请，请小心提交，如有任何问题请及时与技术部门联系</p>
        </div>
        </el-col>
      <el-col :span="12">
        <div>
          <span>已选择总金额</span><span>1,000,000</span>元
        </div>
      </el-col>
    </el-row>
    <!-- table 表格 -->
    <el-table
      :data="data"
      stripe
      border
      ref="table"
      style="width: 100%">
       <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        type="index"
        :index="indexMethod"
        label="序号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operateNo"
        label="资金项目名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="申请编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="申请产品">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="合同编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phoneNo"
        label="合同金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="放款账户开户行">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="放款账号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="期望放款时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="申请放款提交时间">
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
  getPredialing
} from '../../../service/getData'
// import managerDialog from './children/dialog'
export default {
  name: 'predialing-manager',
  // computed: {
  //   ...mapState(['btns', 'userInfo'])
  // },
  data () {
    return {
      areaData: [],
      showNewManager: false,      // 显示新增客户经理对话框
      showUpdateManager: false,   // 显示编辑客户经理对话框
      // btnLoading: false,          // 加载服务器数据中
      btnDisabled: true,          // 编辑客户经理按钮禁用
      total: 0,                   // 管理员数据总条数
      currentPage: 1,             // 默认页面
      pageSize: 15,               // 管理员每页数据条数
      data: [],                   // 预拨申请数据
      multipleSelection: [],              // 多选的数据
      formSearch: {               // 查询客户经理配置项
        input: '',
        state: '',
        project: '',
        dateRange: '',
        dateRange01: ''
      },
      keydownSubmit: keydownSubmit
    }
  },
  // components: {
  //   managerDialog
  // },
  beforeMount () {
    this.doGetManagers()
  },
  mounted () {
    keydownSubmit(this.searchSubmit)
  },
  methods: {
    handleCurrentPageChange (currentPage) {       // 切换页面重新加载远程数据
      return this.doGetManagers(this.formSearch.input, this.formSearch.city, this.pageSize * (currentPage - 1))
    },
    searchSubmit () {               // form 表单提交
      this.doGetManagers(this.formSearch.input, this.formSearch.city)
        .then(() => {
        })
    },
    doGetManagers (input = '', city = '', offset = 0) {    // 查询、过滤客户经理数据
      this.btnDisabled = true
      return getPredialing(input, city, offset)
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
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
        this.btnDisabled = false
      } else {
        this.$refs.table.clearSelection()
        this.btnDisabled = true
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
