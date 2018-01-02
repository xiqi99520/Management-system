<template>
  <el-form class="detailForm">
    <!-- 标题 -->
    <el-form-item>
      <h3 class="detailForm-title">还款流水表</h3>
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
          label="还款流水记录号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="支付流水号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="合同编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款总金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款到账账户">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款到账时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款来源账户号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="流水记录时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款结果">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="未入账金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款前状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款后状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="记录单状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="备注">
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'repaymentManifold',
  props: ['data']
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
