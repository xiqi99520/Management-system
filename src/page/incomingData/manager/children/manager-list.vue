<template>
  <el-container>
    <el-header>
      <div>客户经理管理</div>
    </el-header>
    <el-main>
      <!-- 表格筛选 -->
      <el-form :inline="true" :model="filterData" class="form">
        <el-form-item>
          <el-input v-model="filterData.user" placeholder="手机号/姓名/营销代号"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="filterData.department" placeholder="全部">
            <el-option label="渠道部" value="0"></el-option>
            <el-option label="运营部" value="1"></el-option>
            <el-option label="风险管理部" value="2"></el-option>
            <el-option label="财务部" value="3"></el-option>
          </el-select>
        </el-form-item>

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
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导入模板</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">批量导入</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">创建客户经理</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border  ref="table" style="width: 100%">
          <el-table-column
            prop="name"
            label="客户经理姓名"
            align="center"
            width="150">
            <template slot-scope="scope">
              <span @click="handleView(scope.row)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="营销代码"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="telnum"
            label="手机号码"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="subBranch"
            label="所属支行"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="lattice"
            label="所在网点"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="当前状态"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="total"
            label="累计进件数"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="累计放款额"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="handleOff(scope.row)" type="text" size="small">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          layout="total, prev, pager, next, jumper"
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
          department: '',
          role: '',
          area: '',
          dateRange: ''
        },
        pickerOptions: '2017-12-26',
        tableData: [{
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }, {
          id: 1,
          name: '王力宏',
          code: 'XC083802',
          telnum: '134xxxx7123',
          subBranch: '北京三元桥支行',
          lattice: '燕莎网点支行',
          status: '激活',
          createTime: '2017/10/12 11:00',
          total: 2365,
          amount: '2272W'
        }]
      }
    },
    methods: {
      handleView (row) {
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
