<template>
  <el-form class="detailForm">
    <!-- 标题 -->
    <el-form-item>
      <h3 class="detailForm-title">退款详情记录表</h3>
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
          label="其他暂收款详情单号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="合同编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="退款支付流水">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="退款方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="待退款金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="退款详情生成时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="退款详情单状态">
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
  name: 'refundDetailsRecord',
  props: ['data']
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
