<template>
  <el-container>
    <el-header>
      <div>新增渠道</div>
    </el-header>

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
</style>
