<template>
  <div>
    <h1 class="title">预拨申请记录</h1>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="form" class="form">
      <el-form-item label="查询条件">
        <el-input class="search-input" v-model="form.input" placeholder="操作人ID/操作人姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-select v-model="form.project" placeholder="资金项目名称">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(option, index) in areaData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="文件名">
          <el-input class="search-input" v-model="form.name" placeholder="预拨申请书文件名"></el-input>
      </el-form-item>
      <el-form-item label="提交时间">
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
      <el-table-column
        align="center"
        prop="createTime"
        label="预拨申请书文件名">
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
import {
  pickerOptions,
  // initSelectOptions,
  formatter
  // initTable
} from '@/util/utils'
import {
  getPredialingLog
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
      showDetail: false,      // 显示预拨申请详情对话框
      // btnLoading: false,          // 加载服务器数据中
      btnDisabled: true,          // 编辑客户经理按钮禁用
      total: 0,                   // 数据总条数
      currentPage: 1,             // 默认页面
      pageSize: 15,               // 每页数据条数
      data: [],                   // 预拨申请数据
      dateRange: null,
      form: {               // 查询客户经理配置项
        input: '',
        project: '',
        name: '',
        startDate: '',
        endDate: ''
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  // components: {
  //   managerDialog
  // },
  beforeMount () {
    this.doGetManagers()
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.name === 'customerManager') {
          this.doGetManagers()
        }
      },
      deep: true
    }
  },
  methods: {
    handleRowClick (currentRow, oldCurrentRow) {  // 点击表格解禁修改按钮
      this.btnDisabled = false
      this.selectRow = currentRow
    },
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
      return getPredialingLog(input, city, offset)
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
      this.showDetail = false

      if (refresh) {
        this.searchSubmit()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-search {
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
