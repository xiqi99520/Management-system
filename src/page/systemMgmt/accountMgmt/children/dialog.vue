<template>
  <!-- 账户信息 -->
  <el-dialog
    :title="title"
    :visible.sync="Show"
    @close="Close"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
    width="40%">
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      label-position="right"
      label-width="148px"
      ref="form">
      <!-- 账户编号 -->
      <el-form-item label="账户编号" prop="phoneNo">
        <el-input
          placeholder="请输入账户编号"
          type="text"
          auto-complete="off"
          :maxlength="11"
          v-model="form.phoneNo"
          :readonly="update">
        </el-input>
      </el-form-item>
      <!-- 账户号 -->
      <el-form-item label="账户号" prop="operateNo">
        <el-input
          placeholder="请输入账户号"
          type="text"
          auto-complete="off"
          v-model="form.operateNo">
        </el-input>
      </el-form-item>
      <!-- 账户所属资金项目 -->
      <el-form-item label="账户所属资金项目" prop="areaName">
        <el-select v-model="form.areaName" filterable placeholder="资金项目" style="width:100%;" @change="bankSearch">
          <!--<el-option label="所有地区" value=""></el-option>-->
          <el-option v-for="(option, index) in cityData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <!-- 账户所属资金项目 -->
      <el-form-item label="账户所属资金项目" prop="areaName">
        <el-select v-model="form.areaName" filterable placeholder="资金项目" style="width:100%;" @change="bankSearch">
          <!--<el-option label="所有地区" value=""></el-option>-->
          <el-option v-for="(option, index) in cityData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <!-- 账户类型 -->
      <el-form-item label="账户类型" prop="areaName">
        <el-select v-model="form.areaName" filterable placeholder="账户类型" style="width:100%;" @change="bankSearch">
          <!--<el-option label="所有地区" value=""></el-option>-->
          <el-option v-for="(option, index) in cityData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <!-- 账户所有权归属主体 -->
      <el-form-item label="账户所有权归属主体" prop="areaName">
        <el-select v-model="form.areaName" filterable placeholder="资金项目" style="width:100%;" @change="bankSearch">
          <!--<el-option label="所有地区" value=""></el-option>-->
          <el-option v-for="(option, index) in cityData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <!-- 开具账户机构类型 -->
      <el-form-item label="开具账户机构类型" prop="areaName">
        <el-select v-model="form.areaName" filterable placeholder="机构类型" style="width:100%;" @change="bankSearch">
          <!--<el-option label="所有地区" value=""></el-option>-->
          <el-option v-for="(option, index) in cityData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <!-- 开具账户机构名称 -->
      <el-form-item label="开具账户机构名称" prop="areaName">
        <el-select v-model="form.areaName" filterable placeholder="机构名称" style="width:100%;" @change="bankSearch">
          <!--<el-option label="所有地区" value=""></el-option>-->
          <el-option v-for="(option, index) in cityData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <!-- 账户状态 -->
      <el-form-item label="账户状态" prop="state">
        <el-select v-model="form.state" style="width:100%;">
          <el-option label="启用" value="正常"></el-option>
          <el-option label="禁用" value="锁定"></el-option>
        </el-select>
      </el-form-item>
      <!-- 备注信息 -->
      <el-form-item label="备注信息" prop="phoneNo">
        <el-input
          placeholder="请输入备注信息"
          type="text"
          auto-complete="off"
          :maxlength="11"
          v-model="form.phoneNo">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Show = false">取 消</el-button>
      <el-button type="primary" @click="submitManagerForm('form')">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { valiData } from '../../../../util/utils'
import {
  doAddManager,
  getOrganizations,
  updateManager
} from '../../../../service/getData'
export default {
  name: 'user-dialog',
  props: ['title', 'show', 'managerData', 'orgData', 'cityData', ''],
  data () {
    return {
      netData: [],
      bankData: [],
      loading: false,                        // 客户经理对话框加载中
      Show: this.show,                       // 显示客户经理对话框
      update: this.title === '编辑客户经理',   // 当前为编辑客户经理
      form: {                                // 表单数据
        state: '',
        userId: '',
        branch: [],
        phoneNo: '',
        operateNo: '',
        username: '',
        orgName: '',
        organizationId: '',
        areaName: '',
        opencity: ['OpenCity']
      },
      rules: {                               // 客户经理数据有效性规则
        phoneNo: [
          { required: true, validator: valiData.phone, trigger: 'blur' }
        ],
        operateNo: [
          { required: true, validator: valiData.operateNo, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        orgName: [
          { type: 'number', required: true, message: '请选择支行', trigger: 'change' }
        ],
        organizationId: [
          { type: 'number', required: true, message: '请选择网点', trigger: 'change' }
        ],
        areaName: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitManagerForm (formName) {           // 表单条件检测、提交、错误处理
      //      this.form.branch.push(this.form.organizationId)
      //      for(let i = 0;i < this.roleData.length;i++){
      //        if(this.form.rolelist.includes(this.roleData[i].roleName)){
      //          this.form.role.push(this.roleData[i])
      //        }
      //      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let type, message, title
          this.loading = true
          if (this.update) {
            updateManager(this.form)
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
              .catch(err => {                   // 错误处理
                title = '失败'
                type = 'error'
                message = err.message
                console.log(err)
              })
              .then(() => {                     // 最后的用户通知
                if (type === 'success') {
                  this.showNewUser = false
                }
                this.loading = false
                this.$notify({
                  title,
                  message,
                  type
                })
                this.Close(true)
              })
          } else {                                // 新增用户信息表单
            doAddManager(this.form)
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
              .catch(err => {                   // 错误处理
                title = '失败'
                type = 'error'
                message = err.message
                console.log(err)
              })
              .then(() => {                     // 最后的用户通知
                if (type === 'success') {
                  this.showNewUser = false
                }
                this.loading = false
                this.$notify({
                  title,
                  message,
                  type
                })
                this.Close(true)
              })
          }
        }
      })
    },
    Close (refresh = false) {                // 用户信息模态框隐藏
      this.$emit('on-close', this.update, refresh)
      this.$refs['form'].clearValidate()
    },
    bankSearch () {
      return getOrganizations('支行', '', '', this.form.areaName)
        .then(resp => {
          if (resp.success) {
            this.bankData = resp.data
            this.form.orgName = ''
            this.form.organizationId = ''
          }
        })
    },
    netSearch () {
      return getOrganizations('网点', this.form.orgName, '', '')
        .then(resp => {
          if (resp.success) {
            this.netData = resp.data
            this.form.organizationId = ''
          }
        })
    }
  },
  watch: {
    show (value) {                           // 监控显示用户信息对话框
      this.Show = value
    },
    managerData (value) {                    // 初始化可编辑的用户信息
      this.form.phoneNo = value.phoneNo
      this.form.state = value.state
      this.form.areaName = value.city
      this.form.operateNo = value.operateNo
      this.form.username = value.username
      this.form.userId = value.userId
      this.bankSearch()
        .then(() => {
          this.bankData.map(bank => {
            if (bank.name === value.orgName) {
              this.form.orgName = bank.organizationId
            }
          })
        })
        .then(() => {
          this.netSearch()
            .then(() => {
              this.form.organizationId = value.orgId
            })
        })

      // this.form.orgName = value.orgName
      this.form.branch = value.orgId
      // this.orgData.map(item => {
      //   if (item.name === value.branch) {
      //     this.form.organizationId = String(item.organizationId)
      //   }
      // })
    }
  }
}
</script>
