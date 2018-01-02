<template>
  <el-form class="detailForm">
    <!-- 标题 -->
    <el-form-item>
      <h3 class="detailForm-title">减免详情记录表</h3>
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
                label="减免金额">
              </el-table-column>
            </el-tablb>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="减免单编号">
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
          label="减免详情生成时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="减免详情记录单状态">
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
  name: 'waiverDetails',
  props: ['data']
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
