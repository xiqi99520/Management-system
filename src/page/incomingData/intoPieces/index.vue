<template>
  <div>
    <!-- form search 表单 -->
    <el-form :inline="true" :model="formSearch" class="form">
      <el-form-item label="查询条件:">
        <el-input v-model="formSearch.input" placeholder="申请人/申请编号"></el-input>
      </el-form-item>
      <!-- 当前状态 -->
      <el-form-item label="当前状态">
        <el-select v-model="formSearch.state" filterable placeholder="全部" style="width:100%;">
          <el-option
            v-for="(option, index) in stateData"
            :key="index"
            :label="option"
            :value="option">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 最后处理动作 -->
      <!-- <el-form-item label="最后处理动作">
        <el-select v-model="formSearch.lastOperation" filterable placeholder="全部" style="width:100%;">
          <el-option
            v-for="(option, index) in operationData"
            :key="index"
            :label="option"
            :value="option">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- 申请时间 -->
      <el-form-item label="申请时间">
        <el-date-picker
          v-model="formSearch.dateRange"
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
          @click="searchSubmit"
          :loading="btnLoading"
          type="primary"
          icon="el-icon-search"
          title="搜索">
        </el-button>
      </el-form-item>
    </el-form>
    <!-- form table contorl -->
    <el-form :inline="true" class="form">
      <el-form-item>
        <el-tag type="info">30分钟以内的订单</el-tag>
        <el-tag type="warning">等待30~60分钟的订单</el-tag>
        <el-tag type="danger">等待60分钟以上的订单</el-tag>
      </el-form-item>
      <el-form-item ref="btns">
        <template v-for="(button, index) in btns" v-if="button.type === '操作' && Object.keys(btnState).includes(button.code)">
            <el-button
              :key="index"
              :ref="button.code"
              :disabled="checkBtn(button)"
              @click="showDialog(button)"
              type="primary">
              {{button.name}}
            </el-button>
        </template>
      </el-form-item>
    </el-form>
    <!-- table 进件表格数据 -->
    <el-table
      border
      highlight-current-row
      :data="data"
      @row-click="handleRowClick"
      ref="table"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="applyNo"
        label="申请编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="申请人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyCity"
        label="地区">
      </el-table-column>
      <!-- <el-table-column
        align="center"
        prop="gender"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phoneNo"
        label="手机号"
        width="100">
      </el-table-column> -->
      <el-table-column
        align="center"
        prop="createTime"
        label="申请时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="referrerUserName"
        label="推荐人"
        min-width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="channelName"
        label="渠道代办"
        min-width="70"
        :formatter="formatterName">
      </el-table-column>
      <el-table-column
        align="center"
        prop="applyMoney"
        label="贷款申请金额">
        <template slot-scope="scope">
          <span>{{ formatter.changeMoney(scope.row.applyMoney, 100) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="loanMonth"
        label="货款期限">
      </el-table-column>
      <el-table-column
        align="center"
        prop="auditMoney"
        label="合同金额"
        :formatter="formatterMoney">
      </el-table-column>
      <el-table-column
        align="center"
        prop="state"
        label="当前状态"
        :formatter="formatterState">
      </el-table-column>
      <!-- <el-table-column
        align="center"
        prop="lastOperation"
        label="最后处理动作">
      </el-table-column>
      <el-table-column
        align="center"
        prop="lastOperationTime"
        label="最后处理时间"
        min-width="100">
      </el-table-column> -->
      <el-table-column
        align="center"
        label="等待时间"
        min-width="100">
        <template slot-scope="scope">
          <span v-if="notWaitStates.includes(scope.row.state) || !scope.row.lastOperationTime">-</span>
          <el-tag type="info" v-else-if="waitTime(scope.row) <= 30">{{scope.row.waitTime()}}</el-tag>
          <el-tag type="warning" v-else-if="scope.row.timeDiff <= 60">{{scope.row.waitTime()}}</el-tag>
          <el-tag type="danger" v-else>{{scope.row.waitTime()}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="detailBtn"
        align="center"
        label="查看详情"
        width="80">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-tickets"
            title="查看详情"
            @click="showDetail(scope.row.applyId)">
        </el-button>
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
    <!-- 审核通过对话框 -->
    <!--<pass-dialog :show="dialogState.APPLY_AUDIT_PASS" :id="selectRow.applyId" @on-close="hideDialog"></pass-dialog>-->
    <!-- 审核拒绝对话框 -->
    <deny-dialog :show="dialogState.APPLY_AUDIT_DENY" :id="selectRow.applyId" @on-close="hideDialog"></deny-dialog>
    <!-- 客户放弃对话框 -->
    <cancel-dialog :show="dialogState.APPLY_CUSTOM_CANCEL" :id="selectRow.applyId" @on-close="hideDialog"></cancel-dialog>
    <!-- 进件分配对话框 -->
    <acceptor-dialog :show="dialogState.ASSIGN_ACCEPTOR" :id="selectRow.applyId" :acceptor-data="acceptorData" @on-close="hideDialog"></acceptor-dialog>
    <!-- 进件跟进对话框 -->
    <follow-dialog :show="dialogState.APPLY_FOLLOW" :id="selectRow.applyId" @on-close="hideDialog"></follow-dialog>
    <transition name="el-zoom-in-center">
      <into-piece-detail
        v-show="detail.show"
        :data="detail"
        @on-close="handleCloseDetail">
      </into-piece-detail>
    </transition>
  </div>
</template>

<script>
import {
  getIncomingData,
  getIncomingDataDetail,
  getAcceptors,
  getAllOperations,
  getAllStates
} from '@/service/getData'
import denyDialog from './children/deny'
import cancelDialog from './children/cancel'
import acceptorDialog from './children/acceptor'
import followDialog from './children/follow'
import intoPieceDetail from './children/detail'
import { mapState } from 'vuex'
import { formatter, keydownSubmit } from '@/util/utils'
export default {
  name: 'into-pieces',
  data () {
    return {
      btnLoading: false,        // 按钮加载中
      pageSize: 15,                // 每页条数
      totalPage: 0,                 // 表格总数
      currentPage: 1,           // 当前页数
      data: [],                 // 表格数据
      acceptorData: [],         // 分配人员数据
      stateData: [],            // 状态数据
      operationData: [],        // 处理动作数据
      // renderBtns: [],                 // 操作按钮
      notWaitStates: ['待放款审核', '审核不通过', '客户放弃'],  // 不需要等待的状态
      formSearch: {             // 查询表单
        input: '',
        state: '',
        lastOperation: '',
        dateRange: ''
      },
      pickerOptions: {          // 日期选择器快捷选择功能
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
      selectRow: {},             // 选择的行
      btnState: {                 // 按钮状态
        //        APPLY_AUDIT_PASS: false,
        APPLY_AUDIT_DENY: false,
        APPLY_CUSTOM_CANCEL: false,
        ASSIGN_ACCEPTOR: false,
        APPLY_FOLLOW: false
      },
      dialogState: {                 // 对话框状态
        //        APPLY_AUDIT_PASS: false,
        APPLY_AUDIT_DENY: false,
        APPLY_CUSTOM_CANCEL: false,
        ASSIGN_ACCEPTOR: false,
        APPLY_FOLLOW: false
      },
      detail: {
        show: false
      },
      keydownSubmit: keydownSubmit,
      formatter: formatter  // 格式化函数
    }
  },
  beforeMount () {
    this.doGetIncomingData()
    getAcceptors()
      .then(resp => {
        if (resp.success) {
          this.acceptorData = resp.data
        }
      })
    getAllOperations()
      .then(resp => {
        if (resp.success) {
          this.operationData = resp.data
        }
      })
    getAllStates()
      .then(resp => {
        if (resp.success) {
          this.stateData = resp.data
          this.stateData.unshift('全部')
        }
      })
  },
  mounted () {
    keydownSubmit(this.searchSubmit)
  },
  components: {
    //    passDialog,
    denyDialog,
    cancelDialog,
    acceptorDialog,
    followDialog,
    // 进件详情
    intoPieceDetail
  },
  computed: {
    ...mapState(['btns', 'userInfo', 'allStates']),
    detailBtn () {
      let render = false
      this.btns.map(item => {
        if (item.code === 'INTO_PIECES_DETAIL') {
          render = true
        }
      })
      return render
    }
  },
  beforeRouteLeave (to, from, next) {
    this.detail.show = false
    next()
  },
  methods: {
    searchSubmit () {           // 加载进件数据
      this.doGetIncomingData()
    },
    doGetIncomingData () {
      getIncomingData(this.formSearch, this.currentPage, this.pageSize)
        .then(resp => {
          if (resp.success) {
            this.data = resp.data.content
            this.totalPage = resp.data.total
            for (let i in this.btnState) {
              this.btnState[i] = false
            }
          }
        })
      // TODO:错误处理
    },
    handleRowClick (currentRow) {
      this.selectRow = currentRow
      for (let i in this.btnState) {
        this.btnState[i] = false
      }
//      if (['客户已申请', '已提交贷款', '风控已预审', '待跟进', '待客户经理推荐', '待风控总监预审'].includes(currentRow.state)) {
      let statesArr = this.allStates
      if (![statesArr.C1008, statesArr.C1009, statesArr.C1010].includes(currentRow.state)) {  // 审核不通过、客户放弃
        this.btnState.APPLY_CUSTOM_CANCEL = this.btnState.APPLY_AUDIT_DENY = true
      }
      if (currentRow.state === statesArr.C1003) {    // 待分配
        //        this.btnState.APPLY_AUDIT_PASS = this.btnState.APPLY_AUDIT_DENY = this.btnState.APPLY_CUSTOM_CANCEL = true
        this.btnState.ASSIGN_ACCEPTOR = true
      }
      if (currentRow.state === statesArr.C1004) {        // 待跟进
        //        this.btnState.ASSIGN_ACCEPTOR = this.btnState.APPLY_AUDIT_DENY = this.btnState.APPLY_CUSTOM_CANCEL = true
        this.btnState.APPLY_FOLLOW = true
      }
    },
    handleCurrentPageChange () { // 切换当前页面
      this.doGetIncomingData()
    },
    formatterState (row, column, cellValue) {       // 格式化当前状态
      if (['客户已申请', '待评房'].includes(cellValue)) {
        return '评房中'
      } else {
        return cellValue
      }
    },
    formatterMoney (row, column, cellValue) {       // 格式化申请金额
      if (!cellValue) {
        return '-'
      } else {
        return '￥' + String(cellValue / 100).replace(/(?=((?!\b)\d{3})+$)/g, ',')
      }
    },
    formatterName (row, column, cellValue) {  // 格式化用户
      return (cellValue === '用户' || cellValue === null) ? '-' : cellValue
    },
    waitTime (row) {                                // 计算等待时间
      const now = new Date().getTime()
      if (!row.lastOperationTime) {
        return '-'
      }
      const targetTime = new Date(row.lastOperationTime.replace(/-/g, '/')).getTime()
      const diffTime = now - targetTime
      row.timeDiff = Math.ceil(diffTime / 1000 / 60)
      row.waitTime = () => {
        const days = diffTime / 1000 / 60 / 60 / 24
        const daysRound = Math.floor(days)
        const hours = diffTime / 1000 / 60 / 60 - (24 * daysRound)
        const hoursRound = Math.floor(hours)
        const minutes = diffTime / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)
        const minutesRound = Math.floor(minutes)
        if (daysRound >= 1) {
          return `${daysRound}天${hoursRound}小时${minutesRound}分`
        } else if (hoursRound >= 1) {
          return `${hoursRound}小时${minutesRound}分`
        } else {
          return `${minutesRound}分`
        }
      }
      return diffTime
    },
    checkBtn (button) {                             // 变更按钮状态
      for (let [code, state] of Object.entries(this.btnState)) {
        if (code === button.code) {
          return !state
        }
      }
    },
    showDialog (button) {
      this.dialogState[button.code] = true
    },
    hideDialog (code, refresh) {                  // 对话框隐藏变更状态
      this.dialogState[code] = false
      if (refresh) {
        this.doGetIncomingData()
      }
    },
    showDetail (id) {
      getIncomingDataDetail(id)
        .then(resp => {
          if (resp.success) {
            let detail = resp.data
            detail.show = true
            this.detail = detail
          } else {
            throw new Error(resp.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify.error({
            title: '获取进件详情失败',
            message: err.name === 'Error' ? err.message : err.response.data.message
          })
        })
      // this.$router.push({
      //   path: `${this.$route.path}/detail`,
      //   query: {
      //     index: this.$route.query.index,
      //     id
      //   }
      // })
    },
    handleCloseDetail () {
      this.detail.show = false
    }
  }
}
</script>
<style lang="less" scoped>

</style>
