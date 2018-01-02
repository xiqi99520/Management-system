<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">放款明细</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <table class="" cellspacing="0" cellpadding="10">
        <tr>
          <th>借款编号</th>
          <th>客户姓名</th>
          <th>放款到账账号</th>
          <th>合同金额</th>
          <th>风控审批金额</th>
          <th>期望放款时间</th>
          <th>风控放款审查时间</th>
          <th>趸缴费用金额</th>
          <th>趸缴扣费账号</th>
          <th>项目名称</th>
        </tr>
        <tr>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
          <td>借款编号</td>
        </tr>
      </table>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'loanDetail',
  // props: ['data', 'other'],
  data () {
    return {
      data: {}
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
