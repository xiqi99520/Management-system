<template>
  <el-container class="detail-full-screnn">
    <el-container class="detailForm">
      <el-aside>
        <el-row>
          <el-col>进度状态</el-col>
          <el-col>客户基本信息</el-col>
          <el-col>贷款申请表信息</el-col>
          <el-col>大数据认证</el-col>
        </el-row>
      </el-aside>

      <step-One></step-One>
    </el-container>
  </el-container>
</template>
<script>
import stepOne from '../../riskApproval/children/stepOne'
export default {
  data () {
    return {
      reviewForm: {
        evaluationResult: '',
        evaluationOptions: [
          {label: '拒绝', value: '0'},
          {label: '通过', value: '1'}
        ],
        infoDesc: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('on-close')
    }
  },
  components: {
    stepOne
  }

}
</script>
<style lang="less" scoped>
@import "~@/style/color";
@import url('//at.alicdn.com/t/font_525204_u1yy790eizmvaemi.css');

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

.view-container {
  padding-top:5px;
    table {
        width: 100%;
        border-collapse: collapse;
        border: none;
        caption {
            padding: 0 5px;
            line-height: 40px;
            background-color: #96c9ff;
            text-align: left;
            color: @white
        }
        th,td {
            padding:5px 10px;
            line-height: 30px;
            border:1px solid #d1d1d1;
            text-align: left;
        }
        th {
            background-color:#e2e7ed;
            font-weight: normal;
            .title {
              color: @blue
            }
        }
        td {
            background-color:#eef1f4;
            color: #999
        }
        .imgInfo{
            width: 200px;
            text-align: center;
            font-size: 12px;
            img {
              width: 100%;
            }
        }
    }
    .table-view {
      margin-top: 20px
    }
    .view-items {
        padding: 15px 0;
        li {
            float:left;
            width:50%;
            line-height:40px;
            text-align: left;
        }
    }
    .view-box {
      padding: 15px 0;
      .view-box-title {
        padding-top:10px;
        line-height: 30px;
        border-bottom: 1px solid #96c9ff;
        color: @blue;
        text-align: left;
        font-size: 16px
      }
      .creditTitle {
        padding-top:15px;
        line-height:40px;
        text-align:left;
        font-weight: bold;
        font-size: 14px
      }
    }
}
.tollyList {
  display: flex;
  .item {
    padding-right: 20px;
    line-height:30px;
    span {
      padding:3px 20px;
      background-color: #f5f7fa;
      border: 1px solid #e4e7ed;
      color: #c0c4cc;
    }
  }
}
.advanceMoney {
  padding-top: 10px;
}
</style>

