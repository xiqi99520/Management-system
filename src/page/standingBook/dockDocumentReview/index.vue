<template>
  <div>
    <!-- 标题 -->
    <h2>渤海对接文档审核</h2>
    <!-- 搜素框 -->
    <el-form :inline="true" :model="form">
      <el-form-item label="文件目录">
        <el-input
          placeholder="可以联想搜索"
          :model="form.input">
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="选择状态">
            <el-option
              v-for="(option, idx) in stateOptions"
              :key="idx"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="计划上传时间">
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
        <el-button type="primary" icon="el-icon-search" title="搜索" @click="handleSubmit"></el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="data"
      highlight-current-row>
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
        label="文件目录">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="文件名">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="格式">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="计划上传时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="审核人">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="审核备注">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="审核时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="实际上传时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
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
    <!-- 弹窗 -->
    <dock-document-review-dialog :data="dialog" @on-close="handleClose"></dock-document-review-dialog>
  </div>
</template>
<script>
import { pickerOptions, formatter } from '@/util/utils'
import dockDocumentReviewDialog from './children/dialog'
export default {
  name: 'dockDocumentReview', // 渤海对接文档审核
  components: {
    dockDocumentReviewDialog
  },
  data () {
    return {
      totalPage: 0,       // 用户数据总量
      currentPage: 1,     // 默认页面
      pageSize: 15,       // 每页数量
      stateOptions: [{ name: '全部', value: '' }],
      data: [], // 表格数据
      selects: ['s1', 's2'],
      form: { // 搜索表格
        input: '',
        dateRange: ''
      },
      dialog: { // 审核意见弹窗
        show: false
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  methods: {
    handleCurrentPageChange () { },
    handleClose (refresh) {
      this.dialog.show = false
    },
    handleSubmit () {
      this.dialog.show = true
    }
  }
}
</script>
<style lang="less" scoped>

</style>
