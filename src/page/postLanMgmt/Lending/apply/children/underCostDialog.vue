<template>
    <el-dialog
    title="下户费查询"
    :visible.sync="show"
    ref="dialog"
    @close="handleClose"
    width="40%">
    <el-form class="detailForm"  label-position="left" label-width="100px">
      <el-form-item label="姓名">{{1}}</el-form-item>
      <el-form-item label="手机号">{{2}}</el-form-item>
      <el-form-item label="实缴金额">{{3}}</el-form-item>
      <el-form-item label="支付时间">{{4}}</el-form-item>
      <el-form-item label="支付结果">{{5}}</el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: 'underCostDialog',
  data () {
    return {
      show: false,
      label: {}
    }
  },
  props: ['data'],
  watch: {
    data: {
      handler (value) {
        this.show = value.show
        this.label = value.data
      },
      deep: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('on-close', 'query')
    }
  }
}
</script>
