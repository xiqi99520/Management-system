<template>
  <div>
    <!-- 预拨申请详情 -->
    <el-dialog
    title="预拨申请详情"
    :visible.sync="Show"
    v-loading="loading"
    width="30%"
    center>
    <div>
      <el-row>
        <el-col :span="12">预拨申请书文件名：</el-col>
        <el-col :span="12"><span>{{name}}</span> 元</el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="12">预拨申请提交时间:</el-col>
        <el-col :span="12"><span>{{time}}</span> 元</el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="12">勾选借款单条数：</el-col>
        <el-col :span="12"><span>{{total}}</span> 元</el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="12">勾选借款单合同金额：</el-col>
        <el-col :span="12"><span>{{totalNumber}}</span>元</el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="12">申请预拨差额：</el-col>
        <el-col :span="12"><span>{{difference}}</span> 元</el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="12">实际申请预拨金额：</el-col>
        <el-col :span="12"><span>{{actualNumber}}</span> 元</el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Show = false">关 闭</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import {
  getPredialingLogDetail
} from '../../../../service/getData'
export default {
  name: 'predialingDialog',
  props: ['show', 'id'],
  data () {
    return {
      loading: false,                        // 用户信息对话框加载中
      Show: this.show,                       // 显示用户信息对话框
      id: '',      // 查询的id
      // 相关数据
      name: '',
      time: '',
      total: '',
      totalNumber: '',
      difference: '',
      actualNumber: ''
    }
  },
  methods: {
    _getDetail () {
      getPredialingLogDetail().then()
    },
    Close (refresh = false) {                     // 用户信息模态框隐藏
      this.$emit('on-close', this.update, refresh)
      this.$refs['form'].clearValidate()
    }
  },
  watch: {
    show (value) {                                // 监控显示用户信息对话框
      this.Show = value
      if (value === 'true') {
        this._getDetail()
      }
    },
    id (value) {
      this.id = value
    }
  }
}
</script>

<style lang="less" scoped>
// .userdialog {
//   margin-top: 8px;
//   text-align: left;
// }

// .userdialog-form {
//   .el-input__inner {
//     color: #a7a7a7;
//   }
//   .title-align {
//     text-align: left;
//   }
// }

// .user-tag {
//   margin-right: 10px;
// }
</style>
