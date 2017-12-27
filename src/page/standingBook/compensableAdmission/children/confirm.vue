<template>
  <el-container class="detail-full-screnn">
    <el-container>
      <el-container>
        <el-header>
          <h2>代偿录账确认</h2>
        </el-header>
        <el-main id="detailMain" @scroll.native="onScroll">
          <el-row>
            <el-col :span="8">合同编号<span>{{data.no}}</span></el-col>
            <el-col :span="8">逾期天数<span>{{data.no}}</span></el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">客户姓名<span>{{data.no}}</span></el-col>
            <el-col :span="8">合同期限<span>{{data.no}}</span></el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">合同金额<span>{{data.no}}</span>元</el-col>
            <el-col :span="8">实际放款日期<span>{{data.no}}</span></el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">当前应还款金额<span>{{data.no}}</span>元</el-col>
            <el-col :span="8">剩余本金<span>{{data.no}}</span>元</el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">应还利息<span>{{data.no}}</span>元</el-col>
            <el-col :span="8">应还罚息<span>{{data.no}}</span>元</el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">应还服务费<span>{{data.no}}</span>元</el-col>
            <el-col :span="8">应还其他费用<span>{{data.no}}</span>元</el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">应代偿总金额<span>{{data.no}}</span>元</el-col>
            <el-col :span="8">代偿机构
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">实际代偿金额
              <el-input placeholder="请输入实际代偿金额" v-model="input4">
                <template slot="append">元</template>
              </el-input>
            </el-col>
            <el-col :span="8">实际代偿日期
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">代偿账号<el-input v-model="input" placeholder="请输入代偿账号"></el-input></el-col>
            <el-col :span="8">实际代偿时间
              <el-time-picker
                v-model="value2"
                :picker-options="{
                  selectableRange: '18:30:00 - 20:30:00'
                }"
                placeholder="任意时间点">
              </el-time-picker>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">代偿方式
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">代偿到账账号
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">代偿单流水号<el-input v-model="input" placeholder="请输入放款单流水号"></el-input></el-col>
            <el-col :span="8">代偿账户机构<span>{{data.no}}</span></el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col :span="16">代偿备注<el-input v-model="input" placeholder="备注描述，限20字以内"></el-input></el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <!-- 确认提交 -->
          <el-row style="margin-bottom: 20px; text-align: center;">
            <el-col :span="24">
              <el-button type="primary" @click="handleComplete" :loading="loading">确认提交</el-button>
            </el-col>
          </el-row>


        </el-main>
      </el-container>
    </el-container>
</el-container>
</template>
<script>
import { formatter } from '@/util/utils'
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
    data (value) {
    }
  },
  methods: {
    // handleCollapse () { // 表格收缩事件
    //   setTimeout(() => {
    //     this.offsetTops = []
    //     this.initOffsetTop()
    //   }, 310)
    // },
    // handleBack (refresh = false) { // 关闭详情页
    //   this.$emit('on-close', 'detail', refresh)
    //   document.querySelector('#detailMain').scrollTop = 0
    //   this.stepActive = 0
    // }
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

// .detail-title {
//   line-height: 60px;
//   font-size: 18px;
//   // padding-left: 200px;
//   margin: 0;
//   span {
//     display: inline-block;
//     text-indent: 10px;
//     border-left: 4px solid @blue;
//     line-height: 1;
//   }
// }

// .detail-title-btn {
//   text-align: right;
// }

// .el-container {
//   overflow: auto;
//   .el-main {
//     padding: 0 20px;
//     overflow: auto;
//   }

//   .el-aside {
//     width: 200px !important;
//     background-color: @gray;
//     .el-row {
//       text-indent: 35px;
//       line-height: 50px;
//     }
//     .active {
//       color: @white;
//       background-color: @blue;
//       font-weight: bold;
//     }
//   }
// }
</style>
