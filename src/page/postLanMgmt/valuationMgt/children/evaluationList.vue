<template>
  <el-container>
     <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">房产价值评估</div></el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" class="allian-btn-default" @click="handleBack()">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
      <!-- 表格筛选 -->
      <el-form :inline="true" :model="filterData" class="form">
        <el-form-item>
          <el-input v-model="filterData.user" placeholder="申请人姓名/手机号/申请编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filterData.riskManager" placeholder="风控专员">
            <el-option label="小刘" value="0"></el-option>
            <el-option label="老张" value="1"></el-option>
            <el-option label="大梁" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filterData.burningTime" placeholder="等待时长">
            <el-option label="30分钟" value="0"></el-option>
            <el-option label="1小时" value="1"></el-option>
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
      <el-table :data="tableData" stripe border style="width: 100%">
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
          prop="submitTime"
          label="提交时间"
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
          prop="manager"
          label="客户经理"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="recommendations"
          label="推荐意见"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dealTime"
          label="处理时间"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="burningTime"
          label="用户状态"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="riskManager"
          label="评房专员"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleSelect(scope.row)" type="text" size="small">{{scope.row.riskManager}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看 | 操作</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper" :total="1000"
        class="pagination">
      </el-pagination>
    </el-main>
    <!-- 修改评房专员弹窗-->
    <el-dialog title="任务分配" :visible.sync="taskSelectVisible">
      <el-form :model="taskForm">
        <el-form-item label="请选择负责人" label-width="300px">
          <el-select v-model="taskForm.riskManager" placeholder="评房专员">
            <el-option label="小刘" value="0"></el-option>
            <el-option label="大张" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="taskSelectVisible = false">取 消</el-button>
        <el-button type="primary" @click="taskSelectVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
  export default {
    data () {
      return {
        taskSelectVisible: false,
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
          loanDeadline: '2017/10/12',
          manager: '王晓',
          recommendations: '推荐',
          dealTime: '2017/10/12 11:00',
          burningTime: '1小时0分钟',
          riskManager: '渠道部'
        }, {
          applyId: 'FC0002',
          realName: '刘宝',
          sex: '男',
          telnum: '134xxxx7123',
          submitTime: '2017/10/12 10:00',
          loanMoney: '120',
          loanDeadline: '2017/10/12',
          manager: '王晓',
          recommendations: '推荐',
          dealTime: '2017/10/12 11:00',
          burningTime: '1小时0分钟',
          riskManager: '风控部'
        }, {
          applyId: 'FC0003',
          realName: '刘宝',
          sex: '男',
          telnum: '134xxxx7123',
          submitTime: '2017/10/12 10:00',
          loanMoney: '120',
          loanDeadline: '2017/10/12',
          manager: '王晓',
          recommendations: '推荐',
          dealTime: '2017/10/12 11:00',
          burningTime: '1小时0分钟',
          riskManager: '财务部'
        }, {
          applyId: 'FC0004',
          realName: '刘宝',
          sex: '男',
          telnum: '134xxxx7123',
          submitTime: '2017/10/12 10:00',
          loanMoney: '120',
          loanDeadline: '2017/10/12',
          manager: '王晓',
          recommendations: '推荐',
          dealTime: '2017/10/12 11:00',
          burningTime: '1小时0分钟',
          riskManager: '业务部'
        }, {
          applyId: 'FC0005',
          realName: '刘宝',
          sex: '男',
          telnum: '134xxxx7123',
          submitTime: '2017/10/12 10:00',
          loanMoney: '120',
          loanDeadline: '2017/10/12',
          manager: '王晓',
          recommendations: '推荐',
          dealTime: '2017/10/12 11:00',
          burningTime: '1小时0分钟',
          riskManager: '产品部'
        }]
      }
    },
    methods: {
      handleView (row) {
        console.log(row.applyId)
        return this.$router.push({path: '/appSys/customerMgt/view', query: {id: row.applyId}})
      },
      handleSelect(row) {
        this.taskSelectVisible = true
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
