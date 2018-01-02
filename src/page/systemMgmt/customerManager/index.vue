<template>
  <div>
    <h3 class="main-content-title">客户经理管理</h3>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="formSearch" class="form">
      <el-form-item>
          <el-input class="search-input" v-model="formSearch.input" placeholder="客户经理手机号/姓名/支行"></el-input>
      </el-form-item>
      <el-form-item label="所属地区">
        <el-select v-model="formSearch.city" placeholder="地区名称">
          <el-option label="所有地区" value=""></el-option>
          <el-option v-for="(option, index) in areaData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="searchSubmit"
          :loading="btnLoading"
          type="primary"
          icon="el-icon-search"
          title="搜索">
        </el-button>
      </el-form-item>
      <el-form-item class="table-btn-ctl">
        <a :href="templateUrl" download="导入客户经理模板.xlsx">
          <el-button type="primary" icon="el-icon-download" title="下载导入模板">批量导入模板</el-button>
        </a>
        <el-upload
          class="upload"
          :action="uploadUrl"
          :show-file-list="false"
          :file-list="fileList"
          :on-success="uploadSuccess"
          :on-error="uploadError">
          <el-button type="primary" icon="el-icon-upload2" title="上传导入文件">批量导入</el-button>
        </el-upload>
        <el-button
          @click="showNewManager = true"
          type="primary"
          icon="el-icon-circle-plus-outline" title="新增客户经理">
        </el-button>
        <!--<el-button-->
          <!--type="primary"-->
          <!--icon="el-icon-edit"-->
          <!--:disabled="btnDisabled"-->
          <!--@click="showUpdateManager = true"-->
          <!--title="编辑客户经理">-->
        <!--</el-button>-->
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
        label="姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operateNo"
        label="工行营销代码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="地区">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orgName"
        label="支行">
      </el-table-column>
      <el-table-column
        align="center"
        prop="branch"
        label="网点">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phoneNo"
        label="客户经理手机号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间">
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
    <!-- 新增客户经理对话框 -->
    <manager-dialog
      title="新增客户经理"
      :show="showNewManager"
      :org-data="orgData"
      :city-data="areaData"
      @on-close="closeDialog"></manager-dialog>
    <!-- 新增客户经理对话框 -->
    <manager-dialog
      title="编辑客户经理"
      :show="showUpdateManager"
      :org-data="orgData"
      :manager-data="selectRow"
      :city-data="areaData"
      @on-close="closeDialog"></manager-dialog>
  </div>
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
@import "~@/style/public";
// .el-header {
//     text-align: left;
//     line-height: 20px;
//     height: 20px !important;
//   div {
//     text-indent: 10px;
//     border-left: 5px solid @blue;
//     font-size: 20px;
//   }
// }
.form {
  text-align: left;

  .search-input {
    min-width: 200px;
  }

  .table-btn-ctl {
    float: right;

    .upload {
      display: inline-block;
    }
  }
}

.pagination {
  margin-top: 20px;
}

// .title {
//   text-align: left;
// }
</style>
