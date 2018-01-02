<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">财务放款初审确认</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <el-row>
        <el-col :span="24">放款总金额： {{data.no}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">趸缴扣款总金额: {{data.no}}</el-col>
      </el-row>
      <el-row v-if="stata">
        <el-col :span="12">初审意见：
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
  name: 'theTrialConfirm',
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
