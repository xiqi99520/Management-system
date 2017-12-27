<template>
  <el-dialog
    :title="name"
    :visible.sync="bigImgVisible">
    <embed
      style="max-width: 100%;height: 500px"
      v-if="type === 'pdf'"
      :src="context + url">
    </embed>
    <img
      style="max-width: 100%"
      v-else
      :src="context + url"
      alt="">
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'bigImg',
  computed: {
    ...mapState(['bigImg'])
  },
  data () {
    return {
      context: process.env.CONTEXT,
      bigImgVisible: false,
      name: '',
      type: '',
      url: ''
    }
  },
  watch: {
    bigImg (value) {
      this.bigImgVisible = value.showBigImg
      this.name = value.imgName || ''
      this.type = value.imgType
      this.url = value.imgUrl
    }
  }
}
</script>
<style>

</style>
