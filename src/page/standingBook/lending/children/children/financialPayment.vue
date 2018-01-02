<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">财务代付及复审确认</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <el-row>
        <el-col :span="12">放款代付机构： 
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">放款总金额： {{data.no}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">趸缴代扣机构：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">趸缴扣款总金额: {{data.no}}</el-col>
      </el-row>
      <el-row v-if="stata">
        <el-col :span="12">复审意见：
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
  name: 'financialPayment',
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
