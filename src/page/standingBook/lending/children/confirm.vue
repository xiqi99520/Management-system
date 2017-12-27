<template>
  <el-container class="detail-full-screnn">
    <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              <p class="detail-title">
                <span>放款入账确认</span>
              </p> 
            </el-col>
            <el-col :span="12" class="detail-title-btn">
              <el-button type="primary" @click="handleBack">返回</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main id="detailMain" @scroll.native="onScroll">
          <el-row>
            <el-col>合同编号 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>客户姓名 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>手机号 {{data.no}}</el-col>
          </el-row>
          <p>申请详情</p>
          <el-row>
            <el-col>申请提前还款本金 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>约定提前还款日期 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>申请提前还款本金 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>提前还款本金对应应还利息 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>申请提前还款总金额 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>其他暂收款抵扣金额 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>提前还款申请状态 {{data.no}}</el-col>
          </el-row>
          <p>提前还款测算</p>
          <el-row>
            <el-col>选择实际提前还款日期 
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>应提前还本金 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>提前还本部分利息 {{data.no}}</el-col>
          </el-row>
          <el-row>
            <el-col>提前还款应还总金额 {{data.no}}</el-col>
          </el-row>
          <!-- 完成录入 -->
          <el-row style="margin-bottom: 20px; text-align: center;">
            <el-col :span="24">
              <el-button v-if="tableData.other.write" type="primary" @click="handleComplete" :loading="loading">完成录入</el-button>
              <template v-if="render3Btn()">
                <el-button type="primary"
                  v-if="formatter.renderBtn('APPLY_AUDIT_DENY')" 
                  @click="handleShowDialog('refuse')" 
                  :loading="loading">
                  审核不通过
                </el-button>
                <el-button type="primary" 
                  v-if="formatter.renderBtn('REJECT_APPLY_FILL')" 
                  @click="handleShowDialog('reject')" 
                  :loading="loading">
                  驳回补件
                </el-button>
                <el-button type="primary" 
                  v-if="formatter.renderBtn('APPLY_AUDIT_PASS')" 
                  @click="handleShowDialog('pass')" 
                  :loading="loading">
                  审核通过
                </el-button>
              </template>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
  </el-container>
</template>
<script>
// import {
//   autoWrite,
//   completeEntering
// } from '@/service/getData'
export default {
  name: 'confirm',
  props: ['data'],
  data () {
    return {
      loading: false
    }
  },
  watch: {
  },
  methods: {
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
