<template>
  <el-container>
    <el-header>
      <div>风控审查列表</div>
    </el-header>
    <el-main>
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
      style="width: 100%">
      <el-table-column
        align="center"
        prop="code"
        label="申请编号">
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
        label="权证上抵时间"
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
        label="处理时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="waitTime"
        label="等待/累计时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="manager"
        label="风控经理">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-tickets"
            title="查看详情"
            @click="showDetail(scope.row.applyId)">
        </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next, jumper"
      class="pagination">
    </el-pagination>
    <!-- 审核通过对话框 -->
  </el-main>
  </el-container>
</template>

<script>
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
    methods: {
      showDetail (row) {
        console.log(row)
        return this.$router.push({path: '/appSys/channelMgt/managerDetail', query: {id: row.id}})
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
      }
    }
  }
</script>
<style lang="less" scoped>
.el-header {
  text-align: left;
  line-height: 20px;
  height: 20px !important;
  div {
    text-indent: 10px;
    border-left: 5px solid #2299dd;
    font-size: 20px;
  }
}

.filterData {
  text-align: left;
  .input-select {
    width: 100px;
  }
}
</style>
