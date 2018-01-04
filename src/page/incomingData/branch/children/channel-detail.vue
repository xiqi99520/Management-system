<template>
  <el-container>
    <el-header>
      <div>渠道详情：西城一区</div>
    </el-header>
    <el-main>
      <!-- 表格筛选 -->
      <el-form :inline="true" :model="filterData" class="form">
        <el-form-item>
          <el-input v-model="filterData.user" placeholder="申请人姓名/手机号/申请编号"></el-input>
        </el-form-item>
        <el-form-item label="渠道状态：">
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
          <el-button type="primary">导出CSV文件</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">创建新渠道</el-button>
        </el-form-item>
      </el-form>

      <!-- 详情 -->
      <table cellspacing="0" cellpadding="10" class="detail">
        <tr>
          <td class="name">渠道名称</td>
          <td>西城一区</td>
          <td>渠道负责人</td>
          <td>张三</td>
          <td>负责人手机号</td>
          <td>15888888888</td>
          <td>渠道状态</td>
          <td>激活</td>
        </tr>
        <tr>
          <td>客户经理人数</td>
          <td>15人</td>
          <td>进件总数</td>
          <td>15696</td>
          <td>放款笔数</td>
          <td>312</td>
          <td>放款总额</td>
          <td>4578万元</td>
        </tr>
      </table>

      <!-- 表格 -->
      <el-table :data="tableData" stripe border  ref="table" style="width: 100%">
          <el-table-column
            prop="id"
            label="申请编号"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="conscientious"
            label="申请人"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="telnum"
            label="手机号码"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="申请时间"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="subBranchNum"
            label="客户经理"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="latticeNum"
            label="贷款额(万)"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="customerNum"
            label="贷款期限"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="cumulative"
            label="当前状态"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="total"
            label="审批额度(万)"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="年利率"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="最后处理时间"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="代办人"
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
        data: {
          pickerOptions: '2017-12-26'
        },
        tableData: [{
          id: 'xxxx',
          conscientious: '刘大',
          sex: '男',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
          subBranchNum: 12,
          latticeNum: 8,
          customerNum: 27,
          cumulative: 32,
          total: '2272W',
          status: '激活',
          updateTime: '2017/10/12 11:00'
        }, {
          name: '西城一区',
          conscientious: '刘大',
          telnum: '134xxxx7123',
          createTime: '2017/10/12 10:00',
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
.detail{
  tr{

  }
  td{

  }
  .name{
    background: #eef1f5
  }
}
</style>
