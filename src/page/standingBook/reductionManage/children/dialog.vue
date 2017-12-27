<template>
  <div>
    <!-- 用户信息 -->
    <el-dialog
      title="提示"
      :visible.sync="Show"
      @close="Close"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      width="46%">
      <el-form
        :model="form"
        :rules="rules"
        status-icon
        label-position="right"
        label-width="80px"
        ref="form">
        <!-- 手机号 -->
        <el-form-item label="审核意见" prop="phone">
          <el-input
            placeholder="请输入审核意见"
            type="text"
            auto-complete="off"
            :maxlength="11"
            v-model="form.phone"
            :readonly="update">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="phone">
          <el-input
            placeholder="请输入备注"
            type="text"
            auto-complete="off"
            :maxlength="11"
            v-model="form.phone"
            :readonly="update">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserInfoForm('form')">确认提交</el-button>
        <el-button @click="Show = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'userDialog',
  props: ['show', 'type'],
  data () {
    return {
      loading: false,                        // 用户信息对话框加载中
      Show: this.show                       // 显示用户信息对话框
    }
  }
}
</script>

<style lang="less" scoped>
</style>
