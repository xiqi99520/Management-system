<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">系统外手工放款信息</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <el-row>
        <el-col :span="6">实际放款金额 {{data.no}}</el-col>
        <el-col :span="6">实际放款时间 {{data.no}}</el-col>
        <el-col :span="6">放款到账账号 {{data.no}}</el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">放款方式 {{data.no}}</el-col>
        <el-col :span="6">放款账户 {{data.no}}</el-col>
        <el-col :span="6">放款单流水号 {{data.no}}</el-col>
        <el-col :span="6">放款账户机构 {{data.no}}</el-col>
      </el-row>
      <el-row v-if="stata">
        <el-col :span="12">放款复审意见 
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'other',
  // props: ['data', 'other'],
  data () {
    return {
      data: {}
    }
  },
  watch: {
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
