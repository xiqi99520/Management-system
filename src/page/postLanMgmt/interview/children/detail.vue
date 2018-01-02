<template>
  <el-container class="detail-full-screnn">
    <el-container class="detailForm">
      <el-aside>
        <el-row>
          <el-col>征信报告（详版）</el-col>
          <el-col>资料核实</el-col>
          <el-col>合同签署上传</el-col>
          <el-col>合同公证上传</el-col>
          <el-col>其他公证上传</el-col>
          <el-col>是否陪同上抵</el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              <p class="detail-title">
                <span>合同面签详情</span>
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
  // padding-left: 200px;
  margin: 0;
  span {
    display: inline-block;
    text-indent: 10px;
    border-left: 4px solid @blue;
    line-height: 1;
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
