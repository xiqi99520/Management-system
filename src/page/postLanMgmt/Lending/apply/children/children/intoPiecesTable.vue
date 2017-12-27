<template>
  <el-form class="detailForm">
    <el-form-item>
      <h3 class="detailForm-title">进件详情</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <table class="" cellspacing="0" cellpadding="10">
        <tr>
          <td>申请编号</td>
          <td>{{loanApply.applyNo}}</td>
          <td>申请时间</td>
          <td>{{loanApply.createTime}}</td>
          <td>推荐人手机</td>
          <td>{{loanApply.managerPhoneNo}}</td>
          <td>工行营销代码</td>
          <td>{{customManager.operateNo}}</td>
        </tr>
        <tr>
          <td>客户经理姓名</td>
          <td>{{customManager.username}}</td>
          <td>支行</td>
          <td>{{customManager.parentOrganization}}</td>
          <td>客户来源</td>
          <td>{{loanApply.customFrom}}</td>
          <!--=================================================== 临时添加 地区 ==========================================-->
          <td>地区</td>
          <td>{{loanApply.applyCity}}</td>
        </tr>
      </table>
      <!-- 客户申请表信息 -->
      <el-row class="collapse-row" :class="{'collapse-row-bottom': !customerShow}">
        <el-col :span="12">客户申请表信息</el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse('customerShow')">{{collapseText(customerShow)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="customerShow">
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td>姓名</td>
              <td>{{loanApply.name}}</td>
              <td>性别</td>
              <td>{{loanApply.gender}}</td>
              <td>手机号</td>
              <td>{{applyUser.phoneNo}}</td>
              <td>身份证号</td>
              <td>{{loanApply.idCardNo}}</td>
            </tr>
            <tr>
              <td>婚姻情况</td>
              <td>{{loanApply.maritalState}}</td>
              <td>职业</td>
              <td>{{loanApply.job}}</td>
              <td>个人收入等级</td>
              <td>{{loanApply.monthlyIncome}}</td>
              <td>通讯地址</td>
              <td>{{loanApply.address}}</td>
            </tr>
            <!-- 身份证影像资料 -->
            <tr>
              <td>身份证影像资料</td>
              <td colspan="7" class="table-img-idCard" style="padding: 0">
                <el-row>
                  <el-col :span="4" v-for="(photo, index) in idPhoto" :key="index" class="imgBox">
                    <img :src="context + photo.url" alt="" @click="showBigImg(photo)">
                    <div>{{photo.type}}</div>
                  </el-col>
                </el-row>
              </td>
            </tr>
            <!-- 房产证影像资料 -->
            <tr>
              <td>房产证影像资料</td>
              <td colspan="7" class="table-img-idCard" style="padding: 0">
                <el-row>
                  <el-col :span="3" v-for="(photo, index) in hoursePhoto" :key="index" class="imgBox">
                    <img :src="context + photo.url" alt="" @click="showBigImg(photo)">
                    <div>房产证-{{index + 1}}</div>
                  </el-col>
                </el-row>
              </td>
            </tr>
            <!-- 征信影像资料 -->
            <!-- <tr>
              <td>征信影像资料</td>
              <td colspan="7">
                <el-row>
                  <el-col :span="8">
                    <img src="" alt="">
                    <div>征信1</div>
                  </el-col>
                </el-row>
              </td>
            </tr> -->
          </table>
        </div>
      </el-collapse-transition>
      <!-- 预抵押房产信息 -->
      <el-row class="collapse-row" :class="{'collapse-row-bottom': !houseShow}">
        <el-col :span="12">预抵押房产信息</el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse('houseShow')">{{collapseText(houseShow)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="houseShow">
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td>贷款需求金额</td>
              <td>&yen;{{formatter.changeMoney(loanApply.applyMoney, 100)}}</td>
              <td>贷款期限</td>
              <td>{{loanApply.loanMonth + '个月'}}</td>
              <td>关心问题</td>
              <td>{{loanApply.mostCare}}</td>
              <td>欲抵押房产产权人</td>
              <td>{{loanApply.houseOwner}}</td>
            </tr>
            <tr>
              <td>房屋区域</td>
              <td>{{formatter.homeAddress(loanApply)}}</td>
              <td>房屋地址</td>
              <td>{{formatter.homeAddress(loanApply, true)}}</td>
              <td>房屋性质</td>
              <td>{{loanApply.houseType}}</td>
              <td>房屋面积</td>
              <td>{{loanApply.houseArea + '㎡'}}</td>
            </tr>
            <tr>
              <td>房产建成年份</td>
              <td>{{loanApply.buildYear + '年'}}</td>
              <td>房产户型</td>
              <td>{{loanApply.houseLayout}}</td>
              <td>朝向</td>
              <td>{{loanApply.houseForward}}</td>
              <td>房产楼层/总楼层</td>
              <td>{{loanApply.houseFloor + '层/共' + loanApply.totalFloor + '层'}}</td>
            </tr>
            <tr>
              <td>房屋使用状态</td>
              <td>{{loanApply.houseState}}</td>
              <td>房产亮点</td>
              <td>{{loanApply.houseFeature}}</td>
              <td>本次借款用途</td>
              <td>{{loanApply.loanUseFor}}</td>
              <td>还款来源</td>
              <td>{{loanApply.refundFrom}}</td>
            </tr>
            <tr>
              <td>访谈告知</td>
              <td>{{loanApply.acceptClause}}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </el-collapse-transition>
      <!-- 系统评估预授信额度 -->
      <el-row class="collapse-row" :class="{'collapse-row-bottom': !systemShow}">
        <el-col :span="12">系统评估预授信额度</el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse('systemShow')">{{collapseText(systemShow)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="systemShow">
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td>链家评估价</td>
              <td>{{formatter.changeMoney(lianjia, 100, '￥')}}</td>
              <td>世联评估价</td>
              <td>{{formatter.changeMoney(shilian, 100, '￥')}}</td>
              <td>仁达评估价</td>
              <td>{{formatter.changeMoney(renda, 100, '￥')}}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <!-- 系统评估预授信额度 -->
          <el-row class="table-summary font-red">
            <el-col :span="24">
              {{'房产估值：' + formatter.money(loanApply.predictMoney) + '万元'}}
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <!-- 大数据认证 -->
      <el-row class="collapse-row" :class="{'collapse-row-bottom': !bigDataShow}">
        <el-col :span="12">大数据认证</el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse('bigDataShow')">{{collapseText(bigDataShow)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="bigDataShow">
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td>案号</td>
              <td>{{listLoseCreditExecutedUser.caseCode || '-'}}</td>
              <td>来源</td>
              <td>{{listLoseCreditExecutedUser.form || '-'}}</td>
              <td>执行依据文号</td>
              <td>{{listLoseCreditExecutedUser.gistId || '-'}}</td>
              <td>立案时间</td>
              <td>{{listLoseCreditExecutedUser.regDate || '-'}}</td>
            </tr>
            <tr>
              <td>执行法院</td>
              <td>{{listLoseCreditExecutedUser.courtName || '-'}}</td>
              <td>做出执行依据单位</td>
              <td>{{listLoseCreditExecutedUser.gistUnit || '-'}}</td>
              <td>生效法律文书确定的义务</td>
              <td>{{listLoseCreditExecutedUser.duty || '-'}}</td>
              <td>被执行人的履行情况</td>
              <td>{{listLoseCreditExecutedUser.performance || '-'}}</td>
            </tr>
            <tr>
              <td>失信被执行人行为具体情形</td>
              <td>{{listLoseCreditExecutedUser.disruptType || '-'}}</td>
              <td>执行标的</td>
              <td>{{listLoseCreditExecutedUser.execMoney || '-'}}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <!-- 黑名单验证状态 -->
          <el-row class="table-summary">
            <el-col :span="24">
              黑名单验证：{{loanApply.blackCheck}}
            </el-col>
          </el-row>
          <!-- 失信被执行人验证状态 -->
          <el-row class="table-summary no-border-bottom">
            <el-col :span="24">
              失信被执行人验证：{{listLoseCreditExecutedUser.result}}
            </el-col>
          </el-row>
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td>执行法院</td>
              <td>{{listExecutedUser.courtName || '-'}}</td>
              <td>做出执行依据单位</td>
              <td>{{listExecutedUser.gistUnit || '-'}}</td>
              <td>生效法律文书确定的义务</td>
              <td>{{listExecutedUser.duty || '-'}}</td>
              <td>被执行人的履行情况</td>
              <td>{{listExecutedUser.performance || '-'}}</td>
            </tr>
            <tr>
              <td>失信被执行人行为具体分析</td>
              <td>{{listExecutedUser.disruptType || '-'}}</td>
              <td>执行标的</td>
              <td>{{listExecutedUser.execMoney || '-'}}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <!-- 黑名单验证状态 -->
          <!-- <el-row class="table-summary">
            <el-col :span="24">
              黑名单验证：{{loanApply.blackCheck}}
            </el-col>
          </el-row> -->
          <!-- 被执行人验证状态 -->
          <el-row class="table-summary">
            <el-col :span="24">
              被执行人验证：{{listExecutedUser.result}}
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </el-form-item>
  </el-form>
</template>
<script>
import { formatter, showBigImg } from '@/util/utils'
export default {
  name: 'intoPiecesTable',
  props: ['data'],
  data () {
    return {
      customerShow: true,
      houseShow: true,
      systemShow: true,
      bigDataShow: true,
      context: process.env.CONTEXT,
      idPhoto: [],  // 身份证照片
      hoursePhoto: [], // 房产证照片
      loanApply: {},
      applyUser: {},
      customManager: {},
      bigDataResult: {},
      thirdAgencyEntries: {},
      relateLoanApplies: {},
      managerOperation: {},
      listOperationHistory: {},
      lianjia: '',
      shilian: '',
      renda: '',
      listLoseCreditExecutedUser: {},
      listExecutedUser: {},
      formatter: formatter,
      showBigImg: showBigImg
    }
  },
  methods: {
    collapseText (show) {
      if (show) {
        return '收起'
      } else {
        return '展开'
      }
    },
    handleCollapse (show) {
      this[show] = !this[show]
      this.$emit('on-collapse', true)
    }
  },
  watch: {
    data (value) {
      this.loanApply = value.loanApplyVo.loanApply
      this.applyUser = value.loanApplyVo.applyUser
      this.bigDataResult = value.bigDataResult
      this.customManager = value.customManager
      this.thirdAgencyEntries = value.thirdAgencyEntries
      this.relateLoanApplies = value.relateLoanApplies
      this.managerOperation = value.managerOperation
      this.listOperationHistory = value.listOperationHistory

      // 初始化照片列表
      this.idPhoto = []
      this.hoursePhoto = []
      value.loanApplyVo.listPhoto.map(item => {
        if (['身份证头像面', '身份证国徽面'].includes(item.type)) {
          this.idPhoto.push(item)
        } else if (item.type === '房产证照片') {
          this.hoursePhoto.push(item)
        }
      })

      this.bigDataResult.houseValuation.map(item => {
        if (item.source === '链家') {
          this.lianjia = item.houseTotalValue
        } else if (item.source === '世联') {
          this.shilian = item.houseTotalValue
        } else if (item.source === '仁达') {
          this.renda = item.houseTotalValue
        }
      })

      // this.lianjia = this.bigDataResult.houseValuation[0].houseTotalValue
      // this.shilian = this.bigDataResult.houseValuation[1].houseTotalValue
      // this.renda = this.bigDataResult.houseValuation[2].houseTotalValue
      this.listLoseCreditExecutedUser = value.bigDataResult.listLoseCreditExecutedUser[0]
      this.listExecutedUser = value.bigDataResult.listExecutedUser[0]
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
.table-summary {
  border: 1px solid @lineGray;
  border-top: none;
  text-indent: 10px;
}
.font-red {
  color: @red;
}
.no-border-bottom {
  border-bottom: none;
}
.imgBox {
  padding: 5px;
}
</style>
