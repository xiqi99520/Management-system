<template>
  <el-form class="detailForm" ref="form">
    <el-form-item>
      <h3 class="detailForm-title">
        <span>共同借款人基本信息</span>
        <el-button v-if="other.write" :disabled="btnDisabled" size="mini" type="primary" style="float: right;" @click="handleNewUser">添加</el-button>
      </h3>
    </el-form-item>
    <el-form-item class="detailForm-item" v-for="(item, idx) in Data" :key="idx">
      <el-form ref="form" :model="item" :rules="rules">
        <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': !show}">
          <el-col :span="12">共同借款人信息{{idx + 1}}</el-col>
          <el-col :span="12">
            <el-button type="text" v-if="other.write" @click="handleRemoveUser(item.mainly, idx)">删除</el-button>
            <el-button type="text" @click="handleCollapse('show')">{{collapseText(show)}}</el-button>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="show">
            <table class="" cellspacing="0" cellpadding="10">
              <tr>
                <td :class="{ needs:other.write}">借款人姓名</td>
                <td>
                  <el-form-item v-if="other.write" prop="name">
                    <el-input
                      v-model="item.name"
                      class="table-input"
                      size="mini"
                      placeholder="请输入"
                      :maxlength="20"
                      @blur="handlerBlur('name', idx)">
                    </el-input>
                  </el-form-item>
                  <span v-else>{{item.name}}</span>
                </td>
                <td>证件类型</td>
                <td>身份证</td>
                <td :class="{ needs:other.write}">证件号码</td>
                <td>
                  <el-form-item v-if="other.write" prop="certificateNo">
                    <el-input
                      v-model="item.certificateNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入"
                      :maxlength="18"
                      @blur="handlerBlur('certificateNo', idx)">
                    </el-input>
                  </el-form-item>
                  <span v-else>{{item.certificateNo}}</span>
                </td>
                <td :class="{ needs:other.write}">联系电话</td>
                <td>
                  <el-form-item v-if="other.write" prop="contactNo">
                    <el-input
                      v-model="item.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入"
                      :maxlength="20"
                      @blur="handlerBlur('contactNo', idx)">
                    </el-input>
                  </el-form-item>
                  <span v-else>{{item.contactNo}}</span>
                </td>
              </tr>
              <tr>
                <td :class="{ needs:other.write}">工作单位</td>
                <td>
                  <el-form-item v-if="other.write" prop="organizationAddress">
                    <el-input
                      v-model="item.organizationAddress"
                      class="table-input"
                      size="mini"
                      placeholder="请输入"
                      :maxlength="50"
                      @blur="handlerBlur('organizationAddress', idx)">
                    </el-input>
                  </el-form-item>
                  <span v-else>{{item.organizationAddress}}</span>
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
      </el-form>
    </el-form-item>
  </el-form>
</template>
<script>
import {
  getDict,
  deleteLender
} from '@/service/getData'
import { valiData } from '@/util/utils'
export default {
  name: 'commonBorrowerTable',
  props: ['data', 'other'],
  data () {
    return {
      show: true,
      btnDisabled: false,
      selects: [ // 下拉菜单
        'certificateType' // 证件类型
      ],
      options: {}, // 下拉菜单选项
      Data: [],
      rules: {
        name: [
          { required: true, message: '请输入借款人姓名', trigger: 'blur' }
        ],
        certificateNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { validator: valiData.onlyString, trigger: 'blur' },
          { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' }
        ],
        contactNo: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        organizationAddress: [
          { required: true, message: '请输入工作单位', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    data (value) {
      this.Data = value
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
    handlerBlur (key, index) {
      let value
      const entity = {
        contractId: this.other.contractId,
        fieldKey: key,
        arraysValue: ',' + this.Data.map((item, idx) => {
          if (idx === index) {
            value = item[key]
            return value
          } else {
            return ''
          }
        }).join(',')
      }
      if (value) {
        if (this.Data.length === index + 1) {
          this.btnDisabled = false
        }
        this.$emit('on-save', 'lender', entity)
      }
    },
    handleNewUser () { // 新增共同借款人
      if (this.Data.length >= 10) {
        this.error('只允许添加十位共同借款人')
        return
      }
      this.Data.push({})
      this.btnDisabled = true
    },
    handleRemoveUser (mainly, idx) { // 删除共同借款人信息
      let type, message
      const title = '删除共同借款人基本信息'
      deleteLender(this.other.applyId, mainly)
        .then(resp => {
          if (resp.success) {
            type = 'success'
            this.Data.splice(idx, 1)
          } else {
            type = 'error'
          }
          message = resp.message
        })
        .catch(err => {                   // 错误处理
          type = 'error'
          message = err.message
          console.log(err)
        })
        .then(() => {                     // 最后的用户通知
          this.loading = false
          this.$notify({
            title,
            message,
            type
          })
        })
    },
    error (information) {
      this.$message.error(information)
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
