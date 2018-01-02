<template>
  <el-container>
    <el-header>
      <div>产品管理</div>
    </el-header>
    <el-main>
      <!-- form search 表单 -->
      <el-form :inline="true" :model="formSearch" class="form">
        <el-form-item label="适用城市">
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
          <el-button
            @click="productionDetail = true"
            type="primary"
            icon="el-icon-circle-plus-outline" title="新增产品">
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
          label="产品编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="产品名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="operateNo"
          label="适用城市">
        </el-table-column>
        <el-table-column
          align="center"
          prop="city"
          label="本金范围（万元）">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orgName"
          label="期限">
        </el-table-column>
        <el-table-column
          align="center"
          prop="branch"
          label="资金项目编码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phoneNo"
          label="创建人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="最近更新时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editor" title="编辑产品信息"></el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="productionDetail = true" title="查看产品详情"></el-button>
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
     <!--绝对定位层-->
    <transition name="el-zoom-in-center">
      <!-- 产品详情 -->
      <production-detail
        ref="detail"
        v-show="productionDetail"
        :data="detail"
        :editorState="stateOff"
        @on-add="addPayment"
        @on-close="closeDetail"
        @on-update="updatePayment"
        @on-copy="copyDialog">
      </production-detail>
    </transition>
    <!-- 新增还款科目对话框 -->
    <productioncourse-dialog
    title="新增还款科目"
    :show="showNewProduction"
    :org-data="orgData"
    :city-data="areaData"
    @on-close="closeDialog"></productioncourse-dialog>
    <!-- 编辑还款科目对话框 -->
    <productioncourse-dialog
    title="编辑还款科目"
    :show="showUpdateProduction"
    :org-data="orgData"
    :manager-data="selectRow"
    :city-data="areaData"
    @on-close="closeDialog"></productioncourse-dialog>
    <!-- 复制产品对话框 -->
    <copyproduction-dialog
      title="复制新增当前产品"
      :show="copyProduction"
      :org-data="orgData"
      :manager-data="selectRow"
      :city-data="areaData"
      @on-close="closeCopyDialog"></copyproduction-dialog>
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
import productionDetail from '../../../components/detail'
import productioncourseDialog from './children/dialog'
import copyproductionDialog from './children/copyDialog'
export default {
  name: 'customer-manager',
  computed: {
    ...mapState(['btns', 'userInfo','production'])
  },
  data () {
    return {
      detail: [],
      stateOff: false,
      areaData: [],
      copyProduction: false,
      productionDetail: false,
      productionDetailupdate: false,
      showNewProduction: false,      // 显示新增客户经理对话框
      showUpdateProduction: false,   // 显示编辑客户经理对话框
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
      keydownSubmit: keydownSubmit,
    }
  },
  components: {
    productionDetail,
    productioncourseDialog,
    copyproductionDialog
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
    addPayment () {
      this.showNewProduction = true
    },
    updatePayment () {
      this.showUpdateProduction = true
    },
    editor () {
       this.stateOff = true
       this.productionDetail = true
    },
    copyDialog () {
      this.copyProduction = true
    },
    closeCopyDialog () {
      this.copyProduction = false
    },
    closeDetail () {
      this.productionDetail = false
    },
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
        this.showUpdateProduction = false
      } else {
        this.showNewProduction = false
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
    float: right;

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
