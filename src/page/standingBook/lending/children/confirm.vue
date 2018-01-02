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
          <div>
            <p>基本信息</p>
            <el-row>
              <el-col>合同编号 {{data.no}}</el-col>
              <el-col>借款状态 {{data.no}}</el-col>
            </el-row>
            <el-row>
              <el-col>客户姓名 {{data.no}}</el-col>
              <el-col>合同期限 {{data.no}}</el-col>
            </el-row>
            <el-row>
              <el-col>合同金额 {{data.no}} 元</el-col>
              <el-col>期望放款日期 {{data.no}}</el-col>
            </el-row>
          </div>
          <div>
            <p>影像资料</p>

          </div>
          <div>
            <p>审核记录</p>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="date"
                label="审核时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="审核步骤"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核部门">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核人身份">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核人">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核结果">
              </el-table-column>
              <el-table-column
                prop="address"
                label="审核意见">
              </el-table-column>
            </el-table>
          </div>
          <div>
            <p>系统外手工放款信息</p>
            <el-row>
              <el-col :span="12">实际放款金额 {{data.no}}</el-col>
              <el-col :span="12">实际放款时间 {{data.no}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">放款到账账号 {{data.no}}</el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">放款方式 {{data.no}}</el-col>
              <el-col :span="12">放款账户 {{data.no}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">放款单流水号 {{data.no}}</el-col>
              <el-col :span="12">放款账户机构 {{data.no}}</el-col>
            </el-row>
            <el-row v-if="stata">
              <el-col :span="24">放款复审意见 {{data.no}}</el-col>
            </el-row>
          </div>
          <!-- 完成录入 -->
          <el-row style="margin-bottom: 20px; text-align: center;">
            <el-col :span="12">
              <el-button v-if="tableData.other.write" type="primary" @click="handleComplete" :loading="loading">放款复审拒绝</el-button>
              <el-button v-if="tableData.other.write" type="primary" @click="handleComplete" :loading="loading">取消</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="handleComplete" :loading="loading">确认提交</el-button>
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
