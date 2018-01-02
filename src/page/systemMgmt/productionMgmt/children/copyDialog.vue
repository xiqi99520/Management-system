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
        label-width="80px"
        ref="form">
        <!-- 账户编号 -->
        <el-form-item label="产品编号" prop="phoneNo">
          <el-input
            placeholder="请输入产品编号"
            type="text"
            auto-complete="off"
            :maxlength="11"
            v-model="form.phoneNo"
            :readonly="update">
          </el-input>
        </el-form-item>
        <!-- 账户号 -->
        <el-form-item label="产品名称">
          <el-col :span="11">
            <el-input v-model="form.phoneNo"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.phoneNo"></el-input>
          </el-col>
        </el-form-item>
        <!--最高可减免比例-->
        <el-form-item label="产品描述" prop="operateNo">
          <el-input
            placeholder="请输入描述"
            type="textarea"
            auto-complete="off"
            v-model="form.operateNo">
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
import { mapState } from 'vuex'
import { valiData } from '@/util/utils'
import {
  doAddManager,
  getOrganizations,
  updateManager
} from '@/service/getData'
export default {
  name: 'copyproductionDialog',
  props: ['title', 'show', 'managerData', 'orgData', 'cityData', ''],
  computed: {
    ...mapState(['production'])
  },
  data () {
    return {
      netData: [],
      bankData: [],
      loading: false,                        // 客户经理对话框加载中
      Show: this.show,                       // 显示客户经理对话框
      update: this.title === '编辑还款科目',   // 当前为编辑还款科目
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
    }
  },
  watch: {
    show (value) {                           // 监控显示用户信息对话框
      this.Show = value
    }
  }
}
</script>
<style lang="less">
  .name-input{
    .el-input__inner{
      display: inline-block; padding: 0
    }
  }

</style>
