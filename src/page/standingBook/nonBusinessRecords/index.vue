<template>
  <div>
    <!-- 标题 -->
    <h2>专户、待拨户非业务类流水记录</h2>
    <!-- 表格搜索 -->
    <el-form :inline="true" :model="form">
      <el-form-item label="查询条件">
        <el-input
          placeholder="流水号/资金项目/到账银行账户/操作人"
          :model="form.input">
        </el-input>
      </el-form-item>
      <el-form-item label="资金项目名称">
        <el-select v-model="form.project" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in options.project"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="流水方向">
        <el-select v-model="form.direction" placeholder="选择状态">
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
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="资金项目名称"></el-form-item>
            <el-form-item label="流水方向"></el-form-item>
            <el-form-item label="账户类型"></el-form-item>
            <el-form-item label="账户开户行"></el-form-item>
            <el-form-item label="账户号"></el-form-item>
            <el-form-item label="往来资金账户类型"></el-form-item>
            <el-form-item label="往来资金账户名"></el-form-item>
            <el-form-item label="往来资金账户号"></el-form-item>
            <el-form-item label="备注"></el-form-item>
            <el-form-item label="操作人"></el-form-item>
            <el-form-item label="入账时间"></el-form-item>
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
        prop=""
        label="流水号">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="流水科目">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="流水时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
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
      <non-business-records-confirm v-show="confirm.show"></non-business-records-confirm>
    </transition>
  </div>
</template>
<script>
import { pickerOptions } from '@/util/utils'
import nonBusinessRecordsConfirm from './children/confirm'
export default {
  name: 'nonBusinessRecords', // 专户、待拨户非业务类流水记录
  components: {
    nonBusinessRecordsConfirm
  },
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      data: [], // 表格数据
      selects: ['project', 'direction'],  // 下拉框搜索值
      options: {},  // 下拉框选项
      form: { // 搜索表格
        input: '',
        dateRange: '',
        project: [{ name: '全部', value: '' }],
        direction: [{ name: '全部', value: '' }]
      },
      confirm: {
        show: false
      },
      pickerOptions: pickerOptions
    }
  },
  methods: {
    handleCurrentPageChange () { },
    handleClose (refresh) {
    }
  }
}
</script>
<style lang="less" scoped>

</style>
