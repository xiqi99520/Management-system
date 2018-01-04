<template>
  <el-container class="detail-full-screnn">
    <el-container class="detailForm">
      <el-aside>
        <el-row>
          <el-col>资料核验</el-col>
          <el-col>婚史执行及其他</el-col>
          <el-col>放款确认</el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              <p class="detail-title">
                <span>风控审查详情</span>
              </p>
            </el-col>
            <el-col :span="12" class="detail-title-btn">
              <el-button type="primary" @click="handleClose">返回</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main id="detailMain" class="detailForm">
          <el-row>
            <el-col :span="24">
              <el-tabs type="card" v-model="activeTab">
                <el-tab-pane label="放款确认" name="first">
                  <!-- 放款确认 详情 -->
                  <product-table></product-table>
                </el-tab-pane>
                <el-tab-pane label="房产评估" name="second">
                  <step-one></step-one>
                </el-tab-pane>
                <el-tab-pane label="下户尽调" name="third">
                  <step-two></step-two>
                </el-tab-pane>
                <el-tab-pane label="初审评定" name="fourth">
                  <step-three></step-three>
                </el-tab-pane>
                <el-tab-pane label="终审评定" name="five">
                  <step-three></step-three>
                </el-tab-pane>
                <el-tab-pane label="风控稽核" name="six">
                  <step-three></step-three>
                </el-tab-pane>
                <el-tab-pane label="面签公证" name="seven">
                  <interview-detail></interview-detail>
                </el-tab-pane>
                <el-tab-pane label="权证上抵" name="eight">
                  <warrants-detail></warrants-detail>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
</el-container>
</template>
<script>
import productTable from './productTable'
import stepOne from '../../riskApproval/children/stepOne'
import stepTwo from '../../riskApproval/children/stepTwo'
import stepThree from '../../riskApproval/children/stepThree'
import interviewDetail from '../../interview/children/productTable'
import warrantsDetail from '../../warrants/children/productTable'

export default {
  name: 'lendingApplyDetail',
  components: {
    productTable,
    stepOne,
    stepTwo,
    stepThree,
    interviewDetail,
    warrantsDetail
  },
  data () {
    return {
      activeTab: 'first',
    }
  },
  watch: {

  },
  methods: {
    handleClose () {
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
