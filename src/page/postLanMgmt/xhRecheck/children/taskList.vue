<template>
  <el-container>
     <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">下户资料复核</div></el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" class="allian-btn-default" @click="handleBack()">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
      <!-- 表格筛选 -->
      <el-form :inline="true" :model="filterData" class="form" size="mini">
        <el-row type="flex" justify="space-between">
          <el-col align="left">
            <el-form-item>
              <el-input v-model="filterData.user" placeholder="申请人姓名/手机号/申请编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="filterData.riskManager" placeholder="下户专员">
                <el-option label="全部" value="0"></el-option>
                <el-option label="小马" value="1"></el-option>
                <el-option label="小甜甜" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="filterData.area" placeholder="全部/朝阳区/...">
                <el-option label="全部" value="0"></el-option>
                <el-option label="朝阳区" value="1"></el-option>
                <el-option label="东城区" value="2"></el-option>
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
          </el-col>
          <el-col :span="2" align="right">
            <el-form-item>
              <el-button type="primary">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%" size="mini">
        <el-table-column
          fixed
          label="ID"
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="applyId"
          label="申请编号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="申请人"
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
          prop="submitTime"
          label="尽调提交时间"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="loanMoney"
          label="贷款额（万元）"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="loanDeadline"
          label="贷款期限"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="房屋地址"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="recheckTime"
          label="复核完成时间"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="burningTime"
          label="等待时间"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="riskManager"
          label="下户专员"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="customRecorded"
          label="客户补录"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper" :total="1000"
        class="pagination">
      </el-pagination>
      <el-row type="flex" justify="space-between" style="padding: 15px 0">
        <el-col :span="24" align="left">
          注释：
          <el-tag color="#EEE8AA">代表等待时间为30-60分钟的单</el-tag>
          <el-tag color="#f3715c">代表等待时间为60分钟以上的单</el-tag>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data () {
      return {
        currentRow: '',
        filterData: {
          user: '',
          riskManager: '',
          burningTime: '',
          area: ''
        },
        taskForm: {
          riskManager: ''
        },
        data: [ ],
        tableData: [{
          applyId: 'FC0001',
          realName: '刘宝',
          sex: '男',
          telnum: '134xxxx7123',
          submitTime: '2017/10/12 10:00',
          loanMoney: '120',
          loanDeadline: '12个月',
          address: '朝阳区肖云路66号霞光里8栋803',
          recheckTime: '2017/10/12 11:00',
          burningTime: '1小时0分钟',
          customRecorded: '是',
          riskManager: '小刘'
        }, {
          applyId: 'FC0001',
          realName: '刘宝',
          sex: '男',
          telnum: '134xxxx7123',
          submitTime: '2017/10/12 10:00',
          loanMoney: '120',
          loanDeadline: '12个月',
          address: '朝阳区肖云路66号霞光里8栋803',
          recheckTime: '2017/10/12 11:00',
          burningTime: '1小时0分钟',
          customRecorded: '是',
          riskManager: '小刘'
        }]
      }
    },
    methods: {
      handleView (row) {
        let $id = row.applyId
        return this.$router.push({path: '/loanSys/xhRecheck/view', query: {id: $id}})
      },
      handleSelect (row) {
        this.taskSelectVisible = true
        this.currentRow = row
        // this.$message({
        //   type: 'success',
        //   message: row.riskManager
        // })
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

.view-filterData{
  text-align: left;
  .input-select {
    width: 100px;
  }
}
.pagination {
  padding:15px 0;
}
.el-tag {
  color:#666
}
</style>
