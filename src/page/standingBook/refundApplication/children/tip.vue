<template>
  <!-- 用户信息 -->
  <el-dialog
    :title="data.title"
    :visible.sync="show"
    @close="handleClose"
    width="40%">
    <span>
      当前其他暂收款为0元，不足退款申请金额，无法通过该退款申请
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">确 认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'refundApplicationTip',
  props: ['data'],
  data () {
    return {
      show: false  // 显示弹窗
    }
  },
  watch: {
    data: {
      handler (value) {
        this.show = value.show
      },
      deep: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('on-close', this.data.type)
    }
  }
}
</script>
