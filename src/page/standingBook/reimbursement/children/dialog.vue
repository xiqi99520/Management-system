<template>
  <div>
    <!-- 还款代扣确认 -->
    <el-dialog
    title="还款代扣确认"
    :visible.sync="Show"
    v-loading="loading"
    width="30%"
    center>
    <div>
      <p>客户账单信息</p>
      <el-row>
        <el-col :span="8">客户姓名：<span>{{data.customerName}}</span></el-col>
        <el-col :span="8">合同编号：<span>{{data.no}}</span></el-col>
        <el-col :span="8">实际放款日期：<span>{{data.actualTime}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">合同金额：<span>{{data.totalNum}}</span></el-col>
        <el-col :span="8">当前期次：<span>{{data.period}}</span></el-col>
        <el-col :span="8">当前应还款日期：<span>{{data.repaymentTime}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">扣款账户开户行：<span>{{data.bank}}</span></el-col>
        <el-col :span="8">扣款账户号：<span>{{data.account}}</span></el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">当前应还款金额：<span>{{data.repaymentNum}}</span></el-col>
        <el-col :span="8">已申请提前还本金额：<span>{{data.earlyNum}}</span></el-col>
        <el-col :span="8">申请提前还款本金部分应还利息：<span>{{data.interest}}</span></el-col>
      </el-row>
    </div>
    <div>
      <p>扣款信息</p>
      <el-row>
        <el-col :span="12">扣款代扣机构：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">可扣最高金额：<span>{{data.repaymentNum+data.earlyNum+data.interest}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">扣款金额：<el-input v-model="input" placeholder="请输入扣款金额"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">扣款备注：<el-input v-model="input" placeholder="请填写扣款备注，限50字"></el-input></el-col>
      </el-row>
      <p>提示：客户卡内金额小于填写的扣款金额时，将导致扣款失败。每次扣款均产生成本，请谨慎扣款。</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Show = false">关 闭</el-button>
      <el-button @click="Show = false">确认扣款</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'predialingDialog',
  props: ['show', 'id', 'data'],
  data () {
    return {
      loading: false,                        // 用户信息对话框加载中
      Show: this.show,                       // 显示用户信息对话框
      // 相关数据
      data: {
        customerName: '',
        no: '',
        actualTime: '',
        totalNum: '',
        period: '',
        repaymentTime: '',
        bank: '',
        account: '',
        repaymentNum: '',
        earlyNum: '',
        interest: ''
      }
    }
  },
  watch: {
    show (value) {                                // 监控显示用户信息对话框
      this.Show = value
      if (value === 'true') {
        this._getDetail()
      }
    },
    data (value) {
      this.data = value
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
