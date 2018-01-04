<template>
  <el-container>
     <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">风控初审列表</div></el-col>
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
              <el-select v-model="filterData.riskManager" placeholder="风控经理">
                <el-option label="小刘" value="0"></el-option>
                <el-option label="老张" value="1"></el-option>
                <el-option label="大梁" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="filterData.awaitTime" placeholder="等待时长">
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
          </el-col>
          <el-col :span="2" align="right">
            <el-form-item>
              <el-button type="primary">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%" size="mini" header-cell-class-name="table-head-bg">
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
          prop="applyName"
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
          prop="telNum"
          label="手机号码"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="finishTime"
          label="完成时间"
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
          prop="advanceMoney"
          label="预授额度"
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
          prop="awaitTime"
          label="等待时间"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="riskManager"
          label="风控经理"
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
       <el-row type="flex" justify="space-between" style="padding: 15px 0">
        <el-col :span="24" align="left">
          注释：
          <el-tag color="#EEE8AA">代表等待时间为30-60分钟的单</el-tag>
          <el-tag color="#f3715c">代表等待时间为60分钟以上的单</el-tag>
        </el-col>
      </el-row>
    </el-main>
    <!-- 修改评房专员弹窗-->
    <el-dialog title="任务分配" :visible.sync="taskSelectVisible" :modal-append-to-body="false" width="400px">
      <el-form :model="taskForm" size="mini">
        <el-form-item label="请选择负责人">
          <el-select v-model="taskForm.riskManager" placeholder="评房专员" style="width:100%">
            <el-option label="小刘" value="小刘"></el-option>
            <el-option label="大张" value="大张"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="taskSelectVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTaskSelect">确 定</el-button>
      </div>
    </el-dialog>
    <transition name="el-zoom-in-center">
      <detail-view :id="appId" v-show="detailShow" @on-close="handleCloseDetail"></detail-view>
    </transition>
  </el-container>
</template>
<script>
import detailView from './children/view'
export default {
  data () {
    return {
      taskSelectVisible: false,
      currentRow: '',
      appId: '',
      viewData: [],
      viewShow: false,
      thirdPart: false,
      filterData: {
        user: '',
        riskManager: '',
        awaitTime: '',
        area: ''
      },
      taskForm: {
        riskManager: ''
      },
      data: [ ],
      detailShow: false,
      tableData: [{
        applyId: 'FC0001',
        applyName: '刘宝',
        sex: '男',
        telNum: '134xxxx7123',
        finishTime: '2017/10/12 10:00',
        loanMoney: '120',
        loanDeadline: '2017/10/12',
        advanceMoney: '1400-1600',
        dealTime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        riskManager: '小刘'
      }, {
        applyId: 'FC0002',
        applyName: '刘宝',
        sex: '男',
        telNum: '134xxxx7123',
        finishTime: '2017/10/12 10:00',
        loanMoney: '120',
        loanDeadline: '2017/10/12',
        advanceMoney: '1400-1600',
        dealTime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        riskManager: '小王'
      }, {
        applyId: 'FC0003',
        applyName: '刘宝',
        sex: '男',
        telNum: '134xxxx7123',
        finishTime: '2017/10/12 10:00',
        loanMoney: '120',
        loanDeadline: '2017/10/12',
        advanceMoney: '1400-1600',
        dealTime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        riskManager: '校长'
      }, {
        applyId: 'FC0004',
        applyName: '刘宝',
        sex: '男',
        telNum: '134xxxx7123',
        finishTime: '2017/10/12 10:00',
        loanMoney: '120',
        loanDeadline: '2017/10/12',
        advanceMoney: '1400-1600',
        dealTime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        riskManager: '大王'
      }, {
        applyId: 'FC0005',
        applyName: '刘宝',
        sex: '男',
        telNum: '134xxxx7123',
        finishTime: '2017/10/12 10:00',
        loanMoney: '120',
        loanDeadline: '2017/10/12',
        advanceMoney: '1400-1600',
        dealTime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        riskManager: '大白'
      }]
    }
  },
  components: {
    detailView
  },
  methods: {
    handleView (row) {
      console.log(row.applyId)
      this.appId = row.applyId
      this.detailShow = true
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
    handleCloseDetail () {
      this.detailShow = false
      console.log(this.detailShow)
    },
    updateTaskSelect () {
      let $taskUser = this.taskForm.riskManager
      console.log(this.currentRow.riskManager)
      this.currentRow.riskManager = $taskUser
      this.taskSelectVisible = false
      // 如果数据更新成功，提示如下
      if (this.taskSelectVisible === false) {
        this.$message({
          type: 'success',
          message: '风控经理修改成功！'
        })
      }
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style lang="less">
@import "~@/style/color";
  .table-head-bg{
    background: @blue;
    color: @white;
  }
</style>
<style lang="less" scoped>
@import "~@/style/color";
.el-header {
  margin-top: 15px;
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
.el-dialog__header {
    padding: 15px 15px 10px;
    text-align: left;
    border-bottom: 1px solid @blue;
}
.el-tag {
  color:#666
}
</style>
