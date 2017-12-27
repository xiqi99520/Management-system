<template>
  <el-dialog
    title="图片上传"
    :visible.sync="show"
    ref="dialog"
    @close="handleClose"
    width="40%"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label-width="0" style="text-align: center;">
        <embed style="max-width: 100%;max-height: 200px" :src="context + file" v-if="(imgType === 'application/pdf' || imgType === 'pdf')"> </embed>
        <img v-else :src="context + file" alt="" style="max-width: 100%">
        <!--<img :src="file" alt="" style="max-width: 100%">-->
      </el-form-item>
      <el-form-item label="影像资料名称：">
        <el-input v-model="form.name" :maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="form.note" :maxlength="10"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'imgDialog',
  data () {
    return {
      context: process.env.CONTEXT,
      show: false,
      file: '',
      type: '',
      imgType: '',
      loading: false,
      form: {
        name: '',
        note: ''
      }
    }
  },
  props: ['data'],
  watch: {
    data (value) {
      this.show = value.show
      this.file = value.file
      this.type = value.type
      this.imgType = value.imgType || value.file.split('.')[1]
      this.form = {
        name: value.name || '',
        note: value.note || '',
        type: value.type,
        modify: value.modify || false
      }
      this.loading = false
    }
  },
  methods: {
    handleClose (submit = false) {
      this.show = false
      this.$emit('on-close', 'img')
    },
    handleSubmit () {
      this.$emit('on-upload', this.form)
      this.handleClose(true)
    }
  }
}
</script>
<style lang="less" scoped>
img {
  max-width: 400px !important;
}
</style>
