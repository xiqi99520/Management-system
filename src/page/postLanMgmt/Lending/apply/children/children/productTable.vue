<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
      <el-form-item>
        <h3 class="detailForm-title">产品信息</h3>
      </el-form-item>
      <el-form-item class="detailForm-item">
        <table class="" cellspacing="0" cellpadding="10">
          <tr>
            <td :class="{ needs:other.write}">产品名称</td>
            <td class="input" colspan="3" style="position: relative">
              <el-form-item v-if="other.write" prop="productId" style="float: left">
                <el-select
                  filterable
                  placeholder="请选择"
                  v-model="Data.productId"
                  @change="handlerSelect">
                  <el-option
                    v-for="(item, idx) in options"
                    :key="idx"
                    :label="item.productName"
                    :value="item.productId">
                  </el-option>
                </el-select>
              </el-form-item>
              <span v-else>{{ productName }}</span>
              <el-button type="text" v-if="Data.productId" @click="detailShow" style="float: right">查看产品详情</el-button>
            </td>
            <td>合同期限（月）</td>
            <td>
              <span>{{ contractTimeLimit }}</span>
            </td>
            <td>还款方式</td>
            <td>
              <span>{{ repayPrincipalMode }}</span>
            </td>
          </tr>
          <tr>
            <td>上浮利率</td>
            <td class="input">
              <el-form-item v-if="other.write" prop="riseInterestRate">
                <el-input
                  class="table-input"
                  v-model="Data.riseInterestRate"
                  size="mini"
                  placeholder="请输入"
                  ref="riseInterestRate"
                  :maxlength="riseInterestRate_maxLength"
                  @blur="handlerBlur('riseInterestRate')"
                  v-on:input="handlerChange($event, 'riseInterestRate')">
                  <template slot="suffix">%</template>
                </el-input>
              </el-form-item>
              <span v-else>{{Data.riseInterestRate}}%</span>
            </td>
            <td>利率上浮原因</td>
            <td colspan="5">
              <el-form-item v-if="other.write" prop="riseInterestReason">
                <el-input
                  class="table-input inputClass"
                  v-model="Data.riseInterestReason"
                  size="mini"
                  placeholder="请输入"
                  @blur="handlerBlur('riseInterestReason')">
                </el-input>
              </el-form-item>
              <span v-else>{{Data.riseInterestReason}}</span>
            </td>
          </tr>
        </table>
      </el-form-item>
    </el-form>
</template>

<script>
  import { getProductName, getProductInfo } from '@/service/getData'
  import detailDialog from './children/dialog'
  import store from '@/store'
  export default {
    name: 'productTable',
    props: ['data', 'other'],
    components: {
      // 产品详情
      detailDialog
    },
    data () {
      return {
        productName: '',
        loading: false,
        Data: {
          productId: '',
          riseInterestRate: '',
          riseInterestReason: ''
        },
        contractTimeLimit: '',
        repayPrincipalMode: '',
        riseInterestRate_maxLength: 100,
        options: [],
        rules: {   // 表单验证规则
          productId: [
            { type: 'number', required: true, message: '请选择产品名称', trigger: 'change' }
          ],
          riseInterestReason: [
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      getProductName()
        .then(resp => {
          if (resp.success) {
            this.options = resp.data
          }
          // TODO: 错误处理
        })
    },
    watch: {
      data (value) {
        this.Data.productId = value.productId
        this.Data.riseInterestRate = value.riseInterestRate
        this.Data.riseInterestReason = value.riseInterestReason
        this.handlerSelect()
      }
    },
    methods: {
      handlerSelect () { // 下拉框选项带出产品信息
        if (this.Data.productId) {
          this.options.map(item => {
            if (item.productId === this.Data.productId) {
              this.productName = item.productName
            }
          })
          getProductInfo(this.Data.productId)
            .then(resp => {
              if (resp.success) {
                this.contractTimeLimit = resp.data.term
                this.repayPrincipalMode = resp.data.repayType
                this.handlerBlur('productId')
              }
            })
        } else {
          this.contractTimeLimit = ''
          this.repayPrincipalMode = ''
        }
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
      handlerBlur (key) {
        const entity = {
          contractId: this.other.contractId,
          fieldKey: key,
          fieldValue: this.Data[key]
        }
        this.$emit('on-save', 'loanDetail', entity)
      },
      detailShow () {
        store.commit('SET_DETAIL_DIALOG', {
          showDialog: true,
          productId: this.Data.productId
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~@/style/lendingApplyDetail";
</style>
