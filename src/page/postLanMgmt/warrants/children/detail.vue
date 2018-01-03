<template>
  <el-container class="detail-full-screnn">
    <el-container class="detailForm">
      <el-aside>
        <el-row>
          <el-col>权证上抵资料</el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              <p class="detail-title">
                <span>权证上抵详情</span>
              </p>
            </el-col>
            <el-col :span="12" class="detail-title-btn">
              <el-button type="primary" @click="handleClose">返回</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main id="detailMain" class="detailForm">
          <!-- 详情 -->
          <product-table></product-table>
        </el-main>
      </el-container>
    </el-container>
</el-container>
</template>
<script>
import productTable from './productTable'

export default {
  name: 'lendingApplyDetail',
  components: {
    productTable
  },
  data () {
    return {

    }
  },
  watch: {

  },
  methods: {
    handleClose () { // 预上传图片
      this.$emit('on-close')
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/color";

.detail-full-screnn {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: @white;
  z-index: 4;
  text-align: left;
}

.detail-title {
  line-height: 60px;
  font-size: 18px;
  margin: 0;
  span {
    display: inline-block;
    text-indent: 10px;
    border-left: 4px solid @blue;
    line-height: 1;
    font-size: 24px;
    color: #333;
  }
}

.detail-title-btn {
  text-align: right;
}

.el-container {
  overflow: auto;
  .el-main {
    padding: 0 20px;
    overflow: auto;
  }

  .el-aside {
    width: 200px !important;
    background-color: @gray;
    .el-row {
      text-indent: 35px;
      line-height: 50px;
    }
    .active {
      color: @white;
      background-color: @blue;
      font-weight: bold;
    }
  }
}

</style>
