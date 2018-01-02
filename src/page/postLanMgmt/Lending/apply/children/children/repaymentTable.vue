<template>
  <el-form :model="Data" :rules="rules" ref="form" class="detailForm">
    <el-form-item>
      <h3 class="detailForm-title">放还款信息</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <!-- 基本信息 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': !baseShow}">
        <el-col :span="12">基本信息</el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse('baseShow')">{{collapseText(baseShow)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="baseShow">
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td :class="{ needs:other.write}">合同编号</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="contractCode">
                  <el-input
                    class="table-input"
                    size="mini"
                    placeholder="请输入"
                    v-model="Data.contractCode"
                    @blur="handlerBlur('contractCode')">
                  </el-input>
                </el-form-item>
                <span v-else>{{Data.contractCode}}</span>
              </td>
              <td :class="{ needs:other.write}">申请地点</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="applyCity">
                  <el-select
                    placeholder="请选择"
                    class="table-input"
                    v-model="Data.applyCity"
                    @change="handlerBlur('applyCity')">
                    <el-option
                      v-for="(item, idx) in options.OpenCity"
                      :key="idx"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <span v-else>{{Data.applyCity}}</span>
              </td>
              <td :class="{ needs:other.write}">申请用途</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="applyUseFor">
                  <el-input
                    class="table-input"
                    v-model="Data.applyUseFor"
                    size="mini"
                    placeholder="请输入"
                    @blur="handlerBlur('applyUseFor')">
                  </el-input>
                </el-form-item>
                <span v-else>{{Data.applyUseFor}}</span>
              </td>
              <td></td>
              <td></td>
              <!--<td :class="{ needs:other.write}">合同期限(月)</td>-->
              <!--<td class="input">-->
                <!--<el-form-item v-if="other.write" prop="contractTimeLimit">-->
                  <!--<el-select-->
                    <!--placeholder="请选择"-->
                    <!--class="table-input"-->
                    <!--v-model="Data.contractTimeLimit"-->
                    <!--@change="handlerBlur('contractTimeLimit')">-->
                    <!--<el-option-->
                      <!--v-for="(item, idx) in options.contractTimeLimit"-->
                      <!--:key="idx"-->
                      <!--:label="item.value"-->
                      <!--:value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<span v-else>{{Data.contractTimeLimit}}</span>-->
              <!--</td>-->
            </tr>
            <!--<tr>-->
              <!--<td :class="{ needs:other.write}">还款方式</td>-->
              <!--<td class="input">-->
                <!--<el-form-item v-if="other.write" prop="repayPrincipalMode">-->
                  <!--<el-select-->
                    <!--placeholder="请选择"-->
                    <!--class="table-input"-->
                    <!--v-model="Data.repayPrincipalMode"-->
                    <!--@change="handlerBlur('repayPrincipalMode')">-->
                    <!--<el-option-->
                      <!--v-for="(item, idx) in options.repayPrincipalMode"-->
                      <!--:key="idx"-->
                      <!--:label="item.value"-->
                      <!--:value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<span v-else>{{Data.repayPrincipalMode}}</span>-->
              <!--</td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--&lt;!&ndash;<td :class="{ needs:other.write}">固定利率</td>&ndash;&gt;-->
              <!--&lt;!&ndash;<td class="input">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form-item v-if="other.write" prop="fixedInterestRate">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-input&ndash;&gt;-->
                    <!--&lt;!&ndash;class="table-input"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-model="Data.fixedInterestRate"&ndash;&gt;-->
                    <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
                    <!--&lt;!&ndash;ref="fixedInterestRate"&ndash;&gt;-->
                    <!--&lt;!&ndash;placeholder="请输入"&ndash;&gt;-->
                    <!--&lt;!&ndash;:maxlength="fixedInterestRate_maxLength"&ndash;&gt;-->
                    <!--&lt;!&ndash;@blur="handlerBlur('fixedInterestRate')"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-on:input="handlerChange($event, 'fixedInterestRate')">&ndash;&gt;-->
                    <!--&lt;!&ndash;<template slot="suffix">%</template>&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                <!--&lt;!&ndash;<span v-else>{{Data.fixedInterestRate}}%</span>&ndash;&gt;-->
              <!--&lt;!&ndash;</td>&ndash;&gt;-->
              <!--&lt;!&ndash;<td :class="{ needs:other.write}">浮动利率</td>&ndash;&gt;-->
              <!--&lt;!&ndash;<td class="input">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form-item v-if="other.write" prop="floatInterestRate">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-input&ndash;&gt;-->
                    <!--&lt;!&ndash;class="table-input"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-model="Data.floatInterestRate"&ndash;&gt;-->
                    <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
                    <!--&lt;!&ndash;ref="floatInterestRate"&ndash;&gt;-->
                    <!--&lt;!&ndash;placeholder="请输入"&ndash;&gt;-->
                    <!--&lt;!&ndash;:maxlength="floatInterestRate_maxLength"&ndash;&gt;-->
                    <!--&lt;!&ndash;@blur="handlerBlur('floatInterestRate')"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-on:input="handlerChange($event, 'floatInterestRate')">&ndash;&gt;-->
                    <!--&lt;!&ndash;<template slot="suffix">%</template>&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                <!--&lt;!&ndash;<span v-else>{{Data.floatInterestRate}}%</span>&ndash;&gt;-->
              <!--&lt;!&ndash;</td>&ndash;&gt;-->
              <!--&lt;!&ndash;<td>上浮利率</td>&ndash;&gt;-->
              <!--&lt;!&ndash;<td class="input">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form-item v-if="other.write" prop="riseInterestRate">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-input&ndash;&gt;-->
                    <!--&lt;!&ndash;class="table-input"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-model="Data.riseInterestRate"&ndash;&gt;-->
                    <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
                    <!--&lt;!&ndash;placeholder="请输入"&ndash;&gt;-->
                    <!--&lt;!&ndash;ref="riseInterestRate"&ndash;&gt;-->
                    <!--&lt;!&ndash;:maxlength="riseInterestRate_maxLength"&ndash;&gt;-->
                    <!--&lt;!&ndash;@blur="handlerBlur('riseInterestRate')"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-on:input="handlerChange($event, 'riseInterestRate')">&ndash;&gt;-->
                    <!--&lt;!&ndash;<template slot="suffix">%</template>&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                <!--&lt;!&ndash;<span v-else>{{Data.riseInterestRate}}%</span>&ndash;&gt;-->
              <!--&lt;!&ndash;</td>&ndash;&gt;-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td>利率上浮原因</td>-->
              <!--<td>-->
                <!--<el-form-item v-if="other.write" prop="riseInterestReason">-->
                  <!--<el-input-->
                    <!--class="table-input"-->
                    <!--v-model="Data.riseInterestReason"-->
                    <!--size="mini"-->
                    <!--placeholder="请输入"-->
                    <!--@blur="handlerBlur('riseInterestReason')">-->
                  <!--</el-input>-->
                <!--</el-form-item>-->
                <!--<span v-else>{{Data.riseInterestReason}}</span>-->
              <!--</td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td></td>-->
            <!--</tr>-->
          </table>
        </div>
      </el-collapse-transition>
      <!-- 放款信息 -->
      <el-row class="collapse-row" :class="{'collapse-row-bottom': !loanShow}">
        <el-col :span="12">放款信息</el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse('loanShow')">{{collapseText(loanShow)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="loanShow">
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td :class="{ needs:other.write}">放款合同金额</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="contractMoney">
                  <el-input
                    class="table-input"
                    v-model="Data.contractMoney"
                    size="mini"
                    placeholder="请输入"
                    @blur="handlerBlur('contractMoney')">
                    <template slot="prepend">&yen;</template>
                  </el-input>
                </el-form-item>
                <span v-else>{{ formatter.changeMoney(Data.contractMoney, 1, '￥') }}</span>
              </td>
              <td :class="{ needs:other.write}">风控审批金额</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="examineMoney">
                  <el-input
                    class="table-input"
                    v-model="Data.examineMoney"
                    size="mini"
                    placeholder="请输入"
                    @blur="handlerBlur('examineMoney')">
                    <template slot="prepend">&yen;</template>
                  </el-input>
                </el-form-item>
                <span v-else>{{ formatter.changeMoney(Data.examineMoney, 1, '￥') }}</span>
              </td>
              <td :class="{ needs:other.write}">放款类型</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="payType">
                  <el-select
                    placeholder="请选择"
                    class="table-input"
                    v-model="Data.payType"
                    @change="handlerBlur('payType')">
                    <el-option
                      v-for="(item, idx) in options.payType"
                      :key="idx"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <span v-else>{{Data.payType}}</span>
              </td>
              <td :class="{ needs:other.write}">放款账户类型</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="accountType">
                  <el-select
                    placeholder="请选择"
                    class="table-input"
                    v-model="Data.accountType"
                    @change="handlerBlur('accountType')">
                    <el-option
                      v-for="(item, idx) in options.accountType"
                      :key="idx"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <span v-else>{{Data.accountType}}</span>
              </td>
            </tr>
            <tr>
              <td :class="{ needs:other.write}">放款账户银行</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="accountBank">
                  <el-select
                    placeholder="请选择"
                    class="table-input"
                    v-model="Data.accountBank"
                    @change="handlerBlur('accountBank')">
                    <el-option
                      v-for="(item, idx) in options.accountBank"
                      :key="idx"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <span v-else>{{Data.accountBank}}</span>
              </td>
              <td :class="{ needs:other.write}">放款账户名称</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="accountName">
                  <el-input
                    class="table-input"
                    v-model="Data.accountName"
                    size="mini"
                    placeholder="请输入"
                    @blur="handlerBlur('accountName')">
                  </el-input>
                </el-form-item>
                <span v-else>{{Data.accountName}}</span>
              </td>
              <td :class="{ needs:other.write}">放款账户号码</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="accountNo">
                  <el-input
                    class="table-input"
                    v-model="Data.accountNo"
                    size="mini"
                    placeholder="请输入"
                    @blur="handlerBlur('accountNo')">
                  </el-input>
                </el-form-item>
                <span v-else>{{Data.accountNo}}</span>
              </td>
              <td :class="{ needs:other.write}">放款账户开户行</td>
              <td class="input">
                <template v-if="other.write">
                  <el-form-item v-if="other.write" prop="address">
                    <el-cascader
                      class="table-input"
                      placeholder="省/自治区/直辖市"
                      :options="city"
                      :props="cascaderProps"
                      v-model="address"
                      @active-item-change="handleItemChange"
                      @change="handlerAddress('address')">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item prop="accountBankBranch">
                    <el-input
                      class="table-input"
                      size="mini"
                      placeholder="请填写支行名称"
                      v-model="Data.accountBankBranch"
                      @blur="handlerBlur('accountBankBranch')">
                    </el-input>
                  </el-form-item>
                </template>
                <span v-else>{{Data.accountBankProvince + Data.accountBankCity + Data.accountBankBranch}}</span>
              </td>
            </tr>
            <tr>
              <td :class="{ needs:other.write}">期望放款日期</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="expectPayDate">
                  <el-date-picker
                    class="table-input"
                    type="date"
                    placeholder="选择日期"
                    v-model="expectPayDate"
                    style="width: 100%;"
                    :picker-options="pickerOptions1"
                    @change="handlerBlur('expectPayDate')">
                  </el-date-picker>
                </el-form-item>
                <span v-else>{{Data.expectPayDate}}</span>
              </td>
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
      <!-- 还款信息 -->
      <el-row class="collapse-row" :class="{'collapse-row-bottom': !repaymentShow}">
        <el-col :span="12">还款信息</el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse('repaymentShow')">{{collapseText(repaymentShow)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="repaymentShow">
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td :class="{ needs:other.write}">还款账户类型</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="repayAccountType">
                  <el-select
                    placeholder="请选择"
                    class="table-input"
                    v-model="Data.repayAccountType"
                    @change="handlerBlur('repayAccountType')">
                    <el-option
                      v-for="(item, idx) in options.repayAccountType"
                      :key="idx"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <span v-else>{{Data.repayAccountType}}</span>
              </td>
              <td :class="{ needs:other.write}">还款账户银行</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="repayAccountBank">
                  <el-select
                    placeholder="请选择"
                    class="table-input"
                    v-model="Data.repayAccountBank"
                    @change="handlerBlur('repayAccountBank')">
                    <el-option
                      v-for="(item, idx) in options.repayAccountBank"
                      :key="idx"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <span v-else>{{Data.repayAccountBank}}</span>
              </td>
              <td :class="{ needs:other.write}">还款账户号码</td>
              <td class="input">
                <el-form-item v-if="other.write" prop="repayAccountNo">
                  <el-input
                    class="table-input"
                    v-model="Data.repayAccountNo"
                    size="mini"
                    placeholder="请输入"
                    @blur="handlerBlur('repayAccountNo')">
                  </el-input>
                </el-form-item>
                <span v-else>{{Data.repayAccountNo}}</span>
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </el-collapse-transition>
    </el-form-item>
  </el-form>
</template>
<script>
import {
  getDict,
  getSubLocation,
  getDisplayLocation
} from '@/service/getData'
import { formatter, valiData } from '@/util/utils'
export default {
  name: 'repaymentTable',
  props: ['data', 'other'],
  data () {
    let validateTime = (rule, value, callback) => {
      value = (typeof value === 'string' ? new Date(value.replace(/-/g, '/') + ' 23:59:59') : value)
      if (value.getTime() < Date.now()) {
        callback(new Error('期望放款日期必须在今天之后'))
      } else {
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback()
      } else if (!(/^[0-9.]*$/g.test(String(value)))) {
        callback(new Error('仅允许输入数字、符号.和￥'))
      } else {
        callback()
      }
    }
    return {
      expectPayDate: '',
      baseShow: true,
      loanShow: true,
      repaymentShow: true,
      contractTime: 6, // 默认合同期限
      selects: [
        'repayPrincipalMode', // 还款方式
        'OpenCity', // 申请城市
        'payType', // 放款类型
        'accountType', // 放款账户类型
        'accountBank', // 放款账户银行
        'repayAccountType', // 还款账户类型
        'repayAccountBank', // 还款账户银行
        'contractTimeLimit' // 合同期限
      ],
      serviceCity: [],
      city: [],
      cascaderProps: {
        value: 'locationId',
        label: 'name',
        children: 'subLocations'
      },
      canEmptyKey: ['riseInterestRate', 'riseInterestReason'],
      options: {},
      Data: this.data,
      address: [],
//      fixedInterestRate_maxLength: 100,
//      floatInterestRate_maxLength: 100,
//      riseInterestRate_maxLength: 100,
      rules: {   // 表单验证规则
        contractCode: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { validator: valiData.onlyString, trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        applyCity: [
          { required: true, message: '请选择申请地点', trigger: 'change' }
        ],
        applyUseFor: [
          { required: true, message: '请输入申请用途', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
//        contractTimeLimit: [
//          { required: true, message: '请选择合同期限', trigger: 'change' }
//        ],
//        repayPrincipalMode: [
//          { required: true, message: '请选择还款方式', trigger: 'change' }
//        ],
//        fixedInterestRate: [
//          { required: true, message: '请输入固定利率', trigger: 'blur' },
//          { validator: validatePass2, trigger: 'blur' },
//          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
//        ],
//        floatInterestRate: [
//          { required: true, message: '请输入上浮利率', trigger: 'blur' },
//          { validator: validatePass2, trigger: 'blur' },
//          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
//        ],
        riseInterestRate: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
//        riseInterestReason: [
//          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
//        ],
        contractMoney: [
          { required: true, message: '请输入放款合同金额', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        examineMoney: [
          { required: true, message: '请输入风控审批金额', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请选择放款类型', trigger: 'change' }
        ],
        accountType: [
          { required: true, message: '请选择放款账户类型', trigger: 'change' }
        ],
        accountBank: [
          { required: true, message: '请选择放款账户银行', trigger: 'change' }
        ],
        accountName: [
          { required: true, message: '请输入放款账户名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        accountNo: [
          { required: true, message: '请输入放款账户号码', trigger: 'blur' },
          { validator: valiData.onlyNumber, trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        accountBankBranch: [
          { required: true, message: '请输入支行名称', trigger: 'blur' }
        ],
        expectPayDate: [
          { type: 'date', required: true, message: '请输入期望放款日期', trigger: 'change' },
          { validator: validateTime, trigger: 'change' }
        ],
        repayAccountType: [
          { required: true, message: '请选择还款账户类型', trigger: 'change' }
        ],
        repayAccountBank: [
          { required: true, message: '请选择还款账户银行', trigger: 'change' }
        ],
        repayAccountNo: [
          { required: true, message: '请输入还款账户号码', trigger: 'blur' },
          { validator: valiData.onlyNumber, trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        address: [
          { type: 'array', required: true, message: '请选择省市', trigger: 'change' }
        ]
      },
      formatter: formatter,
      pickerOptions1: {  // 时间选择器相关设置
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  created () {
    getDict(this.selects)
      .then(resp => {
        if (resp.success) {
          this.options = resp.data
        }
      })
    getDisplayLocation()
      .then(resp => {
        if (resp.success) {
          this.serviceCity = resp.data
        }
      })
    this.getCity()
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
    },
    handleItemChange (val) {
      const city = this.getUpdateCity(this.city, val)
      if (!city.subLocations.length) {
        this.getCity(city, val[val.length - 1])
      }
    },
    getCity (city, id = 86) {
      return getSubLocation(id)
        .then(resp => {
          if (resp.success) {
            resp.data.map(item => {
              if (item.level === 2) { // 加载最后一级的城市
                city.subLocations.push(item)
              } else {
                item['subLocations'] = []
                if (id === 86) {  // 初次加载所有1级城市
                  this.city.push(item)
                } else {
                  city.subLocations.push(item)
                }
              }
            })
          }
        })
    },
    getCityName (city, activeArr, list, match = 'locationId', key = 'name') {
      let arr = activeArr.concat()
      for (let item of city) {
        if (item[match] === arr[0]) {
          if (arr.length === 1) {
            return list.push(item[key])
          } else {
            arr.shift()
            list.push(item[key])
            if (!item.subLocations.length) {
              this.getCity(item, item.locationId)
                .then(() => {
                  return this.getCityName(item.subLocations, arr, list, match, key)
                })
            } else {
              return this.getCityName(item.subLocations, arr, list, match, key)
            }
          }
        }
      }
    },
    getUpdateCity (city, activeArr) {
      let arr = activeArr.concat()
      for (let item of city) {
        if (item.locationId === arr[0]) {
          if (arr.length === 1) {
            return item
          } else {
            arr.shift()
            return this.getUpdateCity(item.subLocations, arr)
          }
        }
      }
    },
    getTimes (dateString) {
      if (dateString) {
        let date = new Date(dateString.replace(/-/, '/'))
        return date
      }
    },
    handlerAddress (key) {
      let name = []
      this.getCityName(this.city, this.address, name)
      name.map((item, idx) => {
        const entity = {
          contractId: this.other.contractId,
          fieldKey: idx === 0 ? 'accountBankProvince' : 'accountBankCity',
          fieldValue: item
        }
        setTimeout(() => {
          this.$emit('on-save', 'loanDetail', entity)
        }, 1000 * idx)
      })
      this.Data.address = this.address
    },
    handlerBlur (key) {
      let value = this.Data[key]
      let expectPayDate
      let entity
      if (!value && key !== 'expectPayDate') {
        if (this.canEmptyKey.includes(key)) {
          if (key === 'riseInterestRate') {
            value = '0'
          } else {
            value = ' '
          }
        } else {
          return
        }
      }

      // 利率格式化
      if (['riseInterestRate', 'fixedInterestRate', 'floatInterestRate'].includes(key) && value) {
        if (!value.split('.')[1]) {
          value = value + '.00000'
        } else if (value.split('.')[1].length < 5) {
          value = value.split('.')[0] + '.' + value.split('.')[1].padEnd(5, 0)
        }
      }
      // 金额判断
      if (key === 'contractMoney') {
        if (parseInt(value) === 0) {
          return this.error('放款合同金额不能为0')
        }
      }
      if (key === 'examineMoney') {
        if (parseInt(value) === 0) {
          return this.error('风控审批金额不能为0')
        }
      }
      // 放款日期判断
      if (key === 'expectPayDate') {
        if (typeof this.expectPayDate === 'string' && new Date(this.expectPayDate.replace(/-/g, '/') + ' 23:59:59').getTime() < Date.now()) {
          return this.error('期望放款时间必须在今天以后')
        } else {
          value = this.expectPayDate
          expectPayDate = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()
        }
      }
      this.Data[key] = value
      if (expectPayDate) {
        entity = {
          contractId: this.other.contractId,
          fieldKey: key,
          fieldValue: expectPayDate
        }
      } else {
        entity = {
          contractId: this.other.contractId,
          fieldKey: key,
          fieldValue: String(this.Data[key])
        }
      }
      this.$emit('on-save', 'loanDetail', entity)
    },
    handlerChange (value, key) {
      let str = value + ''
      if (str.split('.').length > 1) {
        if (str.split('.')[1].length > 4) {
          this.error('只允许输入小数点后五位')
          this.Data[key] = str.split('.')[0] + '.' + str.split('.')[1].substring(0, 5)
          let length = str.split('.')[0].length + 7
          let name = key + '_maxLength'
          this[name] = length
        }
      }
    },
    error (message) {
      this.$message.error(message)
    }
  },
  watch: {
    data (value) {
      this.Data = value
      this.expectPayDate = ''
      let arr = [value.accountBankProvince, value.accountBankCity]
      this.getCityName(this.city, arr, this.address, 'name', 'locationId')
      this.Data.address = this.address
      if (this.other.write) {
//        this.Data.expectPayDate = this.expectPayDate = this.getTimes(value.expectPayDate)
        this.Data.expectPayDate = this.expectPayDate = (typeof (value.expectPayDate) === 'object' ? value.expectPayDate : this.getTimes(value.expectPayDate))
      } else {
        if (!this.Data.expectPayDate) {
          this.Data.expectPayDate = ''
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
