<template>
  <el-container class="detail-full-screnn">
    <el-container>
      <el-aside>
        <el-row>
          <el-col
            v-for="(name, idx) in steps"
            :span="24"
            :key="idx"
            :class="{active: idx === stepActive}"
            @click.native="jump(idx)">
            {{name}}
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              <p class="detail-title">
                <span>{{title}}放款申请信息</span>
              </p>
            </el-col>
            <el-col :span="12" class="detail-title-btn">
              <el-button type="primary" @click="handleBack">返回</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main id="detailMain" @scroll.native="onScroll">
          <!-- 产品信息 -->
          <product-table
            v-if="steps.includes('产品信息')"
            ref="products"
            :data="tableData.products"
            :other="tableData.other"
            @on-save="handleSave"
            @on-query="handleShowDialog('query')">
          </product-table>
          <!-- 服务人员信息 -->
          <service-table
            v-if="steps.includes('服务人员信息')"
            ref="servants"
            :data="tableData.servants"
            :other="tableData.other"
            @on-save="handleSave"
            @on-query="handleShowDialog('query')">
          </service-table>
          <!-- 进件详情 -->
          <into-pieces-table
            v-if="steps.includes('进件详情')"
            :data="tableData.loanApplyDetail"
            @on-collapse="handleCollapse">
          </into-pieces-table>
          <!-- 主借款人基本信息 -->
          <main-borrower-table
            v-if="steps.includes('主借款人基本信息')"
            ref="mainBorrower"
            :data="tableData.mainBorrower"
            :other="tableData.other"
            @on-save="handleSave">
          </main-borrower-table>
          <!-- 共同借款人基本信息 -->
          <common-borrower-table
            v-if="renderCommonBorrower"
            ref="commonBorrower"
            :data="tableData.commonBorrower"
            :other="tableData.other"
            @on-collapse="handleCollapse"
            @on-save="handleSave">
          </common-borrower-table>
          <!-- 担保人基本信息 -->
          <guarantor-table
            v-if="steps.includes('担保人基本信息')"
            ref="guarantor"
            :data="tableData.guarantor"
            :other="tableData.other"
            @on-save="handleSave">
          </guarantor-table>
          <!-- 放还款信息 -->
          <repayment-table
            v-if="steps.includes('放还款信息')"
            ref="repayment"
            :data="tableData.loanDetail"
            :other="tableData.other"
            @on-collapse="handleCollapse"
            @on-save="handleSave">
          </repayment-table>
          <!-- 影像资料 -->
          <image-table
            v-if="steps.includes('影像资料')"
            ref="image"
            :data="tableData.photo"
            :upload="upData"
            :other="tableData.other"
            @on-collapse="handleCollapse"
            @on-pre="handelPreUpload">
          </image-table>
          <!-- 放款流水记录 -->
          <loan-water-records
            v-if="steps.includes('放款流水记录')"
            :data="tableData.loanWaterRecord">
          </loan-water-records>
          <!-- 还款计划表 -->
          <repayment-schedule
            v-if="steps.includes('还款计划表')"
            :data="tableData.repaymentSchedule">
          </repayment-schedule>
          <!-- 还款台账表 -->
          <repayment-ledger
            v-if="steps.includes('还款台账表')"
            :data="tableData.repaymentLedger">
          </repayment-ledger>
          <!-- 还款流水表 -->
          <repayment-manifold
            v-if="steps.includes('还款流水表')"
            :data="tableData.repaymentManifold">
          </repayment-manifold>
          <!-- 还款详情表 -->
          <repayment-details
            v-if="steps.includes('还款详情表')"
            :data="tableData.repaymentDetails">
          </repayment-details>
          <!-- 减免详情记录表 -->
          <waiver-details
            v-if="steps.includes('减免详情记录表')"
            :data="tableData.waiverDetails">
          </waiver-details>
          <!-- 退款详情记录表 -->
          <refund-details-record
            v-if="steps.includes('退款详情记录表')"
            :data="tableData.refundDetailsRecord">
          </refund-details-record>
          <!-- 其他暂收款记录表 -->
          <other-temporary
            v-if="steps.includes('其他暂收款记录表')"
            :data="tableData.otherTemporary">
          </other-temporary>
          <!-- 操作历史记录 -->
          <operating-history
            v-if="steps.includes('操作历史记录')"
            :data="tableData.operatingHistory">
          </operating-history>
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
</el-container>
</template>
<script>
import serviceTable from './children/serviceTable'
import productTable from './children/productTable'
import intoPiecesTable from './children/intoPiecesTable'
import mainBorrowerTable from './children/mainBorrowerTable'
import commonBorrowerTable from './children/commonBorrowerTable'
import guarantorTable from './children/guarantorTable'
import repaymentTable from './children/repaymentTable'
import imageTable from './children/imageTable'
import loanWaterRecords from './children/loanWaterRecords'
import repaymentSchedule from './children/repaymentSchedule'
import repaymentLedger from './children/repaymentLedger'
import repaymentManifold from './children/repaymentManifold'
import repaymentDetails from './children/repaymentDetails'
import waiverDetails from './children/waiverDetails'
import refundDetailsRecord from './children/refundDetailsRecord'
import otherTemporary from './children/otherTemporary'
import operatingHistory from './children/operatingHistory'
import { formatter } from '@/util/utils'
import {
  autoWrite,
  completeEntering
} from '@/service/getData'
export default {
  name: 'lendingApplyDetail',
  components: {
    // 产品信息 （V1.3版本新增）
    productTable,
    // 服务人员信息
    serviceTable,
    // 进件详情
    intoPiecesTable,
    // 主借款人基本信息
    mainBorrowerTable,
    // 共同借款人基本信息
    commonBorrowerTable,
    // 担保人基本信息
    guarantorTable,
    // 放还款信息
    repaymentTable,
    // 影像资料
    imageTable,
    // 放款流水记录
    loanWaterRecords,
    // 还款计划表
    repaymentSchedule,
    // 还款台账表
    repaymentLedger,
    // 还款流水表
    repaymentManifold,
    // 还款详情表
    repaymentDetails,
    // 减免详情记录表
    waiverDetails,
    // 退款详情记录表
    refundDetailsRecord,
    // 其他暂收款记录表
    otherTemporary,
    // 操作历史记录
    operatingHistory
  },
  props: ['data', 'upload'],
  data () {
    return {
      loading: false,
      animate: false, // 左侧导航点击动画
      mapping: false, // 右侧内容滚动中
      renderCommonBorrower: true, // 渲染共同借款人信息
      stepActive: 0,  // 当前激活导航
      title: '查看',
      automaticStep: '共同借款人基本信息',
      // steps: ['产品信息', '服务人员信息', '进件详情', '主借款人基本信息', '共同借款人基本信息', '担保人基本信息', '放还款信息', '影像资料'], // 左侧导航数据
      steps: this.data.steps,
      offsetTops: [], // 表格离顶部的偏移量
      tableData: { // 表格数据
        products: '',
        servants: {},
        loanApplyDetail: {},
        mainBorrower: {},
        commonBorrower: [],
        guarantor: {},
        loanDetail: {},
        photo: {},
        other: {}
      },
      upData: null,
      formatter: formatter, // 格式化工具
      t: null // 定时任务
    }
  },
  watch: {
    data (value) {
      if (value.other.write) {
        this.title = '录入'
      } else if (value.other.check) {
        this.title = '审核'
      } else {
        this.title = '查看'
      }
      // 产品信息
      this.tableData.products = {
        productId: value.loanDetail.productId,
        riseInterestRate: value.loanDetail.riseInterestRate,
        riseInterestReason: value.loanDetail.riseInterestReason
      }
      // 服务人员信息
      this.tableData.servants = value.servants || {}
      // 服务人员信息-拒绝原因
      if (value.loanApplyDetail.loanApplyVo.loanApply.auditReason) {
        this.tableData.servants.reason = value.loanApplyDetail.loanApplyVo.loanApply.auditReason || ''
      } else {
        this.tableData.servants.reason = value.loanApplyDetail.loanApplyVo.loanApply.reasonNote || ''
      }

      // 服务人员信息-受理专员
      if (this.tableData.loanApplyDetail.listOperationHistory) {
        this.tableData.loanApplyDetail.listOperationHistory.map(item => {
          if (item.operation === '评房专员评房') {
            this.tableData.servants.acceptorName = item.operatorName
          }
        })
      }

      // 进件详情
      this.tableData.loanApplyDetail = value.loanApplyDetail || {}

      // 主借款人基本信息
      this.tableData.mainBorrower = value.mainBorrower || {}
      // 主借款人信息补充
      if (this.tableData.loanApplyDetail.loanApplyVo) {
        this.tableData.mainBorrower.name = // 借款人姓名
          this.tableData.loanApplyDetail.loanApplyVo.loanApply.name
        this.tableData.mainBorrower.idCardNo = // 证件号码
          this.tableData.loanApplyDetail.loanApplyVo.loanApply.idCardNo
        this.tableData.mainBorrower.phoneNo = // 手机电话
          this.tableData.loanApplyDetail.loanApplyVo.applyUser.phoneNo
      }

      // 共同借款人基本信息
      this.tableData.commonBorrower = value.commonBorrower || []
      if (!this.tableData.commonBorrower.length && !value.other.write) { // 共同借款人信息为空
        this.renderCommonBorrower = false
        if (this.steps.includes(this.automaticStep)) {
          this.steps.splice(3, 1)
        }
      } else {
        this.renderCommonBorrower = true
        if (!this.steps.includes(this.automaticStep)) {
          this.steps.splice(3, 0, this.automaticStep)
        }
      }
      this.handleCollapse()

      // 担保人基本信息
      this.tableData.guarantor = value.guarantor || {}

      // 放还款信息
      this.tableData.loanDetail = value.loanDetail || {}

      // 影像资料
      this.tableData.photo = value.photo || {}

      // 拓展信息
      this.tableData.other = value.other || {}

      // 初始化滚动高度
      this.initOffsetTop()
    },
    upload: {
      handler (value) {
        this.upData = value
      },
      deep: true
    }
  },
  methods: {
    initOffsetTop () { // 初始化表格距离顶部的位置
      const offset = document.querySelector('#detailMain').offsetTop
      document.querySelectorAll('.detailForm').forEach(dom => {
        this.offsetTops.push(dom.offsetTop - offset)
      })
    },
    handleCollapse () { // 表格收缩事件
      setTimeout(() => {
        this.offsetTops = []
        this.initOffsetTop()
      }, 310)
    },
    jump (index) { // 左侧点击事件
      clearTimeout(this.t)
      this.animate = true
      let scrollDom = document.querySelector('#detailMain')
      let distance = scrollDom.scrollTop
      let total = this.offsetTops[index]
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50
      this.stepActive = index
      // 下滚
      let smoothDown = () => {
        if (distance < total) {
          distance += step
          scrollDom.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          scrollDom.scrollTop = total
          this.t = setTimeout(() => {
            this.animate = false
          }, 1000)
        }
      }
      // 上滚
      let smoothUp = () => {
        if (distance > total) {
          distance -= step
          scrollDom.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          scrollDom.scrollTop = total
          this.t = setTimeout(() => {
            this.animate = false
          }, 1000)
        }
      }
      // 判断是上滚还是下滚
      if (total > distance) {
        smoothDown()
      } else {
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
    },
    onScroll () { // 右侧滚动事件
      if (this.animate || this.mapping) {
        return
      }
      this.mapping = true
      let scrolled = document.querySelector('#detailMain').scrollTop
      this.offsetTops.map((height, idx) => {
        if (scrolled >= height - 70) {
          this.stepActive = idx
        }
      })
      this.mapping = false
    },
    handleBack (refresh = false) { // 关闭详情页
      this.$emit('on-close', 'detail', refresh)
      document.querySelector('#detailMain').scrollTop = 0
      this.stepActive = 0
    },
    handleSave (area, entity) { // 保存区域数据
      autoWrite(this.tableData.other.applyId, area, entity)
        .then(resp => {
          if (!resp.success) {
            throw new Error(resp.message)
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '保存失败',
            message: err.name === 'Error' ? err.message : err.response.data.message
          })
        })
    },
    handleComplete () { // 完成录入
      let complete = []
      for (let [name, ref] of Object.entries(this.$refs)) {
        console.log(name)
      // for (let ref of Object.values(this.$refs)) {
        if (ref.$refs.form) {
          if (ref.$refs.form.length) {
            ref.$refs.form.map(form => {
              form.validate(resp => {
                complete.push(resp)
              })
            })
          } else {
            ref.$refs.form.validate(resp => {
              complete.push(resp)
            })
          }
        } else {
          complete.push(ref.handleComplete())
        }
      }
      complete = [...new Set(complete)]
      if (complete.length !== 2 && complete[0]) {   // 验证完成开始录入
        let type, message, title
        this.loading = true
        completeEntering(this.tableData.other.applyId, { contractId: this.tableData.other.contractId })
          .then(resp => {
            if (resp.success) {
              type = 'success'
              title = '成功'
            } else {
              type = 'error'
              title = '失败'
            }
            message = resp.message
          })
          .catch(err => {
            type = 'error'
            title = '失败'
            message = err.response.data.message
          })
          .then(() => {
            this.loading = false
            this.$notify({
              title,
              message,
              type
            })
            if (type === 'success') {
              this.handleBack(true)
            }
          })
      } else {
        this.$notify.error({
          title: '错误',
          message: '请按规则输入'
        })
      }
    },
    handleShowDialog (key, data) { // 显示对话框
      this.$emit('on-dialog-show', key, data)
    },
    render3Btn () {
      if (this.data.other) {
        return this.data.other.check &&
          !['审核不通过', '客户放弃', '审核通过'].includes(this.data.other.state)
      } else {
        return false
      }
    },
    handelPreUpload (data) { // 预上传图片
      this.$emit('on-pre-up', data)
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
<style lang="less">
.table-input {
  input {
    background-color: #eee;
  }
}
</style>
