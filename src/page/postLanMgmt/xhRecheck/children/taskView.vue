<template>
  <el-container class="detail-full-screen">
     <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="12"><div class="title">下户调查信息</div></el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" class="allian-btn-default" @click="handleBack">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="view-container">
      <el-form label-position="top" class="form-static" :model="reviewForm">
        <table class="table-view">
          <tbody>
            <tr>
              <th>申请编号</th>
              <td>FC0001</td>
              <th>姓名</th>
              <td>张三</td>
              <th>贷款额</th>
              <td>1600万元</td>
              <th>房产估值</th>
              <td>1400-1600万元</td>
            </tr>
            <tr>
              <th>申请时间</th>
              <td>2017/10/13 18:00</td>
              <th>抵押情况</th>
              <td>一抵</td>
              <th>贷款期限</th>
              <td>24个月</td>
              <th>房产信息</th>
              <td>朝阳区-燕莎-远洋新干线</td>
            </tr>
          </tbody>
        </table>
        <div class="view-box">
          <div class="view-box-title">
            借款人信息
          </div>
          <div class="view-box-body">
            <table class="table-view">
              <tbody>
                <tr>
                  <th>借款人姓名</th>
                  <td>刘柳</td>
                  <th>借款人身份证</th>
                  <td>3101004120220202</td>
                  <th>婚姻状况</th>
                  <td>已婚</td>
                </tr>
                <tr>
                  <th>配偶姓名</th>
                  <td>李柏</td>
                  <th>配偶身份证</th>
                  <td>1402010155515151555</td>
                  <th>--</th>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
            <table class="table-view">
              <tbody>
                <tr>
                  <th>配偶姓名</th>
                  <td>李柏</td>
                  <th>配偶身份证号</th>
                  <td>1213414234234234</td>
                  <th>--</th>
                  <td>--</td>
                </tr>
                <tr>
                  <th>是否有工作单位</th>
                  <td>是</td>
                  <th>工作单位</th>
                  <td>神龙集团</td>
                  <th>职务</th>
                  <td>财务总监</td>
                </tr>
              </tbody>
            </table>
            <table class="table-view">
              <tbody>
                <tr>
                  <th>产权人姓名</th>
                  <td>刘柳、李柏</td>
                  <th>借款人占有比例</th>
                  <td>50%</td>
                  <th>--</th>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
            <table class="table-view">
              <tbody>
                <tr>
                  <th>是否有实际用款人</th>
                  <td>是</td>
                  <th>实际用款人姓名</th>
                  <td>张三</td>
                  <th>实际用款人身份证号</th>
                  <td>34453553535534</td>
                </tr>
                <tr>
                  <th>是否有工作单位</th>
                  <td>是</td>
                  <th>工作单位</th>
                  <td>鑫鼎科技</td>
                  <th>职务</th>
                  <td>总经理</td>
                </tr>
              </tbody>
            </table>
            <table class="table-view">
              <tbody>
                <tr>
                  <th>是否有其他共借人</th>
                  <td>是</td>
                  <th>实际用款人姓名</th>
                  <td>张三锋</td>
                  <th>实际用款人身份证号</th>
                  <td>84564868454156</td>
                </tr>
                <tr>
                  <th>是否有工作单位</th>
                  <td>是</td>
                  <th>工作单位</th>
                  <td>农景集团</td>
                  <th>职务</th>
                  <td>总经理</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="view-box">
          <div class="view-box-title">
            抵押物信息
          </div>
          <div class="view-box-body">
            <table class="table-view">
              <tbody>
                <tr>
                  <th>房产证号</th>
                  <td>京CNP2015221122</td>
                  <th>房产地址</th>
                  <td>北京市朝阳区霞光里65号院</td>
                  <th>规划用途</th>
                  <td>住宅</td>
                </tr>
                <tr>
                  <th>建筑面积</th>
                  <td>118㎡</td>
                  <th>地下面积</th>
                  <td>0㎡</td>
                  <th>居室类型</th>
                  <td>3居</td>
                </tr>
              </tbody>
            </table>
            <table class="table-view">
              <tbody>
                <tr>
                  <th>小区名称</th>
                  <td>远洋新干线</td>
                  <th>房屋位置</th>
                  <td>北京市朝阳区霞光里65号院</td>
                  <th>房屋户型</th>
                  <td>3室1厅1厨2卫</td>
                </tr>
                <tr>
                  <th>房屋朝向</th>
                  <td>正南</td>
                  <th>所在楼层</th>
                  <td>6</td>
                  <th>总层数</th>
                  <td>32</td>
                </tr>
              </tbody>
            </table>
            <table class="table-view">
              <tbody>
                <tr>
                  <th>房产获取方式</th>
                  <td>购买</td>
                  <th>产权年数</th>
                  <td>70年</td>
                  <th>满五唯一</th>
                  <td>是</td>
                </tr>
                <tr>
                  <th>学区房</th>
                  <td>是</td>
                  <th>学区学校</th>
                  <td>北京大学附属小学</td>
                  <th></th>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table class="table-view">
              <tbody>
                <tr>
                  <th>房产性质</th>
                  <td>商品房</td>
                  <th>抵押类型</th>
                  <td>二抵</td>
                  <th>房屋实际用途</th>
                  <td>自住</td>
                </tr>
                <tr>
                  <th>建成年份</th>
                  <td>2011</td>
                  <th>车位情况</th>
                  <td>有车位</td>
                  <th>家庭成员</th>
                  <td>夫妻，小孩</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      <!--表单-->
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col align="left">
            <el-form-item label="周边环境" class="form-item">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.surroundingEnv" placeholder="该小区周边配套齐全....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item label="小区环境" class="form-item">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.plotEnv" placeholder="该小区周边配套齐全....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item label="整栋楼体状况" class="form-item">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.theBuildingStatus" placeholder="该楼为钢混结构....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item label="室内状况" class="form-item">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.roomStatus" placeholder="该房为精装3居室....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item label="居住状况" class="form-item">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.residenceStatus" placeholder="该房由购房人家人居住....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <table class="table-view">
          <tbody>
            <tr>
              <th>中介公司1</th>
              <td>链家地产</td>
              <th>市场价1</th>
              <td>1500万元</td>
              <th>快出价1</th>
              <td>1485万元</td>
            </tr>
            <tr>
              <th>中介公司2</th>
              <td>我爱我家</td>
              <th>市场价1</th>
              <td>1490万元</td>
              <th>快出价1</th>
              <td>1485万元</td>
            </tr>
          </tbody>
        </table>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item label="询价综合概述" class="form-item">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.priceSummary" placeholder="该小区平均挂牌价格为10-12万元不等，根据面积和楼层及装修询得....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--借款人影像资料-->
        <table class="table-view">
          <caption>借款人影像资料</caption>
          <tbody>
            <tr>
              <th width="20%">
                <p>身份证</p>
                <p>（借款人、借款人配偶、产权人、共借人）</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>户口本</p>
                <p>（产权人、产权人配偶）</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>婚姻证件</p>
                <p>（产权人、产权人配偶）</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>征信报告</th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>备用房房本</p>
                <p>（可选）</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>遗产继承公证&放弃继承公证</p>
                <p>（可选）</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
          </tbody>
        </table>
        <!--抵押物影像资料-->
        <table class="table-view">
          <caption>抵押物影像资料</caption>
          <tbody>
            <tr>
              <th width="20%">合同与房本</th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>出租情况</p>
                <p>抵押房屋是否出租：是</p>
                <p>租赁合同甲方是否为抵押物所有人：否</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>户外影像</p>
                <p>（小区大门，小区环境，楼栋外观，楼牌号，单元号，门牌号）</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>户内影像</th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>与客户合影</th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>询价中介名片</th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>一抵抵押证明</p>
                <p>二抵客户需提供</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>公司照片</p>
                <p>(可选)</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
            <tr>
              <th>
                <p>车辆证明</p>
                <p>（可选）</p>
              </th>
              <td>
                <img src=""/>
              </td>
            </tr>
          </tbody>
        </table>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item label="是否需要补全资料" class="form-item">
                <el-select v-model="reviewForm.isUpdateInfo" placeholder="是" style="width:100%">
                  <el-option v-for="item in isUpdateInfoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item class="form-item">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.infoDesc" placeholder="请描述需要补充的资料....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item class="form-footer">
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button type="info" plain @click="handleCancel">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      currentRow: '',
      reviewForm: {
        surroundingEnv: '',
        plotEnv: '',
        isUpdateInfo: '',
        infoDesc: ''
      },
      isUpdateInfoOptions: [
        {label: '否', value: '0'},
        {label: '是', value: '1'}
      ],
      taskForm: {
        riskManager: ''
      },
      data: [ ],
      tableData: [{
        applyId: 'FC0001',
        realName: '刘宝',
        sex: '男',
        telnum: '134xxxx7123',
        submitTime: '2017/10/12 10:00',
        loanMoney: '120',
        loanDeadline: '12个月',
        address: '朝阳区肖云路66号霞光里8栋803',
        recheckTime: '2017/10/12 11:00',
        burningTime: '1小时0分钟',
        customRecorded: '是',
        riskManager: '小刘'
      }, {
        applyId: 'FC0001',
        realName: '刘宝',
        sex: '男',
        telnum: '134xxxx7123',
        submitTime: '2017/10/12 10:00',
        loanMoney: '120',
        loanDeadline: '12个月',
        address: '朝阳区肖云路66号霞光里8栋803',
        recheckTime: '2017/10/12 11:00',
        burningTime: '1小时0分钟',
        customRecorded: '是',
        riskManager: '小刘'
      }]
    }
  },
  methods: {
    handleBack () {
      this.$emit('on-close')
    },
    handleSelect (row) {
      this.taskSelectVisible = true
      this.currentRow = row
      // this.$message({
      //   type: 'success',
      //   message: row.riskManager
      // })
    },
    handleSubmit () {
      console.log('submit!')
    },
    handleCancel () {

    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/color";
.detail-full-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff;
  z-index: 3;
}
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
    table {
        width: 100%;
        border-collapse: collapse;
        border: none;
        caption {
            padding: 0 5px;
            line-height: 40px;
            background-color: #96c9ff;
            text-align: left;
            color: @white
        }
        th,td {
            padding:5px 10px;
            border:1px solid #d1d1d1;
            text-align: left;
        }
        th {
            background-color:#e2e7ed;
            font-weight: normal
        }
        td {
            background-color:#eef1f4;
            color: #999
        }
    }
    .table-view {
      margin-top: 20px
    }
    .view-items {
        padding: 15px 0;
        li {
            float:left;
            width:50%;
            line-height:40px;
            text-align: left;
        }
    }
    .view-box {
      padding: 15px 0;
      .view-box-title {
        line-height: 30px;
        border-bottom: 1px solid #96c9ff;
        color: @blue;
        text-align: left;
      }
    }
}
.el-tag {
  color:#666
}
</style>
