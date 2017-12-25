<template>
  <!-- 用户信息 -->
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
      label-width="110px"
      ref="form">
      <!-- 手机号 -->
      <el-form-item label="手机号码" prop="">
        <el-input
          placeholder="请输入手机号"
          type="text"
          auto-complete="off"
          :maxlength="11"
          v-model="form.phoneNo"
          :readonly="update">
        </el-input>
      </el-form-item>
      <!-- 工行营销代码 -->
      <el-form-item label="工行营销代码" prop="operateNo">
        <el-input
          placeholder="请输入工行营销代码"
          type="text"
          auto-complete="off"
          v-model="form.operateNo">
        </el-input>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item label="姓名" prop="username">
        <el-input
          placeholder="请输入用户名"
          type="text"
          auto-complete="off"
          v-model="form.username">
        </el-input>
      </el-form-item>
      <!-- 地区 -->
      <el-form-item label="所属地区" prop="area">
        <el-select v-model="form.areaName" filterable placeholder="地区名称" style="width:100%;" @change="bankSearch">
          <!--<el-option label="所有地区" value=""></el-option>-->
          <el-option v-for="(option, index) in cityData" :key="index" :label="option" :value="option"></el-option>
        </el-select>
      </el-form-item>
      <!-- 支行 -->
      <el-form-item label="支行" prop="orgNam">
        <el-select v-model="form.orgName" filterable placeholder="请选择支行" style="width:100%;" @change="netSearch">
          <el-option
            v-for="(option, index) in bankData"
            v-if="option.type === '支行'"
            :key="index"
            :label="option.name"
            :value="option.organizationId">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 网点 -->
      <el-form-item label="网点" prop="organizationI">
        <el-select v-model="form.organizationId" filterable placeholder="请选择网点" style="width:100%;">
          <el-option
            v-for="(option, index) in netData"
            v-if="option.type === '网点'"
            :key="index"
            :label="option.name"
            :value="String(option.organizationId)">
          </el-option>
        </el-select>
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
        phone: [
          { required: true, validator: valiData.phone, trigger: 'blur' }
        ],
        operateNo: [
          { required: true, validator: valiData.operateNo, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请选择支行', trigger: 'click' }
        ],
        organizationId: [
          { required: true, message: '请选择网点', trigger: 'blur' }
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
      this.$refs['form'].resetFields()
    },
    bankSearch () {
      getOrganizations('支行', '', '', this.form.areaName)
        .then(resp => {
          if (resp.success) {
            this.bankData = resp.data
          }
        })
    },
    netSearch () {
      getOrganizations('网点', this.form.orgName, '', '')
        .then(resp => {
          if (resp.success) {
            this.netData = resp.data
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
      this.form.organizationId = value.branch
      this.form.operateNo = value.operateNo
      this.form.username = value.username
      this.form.orgName = value.orgName
      this.form.areaName = value.city
      this.form.userId = value.userId
      this.form.branch = value.orgId
      this.orgData.map(item => {
        //        if (item.name === value.branch) {
        //          this.form.organizationId = String(item.organizationId)
        //        }
      })
    }
  }
}
</script>
