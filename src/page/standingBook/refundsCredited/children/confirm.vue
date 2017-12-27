<template>
  <el-container class="detail-full-screnn">
    <el-header>退款入账确认</el-header>
    <el-main>
      <el-form
        label-position="right"
        label-width="100px"
        :form="form"
        :rules="rules">
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="合同编号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="客户姓名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="应退款金额">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="申请退款日期">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="实际退款金额">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="实际退款时间">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="退款到账账号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="退款方式">
              <el-select style="width: 100%;"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="退款账户">
              <el-select style="width: 100%;"></el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="退款单流水号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="退款账户机构">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="退款备注">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'refundsCreditedConfirm',
  data () {
    return {
      form: {},
      rules: {}
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/public";
</style>
