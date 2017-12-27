<template>
  <el-container>
     <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">客户列表</div></el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" class="allian-btn-default" @click="handleBack()">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
      <!-- 表格筛选 -->
      <el-form :inline="true" :model="filterData" class="form">
        <el-form-item>
          <el-input v-model="filterData.user" placeholder="客户姓名/手机号"></el-input>
        </el-form-item>
        <el-form-item label="贷款状态">
          <el-select v-model="filterData.loanStatus" placeholder="所有">
            <el-option label="申请中" value="0"></el-option>
            <el-option label="未通过" value="1"></el-option>
            <el-option label="已放款" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="filterData.userStatus" placeholder="所有">
            <el-option label="激活" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="daterange" align="right"
            unlink-panels v-model="filterData.dateRange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2010-10-01">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%" @cell-click="handleView">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="telnum"
          label="手机号码"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="manager"
          label="客户经理"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="loanMoney"
          label="贷款额（万元）"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="loanStatus"
          label="部门"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userStatus"
          label="用户状态"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后更新时间"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="pwdStatus"
          label="密码激活状态"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleOff(scope.row)" type="text" size="small">{{scope.row.userStatus}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper" :total="1000"
        class="pagination">
      </el-pagination>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data () {
      return {
        filterData: {
          user: '',
          loanStatus: '',
          userStatus: '',
          area: ''
        },
        data: [ ],
        tableData: [{
          id: '000001',
          loanStatus: '渠道部',
          pwdStatus: '未激活',
          telnum: '134xxxx7123',
          realName: '刘宝',
          loanMoney: '120',
          manager: '王晓',
          sex: '男',
          createTime: '2017/10/12 10:00',
          userStatus: '激活',
          email: 'liubao@hanglian.com',
          updateTime: '2017/10/12 11:00'
        }, {
          id: '000002',
          loanStatus: '渠道部',
          pwdStatus: '未激活',
          telnum: '134xxxx7123',
          realName: '刘宝',
          loanMoney: '120',
          manager: '王晓',
          sex: '男',
          createTime: '2017/10/12 10:00',
          userStatus: '激活',
          email: 'liubao@hanglian.com',
          updateTime: '2017/10/12 11:00'
        }, {
          id: '000003',
          loanStatus: '渠道部',
          pwdStatus: '未激活',
          telnum: '134xxxx7123',
          realName: '刘宝',
          loanMoney: '120',
          manager: '王晓',
          sex: '男',
          createTime: '2017/10/12 10:00',
          userStatus: '激活',
          email: 'liubao@hanglian.com',
          updateTime: '2017/10/12 11:00'
        }, {
          id: '000004',
          loanStatus: '渠道部',
          pwdStatus: '未激活',
          telnum: '134xxxx7123',
          realName: '刘宝',
          loanMoney: '120',
          manager: '王晓',
          sex: '男',
          createTime: '2017/10/12 10:00',
          userStatus: '激活',
          email: 'liubao@hanglian.com',
          updateTime: '2017/10/12 11:00'
        }, {
          id: '000005',
          loanStatus: '渠道部',
          pwdStatus: '未激活',
          telnum: '134xxxx7123',
          realName: '刘宝',
          loanMoney: '120',
          manager: '王晓',
          sex: '男',
          createTime: '2017/10/12 10:00',
          userStatus: '激活',
          email: 'liubao@hanglian.com',
          updateTime: '2017/10/12 11:00'
        }]
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
.el-header {
  text-align: left;
  line-height: 20px;
  height: 20px !important;
  .title {
    margin: 5px;
    text-indent: 10px;
    border-left: 5px solid $blue;
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
  border-top:1px solid $blue;
}

.view-filterData{
  text-align: left;
  .input-select {
    width: 100px;
  }
}
.pagination {
  padding:15px 0;
}
</style>
