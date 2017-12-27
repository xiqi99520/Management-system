<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">担保人基本信息</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <table cellspacing="0" cellpadding="10">
        <tr>
          <td :class="{ needs:other.write}">担保人姓名</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="name">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请填写担保人姓名"
                :maxlength="20"
                :minlength="1"
                v-model="Data.name"
                @blur="handlerBlur('name')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.name}}</span>
          </td>
          <td>担保人证件类型</td>
          <td>身份证</td>
          <td :class="{ needs:other.write}">担保人证件号码</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="certificateNo">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请填写担保人证件号码"
                :maxlength="18"
                v-model="Data.certificateNo"
                @blur="handlerBlur('certificateNo')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.certificateNo}}</span>
          </td>
          <td :class="{ needs:other.write}">担保方式</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="guarantyMode">
              <el-select
                placeholder="请选择担保方式"
                class="table-input"
                v-model="Data.guarantyMode"
                @change="handlerBlur('guarantyMode')">
                <el-option
                  v-for="(item, idx) in options.guarantyMode"
                  :key="idx"
                  :value="item.value"
                  :lable="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.guarantyMode}}</span>
          </td>
        </tr>
        <tr>
          <td :class="{ needs:other.write}">担保金额</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="guarantyMoney">
             <el-input
                class="table-input"
                size="mini"
                placeholder="请填写担保金额"
                :minlength="1"
                :maxlength="20"
                v-model="Data.guarantyMoney"
                @blur="handlerBlur('guarantyMoney')">
                <template slot="prepend">&yen;</template>
              </el-input>
            </el-form-item>
            <span v-else>{{formatter.changeMoney(Data.guarantyMoney, 1, '￥')}}</span>
          </td>
          <td :class="{ needs:other.write}">担保关系</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="guarantyRelation">
              <el-select
                placeholder="请选择担保关系"
                class="table-input"
                v-model="Data.guarantyRelation"
                @change="handlerBlur('guarantyRelation')">
                <el-option
                  v-for="(item, idx) in options.guarantyRelation"
                  :key="idx"
                  :value="item.value"
                  :lable="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.guarantyRelation}}</span>
          </td>
          <td>与主借款人关系</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="lenderRelation">
              <el-select
                placeholder="请选择关系"
                class="table-input"
                v-model="Data.lenderRelation"
                @change="handlerBlur('lenderRelation')">
                <el-option
                  v-for="(item, idx) in options.lenderRelation"
                  :key="idx"
                  :value="item.value"
                  :lable="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.lenderRelation}}</span>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </el-form-item>
  </el-form>
</template>
<script>
import {
  getDict
} from '@/service/getData'
import { formatter, valiData } from '@/util/utils'
export default {
  name: 'guarantorTable',
  props: ['data', 'other'],
  data () {
    return {
      selects: [ // 需要查询的下拉框
        'guarantyMode', // 担保方式
        'guarantyRelation', // 担保关系
        'lenderRelation' // 与主借款人关系
      ],
      options: {}, // 下拉框选项,
      Data: this.data, // 继承数据
      rules: {
        name: [
          { required: true, message: '请输入担保人姓名', trigger: 'blur' }
        ],
        certificateNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { validator: valiData.onlyString, trigger: 'blur' },
          { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' }
        ],
        guarantyMode: [
          { required: true, message: '请选择担保方式', trigger: 'change' }
        ],
        guarantyMoney: [
          { required: true, message: '请输入担保金额', trigger: 'blur' }
        ],
        guarantyRelation: [
          { required: true, message: '请选择担保关系', trigger: 'change' }
        ]
        // lenderRelation: [
        //   { required: true, message: '请选择与主借款人关系', trigger: 'change' }
        // ]
      },
      formatter: formatter
    }
  },
  created () {
    getDict(this.selects)
      .then(resp => {
        if (resp.success) {
          this.options = resp.data
        }
      })
  },
  methods: {
    handlerBlur (key) {
      if (!this.Data[key]) {
        return
      }
      if (key === 'guarantyMoney') {
        if (parseInt(this.Data[key]) === 0) {
          return this.error('担保金额不能为0')
        }
      }
      const entity = {
        fieldKey: key,
        fieldValue: this.Data[key]
      }
      this.$emit('on-save', 'guarantor', entity)
    },
    error (message) {
      this.$message.error(message)
    }
  },
  watch: {
    data (value) {
      this.Data = value
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
