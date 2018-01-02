<template>
  <el-container class="detail-full-screnn">
    <el-header>专户、待拨户非业务流水入账确认</el-header>
    <el-main>
      <el-form
        label-position="right"
        label-width="100px"
        ref="form"
        :model="form"
        :rules="rules">
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="流水金额" prop="money">
              <el-input v-model="form.money" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="实际流水时间" prop="dateTime">
              <el-date-picker
                v-model="dateTime"
                type="datetime"
                placeholder="选择实际流水日期时间"
                align="right"
                :picker-options="pickerOptions"
                @change="formatter.dateTimeChange(dateTime, form, 'busiDate')">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="资金项目名称" prop="fundsProjectName">
              <el-select style="width: 100%;" v-model="form.fundsProjectName" placeholder="请选择项目名称">
                <el-option
                  v-for="(option, index) in options.fundsProjectName"
                  :key="index"
                  :label="option.value"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="流水方向" prop="busiDirection">
              <el-select style="width: 100%;" v-model="form.busiDirection" placeholder="请选择流水方向">
                <el-option
                  v-for="(option, index) in options.busiDirection"
                  :key="index"
                  :label="option.value"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="账户类型" prop="acctType">
              <el-select style="width: 100%;" v-model="form.acctType" placeholder="请选择账户类型">
                <el-option
                  v-for="(option, index) in options.acctType"
                  :key="index"
                  :label="option.value"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="账户号" prop="acctNo">
              <el-input readonly v-model="form.acctNo"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="流水科目" prop="busiSubject">
              <el-select style="width: 100%;" v-model="form.busiSubject" placeholder="请选择流水科目">
                <el-option
                  v-for="(option, index) in options.busiSubject"
                  :key="index"
                  :label="option.value"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="账户开户行" prop="acctBank">
              <el-input readonly v-model="form.acctBank"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="流水号" prop="outBusiCode">
              <el-input
                clearable
                placeholder="请输入流水号"
                v-model="form.outBusiCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="往来资金账户类型" prop="outAcctType">
              <el-select style="width: 100%;" v-model="form.outAcctType" placeholder="请选择往来资金账户类型">
                <el-option
                  v-for="(option, index) in options.outAcctType"
                  :key="index"
                  :label="option.value"
                  :value="option.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="往来资金账户名称" prop="outAcctName">
              <el-input
                clearable
                placeholder="请输入往来资金账户名称"
                v-model="form.outAcctName">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="往来资金账户号" prop="outAcctNo">
              <el-input
                clearable
                placeholder="请输入往来资金账户号"
                v-model="form.outAcctNo"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="流水备注" prop="remark">
          <el-input
            clearable
            placeholder="请输入流水备注"
            :maxlength="50"
            v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary" @click="handleSubmit">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import {
  pickerOptions,
  initSelectOptions,
  formatter
} from '@/util/utils'
import { entryAcctNoBusiness } from '@/service/getData'
export default {
  name: 'nonBusinessRecordsConfirm',
  data () {
    return {
      dateTime: null,
      selets: ['fundsProjectName', 'busiDirection', 'acctType', 'busiSubject', 'outAcctType'],
      options: {},
      form: {
        money: '',
        busiDate: '',
        fundsProjectName: '',
        busiDirection: '',
        acctType: '',
        acctNo: '',
        busiSubject: '',
        acctBank: '',
        outBusiCode: '',
        outAcctType: '',
        outAcctName: '',
        outAcctNo: '',
        remark: ''
      },
      rules: {
        money: [
          { require: true, message: '请输入流水金额', trigger: 'blur' }
        ],
        busiDate: [
          { require: true, message: '请选择实际流水时间', trigger: 'change' }
        ],
        fundsProjectName: [
          { require: true, message: '请选择项目名称', trigger: 'change' }
        ],
        busiDirection: [
          { require: true, message: '请选择流水方向', trigger: 'change' }
        ],
        acctType: [
          { require: true, message: '请选择账户类型', trigger: 'change' }
        ],
        acctNo: [
          { require: true, message: '请输入账户号', trigger: 'change' }
        ],
        busiSubject: [
          { require: true, message: '请选择流水科目', trigger: 'change' }
        ],
        acctBank: [
          { require: true, message: '请选择账户开户行', trigger: 'change' }
        ],
        outBusiCode: [
          { require: true, message: '请输入流水号', trigger: 'blur' }
        ],
        outAcctType: [
          { require: true, message: '请选择往来资金账户类型', trigger: 'change' }
        ],
        outAcctName: [
          { require: true, message: '请输入往来资金账户名称', trigger: 'blur' }
        ],
        outAcctNo: [
          { require: true, message: '请输入往来资金账户号', trigger: 'blur' }
        ],
        remark: [
          { require: true, message: '请输入流水备注', trigger: 'blur' }
        ]
      },
      pickerOptions: pickerOptions,
      formatter: formatter
    }
  },
  created () {
    initSelectOptions(this.selets, this.options, true)
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate(success => {
        if (success) {
          entryAcctNoBusiness(this.form)
            .then(resp => {
              if (resp.success) {
                this.$emit('on-close', true)
              }
            })
            // TODO: 错误处理
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/public";
</style>
