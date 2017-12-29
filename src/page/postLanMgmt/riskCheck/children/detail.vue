<template>
  <el-container class="detail-full-screnn">
    <el-container>
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
          <!-- 详情 -->
          <table>
            <tbody>
              <tr>
                <td>申请编号</td>
                <td class="input">xxxxx</td>
                <td>姓名</td>
                <td>张三</td>
                <td>贷款额</td>
                <td>1600万元</td>
                <td>审批额度</td>
                <td>1500万元</td>
              </tr>
              <tr>
                <td>申请时间</td>
                <td>2017/12/13 08:56</td>
                <td>抵押情况</td>
                <td>一抵</td>
                <td>贷款期限</td>
                <td>23个月</td>
                <td>房产信息</td>
                <td>朝阳区 北京公园</td>
              </tr>
            </tbody>
          </table>

          <div class="row-title">资料核验</div>
          <p>请点击右上角的选项卡，进入相应流程页面查看详情，检查所有资料是否齐备</p>

          <p>请确定所有流程步骤的资料是否齐备</p>
          <el-form-item>
            <el-select filterable placeholder="是/否" style="width:100%;">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </el-form-item>

          <p>相关资料上传</p>

          <p>婚史执行及其他</p>

          <p>放款确认</p>
          <el-row class="row-content">
            <el-col :span="2"><div class="grid-content bg-purple">放款意见</div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">订单终止原因</div></el-col>
          </el-row>

          <el-row class="row-content">
            <el-col :span="2">
              <el-form-item>
                <el-select filterable placeholder="是/否" style="width:100%;">
                  <el-option label="是" value="0"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item>
                <el-select filterable placeholder="是/否" style="width:100%;">
                  <el-option label="是" value="0"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>


        </el-main>
      </el-container>
    </el-container>
</el-container>
</template>
<script>

export default {
  name: 'lendingApplyDetail',
  components: {

  },
  data () {
    return {

    }
  },
  watch: {

  },
  methods: {
    handleClose () { // 预上传图片
      console.log(123)
      this.$emit('on-close')
    }
  }
}
</script>
<style lang="less" scoped>

@import "~@/style/lendingApplyDetail";

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
