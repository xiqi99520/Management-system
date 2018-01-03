<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">合同面签列表</div></el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
    <!-- form search 表单 -->
    <el-form :inline="true" :model="filterData" class="form">
      <el-form-item>
        <el-input v-model="filterData.input" placeholder="申请人姓名/手机号/申请编号"></el-input>
      </el-form-item>
      <!-- 等待时长 -->
      <el-form-item>
        <el-select v-model="filterData.state" filterable placeholder="等待时长" style="width:100%;">
          <el-option label="0~30分钟" value="0"></el-option>
          <el-option label="30~60分钟" value="1"></el-option>
          <el-option label="60分钟以上" value="2"></el-option>
        </el-select>
      </el-form-item>

      <!-- 地区 -->
      <el-form-item>
        <el-select v-model="filterData.state" filterable placeholder="全部/朝阳区/..." style="width:100%;">
          <el-option label="全部" value="0"></el-option>
          <el-option label="北京" value="1"></el-option>
          <el-option label="上海" value="2"></el-option>
          <el-option label="深圳" value="3"></el-option>
        </el-select>
      </el-form-item>

      <!-- 专员 -->
      <el-form-item>
        <el-select v-model="filterData.state" filterable placeholder="面签专员" style="width:100%;">
          <el-option label="老王" value="0"></el-option>
          <el-option label="小王" value="1"></el-option>
          <el-option label="小李" value="2"></el-option>
          <el-option label="小陈" value="3"></el-option>
        </el-select>
      </el-form-item>

      <!-- 申请时间 -->
      <el-form-item>
        <el-date-picker
          v-model="filterData.dateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </el-form-item>

      <el-form-item>
          <el-button type="primary">导出</el-button>
        </el-form-item>
    </el-form>
    <!-- table 进件表格数据 -->
    <el-table
      border
      highlight-current-row
      :data="tableData"
      ref="table"
      header-cell-class-name="head-bg"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="code"
        label="申请编号">
        <template slot-scope="scope">
          <span class="link" @click="showDetail(scope.row)">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="申请人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sex"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phoneNo"
        label="手机号"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="审批完成时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="total"
        label="贷款额(万)"
        min-width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="deadline"
        label="贷款期限"
        min-width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="floating"
        label="利率上浮">
      </el-table-column>
      <el-table-column
        align="center"
        prop="handleTime"
        label="预约时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="waitTime"
        label="等待累计时间"
        min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.waitTime}}</span>
          <el-tag type="warning" color="warning">{{scope.row.waitTime}}</el-tag>
          <el-tag type="danger" color="danger">{{scope.row.waitTime}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="manager"
        label="面签专员">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDetail(scope.row)">查看</el-button>
          <el-button type="text" size="small">处理</el-button>
          <el-button type="text" size="small" @click="handUp(scope.row.id)">挂起</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col :span="24" class="tip">
      <div>
        注：<span class="warning"></span>代表等待时间为30-60分钟的单  &nbsp;&nbsp;<span class="danger"></span>代表等待时间为60分钟以上的单
      </div>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next, jumper"
      class="pagination">
    </el-pagination>
    <!-- 审核通过对话框 -->
  </el-main>

  <transition name="el-zoom-in-center">
    <interview-detail v-show="detail.show" @on-close="handleClose"></interview-detail>
  </transition>
  </el-container>
</template>

<script>
import interviewDetail from './children/detail'

export default {
    data () {
      return {
        filterData: {
          user: '',
          department: '',
          role: '',
          area: '',
          dateRange: ''
        },
        detail: {
          show: false
        },
        pickerOptions: '2017-12-26',
        tableData: [{
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          sex: '男',
          code: 'XC083802',
          phoneNo: '134xxxx7123',
          deadline: '2个月',
          floating: '+0.08%',
          status: '激活',
          createTime: '2017/10/12 11:00',
          handleTime: '2017/10/12 11:00',
          waitTime: '1小时0分钟',
          manager: '王小宝',
          total: 2365,
          amount: '2272W'
        }]
      }
    },
    components: {
      interviewDetail
    },
    methods: {
      showDetail (row) {
        this.detail.show = true
      },
      handleOff (row) {
        if (row.status === '激活') {
          // 调用接口变更状态
        } else {
          // 调用接口变更状态
        }
      },
      handleEdit (row) {
        return this.$router.push({path: '/system/userMgt/add', query: {id: row.id}})
      },
      onSubmit () {
        console.log('submit!')
      },
      handleClose(){
        this.detail.show = false
      },
      waitTime(time){

      },
      handUp(id){

      }
    }
  }
</script>
<style>
.head-bg{
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
  .link-active {
    color: @blue;
    cursor: pointer;
  }
}
.link{
  color: #2299dd;
  cursor: pointer;
}

.filterData {
  text-align: left;
  .input-select {
    width: 100px;
  }
}

.tip{
  text-align: left;
  margin: 20px 0;
  span{
    display: inline-block;
    width: 50px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .warning{
    background: #eb9e05;
  }
  .danger{
    background: #fa5555;
  }
}
</style>
