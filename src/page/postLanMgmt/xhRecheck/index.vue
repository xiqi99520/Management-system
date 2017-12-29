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
              <el-input v-model="filterData.user" placeholder="手机号/姓名/营销代号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="filterData.status" placeholder="全部状态">
                <el-option label="禁用" value="0"></el-option>
                <el-option label="激活" value="1"></el-option>
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
          </el-col>
          <el-col :span="8" align="right">
            <el-form-item>
              <el-button type="primary">导入模板</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">批量导入</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">创建客户经理</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border  ref="table" style="width: 100%">
          <el-table-column
          fixed
          label="ID"
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="noID"
          label="编号"
          type="index"
          align="center"
          width="50">
        </el-table-column>
          <el-table-column
            prop="name"
            label="客户经理姓名"
            align="center"
            width="150">
            <template slot-scope="scope">
              <span class="link-active" @click="handleView(scope.row)">{{ scope.row.name }}</span>
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
              <el-button @click="handleOff(scope.row)" type="text" size="small">{{scope.row.status}}</el-button>
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
        detailShow: false,
        filterData: {
          user: '',
          department: '',
          role: '',
          area: '',
          dateRange: ''
        },
        pickerOptions: '2017-12-26',
        tableData: [{
          noID:1,
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
          noID: '35',
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
          noID: '68',
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
          noID: '20',
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
          noID: '251',
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
          noID: '110',
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
          noID: '035',
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
          noID: '032',
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
          noID: '040',
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
          noID: '005',
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
        this.appId = row.applyId
        this.detailShow = true
      },
      handleOff (row) {
        if (row.status === '激活') {
          row.tatus = '禁用'
        } else {
          row.tatus = '激活'
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
  .link-active {
    color: @blue;
    cursor: pointer;
  }
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
