<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">审核记录</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
          label="审核时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="审核步骤"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核部门">
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核人身份">
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核人">
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核结果">
        </el-table-column>
        <el-table-column
          prop="address"
          label="审核意见">
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'examineLog',
  // props: ['data', 'other'],
  data () {
  },
  watch: {
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
