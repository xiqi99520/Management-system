<template>
  <div>
    <!-- 标题 -->
    <h2>第三方支付非业务类流水记录</h2>
    <!-- 表格搜索 -->
    <el-form :inline="true" :model="form">
      <el-form-item label="查询条件">
        <el-input
          placeholder="流水号/资金项目/到账银行账户/操作人"
          :model="form.input">
        </el-input>
      </el-form-item>
      <el-form-item label="资金项目名称">
        <el-select v-model="form.fundsProjectId" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.project"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="流水方向">
        <el-select v-model="form.busiDirection" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.direction"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="流水时间">
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
        <el-button type="primary" icon="el-icon-search" title="搜索"></el-button>
      </el-form-item>
      <el-form-item class="table-btn-ctl">
        <el-button type="primary" icon="el-icon-circle-plus-outline" title="新增" @click="confirm.show = true">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="data"
      highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" label-width="140px">
            <el-col :span="8">
              <el-form-item label="资金项目名称：">{{scope.row.fundsProjectName}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流水方向：">{{scope.row.busiSubject}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第三方机构：">{{scope.row.thirdOrg}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账户类型：">{{scope.row.acctType}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账户号：">{{scope.row.acctNo}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="往来资金账户类型：">{{scope.row.outAcctType}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="往来资金账户开户行：">{{scope.row.acctBank}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="往来资金账户号：">{{scope.row.outAcctNo}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注：">{{scope.row.remark}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作人：">{{scope.row.creator}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入账时间：">{{scope.row.creatorDate}}</el-form-item>
            </el-col>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="序号">
        <template slot-scope="scope">
          <span>{{ formatter.serialNumber(scope.$index, pageSize, currentPage) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="outBusiCode"
        label="流水号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busiSubject"
        label="流水科目">
      </el-table-column>
      <el-table-column
        align="center"
        prop="busiDate"
        label="流水时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="money"
        label="流水金额">
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
    <!-- 专户、待拨户非业务流水入账确认 -->
    <transition name="el-zoom-in-center">
      <!-- <third-party-records-confirm v-show="confirm.show"></third-party-records-confirm> -->
    </transition>
  </div>
</template>
<script>
import {
  pickerOptions,
  initSelectOptions,
  formatter,
  initTable
} from '@/util/utils'
import { getThirdNoBusinessRecord } from '@/service/getData'
import thirdPartyRecordsConfirm from './children/confirm'
export default {
  name: 'thirdPartyRecords', // 第三方支付非业务类流水记录
  components: {
    thirdPartyRecordsConfirm
  },
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      dateRange: null,
      data: [], // 表格数据
      selects: ['project', 'direction'],  // 下拉框搜索值
      options: {
        project: [{ name: '全部', value: '' }],
        direction: [{ name: '全部', value: '' }]
      },  // 下拉框选项
      form: { // 搜索表格
        input: '',
        fundsProjectId: '',
        busiDirection: '',
        startDate: '',
        endDate: '',
        count: true
      },
      confirm: {
        show: false
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  created () {
    initSelectOptions(this.selects, this.options)
      .then(() => {
        return this.getTableData()
      })
  },
  methods: {
    getTableData () {
      initTable(getThirdNoBusinessRecord, this)
    },
    handleCurrentPageChange () { },
    handleClose (refresh) {
    }
  }
}
</script>
<style lang="less" scoped>

</style>
