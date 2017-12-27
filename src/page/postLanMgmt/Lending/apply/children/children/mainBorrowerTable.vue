<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">主借款人基本信息</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <table class="" cellspacing="0" cellpadding="10">
        <tr>
          <td>借款人姓名</td>
          <td>{{Data.name}}</td>
          <td :class="{ needs:other.write}">借款人类型</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="type">
              <el-select
                placeholder="请选择借款人类型"
                class="table-input"
                v-model="Data.type"
                @change="handlerBlur('type')">
                <el-option
                  v-for="(item, idx) in options.LenderType"
                  :key="idx"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.type}}</span>
          </td>
          <td>证件类型</td>
          <td>身份证</td>
          <td>证件号码</td>
          <td>{{Data.idCardNo}}</td>
        </tr>
        <tr>
          <td :class="{ needs:other.write}">联系电话</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="contactNo">
              <el-input
                v-model="Data.contactNo"
                class="table-input"
                size="mini"
                placeholder="请输入座机/手机号"
                @blur="handlerBlur('contactNo')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.contactNo}}</span>
          </td>
          <td>手机电话</td>
          <td>{{Data.phoneNo}}</td>
          <td :class="{ needs:other.write}">邮政编码</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="postalCode">
              <el-input
                class="table-input"
                size="mini"
                v-model="Data.postalCode"
                placeholder="请输入邮政编码"
                @blur="handlerBlur('postalCode')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.postalCode}}</span>
          </td>
          <td :class="{ needs:other.write}">通讯地址</td>
          <td class="input">
            <template v-if="other.write">
              <el-form-item prop="contact">
                <el-cascader
                  class="table-input"
                  placeholder="省/自治区/直辖市"
                  :options="city"
                  :props="cascaderProps"
                  v-model="contact"
                  @active-item-change="handleItemChange"
                  @change="handlerAddress('contact')">
                </el-cascader>
              </el-form-item>
              <el-form-item prop="contactAddress">
                <el-input
                  class="table-input"
                  size="mini"
                  placeholder="通讯地址"
                  v-model="Data.contactAddress"
                  @blur="handlerBlur('contactAddress')">
                </el-input>
              </el-form-item>
            </template>
            <span v-else>{{Data.contactProvince || ''}}{{Data.contactCity || ''}}{{Data.contactAddress || ''}}</span>
          </td>
        </tr>
        <tr>
          <td :class="{ needs:other.write}">婚姻情况</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="maritalState">
              <el-select
                placeholder="请选择婚姻状态"
                class="table-input"
                v-model="Data.maritalState"
                @change="handlerBlur('maritalState')">
                <el-option
                  v-for="(item, idx) in options.maritalState"
                  :key="idx"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.maritalState}}</span>
          </td>
          <td :class="{ needs:other.write}">学历</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="educationalBackground">
              <el-select
                placeholder="请选择"
                class="table-input"
                v-model="Data.educationalBackground"
                @change="handlerBlur('educationalBackground')">
                <el-option
                  v-for="(item, idx) in options.educationalBackground"
                  :key="idx"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.educationalBackground}}</span>
          </td>
          <td :class="{ needs:other.write}">职业</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="career">
              <el-select
                placeholder="请选择"
                class="table-input"
                v-model="Data.career"
                @change="handlerBlur('career')">
                <el-option
                  v-for="(item, idx) in options.career"
                  :key="idx"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.career}}</span>
          </td>
          <td :class="{ needs:other.write}">个人月收入</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="monthIncome">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请输入"
                v-model="Data.monthIncome"
                @blur="handlerBlur('monthIncome')">
                <template slot="prepend">&yen;</template>
              </el-input>
            </el-form-item>
            <span v-else>{{formatter.changeMoney(Data.monthIncome, 1, '￥')}}</span>
          </td>
        </tr>
        <tr>
          <td :class="{ needs:other.write}">单位名称</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="organization">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请输入"
                v-model="Data.organization"
                @blur="handlerBlur('organization')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.organization}}</span>
          </td>
          <td :class="{ needs:other.write}">单位所属行业</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="organizationDomain">
              <el-select
                placeholder="请选择"
                class="table-input"
                v-model="Data.organizationDomain"
                @change="handlerBlur('organizationDomain')">
                <el-option
                  v-for="(item, idx) in options.organizationDomain"
                  :key="idx"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.organizationDomain}}</span>
          </td>
          <td :class="{ needs:other.write}">单位地址</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="organizationAddress">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请输入"
                v-model="Data.organizationAddress"
                @blur="handlerBlur('organizationAddress')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.organizationAddress}}</span>
          </td>
          <td :class="{ needs:other.write}">单位邮政编码</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="organizationPostalCode">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请输入"
                v-model="Data.organizationPostalCode"
                @blur="handlerBlur('organizationPostalCode')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.organizationPostalCode}}</span>
          </td>
        </tr>
        <tr>
          <td :class="{ needs:other.write}">本单位工作起始年份</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="enterOrganizationYear">
              <el-date-picker
                class="table-input"
                v-model="enterOrganizationYear"
                align="right"
                size="mini"
                type="year"
                format="yyyy"
                placeholder="选择起始年份"
                @change="handlerBlur('enterOrganizationYear')">
              </el-date-picker>
            </el-form-item>
            <span v-else>{{Data.enterOrganizationYear}}</span>
          </td>
          <td :class="{ needs:other.write}">本人职务</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="positionInOrganization">
              <el-select
                placeholder="请选择"
                class="table-input"
                v-model="Data.positionInOrganization"
                @change="handlerBlur('positionInOrganization')">
                <el-option
                  v-for="(item, idx) in options.positionInOrganization"
                  :key="idx"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.positionInOrganization}}</span>
          </td>
          <td :class="{ needs:other.write}">本人职称</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="professionalTitle">
              <el-select
                placeholder="请选择"
                class="table-input"
                v-model="Data.professionalTitle"
                @change="handlerBlur('professionalTitle')">
                <el-option
                  v-for="(item, idx) in options.professionalTitle"
                  :key="idx"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.professionalTitle}}</span>
          </td>
          <td :class="{ needs:other.write}">户籍地址</td>
          <td class="input">
            <template v-if="other.write">
              <el-form-item prop="family">
                <el-cascader
                  class="table-input"
                  placeholder="省/自治区/直辖市"
                  :options="city"
                  :props="cascaderProps"
                  v-model="family"
                  @active-item-change="handleItemChange"
                  @change="handlerAddress('family')">
                </el-cascader>
              </el-form-item>
              <el-form-item prop="familyAddress">
                <el-input
                  class="table-input"
                  size="mini"
                  placeholder="详细地址"
                  v-model="Data.familyAddress"
                  @blur="handlerBlur('familyAddress')">
                </el-input>
              </el-form-item>
            </template>
            <span v-else>{{Data.familyProvince || ''}}{{Data.familyCity || ''}}{{Data.familyAddress || ''}}</span>
          </td>
        </tr>
        <tr>
          <td>家庭住址</td>
          <td class="input">
            <template v-if="other.write">
              <el-form-item>
                  <el-cascader
                    class="table-input"
                    style="width: 100%;"
                    placeholder="省/自治区/直辖市"
                    :options="city"
                    :props="cascaderProps"
                    v-model="home"
                    @active-item-change="handleItemChange"
                    @change="handlerAddress('home')">
                  </el-cascader>
                </el-form-item>
              <el-form-item>
                <el-input
                  class="table-input"
                  size="mini"
                  placeholder="详细地址"
                  v-model="Data.homeAddress"
                  @blur="handlerBlur('homeAddress')">
                </el-input>
              </el-form-item>
            </template>
            <span v-else>{{Data.homeProvince || ''}}{{Data.homeCity || ''}}{{Data.homeAddress || ''}}</span>
          </td>
          <td>家庭邮编</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="homePostalCode">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请输入"
                v-model="Data.homePostalCode"
                @blur="handlerBlur('homePostalCode')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.homePostalCode}}</span>
          </td>
          <td>住宅电话</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="homePhone">
              <el-input
                class="table-input"
                size="mini"
                placeholder="请输入"
                v-model="Data.homePhone"
                @blur="handlerBlur('homePhone')">
              </el-input>
            </el-form-item>
            <span v-else>{{Data.homePhone}}</span>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </el-form-item>
  </el-form>
</template>
<script>
import { formatter, valiData } from '@/util/utils'
import {
  getDict,
  getSubLocation
} from '@/service/getData'
export default {
  name: 'mainBorrowerTable',
  props: ['data', 'other'],
  data () {
    return {
      enterOrganizationYear: '',
      show: false,
      address: ['contact', 'family', 'home'], // 初始化地址
      contact: [], // 通讯地址数据
      family: [], // 户籍地址数据
      home: [], // 家庭地址数据
      city: [], // 城市级联数据
      selects: [ // 下拉菜单
        'LenderType', // 借款人类型
        'OpenCity',   // 城市
        'maritalState', // 婚姻情况
        'educationalBackground', // 学历
        'career', // 职业
        'organizationDomain', // 单位所属行业
        'positionInOrganization', // 本人职务
        'professionalTitle' // 本人职称
      ],
      canEmptyKey: ['homeAddress', 'homePostalCode', 'homePhone'],
      options: {}, // 下拉菜单选项
      cascaderProps: { // 城市级联配置
        value: 'locationId',
        label: 'name'
      },
      Data: this.data, // 内部继承数据
      rules: {  // 表单验证
        contactNo: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: valiData.homePhoneNumber, trigger: 'blur' }
        ],
        postalCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { validator: valiData.postNumber, trigger: 'blur' }
        ],
        contact: [
          { type: 'array', required: true, message: '请选择地区', trigger: 'change' }
        ],
        contactAddress: [
          { required: true, message: '请填写通讯地址', trigger: 'blur' }
        ],
        maritalState: [
          { required: true, message: '请选择婚姻状况', trigger: 'change' }
        ],
        educationalBackground: [
          { required: true, message: '请选择学历背景', trigger: 'change' }
        ],
        career: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
        monthIncome: [
          { required: true, message: '请输入工资', trigger: 'blur' }
        ],
        organization: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        organizationDomain: [
          { required: true, message: '请选择单位所属行业', trigger: 'change' }
        ],
        organizationAddress: [
          { required: true, message: '请输入单位地址', trigger: 'blur' }
        ],
        organizationPostalCode: [
          { required: true, validator: valiData.postNumber, trigger: 'blur' }
        ],
        enterOrganizationYear: [
          { type: 'date', validator: valiData.getYear, trigger: 'change' }
        ],
        positionInOrganization: [
          { required: true, message: '请选择职务', trigger: 'change' }
        ],
        professionalTitle: [
          { required: true, message: '请选择职称', trigger: 'change' }
        ],
        familyAddress: [
          { required: true, message: '请输入户籍详细地址', trigger: 'blur' }
        ],
        family: [
          { type: 'array', required: true, message: '请选择户籍地址', trigger: 'change' }
        ],
        // home: [
        //   { type: 'array', required: true, message: '请选择家庭住址', trigger: 'blur' }
        // ],
        // homeAddress: [
        //   { message: '请输入详细住址', trigger: 'blur' }
        // ],
        // homePostalCode: [
        //   { validator: valiData.postNumber, trigger: 'blur' }
        // ],
        // homePhone: [
        //   { validator: valiData.homePhoneNumber, trigger: 'blur' }
        // ],
        type: [
          { required: true, message: '请选择借款人类型', trigger: 'change' }
        ]
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
        // TODO: 错误处理
      })
    // TODO: 异常处理

    this.getCity()
  },
  methods: {
    handlerBlur (key) {
      let value = this.Data[key]
      if (!value && key !== 'enterOrganizationYear') {
        if (this.canEmptyKey.includes(key)) {
          value = ' '
        } else {
          return
        }
      }

      if (key === 'monthIncome') {
        if (parseInt(value) === 0) {
          return this.error('担保金额不能为0')
        }
      }

      if (key === 'enterOrganizationYear') {
        if (this.enterOrganizationYear) {
          value = this.Data.enterOrganizationYear = new Date(this.enterOrganizationYear).getFullYear()
        } else {
          value = this.Data.enterOrganizationYear = ''
        }
      }

      this.Data[key] = value
      const entity = {
        fieldKey: key,
        arraysValue: this.Data[key] + ','
      }
      this.$emit('on-save', 'lender', entity)
    },
    handlerAddress (key) {
      this.Data[key] = this[key]
      let name = []
      this.getCityName(this.city, this[key], name)
      name.map((item, idx) => {
        const entity = {
          fieldKey: idx === 0 ? `${key}Province` : `${key}City`,
          arraysValue: item
        }
        setTimeout(() => {
          this.$emit('on-save', 'lender', entity)
        }, 1000 * idx)
      })
    },
    handleItemChange (val) {
      const city = this.getUpdateCity(this.city, val)
      if (!city.children.length) {
        this.getCity(city, val[val.length - 1])
      }
    },
    getCity (city, id = 86) {
      return getSubLocation(id)
        .then(resp => {
          if (resp.success) {
            resp.data.map(item => {
              if (item.level === 2) { // 加载最后一级的城市
                city.children.push(item)
              } else {
                item['children'] = []
                if (id === 86) {  // 初次加载所有1级城市
                  this.city.push(item)
                } else {
                  city.children.push(item)
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
            if (!item.children.length) {
              this.getCity(item, item.locationId)
                .then(() => {
                  return this.getCityName(item.children, arr, list, match, key)
                })
            } else {
              return this.getCityName(item.children, arr, list, match, key)
            }
          }
        }
      }
    },
    getUpdateCity (city, array) {
      let arr = array.concat()
      for (let item of city) {
        if (item.locationId === arr[0]) {
          if (arr.length === 1) {
            return item
          } else {
            arr.shift()
            return this.getUpdateCity(item.children, arr)
          }
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
      this.enterOrganizationYear = ''
      this.address.map(item => { // 初始化地址数据结构
        let arr = [value[`${item}Province`], value[`${item}City`]]
        this.getCityName(this.city, arr, this[item], 'name', 'locationId')
        this.Data[item] = this[item]
      })
      if (this.other.write) {
        if (value.enterOrganizationYear) {
          this.enterOrganizationYear = new Date(value.enterOrganizationYear, 1, 1)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
