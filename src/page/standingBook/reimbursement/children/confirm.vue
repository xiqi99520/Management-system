<template>
  <el-container class="detail-full-screnn">
    <el-container>
      <el-container>
        <el-header>
          <h2>还款入账确认</h2>
        </el-header>
        <el-main id="detailMain" @scroll.native="onScroll">
          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                合同编号<el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div>
                应还款日期<el-date-picker
                          v-model="value1"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
              </div>
              <div>
                还款方式<el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
              </div>
              <div>
                还款到账账户号<el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div>
                实际还款金额<el-input v-model="input" placeholder="请输入内容">
                              <template slot="append">元</template>
                            </el-input>
              </div>
              <div>
                还款来源账号<el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                客户姓名<el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div>
                应还款金额<el-input v-model="input" placeholder="请输入内容">
                            <template slot="append">元</template>
                          </el-input>
              </div>
              <div>
                还款到账账户名称<el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
              </div>
              <div>
                实际还款日期<el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
              </div>
              <div>
                还款单流水号<el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div>
                录账备注<el-input v-model="input" placeholder="请输入录账备注，限20字"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                借据状态<el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div>
                还款到账账户<el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
              </div>
              <div>
                到账账户机构<el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
          </el-row>
          <!-- 入账预览 -->
          <el-row style="margin-bottom: 20px; text-align: center;">
            <el-col :span="24">
              <el-button v-if="tableData.other.write" type="primary" @click="handleComplete" :loading="loading">完成录入</el-button>
              <template v-if="render3Btn()">
                <el-button type="primary"
                  v-if="formatter.renderBtn('APPLY_AUDIT_DENY')" 
                  @click="handleShowDialog('refuse')" 
                  :loading="loading">
                  入账预览
                </el-button>
              </template>
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
  props: ['data', 'upload'],
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
