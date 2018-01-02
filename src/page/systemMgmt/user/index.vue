<template>
  <el-container>
    <el-header>
      <div>用户管理</div>
    </el-header>
    <el-main>
      <el-form :inline="true" :model="formSearch" class="form-search">
        <el-form-item>
          <el-input v-model="formSearch.input" placeholder="请输入用户名/手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-select v-model="formSearch.roleId" placeholder="角色名称">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(option, index) in roleData" :key="index" :label="option.roleName" :value="option.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchSubmit" :loading="btnLoading" title="搜索"></el-button>
        </el-form-item>
        <el-form-item class="table-btn-ctl">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="showNewUser = true" title="添加内部管理账号"></el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="userData"
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
          label="姓名">
          <template v-if="scope.row.authorities.length" slot-scope="scope">
            <span v-if="scope.row.username === '用户'">{{ scope.row.username }}{{ scope.row.userId }}</span>
            <span v-else>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="phoneNo"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          align="center"
          label="角色">
          <template v-if="scope.row.authorities.length" slot-scope="scope">
            <span v-for="(item, idx) in scope.row.authorities" :key="idx" style="display: block">{{item.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="state"
          label="状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建日期">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEditClick" title="修改"></el-button>
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
    </el-main>
    <!-- 新增用户信息 -->
    <user-dialog title="新增用户信息" :show="showNewUser" :roles="roleData" @on-close="Close" ></user-dialog>
    <!-- 编辑用户信息 -->
    <user-dialog title="编辑用户信息" :show="showUpdateUser" :user-data="currentRow" :roles="roleData" @on-close="Close" ></user-dialog>
  </el-container>
</template>

<script>
import {
  getUsersInfo,
  getRoleList
} from '../../../service/getData'
import userDialog from './children/dialog'
import { keydownSubmit } from '@/util/utils'
export default {
  name: 'userContorl',
  data () {
    return {
      userData: [],       // 用户数据
      roleData: [],       // 角色数据
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      btnLoading: false,  // 查询按钮加载中
      btnDisabled: false,  // 修改按钮禁用
      showNewUser: false, // 显示新增用户信息对话框
      showUpdateUser: false,  // 显示修改用户信息对话框
      currentRow: {}, // 当前选中行
      formSearch: {       // 用户过滤查询
        input: '',
        roleId: []
      },
      keydownSubmit: keydownSubmit
    }
  },
  components: {
    userDialog
  },
  beforeMount () {
    // 获取表格数据
    this.doGetUsersInfo()
    getRoleList() // 获取角色名称
      .then(resp => {
        if (resp.success) {
          this.roleData = resp.data
        }
      })
  },
  mounted () {
    keydownSubmit(this.searchSubmit)
  },
  methods: {
    handleRowClick (currentRow, oldCurrentRow) {  // 点击表格解禁修改按钮
      this.btnDisabled = false
      this.currentRow = currentRow
    },
    handleCurrentPageChange (currentPage) {       // 切换页面重新加载远程数据
      return this.doGetUsersInfo(this.formSearch.input, this.formSearch.roleId, this.pageSize * (currentPage - 1))
    },
    searchSubmit () {                             // 按条件搜索远程数据
      return this.doGetUsersInfo(this.formSearch.input, this.formSearch.roleId)
    },
    doGetUsersInfo (input = '', roleId = '', offset = 0) {  // 加载服务器数据,处理错误
      this.btnDisabled = true
      this.btnLoading = true
      getUsersInfo(input, roleId, offset)
        .then(resp => {
          this.btnLoading = false
          if (resp.success) {
            this.userData = resp.data.content
            this.totalPage = resp.data.total
          } else {
            throw (new Error(resp.message))
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err.message,
            duration: 0
          })
        })
    },
    Close (isUpdate, refresh) {
      if (isUpdate) {
        this.showUpdateUser = false
      } else {
        this.showNewUser = false
      }
      if (refresh) {
        this.searchSubmit()
      }
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    },
    handleEditClick () {
      this.showUpdateUser = true
      // this.currentRow.time = new Date().getTime()
    }
  }
}
</script>

<style lang="less" scoped>

@import "~@/style/color";
.el-header {
    text-align: left;
    line-height: 20px;
    height: 20px !important;
  div {
    text-indent: 10px;
    border-left: 5px solid @blue;
    font-size: 20px;
  }
}

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
