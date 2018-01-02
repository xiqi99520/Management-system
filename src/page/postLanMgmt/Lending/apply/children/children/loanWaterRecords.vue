<template>
  <el-form class="detailForm">
    <!-- 标题 -->
    <el-form-item>
      <h3 class="detailForm-title">放款流水记录</h3>
    </el-form-item>
    <el-form-item>
      <!-- table 表格 -->
      <el-table
        :data="data"
        stripe
        border
        ref="table"
        style="width: 100%">
        <el-table-column
          align="center"
          prop=""
          label="合同编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="借据状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="客户姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="合同期限">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="合同金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="期望放款时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="风控终审通过时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="实际放款时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="实际放款金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="放款单流水号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="放款结果">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="放款备注">
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'loanWaterRecords',
  props: ['data']
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
