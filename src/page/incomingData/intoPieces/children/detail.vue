<template>
  <el-container class="detail-full-screnn">
    <el-header class="header">
      <el-row type="flex" class="detail-title" justify="space-between">
        <el-col :span="6" class="title">
          <span>基本资料</span>
        </el-col>
        <el-col :span="6" class="btns">
            <el-button type="primary" @click="pdf" :loading="download">导出PDF</el-button>
            <el-button  @click="back">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div id="detail">
        <!-- 进度状态 -->
        <div class="row-title">进度状态</div>
        <el-row class="row-content">
          <el-col :span="3"><div class="grid-content bg-purple">申请编号</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{loanApply.applyNo}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">申请时间</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{loanApply.createTime}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">当前状态</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{loanState}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">房产估值</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{system.state}}</div></el-col>
        </el-row>
        <!-- 客户基本信息 -->
        <div class="row-title">客户基本信息</div>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">申请人姓名</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.name}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">性别</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.gender}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">手机号</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{applyUser.phoneNo}}</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">身份证号</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.idCardNo}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">婚姻情况</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.maritalState}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">职业</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.job}}</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">个人收入等级</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.monthlyIncome}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">地区</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.applyCity}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">通讯地址</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.address}}</div></el-col>
        </el-row>
        <!-- 身份证影像资料 -->
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple idCard-title">身份证影像资料</div></el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="4" v-for="(photo, index) in listPhoto" v-if="photo.type !== '房产证照片'" :key="index">
                <el-card class="idCard">
                  <img :src="photo.url" class="image">
                  <div>
                    <span>{{ photo.type }}</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 房产证影像资料 -->
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple" :style="getLineheight('房产证照片')">房产证影像资料</div></el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="4" v-for="(photo, index) in listPhoto" v-if="photo.type === '房产证照片'" :key="index">
                <el-card class="idCard">
                  <img :src="photo.url" class="image">
                  <div>
                    <span>{{ photo.type }} - {{ index-1 }}</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">客户经理手机号	</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.managerPhoneNo}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">工行客户经理营销代码</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.managerOperateNo}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">工行I类储蓄卡卡号</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.bankCardNo}}</div></el-col>
        </el-row>
        <!-- 贷款申请表信息 -->
        <div class="row-title">贷款申请表信息</div>
        <!-- 贷款需求 -->
        <el-row class="row-content-title">
          <el-col :span="24"><div class="grid-content">贷款需求</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">贷款申请金额</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{formatMoney(loanApply.applyMoney) + '万元'}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">贷款期限</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.loanMonth + '个月'}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">贷款关心方面</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.mostCare}}</div></el-col>
        </el-row>
        <!-- 欲抵押房产信息 -->
        <el-row class="row-content-title">
          <el-col :span="24"><div class="grid-content">欲抵押房产信息</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">借款人与产权人关系</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseOwner}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">房屋所在小区位置</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{homeAddress()}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">小区名称</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{homeAddress(true)}}</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">房屋性质</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseType}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">建筑面积</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseArea + '平米'}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">建成/竣工年份</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.buildYear + '年'}}</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">房产户型</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseLayout}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">朝向</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseForward}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">房产楼层/总楼层</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseFloor + '层/共' + loanApply.totalFloor + '层'}}</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">房屋状态</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseState}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">房产特色</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.houseFeature}}</div></el-col>
        </el-row>
        <!-- 贷款用途 -->
        <el-row class="row-content-title">
          <el-col :span="24"><div class="grid-content">贷款用途</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="4"><div class="grid-content bg-purple">本次借款用途</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.loanUseFor}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">还款来源</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.refundFrom}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">访谈告知</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{loanApply.acceptClause}}</div></el-col>
        </el-row>
        <!-- 工行客户经理意见 -->
        <el-row class="row-content-title">
          <el-col :span="24"><div class="grid-content">贷款用途</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="3"><div class="grid-content bg-purple">客户来源</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{loanApply.customFrom}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">意见</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{loanApply.managerSuggest}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">客户经理姓名</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{customManager.username || '-'}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">手机号码</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{customManager.phoneNo}}</div></el-col>
        </el-row>
        <el-row class="row-content">
          <el-col :span="3"><div class="grid-content bg-purple">营销代码</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{customManager.operateNo}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">支行</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{customManager.parentOrganization}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">网点</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{customManager.organizationName}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">推荐时间</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{managerOperation !== {} ? customManager.createTime : '-'}}</div></el-col>
        </el-row>
        <!-- 大数据认证 -->
        <template v-if="bigDataResult !== {}">
          <div class="row-title">大数据认证</div>
          <!-- 链家快出价 -->
          <el-row class="row-content-title">
            <el-col :span="6"><div class="big-content">链家评估价（万元）</div></el-col>
            <el-col :span="6">
              <div class="big-content">
                <span :class="[bigData.lianjia === '已获取' ? 'resultPass' : 'resultRefuse']">{{bigData.lianjia}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="row-content">
            <el-col :span="6"><div class="grid-content bg-purple">估价结果</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">{{bigData.value}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">估价区间</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">{{bigData.interval}}</div></el-col>
          </el-row>
          <el-row class="row-content">
            <el-col :span="6"><div class="grid-content bg-purple">估价单价</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">{{bigData.price}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">环比上月</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">{{bigData.increase}}</div></el-col>
          </el-row>
          <el-row class="row-content" v-show="showForm">
            <el-col :span="6"><div class="grid-content bg-purple form-title">录入第三方机构评估值</div></el-col>
            <el-col :span="18">
              <el-form
                class="grid-content bg-purple-light form"
                ref="form"
                :model="form"
                :rules="rules">
                <el-form-item>
                  <el-col :span="8" :offset="2">
                    <el-form-item prop="sl">
                      <el-input placeholder="请输入金额" v-model="form.sl" :disabled="form.readOnly">
                        <template slot="prepend">世联:</template>
                        <template slot="append">万元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" :offset="4">
                    <el-form-item prop="rd">
                      <el-input placeholder="请输入金额" v-model="form.rd" :disabled="form.readOnly">
                        <template slot="prepend">仁达:</template>
                        <template slot="append">万元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-row>
                    <el-col :span="11" :offset="1">
                      <span>系统评估房产值为:{{system.money}}</span>
                    </el-col>
                    <el-col :span="11" :offset="1" v-if="!form.readOnly">
                      <el-button type="primary" :disabled="formValueEmpty" @click="submitForm">提交</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <!-- 黑名单 -->
          <el-row class="row-content-title">
            <el-col :span="6"><div class="big-content">黑名单验证</div></el-col>
            <el-col :span="6">
              <div class="big-content">
                <span :class="[loanApply.blackCheck === '验证通过' ? 'resultPass' : 'resultRefuse']">
                  {{loanApply.blackCheck}}
                </span>
              </div>
            </el-col>
          </el-row>
          <!-- 失信被执行人 -->
          <el-row class="row-content-title">
            <el-col :span="6"><div class="big-content">失信被执行人验证</div></el-col>
            <el-col :span="6">
              <div class="big-content">
                <span :class="[bigData.loseUser.result === '验证通过' ? 'resultPass' : 'resultRefuse']">
                  {{bigData.loseUser.result}}
                </span>
              </div>
            </el-col>
          </el-row>
          <template v-if="bigData.loseUser.result === '已获取'">
            <template v-for="(item, idx) in bigData.loseUser.infos">
              <el-row class="row-content-title" :key="idx">
                <el-col :span="24"><div class="big-content bg-purple">{{'获取条目<' + (idx + 1) + '>'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">案号</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.caseCode || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">来源</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.from || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">执行依据文号</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.gistId || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">立案时间</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.regDate || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">执行法院</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.courtName || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">做出执行依据单位</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.gistUnit || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">生效法律文书确定的义务</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.duty || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">被执行人的履行情况</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.performance || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">失信被执行人行为具体情形</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.disruptType || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">执行标的</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.execMoney || '-'}}</div></el-col>
              </el-row>
            </template>
          </template>
          <!-- 被执行人 -->
          <el-row class="row-content-title">
            <el-col :span="6"><div class="big-content">被执行人验证</div></el-col>
            <el-col :span="6">
              <div class="big-content">
                <span :class="[bigData.executedUser.result === '验证通过' ? 'resultPass' : 'resultRefuse']">
                  {{bigData.executedUser.result}}
                </span>
              </div>
            </el-col>
          </el-row>
          <template v-if="bigData.executedUser.result === '已获取'">
            <template v-for="(item, idx) in bigData.executedUser.infos">
              <el-row class="row-content-title" :key="idx">
                <el-col :span="24"><div class="big-content bg-purple">{{'获取条目<' + (idx + 1) + '>'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">案号</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.caseCode || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">来源</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.from || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">执行依据文号</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.gistId || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">立案时间</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.regDate || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">执行法院</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.courtName || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">做出执行依据单位</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.gistUnit || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">生效法律文书确定的义务</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.duty || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">被执行人的履行情况</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.performance || '-'}}</div></el-col>
              </el-row>
              <el-row class="row-content" :key="idx">
                <el-col :span="6"><div class="grid-content bg-purple">失信被执行人行为具体情形</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.disruptType || '-'}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">执行标的</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">{{item.execMoney || '-'}}</div></el-col>
              </el-row>
            </template>
          </template>
        </template>
        <!-- 申请表操作记录 -->
        <el-collapse class="collapse">
          <el-collapse-item title="申请表操作记录">
            <el-table
              stripe
              border
              :data="listOperationHistory"
              style="width: 100%">
              <el-table-column
                prop="operation"
                align="center"
                label="处理动作">
              </el-table-column>
              <el-table-column
                prop="afterState"
                align="center"
                label="处理后状态">
              </el-table-column>
              <el-table-column
                prop="operatorName"
                align="center"
                label="处理操作人">
              </el-table-column>
              <el-table-column
                prop="createTime"
                align="center"
                label="处理时间">
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-main>
  </el-container>

</template>
<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import {
  agencyPredictMoney
} from '../../../../service/getData'
import { valiData } from '../../../../util/utils'
export default {
  name: 'intoPieceDetail',
  data () {
    return {
      loading: false,
      download: false,
      listPhoto: [],
      listOperationHistory: [],
      loanApply: {},
      applyUser: {},
      customManager: {},
      bigDataResult: {},
      thirdAgencyEntries: {},
      relateLoanApplies: {},
      managerOperation: {},
      bigData: {
        lianjia: '待评估',
        value: '-',
        interval: '-',
        price: '-',
        increase: '-',
        loseUser: {
          result: '验证通过',
          infos: []
        },
        executedUser: {
          result: '验证通过',
          infos: []
        }
      },
      form: {
        sl: '',
        rd: '',
        readOnly: false
      },
      rules: {
        sl: [
          { required: true, validator: valiData.recordMoney, trigger: 'blur' }
        ],
        rd: [
          { required: true, validator: valiData.recordMoney, trigger: 'blur' }
        ]
      },
      system: {
        state: '-',
        money: ''
      }
    }
  },
  props: ['data'],
  watch: {
    data (value) {
      this.loanApply = value.loanApplyVo.loanApply
      this.applyUser = value.loanApplyVo.applyUser
      this.listPhoto = value.loanApplyVo.listPhoto
      this.customManager = value.customManager
      this.bigDataResult = value.bigDataResult
      this.thirdAgencyEntries = value.thirdAgencyEntries
      this.relateLoanApplies = value.relateLoanApplies
      this.managerOperation = value.managerOperation
      this.listOperationHistory = value.listOperationHistory

      // 预收信额度
      if (['-', '', null].includes(this.loanApply.predictMoney)) {
        this.system.state = '待评房'
      } else {
        const money = this.formatMoney(this.loanApply.predictMoney) || 0
        this.system.money = money ? `${money}万元` : ''
        if (this.loanApply.predictMoney < 300000 * 100) {
          this.system.state = '不通过'
        } else {
          this.system.state = this.system.money
        }
      }

      // 大数据表格处理
      this.bigDataResult.houseValuation.map(item => {
        if (item.source === '链家') {
          this.bigData.lianjia = '已获取'
          // this.bigData.className = 'resultPass'
          this.bigData.value = `${this.formatMoney(item.houseTotalValue)}万元`
          let min = this.formatMoney(item.rangeMin)
          let max = this.formatMoney(item.rangeMax)
          if (min !== '-' && max !== '-') {
            this.bigData.interval = `${min}万元--${max}万元`
          }
          this.bigData.price = `${this.formatMoney(item.squarePrice)}万元/平`
          this.bigData.increase = `${Number((item.mouthTransRatio * 100).toFixed(2))}%`
        } else if (item.source === '世联') {
          this.form.sl = this.formatMoney(item.houseTotalValue)
        } else if (item.source === '仁达') {
          this.form.rd = this.formatMoney(item.houseTotalValue)
        } else {
          this.form.sl = this.form.rd = ''
        }
      })

      if (this.form.rd && this.form.sl) {
        this.form.readOnly = true
      }

      // 失信人
      this.bigDataResult.listLoseCreditExecutedUser.map((item, idx) => {
        if (idx === 0) {
          this.bigData.loseUser.result = item.result
        }
        this.bigData.loseUser.infos.push(item)
      })

      // 被执行人
      this.bigDataResult.listExecutedUser.map((item, idx) => {
        if (idx === 0) {
          this.bigData.executedUser.result = item.result
        }
        this.bigData.executedUser.infos.push(item)
      })
    }
  },
  created () {
    // getIncomingDataDetail(this.$route.query.id)
    //   .then(resp => {
    //     if (resp.success) {
    //       this.loanApply = resp.data.loanApplyVo.loanApply
    //       this.applyUser = resp.data.loanApplyVo.applyUser
    //       this.listPhoto = resp.data.loanApplyVo.listPhoto
    //       this.customManager = resp.data.customManager
    //       this.bigDataResult = resp.data.bigDataResult
    //       this.thirdAgencyEntries = resp.data.thirdAgencyEntries
    //       this.relateLoanApplies = resp.data.relateLoanApplies
    //       this.managerOperation = resp.data.managerOperation
    //       this.listOperationHistory = resp.data.listOperationHistory

    //       // 预收信额度
    //       if (['-', '', null].includes(this.loanApply.predictMoney)) {
    //         this.system.state = '待评房'
    //       } else {
    //         const money = this.formatMoney(this.loanApply.predictMoney) || 0
    //         this.system.money = money ? `${money}万元` : ''
    //         if (this.loanApply.predictMoney < 300000 * 100) {
    //           this.system.state = '不通过'
    //         } else {
    //           this.system.state = this.system.money
    //         }
    //       }

    //       // 大数据表格处理
    //       this.bigDataResult.houseValuation.map(item => {
    //         if (item.source === '链家') {
    //           this.bigData.lianjia = '已获取'
    //           // this.bigData.className = 'resultPass'
    //           this.bigData.value = `${this.formatMoney(item.houseTotalValue)}万元`
    //           let min = this.formatMoney(item.rangeMin)
    //           let max = this.formatMoney(item.rangeMax)
    //           if (min !== '-' && max !== '-') {
    //             this.bigData.interval = `${min}万元--${max}万元`
    //           }
    //           this.bigData.price = `${this.formatMoney(item.squarePrice)}万元/平`
    //           this.bigData.increase = `${Number((item.mouthTransRatio * 100).toFixed(2))}%`
    //         } else if (item.source === '世联') {
    //           this.form.sl = this.formatMoney(item.houseTotalValue)
    //         } else if (item.source === '仁达') {
    //           this.form.rd = this.formatMoney(item.houseTotalValue)
    //         }
    //       })

    //       if (this.form.rd && this.form.sl) {
    //         this.form.readOnly = true
    //       }

    //       // 失信人
    //       this.bigDataResult.listLoseCreditExecutedUser.map((item, idx) => {
    //         if (idx === 0) {
    //           this.bigData.loseUser.result = item.result
    //         }
    //         this.bigData.loseUser.infos.push(item)
    //       })

    //       // 被执行人
    //       this.bigDataResult.listExecutedUser.map((item, idx) => {
    //         if (idx === 0) {
    //           this.bigData.executedUser.result = item.result
    //         }
    //         this.bigData.executedUser.infos.push(item)
    //       })
    //     } else {
    //       throw new Error(resp.message)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.$router.back()
    //   })
  },
  computed: {
    loanState () {
      if (['客户已申请', '待评房'].includes(this.loanApply.state)) {
        return '评房中'
      } else {
        return this.loanApply.state
      }
    },
    formValueEmpty () {
      return !(this.form.sl !== '' && this.form.rd !== '')
    },
    showForm () {
      // !(['审核不通过','客户放弃'].includes(loanState) && system.state === '待评房')
      // console.log(this.loanState)
      // console.log(this.system.state === '待评房')
      // return ['审核不通过', '客户放弃'].includes(this.loanState)
      if (['审核不通过', '客户放弃'].includes(this.loanState) && this.system.state === '待评房') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getLineheight (type) {
      const baseLineHeight = 200
      let num = 0
      this.listPhoto.map(photo => {
        if (photo.type === type) {
          num += 1
        }
      })
      return `line-height: ${(baseLineHeight + 2) * Math.ceil(num / 6)}px;`      // （基础高度 + 边框高度) * 行数
    },
    back () {
      this.$emit('on-close')
//      this.form.sl = this.form.rd = ''
      this.$refs['form'].resetFields()
      this.form.readOnly = false
      this.system.money = ''
    },
    formatMoney (money, hex = 10000, fixed = 0) {  // 格式化金额成123,456,789格式
      if (typeof money !== 'number') {
        return money
      }
      let m = Number((money / hex).toFixed(fixed))
      return String(m / 100).replace(/(?=((?!\b)\d{3})+$)/g, ',')
    },
    homeAddress (detail = false) {
      let address = ''
      if (this.loanApply.houseProvince !== '-') {
        address += `${this.loanApply.houseProvince}省`
      }
      if (this.loanApply.houseCity !== '-') {
        address += `${this.loanApply.houseCity}市`
      }
      if (this.loanApply.houseRegion !== '-') {
        address += this.loanApply.houseRegion
      }
      if (detail && this.loanApply.communityName !== '-') {
        address += this.loanApply.communityName
      }
      return address
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        debugger
        if (valid) {
          let type, message, title
          this.loading = true
          let form = {
            applyId: this.loanApply.applyId,
            evaluations: [
              { agency: '世联', predictMoney: this.form.sl * 1000000 },
              { agency: '仁达', predictMoney: this.form.rd * 1000000 }
            ]
          }
          agencyPredictMoney(form)
            .then(resp => {
              if (resp.success) {
                type = 'success'
                title = '成功'
              } else {
                title = '失败'
                type = 'error'
              }
              message = resp.message
            })
            .catch(err => {
              title = '失败'
              type = 'error'
              message = err.message
              console.log(err)
            })
            .then(() => {
              this.loading = false
              this.$notify({
                title,
                message,
                type
              })
              if (type === 'success') {
                this.$router.go(0)
              }
            })
        }
      })
    },
    pdf () {
      this.download = true
      let dom = document.querySelector('#detail').cloneNode(true)
      let dom2 = document.querySelector('#copy')
      dom2.innerHTML = ''
      dom2.appendChild(dom)
      dom2.style.position = 'absolute'
      dom2.style.zIndex = 0
      html2canvas(dom, {
        onrendered: (canvas) => {
          let imgData = canvas.toDataURL('image/jpeg')
          let img = new Image()
          img.src = imgData
          // 根据图片的尺寸设置pdf的规格，要在图片加载成功时执行，之所以要*0.225是因为比例问题
          img.onload = () => {
            let doc
            // 此处需要注意，pdf横置和竖置两个属性，需要根据宽高的比例来调整，不然会出现显示不完全的问题
            if (canvas.width > canvas.height) {
              doc = new JsPDF('l', 'mm', [canvas.width * 0.225, canvas.height * 0.225])
            } else {
              doc = new JsPDF('p', 'mm', [canvas.width * 0.225, canvas.height * 0.23])
            }
            // doc.addImage(imgData)
            doc.addImage(
              imgData,
              'JPEG',
              4.5,
              10,
              (canvas.width - 40) * 0.225,
              canvas.height * 0.225
            )
            // 根据下载保存成不同的文件名
            doc.save('hanglian_pdf_' + new Date().getTime() + '.pdf')
            this.download = false
          }
        },
        background: '#fff', // 这里给生成的图片默认背景，不然的话，如果你的html根节点没设置背景的话，会用黑色填充。
        allowTaint: true,    // 避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰则会停止处理html2canvas
        height: dom.clientHeight
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail-full-screnn {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;
  z-index: 3;
}

.detail-title {
  border-bottom: 1px dashed #ccc;
  .title {
    text-align: left;
    span {
      font-size: 20px;
    }
  }
  .btns {
    text-align: right;
    button {
      font-size: 16px;
    }
  }
}

.row-title {
  font-size: 18px;
  background: #2299dd;
  line-height: 40px;
  text-indent: 20px;
  color: white;
  text-align: left;
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
}

.row-content-title {
  background-color: #caf4ff;
  text-align: left;
  text-indent: 20px;
  color: #2299dd;
  border-bottom: 1px solid #e0e3e3;

  .grid-content:before {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #2299dd;
    margin-right: 10px;
    vertical-align: middle;
  }
}

.row-content {
  border: 1px solid #e0e3e3;
  border-top: none;
}

.grid-content,
.big-content {
  line-height: 36px;
}
.bg-purple {
  background: #e5f8fd;
  color: #000;
}
.bg-purple-light {
  background: #fff;
}

.idCard-title {
  line-height: 202px;
}

.resultPass::before,
.resultRefuse::before {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #2299dd;
  border-radius: 50%;
  margin-right: 10px;
}

.form-title {
  line-height: 137px;
}

.form {
  margin-top: 18px;
}

.collapse {
  margin-top: 20px;
}
</style>
<style lang="less">
.idCard {
  height: 200px;
  box-shadow: none;
  border-radius: 0;

  .el-card__body {
    height: 100%;
    padding: 5px 0 0;

    img {
      height: 80%;
      max-width: 95%;
    }
  }
}
.el-card{
  border: none;
}
.el-table__fixed {
  display: none;
}
</style>

