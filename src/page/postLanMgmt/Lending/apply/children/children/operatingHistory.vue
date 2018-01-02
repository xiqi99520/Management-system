<template>
  <el-form class="detailForm">
    <!-- 标题 -->
    <el-form-item>
      <h3 class="detailForm-title">操作历史记录</h3>
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
          label="审核时间／操作时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="审核步骤／操作步骤">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="审核部门">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="审核人身份">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="审核人">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="审核结果">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="审核意见">
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'operatingHistory',
  props: ['data']
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
