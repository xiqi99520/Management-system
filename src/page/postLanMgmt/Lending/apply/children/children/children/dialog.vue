<template>
  <el-dialog
    :visible.sync="showDialog"
    width="80%"
    top="0"
    class="productStyle">
    <detail
      :editor-state="data">
    </detail>
  </el-dialog>
</template>
<script>
  import { mapState } from 'vuex'
  import detail from '@/components/detail'
  export default {
    name: 'productDetailDialog',
    components: {
      // 产品详情
      detail
    },
    computed: {
      ...mapState(['productDetail'])
    },
    data () {
      return {
        showDialog: false,
        data: {
          productId: ''
        }
      }
    },
    methods: {},
    watch: {
      productDetail (value) {
        this.showDialog = value.showDialog
        this.data.productId = value.productId
      }
    }
  }
</script>
<style lang="less" scoped>
  .productStyle{
    .detail-full-screnn{
      position: static;
    }
  }
</style>
