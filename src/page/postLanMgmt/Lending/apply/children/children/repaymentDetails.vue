<template>
  <el-form class="detailForm">
    <!-- 标题 -->
    <el-form-item>
      <h3 class="detailForm-title">还款详情表</h3>
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
                label="实还金额">
              </el-table-column>
            </el-tablb>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款详情单号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款流水记录号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="合同编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="还款类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="本笔详情金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="期次">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="详情生成时间">
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
  name: 'repaymentDetails',
  props: ['data']
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
