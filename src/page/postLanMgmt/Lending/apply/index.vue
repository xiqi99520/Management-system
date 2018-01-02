<template>
  <el-container>
    <!-- 标题 -->
    <el-header>
      <div>放款申请</div>
    </el-header>
    <!-- 内容 -->
    <el-main>
      <!-- 表格查询 -->
      <el-form
        :inline="true"
        :model="form"
        class="form">
        <el-form-item label="查询条件">
          <el-input
            v-model="form.input"
            placeholder="身份证/姓名/申请编号">
          </el-input>
        </el-form-item>
        <el-form-item label="当前状态">
          <el-select v-model="form.state" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in stateOptions"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="handleSearch"
            :loading="loading"
            type="primary"
            icon="el-icon-search"
            title="搜索">
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        stripe
        border
        ref="table"
        style="width: 100%">
        <el-table-column
          align="center"
          label="序号">
          <template slot-scope="scope">
            <span>{{ formatter.serialNumber(scope.$index, pageSize, currentPage) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="申请人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="applyNo"
          label="申请编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="applyCity"
          label="地区">
        </el-table-column>
        <el-table-column
          align="center"
          prop="applyMoney"
          label="贷款申请金额">
          <template slot-scope="scope">
            <span>&yen;{{ formatter.changeMoney(scope.row.applyMoney, 100) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="申请时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="state"
          label="当前状态">
          <!--<template slot-scope="scope">-->
            <!--<span>{{ formatter.intoPieceState(scope.row) }}</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          align="center"
          prop="lastOperationTime"
          label="最后处理时间">
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini"
              v-show="renderDetailBtn"
              @click="handleDetail(scope.row, false, true)">
              查看详情
            </el-button>
            <el-button type="primary" size="mini"
              v-if="renderReTypingBtn(scope.row)"
              @click="handleDetail(scope.row, true)">
              补件录入
            </el-button>
            <el-button type="primary" size="mini"
              v-if="renderTypingBtn(scope.row)"
              @click="handleDetail(scope.row, true)">
              录入信息
            </el-button>
            <el-button type="primary" size="mini"
              v-if="renderCheckBtn(scope.row)"
              @click="handleDetail(scope.row, false, false, true)">
              风控审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination">
      </el-pagination>
    </el-main>
    <!-- 绝对定位层 -->
    <transition name="el-zoom-in-center">
      <!-- 放款详情 -->
      <lending-apply-detail
        ref="detail"
        v-show="detail.show"
        :data="detail"
        :upload="upload"
        @on-dialog-show="handleShowDialog"
        @on-close="handleDialogClose"
        @on-pre-up="handelPreUpload">
      </lending-apply-detail>
    </transition>
    <!-- 审核不通过 -->
    <loan-apply-dialog
      :data="refuse"
      :table="dialogTable"
      @on-close="handleDialogClose">
    </loan-apply-dialog>
    <!-- 驳回补件 -->
    <loan-apply-dialog
      :data="reject"
      :table="dialogTable"
      @on-close="handleDialogClose">
    </loan-apply-dialog>
    <!-- 审核通过 -->
    <loan-apply-dialog
      :data="pass"
      :table="dialogTable"
      @on-close="handleDialogClose">
    </loan-apply-dialog>
    <!-- 影像资料 -->
    <img-dialog
      :data="img"
      @on-close="handleDialogClose"
      @on-upload="handleImgUpload">
    </img-dialog>
    <!-- 下户费查询 -->
    <under-cost-dialog
      :data="query"
      @on-close="handleDialogClose">
    </under-cost-dialog>
    <!--展示大图-->
    <big-img></big-img>
    <!--产品详情模态框-->
    <detail-dialog></detail-dialog>
  </el-container>
</template>
<script>
import {
  getloanApplyData,
  applyDetail,
  auditRefuse,
  rejectApply,
  auditPass,
  getDict
} from '@/service/getData'
import lendingApplyDetail from './children/detail'
import loanApplyDialog from './children/applyDialog'
import imgDialog from './children/imgDialog'
import underCostDialog from './children/underCostDialog'
import detailDialog from './children/children/children/dialog'
import bigImg from '../../../../components/bigImg'
import { formatter, keydownSubmit } from '@/util/utils'
export default {
  name: 'lendingApply',
  data () {
    return {
      loading: false, // 搜索加载中
      totalPage: 0, // 总页数
      pageSize: 20, // 当前页条数
      currentPage: 1, // 当前页序号
      selects: [ // 查询当前状态下拉框
        'loanApplyState'
      ],
      stateOptions: [  // 状态框
        {
          name: '全部',
          value: ''
        }
      ],
      tableData: [], // 表格数据
      pageSizes: [20, 30, 40], // 表格列表
      form: { // 放款申请查询表单数据
        input: '',
        state: '',
        dateRange: '',
        lastOperation: ''
      },
      pickerOptions: {  // 日期选择器快捷选择功能
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      detail: { // 详情数据
        show: false,
        steps: ['产品信息', '服务人员信息', '进件详情', '主借款人基本信息', '共同借款人基本信息', '担保人基本信息', '放还款信息', '影像资料']
      },
      dialogTable: {}, // 详情对话框
      refuse: { // 拒绝数据
        key: 'refuse',
        show: false,
        title: '提示',
        select: '审核意见(不通过理由)',
        note: '补充说明',
        desc: '确认不予放款后，该单业务立即终止。是否确认不予放款？',
        submitText: '审核不通过',
        sbumitFunc: auditRefuse
      },
      reject: { // 驳回数据
        key: 'reject',
        show: false,
        title: '提示',
        note: '审核意见(补件提示)：',
        desc: '驳回补件后将由相关人员对录入信息进行修改、补充等，可再一次进行提交操作，是否确认驳回补件',
        submitText: '驳回补件',
        sbumitFunc: rejectApply
      },
      pass: { // 通过数据
        key: 'pass',
        show: false,
        title: '是否确认提交放款申请？',
        note: '审核意见',
        desc: '是否确认提交放款申请?',
        submitText: '确认提交',
        sbumitFunc: auditPass
      },
      query: { // 下户费
        label: {},
        show: false
      },
      keydownSubmit: keydownSubmit,
      img: { // 图片
        show: false
      },
      upload: null,
      formatter: formatter  // 格式化函数
    }
  },
  components: {
    // 贷款详情
    lendingApplyDetail,
    // 审核对话框
    loanApplyDialog,
    // 影像资料
    imgDialog,
    // 下户费
    underCostDialog,
    // 展示大图
    bigImg,
    // 产品详情
    detailDialog
  },
  beforeMount () {
    // 预加载表格数据
    this.getTableData()
    getDict(this.selects)
      .then(resp => {
        if (resp.success) {
          this.stateOptions = this.stateOptions.concat(resp.data.loanApplyState)
        }
      })
  },
  beforeRouteLeave (to, from, next) {
    this.detail.show = false
    this.$refs.detail.jump(0)
    next()
  },
  watch: {
    'detail.show' (value) {
      if (!value && this.detail.other.write) { // 清空表单验证
        Object.values(this.$refs.detail.$refs).map(ref => {
          if (ref.$refs.form) {
            if (ref.$refs.form.length) {
              ref.$refs.form.map(form => {
                form.clearValidate()
              })
            } else {
              ref.$refs.form.clearValidate()
            }
          }
        })
      }
    },
    $route: {
      handler: function (val, oldVal) {
        if (val.name === 'lendingApply') {
          this.getTableData()
        }
      },
      deep: true
    }
  },
  methods: {
    getTableData () { // 查询数据
      if (this.form.dateRange === null) {
        this.form.dateRange = ''
      }
      getloanApplyData(this.form, this.currentPage, this.pageSize)
        .then(resp => {
          if (resp.success) {
            this.tableData = resp.data.content
            this.totalPage = resp.data.total
          } else {
            throw (new Error(resp.data.message))
          }
        })
        .catch(err => {
          console.log(err.response)
          this.$notify.error({
            title: '错误',
            message: err.name === 'Error' ? err.message : err.response.data.message
          })
        })
    },
    handleSearch () { // 搜索
      return this.getTableData()
    },
    handleCurrentPageChange (value) { // 切换当前页
      this.currentPage = value
      this.getTableData()
    },
    handleSizeChange (value) { // 切换分页大小
      this.pageSize = value
      this.getTableData()
    },
    renderDetailBtn () { // 判断查看详情按钮
      return formatter.renderBtn('LOAN_PAY_APPLY_DETAIL')
    },
    renderReTypingBtn (row) { // 判断驳回补件按钮
      return formatter.renderBtn('LOAN_PAY_APPLY_FILL') && row.state === '驳回补件'
    },
    renderTypingBtn (row) { // 判断待录入按钮
      return formatter.renderBtn('LOAN_PAY_APPLY_FILL') && row.state === '待录入'
    },
    renderCheckBtn (row) { // 判断待审核按钮
      return formatter.renderBtn('APPLY_RISK_AUDIT') && row.state === '待放款审核'
    },
    handleDetail (row, write = false, detail = false, check = false) { // 查看详情
      applyDetail(row.applyId, row.contractId)
        .then(resp => {
          if (resp.success) {
            // 详情数据初始化
            let data = resp.data
            // 初始化主借款人信息
            let commonBorrower = []
            resp.data.lender.map(item => {
              if (item.mainly === '0') {
                data.mainBorrower = item
              } else {
                commonBorrower.push(item)
              }
            })
            // 初始化共同借款人信息
            data.commonBorrower = commonBorrower
            // 初始化附加信息
            data.other = {
              applyId: row.applyId,
              contractId: row.contractId,
              //              state: formatter.intoPieceState(row),
              state: row.state,
              lastOperation: row.lastOperationTime,
              write,
              detail,
              check
            }
            // 显示详情组件
            data.show = true
            this.detail = data
            // 详情对话框表格数据
            this.dialogTable = {
              name: data.mainBorrower ? data.mainBorrower.name : '',
              contractCode: data.loanDetail ? data.loanDetail.contractCode : '',
              contractMoney: data.loanDetail ? data.loanDetail.contractMoney : 0,
              applyId: row.applyId,
              contractId: row.contractId
            }
          } else {
            throw (new Error(resp.message))
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify.error({
            title: '错误',
            message: err.name === 'Error' ? err.message : err.response.data.message
          })
        })
    },
    handleDetailClose () { // 详情页关闭
      this.detail.show = false
    },
    handleShowDialog (dialog, data = null) { // 显示对话框
      this[dialog].show = true
      if (data) {
        this[dialog].data = data
      }
    },
    handleDialogClose (dialog, refresh = false, detailClose = false) { // 关闭对话框
      this[dialog].show = false
      if (detailClose) {
        this.detail.show = false
      }
      if (refresh) {  // 提交成功后刷新表格
        this.getTableData()
      }
    },
    handelPreUpload (data) { // 图片对话框数据
      let img = data
      img.show = true
      this.img = img
    },
    handleImgUpload (data) { // 图片上传
      this.upload = data
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
  .input-select {
    width: 100px;
  }
}
</style>
