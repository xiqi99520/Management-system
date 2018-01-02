<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">下户资料复核</div></el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
      <!-- 表格筛选 -->
      <el-form :inline="true" :model="filterData" class="form" size="mini">
        <el-row type="flex" justify="space-between">
          <el-col align="left">
            <el-form-item>
              <el-input v-model="filterData.user" placeholder="申请人姓名/手机号/申请编号" style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col align="left">
            <el-form-item>
              <el-select v-model="filterData.investigator" placeholder="请选择下户专员">
                <el-option v-for="item in filterData.investigatorOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col align="left">
            <el-form-item>
              <el-select v-model="filterData.area" placeholder="请选择所属区">
                <el-option v-for="item in filterData.areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col align="left">
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
          </el-col>
          <el-col align="left">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col align="right">
            <el-form-item>
              <el-button type="primary">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border size="mini" ref="table" style="width: 100%">
          <el-table-column
            fixed
            label="ID"
            align="center"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="applyId"
            label="申请编号"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="handleView(scope.row)">{{scope.row.applyId}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyUser"
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
            prop="telNum"
            label="手机号码"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="recheckTime"
            label="尽调提交时间"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="loanMoney"
            label="贷款额（万）"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="loanDeadline"
            label="贷款期限"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            label="房屋地址"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="recheckEndtime"
            label="复核完成时间"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="awaitTime"
            label="等待/用时"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="investigator"
            label="下户专员"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="isAdditionalRecording"
            label="客户补传"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="handleCheckDone">复核|查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          layout="total, prev, pager, next, jumper"
          class="pagination" :total="100">
        </el-pagination>
    </el-main>
    <transition  name="el-zoom-in-center">
      <task-view  :id="appId" v-show="detailShow" @on-close="handleCloseDetail"></task-view>
    </transition>
  </el-container>
</template>
<script>
import taskView from './children/taskView'
export default {
  data () {
    return {
      appId: '',
      detailShow: false,
      filterData: {
        user: '',
        investigator: '',
        investigatorOptions: [
          {label: '小刘', value: "小刘"},
          {label: '大张', value: "大张"},
          {label: '黎明', value: "黎明"},
        ],
        area: '',
        areaOptions: [
          {label: '全部', value: "全部"},
          {label: '朝阳区', value: "朝阳区"},
          {label: '东城区', value: "东城区"}
        ],
        dateRange: ''
      },
      pickerOptions: '2017-12-26',
      investigatorOptions: [
        {label: '晓峰', value: "晓峰"},
        {label: '刘晓飞', value: "刘晓飞"},
        {label: '张大千', value: "张大千"},
      ],
      tableData: [{
        applyId: 'XXXXXXX1',
        applyUser: '王力宏',
        sex: '男',
        telNum: '134xxxx7123',
        recheckTime: '2017/10/12 10:00',
        loanMoney: '1600',
        loanDeadline: '24个月',
        address: '朝阳区霄云路66号霞光里8栋603号',
        recheckEndtime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        isAdditionalRecording: '是',
        investigator: '小刘'
      }, {
        applyId: 'XXXXXXX1',
        applyUser: '王力宏',
        sex: '男',
        telNum: '134xxxx7123',
        recheckTime: '2017/10/12 10:00',
        loanMoney: '1600',
        loanDeadline: '24个月',
        address: '朝阳区霄云路66号霞光里8栋603号',
        recheckEndtime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        isAdditionalRecording: '--',
        investigator: '小刘'
      }, {
        applyId: 'XXXXXXX1',
        applyUser: '王力宏',
        sex: '男',
        telNum: '134xxxx7123',
        recheckTime: '2017/10/12 10:00',
        loanMoney: '1600',
        loanDeadline: '24个月',
        address: '朝阳区霄云路66号霞光里8栋603号',
        recheckEndtime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        isAdditionalRecording: '否',
        investigator: '小刘'
      }, {
        applyId: 'XXXXXXX1',
        applyUser: '王力宏',
        sex: '男',
        telNum: '134xxxx7123',
        recheckTime: '2017/10/12 10:00',
        loanMoney: '1600',
        loanDeadline: '24个月',
        address: '朝阳区霄云路66号霞光里8栋603号',
        recheckEndtime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        isAdditionalRecording: '否',
        investigator: '小刘'
      }, {
        applyId: 'XXXXXXX1',
        applyUser: '王力宏',
        sex: '男',
        telNum: '134xxxx7123',
        recheckTime: '2017/10/12 10:00',
        loanMoney: '1600',
        loanDeadline: '24个月',
        address: '朝阳区霄云路66号霞光里8栋603号',
        recheckEndtime: '2017/10/12 11:00',
        awaitTime: '1小时0分钟',
        isAdditionalRecording: '是',
        investigator: '小刘'
      }]
    }
  },
  components: {
    taskView
  },
  beforeMount () {
    // 渲染表格数据
    this.getTabelData()
  },
  methods: {
    // 变更下户专员
    selectInvestigator (row) {
      let value = row.investigator
      let $appid = row.applyId
      this.$confirm(`您确定要重新指定编号【${$appid}】申请记录的下户专员?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求接口变更数据

        this.$message({
          type: 'success',
          message: '您已重新指定【' + row.investigator + '】为该申请记录的下户专员!'
        });
      }).catch(() => {
        //重置下拉选项

        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    // 获取表格数据
    getTabelData () {

    },
    // 查看下户调查信息
    handleView (row) {
      let $id = row.applyId
      console.log($id)
    },
    // 复核操作
    handleCheckDone () {

    },
    // 查询
    handleSearch () {
      console.log('searching!')
    },
    handleView (row) {
      console.log(row.applyId)
      this.appId = row.applyId
      this.detailShow = true
    },
    handleCloseDetail () {
      this.detailShow = false
      console.log(this.detailShow)
    },
  }
}
</script>
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
</style>
