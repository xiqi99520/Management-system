<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">客户详情</div></el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" class="allian-btn-default" @click="handleBack()">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
      <div class="view-item">
        <div class="view-item-title">
          基本信息
        </div>
        <div class="view-item-body">
          <el-form label-position="top" :inline="true" class="form-static">
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="客户姓名" class="form-item">
                  <el-input placeholder="窦唯" v-model="realName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="手机号码" class="form-item">
                  <el-input placeholder="1589845454" v-model="telNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="身份证号" class="form-item">
                  <el-input placeholder="4100004111011111" v-model="IDCardNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="性别" class="form-item">
                  <el-input placeholder="男" v-model="sex" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="婚姻情况" class="form-item">
                  <el-input placeholder="离异" v-model="maritalStatus" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="配偶" class="form-item">
                  <el-input placeholder="李小晓" v-model="spouse" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="注册时间" class="form-item">
                  <el-input placeholder="2017/09/08 10:00" v-model="regTime" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
              <el-form-item label="最后登录时间" class="form-item">
                <el-input placeholder="2017/11/28 15:25" v-model="updateTime" :disabled="true"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="view-item">
        <div class="view-item-title">
          贷款信息
        </div>
        <div class="view-item-body">
          <el-form label-position="top" :inline="true" class="form-static">
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="贷款额（万元）" class="form-item">
                  <el-input placeholder="2000" v-model="loanMoney" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="贷款期限" class="form-item">
                  <el-input placeholder="24个月" v-model="loanDeadline" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="贷款申请时间" class="form-item">
                  <el-input placeholder="2017/10/20 12:30" v-model="applyTime" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="贷款状态" class="form-item">
                  <el-input placeholder="审批中" v-model="loanStatus" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="是否曾申请贷款" class="form-item">
                  <el-input placeholder="是" v-model="isFirstApply" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="申请次数" class="form-item">
                  <el-input placeholder="2" v-model="applyTimes" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="上次申请贷款额（万元）" class="form-item">
                  <el-input placeholder="2000" v-model="lastApplyMoney" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
              <el-form-item label="上次申请期限" class="form-item">
                <el-input placeholder="36个月" v-model="lastApplyDeadline" :disabled="true"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row  type="flex" class="row-bg" justify="space-between">
              <el-col :span="11">
                <el-form-item label="上次申请失败原因" class="form-item">
                  <el-input placeholder="风控审批拒贷：房产存在瑕疵" v-model="lastApplyFailedReason" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
              <el-form-item label="配偶是否申请" class="form-item">
                <el-input placeholder="否" v-model="isHasApplySpouse" :disabled="true"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data () {
      return {
        data: []
      }
    },
    methods: {
      handleView (row) {
        console.log(row.id)
        return this.$router.push({path: '/appSys/customerMgt/view', query: {id: row.id}})
      },
      handleOff (row) {
       // let id = row.id
        let userStatus = row.userStatus
        let msgInfo = ''
        if (userStatus === '激活') {
          row.userStatus = '禁用'
          msgInfo = '激活成功！'
        } else {
          row.userStatus = '激活'
          msgInfo = '禁用成功！'
        }
        this.$message({
          type: 'success',
          message: msgInfo
        })
      },
      handleDel (row) {
        // let id = row.id;
        this.$confirm('删除后不可恢复！确认删除该客户经理?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleBack () {
        window.history.go(-1)
      },
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
<style lang="less" scoped>
@import "~@/style/color";
.el-header {
  text-align: left;
  line-height: 20px;
  height: 20px !important;
  .title {
    margin: 5px;
    text-indent: 10px;
    border-left: 5px solid @blue;
    font-size: 20px;
    vertical-align: middle
  }
  .allian-btn-default {
    line-height:20px;
    padding:5px 20px;
  }
}
.view-container {
  margin-top:20px;
  padding-top:30px;
  border-top:1px solid @blue;
}
.view-item {
  .view-item-title {
    line-height: 30px;
    text-align: left;
    font-weight: 500;
    font-size:16px;
    color: @blue;
  }
}
.form-static {
  text-align: left;
}
.form-item {
  width: 100%;
  min-width: 300px;
  margin-right: 20px;
  text-align: left;
}
</style>
