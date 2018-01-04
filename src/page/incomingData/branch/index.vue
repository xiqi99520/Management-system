<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">支行管理</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <!-- 表格筛选 -->
      <el-form :inline="true" :model="filterData" class="form">
        <el-form-item>
          <el-input v-model="filterData.user" placeholder="支行名/负责人"></el-input>
        </el-form-item>
        <el-form-item label="渠道对接人：">
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
          <el-button type="primary">网点导入模板</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">批量导入网点</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">创建网点支行</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">创建一级支行</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border  ref="table" style="width: 100%" header-cell-class-name="table-head-bg">
        <el-table-column type="expand"
            prop=""
            label=""
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="支行名称"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="conscientious"
            label="渠道对接人"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="telnum"
            label="对接人手机"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="支行等级"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="subBranchNum"
            label="下属网点数"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="latticeNum"
            label="客户经理人数"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="customerNum"
            label="累计进件数"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="total"
            label="累计放款额"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="支行状态"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="最后更新时间"
            align="center"
            width="150">
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
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '北京燕莎支行',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          grade: '一级支行',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }]
      }
    },
    methods: {
      handleView (row) {
        console.log(row.id)
        return this.$router.push({path: '/system/userMgt/view', query: {id: row.id}})
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
.link{
  color: #2299dd;
  cursor: pointer;
}
</style>
