<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">初审详情</div></el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" class="allian-btn-default" @click="handleBack">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
      <el-form label-position="top" class="form-static" :model="reviewForm">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleTab">
          <el-tab-pane label="房产评估" name="tab1">
            <step-one></step-one>
          </el-tab-pane>
          <el-tab-pane label="下户尽调" name="tab2">
            <step-two></step-two>
          </el-tab-pane>
          <el-tab-pane label="初审评定" name="tab3">
            <step-three></step-three>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import stepOne from './stepOne'
import stepTwo from './stepTwo'
import stepThree from './stepThree'
export default {
  name: 'viewDetail',
  data () {
    return {
      activeTab: 'tab1',
      reviewForm: {}
    }
  },
  components: {
    stepOne,
    stepTwo,
    stepThree
  },
  created () {
  },
  computed: {

  },
  methods: {
    handleBack () {
      window.history.go(-1)
    },
    handleTab (tab, event) {
      console.log(tab, event)
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
</style>

