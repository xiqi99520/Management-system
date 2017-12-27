<template>
  <div>
    <!-- 用户信息 -->
    <el-dialog
      :title="title"
      :visible.sync="Show"
      @close="Close"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      width="46%">
      <div>
        <el-input placeholder="请输入需申请减免的借款编号/客户姓名" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <p>借款编号{{data.no}}</p>
        <p>客户姓名 {{data.customerName}} 手机号 {{data.phone}}</p>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        status-icon
        label-position="right"
        label-width="80px"
        ref="form">
        <el-form-item label="罚息" prop="phone">
          {{data}}
          <el-input
            placeholder="请输入申请减免的金额"
            type="text"
            auto-complete="off"
            v-model="form.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="借款服务费" prop="phone">
          {{data}}
          <el-input
            placeholder="请输入申请减免的金额"
            type="text"
            auto-complete="off"
            v-model="form.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="手续费" prop="phone">
          {{data}}
          <el-input
            placeholder="请输入申请减免的金额"
            type="text"
            auto-complete="off"
            v-model="form.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="利息" prop="phone">
          {{data}}
          <el-input
            placeholder="请输入申请减免的金额"
            type="text"
            auto-complete="off"
            v-model="form.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="本金" prop="phone">
          {{data}}
          <el-input
            placeholder="请输入申请减免的金额"
            type="text"
            auto-complete="off"
            v-model="form.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="phone">
          <el-input
            placeholder="请输入申请减免的金额"
            type="text"
            auto-complete="off"
            v-model="form.phone">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserInfoForm('form')">确认提交</el-button>
        <el-button @click="Show = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog
      title="确认重置密码?"
      :visible.sync="showReset"
      v-loading="resetLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      width="30%">
      <span>密码将重置为默认密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReset = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { valiData } from '../../../../util/utils'
// import {
//   doNewUser,
//   doUpdateUser,
//   doRsetUserPwd
// } from '../../../../service/getData'
export default {
  name: 'addDialog',
  props: ['title', 'show', 'userData', 'roles'],
  data () {
    return {
      loading: false,                        // 用户信息对话框加载中
      Show: this.show,                       // 显示用户信息对话框
      showReset: false                      // 显示重置密码对话框
    }
  }
}
</script>

<style lang="less" scoped>
.userdialog {
  margin-top: 8px;
  text-align: left;
}

.userdialog-form {
  .el-input__inner {
    color: #a7a7a7;
  }
  .title-align {
    text-align: left;
  }
}

.user-tag {
  margin-right: 10px;
}
</style>
