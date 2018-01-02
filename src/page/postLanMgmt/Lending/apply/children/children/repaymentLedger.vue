<template>
  <el-form class="detailForm">
    <!-- 标题 -->
    <el-form-item>
      <h3 class="detailForm-title">还款台账</h3>
    </el-form-item>
    <el-form-item>
      <!-- table 表格 -->
      <el-table
        :data="data"
        stripe
        border
        ref="table"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tablb
              >
              <el-table-column
                align="center"
                prop=""
                label="科目名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop=""
                label="应还">
              </el-table-column>
              <el-table-column
                align="center"
                prop=""
                label="实还">
              </el-table-column>
              <el-table-column
                align="center"
                prop=""
                label="减免">
              </el-table-column>
            </el-tablb>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="合同编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="期次">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="应还款日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="待还总额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="应还总额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="实还总额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="减免总额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="当期剩余本金">
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'repaymentLedger',
  props: ['data']
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
