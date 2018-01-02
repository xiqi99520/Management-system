<template>
  <el-container>
    <el-header>
      <div>资金项目管理</div>
    </el-header>
    <el-main>
      <!-- 表格查询 -->
      <el-form
        :inline="true"
        :model="form"
        class="form">
        <el-form-item>
          <el-button
            @click="showNewManager = true"
            type="primary"
            icon="el-icon-circle-plus-outline" title="添加新账户">
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
          label="资金项目编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="资金项目编码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="operateNo"
          label="资金项目名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="city"
          label="资金项目金融机构">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orgName"
          label="创建人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="branch"
          label="创建时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phoneNo"
          label="备注">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="收益机构">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showUpdateManager = true" title="编辑客户经理"></el-button>
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
    </el-main>
    <!-- 新增客户经理对话框 -->
    <manager-dialog
      title="添加新账户"
      :show="showNewManager"
      :org-data="orgData"
      :city-data="areaData"
      @on-close="closeDialog"></manager-dialog>
    <!-- 新增客户经理对话框 -->
    <manager-dialog
      title="编辑账户"
      :show="showUpdateManager"
      :org-data="orgData"
      :manager-data="selectRow"
      :city-data="areaData"
      @on-close="closeDialog"></manager-dialog>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import { keydownSubmit } from '@/util/utils'
import {
  getManagers,
  uploadManagerUrl,
  templateFileUrl,
  getOrganizations,
  getDict
} from '../../../service/getData'
import managerDialog from './children/dialog'
export default {
  name: 'customer-manager',
  computed: {
    ...mapState(['btns', 'userInfo'])
  },
  data () {
    return {
      form: {},
      areaData: [],
      showNewManager: false,      // 显示新增客户经理对话框
      showUpdateManager: false,   // 显示编辑客户经理对话框
      btnLoading: false,          // 加载服务器数据中
      btnDisabled: true,          // 编辑客户经理按钮禁用
      total: 0,                   // 管理员数据总条数
      currentPage: 1,             // 默认页面
      pageSize: 15,               // 管理员每页数据条数
      templateUrl: templateFileUrl,
      uploadUrl: uploadManagerUrl,
      fileList: [],               // 上传的文件
      data: [],                   // 管理员数据
      orgData: [],                // 支行和网点信息
      selectRow: {},              // 当前选中行
      formSearch: {               // 查询客户经理配置项
        input: '',
        city: '',
        opencity: ['OpenCity'],
        roleId: ''
      },
      keydownSubmit: keydownSubmit
    }
  },
  components: {
    managerDialog
  },
  beforeMount () {
    this.doGetManagers()
    getOrganizations()
      .then(resp => {
        if (resp.success) {
          this.orgData = resp.data
        }
      })
    this.btns.map(btn => {
      if (btn.name === '客户经理新增') {
        if (btn.cities.includes('总部')) {
          getDict(this.formSearch.opencity)
            .then(resp => {
              if (resp.success) {
                resp.data.OpenCity.map(obj => {
                  this.areaData.push(obj.name)
                })
              }
            })
        } else {
          this.areaData = btn.cities
        }
      }
    })
    //    getDict(this.formSearch.opencity)
    //      .then(resp => {
    //        if (resp.success) {
    //          this.areaData = resp.data.OpenCity
    //          console.log(resp.data.OpenCity)
    //          console.log(this.areaData)
    //        }
    //      })
  },
  mounted () {
    keydownSubmit(this.searchSubmit)
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
      this.btnLoading = true
      this.doGetManagers(this.formSearch.input, this.formSearch.city)
        .then(() => {
          this.btnLoading = false
        })
    },
    doGetManagers (input = '', city = '', offset = 0) {    // 查询、过滤客户经理数据
      this.btnDisabled = true
      return getManagers(input, city, offset)
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
    uploadSuccess (resp) {
      if (resp.success) {
        this.$notify.success({
          title: '上传成功',
          message: resp.message
        })
        setTimeout(() => {
          this.$router.go(0)
        }, 2000)
      } else {
        this.$notify.error({
          title: '上传失败',
          message: resp.message,
          duration: 0
        })
      }
    },
    uploadError (err) {
      this.$notify.error({
        title: '上传失败',
        message: err.message,
        duration: 0
      })
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

.form {
  text-align: left;

  .search-input {
    min-width: 200px;
  }

  .table-btn-ctl {
    float: left;

    .upload {
      display: inline-block;
    }
  }
}

.pagination {
  margin-top: 20px;
}

.title {
  text-align: left;
}
</style>
